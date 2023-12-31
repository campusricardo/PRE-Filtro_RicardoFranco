import {Schema, model} from 'mongoose';

const wasteObjectSchema = Schema({
    name: {
        type: String,
        unique: [true, 'This name is already in the database'],
        required: [true, ' The name is required']
    },
    bin: {
        type: Schema.Types.ObjectId,
        ref: 'bins',
        required: true
    }
});

export default model('wasteObjects', wasteObjectSchema);