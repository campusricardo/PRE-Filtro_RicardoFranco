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
        const {name, username, email, password, age, id, isAdmin} = req.body;

        const oid = await getJWT(apijwt);
        const modifyUser = await userSchema.findByIdAndUpdate(oid,{name, username, email, password, age, id});
        if (isAdmin === process.env.ADMIN) {
            modifyUser.isAdmin = false;
        }
        if (password) 
        {
            const salt = await bcryptjs.genSalt();
            modifyUser.password = await bcryptjs.hash(password, salt);
        }

        await modifyUser.save();

        res.json({
            status: "success",
            result: modifyUser
        })
    } catch (error) {
        console.log(error);
        res.status(202).json({
            msg: "An unexpected error have occur "
        })
        
    }

};

export const getOneUser = async (req, res) => {
    try {
        const {apijwt } = req.headers;
        const id = await getJWT(apijwt);
        const user = await userSchema.findById(id, {_id: 0, portafolio: 0, isAdmin: 0, createdAt: 0, updatedAt: 0, __v: 0, password: 0});

        res.status(200).json({
            status: "success",
            result: user
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: "An unexpected error have occur"
        });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const {apijwt } = req.headers;
        const id = await getJWT(apijwt);
        const user = await userSchema.findByIdAndDelete(id);
        const portafolio = await portafolioSchema.findByIdAndDelete(user.portafolio);
        console.log(user);
        res.status(202).json({
            status: "success",
            result: `User ${user.username} deleted successfully`
        })
    } catch (error) { 
        console.log(error);
        res.status(404).json({
            status: "Uncompleated"
        });
    }

};

export const loginUser = async (req, res = response) => {
    try {
        const {username, password} = req.body;
        const user = await userSchema.findOne({username});
        if (!user) {
            return res.status(405).json({
                message: "Your Password or your username is wrong"
            })
        }
        const validatePassword = await bcryptjs.compare(password, user.password);
        if (!validatePassword) {
            return res.status(400).json({
                message:"Your Password or your username is wrong"
            })
        }
        
        const token = await generateJWT(user._id)
        return res.status(202).json({
           user,
           token
        })

    } catch (error) {
        res.status(404).json({message: 'Something Wrong Happen'});
    }
};
