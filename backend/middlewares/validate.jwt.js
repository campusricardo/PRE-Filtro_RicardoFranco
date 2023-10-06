import { request, response} from "express";
import jwt from 'jsonwebtoken';
import userSchema from "../models/mongoose/user.js";
const validateJWT = async (req = request, res = response, next) => {
    

    try {
        const token = req.header('ApiJWT');
        if (!token) {
            return res.status(401).json({
                msg: 'Please Log in Again'
            });
        }

    const {uid} = jwt.verify( token, process.env.SECRET_KEY );

    const user = await userSchema.findById(uid);
    if ( !user ) {
        return res.status(401).json({
            msg: 'This token has expired'
        })
    }


    if ((req.url.startsWith("/raw-materials") || req.url.startsWith("/bins") || req.url.startsWith("/waste-objects")) && (user.isAdmin === false && req.method !== "GET")) {
        return res.status(401).json({
            message: "You aren't an Admin so you cannot touch the neither raw materials nor bins and waste objects 🥵"
        });
    }
    next();
    
    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'Please Log In Again'});
    }

};

export default validateJWT;