import React from 'react';
import { Box,
        Card,
        CardContent,
        CardActions,
        Typography,
        Button,
        TextField,
        Divider} from '@mui/material';
import { makeStyles } from '@mui/styles';

import * as Accounts from '../../controllers/accounts';

const useStyles = makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
    },
    header: {
        padding: 16,
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

export default function Create(props){
    let styles = useStyles();

    const [account, setAccount] = React.useState({
        name: '',
        client: '',
        manager: '',
        status: true
    });

    const handleChanges = async(e) =>{
        setAccount({...account, [e.target.name]:e.target.value});
    }

    const handleCreate = async() =>{
        if(![account.name,account.client,account.manager].every(Boolean)){
            alert('All parameters are required');
            return;
        }

        var doIt = await window.confirm('A new account will be created. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        const token = JSON.parse(window.localStorage.getItem('token'));

        try{
            var result = await Accounts.Create(account, token);
        }catch(e){
            alert('Error while creating account. \nPlease, try again');
            return;
        }

        if(!result.success){
            alert(result.message);
            return;
        }

        props.onSuccess();
    }

    return (
        <>
        <Card
            className={styles.main}
        >
            <Box
                className={styles.header}
            >
                <Typography
                    variant='h5'
                >
                    Create Account
                </Typography>
                <Divider />
            </Box>
            <CardContent
                className={styles.containerB}
            >
                <TextField 
                    label="Account's Name" 
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

            </CardContent>

            <CardActions
                className={styles.containerC}
            >
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
                    onClick={props.onDiscard}
                >
                    DISCARD
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
                    onClick={handleCreate}
                >
                    CREATE
                </Button>
            </CardActions>

        </Card>
        </>
    );
}