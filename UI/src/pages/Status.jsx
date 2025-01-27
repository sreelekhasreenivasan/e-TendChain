import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from "../assets/Etendering.json";
import address from "../assets/deployed_addresses.json";
import Navbar from "../components/Navebar2";

const Status = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBids = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const Abi = ABI.abi;
      const Address = address["EtendModule#Etendering"];
      const contractInstance = new ethers.Contract(Address, Abi, signer);

      const bidderAddress = await signer.getAddress();
      console.log("Fetching bids for address:", bidderAddress);

      const tenderCount = await contractInstance.tenders(); 
      const allBids = [];

      for (let i = 1; i <= tenderCount; i++) {
        const tenderBids = await contractInstance.getBids(i); 

        tenderBids.forEach((bid) => {
          if (bid.bidder.toLowerCase() === bidderAddress.toLowerCase()) {
            allBids.push({
              tenderId: i,
              bidAmount: ethers.formatEther(bid.bidamount),
              timestamp: new Date(bid.timestamp * 1000).toLocaleString(),
            });
          }
        });
      }

      const updatedBids = await Promise.all(
        allBids.map(async (bid) => {
          const tender = await contractInstance.tenders(bid.tenderId);
          const isClosed = tender.Cdate < Math.floor(Date.now() / 1000); 

          if (isClosed) {
            const tenderBids = await contractInstance.getBids(bid.tenderId);
            const lowestBid = tenderBids.reduce((min, current) =>
              current.bidamount < min.bidamount ? current : min
            );

            return {
              ...bid,
              isLowest: lowestBid.bidder.toLowerCase() === bidderAddress.toLowerCase(),
              closed: true,
            };
          }

          return {
            ...bid,
            isLowest: false,
            closed: false,
          };
        })
      );

      setBids(updatedBids);
    } catch (error) {
      console.error("Error fetching bids:", error);
      alert("Failed to fetch bids. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBids();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Bid Status
        </h1>
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : bids.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-center text-white border-collapse border border-gray-600">
              <thead>
                <tr>
                  <th className="border border-gray-600 px-4 py-2">Tender ID</th>
                  <th className="border border-gray-600 px-4 py-2">Bid Amount (ETH)</th>
                  <th className="border border-gray-600 px-4 py-2">Timestamp</th>
                  <th className="border border-gray-600 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid, index) => (
                  <tr key={index} className="bg-gray-700">
                    <td className="border border-gray-600 px-4 py-2">{bid.tenderId}</td>
                    <td className="border border-gray-600 px-4 py-2">{bid.bidAmount}</td>
                    <td className="border border-gray-600 px-4 py-2">{bid.timestamp}</td>
                    <td className="border border-gray-600 px-4 py-2">
                      {bid.closed ? (
                        bid.isLowest ? (
                          <span className="text-green-500 font-bold">Lowest Bid</span>
                        ) : (
                          <span className="text-red-500 font-bold">Not Selected</span>
                        )
                      ) : (
                        <span className="text-blue-500 font-bold">Open</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-400">No bids found for your account.</p>
        )}
      </div>
    </div>
  );
};

export default Status;
