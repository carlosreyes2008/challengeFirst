import React from 'react';
import { Box,
        Typography,
        Button,
        List,
        ListItem,
        Divider,
        Modal } from '@mui/material';
import { makeStyles } from "@mui/styles";

import UserToken from '../components/userToken';
import UserProfile from '../components/userProfile';
import TeamToken from '../components/teamToken';

import * as Users from '../../controllers/users';
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
    modalMain: {
        marginTop: '15%'
    }
});

export function Main(props){
    let styles = useStyles();

    const [boot, didBoot] = React.useState(false);
    const [bootTries, setTries] = React.useState(0);
    const [users, setUsers] = React.useState([]);

    const [newModal, showModal] = React.useState(false);
    const [creating, isCreating] = React.useState(false);

    const [user, setUser] = React.useState(undefined);
    const [userTeams, setTeams] = React.useState([]);

    React.useEffect(() => {
        if(boot){
            return;
        }

        didBoot(true);
        handleUsers();
    })

    React.useEffect(() => {
        if(bootTries > 3){
            alert('Error courred while loading users. Please, try again later');
            return;
        }

        if(bootTries > 0){
            handleUsers();
        }
    }, [bootTries]);

    const handleUsers = async() => {
        try{
            var result = await Users.List();
        }catch(e){
            console.log(e);
            setTries(bootTries + 1);
            return;
        }

        if(!result.success){
            console.log(result.message);
            setTries(bootTries + 1);
            return;
        }

        setUsers(result.users);
    }

    const handleCreateSuccess = async() =>{
        showModal(false);
        handleUsers();
    }

    const handleCreateDiscard = async() =>{
        if(creating){
            return;
        }

        showModal(false);
    }

    const handleUserSelect = async(user) => {
        setUser(undefined);
        
        try{
            var result = await Users.Find(user.id);
        }catch(e){
            console.log(e);
            alert('Error getting user data. Please, try again');
            return;
        }

        setUser(user);
        setTeams(result.user.teams);
    }

    const handleUserUpdate = async() =>{
        alert('Profile updated successfully');
        handleUsers();
    }

    const handleUserDelete = async() =>{
        alert('User deleted successfully');
        setUser(undefined);
        handleUsers();
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
                        Registered Users
                    </Typography>
                    <Button
                        disabled={bootTries > 3}
                        onClick={() => showModal(true)}
                    >
                        Create User
                    </Button>
                </Box>

                <Divider />

                <List
                    className={styles.listContent}
                >
                    <Divider/>
                    
                    {
                        users.map((item => 
                        <>
                            <ListItem
                                button
                                onClick={() => handleUserSelect(item)}
                            >
                                <UserToken user={item}/>
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
                        User Profile
                    </Typography>

                    <Divider />

                    {user === undefined && (
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

                    {user !== undefined && (
                        <UserProfile user={user} onUpdate={handleUserUpdate} onDelete={handleUserDelete}/>
                    )}

                </Box>

                <Box
                    className={styles.dataSlide}
                >
                    <Typography
                        variant='h5'
                    >
                        User Teams
                    </Typography>

                    <Divider />

                    {user === undefined && (
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

                    {user !== undefined && (
                        <List
                            className={styles.listContent}
                        >
                            <Divider/>
                            
                            {
                                userTeams.map((item => 
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
            open={newModal}
            onClose={handleCreateDiscard}
        >
            <Box 
                className={styles.modalMain}
            >
                <Create onDiscard={handleCreateDiscard} onSuccess={handleCreateSuccess} status={isCreating}/>
            </Box>
        </Modal>
        </>
    );
}