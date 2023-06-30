import jsonwebtoken from "jsonwebtoken";
import environments from "../configs/environments.js";

const { SECRET } = environments;

function generateToken(user){
    const{ _id, email} = user;
    return jsonwebtoken.sign({ id: _id, email}, SECRET, {expiresIn: '50m'})
    
}

function verifyToken(token){
    return jsonwebtoken.verify(token, SECRET)
  }

export  {generateToken, verifyToken };