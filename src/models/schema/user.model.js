import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const user = new mongoose.Schema ({
    fullname: {
        type: String, 
        require: true
    },
    email: { 
        type: String, 
        require: true, 
        unique: true, 
        index: true, 
        validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ 
    },
    password: { 
        type: String, 
        require: true,
        minlength: 8 
    },
    phone: { 
        type: Number, 
        require: true
    },
},{ timestamps: true })


user.plugin(MongooseDelete, {deletedAt:true})

export default mongoose.model('User', user);