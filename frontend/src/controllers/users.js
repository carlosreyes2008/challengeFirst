import * as API from '../api/users';

export const LogIn = async(email, password) =>{

    var encondedPass = Buffer.from(password).toString('base64');

    var data = {
        email: email,
        password: encondedPass
    };

    try{
        var result = await API.logIn(data);
    }catch(e){
        console.log(`CONTROLLER ERROR: users.login\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const Update = async(user, token) =>{

    var data = {
        user: user,
    };

    try{
        var result = await API.Update(data, token);
    }catch(e){
        console.log(`CONTROLLER ERROR: users.update\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const List = async() =>{
    try{
        var result = await API.List();
    }catch(e){
        console.log(`CONTROLLER ERROR: users.list\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const Create = async(user, token) =>{
    
    var encondedPass = Buffer.from(user.password).toString('base64');
    user.password = encondedPass;
    
    var data = {
        user: user,
    };

    try{
        var result = await API.Create(data, token);
    }catch(e){
        console.log(`CONTROLLER ERROR: users.create\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const Remove = async(user, token) =>{
    try{
        var result = await API.Remove(user.id, token);
    }catch(e){
        console.log(`CONTROLLER ERROR: users.remove\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const Find = async(userId) => {
    try{
        var result = await API.Find(userId);
    }catch(e){
        console.log(`CONTROLLER ERROR: users.find\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}