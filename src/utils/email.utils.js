import dotenv from 'dotenv'
import nodemailer from 'nodemailer';
dotenv.config()


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.PASS_GMAIL
    }
});

export async function sendMail(subject, body, target) {
    const mailOptions = {
        from: 'Servidor Node.js',
        to: target,
        subject,
        html: body
    }
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error('Error sending email: ' , error)
    }
}