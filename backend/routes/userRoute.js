import express from 'express'
import { loginUser, registerUser, adminLogin, verifyOtp,forgotPassword,resetPassword } from '../controllers/userController.js'

const userRouter = express.Router()
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.post("/verify-otp", verifyOtp);
userRouter.post('/forgot-password', forgotPassword)  
userRouter.post('/reset-password', resetPassword)   


export default userRouter;