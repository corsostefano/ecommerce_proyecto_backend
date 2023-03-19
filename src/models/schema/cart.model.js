import mongoose from 'mongoose';

const cart = new mongoose.Schema({
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

export default mongoose.model('Cart', cart);