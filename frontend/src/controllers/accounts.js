import * as API from '../api/accounts';

export const List = async() => {
    try{
        var result = await API.List();
    }catch(e){
        console.log(`CONTROLLER ERROR: accounts.list\n${e}`);
        return false;
    }

    return result;
}

export const Find = async(accountId) => {
    try{
        var result = await API.Find(accountId);
    }catch(e){
        console.log(`CONTROLLER ERROR: accounts.find\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const Create = async(account, token) =>{

    var data = {
        account: account,
    };

    try{
        var result = await API.Create(data, token);
    }catch(e){
        console.log(`CONTROLLER ERROR: accounts.create\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const Update = async(account, token) =>{
    var data = {
        account: account,
    };

    try{
        var result = await API.Update(data, token);
    }catch(e){
        console.log(`CONTROLLER ERROR: accounts.update\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const Remove = async(accountId, token) =>{
    try{
        var result = await API.Remove(accountId, token);
    }catch(e){
        console.log(`CONTROLLER ERROR: accounts.delete\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}