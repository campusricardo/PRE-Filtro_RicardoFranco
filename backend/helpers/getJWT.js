import jwt from "jsonwebtoken";

const getJWT = (token) => {
    return new Promise((resolve, reject)=> {

        const {uid} = jwt.verify( token, process.env.SECRET_KEY );

        if (uid) {
            resolve(uid);

        }
                
        reject('Unable to create the json web token');
       
            
    })

}

export default getJWT