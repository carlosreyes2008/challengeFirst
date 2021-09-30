import * as HTTP from './http';

export const logIn = async (body) => {
  let endpoint = `/users/login`;
  
  let data = HTTP.POST(endpoint, body);

  return data;
}

export const Update = async (body, token) => {
  let endpoint = `/users`;
  
  let data = HTTP.PUT(endpoint, body, token);

  return data;
}

export const List = async () => {
  let endpoint = `/users`;
  
  let data = HTTP.GET(endpoint);

  return data;
}

export const Create = async (body, token) => {
  let endpoint = `/users`;
  
  let data = HTTP.POST(endpoint, body, token);

  return data;
}

export const Remove = async (id, token) => {
  let endpoint = `/users/${id}`;
  
  let data = HTTP.DELETE(endpoint, token);

  return data;
}

export const Find = async (id) => {
  let endpoint = `/users/${id}`;
  
  let data = HTTP.GET(endpoint);

  return data;
}