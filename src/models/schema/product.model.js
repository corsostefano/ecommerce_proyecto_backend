import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';    

const product = new mongoose.Schema({
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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
product.plugin(MongooseDelete, {deletedAt:true})

export default mongoose.model('Product', product);