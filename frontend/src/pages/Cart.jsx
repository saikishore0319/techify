import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';

const Cart = () => {
  const { products, currency, cartItems, UpdateQuantity, navigate, getCartAmount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  const onclickHandler = () => {
    if (getCartAmount() === 0) {
      toast.error("Cart is empty");
    } else {
      navigate('/place-order');
    }
  };

  useEffect(() => {
    const tempData = [];
    for (const id in cartItems) {
      if (cartItems[id] > 0) {
        tempData.push({
          _id: id,
          quantity: cartItems[id],
        });
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14 bg-gray-50 min-h-screen">
      {/* Title */}
      <div className="text-2xl mb-6">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between hover:shadow-lg transition"
              >
                {/* Left - Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    className="w-16 sm:w-20 rounded-lg border"
                    src={productData?.image?.[0]}
                    alt={productData?.name}
                  />
                  <div>
                    <p className="text-sm sm:text-lg font-medium text-gray-800">
                      {productData?.name}
                    </p>
                    <p className="mt-1 text-gray-600">
                      {currency}
                      {productData?.price}
                    </p>
                  </div>
                </div>

                {/* Middle - Quantity Input */}
                <div className="flex items-center gap-3">
                  <input
                    onChange={(e) =>
                      e.target.value === '' || e.target.value === '0'
                        ? null
                        : UpdateQuantity(item._id, Number(e.target.value))
                    }
                    className="border border-gray-300 rounded-md w-14 sm:w-20 text-center px-2 py-1 focus:ring-2 focus:ring-gray-400 outline-none"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />
                  {/* Remove Icon */}
                  <img
                    onClick={() => UpdateQuantity(item._id, 0)}
                    className="w-5 sm:w-6 cursor-pointer hover:scale-110 transition"
                    src={assets.bin_icon}
                    alt="remove"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 py-10 text-lg">
            Your cart is empty 🛒
          </p>
        )}
      </div>

      {/* Cart Total + Checkout */}
      {cartData.length > 0 && (
        <div className="flex justify-end my-16">
          <div className="w-full sm:w-[450px] bg-white shadow-lg rounded-xl p-6">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={onclickHandler}
                className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium mt-6 px-8 py-3 rounded-lg transition"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
