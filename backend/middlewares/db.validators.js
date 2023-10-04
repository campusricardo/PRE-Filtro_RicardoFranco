import userSchema from "../models/mongoose/user.js";
import getJWT from "../helpers/getJWT.js";
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

        if (user.length > 0) {
            return res.status(409).json({
                message: 'The username, email or id is already in use please change it'
            });
        }
    next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "An unexpected error have occur"
        })
    }
}

const verifyUpdate = async (req, res, next) => {
   try {
    const {name, username, email, password, age, id} = req.body;
    
    const {apijwt} = req.headers;
    const obj = await getJWT(apijwt);
    const user = await userSchema.findById(obj);
    const users = await userSchema.find({
        $or: [
            { username },
            { email },
            { id }
          ],
        $and: [
            {username: { $ne: user.username}},
            {email: { $ne: user.email}},
            {id: { $ne: user.id}},
        ]
    });

    if (users.length > 0) {
        return res.status(400).json({
            msg: "The data that you provied is alredy in use"
        });
    }

    next();
   } catch (error) {
    console.log(error);
    return es.status(404).json({
        msg: "An unexpected error have occur"
    });
   }
}

export  {verifyUser, verifyUpdate};