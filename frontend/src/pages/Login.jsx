import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const { token, setToken, navigate, backendUrl, getUserCart } = useContext(ShopContext)
  const [currentState, setCurrentState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong'
      toast.error(msg)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])
  useEffect(() => {
  if (token) {
    getUserCart(token);
  }
}, [token]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 flex flex-col gap-5"
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <p className="text-3xl font-bold text-gray-800">{currentState}</p>
          <hr className="h-[2px] w-10 bg-gray-800 border-none rounded" />
        </div>

        {/* Input Fields */}
        {currentState === 'Login' ? null : (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none text-sm"
            placeholder="Full Name"
            required
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none text-sm"
          placeholder="Email Address"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none text-sm"
          placeholder="Password"
          required
        />

        {/* Links */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <p className="cursor-pointer hover:text-gray-900">Forgot your password?</p>
          {currentState === 'Login' ? (
            <p
              onClick={() => setCurrentState('Sign Up')}
              className="cursor-pointer font-medium text-gray-800 hover:text-black"
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className="cursor-pointer font-medium text-gray-800 hover:text-black"
            >
              Login Here
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-black transition"
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Login
