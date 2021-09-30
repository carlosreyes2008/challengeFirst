const tokens = require('./tokens');
const { Op } = require("sequelize");
const {users, teams } = require('../models');

exports.Login = async function(req, res){
    const {email, password} = req.body;

    try{
        var result = await users.findOne({where : {email, password}});
    }catch(e){
        result = undefined;
    }

    switch(result){
        case undefined:
            res.status(400).json({
                success : false,
                message: 'Error fetching data'
            });
            break;
        case null:
            res.status(404).json({
                success : false,
                message: 'User not found'
            });
            break;
    }

    try{
        var token = await tokens.NewToken(result);
    }catch(e){
        res.status(400).json({
            success : false,
            message: 'Unable to sing token'
        });
    }

    res.json({
        success : true,
        token: token
    });
}

exports.Create = async function(req, res){
    const { user } = req.body;
    const { token:Authorization } = req.headers;

    try{
        var decoded = await tokens.VerifyToken(Authorization);
    }catch(e){
        decoded = undefined;
    }

    if(decoded ===  undefined || !decoded){
        res.status(401).json({
                success : false,
                message: 'Invalid Token'
            });
        return;
    }

    try{
        var result = await users.create({...user});
    }catch(err){
        if(err.original.errno === 1062){
            res.status(409).json({
                success : false,
                message: 'User e-mail already exists',
            });
        }else{
            res.status(400).json({
                success : false,
                message: 'Error while creating new user',
                error: err.original.errno,
            });
        }
    }

    res.json({
        success : true,
        message: 'User created successfully',
        user: result
    });
}

exports.List = async function(req, res){
    try{
        var result = await users.findAll({
            where : {
                role : {
                    [Op.not] : 'super'
                }
            }
        });
    }catch(err){
        res.status(400).json({
            success : false,
            message: 'Error while fetching users',
            error: err,
        });
    }

    res.json({
        success : true,
        message: 'Users fetched successfully',
        users: result,
    });
}

exports.Find = async function(req, res){
    const { userId } = req.params;
    try{
        var result = await users.findOne({ 
            where : { id : userId},
            include: [{model: teams, as: 'teams'}] });
    }catch(e){
        res.status(400).json({
            success : false,
            operation : 'fail',
            message: 'Error while fetching user',
            error: err,
        });
    }

    if(result === null){
        res.status(404).json({
            success : false,
            operation : 'fail',
            message: 'User not found',
        });
    }

    res.json({
        success : true,
        user: result,
    });
}

exports.Remove = async function(req, res){
    const { userId } = req.params;
    const { token:Authorization } = req.headers;

    try{
        var decoded = await tokens.VerifyToken(Authorization);
    }catch(e){
        decoded = undefined;
    }

    if(decoded ===  undefined || !decoded){
        res.status(401).json({
                success : false,
                operation : 'fail',
                message: 'Invalid Token'
            });
        return;
    }

    try{
        var result = await users.destroy({where: { id : userId}});
    }catch(err){
        res.status(400).json({
            success : false,
            message: 'Error while removing users',
            error: err,
        });
    }
    
    res.json({
        success : true,
        message: 'Users removed successfully',
        result: result
    });
}

exports.Update = async function(req, res){
    const { user } = req.body;
    const { token:Authorization } = req.headers;

    try{
        var decoded = await tokens.VerifyToken(Authorization);
    }catch(e){
        decoded = undefined;
    }

    if(decoded ===  undefined || !decoded){
        res.status(401).json({
                success : false,
                message: 'Invalid Token'
            });
        return;
    }

    try{
        var result = await users.update(user, {where : {
            id: user.id
        }});
    }catch(err){
        res.status(400).json({
            success : false,
            message: 'Error while updating user',
            error: err,
        });
    }
    
    res.json({
        success : true,
        message: 'User updated successfully',
        result: result
    });
}