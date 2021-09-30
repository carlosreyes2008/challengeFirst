import React from 'react';
import { Box,
        Button,
        TextField,
        FormGroup,
        FormControlLabel,
        Switch } from '@mui/material';
import { makeStyles } from '@mui/styles';

import * as Accounts from '../../controllers/accounts';

const useStyles = makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
    },
    containerB:{
        marginTop: 16,
        display: 'flex',
        flexDirection: 'column',
    },
    containerC:{
        display: 'flex',
        marginTop: 8,
    },
});

export default function AccountProfile(props){
    let styles = useStyles();

    const [account, setAccount] = React.useState({
        id: '',
        name: '',
        client: '',
        manager: '',
        status: true
    });

    const [delta, setDelta] = React.useState({
        id: '',
        name: '',
        client: '',
        manager: '',
        status: true
    });

    React.useEffect(() =>{
        setAccount(props.account);
        setDelta(props.account);
    },[props.account]);

    const handleChanges = async(e) => {
        if(e.target.name === 'status'){
            setAccount({...account, [e.target.name] : e.target.checked});    
            return;
        }
        setAccount({...account, [e.target.name] : e.target.value});
    }

    const handleDiscard = async() =>{
        var doIt = await window.confirm('Do you want to discard the changes?');

        if(!doIt){
            return;
        }

        setAccount(delta);
    }

    const handleUpdate = async() =>{
        if(![account.name, account.client, account.manager].every(Boolean)){
            alert('The parameters can\'t be empty');
            return;
        }

        var doIt = await window.confirm('Do you want to update the changes?');

        if(!doIt){
            return;
        }

        const token = JSON.parse(window.localStorage.getItem('token'));

        try{
            var result = await Accounts.Update(account, token);
        }catch(e){
            alert('Error while updating account. \nPlease, try again');
            return;
        }

        if(!result.success){
            alert(result.message);
            return;
        }

        setDelta(account);

        props.onUpdate();
    }

    const handleDelete = async() =>{
        var doIt = await window.confirm('The account will be deleted. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        const token = JSON.parse(window.localStorage.getItem('token'));

        try{
            var result = await Accounts.Remove(account.id, token);
        }catch(e){
            alert('Error while deleting account. \nPlease, try again');
            return;
        }

        if(!result.success){
            alert(result.message);
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
                className={styles.containerB}
            >
                <TextField 
                    label="Name" 
                    variant="outlined" 
                    color= "primary"
                    placeholder="Enter your User Name"
                    name='name'
                    value={account.name}
                    onChange={handleChanges}
                    fullWidth
                />

                <TextField 
                    style={{
                        marginTop:8
                    }}
                    label="Account's Client" 
                    variant="outlined" 
                    color= "primary"
                    placeholder="Enter Client's name"
                    name='client'
                    value={account.client}
                    onChange={handleChanges}
                    fullWidth
                />

                <TextField 
                    style={{
                        marginTop:8
                    }}
                    label="Account's Manager" 
                    variant="outlined" 
                    color= "primary"
                    placeholder="Enter Manager's name"
                    name='manager'
                    value={account.manager}
                    onChange={handleChanges}
                    fullWidth
                />

                <FormGroup
                    style={{
                        flex: 1,
                        marginLeft: 12
                    }}
                >
                    <FormControlLabel 
                        control={<Switch 
                            name='status'
                            value={account.status}
                            checked={account.status}
                            onChange={handleChanges}
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
                    DELETE
                </Button>
                <Button
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