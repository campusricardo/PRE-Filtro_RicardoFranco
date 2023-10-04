import rawMaterialSchema from "../models/mongoose/raw-material.js";

export const addRawMaterial = async (req, res) => {
    try {
        // weightGcubicM weight in gram pero cubic meter
        const {name, valuePerTon, weightGcubicM}  = req.body;
        const rawMaterial = await rawMaterialSchema.find({name});
        if (rawMaterial.length > 0) {
            return res.json({
                msg: 'This raw Material already exits'
            });
        }
        const newRawMaterial = new rawMaterialSchema({name, valuePerTon, weightGcubicM});
        await newRawMaterial.save();
        res.json({
            msg: 'Raw Material saved in the database',
            result: newRawMaterial
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: 'An unexpected error has occur'});
    }


};

export const getRawMaterial = async (req, res ) => {
    try {
        const {until = 0 , from = 0} = req.query;
        const [total, rawMaterials] = await Promise.all([
            rawMaterialSchema.countDocuments(),
            rawMaterialSchema.find()
            .skip(Number(from))
            .limit(Number(until))
        ]);

    res.json({
        status: 'success',
        result: {
            total,
            rawMaterials
        }
    });
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: 'Something went wrong'});
    }
};

export const updateRawMaterial = async(req, res) => {
    try {
        const {name, valuePerTon, weightGcubicM} = req.body;
        const {oid} = req.params;
        const rawMaterial = await rawMaterialSchema.findByIdAndUpdate(oid, {name, valuePerTon, weightGcubicM});
        res.status(200).json({
            status: "success",
            result: rawMaterial
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: "An unexpected error have occur"
        });
    }
};

export const deleteRawMaterial = async (req, res) => {
    try {
        const {oid} = req.params;
        const del = await rawMaterialSchema.findByIdAndDelete(oid);
        if (del === null) {
            return res.status(300).json({
                msg: "This raw Material isn't in the Database"
            });
        }
        return res.status(202).json({
            status: "success",
            result: del
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: "An unexpected error have occur"
        });
    }
};