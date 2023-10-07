import mongoose, {Schema, model} from "mongoose";

const rawMaterialSchema = ({

    name: {
        type: String,
        required: [true, 'name is Required'],
        unique: [true, 'name must be unique']
    },
    valuePerTon: {
        type: Number,
        required: [true, 'value-per-ton is required']
    },
    weightGcubicM: {
        type: Number,
        require: [true, 'weight-g-cubic is required']
    }

})

export default model('RawMaterials', rawMaterialSchema);