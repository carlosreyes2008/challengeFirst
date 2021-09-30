import React from 'react';
import { Box,
        Card,
        CardActions,
        Typography,
        Button,
        TextField,
        Container,
        Divider,
        List,
        ListItem } from '@mui/material';
import { makeStyles } from "@mui/styles";

import * as TeamsAPI from '../../controllers/teams';
import * as UsersAPI from '../../controllers/users';

import UserToken from '../components/userToken';

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

export default function Users(props){
    let styles = useStyles();

    const [boot, didBoot] = React.useState(false);
    const [work, doWork] = React.useState(false);

    const [period, setPeriod] = React.useState({
        from: '',
        to: ''
    });

    const [newUsers, setNews] = React.useState([]);
    const [users, setUsers] = React.useState([]);

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
            var result = await UsersAPI.List();
        }catch(e){
            alert('Error while fetching users. Please, try again');
            console.log(e);
            return;
        }

        if(!result.message){
            alert(result.message);
            return;
        }

        filterUsers(result.users);
    }

    const handlePeriod = async(e) => {
        setPeriod({...period, [e.target.name]: e.target.value});
    }

    const filterUsers = async(usersList) =>{
        var filtered = usersList.filter((item) => {
            return props.users.findIndex((element) => element.id === item.id) < 0;
        })

        setUsers(filtered);
    }

    const handleSelectAviable = async(user) =>{
        var index = users.findIndex((item) => item.id === user.id);
        var result = users.filter((item,pos) => {
            return pos !== index;
        })

        setNews(newUsers.concat([user]));
        setUsers(result);
    }

    const handleSelectJoin = async(user) =>{
        var index = newUsers.findIndex((item) => item.id === user.id);
        var result = newUsers.filter((item,pos) => {
            return pos !== index;
        })

        setNews(result);
        setUsers(users.concat([user]));
    }

    const handleConfirm = async() =>{
        if(newUsers.length < 1){
            alert('No users to join');
            return;
        }

        if(![period.from, period.to].every(Boolean)){
            alert('Join period must be provided');
            return;
        }

        var joinUsers = [];

        newUsers.forEach((item) =>{
            var newUser = {
                teams_id: props.team.id,
                users_id: item.id,
                from: period.from,
                to: period.to
            };

            joinUsers.push(newUser);
        });

        handleJoin(joinUsers);
    }

    const handleJoin = async(joins) =>{

        doWork(true);

        const token = JSON.parse(window.localStorage.getItem('token'));

        try{
            var result = await TeamsAPI.JoinUsers(joins, token);
        }catch(e){
            doWork(false);
            alert('Error while joining users. \nPlease, try again');
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
                                Users Aviable
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
                                users.map((item => 
                                <>
                                    <ListItem
                                        button
                                        onClick={() => handleSelectAviable(item)}
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
                                Users To Join
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
                                newUsers.map((item => 
                                <>
                                    <ListItem
                                        button
                                        onClick={() => handleSelectJoin(item)}
                                    >
                                        <UserToken user={item}/>
                                    </ListItem>
                                    <Divider/>
                                </>
                                ))
                            }

                        </List>

                        <Box
                            style={{
                                padding:8
                            }}
                        >
                            <Divider/>
                            <Typography
                                variant='h6'
                            >
                                Join Period
                            </Typography>
                            <Divider/>
                        </Box>

                        <Box
                            style={{
                                display: 'flex',
                                paddingLeft: 8,
                                paddingRight: 8,
                            }}
                        >
                            <TextField 
                                style={{
                                    flex:1,
                                    marginRight:8,
                                }}
                                variant="outlined" 
                                label="From"
                                type='date'
                                name='from'
                                value={period.from}
                                onChange={handlePeriod}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField 
                                style={{
                                    flex:1,
                                }}
                                variant="outlined" 
                                label="To"
                                type='date'
                                name='to'
                                value={period.to}
                                onChange={handlePeriod}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>

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