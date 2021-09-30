import React from 'react';
import { Box,
        Card,
        CardContent,
        CardActions,
        Typography,
        Button,
        TextField,
        Container,
        Divider } from '@mui/material';
import { useHistory } from "react-router-dom";

import * as Token from '../../controllers/token';
import * as User from '../../controllers/users';

export function Main(props){
    let history = useHistory();

    const [check, didCheck] = React.useState(false);
    const [user, setUser] = React.useState({
        name: null,
        email: null,
        role: null,
        english: null,
        skills: null,
        cv_link: null,
    });

    const [delta, setDelta] = React.useState(undefined);
    const [update, hasUpdates] = React.useState(false);
    const [work, doWork] = React.useState(false);

    React.useEffect(() => {
        if(check){
            return;
        }

        didCheck(true);
        handleTokenCheck();
    });

    React.useEffect(() => {
        if(delta === undefined){
            return;
        }
        handleUpdates();
    }, [user])

    const handleTokenCheck = async() =>{

        const token = JSON.parse(window.localStorage.getItem('token'));

        if(token === null)
        {
            history.push("/");
            return;
        }

        try{
            var result = await Token.VerifyToken(token);
        }catch(e){
            console.log(e);
        }

        setUser(result.user);
        setDelta(result.user);
    }

    const handleUpdates = async() => {
        hasUpdates(false);
        for (const key in user) {
            if(delta[key] !== user[key]){
                hasUpdates(true);
            }
        }
    }

    const handleChanges = async(e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleUpdate = async() => {
        var doIt = await window.confirm('Do you want to updated your profile?');

        if(!doIt){
            return;
        }

        doWork(true);

        const token = JSON.parse(window.localStorage.getItem('token'));

        try{
            var updateResult = await User.Update(user, token);
        }catch(e){
            console.log(e);
            alert('Error while updating. Please, try again');
            doWork(false);
            return;
        }

        if(!updateResult.success){
            alert(updateResult.message);
            doWork(false);
            return;
        }

        handleRefeshToken();
    }

    const handleRefeshToken = async() => {
        var decodedPass = Buffer.from(user.password, 'base64').toString();

        try{
            var tokenResult = await User.LogIn(user.email, decodedPass);
        }catch(e){
            console.log(e); 
            history.push("/");
            return;
        }

        window.localStorage.setItem('token', JSON.stringify(tokenResult.token));

        alert('Profile updated successfully');
        setDelta(undefined);
        hasUpdates(false);
        doWork(false);

        handleTokenCheck();
    }

    const handleDiscard = async() => {
        var doIt = await window.confirm('Do you want to discard the changes?');

        if(!doIt){
            return;
        }

        for (const key in delta) {
            user[key] = delta[key] === null ? '' : delta[key];
        }

        setUser({...user});
    }

    return (
        <>

        <Container
            style={{
                display: 'flex',
                marginTop: '2%',
                justifyContent: 'center',
            }}
        >
            <Card 
                style={{
                    maxWidth: '50%',
                }}            
                elevation={10}
            >
                <CardContent>
                    <Typography  variant="h5" component="h2" color='primary'>
                        My Profile
                    </Typography>

                    <Divider />                    

                    <Box>

                        <TextField 
                            style={{
                                marginTop: 8, 
                            }}
                            inputProps={{
                                    readOnly:true,
                                }}
                            label="E-mail" 
                            variant="standard" 
                            color= "primary"
                            value={user.email}
                            fullWidth
                        />

                        <TextField 
                            style={{
                                marginTop: 8, 
                            }}
                            inputProps={{
                                    readOnly:true,
                                }}
                            label="Role" 
                            variant="standard" 
                            color= "primary"
                            value={user.role}
                            fullWidth
                        />

                        <TextField 
                            style={{
                                marginTop: 8, 
                            }}
                            inputProps={{
                                    readOnly:true,
                                }}
                            label="English Level" 
                            variant="standard" 
                            color= "primary"
                            placeholder="Enter your User Name"
                            value={user.english}
                            fullWidth
                        />
                        
                        <Divider 
                            style={{
                                marginTop: 24,
                            }}
                        >                    
                            <Typography>
                                 v Update your info v
                            </Typography>
                        </ Divider>

                        <TextField 
                            style={{
                                marginTop: 24, 
                            }}
                            label="Name" 
                            variant="outlined" 
                            color= "primary"
                            name='name'
                            value={user.name}
                            onChange={(e) => handleChanges(e)}
                            fullWidth
                        />

                        <TextField 
                            style={{
                                marginTop: 8, 
                            }}
                            label="Skill Set" 
                            variant="outlined" 
                            color= "primary"
                            placeholder="Enter your skills"
                            name='skills'
                            value={user.skills}
                            onChange={(e) => handleChanges(e)}
                            fullWidth
                        />

                        <TextField 
                            style={{
                                marginTop: 8, 
                            }}
                            label="Digital CV" 
                            variant="outlined" 
                            color= "primary"
                            placeholder="Enter your CV URL"
                            name='cv_link'
                            value={user.cv_link}
                            onChange={(e) => handleChanges(e)}
                            fullWidth
                        />
                    </Box>
                </CardContent>
                <CardActions
                    style={{
                        display: update ? 'flex' : 'none',
                    }}
                >
                    <Button
                        disabled={work}
                        color="primary"
                        style={{
                            marginLeft:8,
                            marginRight:8,
                            marginBottom:16,
                            backgroundColor:'#FF0000',
                        }}
                        onClick={() => handleDiscard()}
                        variant="contained"
                        fullWidth
                    >
                        DISCARD CHANGES
                    </Button>
                    <Button
                        disabled={work}
                        color="primary"
                        style={{
                            marginLeft:8,
                            marginRight:8,
                            marginBottom:16,
                            backgroundColor:'#3973E5',
                        }}
                        onClick={() => handleUpdate()}
                        variant="contained"
                        fullWidth
                    >
                        UPDATE
                    </Button>
                </CardActions>
            </Card>
        </Container>
        
        </>
    );
}