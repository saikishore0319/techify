import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../utils/sendEmail.js'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}


// route for user login
const loginUser = async (req, res) => {
    try {
        const emailRaw = req.body.email || ''
        const email = emailRaw.trim().toLowerCase()
        const password = req.body.password
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password " })
        }

        const otp = generateOtp();
        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();

        await sendEmail(email, "Login verification", `Your OTP is: ${otp}`);

        return res.status(200).json({
            success: true,
            message: "OTP sent to your email. Please verify.",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message })
    }
}

// route for user register
const registerUser = async (req, res) => {
    try {
        const name = req.body.name.trim()
        const emailRaw = req.body.email || ''
        const email = emailRaw.trim().toLowerCase()
        const password = req.body.password
        // const { name, email, password } = req.body



        //check if user alredy exists
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.status(409).json({ success: false, message: "User already exists" })
        }


        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const otp = generateOtp()

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpires: new Date(Date.now() + 5 * 60 * 1000)
        })

        const user = await newUser.save()

        await sendEmail(email, "Verify your account", `Your OTP is: ${otp}`);

        return res.status(201).json({
            success: true,
            message: "User registered. OTP sent to your email for verification.",
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

//route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.status(200).json({ success: true, message: "logged in successfully", token })
        } else {
            res.status(400).json({ success: false, message: "invalid credentials" })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message })
    }
}

const verifyOtp = async (req, res) => {
    try {
        const emailRaw = req.body.email || ""
        const email = emailRaw.trim().toLowerCase()
        const { otp } = req.body

        const user = await userModel.findOne({ email })
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        if (!user.otp || !user.otpExpires) {
            return res
                .status(400)
                .json({ success: false, message: "No OTP pending for this user" });
        }

        const expired = user.otpExpires < new Date()
        const mismatch = user.otp !== otp

        if (expired || mismatch) {
            return res.status(400).json({
                success: false,
                message: expired ? "OTP expired" : "Invalid OTP",
            });
        }

        user.otp = undefined
        user.otpExpires = undefined
        await user.save()

        const token = createToken(user._id)
        return res
            .status(200)
            .json({ success: true, token, message: "Verification successful" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }

}

// ========================= FORGOT PASSWORD =========================

// 1. User requests password reset → send OTP
export const forgotPassword = async (req, res) => {
  try {
    const emailRaw = req.body.email || "";
    const email = emailRaw.trim().toLowerCase();

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate new OTP for password reset
    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // valid 5 mins
    await user.save();

    // Send email to user
    await sendEmail(email, "Reset your password", `Your OTP is: ${otp}`);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email to reset password",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. User submits OTP + new password → reset password
export const resetPassword = async (req, res) => {
  try {
    const emailRaw = req.body.email || "";
    const email = emailRaw.trim().toLowerCase();
    const { otp, newPassword } = req.body;

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Validate OTP
    const expired = user.otpExpires < new Date();
    const mismatch = user.otp !== otp;

    if (expired || mismatch) {
      return res.status(400).json({
        success: false,
        message: expired ? "OTP expired" : "Invalid OTP",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password and clear OTP
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin, verifyOtp }