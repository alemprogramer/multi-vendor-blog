const crypto = require('crypto');

exports.hash=(password, saltRounds = 10)=> {
    return new Promise((resolve, reject) => {
            try {
                const salt = crypto.randomBytes(saltRounds).toString('hex');
                const hashPassword = crypto.pbkdf2Sync(password, salt, 100000, 54, 'sha512');
                
                resolve(`$${salt}$${hashPassword.toString('hex')}`);
            } catch (error) {
                reject(error);
            }
        })
}

exports.compare=(providedPassword,hashedPassword)=>{
    return new Promise((resolve, reject) => {
        try {
            const passwordDetails = hashedPassword.split('$');
            const hash = crypto.pbkdf2Sync(providedPassword, passwordDetails[1], 100000, 54, 'sha512').toString('hex');
            resolve(hash === passwordDetails[2]) ;
        } catch (error) {
            reject(error);
        }
    });
}