// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract Etendering{

    struct Tender{

        uint id;
        string title;
        string description;
        uint Odate;
        uint Cdate;
        uint Amount;
        address owner;
        string ipfsHash;
       

    }

    struct Bid{

        uint tenderId;
        address bidder;
        uint bidamount;
        uint timestamp;
    }

    uint tenderCount;
    
    mapping (uint=>Tender) public tenders;
    mapping (uint=>Bid[]) public bids;

    modifier check(uint _Odate, uint _Cdate) {
    require(_Odate < _Cdate, "Check the dates: Opening date must be earlier than closing date");
    _;
}

    event TenderCreated(uint tenderId, string title, address owner, uint Odate, uint Cdate, uint Amount);
    event BidSubmitted(uint tenderId, address bidder, uint bidamount, uint timestamp);
    event TenderClosed(uint tenderId, address winner, uint lowestBid);

    function createTender(
        string memory _title, 
        string memory _description, 
        uint _Odate, 
        uint _Cdate,
        uint _Amount,
        string memory _ipfsHash
        ) public check(_Odate, _Cdate) {
            tenderCount++;
            tenders[tenderCount]= Tender(
                tenderCount,
                _title,
                _description,
                _Odate,
                _Cdate,
                _Amount,
                msg.sender,
                _ipfsHash);
                            
        emit TenderCreated(tenderCount,_title, msg.sender, _Odate, _Cdate, _Amount);

        }

        function submitBid(uint _tenderId, uint _bidamount)public {

            require(block.timestamp >= tenders[_tenderId].Odate, "Tender has not opened yet");

            bids[_tenderId].push(Bid({
                tenderId:_tenderId,
                bidder: msg.sender,
                bidamount:_bidamount,
                timestamp:block.timestamp
            }));
            
        emit BidSubmitted(_tenderId, msg.sender, _bidamount, block.timestamp);

        }

    function closeTender(uint _tenderId) public returns (address winner, uint lowestBid) {

    require(tenders[_tenderId].owner == msg.sender, "You are not the Tender Owner");
    require(block.timestamp > tenders[_tenderId].Cdate, "Tender is still open");

    Bid[] memory tenderBids = bids[_tenderId];
    uint minBid = type(uint).max;
    address minBidder;

    for (uint i = 0; i < tenderBids.length; i++) {
        if (tenderBids[i].bidamount < minBid) {
            minBid = tenderBids[i].bidamount;
            minBidder = tenderBids[i].bidder;
        }
    }


    emit TenderClosed(_tenderId, minBidder, minBid);

    return (minBidder, minBid);
}

}