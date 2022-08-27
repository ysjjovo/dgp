// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.14 <0.9.0;

abstract contract ERC721 {
    function totalSupply() virtual public view returns (uint256 total);
    function balanceOf(address _owner) virtual public view returns (uint256 balance);
    function ownerOf(uint256 _tokenId) virtual external view returns (address owner);
    function approve(address _to, uint256 _tokenId) virtual external;
    function transfer(address _to, uint256 _tokenId) virtual external;
    function transferFrom(address _from, address _to, uint256 _tokenId) virtual external;

    // Events
    event Transfer(address from, address to, uint256 tokenId);
    event Approval(address owner, address approved, uint256 tokenId);
    // ERC-165 Compatibility (https://github.com/ethereum/EIPs/issues/165)
    // function supportsInterface(bytes4 _interfaceID) virtual external view returns (bool);
    event OnSale(uint256 tokenId, uint price);
    event OffSale(uint256 tokenId);
    event Buyed(address buyer, address seller, uint256 tokenId, uint price);

    event Error(bytes32 e);
    error NotEnough(address buyer, uint price);
    
}

contract CryptoTreasure is ERC721{
    address public ceoAddress;
    address public cfoAddress;
    address public cooAddress;
    bool paused = false;
    uint256 public constant CREATION_LIMIT = 1_000_000_000;

    constructor() {
        paused = true;
        ceoAddress = msg.sender;
        cfoAddress = msg.sender;
        cooAddress = msg.sender;
    } 

    modifier onlyCEO() {
        require(msg.sender == ceoAddress, "only for CEO");
        _;
    }

    modifier onlyCFO() {
        require(msg.sender == cfoAddress, "only for CFO");
        _;
    }
    modifier onlyCOO() {
        require(msg.sender == cooAddress, "only for COO");
        _;
    }

    modifier onlyCLevel() {
        require(
            msg.sender == cooAddress ||
            msg.sender == ceoAddress ||
            msg.sender == cfoAddress, "only for CLevel"
        );
        _;
    }

    function setCEO(address _newCEO) external onlyCEO {
        require(_newCEO != address(0), "address can't be zero");
        ceoAddress = _newCEO;
    }

    function setCFO(address _newCFO) external onlyCEO {
        require(_newCFO != address(0), "address can't be zero");
        cfoAddress = _newCFO;
    }

    function setCOO(address _newCOO) external onlyCEO {
        require(_newCOO != address(0), "address can't be zero");
        cooAddress = _newCOO;
    }

    modifier whenNotPaused() {
        require(!paused, "should not be paused");
        _;
    }

    modifier whenPaused {
        require(paused, "should be paused");
        _;
    }

    function pause() external onlyCLevel whenNotPaused {
        paused = true;
    }

    ///  derived contracts.
    function unpause() public onlyCEO whenPaused {
        // can't unpause if contract was upgraded
        paused = false;
    }

    struct Treasure{
        uint256 nature;
        // uint96 price;
        uint createdAt;
    }

    Treasure[] treasures;
    mapping (uint256 => address) public treasureIndexToOwner;
    mapping (uint256 => address) public treasureIndexToApproved;
    mapping (uint256 => uint) treasureIndexToPrice;
    mapping (address => uint256) ownershipTokenCount;
    
    function _createTreasure(
        uint256 _nature,
        // uint256 _price,
        uint _createdAt,
        address _owner
        ) internal whenNotPaused {
        require(_createdAt < block.timestamp, "_createAt should be before current time");
        Treasure memory treasure = Treasure({
            nature: _nature,
            // price: _price,
            createdAt: _createdAt
        });
        treasures.push(treasure);
        uint256 newTreasureId = treasures.length - 1;
        require(newTreasureId == uint256(uint(newTreasureId)), "total supply should be uint");

        _transfer(address(0), _owner, newTreasureId);
        // return newTreasureId;
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        ownershipTokenCount[_to]++;
        treasureIndexToOwner[_tokenId] = _to;
        if (_from != address(0)) {
            ownershipTokenCount[_from]--;
        }
        delete treasureIndexToApproved[_tokenId];
        emit Transfer(_from, _to, _tokenId);
    }

    function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return treasureIndexToOwner[_tokenId] == _claimant;
    }

    function _approve(uint256 _tokenId, address _approved) internal {
        treasureIndexToApproved[_tokenId] = _approved;
    }

    function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return treasureIndexToApproved[_tokenId] == _claimant;
    }

    function createTreasure(
        uint256 _nature,
        uint _createdAt
        ) external onlyCOO {
        require(treasures.length < CREATION_LIMIT, "total supply should be less than CREATION LIMIT");
        _createTreasure(_nature, _createdAt, cooAddress);
    }

    function totalSupply() override public view returns (uint256 total) {
        return treasures.length;
    }

    function balanceOf(address _owner) override public view returns (uint256 balance){
        return ownershipTokenCount[_owner];
    }

    function ownerOf(uint256 _tokenId) override external view returns (address owner){
        owner = treasureIndexToOwner[_tokenId];
        require(owner != address(0), "owner should not be zero");
    }

    function approve(address _to, uint256 _tokenId) override external whenNotPaused{
        require(_owns(msg.sender, _tokenId), "sender should be owner");
        _approve(_tokenId, _to);
       emit Approval(msg.sender, _to, _tokenId);
    }

    function transfer(address _to, uint256 _tokenId) override external whenNotPaused{
        _transfer(msg.sender, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) override external whenNotPaused{
        require(_to != address(0), "_to should not be zero");
        require(_to != address(this), "_to should not be contract address");
        require(_approvedFor(msg.sender, _tokenId), "should be approved by sender");
        require(_owns(_from, _tokenId), "_from should be owner");
        _transfer(_from, _to, _tokenId);
    }
    
    function tokensOfOwner(address _owner) external onlyCOO view returns(uint256[] memory) {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            // Return an empty array
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 total = totalSupply();
            uint256 resultIndex = 0;

            uint256 treasureId;

            for (treasureId = 0; treasureId < total; treasureId++) {
                if (treasureIndexToOwner[treasureId] == _owner) {
                    result[resultIndex] = treasureId;
                    resultIndex++;
                }
            }
            return result;
        }
    }

    function onSale(uint256 _tokenId, uint _price) external whenNotPaused{
        require(treasureIndexToPrice[_tokenId] == 0, "_price should be 0");
        require(_owns(msg.sender, _tokenId), "sender should be owner");
        emit OnSale(_tokenId, _price);
        treasureIndexToPrice[_tokenId] = _price;
    }

    function offSale(uint256 _tokenId) external whenNotPaused{
        require(treasureIndexToPrice[_tokenId] != 0, "price should not be zero");
        require(_owns(msg.sender, _tokenId), "sender should be owner");
        emit OffSale(_tokenId);
        delete treasureIndexToPrice[_tokenId];
    }

    function buy(uint256 _tokenId) external payable whenNotPaused{
        require(!_owns(msg.sender, _tokenId), "sender should not be owner");
        uint256 price = treasureIndexToPrice[_tokenId];
        require(price != 0, "price should not be zero");
        if(msg.value == price){
            revert NotEnough(msg.sender, msg.value);
        }
        address owner = treasureIndexToOwner[_tokenId];
        emit Buyed(msg.sender, owner, _tokenId, price);
        address payable sellerAdress = payable(treasureIndexToOwner[_tokenId]);
        ownershipTokenCount[owner]--;
        ownershipTokenCount[msg.sender]++;
        treasureIndexToOwner[_tokenId] = msg.sender;
        delete treasureIndexToPrice[_tokenId];
        sellerAdress.transfer(msg.value);
        delete treasureIndexToApproved[_tokenId];
    }
}