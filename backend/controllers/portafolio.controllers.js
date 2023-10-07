import getJWT from '../helpers/getJWT.js';
import userSchema from '../models/mongoose/user.js';
import portafolioSchema from '../models/mongoose/portafolio.js';
import rawMaterialSchema from '../models/mongoose/raw-material.js';
import {mongo} from 'mongoose';

export const getPortafolio = async (req, res ) => {
    try {
        const { apijwt } = req.headers;
        const oid = await getJWT(apijwt);
    
        const user = await userSchema.findById(oid, { portafolio: 1, _id: 0 });
        const portafolio = await portafolioSchema.findById(user.portafolio, {_id: 0, 'commodities': 1}).populate('commodities.materialId')
        res.json({
        portafolio
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({ msg: 'Something went wrong' });
    }
};

export const addCommoditie = async(req, res) => {
    try {
    const {raw} = req.params;
    const {apijwt} = req.headers;
    const {weightInKilos} = req.body;
    const oid = await getJWT(apijwt);
    const user = await userSchema.findById(oid).populate('portafolio');
    const rawMaterial = await rawMaterialSchema.findById(raw);
    console.log(rawMaterial._id);
    console.log(user.portafolio._id);
    const portafolio = await portafolioSchema.find({"commodities.materialId": new mongo.ObjectId(rawMaterial._id)});
    const preValue = await portafolioSchema.findOne({
        _id: user.portafolio._id        
    }, {
        _id: 0,
    });
    console.log(preValue);
    if (portafolio.length > 0) {

        console.log(preValue);
        const updatePortafolio = await portafolioSchema.findOneAndUpdate({
            _id: user.portafolio._id,
            "commodities.materialId": rawMaterial._id
            
        },{
            $set: {
                totalValue: preValue.totalValue + (weightInKilos / 1000) *  rawMaterial.valuePerTon,
                "commodities.$.weightInKilos": preValue.commodities[0].weightInKilos +weightInKilos,
                "commodities.$.value": ((preValue.commodities[0].weightInKilos + weightInKilos) / 1000) *  rawMaterial.valuePerTon
            },

        }, {new: true});

        return res.status(202).json({
            status: " You just bought new raw material",
            result: updatePortafolio
        })
    };
    const newCommoditie =  await portafolioSchema.findByIdAndUpdate(user.portafolio._id,{
        totalValue: preValue.totalValue + (weightInKilos / 1000) *  rawMaterial.valuePerTon,
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
        const preValue = await portafolioSchema.findOne({
            _id: user.portafolio._id,
            "commodities.materialId": rawMaterial._id
            
        }, {
            "commodities.$": 1,
            _id: 0,
        });
        console.log(preValue.totalValue);
        if (portafolio.length > 0) {

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
            totalValue: (weightInKilos / 1000) *  rawMaterial.valuePerTon,
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


export const deletePortafolio = async(req, res) => {
    try {
        const {apijwt} = req.headers; 

        const oid = await getJWT(apijwt);
        const userPortafolio = await userSchema.findById(oid, {_id: 0, portafolio: 1, totalValue: 1 });
        const portafolio = await portafolioSchema.findByIdAndUpdate(userPortafolio.portafolio, {totalValue: 0, commodities: []});
        res.status(202).json({
            status: `Portafolio deleted successfully with a total Value before deleting it ${portafolio.totalValue}`
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: "An unexpected error have occur"
        });
    }


};