import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from "../assets/Etendering.json";
import address from "../assets/deployed_addresses.json";
import Navbar from "../components/Navebar2";

const Winner = () => {
  const [tenderId, setTenderId] = useState("");
  const [winner, setWinner] = useState(null);
  const [lowestBid, setLowestBid] = useState(null);
  const [loading, setLoading] = useState(false);

  const closeTender = async () => {
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
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const Abi = ABI.abi;
      const Address = address["EtendModule#Etendering"];
      const contractInstance = new ethers.Contract(Address, Abi, signer);

      console.log("Closing Tender ID:", tenderId);

      const tx = await contractInstance.closeTender(tenderId);
      await tx.wait();

      console.log("Transaction details:", tx);

      const receipt = await provider.getTransactionReceipt(tx.hash);
      const event = receipt.logs
        .map((log) => contractInstance.interface.parseLog(log))
        .find((parsedLog) => parsedLog.name === "TenderClosed");

      if (event) {
        setWinner(event.args.winner);
        setLowestBid(ethers.formatEther(event.args.lowestBid));
      } else {
        console.log("No TenderClosed event found.");
      }
    } catch (error) {
      console.error("Error closing tender:", error);
      alert("Failed to close tender. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Close Tender
        </h1>

        <div className="text-center mb-6">
          <input
            type="text"
            placeholder="Enter Tender ID"
            value={tenderId}
            onChange={(e) => setTenderId(e.target.value)}
            className="border border-gray-600 rounded py-2 px-4 mr-4"
          />
          <button
            onClick={closeTender}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg font-bold shadow-lg"
            disabled={loading}
          >
            {loading ? "Closing..." : "Close Tender"}
          </button>
        </div>

        {winner && lowestBid ? (
          <div className="mt-20 text-center">
            <h2 className="text-5xl font-bold text-green-500">Tender Closed Successfully..</h2>
            <p className="mt-8">
              <strong className="text-2xl">Winner:</strong> {winner}
            </p>
            <p className="mt-8">
              <strong className="text-2xl">Lowest Bid:</strong> {lowestBid} ETH
            </p>
          </div>
        ) : (
          <div className="mt-8 text-center text-gray-400">
            <p>Close a tender to see the winner and lowest bid.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Winner;
