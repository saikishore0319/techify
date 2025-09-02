import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

//placing orders using cod
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
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

}

//user order data for frontend
const userOrders = async (req, res) => {

}

//update Order from admin panel
const updateStatus = async (req, res) => {

}

export { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders }