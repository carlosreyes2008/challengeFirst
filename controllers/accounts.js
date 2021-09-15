const tokens = require('./tokens');
const {accounts, teams} = require('../models');

exports.Create = async function(req, res){
    const { account } = req.body;
    const{ Authorization } = req.headers;

    try{
        var decoded = await tokens.VerifyToken(Authorization);
    }catch(e){
        decoded = undefined;
    }

    if(decoded ===  undefined || !decoded){
        res.status(401).json({
                operation : 'fail',
                message: 'Invalid Token'
            });
    }

    try{
        var result = await accounts.create(account);
    }catch(e){
        res.status(400).json({
            operation : 'fail',
            message: 'Error while creating new team',
            error: err.original.errno,
        });
    }

    res.json({
        operation : 'success',
        message: 'Account created successfully',
        account: result
    });
}

exports.List = async function(req, res){
    try{
        var result = await accounts.findAll();
    }catch(err){
        res.status(400).json({
            operation : 'fail',
            message: 'Error while fetching accounts',
            error: err,
        });
    }

    res.json({
        operation : 'success',
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
            operation : 'fail',
            message: 'Error while fetching Account',
            error: err,
        });
    }

    res.json({
        operation : 'success',
        message : 'Account fetched successfully',
        account : result,
    });
}

exports.Update = async function(req, res){
    const {account} = req.body;
    const{ Authorization } = req.headers;

    try{
        var decoded = await tokens.VerifyToken(Authorization);
    }catch(e){
        decoded = undefined;
    }

    if(decoded ===  undefined || !decoded){
        res.status(401).json({
                operation : 'fail',
                message: 'Invalid Token'
            });
    }

    try{
        var result = await accounts.update(account, {where : {
            id: account.id
        }});
    }catch(err){
        res.status(400).json({
            operation : 'fail',
            message: 'Error while updating account',
            error: err,
        });
    }
    
    res.json({
        operation : 'success',
        message: 'Account updated successfully',
        result: result
    });
}

exports.Remove = async function(req, res){
    const { accountId } = req.params;
    const{ Authorization } = req.headers;

    try{
        var decoded = await tokens.VerifyToken(Authorization);
    }catch(e){
        decoded = undefined;
    }

    if(decoded ===  undefined || !decoded){
        res.status(401).json({
                operation : 'fail',
                message: 'Invalid Token'
            });
    }

    try{
        var result = await accounts.destroy({where: { id : accountId}});
    }catch(err){
        res.status(400).json({
            operation : 'fail',
            message: 'Error while removing accounts',
            error: err,
        });
    }
    
    res.json({
        operation : 'success',
        message: 'Accounts removed successfully',
        result: result
    });
}