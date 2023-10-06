import binSchema from "../models/mongoose/bin.js";

export const getBins = async (req, res ) => {
    try {
        const bins = await binSchema.find();

        res.status(200).json({
            status: "success",
            result: bins
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: "An unexpected error have occur"
        });
    }
};

export const addBin = async (req, res) => {
    try {
        const {name, binColor} = req.body;
        const bin = new binSchema({name, binColor});
        await bin.save();
        res.status(202).json({
            status: "success",
            result: bin
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: "An unexpected error occur"
        });
    }
};

export const updateBin = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};

export const deleteBin = async (req, res ) => {
    try {
        
    } catch (error) {
        
    }
};