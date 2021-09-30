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

import * as Teams from '../../controllers/teams';

export default function Create(props){
    const [work, doWork] = React.useState(false);

    const [team, setTeam] = React.useState({
        name: '',
        status: true
    });

    React.useEffect(() => {
        props.status(work);
    }, [work])

    const handleName = async(e) =>{
        setTeam({...team, name : e.target.value});
    }

    const handleCreate = async() =>{

        if(![team.name].every(Boolean)){
            alert('A name must be entered');
            return;
        }

        var doIt = await window.confirm('The team will be created, \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        const token = JSON.parse(window.localStorage.getItem('token'));

        try{
            var result = await Teams.Create(team, token);
        }catch(e){
            alert('Error while creating team. Please, try again');
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
        alert('Team created successfully');
        props.onSuccess();
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
                    width: '50%',
                }}            
                elevation={10}
            >
                <CardContent>
                    
                    <Typography  variant="h5" component="h2" color='primary'>
                        CREATE NEW TEAM
                    </Typography>

                    <Divider />                    

                    <Box>
                        <TextField 
                            fullWidth
                            label="Team Name" 
                            variant="outlined" 
                            color= "primary"
                            value={team.name}
                            onChange={handleName}
                            margin='normal'
                        />
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
                            fontWeight: 'bold',
                            backgroundColor:'#FF0000',
                        }}
                        variant="contained"
                        fullWidth
                        onClick={props.onDiscard}
                    >
                        DISCARD TEAM
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
                        onClick={handleCreate}
                    >
                        CREATE TEAM
                    </Button>
                </CardActions>
            </Card>
        </Container>
        </>
    );
}