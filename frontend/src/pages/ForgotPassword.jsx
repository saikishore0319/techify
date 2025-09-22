import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";


const ForgotPassword = () => {
  const { backendUrl , navigate} = useContext(ShopContext);
  const [step, setStep] = useState(1); // 1: ask email, 2: OTP + new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Step 1: request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendUrl + "/api/user/forgot-password", {
        email,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setStep(2);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // Step 2: reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendUrl + "/api/user/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (res.data.success) {
        toast.success("Password reset successful");
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
        setTimeout(() => {
          navigate("/login"); // <-- NEW
        }, 1500);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={step === 1 ? handleRequestOtp : handleResetPassword}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        )}

        {/* Step 2: Enter OTP + New Password */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-black"
        >
          {step === 1 ? "Send OTP" : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
