import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'


const Add = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")

  const [bestseller, setBestseller] = useState(false)



  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {

      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)

      formData.append("bestseller", bestseller)



      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })
      if (response.data) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setCategory('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setCategory('Processor')

        setPrice('')
        setBestseller(false)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong")

    }
  }

  return (
<form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-6 bg-white p-6 rounded-xl shadow-md'>
  {/* Upload Images */}
  <div>
    <p className='mb-2 text-gray-700 font-medium'>Upload Images</p>
    <div className='flex gap-4 flex-wrap'>
      <label htmlFor="image1" className="cursor-pointer">
        <img className='w-24 h-24 object-cover border rounded-lg shadow-sm hover:scale-105 transition' 
             src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
      </label>
      <label htmlFor="image2" className="cursor-pointer">
        <img className='w-24 h-24 object-cover border rounded-lg shadow-sm hover:scale-105 transition' 
             src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
      </label>
      <label htmlFor="image3" className="cursor-pointer">
        <img className='w-24 h-24 object-cover border rounded-lg shadow-sm hover:scale-105 transition' 
             src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
      </label>
      <label htmlFor="image4" className="cursor-pointer">
        <img className='w-24 h-24 object-cover border rounded-lg shadow-sm hover:scale-105 transition' 
             src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
      </label>
    </div>
  </div>

  {/* Name */}
  <div className='w-full'>
    <p className='mb-2 text-gray-700 font-medium'>Product Name</p>
    <input onChange={(e) => setName(e.target.value)} value={name} 
           className='w-full max-w-[500px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black outline-none' 
           type="text" placeholder='Type here' required />
  </div>

  {/* Description */}
  <div className='w-full'>
    <p className='mb-2 text-gray-700 font-medium'>Product Description</p>
    <textarea onChange={(e) => setDescription(e.target.value)} value={description} 
              className='w-full max-w-[500px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black outline-none' 
              placeholder='Write content here' required />
  </div>

  {/* Category + Price */}
  <div className='flex flex-col sm:flex-row gap-6 w-full'>
    <div className='flex-1'>
      <p className='mb-2 text-gray-700 font-medium'>Product Category</p>
      <select value={category} onChange={(e) => setCategory(e.target.value)} 
              className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black outline-none'>
        <option value="Processor">Processor</option>
        <option value="RAM">RAM</option>
        <option value="SSD">SSD</option>
        <option value="Graphics Card">Graphics Card</option>
      </select>
    </div>
    <div>
      <p className='mb-2 text-gray-700 font-medium'>Product Price</p>
      <input onChange={(e) => setPrice(e.target.value)} value={price} 
             className='w-full sm:w-[150px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black outline-none' 
             type="number" placeholder='25' />
    </div>
  </div>

  {/* Bestseller */}
  <div className='flex items-center gap-2 mt-2'>
    <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} 
           type="checkbox" id="bestseller" 
           className='w-4 h-4 accent-black cursor-pointer' />
    <label className='cursor-pointer text-gray-700 font-medium' htmlFor="bestseller">Add to Bestseller</label>
  </div>

  {/* Button */}
  <button type='submit' 
          className='w-32 py-3 mt-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 active:scale-95 transition'>
    ADD
  </button>
</form>

  )
}

export default Add