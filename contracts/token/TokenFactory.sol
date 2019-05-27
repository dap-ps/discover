pragma solidity ^0.5.2;


contract TokenFactory {
    function createCloneToken(
        address _parentToken,
        uint _snapshotBlock,
        string calldata _tokenName,
        uint8 _decimalUnits,
        string calldata _tokenSymbol,
        bool _transfersEnabled
        ) external returns (address payable);
}
