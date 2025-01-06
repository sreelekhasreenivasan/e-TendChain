import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../PICS/images-removebg-preview.png';

const Navbar = () => {

  function disconnectmetamask(){
    
  }

  return (
    <>
      <nav className="bg-black h-16 flex items-center px-6 shadow-md">
       
        <div className="flex items-center">
          <img src={logo} alt="e-TendChain" className="w-10 h-10 mr-3" />
          <span className="text-white text-xl font-bold">e-TendChain</span>
        </div>

       
        <ul className="flex space-x-6 ml-auto text-white text-sm font-medium">
          <li className="hover:text-gray-400 cursor-pointer"><Link to={'/createtend'}>CREATE TENDER</Link></li>
          <li className="hover:text-gray-400 cursor-pointer"><Link to={'/evaluate'}>EVALUATE TENDER & NEGOTIATION</Link></li>
          <li className="hover:text-gray-400 cursor-pointer"><Link to={'/winner'}>WINNER SELECTION</Link></li>
        </ul>

        
        <button onClick={disconnectmetamask} className="ml-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
          LOGOUT
        </button>
      </nav>
    </>
  );
};

export default Navbar;
