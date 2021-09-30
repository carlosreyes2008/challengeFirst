import React from 'react';
import { Box,
        Card,
        CardContent,
        CardActions,
        Typography,
        Button,
        TextField,
        Container,
        Divider,
        InputLabel,
        MenuItem,
        FormControl,
        Select} from '@mui/material';

import * as Users from '../../controllers/users';

export default function Create(props){

    const [work, doWork] = React.useState(false);

    const [name, setName] = React.useState('');
    const [password, setPass] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [english, setEnglish] = React.useState('');

    const [role, setRole] = React.useState('');
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    React.useEffect(() => {
        props.status(work);
    }, [work])

    const handleCreate = async() =>{
        if(![name, password, email, english, role].every(Boolean)){
            alert('All parameters are required. \nPlease verify teh information');
            return;
        }

        var doIt = await window.confirm('Please verify the information. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        doWork(true);

        const token = JSON.parse(window.localStorage.getItem('token'));
        const user = {
            name: name,
            password: password,
            email: email,
            role: role,
            english: english,
        };

        try{
            var result = await Users.Create(user, token);
        }catch(e){
            alert('Error while creating user. Please, try again');
            console.log(e);
            doWork(false);
            return;
        }

        if(!result.success){
            alert(result.message);
            doWork(false);
            return;
        }

        doWork(false);
        alert('User created successfully');
        props.onSuccess();
    }

    const handleDiscard = async() =>{
        var doIt = await window.confirm('The information will be lost. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        props.onDiscard();
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
                        CREATE NEW USER
                    </Typography>

                    <Divider />                    

                    <Box>

                        <TextField 
                            style={{
                                marginTop: 8, 
                            }}
                            label="Name" 
                            variant="outlined" 
                            color= "primary"
                            placeholder="Enter user name"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <TextField 
                            style={{
                                marginTop: 8, 
                            }}
                            label="E-mail" 
                            variant="outlined" 
                            color= "primary"
                            placeholder="user@mail.com"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField 
                            style={{
                                marginTop: 8, 
                            }}
                            autoComplete={false}
                            label="Password" 
                            variant="outlined" 
                            color= "primary"
                            placeholder="Enter password"
                            fullWidth
                            type="password"
                            value={password}
                            onChange={(e) => setPass(e.target.value)}
                        />

                        <TextField 
                            style={{
                                marginTop: 8, 
                            }}
                            label="English Level" 
                            variant="outlined" 
                            color= "primary"
                            placeholder="Enter english level"
                            fullWidth
                            value={english}
                            onChange={(e) => setEnglish(e.target.value)}
                        />

                        <FormControl 
                            style={{
                                marginTop: 8, 
                            }}
                            fullWidth
                        >
                            <InputLabel id="label">Role</InputLabel>
                            <Select
                                labelId="label"
                                id="demo-simple-select"
                                value={role}
                                placeholder="Enter english level"
                                label="Role"
                                onChange={handleRoleChange}
                            >
                                <MenuItem value={'admin'}>Admin Role</MenuItem>
                                <MenuItem value={'users'}>User Role</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                </CardContent>
                <CardActions>
                    <Button
                        disabled={work}
                        color="primary"
                        style={{
                            marginLeft:8,
                            marginRight:8,
                            marginBottom:16,
                            backgroundColor:'#FF0000',
                        }}
                        variant="contained"
                        fullWidth
                        onClick={handleDiscard}
                    >
                        DISCARD
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
                        variant="contained"
                        fullWidth
                        onClick={handleCreate}
                    >
                        CREATE
                    </Button>
                </CardActions>
            </Card>
        </Container>
        
        </>
    );
}