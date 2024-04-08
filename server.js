// const bcrypt =require('bcrypt');
// async function show (){

//     console.log(await bcrypt.hash("123456", 11))
// }

// show()


const crypto = require('crypto');

// // Function to hash the password with salt
// function hashPassword(password, saltRounds = 10) {
//     const salt = crypto.randomBytes(saltRounds).toString('hex');
//     const hash = crypto.pbkdf2Sync(password, salt, 100000, 54, 'sha512');
//     return {
//         salt: salt,
//         hashedPassword: hash.toString('hex')
//     };
// }

// // console.log(hashPassword('123456'));

// function comparePasswords(providedPassword, hashedPassword) {
    
//     const hash = crypto.pbkdf2Sync(providedPassword, "56b4ed117d60c18476a364", 100000, 54, 'sha512').toString('hex');
//     console.log("🚀 ~ comparePasswords ~ hash:", hash)
//     return hash === hashedPassword;
// }
// // const { salt, hashedPassword } = hashPassword('123456');
// // console.log('Salt:', salt);
// // console.log('Hashed Password:', hashedPassword);

// // Compare the provided password with the hashed password
// const isMatch = comparePasswords("123456", "35359c09c8aa74f949252d6813382de2d60d2cfa698c53fe39b94c695a8c23b5923b9ea0044ab5a527925c4cda88f075d14e7a78d56c");
// console.log('Passwords match:', isMatch);

const {hash,compare} = require('./utils/passwordEncrypt');

async function run(){
   //Give your password and salt round for make your password hash
    console.log(await hash('123456',11));

    // Load hash from your password DB.
    //give password and Hash 
    
    let value =await compare("123456","$56b4ed117d60c18476a364$35359c..")
    console.log("🚀 ~ run ~ value:", value) //if your password and your hashPassword is correct return true
}

run();