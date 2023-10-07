import {Schema, model} from 'mongoose';
import rawMaterial from './raw-material.js';
const portafolioSchema = Schema({
    totalValue: {
        type: Number,
        default: 0
    },

    commodities: 
         [{
            materialId: {
                type: Schema.Types.ObjectId,
                ref: 'RawMaterials'
                },
                weightInKilos: {
                    type: Number,
                    default: 0
                },
        
                value: {
                    type: Number,
                    default: 0
                }
        }]
});

export default model('portafolios', portafolioSchema);