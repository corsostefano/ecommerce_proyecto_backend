import dotenv from 'dotenv'
dotenv.config()
export default {
    mongoDB: {
        URI: `mongodb+srv://admin:${process.env.MONGO_PASS}@cluster0.lyfjczr.mongodb.net/ecommerce-pb?retryWrites=true&w=majority`
    },
}
