const tokens = require('./tokens');
const {teams, teams_users, users, teams_accounts, accounts} = require('../models');

exports.Create = async function(req, res){
    const { team } = req.body;
    const { token:Authorization } = req.headers;

    try{
        var decoded = await tokens.VerifyToken(Authorization);
    }catch(e){
        decoded = undefined;
    }

    if(decoded ===  undefined || !decoded){
        res.status(401).json({
                success: false,
                message: 'Invalid Token'
            });
        return;
    }

    try{
        var result = await teams.create({...team});
    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error while creating new team',
            error: err.original.errno,
        });
    }

    res.json({
        success: true,
        message: 'Team created successfully',
        team: result
    });
}

exports.List = async function(req, res){
    try{
        var result = await teams.findAll();
    }catch(e){
        res.status(400).json({
            success: false,
            message: 'Error while fetching teams',
            error: err.original.errno,
        });
    }

    res.json({
        success: true,
        message: 'Teams fetched successfully',
        teams: result,
    });
}

exports.Find = async function(req, res){
    const { teamId } = req.params;
    try{
        var result = await teams.findOne({ 
            where : { id : teamId},
            include: [
                {model: users, as: 'users'},
                {model: accounts, as: 'accounts'}]
            });
    }catch(e){
        res.status(400).json({
            success: false,
            message: 'Error while fetching team',
            error: err.original.errno,
        });
    }

    res.json({
        success: true,
        message: 'Team fetched successfully',
        team: result,
    });
}

exports.Update = async function(req, res){
    const {team} = req.body;
    const { token:Authorization } = req.headers;

    try{
        var decoded = await tokens.VerifyToken(Authorization);
    }catch(e){
        decoded = undefined;
    }

    if(decoded ===  undefined || !decoded){
        res.status(401).json({
                success: false,
                message: 'Invalid Token'
            });
        return;
    }

    try{
        var result = await teams.update(team, {where : {
            id: team.id
        }});
    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error while updating team',
            error: err,
        });
    }
    
    res.json({
        success: true,
        message: 'Team updated successfully',
        result: result
    });
}

exports.Remove = async function(req, res){
    const { teamId } = req.params;
    const { token:Authorization } = req.headers;

    try{
        var decoded = await tokens.VerifyToken(Authorization);
    }catch(e){
        decoded = undefined;
    }

    if(decoded ===  undefined || !decoded){
        res.status(401).json({
                success: false,
                message: 'Invalid Token'
            });
        return;
    }

    try{
        var result = await teams.destroy({where: { id : teamId}});
    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error while removing teams',
            error: err,
        });
    }
    
    res.json({
        success: true,
        message: 'Teams removed successfully',
        result: result
    });
}

exports.JoinUsers = async function(req, res){
    const { users } = req.body;
    const { token:Authorization } = req.headers;

    try{
        var decoded = await tokens.VerifyToken(Authorization);
    }catch(e){
        decoded = undefined;
    }

    if(decoded ===  undefined || !decoded){
        res.status(401).json({
                success: false,
                message: 'Invalid Token'
            });
        return;
    }

    try{
        var result = await teams_users.bulkCreate(users);
    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error while joining users to team',
            error: err,
        });
    }

    res.json({
        success: true,
        message: 'Users join to team successfully',
        users: result
    });
}

exports.ExcludeUsers = async function(req, res){
    const {userId, teamId} = req.params;
    const { token:Authorization } = req.headers;

    try{
        var decoded = await tokens.VerifyToken(Authorization);
    }catch(e){
        decoded = undefined;
    }

    if(decoded ===  undefined || !decoded){
        res.status(401).json({
                success: false,
                message: 'Invalid Token'
            });
        return;
    }

    try{
        var result = await teams_users.destroy({where: { teams_id: teamId, users_id : userId}});
    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error while excluding users from team',
            error: err,
        });
    }
    
    res.json({
        success: true,
        message: 'Users excluded from team successfully',
        result: result
    });
}

exports.JoinAccount = async function(req, res){
    const { accounts } = req.body;
    const { token:Authorization } = req.headers;

    try{
        var decoded = await tokens.VerifyToken(Authorization);
    }catch(e){
        decoded = undefined;
    }

    if(decoded ===  undefined || !decoded){
        res.status(401).json({
                success: false,
                message: 'Invalid Token'
            });
        return;
    }

    try{
        var result = await teams_accounts.bulkCreate(accounts);
    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error while joining team to account',
            error: err.original.errno,
        });
    }

    res.json({
        success: true,
        message: 'Team join to accounts successfully',
        accounts: result
    });
}

exports.ExcludeAccount = async function(req, res){
    const {accountId, teamId} = req.params;
    const { token:Authorization } = req.headers;

    try{
        var decoded = await tokens.VerifyToken(Authorization);
    }catch(e){
        decoded = undefined;
    }

    if(decoded ===  undefined || !decoded){
        res.status(401).json({
                success: false,
                message: 'Invalid Token'
            });
        return;
    }

    try{
        var result = await teams_accounts.destroy({where: { teams_id : teamId, accounts_id : accountId}});
    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error while excluding account from team',
            error: err,
        });
    }
    
    res.json({
        success: true,
        message: 'Account excluded from team successfully',
        result: result
    });
}