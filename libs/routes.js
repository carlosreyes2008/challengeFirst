const express = require('express');
const router = express.Router();
const Users = require('../controllers/users');
const Teams = require('../controllers/teams');
const Accounts = require('../controllers/accounts');

const logRequest = (req, res, next) => {
  console.log(req.url, req.query, req.params, req.body);
  next();
}

const route = (endpoint, handler, method) => {
  if (method === 'GET'){
    return router.get(endpoint, logRequest, handler);
  }
  if (method === 'POST'){
    return router.post(endpoint, logRequest, handler);
  }
  if (method === 'PUT'){
    return router.put(endpoint, logRequest, handler);
  }
  if (method === 'DELETE'){
    return router.delete(endpoint, logRequest, handler);
  }

  return router.get(endpoint, logRequest, handler);
};


route('/users/login', Users.Login, 'POST');
route('/users', Users.Create, 'POST');
route('/users', Users.Update, 'PUT');
route('/users', Users.List, 'GET');
route('/users/:userId', Users.Find, 'GET');
route('/users/:userId', Users.Remove, 'DELETE');


route('/teams', Teams.Create, 'POST');
route('/teams', Teams.Update, 'PUT');
route('/teams', Teams.List, 'GET');
route('/teams/:teamId', Teams.Find, 'GET');
route('/teams/:teamId', Teams.Remove, 'DELETE');

route('/teams/users', Teams.JoinUsers, 'POST');
route('/teams/users/:teamId/:userId', Teams.ExcludeUsers, 'DELETE');
route('/teams/accounts', Teams.JoinAccount, 'POST');
route('/teams/accounts/:teamId/:accountId', Teams.ExcludeAccount, 'DELETE');


route('/accounts', Accounts.Create, 'POST');
route('/accounts', Accounts.Update, 'PUT');
route('/accounts', Accounts.List, 'GET');
route('/accounts/:accountId', Accounts.Find, 'GET');
route('/accounts/:accountId', Accounts.Remove, 'DELETE');

module.exports = router;