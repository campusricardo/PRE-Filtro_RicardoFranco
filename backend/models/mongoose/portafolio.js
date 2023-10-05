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
                ref: 'raw-materials'
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

portafolioSchema.pre('save', async function(next) {
    try {
      const commodities = this.commodities;
      for (let i = 0; i < commodities.length; i++) {
        const obj = commodities[i];
        const weightInKilos = obj.weightInKilos;
        const material = await rawMaterial.findById(obj.materialId);
        
        if (material) {
          obj.value = (weightInKilos / 1000) * material.valuePerTon;
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  });

export default model('portafolios', portafolioSchema);