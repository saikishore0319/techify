import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link 
      to={`/product/${id}`} 
      className="group block bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300"
    >
      {/* Image container */}
      <div className="w-full aspect-square overflow-hidden bg-gray-100">
        <img 
          src={image[0]} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
      </div>

      {/* Product details */}
      <div className="p-3">
        {/* Product Name */}
        <p className="text-gray-800 text-sm font-medium h-10 line-clamp-2">
          {name}
        </p>

        {/* Price */}
        <p className="mt-2 text-base font-bold text-black">
          {currency}{price}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem
