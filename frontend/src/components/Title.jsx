import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex flex-col items-center mb-8">
      {/* Main heading with techy gradient highlight on text2 */}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-gray-800">
        {text1}{' '}
        <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
          {text2}
        </span>
      </h2>

      {/* Futuristic underline */}
      <div className="mt-2 w-16 sm:w-24 h-[3px] rounded-full bg-gradient-to-r from-orange-500 to-yellow-500"></div>
    </div>
  )
}

export default Title
