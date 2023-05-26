import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const cartSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    products: [new mongoose.Schema({
        title: { 
            type: String, 
            required: true },
        price: { 
            type: Number 
        },
        thumbnail: { 
            type: String 
        },
        quantity: { 
            type: Number 
        }
    })
    ]
})

cartSchema.plugin(mongooseDelete, { overrideMethods: true })

export default mongoose.model('Cart', cartSchema);