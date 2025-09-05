import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.order.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast(error.message)
    }
  }

  const onChangeHandler = async (event, orderId) => {
    const status = event.target.value
    try {
      const response = await axios.post(backendUrl + "/api/order/status", { orderId, status }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className="p-4 sm:p-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Orders</h3>
      <div className="space-y-5">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-200 rounded-lg shadow-sm p-5 md:p-6 bg-white hover:shadow-md transition"
          >
            {/* Icon */}
            <img className="w-12 sm:w-14" src={assets.parcel_icon} alt="parcel" />

            {/* Order details */}
            <div>
              <div className="text-gray-700">
                {order.items.map((item, idx) => (
                  <p key={idx} className="py-0.5">
                    {item.name} × {item.quantity}
                    <span className="ml-1 text-gray-500 text-xs">({item.size})</span>
                    {idx !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>

              <p className="mt-3 mb-1 font-medium text-gray-800">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="text-sm text-gray-600 leading-snug">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}{" "}
                  {order.address.zipcode}
                </p>
              </div>
              <p className="mt-1 text-sm text-gray-500">📞 {order.address.phone}</p>
            </div>

            {/* Order info */}
            <div className="text-gray-700 space-y-1 text-sm sm:text-[15px]">
              <p>🛍 Items: {order.items.length}</p>
              <p>💳 Method: {order.paymentMethod}</p>
              <p>
                💰 Payment:{" "}
                <span className={order.payment ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p>📅 {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Price */}
            <p className="text-lg font-semibold text-gray-900">{currency}{order.amount}</p>

            {/* Status dropdown */}
            <select
              onChange={(event) => onChangeHandler(event, order._id)}
              value={order.status}
              className="p-2 border rounded-md bg-gray-50 text-sm font-medium cursor-pointer focus:ring-2 focus:ring-blue-400"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
