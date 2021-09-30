import React from 'react';
import { Box,
        Card,
        CardContent,
        CardActions,
        Typography,
        Button,
        TextField,
        Container } from '@mui/material';
import { useHistory } from "react-router-dom";

import * as Users from '../controllers/users';
import * as Token from '../controllers/token';

export default function Login(props){
    let history = useHistory();

    const [check, didCheck] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        if(check){
            return;
        }

        didCheck(true);
        handleTokenCheck();
    })

    const handleTokenCheck = async() =>{

        const token = JSON.parse(window.localStorage.getItem('token'));

        if(token === null)
        {
            return;
        }

        try{
            var result = await Token.VerifyToken(token);
        }catch(e){
            console.log(e);
        }

        setEmail(result.user.email);
        setPassword(Buffer.from(result.user.password, 'base64').toString());
    }

    const handleLogin = async() =>{

        if(![email, password].every(Boolean)){
            alert('Both email and password are required');
            return;
        }

        try{
            var result = await Users.LogIn(email, password);
        }catch(e){
            console.log(`Error while login: \n${e}`);
            alert('Error while login. Please, try again');
            return;
        }

        if(!result.success){
            alert(result.message);
            return;
        }

        window.localStorage.setItem('token', JSON.stringify(result.token));

        history.push("/main");
    }

    return (
        <>

        <Container
            style={{
                display: 'flex',
                marginTop: '5%',
                justifyContent: 'center',
            }}
        >
            <Card 
                style={{
                    maxWidth: 360,
                }}            
                elevation={10}
            >
                <CardContent>
                    <Typography  variant="h5" component="h2">
                        Log In
                    </Typography>
                    
                    <Box>

                        <TextField 
                            style={{
                                marginTop: 8, 
                            }}
                            id="outlined-basic"
                            label="E-mail" 
                            variant="outlined" 
                            color= "primary"
                            placeholder="Example@mail.com"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField 
                            style={{
                                marginTop: 8, 
                            }}
                            id="outlined-basic"
                            label="Password" 
                            variant="outlined" 
                            color= "primary"
                            placeholder="PassW0rd"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </Box>
                </CardContent>
                <CardActions>
                    <Button
                        color="primary"
                        style={{
                            marginLeft:8,
                            marginRight:8,
                            marginBottom:16,
                            backgroundColor:'#3973E5',
                        }}
                        variant="contained"
                        fullWidth
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                </CardActions>
            </Card>
        </Container>
        
        </>
    );
}