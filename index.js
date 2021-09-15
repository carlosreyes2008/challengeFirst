const express = require('express');
const app = express();
const Consts = require('./libs/consts');
const router = require('./libs/routes');
const {sequelize, users} = require('./models');

// const path = require('path');
app.use(express.json());
app.use(router);

app.get('/', (req, res, next) => {
    res.sendStatus(403);
});

app.listen(Consts.port, initialize());

async function initialize() {
    await sequelize.sync();
    
    //create super user
    try{
        const superUser = await users.create(Consts.super);
        console.log(superUser);
    }catch(err){
        if(err.original.errno === 1062){
            console.log('Super user already exist');
        }else{
            console.log(`Error while creating super user. \n${err.original}`);
        }
    }

    console.log(`Application initialized in port: ${Consts.port}`);
}