import jwt from "jsonwebtoken";
import adminModel from "../models/adminModel.js"; // import admin model

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded should contain adminId from login
    const admin = await adminModel.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    // attach admin object to request if needed
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default adminAuth;
