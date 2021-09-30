const jwt = require('jsonwebtoken');

export const VerifyToken = (token)=> {
    return new Promise((resolve, reject) =>{
        jwt.verify(token, 'cHJpdmF0ZSBtYXN0ZXIga2V5', function(error, decoded) {
            if (error) {
                reject(error);
            } else {
                resolve(decoded);
            }
        });
    });
}