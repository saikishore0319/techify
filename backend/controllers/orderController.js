import mongoose from "mongoose"
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'
import Razorpay from "razorpay"
import razorpayInstance from 'razorpay'
import { getStartOf } from "../utils/getStartOf.js"
// import Orders from "../../frontend/src/pages/Orders.jsx"


const currency = 'inr'
const deliveryCharge = 10

//initialize payment gateways
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

//placing orders using cod
const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body
        const { userId } = req
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
    try {
        const { items, amount, address } = req.body
        const { userId } = req
        const { origin } = req.headers
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })
        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const verifyStripe = async (req, res) => {
    const { orderId, success } = req.body
    const { userId } = req
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.status(200).json({ success: true, message: "order placed " })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.status(400).json({ success: false, message: "order not placed " })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message })
    }
}

//using razorpay
const placeOrderRazorpay = async (req, res) => {
    try {
        const { items, amount, address } = req.body
        const { userId } = req

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        // console.log(options.amount);
        // console.log(options.receipt);
        // console.log(options.currency);


        razorpay.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                res.status(400).json({ success: false, message: error })
            }
            res.status(200).json({ success: true, order })

        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message })

    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const { userId } = req
        const { razorpay_order_id } = req.body

        const orderInfo = await razorpay.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { cartData: {} })
            res.status(200).json({ success: true, message: "Payment done successfully" })
        } else {
            res.status(400).json({ success: false, message: "Payment failed" })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message })

    }
}

//all orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const order = await orderModel.find({})
        res.status(200).json({ success: true, order })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: true, message: error.message })

    }
}

//user order data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req
        console.log("user id fetched");

        const orders = await orderModel.find({ userId })
        res.status(200).json({ success: true, orders })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message })
    }
}

//update Order from admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.status(200).json({ success: true, message: "Order status updated" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

const getSalesStats = async (req, res) => {
    try {
        const now = new Date();

        const dayStart = getStartOf("day");
        const weekStart = getStartOf("week");
        const monthStart = getStartOf("month");

        const [daily, weekly, monthly, total] = await Promise.all([
            orderModel.aggregate([
                { $match: { date: { $gte: dayStart.getTime() } } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]),
            orderModel.aggregate([
                { $match: { date: { $gte: weekStart.getTime() } } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]),
            orderModel.aggregate([
                { $match: { date: { $gte: monthStart.getTime() } } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]),
            orderModel.aggregate([
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ])
        ]);

        res.status(200).json({
            success: true,
            daily: daily[0]?.total || 0,
            weekly: weekly[0]?.total || 0,
            monthly: monthly[0]?.total || 0,
            overall: total[0]?.total || 0,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyStripe, verifyRazorpay,getSalesStats }