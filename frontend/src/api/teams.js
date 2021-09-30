import * as HTTP from './http';

export const List = async () => {
  let endpoint = `/teams`;
  
  let data = HTTP.GET(endpoint);

  return data;
}

export const Find = async (id) => {
  let endpoint = `/teams/${id}`;
  
  let data = HTTP.GET(endpoint);

  return data;
}

export const Create = async (body, token) => {
  let endpoint = `/teams`;
  
  let data = HTTP.POST(endpoint, body, token);

  return data;
}

export const Update = async (body, token) => {
  let endpoint = `/teams`;
  
  let data = HTTP.PUT(endpoint, body, token);

  return data;
}

export const Remove = async (id, token) => {
  let endpoint = `/teams/${id}`;
  
  let data = HTTP.DELETE(endpoint, token);

  return data;
}

export const JoinUsers = async (body, token) => {
  let endpoint = `/teams/users`;
  
  let data = HTTP.POST(endpoint, body, token);

  return data;
}

export const ExcludeUsers = async(body, token) => {
  let endpoint = `/teams/users/${body.team}/${body.user}`;
  
  let data = HTTP.DELETE(endpoint, token);

  return data;
}

export const JoinAccounts = async (body, token) => {
  let endpoint = `/teams/accounts`;
  
  let data = HTTP.POST(endpoint, body, token);

  return data;
}

export const ExcludeAccount = async(body, token) => {
  let endpoint = `/teams/accounts/${body.team}/${body.account}`;
  
  let data = HTTP.DELETE(endpoint, token);

  return data;
}