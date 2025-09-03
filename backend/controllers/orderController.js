import mongoose from "mongoose"
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

//placing orders using cod
const placeOrder = async (req, res) => {
    try {
        const {  items, amount, address } = req.body
        const {userId} = req
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.status(200).json({ success: true, message: "Order placed" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

//using stripe 
const placeOrderStripe = async (req, res) => {

}

//using razorpay
const placeOrderRazorpay = async (req, res) => {

}

//all orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const order = await userModel.find({})
        res.status(200).json({success:true, order})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:true, message: error.message})
        
    }
}

//user order data for frontend
const userOrders = async (req, res) => {
    try {
        const {userId} = req
        console.log("user id fetched");
        
        const orders = await orderModel.find({userId})
        res.status(200).json({success: true, orders})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message})
    }
}

//update Order from admin panel
const updateStatus = async (req, res) => {

}

export { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders }