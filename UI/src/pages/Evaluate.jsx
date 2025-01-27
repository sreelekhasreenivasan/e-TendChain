import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from "../assets/Etendering.json";
import address from "../assets/deployed_addresses.json";
import Navbar from "../components/Navebar2";

const Evaluate = () => {
  const [tenderId, setTenderId] = useState("");
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBidsForTender = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    if (!tenderId.trim()) {
      alert("Please enter a valid Tender ID.");
      return;
    }

    
    setLoading(true);
    try {
      // Initialize ethers.js
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      // console.log(signer);
      

      const Abi = ABI.abi;
      // console.log(Abi);
      
      const Address = address["EtendModule#Etendering"];
      // console.log(Address);
      
      const contractInstance = new ethers.Contract(Address, Abi, signer);
      console.log(contractInstance);
      

      console.log("Fetching bids for Tender ID:", tenderId);

      // Fetch bids for the tenderId
      const tenderBids = await contractInstance.getBids(tenderId);

      console.log("Raw Bids Array:", tenderBids);

      // Map and format bid data
      const formattedBids = tenderBids.map((bid) => ({
        bidder: bid.bidder.toString(),
        bidAmount: ethers.formatEther(bid.bidamount).toString(), // Convert Wei to ETH
        timestamp: new Date(Number(bid.timestamp) * 1000).toLocaleString().toString(),
      }));
      console.log(formattedBids);
      

      setBids(formattedBids);
    } catch (error) {
      console.error("Error fetching bids for tender:", error);
      alert("Failed to fetch bids. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Evaluate Bids</h1>

        <div className="text-center mb-6">
          <input
            type="text"
            placeholder="Enter Tender ID"
            value={tenderId}
            onChange={(e) => setTenderId(e.target.value)}
            className="border border-gray-600 rounded py-2 px-4 mr-4"
          />
          <button
            onClick={getBidsForTender}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg font-bold shadow-lg"
          >
            Get Bids
          </button>
        </div>

        {loading && <p className="text-center text-white">Loading bids...</p>}

        {!loading && bids.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table-auto text-center w-full text-white border border-gray-600 bg-gray-800 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-600">Bidder</th>
                  <th className="px-4 py-2 border border-gray-600">Bid Amount (ETH)</th>
                  <th className="px-4 py-2 border border-gray-600">Date Submitted</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border border-gray-600">{bid.bidder}</td>
                    <td className="px-4 py-2 border border-gray-600">{bid.bidAmount}</td>
                    <td className="px-4 py-2 border border-gray-600">{bid.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && bids.length === 0 && (
          <p className="text-center text-white">
            No bids found for this Tender ID. Please ensure you entered a valid ID.
          </p>
        )}
      </div>
    </div>
  );
};

export default Evaluate;