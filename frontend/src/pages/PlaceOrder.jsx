import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({ ...data, [name]: value }))
    // console.log(formData);

  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {

      let orderItems = []
      for (const id in cartItems) {
        for (const size in cartItems[id]) {
          if (cartItems[id][size] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === id))
            if (itemInfo) {
              itemInfo.size = size
              itemInfo.quantity = cartItems[id][size]
              orderItems.push(itemInfo)
            }
          }
        }
      }


      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })

          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
            toast.success(response.data.message)
          } else {
            toast.success(response.data.message)
          }
          break
      }
    } catch (error) {
      console.log(error);
      toast.success(error.message)
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left side of the page */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3 '>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" />
        <input required onChange={onChangeHandler} name='street' value={formData.street} placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" />
          <input required onChange={onChangeHandler} name='state' value={formData.state} placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" />
          <input required onChange={onChangeHandler} name='country' value={formData.country} placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" />
      </div>
      {/* Right side of the page */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* Payment method selection  */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod("stripe")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4 ' alt="" />
            </div>
            <div onClick={() => setMethod("razorpay")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4 ' alt="" />
            </div>
            <div onClick={() => setMethod("cod")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 '>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm cursor-pointer '>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder