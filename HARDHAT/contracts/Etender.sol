// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Etendering {
    
    struct Tender {
        uint id;
        string title;
        string description;
        uint startDate;
        uint endDate;
        uint budget;
        address owner;
        bool isClosed;
    }

    struct Bid {
        uint tenderId;
        address bidder;
        uint amount;
        uint timestamp;
    }

    uint public tenderCount;

    mapping(uint => Tender) public tenders;
    mapping(uint => Bid[]) public bids;

    event TenderCreated(uint id, string title, string description, uint startDate, uint endDate, uint budget, address owner);
    event BidSubmitted(uint tenderId, address bidder, uint amount);
    event TenderClosed(uint tenderId, address winner, uint amount);

    function createTender(
        string memory _title,
        string memory _description,
        uint _startDate,
        uint _endDate,
        uint _budget
    ) public {
        require(_startDate < _endDate, "Start date must be before end date");

        tenderCount++;

        tenders[tenderCount] = Tender(
            tenderCount,
            _title,
            _description,
            _startDate,
            _endDate,
            _budget,
            msg.sender,
            false
        );
        emit TenderCreated(tenderCount, _title, _description, _startDate, _endDate, _budget, msg.sender);
    }

    function submitBid(uint _tenderId, uint _amount) public {
        Tender memory tender = tenders[_tenderId];
        require(block.timestamp >= tender.startDate, "Tender is not open yet");
        require(block.timestamp <= tender.endDate, "Tender is closed");
        require(_amount <= tender.budget, "Bid exceeds the budget");

        bids[_tenderId].push(Bid(_tenderId, msg.sender, _amount, block.timestamp));
        emit BidSubmitted(_tenderId, msg.sender, _amount);
    }

    function closeTender(uint _tenderId) public {
        Tender storage tender = tenders[_tenderId];
        require(msg.sender == tender.owner, "Only owner can close the tender");
        require(!tender.isClosed, "Tender is already closed");

        uint lowestBidAmount = type(uint).max;
        address winner;

        for (uint i = 0; i < bids[_tenderId].length; i++) {
            if (bids[_tenderId][i].amount < lowestBidAmount) {
                lowestBidAmount = bids[_tenderId][i].amount;
                winner = bids[_tenderId][i].bidder;
            }
        }

        tender.isClosed = true;
        emit TenderClosed(_tenderId, winner, lowestBidAmount);
    }
}