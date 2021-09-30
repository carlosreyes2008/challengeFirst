import * as API from '../api/teams';

export const List = async() => {
    try{
        var result = await API.List();
    }catch(e){
        console.log(`CONTROLLER ERROR: teams.list\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const Find = async(teamId) => {
    try{
        var result = await API.Find(teamId);
    }catch(e){
        console.log(`CONTROLLER ERROR: teams.find\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const Create = async(team, token) =>{

    var data = {
        team: team,
    };

    try{
        var result = await API.Create(data, token);
    }catch(e){
        console.log(`CONTROLLER ERROR: teams.create\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const Update = async(team, token) =>{
    var data = {
        team: team,
    };

    try{
        var result = await API.Update(data, token);
    }catch(e){
        console.log(`CONTROLLER ERROR: teams.update\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const Remove = async(teamId, token) =>{
    try{
        var result = await API.Remove(teamId, token);
    }catch(e){
        console.log(`CONTROLLER ERROR: teams.delete\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const JoinUsers = async(users, token) =>{
    var data = {
        users: users,
    };

    try{
        var result = await API.JoinUsers(data, token);
    }catch(e){
        console.log(`CONTROLLER ERROR: teams.joinUsers\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const ExcludeUsers = async(teamId, userId, token) =>{
    var data = {
        team: teamId,
        user: userId
    };

    try{
        var result = await API.ExcludeUsers(data, token);
    }catch(e){
        console.log(`CONTROLLER ERROR: teams.excludeUsers\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const JoinAccounts = async(accounts, token) =>{
    var data = {
        accounts: accounts,
    };

    try{
        var result = await API.JoinAccounts(data, token);
    }catch(e){
        console.log(`CONTROLLER ERROR: teams.joinAccounts\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const ExcludeAccount = async(teamId, accountId, token) =>{
    var data = {
        team: teamId,
        account: accountId
    };

    try{
        var result = await API.ExcludeAccount(data, token);
    }catch(e){
        console.log(`CONTROLLER ERROR: teams.excludeAccount\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}