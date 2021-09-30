import React from "react";
import { Box,
        AppBar,
        Button,
        IconButton,
        Typography,
        Toolbar,
        Drawer,
        List,
        ListItem,
        ListItemText,
        Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from "react-router-dom";

import * as Token from '../controllers/token';

import {Main as Profile} from '../modules/profile/main';
import {Main as Users} from '../modules/users/main';
import {Main as Teams} from '../modules/teams/main';
import {Main as Accounts} from '../modules/accounts/main';

const useStyles = makeStyles({
  drawerStyle: {
    background: "#3f50b5"
  },
  itemStyle:{
      background: "#5f60f5",
      color: '#FFFFFF',
      fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    fontWeight: 'bold',
  },
});

export default function Main(props){
    let history = useHistory();
    
    const styles = useStyles();
    const [user, setUser] = React.useState(undefined);
    const [check, didCheck] = React.useState(false);

    const [menu, showMenu] = React.useState(false);
    const [section, setSection] = React.useState({
        title: 'My Profile',
        module: <Profile />,
    });

    React.useEffect(() => {
        if(check){
            return;
        }

        didCheck(true);
        handleTokenCheck();
    })

    React.useEffect(() => {
        showMenu(false);
    }, [section])

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
    }

    const handleMenu = async(option) => {
        setSection(option)
    }

    const handleLogout = async() => {
        var doIt = await window.confirm('Are you sure to log-out?');

        if(!doIt){
            return;
        }

        window.localStorage.removeItem('token');
        history.push("/");
    }

    return(
        <>
        <Box
            style={{
                flexGrow: 1,
            }}
        >
            <AppBar
                position='static'
            >
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        onClick={()=> showMenu(true)}
                    >
                        <MenuIcon
                            style={{
                                color: '#FFFFFF'
                            }}
                        />
                    </IconButton>
                    <Typography 
                        variant='h6'
                        component='div'
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        {section.title}
                    </Typography>
                    <Button
                        className={styles.logoutButton}
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
        <Box>
            {section.module}
        </Box>
        <Drawer
            anchor='left'
            open={menu}
            onClose={()=> showMenu(false)}
            classes={{
                paper: styles.drawerStyle
            }}
        >
            <Box
            >
                <List>
                    <ListItem 
                        button
                        key='Profile'
                        className={styles.itemStyle}
                        onClick={() => handleMenu({title: 'My Profile', module:<Profile />})}
                    >
                        <ListItemText primary='My Profile'/>
                    </ListItem>
                    { user !== undefined && user.role !== 'users' && (
                        <>
                            <Divider />
                            <ListItem 
                                button
                                key='Users'
                                className={styles.itemStyle}
                                onClick={() => handleMenu({title: 'Users', module:<Users />})}
                            >
                                <ListItemText primary='Users'/>
                            </ListItem>
                            <Divider />
                            <ListItem 
                                button
                                key='Teams'
                                className={styles.itemStyle}
                                onClick={() => handleMenu({title: 'Teams', module:<Teams />})}
                            >
                                <ListItemText primary='Teams'/>
                            </ListItem>
                            <Divider />
                            <ListItem 
                                button
                                key='Accounts'
                                className={styles.itemStyle}
                                onClick={() => handleMenu({title: 'Accounts', module:<Accounts />})}
                            >
                                <ListItemText primary='Accounts'/>
                            </ListItem>
                        </>
                    )}
                </List>
            </Box>
        </Drawer>
        </>
    );
}