import React from 'react'
import Navbar from '../components/Navebar2'

const CreateTend = () => {
  return (
    <div>
        <Navbar/>
        <form action="" className="bg-black mt-6 p-10 mx-auto shadow-lg w-3/4 text-white rounded-lg">
        <h2 className='font-bold  text-2xl pt-2'>CREATE TENDER</h2>
  <div className="grid grid-cols-2 gap-6 mt-8">
    <div className="flex flex-col">
      <label htmlFor="tender-title" className="mb-2 font-semibold">Tender Title:</label>
      <input 
        id="tender-title" 
        type="text" 
        placeholder="Enter Tender Title" 
        className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
      />
    </div>
    
    <div className="flex flex-col">
      <label htmlFor="tender-description" className="mb-2 font-semibold">Tender Description:</label>
      <input 
        id="tender-description" 
        type="text" 
        placeholder="Small Description" 
        className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
      />
    </div>
    
    <div className="flex flex-col">
      <label htmlFor="open-date" className="mb-2 font-semibold">Open Date:</label>
      <input 
        id="open-date" 
        type="date" 
        className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
      />
    </div>
    
    <div className="flex flex-col">
      <label htmlFor="closing-date" className="mb-2 font-semibold">Closing Date:</label>
      <input 
        id="closing-date" 
        type="date" 
        className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
      />
    </div>
    
    <div className="flex flex-col col-span-2">
      <label htmlFor="total-amount" className="mb-2 font-semibold">Total Amount:</label>
      <input 
        id="total-amount" 
        type="text" 
        placeholder="Enter Amount" 
        className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
      />
    </div>
  </div>

  <button 
    type="submit" 
    className="w-full mt-6 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-bold shadow-lg transition duration-300"
  >
    Submit
  </button>
</form>



    </div>
  )
}

export default CreateTend