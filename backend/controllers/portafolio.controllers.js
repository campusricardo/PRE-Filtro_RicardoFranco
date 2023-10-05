import getJWT from '../helpers/getJWT.js';
import userSchema from '../models/mongoose/user.js';
import portafolioSchema from '../models/mongoose/portafolio.js';
import rawMaterialSchema from '../models/mongoose/raw-material.js';
import {mongo} from 'mongoose'
export const addCommoditie = async(req, res) => {
    try {
    const {raw} = req.params;
    const {apijwt} = req.headers;
    const {weightInKilos} = req.body;
    const oid = await getJWT(apijwt);
    const user = await userSchema.findById(oid).populate('portafolio');
    const rawMaterial = await rawMaterialSchema.findById(raw);
    const portafolio = await portafolioSchema.find({"commodities.materialId": new mongo.ObjectId(rawMaterial._id)});
    if (portafolio.length > 0) {
        const preValue = await portafolioSchema.findOne({
            _id: user.portafolio._id,
            "commodities.materialId": rawMaterial._id
            
        }, {
            "commodities.$": 1,
            _id: 0,
        });
        console.log(preValue);
        const updatePortafolio = await portafolioSchema.findOneAndUpdate({
            _id: user.portafolio._id,
            "commodities.materialId": rawMaterial._id
            
        },{
            $set: {
                "commodities.$.weightInKilos": preValue.commodities[0].weightInKilos +weightInKilos,
                "commodities.$.value": (weightInKilos / 1000) *  rawMaterial.valuePerTon
            }
        });

        return res.status(202).json({
            status: " You just bought new raw material",
            result: updatePortafolio
        })
    };
    const newCommoditie =  await portafolioSchema.findByIdAndUpdate(user.portafolio._id,{
       $push: { 
        commodities: {
            materialId: new mongo.ObjectId(raw),
            weightInKilos: weightInKilos,
            value: (weightInKilos / 1000) *  rawMaterial.valuePerTon
            }
        } 
    }    
);
    return res.status(200).json({
        status: "Buy raw material correctly",
        result: newCommoditie

    });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: "An unexpected error have occur"
        })
    }
};


export const sellPortafolio = async (req, res) => {
    try {
        const {raw} = req.params;
        const {apijwt} = req.headers;
        const {weightInKilos} = req.body;
        const oid = await getJWT(apijwt);
        const user = await userSchema.findById(oid).populate('portafolio');
        const rawMaterial = await rawMaterialSchema.findById(raw);
        const portafolio = await portafolioSchema.find({"commodities.materialId": new mongo.ObjectId(rawMaterial._id)});
        if (portafolio.length > 0) {
            const preValue = await portafolioSchema.findOne({
                _id: user.portafolio._id,
                "commodities.materialId": rawMaterial._id
                
            }, {
                "commodities.$": 1,
                _id: 0,
            });
            console.log(preValue);
            const updatePortafolio = await portafolioSchema.findOneAndUpdate({
                _id: user.portafolio._id,
                "commodities.materialId": rawMaterial._id
                
            },{
                $set: {
                    "commodities.$.weightInKilos": preValue.commodities[0].weightInKilos +weightInKilos,
                    "commodities.$.value": (weightInKilos / 1000) *  rawMaterial.valuePerTon
                }
            });
    
            return res.status(202).json({
                status: " You just bought new raw material",
                result: updatePortafolio
            })
        };
        const newCommoditie =  await portafolioSchema.findByIdAndUpdate(user.portafolio._id,{
           $push: { 
            commodities: {
                materialId: new mongo.ObjectId(raw),
                weightInKilos: weightInKilos,
                value: (weightInKilos / 1000) *  rawMaterial.valuePerTon
                }
            } 
        }    
    );
        return res.status(200).json({
            status: "Buy raw material correctly",
            result: newCommoditie
    
        });
        } catch (error) {
            console.log(error);
            res.status(404).json({
                msg: "An unexpected error have occur"
            })
        }
};