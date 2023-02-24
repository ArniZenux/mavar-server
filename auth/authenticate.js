import passport from './login.js';
//import jsonwebtoken from 'jsonwebtoken'; 
import jwt from 'jsonwebtoken';

//const expire = process.env.SESSION_EXPIRY;
//console.log(expire); 

/*
/ Verify User with passport - jwt
*/
export const verifyUser = passport.authenticate('jwt', { session: false });

/*
/   Get Token
*/ 
export function getToken(user){
  //const payload = { id: user.id};
  //const tokenOptions = { expireIn: tokenLifetime };
  //return jwt.sign(payload, process.env.JWT_SECRET, tokenOptions);
  return jwt.sign(user, process.env.SESSION_SECRET);
}