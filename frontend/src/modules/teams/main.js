import React from 'react';
import { Box,
        Typography,
        Button,
        List,
        ListItem,
        Divider,
        Modal } from '@mui/material';
import { makeStyles } from "@mui/styles";

import TeamProfile from '../components/teamProfile';
import UserToken from '../components/userToken';
import TeamToken from '../components/teamToken';
import AccountToken from '../components/accountToken';

import * as Teams from '../../controllers/teams';
import Create from './create';
import Users from './users';
import Accounts from './accounts';

const useStyles = makeStyles({
    main: {
        display: 'flex',
        height: window.screen.height * 0.7,
        marginTop: '2%',
        paddingLeft: 16,
        paddingRight: 16,
    },
    mainHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
    },
    listPanel:{
        flex: 1,
        marginLeft : 8,
        padding: 8,
        border: '2px solid #CCCCCC', 
        borderRadius: 16,
        height: '100%'
    },
    listMainContent:{
        marginTop: 8,
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        height: '60%',
    },
    listContent:{
        marginTop: 8,
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        maxHeight: '80%',
    },
    dataPanel: {
        flex: 1.5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '102.5%'
    },
    dataSlide:{
        marginLeft : 8,
        padding: 8,
        border: '2px solid #CCCCCC', 
        borderRadius: 16,
        height: '46.75%'
    },
    dataSlideLabel:{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        height: '50%',
        paddingTop: '12.5%'
    },
    modalMain: {
        marginTop: '15%'
    }
});

export function Main(props){
    let styles = useStyles();

    const [boot, didBoot] = React.useState(false);
    const [bootTries, setTries] = React.useState(0);
    const [teams, setTeams] = React.useState([]);

    const [team, setTeam] = React.useState(undefined);
    const [users, setUsers] = React.useState([]);
    const [accounts, setAccounts] = React.useState([]);

    const [newModal, showModal] = React.useState(false);
    const [creating, isCreating] = React.useState(false);

    const [usersModal, showUsers] = React.useState(false);
    const [accountsModal, showAccounts] = React.useState(false);

    React.useEffect(() => {
        if(boot){
            return;
        }

        didBoot(true);
        handleTeams();
    })

    React.useEffect(() => {
        if(bootTries > 3){
            alert('Error courred while loading Teams. Please, try again later');
            return;
        }

        if(bootTries > 0){
            handleTeams();
        }
    }, [bootTries]);

    const handleTeams = async() =>{
        try{
            var result = await Teams.List();
        }catch(e){
            console.log(e);
            setTries(bootTries + 1);
            return;
        }

        if(!result.success){
            console.log(result.message);
            setTries(bootTries + 1);
            return;
        }

        setTeams(result.teams);
    }

    const handleTeamSelect = async(team) =>{
        try{
            var result = await Teams.Find(team.id);
        }catch(e){
            console.log(e);
            return;
        }

        if(!result.success){
            console.log(result.message);
            return;
        }

        setUsers(result.team.users);
        setAccounts(result.team.accounts);
        setTeam(team);
    }

    const handleTeamUpdate = async() =>{
        alert('Team profile updated successfully');
        handleTeams();
    }

    const handleTeamDelete = async() =>{
        setTeam(undefined);
        alert('Team deleted successfully');
        handleTeams();
    }

    const handleCreateDiscard = async() =>{
        if(creating){
            return;
        }

        var doIt = await window.confirm('The information will be lost, \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        showModal(false);
    }

    const handleCreateSuccess = async() =>{
        handleTeams();
        showModal(false);
    }

    const handleUsersDiscard = async() =>{
        if(creating){
            return;
        }

        var doIt = await window.confirm('The information will be lost, \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        showUsers(false);
    }

    const handleUsersSuccess = async() =>{
        showUsers(false);
        alert('Users joined successfully');
        handleTeamSelect(team);
    }

    const handleUsersDelete = async(user) =>{
        var doIt = await window.confirm('The user will be exluded from team. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        const token = JSON.parse(window.localStorage.getItem('token'));

        try{
            var result = await Teams.ExcludeUsers(team.id, user.id, token);
        }catch(e){
            alert('Error while excluding user. \nPlease, try again');
            console.log(e);
            return;
        }   

        if(!result.success){
            alert(result.message);
            return;
        }

        alert('User excluded successfully');
        handleTeamSelect(team);
    }

    const handleAccountsDiscard = async() =>{
        if(creating){
            return;
        }

        var doIt = await window.confirm('The information will be lost. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        showAccounts(false);
    }

    const handleAccountsSuccess = async() =>{
        showAccounts(false);
        alert('Accounts joined successfully');
        handleTeamSelect(team);
    }

    const handleAccountsDelete = async(account) =>{
        var doIt = await window.confirm('The account will be exluded from team. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        const token = JSON.parse(window.localStorage.getItem('token'));

        try{
            var result = await Teams.ExcludeAccount(team.id, account.id, token);
        }catch(e){
            alert('Error while excluding account. \nPlease, try again');
            console.log(e);
            return;
        }   

        if(!result.success){
            alert(result.message);
            return;
        }

        alert('Account excluded successfully');
        handleTeamSelect(team);
    }

    return (
        <>
        <Box
            className={styles.main}
        >
            <Box
                className={styles.listPanel}
            >
                <Box
                    className={styles.mainHeader}
                >
                    <Typography
                        variant='h5'
                    >
                        Registered Teams
                    </Typography>
                    <Button
                        onClick={() => showModal(true)}
                    >
                        Create Team
                    </Button>
                </Box>

                <Divider />

                <List
                    className={styles.listMainContent}
                >
                    <Divider/>
                    
                    {
                        teams.map((item => 
                        <>
                            <ListItem
                                button
                                onClick={() => handleTeamSelect(item)}
                            >
                                <TeamToken team={item}/>
                            </ListItem>
                            <Divider/>
                        </>
                        ))
                    }

                </List>

                <Divider />

                <Box
                    className={styles.mainHeader}
                    style={{
                        marginTop: 8,
                    }}
                >
                    <Typography
                        variant='h5'
                    >
                        Team Profile
                    </Typography>
                </Box>
                
                <Divider />
                <Box>
                {team === undefined && (
                        <Box
                            className={styles.dataSlideLabel}
                        >
                            <Typography
                                variant='h3'
                                color='#EEEEEE'
                            >
                                NO TEAM SELECTED
                            </Typography>
                        </Box>
                    )}

                {team !== undefined && (
                    <TeamProfile team={team} onUpdate={handleTeamUpdate} onDelete={handleTeamDelete}/>
                )}

                </Box>
            </Box>

            <Box
                className={styles.dataPanel}
            >
                <Box
                    className={styles.dataSlide}
                >
                    <Box
                        className={styles.mainHeader}
                    >
                        <Typography
                            variant='h5'
                        >
                            Team Users
                        </Typography>
                        <Button
                            disabled={team === undefined}
                            onClick={() => showUsers(true)}
                        >
                            Add Users
                        </Button>
                    </Box>

                    <Divider />

                    {team === undefined && (
                        <Box
                            className={styles.dataSlideLabel}
                        >
                            <Typography
                                variant='h2'
                                color='#EEEEEE'
                            >
                                NO TEAM SELECTED
                            </Typography>
                        </Box>
                    )}

                    {team !== undefined && (
                        <List
                            className={styles.listContent}
                        >
                            <Divider/>
                            
                            {
                                users.map((item => 
                                <>
                                    <ListItem
                                        button
                                        onClick={() => handleUsersDelete(item)}
                                    >
                                        <UserToken user={item}/>
                                    </ListItem>
                                    <Divider/>
                                </>
                                ))
                            }

                        </List>
                    )}

                </Box>

                <Box
                    className={styles.dataSlide}
                >
                    <Box
                        className={styles.mainHeader}
                    >
                        <Typography
                            variant='h5'
                        >
                            Team Accounts
                        </Typography>
                        <Button
                            disabled={team === undefined}
                            onClick={() => showAccounts(true)}
                        >
                            Add Account
                        </Button>
                    </Box>

                    <Divider />

                    {team === undefined && (
                        <Box
                            className={styles.dataSlideLabel}
                        >
                            <Typography
                                variant='h2'
                                color='#EEEEEE'
                            >
                                NO TEAM SELECTED
                            </Typography>
                        </Box>
                    )}

                    {team !== undefined && (
                        <List
                            className={styles.listContent}
                        >
                            <Divider/>
                            
                            {
                                accounts.map((item => 
                                <>
                                    <ListItem
                                        button
                                        onClick={() => handleAccountsDelete(item)}
                                    >
                                        <AccountToken account={item}/>
                                    </ListItem>
                                    <Divider/>
                                </>
                                ))
                            }

                        </List>
                    )}

                </Box>

            </Box>
        </Box>
        <Modal
            open={newModal}
            onClose={handleCreateDiscard}
        >
            <Box 
                className={styles.modalMain}
            >
                <Create onDiscard={handleCreateDiscard} onSuccess={handleCreateSuccess} status={isCreating}/>
            </Box>
        </Modal>

        <Modal
            open={usersModal}
            onClose={handleUsersDiscard}
        >
            <Box 
                style={{
                    marginTop: '10%',
                    height: '100%'
                }}
            >
                <Users onDiscard={handleUsersDiscard} onSuccess={handleUsersSuccess} status={isCreating} users={users} team={team}/>
            </Box>
        </Modal>

        <Modal
            open={accountsModal}
            onClose={handleAccountsDiscard}
        >
            <Box 
                style={{
                    marginTop: '10%',
                    height: '100%'
                }}
            >
                <Accounts onDiscard={handleAccountsDiscard} onSuccess={handleAccountsSuccess} status={isCreating} accounts={accounts} team={team}/>
            </Box>
        </Modal>

        </>
    );
}