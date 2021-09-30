import React from 'react';
import { Box,
        Card,
        CardActions,
        Typography,
        Button,
        Container,
        Divider,
        List,
        ListItem } from '@mui/material';
import { makeStyles } from "@mui/styles";

import * as TeamsAPI from '../../controllers/teams';
import * as AccountsAPI from '../../controllers/accounts';

import AccountToken from '../components/accountToken';

const useStyles = makeStyles({
    main: {
        display: 'flex',
        height: window.screen.height * 0.7,
        marginTop: '2%',
        paddingLeft: 16,
        paddingRight: 16,
    },
    mainHeader: {
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 8,
        display: 'flex',
    },
    mainHeaderLabel: {
        flex:1,
        display:'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
});

export default function Accounts(props){
    let styles = useStyles();

    const [boot, didBoot] = React.useState(false);
    const [work, doWork] = React.useState(false);

    const [newAccounts, setNews] = React.useState([]);
    const [accounts, setAccounts] = React.useState([]);

    React.useEffect(() => {
        if(boot){
            return;
        }

        didBoot(true);
        handleBoot();
    })

    React.useEffect(() => {
        props.status(work);
    }, [work]);

    const handleBoot = async() => {
        try{
            var result = await AccountsAPI.List();
        }catch(e){
            alert('Error while fetching users. Please, try again');
            console.log(e);
            return;
        }

        if(!result.message){
            alert(result.message);
            return;
        }

        filteredAccounts(result.accounts);
    }

    const filteredAccounts = async(accountList) =>{
        var filtered = accountList.filter((item) => {
            return props.accounts.findIndex((element) => element.id === item.id) < 0;
        })

        setAccounts(filtered);
    }

    const handleSelectAviable = async(account) =>{
        var index = accounts.findIndex((item) => item.id === account.id);
        var result = accounts.filter((item,pos) => {
            return pos !== index;
        })

        setNews(newAccounts.concat([account]));
        setAccounts(result);
    }

    const handleSelectJoin = async(account) =>{
        var index = newAccounts.findIndex((item) => item.id === account.id);
        var result = newAccounts.filter((item,pos) => {
            return pos !== index;
        })

        setNews(result);
        setAccounts(accounts.concat([account]));
    }

    const handleConfirm = async() =>{

        if(newAccounts.length < 1){
            alert('No accounts to join');
            return;
        }

        var doIt = await window.confirm('The selected accounts will join to the team. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        var joinAccounts = [];

        newAccounts.forEach((item) =>{
            var newAccount = {
                teams_id: props.team.id,
                accounts_id: item.id
            };

            joinAccounts.push(newAccount);
        });

        handleJoin(joinAccounts);
    }

    const handleJoin = async(joins) =>{

        doWork(true);

        const token = JSON.parse(window.localStorage.getItem('token'));

        try{
            var result = await TeamsAPI.JoinAccounts(joins, token);
        }catch(e){
            doWork(false);
            alert('Error while joining accounts. \nPlease, try again');
            console.log(e);
            return;
        }

        if(!result.success){
            alert(result.message);
            doWork(false);
            return;
        }

        doWork(false);
        props.onSuccess();
    }

    return (
        <>
        <Container
            style={{
                height: '70%',
                justifyContent: 'center',
            }}
        >
            <Card 
                style={{
                    height: '100%',
                    width: '100%',
                }}            
                elevation={10}
            >
                <Box
                    className={styles.mainHeader}
                >
                    <Typography  
                        variant="h5" 
                        component="h2" 
                        color='primary'
                    >
                        JOIN USERS TO TEAM
                    </Typography>
    
                    <Divider />                    

                </Box>


                <Box
                    style={{
                        display:'flex',
                        height: '85%',
                        paddingLeft: 16,
                        paddingRight: 16,
                    }}
                >
                    <Box
                        style={{
                            flex: 1,
                            height: '100%',
                            border: '2px solid #CCCCCC', 
                            borderRadius: 16,
                            marginRight: 16
                        }}
                    >
                        <Box
                            className={styles.mainHeader}
                        >
                            <Typography
                                variant='h5'
                            >
                                Accounts Aviable
                            </Typography>
                            <Box
                                className={styles.mainHeaderLabel}
                            >
                                <Typography>
                                    Click to add
                                </Typography>
                            </Box>
                        </Box>

                        <Divider />

                        <List
                            style={{
                                height: '100%',
                            }}
                        >
                            <Divider/>
                            
                            {
                                accounts.map((item => 
                                <>
                                    <ListItem
                                        button
                                        onClick={() => handleSelectAviable(item)}
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
                        style={{
                            flex: 1,
                            height: '100%',
                            border: '2px solid #CCCCCC', 
                            borderRadius: 16,
                        }}
                    >
                        <Box
                            className={styles.mainHeader}
                        >
                            <Typography
                                variant='h5'
                            >
                                Accounts To Join
                            </Typography>
                            <Box
                                className={styles.mainHeaderLabel}
                            >
                                <Typography>
                                    Click to remove
                                </Typography>
                            </Box>
                        </Box>

                        <Divider />

                        <List
                            style={{
                                height: '70%',
                            }}
                        >
                            <Divider/>
                            
                            {
                                newAccounts.map((item => 
                                <>
                                    <ListItem
                                        button
                                        onClick={() => handleSelectJoin(item)}
                                    >
                                        <AccountToken account={item}/>
                                    </ListItem>
                                    <Divider/>
                                </>
                                ))
                            }

                        </List>

                    </Box>

                </Box>
                <CardActions>
                    <Button
                        disabled={work}
                        color="primary"
                        style={{
                            marginLeft:8,
                            marginRight:8,
                            marginBottom:16,
                            fontWeight: 'bold',
                            backgroundColor:'#FF0000',
                        }}
                        variant="contained"
                        fullWidth
                        onClick={props.onDiscard}
                    >
                        DISCARD JOINS
                    </Button>
                    <Button
                        disabled={work}
                        color="primary"
                        style={{
                            marginLeft:8,
                            marginRight:8,
                            marginBottom:16,
                            fontWeight: 'bold',
                            backgroundColor:'#3973E5',
                        }}
                        variant="contained"
                        fullWidth
                        onClick={handleConfirm}
                    >
                        CONFIRM JOINS
                    </Button>
                </CardActions>
            </Card>
        </Container>
        </>
    );
}