import userSchema from "../models/mongoose/user.js";

 const verifyUser = async(req, res, next) => {
    try {
        const {username, email, id} = req.body;
        const user = await userSchema.find({
            $or: [
                { username },
                { email },
                { id }
              ]
        });
        console.log(user);

        if (user.length > 0) {
            return res.status(409).json({
                message: 'The username, email or id is already in use please change it'
            });
        }
    next();
    } catch (error) {
        console.log(error);
        throw new Error;
    }
}



export  {verifyUser};