import mongoose from "mongoose";

export default async function mongoDB(){
    try {
        mongoose.connect('mongodb://localhost:27017/test')
        console.log('🚀 Connected to MongoDB')
    } catch (error) {
        throw new Error(error.message)
    }
}


