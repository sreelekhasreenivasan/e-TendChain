import React from 'react';
import {Link} from 'react-router-dom';
import {ethers} from 'ethers';
import logo from '../../PICS/images-removebg-preview.png';

const Navbar = () => {


  async function connectToMetamaskasTender(){
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer= await provider.getSigner();
    const address=signer.address;
    console.log(address);
    alert(`${address} Tender Publisher successfully logged in `)
  }

  async function connectToMetamaskasBidder(){
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer= await provider.getSigner();
    const address=signer.address;
    console.log(address);
    alert(`${address} Bidder successfully logged in `)
  }

  return (
    <>
    <div className='bg-black bg-opacity-50 h-screen w-full  px-6 shadow-md'> 
      <nav className="flex">
       
        <div className="flex pt-8">
          <img src={logo} alt="e-TendChain" className="w-10 h-10 mr-3" />
          <span className="text-white text-xl pt-2 font-bold">e-TendChain</span>
        </div>

        <ul className="flex h-16 pt-12 space-x-6 ml-auto text-white text-sm font-medium">
        </ul>

        <button onClick={connectToMetamaskasTender} className="ml-6 mt-8 h-12 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"><Link to={'/createtend'}>
          TENDER PUBLISHER LOGIN</Link>
        </button>

        <button onClick={connectToMetamaskasBidder} className="ml-6 mt-8 h-12 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"><Link to={'/bidtend'}>
          BIDDER LOGIN</Link>
        </button>

      </nav>
      <div className="text-white font-bold w-2/4 h-82 ml-44 text-4xl mt-44  p-6 rounded-lg shadow-2xl  hover:shadow-2xl transition-shadow duration-300">
  Revolutionizing procurement, a seamless, transparent, and efficient way to manage bids online
  -<br></br>saving time, ensuring fairness, and driving smarter decisions.
</div>

      </div>
      
     
    </>
  );
};

export default Navbar;
