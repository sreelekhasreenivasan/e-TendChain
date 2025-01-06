import React, { useState } from "react";
import { ethers } from "ethers";
import Navbar from "../components/Navebar2";
import ABI from "../assets/Etendering.json";
import address from "../assets/deployed_addresses.json";
import axios from "axios";
import { parseEther } from "ethers";

const CreateTend = () => {

  const [form, setForm] = useState({
    tendertitle: "",
    tenderdescription: "",
    opendate: "",
    closingdate: "",
    totalamount: "",
    file: null,
  });

  const [ipfsHash, setIpfsHash] = useState("");

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
    console.log(form.file);
    
  }


  async function handleSubmit(e) {
    e.preventDefault();
    try {

      const hash = await uploadToPinata(form.file);
      setIpfsHash(hash);
      console.log(hash);
      

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const Abi = ABI.abi;
      const Address = address["EtendModule#Etendering"];
      const contractInstance = new ethers.Contract(Address, Abi, signer);
      const txnRcpt = await contractInstance.createTender(
        form.tendertitle,
        form.tenderdescription,
        Math.floor(new Date(form.opendate).getTime() / 1000),
        Math.floor(new Date(form.closingdate).getTime() / 1000),
        parseEther(form.totalamount),
        hash 
      );

      console.log(txnRcpt);
      alert("Tender created successfully!");
    } catch (error) {
      console.error("Error submitting tender:", error);
      alert("Error creating tender. See console for details.");
    }
  }

  async function uploadToPinata(file) {
    console.log("From upload to Pinata:", file);
  
    const formData = new FormData(); 
    formData.append("file", file);
  
    try {
      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData, 
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: "e1e44cd23fa01e223320", 
          pinata_secret_api_key: "17b095cf4779779622730be6c2bdcad827d043cdc4ad745fc4e40e69128707fa",
        },
      });
      console.log("File uploaded to Pinata:", response.data.IpfsHash);
      return response.data.IpfsHash;
    } catch (error) {
      console.error("Pinata upload error:", error);
      throw error;
    }
  }
  

  return (
    <div>
      <Navbar />
      <form
        action=""
        className="bg-black mt-8 p-10 mx-auto shadow-lg w-3/4 text-white rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="flex flex-col">
            <label htmlFor="tender-title" className="mb-2 font-semibold">
              Tender Title:
            </label>
            <input
              id="tendertitle"
              type="text"
              name="tendertitle"
              placeholder="Enter Tender Title"
              className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="tender-description" className="mb-2 font-semibold">
              Tender Description:
            </label>
            <input
              id="tenderdescription"
              type="text"
              name="tenderdescription"
              placeholder="Small Description"
              className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="open-date" className="mb-2 font-semibold">
              Open Date:
            </label>
            <input
              id="opendate"
              type="date"
              name="opendate"
              className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="closing-date" className="mb-2 font-semibold">
              Closing Date:
            </label>
            <input
              id="closingdate"
              type="date"
              name="closingdate"
              className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="total-amount" className="mb-2 font-semibold">
              Total Amount:
            </label>
            <input
              id="totalamount"
              type="text"
              name="totalamount"
              placeholder="Enter Amount"
              className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="tender-documents" className="mb-2 font-semibold">
              Upload Tender Documents:
            </label>
            <input
              id="tenderdocuments"
              type="file"
              name="file"
              className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              onChange={handleChange}
            />
            <p className="text-sm mt-2 text-gray-400"></p>
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
  );
};

export default CreateTend;