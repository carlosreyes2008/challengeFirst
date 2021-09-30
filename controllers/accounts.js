const tokens = require('./tokens');
const {accounts, teams} = require('../models');

exports.Create = async function(req, res){
    const { account } = req.body;
    const{ token:Authorization } = req.headers;

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
        var result = await accounts.create(account);
    }catch(e){
        res.status(400).json({
            success: false,
            message: 'Error while creating new team',
            error: err.original.errno,
        });
    }

    res.json({
        success: true,
        message: 'Account created successfully',
        account: result
    });
}

exports.List = async function(req, res){
    try{
        var result = await accounts.findAll();
    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error while fetching accounts',
            error: err,
        });
    }

    res.json({
        success: true,
        message: 'Accounts fetched successfully',
        accounts: result,
    });
}

exports.Find = async function(req, res){
    const { accountId } = req.params;
    try{
        var result = await accounts.findOne({ 
            where : { id : accountId},
            include: [{model: teams, as: 'teams'}] });
    }catch(e){
        res.status(400).json({
            success: false,
            message: 'Error while fetching Account',
            error: err,
        });
    }

    res.json({
        success: true,
        message : 'Account fetched successfully',
        account : result,
    });
}

exports.Update = async function(req, res){
    const {account} = req.body;
    const{ token:Authorization } = req.headers;

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
        var result = await accounts.update(account, {where : {
            id: account.id
        }});
    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error while updating account',
            error: err,
        });
    }
    
    res.json({
        success: true,
        message: 'Account updated successfully',
        result: result
    });
}

exports.Remove = async function(req, res){
    const { accountId } = req.params;
    const{ token:Authorization } = req.headers;

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
        var result = await accounts.destroy({where: { id : accountId}});
    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error while removing accounts',
            error: err,
        });
    }
    
    res.json({
        success: true,
        message: 'Accounts removed successfully',
        result: result
    });
}