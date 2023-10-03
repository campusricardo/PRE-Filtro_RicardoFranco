import { request, response} from "express";
import jwt from 'jsonwebtoken';
import userSchema from "../models/mongoose/user.js";
const validateJWT = async (req = request, res = response, next) => {
    

    try {
        const token = req.header('api-jwt');
        if (!token) {
            return res.status(401).json({
                msg: 'There is no api-jwt on the headers'
            });
        }

    const {uid} = jwt.verify( token, process.env.SECRET_KEY );


    const user = await userSchema.findById(uid);

    if ( !user ) {
        return res.status(401).json({
            msg: 'This token has expired'
        })
    } 

    if (req.url === "/raw-materials" && user.isAdmin === false && req.method !== "GET") {
        return res.status(401).json({
            message: "You aren't an Admin so you cannot touch the raw-materials API"
        });
    }
    next();
    
    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'Please Log In Again 🥵'});
    }

};

export default validateJWT;