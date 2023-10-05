import {Schema, model} from 'mongoose';

const portafolioSchema = Schema({
    totalValue: {
        type: Number,
        default: 0
    },

    commodities: {
        type: [{
            materialId: {
            type: Schema.Types.ObjectId,
            },
            weight: {
                type: Number,
                default: 0
            },

            value: {
                type: Number,
                default: 0
            }
        }]
    }
});

export default model('portafolios', portafolioSchema);