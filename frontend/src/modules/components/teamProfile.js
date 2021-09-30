import React from 'react';
import { Box,
        Button,
        TextField,
        FormGroup,
        FormControlLabel,
        Switch } from '@mui/material';
import { makeStyles } from '@mui/styles';

import * as Teams from '../../controllers/teams';

const useStyles = makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
    },
    containerA:{
        display: 'inline-flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 4,
    },
    containerC:{
        display: 'flex',
        marginTop: 8,
    },
});

export default function TeamProfile(props){
    let styles = useStyles();

    const [work, doWork] = React.useState(false);

    const [team, setTeam] = React.useState({
        id: '',
        name: '',
        status: true
    });

    const [delta, setDelta] = React.useState();

    React.useEffect(() => {
        setDelta(props.team);
        setTeam(props.team);
    }, [props.team]);

    const handleName = async(e) =>{
        setTeam({...team, name : e.target.value});
    } 

    const handleStatus= async(e) =>{
        setTeam({...team, status : e.target.checked});
    } 

    const handleDiscard = async() =>{
        var doIt = await window.confirm('The information will be lost, \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        setTeam(delta);
    }

    const handleUpdate = async() =>{

        if(![team.name].every(Boolean)){
            alert('Name can\'t be left empty');
            return;
        }

        var doIt = await window.confirm('The information will be updated, \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        doWork(true);

        const token = JSON.parse(window.localStorage.getItem('token'));

        try{
            var result = await Teams.Update(team, token);
        }catch(e){
            alert('Error while updating teams. Please, try again');
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
        props.onUpdate();
    }

    const handleDelete = async() =>{
        var doIt = await window.confirm('The team will be deleted, \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        doWork(true);

        const token = JSON.parse(window.localStorage.getItem('token'));

        try{
            var result = await Teams.Remove(team.id, token);
        }catch(e){
            alert("Error while deleting team. Please, try again");
            console.log(e);
            doWork(false);
            return;
        }

        if(!result.success){
            alert(result.message);
            doWork(false);
            return;
        }

        props.onDelete();
    }

    return (
        <>
        <Box
            className={styles.main}
        >
            <Box
                className={styles.containerA}
            >
                <TextField 
                    style={{
                        flex: 2.05
                    }}
                    label="Name" 
                    variant="outlined" 
                    color= "primary"
                    value={team.name}
                    onChange={handleName}
                    margin='normal'
                />

                <FormGroup
                    style={{
                        flex: 1,
                        marginLeft: 12
                    }}
                >
                    <FormControlLabel 
                        control={<Switch 
                            value={team.status}
                            checked={team.status}
                            onChange={handleStatus}
                        />} 
                        label="Active Status" 
                    />
                </FormGroup>
            </Box>

            <Box
                className={styles.containerC}
            >
                <Button
                    style={{
                        marginLeft:8,
                        marginRight:8,
                        marginBottom:16,
                        border: '2px solid #FF0000', 
                        color: '#FF0000',
                        backgroundColor: '#FFFFFF',
                        fontWeight: 'bold'
                    }}
                    variant="contained"
                    fullWidth
                    onClick={handleDelete}
                >
                    DELETE TEAM
                </Button>
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
                    onClick={handleDiscard}
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
                        fontWeight: 'bold',
                        backgroundColor:'#3973E5',
                    }}
                    variant="contained"
                    fullWidth
                    onClick={handleUpdate}
                >
                    UPDATE
                </Button>
            </Box>

        </Box>
        </>
    );
}