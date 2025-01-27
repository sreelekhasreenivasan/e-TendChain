require("@nomicfoundation/hardhat-toolbox");
require ("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",

  networks:{
    localhost:{
      url:"http://127.0.0.1:8545/"
    },
    sepolia:{

        url: "https://eth-sepolia.g.alchemy.com/v2/KK9YbXJ8Gos45Mo2ki-qtWU1mfhvYytQ",
        accounts:["dcd8e81a8d4250f9683db27fc47d3c0cc43b50fb2d3d38606ec9f204afdd1eea"]
      }
  }
};
