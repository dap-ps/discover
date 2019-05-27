pragma solidity ^0.5.2;


contract ApproveAndCallFallBack {
    function receiveApproval(
        address from, 
        uint256 _amount, 
        address _token, 
        bytes calldata _data) external;
}
