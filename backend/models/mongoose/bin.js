import {Schema, model} from 'mongoose';

const binSchema = Schema({
    name: {
        type: String,
        unique: [true, 'This name is already in the database'],
        required: [true, ' The name is required']
    },
    binColor: {
        type: String,
        unique: true,
        required: true
    }
});

export default model('bins', binSchema);