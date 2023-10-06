import binSchema from "../models/mongoose/bin.js";

export const getBins = async (req, res ) => {
    try {
        const bins = await binSchema.find();

        return res.status(200).json({
            status: "success",
            result: bins
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: "An unexpected error have occur"
        });
    }
};

export const addBin = async (req, res) => {
    try {
        const {name, binColor} = req.body;
        const bin = new binSchema({name, binColor});
        await bin.save();
        return res.status(202).json({
            status: "success",
            result: bin
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: "An unexpected error occur"
        });
    }
};

export const updateBin = async (req, res) => {
    try {
        const {bin} = req.params;
        const binId = bin.trim();
        const {name, binColor} = req.body;
        const updateBin = await binSchema.findByIdAndUpdate(binId,{name, binColor});

        return res.status(200).json({
            status: "successfully Updated",
            result: updateBin
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: "An unexpected error occur"
        });
        
    };
};

export const deleteBin = async (req, res ) => {
    try {
        const {bin} = req.params;
        const binid = bin.trim();
        const deleteBin = await binSchema.findByIdAndDelete(binid);

        return res.status(202).json({
            status: "successfully deleted",
            result: deleteBin
        });

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: "An unexpected error occur"
        });
        
    };
};