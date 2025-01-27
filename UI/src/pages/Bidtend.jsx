import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from "../assets/Etendering.json";
import address from "../assets/deployed_addresses.json";
import Navbar from "../components/Navebar3";
import { formatEther } from "ethers";

const Bidtend = () => {
  const [tenderId, setTenderId] = useState("");
  const [tenderDetails, setTenderDetails] = useState(null);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState("");

  const getTenderDetails = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const Abi = ABI.abi;
      const Address = address["EtendModule#Etendering"];
      const contractInstance = new ethers.Contract(Address, Abi, signer);
      console.log(contractInstance);
      

      const tender = await contractInstance.tenders(tenderId);
      console.log(tender);
      

      const getTenderdata = {
        id: Number(tender[0]),
        title: tender[1].toString(),
        description: tender[2].toString(),
        openDate: new Date(Number(tender[3]) * 1000).toString(),
        closeDate: new Date(Number(tender[4]) * 1000).toString(),
        totalAmount: formatEther(tender[5].toString()),
        owner: tender[6].toString(),
        ipfsHash: tender[7].toString(),
      };

      setTenderDetails(getTenderdata);
    } catch (error) {
      console.error("Error fetching tender details from blockchain:", error);
      alert("Failed to fetch tender details. See console for details.");
    }
  };

  const handleBidClick = () => {
    setShowBidForm(true); 
  };

  const submitBid = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const Abi = ABI.abi;
      const Address = address["EtendModule#Etendering"];
      const contractInstance = new ethers.Contract(Address, Abi, signer);

      const bidAmountInWei = ethers.parseEther(bidAmount);
      const transaction = await contractInstance.submitBid(tenderDetails.id, bidAmountInWei);

      alert("Bid submitted successfully!");
      setBidAmount("");
      setShowBidForm(false); 
    } catch (error) {
      console.error("Error submitting bid:", error);
      alert("Failed to submit bid. See console for details.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Tender Dashboard</h1>

        <div className="text-center mb-6">
          <input
            type="text"
            placeholder="Enter Tender ID"
            value={tenderId}
            onChange={(e) => setTenderId(e.target.value)}
            className="border border-gray-600 rounded py-2 px-4 mr-4"
          />
          <button
            onClick={getTenderDetails}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg font-bold shadow-lg"
          >
            Get Tender Details
          </button>
        </div>

        {tenderDetails ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-white border border-gray-600 bg-gray-800 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-600">ID</th>
                  <th className="px-4 py-2 border border-gray-600">Title</th>
                  <th className="px-4 py-2 border border-gray-600">Description</th>
                  <th className="px-4 py-2 border border-gray-600">Open Date</th>
                  <th className="px-4 py-2 border border-gray-600">Close Date</th>
                  <th className="px-4 py-2 border border-gray-600">Amount (ETH)</th>
                  <th className="px-4 py-2 border border-gray-600">Owner</th>
                  <th className="px-4 py-2 border border-gray-600">IPFS File</th>
                  <th className="px-4 py-2 border border-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border border-gray-600">{tenderDetails.id}</td>
                  <td className="px-4 py-2 border border-gray-600">{tenderDetails.title}</td>
                  <td className="px-4 py-2 border border-gray-600">{tenderDetails.description}</td>
                  <td className="px-4 py-2 border border-gray-600">{tenderDetails.openDate}</td>
                  <td className="px-4 py-2 border border-gray-600">{tenderDetails.closeDate}</td>
                  <td className="px-4 py-2 border border-gray-600">{tenderDetails.totalAmount}</td>
                  <td className="px-4 py-2 border border-gray-600">{tenderDetails.owner}</td>
                  <td className="px-4 py-2 border border-gray-600">
                    <a
                      href={`https://gateway.pinata.cloud/ipfs/${tenderDetails.ipfsHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      View File
                    </a>
                  </td>
                  <td className="px-4 py-2 border border-gray-600">
                    <button
                      onClick={handleBidClick}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded"
                    >
                      Click Here
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-white">Enter a Tender ID and click "Get Tender Details" to load data.</p>
        )}

        {showBidForm && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-bold text-white mb-4">Submit Your Bid</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter Bid Amount (ETH)"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="border border-gray-600 rounded py-2 px-4 mr-4"
              />
              <button
                onClick={submitBid}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-bold shadow-lg"
              >
                Submit Bid
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bidtend;
