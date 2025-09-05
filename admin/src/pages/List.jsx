import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const [list, setList] = useState([])
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list")
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }
  }

  const removeProduct = async(id)=>{
    try {
      const response = await axios.post(backendUrl + "/api/product/remove", {id}, {headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList()
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
    }
  }

  useEffect(() => {
    fetchList()
  }, [])
  return (
    <>
      <p className='mb-4 text-lg font-semibold text-gray-800'>All Product List</p>
      <div className='flex flex-col gap-3'>
        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border rounded-md bg-gray-100 font-medium text-gray-700 text-sm shadow-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Display products list */}
        {
          list.map((item, index)=>(
              <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 py-2 px-4 border rounded-md bg-white text-sm shadow-sm hover:shadow-md transition'>
                  <img className='w-14 h-14 object-cover rounded-md border' src={item.image[0]} alt="" />
                  <p className='font-medium text-gray-800 truncate'>{item.name}</p>
                  <p className='text-gray-600'>{item.category}</p>
                  <p className='font-semibold text-gray-700'>{currency}{item.price}</p>
                  <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-red-500 hover:text-red-700 text-lg font-bold'>×</p>
              </div>
          ))
        }
      </div>
    </>
  )
}

export default List
