import wasteSchema from "../models/mongoose/wasteObject.js";

export const getWasteObjects = async (req, res ) => {
    try {
        const waste = await wasteSchema.find();

        return res.status(200).json({
            status: "success",
            result: waste
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: "An unexpected error have occur"
        });
    }
};

export const addWasteObject = async (req, res) => {
    try {
        const {name, bin} = req.body;
        const wasteObject = new wasteSchema({name, bin});
        await wasteObject.save();
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

export const updateWasteObject = async (req, res) => {
    try {
        const {waste} = req.params;
        const {name, bin} = req.body;
        const wasteId = waste.trim();

        const updateObject = await wasteSchema.findByIdAndUpdate(wasteId,{name, bin});

        return res.status(200).json({
            status: "successfully Updated",
            result: updateObject
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: "An unexpected error occur"
        });
        
    };
};

export const deleteWasteObject = async (req, res ) => {
    try {
        const {waste} = req.params;
        const wasteId = waste.trim();
        const deleteObject = await wasteSchema.findByIdAndDelete(wasteId);

        return res.status(202).json({
            status: "successfully deleted",
            result: deleteObject
        });

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: "An unexpected error occur"
        });
        
    };
};