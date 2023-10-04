import { response } from 'express';
import userSchema from '../models/mongoose/user.js';
import portafolioSchema from '../models/mongoose/portafolio.js';
import bcryptjs from 'bcryptjs';
import generateJWT from '../helpers/generate.jwt.js';
import getJWT from '../helpers/getJWT.js';
export const addUser = async (req, res) => {
    try {

        const {name, username, email, password, age, id, isAdmin} = req.body;
        
        const portafolio = new portafolioSchema();
        const user = new userSchema({name, username, email, password, age, id, portafolio: portafolio._id,isAdmin: isAdmin === process.env.ADMIN ? true : false});
        
        const salt = await bcryptjs.genSalt();
        user.password = await bcryptjs.hash(password, salt);
        await portafolio.save();
        await user.save();
        res.json({
            message: 'user created',
            result: user
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: 'Something went wrong'});
    }
};

export const updateUser = async (req, res ) => {
    try {
        
        const {apijwt } = req.headers;
        const id = await getJWT(apijwt)


        res.json({
            msg: id
        })
    } catch (error) {
        res.status(404).json({
            msg: error
        })
        
    }



};

export const getOneUser = () => {

};


export const deleteUser = async (req, res) => {

};

export const loginUser = async (req, res = response) => {
    try {
        const {username, password} = req.body;
        const user = await userSchema.findOne({username});
        if (!user) {
            return res.json({
                message: "Your Password or your username is wrong"
            })
        }
        const validatePassword = await bcryptjs.compare(password, user.password);
        if (!validatePassword) {
            return res.status(400).json({
                msg:"Your Password or your username is wrong"
            })
        }
        
        const token = await generateJWT(user._id)
        res.json({
           user,
           token
        })

    } catch (error) {
        res.status.json({msg: 'Something Wrong Happen'});
    }
};
