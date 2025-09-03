import express from 'express'
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders } from '../controllers/orderController.js'
import adminAuth from '../middleware/admiAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()
// admin routes
orderRouter.post("/list",adminAuth,allOrders)
orderRouter.post("/status",adminAuth,updateStatus)

//payment routes
orderRouter.post("/place",authUser,placeOrder)
orderRouter.post("/stripe",authUser,placeOrderStripe)
orderRouter.post("/razorpay",authUser,placeOrderRazorpay)

//user routes
orderRouter.get("/userorders",authUser,userOrders)


export default orderRouter 