import * as HTTP from './http';

export const Update = async (body, token) => {
  let endpoint = `/accounts`;
  
  let data = HTTP.PUT(endpoint, body, token);

  return data;
}

export const List = async () => {
  let endpoint = `/accounts`;
  
  let data = HTTP.GET(endpoint);

  return data;
}

export const Create = async (body, token) => {
  let endpoint = `/accounts`;
  
  let data = HTTP.POST(endpoint, body, token);

  return data;
}

export const Remove = async (id, token) => {
  let endpoint = `/accounts/${id}`;
  
  let data = HTTP.DELETE(endpoint, token);

  return data;
}

export const Find = async (id) => {
  let endpoint = `/accounts/${id}`;
  
  let data = HTTP.GET(endpoint);

  return data;
}