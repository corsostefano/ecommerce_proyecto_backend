import dotenv from "dotenv"
dotenv.config()

export default {
    secret_key_stripe: process.env.SECRET_KEY_STRIPE
}