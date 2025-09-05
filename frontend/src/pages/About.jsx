import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
         <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 to-gray-600'>
            <p>Welcome to Techify, your premier destination for high-quality computer components. We're a team of passionate tech enthusiasts dedicated to providing you with the best parts to build, upgrade, and maintain your perfect PC.</p>
            <b className='text-gray-800'>Our Mission :</b>
            <p>Our mission is to empower both seasoned builders and newcomers alike with a seamless shopping experience. We offer a curated selection of the latest processors, graphics cards, motherboards, RAM, storage, and more, all sourced from trusted brands.

At Techify, we believe that building a computer should be an exciting and rewarding journey. We're committed to offering competitive prices, fast shipping, and exceptional customer support to help you every step of the way.

Thank you for choosing us to be a part of your PC building adventure. We're here to help you bring your dream machine to life. </p>
          </div>
      </div>

      <div className='text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 '>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Expertly Curated Selection:</b>
              <p className='text-gray-600'>We've done the hard work for you. Our team of tech experts carefully selects every product, ensuring you get access to only the highest quality and most reliable components from the best brands in the industry. </p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Competitive Pricing & Fast Shipping</b>
              <p className='text-gray-600'> We believe that building your dream PC shouldn't break the bank. We work hard to offer you the most competitive prices on the market, coupled with fast and secure shipping to get your parts to you as quickly as possible.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Dedicated Customer Support:</b>
              <p className='text-gray-600'>We're more than just a store; we're your partners in PC building. Our knowledgeable and friendly support team is always ready to assist you with any questions or concerns you may have, from choosing the right part to troubleshooting your build.</p>
          </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default About