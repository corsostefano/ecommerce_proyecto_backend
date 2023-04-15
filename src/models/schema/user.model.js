import mongoose from 'mongoose';
import validator from 'validator';
import MongooseDelete from 'mongoose-delete';

const userSchema = new mongoose.Schema ({
    fullname: {
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        index: true, 
        validate: [validator.isEmail, 'Invalid email address'] 
    },
    password: { 
        type: String, 
        required: true,
        minlength: 8 
    },
    phone: { 
        type: Number, 
        required: true
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },
    passwordHistory:{
        type: [String], 
        default: [] 
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

userSchema.plugin(MongooseDelete, {deletedAt:true});

userSchema.methods.setPassword = function(password) {
    this.password = password;
  };

export default mongoose.model('User', userSchema);
