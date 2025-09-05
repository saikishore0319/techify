import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')


  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-4 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18%] w-full p-1 sm:p-0'>
            {
              productData.image.map((item, index) => (
                <img 
                  onClick={() => setImage(item)} 
                  src={item} 
                  key={index} 
                  className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border rounded-md object-cover hover:opacity-80 transition ${image === item ? 'border-2 border-blue-500' : 'border-gray-200'}`} 
                  alt="" 
                />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto rounded-md shadow-md object-contain' src={image} alt="" />
          </div>
        </div>

        {/* product information */}
        <div className='flex-1'>
          <h1 className='font-semibold text-2xl sm:text-3xl mt-2 text-gray-800'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-3'>
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <p className='pl-2 text-gray-500 text-sm'>(122 reviews)</p>
          </div>
          <p className='mt-5 text-3xl font-semibold text-gray-900'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-600 leading-relaxed md:w-4/5'>{productData.description}</p>

          <button 
            onClick={()=>addToCart(productData._id)} 
            className='bg-black text-white px-8 py-3 text-sm mt-10 rounded-md shadow hover:bg-orange-500 hover:text-white duration-200 active:scale-95'
          >
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5 border-gray-300' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>✅ 100% Original Product</p>
            <p>💵 Cash on delivery is available on this product</p>
            <p>🔄 Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* description and review section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-6 py-3 text-sm bg-gray-100'>Description</b>
          <p className='border px-6 py-3 text-sm cursor-pointer hover:bg-gray-50'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600 leading-relaxed bg-white'>
          <p>{productData.description}</p>
        </div>
      </div>

      {/* display related products */}
      <RelatedProducts category={productData.category} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
