const jwt = require('jsonwebtoken');
const Consts = require('../libs/consts');

exports.NewToken = function(user){
    return new Promise((resolve, reject) =>{
        jwt.sign({ user: user}, Consts.key, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        });
    });
}

exports.VerifyToken = function(token){
    return new Promise((resolve, reject) =>{
        jwt.verify(token, Consts.key, function(error, decoded) {
            if (error) {
                reject(error);
            } else {
                resolve(decoded);
            }
        });
    });
}