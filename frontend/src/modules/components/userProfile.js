import React from 'react';
import { Box,
        Button,
        TextField,
        InputLabel,
        MenuItem,
        FormControl,
        Select } from '@mui/material';
import { makeStyles } from '@mui/styles';

import * as User from '../../controllers/users';

const useStyles = makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
    },
    containerA:{
        display: 'flex',
        justifyContent: 'space-evenly',
        padding: 4,
    },
    containerB:{
        display: 'flex',
        flexDirection: 'column',
    },
    containerC:{
        display: 'flex',
        marginTop: 8,
    },
});

export default function UserProfile(props){
    let styles = useStyles();

    const [user, setUser] = React.useState({
        id: 1,
        name: '',
        email: '',
        role: '',
        english: '',
        skills: '',
        cv_link: ''
    });

    const [delta, setDelta] = React.useState(undefined);
    const [work, doWork] = React.useState(false);

    const handleRoleChange = (event) => {
        setUser({...user, role: event.target.value});
    };

    React.useEffect(() => {
        var newUser = {...props.user};
        
        for (const key in newUser) {
            newUser[key] = newUser[key] === null ? '' : newUser[key];
        }

        setDelta(newUser);
        setUser(newUser);
    }, [props.user]);

    const handleChanges = async(e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleUpdate = async() => {
        var doIt = await window.confirm('Do you want to updated the user\'s profile?');

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

        setDelta(user);
        props.onUpdate();
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

    const handleDelete = async() =>{
        var doIt = await window.confirm('Do you want to delete the user?');

        if(!doIt){
            return;
        }

        const token = JSON.parse(window.localStorage.getItem('token'));

        try{
            var deleteResult = await User.Remove(user, token);
        }catch(e){
            console.log(e);
            alert('Error while deleting. Please, try again');
            doWork(false);
            return;
        }

        if(!deleteResult.success){
            alert(deleteResult.message);
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
                    label="Name" 
                    variant="outlined" 
                    color= "primary"
                    value={user.name}
                    name='name'
                    onChange={(e) => handleChanges(e)}
                    fullWidth
                    margin='normal'
                />

                <TextField 
                    style={{
                        marginLeft:8,
                        marginRight:8,
                    }}
                    label="E-mail" 
                    variant="outlined" 
                    color= "primary"
                    name='email'
                    value={user.email}
                    onChange={(e) => handleChanges(e)}
                    fullWidth
                    margin='normal'
                />

                <FormControl 
                    margin='normal'
                    fullWidth
                >
                    <InputLabel id="label">Role</InputLabel>
                    <Select
                        labelId="label"
                        id="demo-simple-select"
                        value={user.role}
                        placeholder="Enter english level"
                        label="Role"
                        onChange={handleRoleChange}
                    >
                        <MenuItem value={'admin'}>Admin Role</MenuItem>
                        <MenuItem value={'users'}>User Role</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box
                className={styles.containerB}
            >
                <TextField 
                    label="English Level" 
                    variant="outlined" 
                    color= "primary"
                    name='english'
                    placeholder="Enter your User Name"
                    value={user.english}
                    onChange={(e) => handleChanges(e)}
                    fullWidth
                />

                <TextField 
                    style={{
                        marginTop:8
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
                        marginTop:8
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

            <Box
                className={styles.containerC}
            >
                <Button
                    disabled={work}
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
                    DELETE USER
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