import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const sendEmail = async(to, subject, text)=>{
    try {
        const info = await transporter.sendMail({
            from:`Techify <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        })
        console.log("email sent : %s",info.messageId);
        
    } catch (error) {
        console.error(error)
    }
}