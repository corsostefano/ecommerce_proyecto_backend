import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const order = new mongoose.Schema({
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    id: { 
        type: String 
    },
    products: [new mongoose.Schema({
        title: { 
            type: String, 
            required: true 
        },
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

order.plugin(MongooseDelete, {deletedAt:true})

export default mongoose.model('Order', order);