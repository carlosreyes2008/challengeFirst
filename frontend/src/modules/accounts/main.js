import React from 'react';
import { Box,
        Typography,
        Button,
        List,
        ListItem,
        Divider,
        Modal } from '@mui/material';
import { makeStyles } from "@mui/styles";

import * as Accounts from '../../controllers/accounts';

import AccountProfile from '../components/accountProfile';
import AccountToken from '../components/accountToken';
import TeamToken from '../components/teamToken';
import Create from './create';

const useStyles = makeStyles({
    main: {
        display: 'flex',
        height: window.screen.height * 0.7,
        marginTop: '2%',
        paddingLeft: 16,
        paddingRight: 16,
    },
    mainHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
    },
    listPanel:{
        flex: 1,
        marginLeft : 8,
        padding: 8,
        border: '2px solid #CCCCCC', 
        borderRadius: 16,
        height: '100%'
    },
    listContent:{
        marginTop: 8,
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        maxHeight: '90%',
    },
    dataPanel: {
        flex: 1.5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '102.5%'
    },
    dataSlide:{
        marginLeft : 8,
        padding: 8,
        border: '2px solid #CCCCCC', 
        borderRadius: 16,
        height: '46.75%'
    },
    dataSlideLabel:{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        height: '50%',
        paddingTop: '12.5%'
    },
    createModal:{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10%'
    }
});


export function Main(props){
    let styles = useStyles();

    const [boot, didBoot] =  React.useState(false);
    const [create, showCreate] = React.useState(false);

    const [accounts, setAccounts] = React.useState([]);
    
    const [account, setAccount] = React.useState(undefined);
    const [teams, setTeams] = React.useState([]);

    React.useEffect(() => {
        if(boot){
            return;
        }
        didBoot(true);
        handleAccounts();
    }); 

    const handleAccounts = async() =>{
        try{
            var result = await Accounts.List();
        }catch(e){
            alert('Error while loading accounts. \nPlease, try again');
            return;
        }

        if(!result.success){
            alert(result.message);
            return;
        }

        setAccounts(result.accounts);
    }

    const handleSelect = async(selected) =>{
        try{
            var result = await Accounts.Find(selected.id);
        }catch(e){
            alert('Error while selecting accounts. \nPlease, try again');
            return;
        }

        setTeams(result.account.teams);
        setAccount(selected);
    }

    const handleUpdate = async() =>{
        alert('Account updated successfully');
        handleAccounts();
    }

    const handleDelete = async() =>{
        alert('Account deleted successfully');
        setAccount(undefined);
        handleAccounts();
    }

    const handleCreateDiscard = async() =>{
        var doIt = await window.confirm('Do you want to discard the changes?');

        if(!doIt){
            return;
        }

        showCreate(false);
    }

    const handleCreateSuccess = async() =>{
        showCreate(false);
        alert('Account created successfully!');
        handleAccounts();
    }

    return (
        <>
        <Box
            className={styles.main}
        >
            <Box
                className={styles.listPanel}
            >
                <Box
                    className={styles.mainHeader}
                >
                    <Typography
                        variant='h5'
                    >
                        Registered Accounts
                    </Typography>
                    <Button
                        onClick={() => showCreate(true)}
                    >
                        Create Account
                    </Button>
                </Box>

                <Divider />

                <List
                    className={styles.listContent}
                >
                    <Divider/>
                    
                    {
                        accounts.map((item => 
                        <>
                            <ListItem
                                button
                                onClick={() => handleSelect(item)}
                            >
                                <AccountToken account={item}/>
                            </ListItem>
                            <Divider/>
                        </>
                        ))
                    }

                </List>

            </Box>

            <Box
                className={styles.dataPanel}
            >
                <Box
                    className={styles.dataSlide}
                >
                    <Typography
                        variant='h5'
                    >
                        Account Profile
                    </Typography>
                    
                    <Divider />

                    {account === undefined && (
                        <Box
                            className={styles.dataSlideLabel}
                        >
                            <Typography
                                variant='h2'
                                color='#EEEEEE'
                            >
                                NO USER SELECTED
                            </Typography>
                        </Box>
                    )}

                    {account !== undefined && (
                        <AccountProfile account={account} onUpdate={handleUpdate} onDelete={handleDelete}/>
                    )}

                </Box>

                <Box
                    className={styles.dataSlide}
                >
                    <Typography
                        variant='h5'
                    >
                        Account Teams
                    </Typography>

                    <Divider />

                    {account === undefined && (
                        <Box
                            className={styles.dataSlideLabel}
                        >
                            <Typography
                                variant='h2'
                                color='#EEEEEE'
                            >
                                NO USER SELECTED
                            </Typography>
                        </Box>
                    )}

                    {account !== undefined && (
                        <List
                            className={styles.listContent}
                        >
                            <Divider/>
                            
                            {
                                teams.map((item => 
                                <>
                                    <ListItem>
                                        <TeamToken team={item}/>
                                    </ListItem>
                                    <Divider/>
                                </>
                                ))
                            }

                        </List>
                    )}

                </Box>

            </Box>
        </Box>

        <Modal
            open={create}
            onClose={handleCreateDiscard}
        >
            <Box
                className={styles.createModal}
            >
                <Create onSuccess={handleCreateSuccess} onDiscard={handleCreateDiscard}/>
            </Box>
        </Modal>
        </>
    );
}