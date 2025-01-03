import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../PICS/images-removebg-preview.png';

const Navbar = () => {
  return (
    <>
    <div className='bg-black bg-opacity-50 h-screen w-full  px-6 shadow-md'> 
      <nav className="flex">
       
        <div className="flex pt-8">
          <img src={logo} alt="e-TendChain" className="w-10 h-10 mr-3" />
          <span className="text-white text-xl pt-2 font-bold">e-TendChain</span>
        </div>

        <ul className="flex h-16 pt-12 space-x-6 ml-auto text-white text-sm font-medium">
          <li className="mr-4 hover:text-gray-400 cursor-pointer">HOME</li>
          <li className="mr-4 hover:text-gray-400 cursor-pointer"><Link to={'createtend'}>TENDER PUBSLISHER LOGIN</Link></li>
          <li className="mr-4 hover:text-gray-400 cursor-pointer"><Link to={'bidtend'}>BIDDER LOGIN</Link></li>
        </ul>

        
        <button className="ml-6 mt-8 h-12 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
          REGISTER
        </button>
      </nav>
      <div className="text-white font-bold w-2/4 h-82 ml-44 text-2xl mt-32  p-6 rounded-lg shadow-2xl  hover:shadow-2xl transition-shadow duration-300">
  Revolutionizing procurement, a seamless, transparent, and efficient way to manage bids online
  -<br></br>saving time, ensuring fairness, and driving smarter decisions.
</div>

      </div>
      
     
    </>
  );
};

export default Navbar;
