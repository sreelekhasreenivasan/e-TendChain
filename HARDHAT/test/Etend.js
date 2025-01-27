const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const {expect} =require('chai');
const {ethers} = require('hardhat');

describe('Etendering',function(){

    async function deployContract(){

       const [Tender,Bidder1,Bidder2] = await ethers.getSigners();
       const etend= await ethers.getContractFactory('Etendering'); //load the bytcode and ABI
       const Etender =  await etend.deploy();
        return {Etender, Tender,Bidder1,Bidder2};       

    }

    it("Able to create tender", async function(){
        const{Etender,Tender}=await loadFixture(deployContract); //dont have to re-deploy in each testing
        const name="Building Project";
        const Amount=500000;
        const ipfsHash="Qm...hash";
        await Etender.connect(Tender).createTender(name, "Build a highway", 1704508800, 1707187200, Amount, ipfsHash)

        const etend=await Etender.tenders(1);
        // console.log(etend);
        expect(etend.title).to.equal("Building Project");
        expect(etend.description).to.equal("Build a highway");
        expect(etend.Amount).to.equal(Amount);
        expect(etend.owner).to.equal(Tender.address);
        expect(etend.ipfsHash).to.equal(ipfsHash);
        
    })  

    it("Able to submit bid", async function(){

        const{Etender,Tender,Bidder1}=await loadFixture(deployContract);
        const Amount=500000;
        const ipfsHash="Qm...hash";
        await Etender.connect(Tender).createTender("Road Project", "Build a highway", 1704508800, 1707187200, Amount, ipfsHash)
        
        const bidamount=450000;
        await Etender.connect(Bidder1).submitBid(1,bidamount);
        const Etend=await Etender.bids(1,0);

        expect(Etend.tenderId).to.equal(1);
        expect(Etend.bidder).to.equal(Bidder1.address);
        expect(Etend.bidamount).to.equal(bidamount);

    })

    it("Should close the tender after selecting the lowest", async function(){
        const{Etender,Tender,Bidder1,Bidder2}=await loadFixture(deployContract);
        const Amount=500000;
        const ipfsHash="Qm...hash";
        await Etender.connect(Tender).createTender("Road Project", "Build a highway", 1704508800, 1707187200,Amount, ipfsHash)

        const bidamount1=450000;
        const bidamount2=430000;

        await Etender.connect(Bidder1).submitBid(1,bidamount1);
        await Etender.connect(Bidder2).submitBid(1,bidamount2);

        await Etender.connect(Tender).closeTender(1)

    })

})