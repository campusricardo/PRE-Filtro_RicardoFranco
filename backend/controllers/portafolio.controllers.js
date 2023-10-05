import getJWT from '../helpers/getJWT.js';
import userSchema from '../models/mongoose/user.js';
import portafolioSchema from '../models/mongoose/portafolio.js';

export const addCommoditie = async(req, res) => {
    try {
    
    const {apijwt} = req.headers;
    const oid = await getJWT(apijwt);

    const user = await userSchema.findById(oid);
    const portafolio = await portafolioSchema.findById(user.portafolio);
    res.status(200).json({
        status: "success",
        result: {
            user,
            portafolio
        }
    });

    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: "An unexpected error have occur"
        })
    }
};


export const sellPortafolio = async (req, res) => {

};