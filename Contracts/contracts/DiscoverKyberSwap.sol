pragma solidity ^0.5.2;

import "./kyber/KyberNetworkProxy.sol";
import "./Discover.sol";
import "./token/ERC20Token.sol";

contract DiscoverKyberSwap is Controlled {
    address public SNT;
    address public ETH;
    KyberNetworkProxy public kyberProxy;
    Discover public discover;
    address public walletId;
    uint public maxSlippage;


    /**
     * @param _discover Discover contract address
     * @param _kyberProxy Kyber Network Proxy address
     * @param _ETH Kyber ETH address
     * @param _SNT Kyber SNT address
     * @param _walletId Wallet for Kyber network fees
     * @param _maxSlippage Max slippage rate
     */
    constructor(address _discover, address _kyberProxy, address _ETH, address _SNT, address _walletId, uint _maxSlippage) public {
        require(_maxSlippage < 100);

        discover = Discover(_discover);
        kyberProxy = KyberNetworkProxy(_kyberProxy);
        ETH = _ETH;
        SNT = _SNT;
        walletId = _walletId;
        maxSlippage = _maxSlippage;
    }

    /**
     * @notice Gets the conversion rate for the destToken given the srcQty.
     * @param srcToken source token contract address
     * @param srcQty amount of source tokens
     * @return exchange rate
     */
    function getConversionRates(address srcToken, uint srcQty) public view returns (uint expectedRate, uint slippageRate)
    {
      if(srcToken == address(0)){
          srcToken = ETH;
      }
        
        
      (expectedRate, slippageRate) = kyberProxy.getExpectedRate(srcToken, SNT, srcQty);
      require(expectedRate > 0);
    }
    
    /**
     * @notice Upvote in discover
     * @dev Requires a msg.value if using ETH
     * @param _id Id to upvote
     * @param _token Token to convert to SNT (see https://developer.kyber.network/docs/Environments-Intro/). Address 0 can be used for ETH too
     * @param _amount Amount of tokens/eth to convert
     */
    function upvote(bytes32 _id, address _token, uint _amount) public payable {
        uint sntAmount = _tradeTokens(_token, _amount);
        discover.upvote(_id, sntAmount);
    }

    /**
     * @notice Downvote in discover
     * @dev Requires a msg.value if using ETH
     * @param _id Id to upvote
     * @param _token Token to convert to SNT (see https://developer.kyber.network/docs/Environments-Intro/). Address 0 can be used for ETH too
     * @param _amount Amount of tokens/eth to convert
     */
    function downvote(bytes32 _id, address _token, uint _amount) public payable {
        uint sntAmount = _tradeTokens(_token, _amount);
        discover.downvote(_id, sntAmount);
    }
    
    /**
     * @dev Trades tokens/ETH to SNT using Kyber
     * @param _token Token to convert to SNT (see https://developer.kyber.network/docs/Environments-Intro/). Address 0 can be used for ETH too
     * @param _amount Amount of tokens/eth to convert
     * @return Amount of SNT received from the conversion
     */
    function _tradeTokens(address _token, uint _amount) internal returns(uint sntAmount) {
        uint minConversionRate;
        uint slippageRate;
        uint slippagePercent;
        
        ERC20Token sntToken = ERC20Token(SNT);

        if (_token == address(0) || _token == ETH) {
            require(msg.value == _amount, "Not enough ETH");
            (minConversionRate, slippageRate) = getConversionRates(ETH, _amount);
            slippagePercent = 100 - ((slippageRate * 100) / minConversionRate);
            require(slippagePercent <= maxSlippage);
            sntAmount = kyberProxy.trade.value(_amount)(ETH, _amount, SNT, address(this), 0 - uint256(1), minConversionRate, walletId);
        } else {
            ERC20Token t = ERC20Token(_token);
            
            // Initially transfer the tokens from the user to this contract
            require(t.transferFrom(msg.sender, address(this), _amount));

            if (_token != SNT) {
                // Mitigate ERC20 Approve front-running attack, by initially setting allowance to 0
                require(t.approve(address(kyberProxy), 0), "Could not reset token approval");
                // Set the spender's token allowance to tokenQty
                require(t.approve(address(kyberProxy), _amount), "Could not approve token amount");
                
                (minConversionRate, slippageRate) = getConversionRates(_token, _amount);
                slippagePercent = 100 - ((slippageRate * 100) / minConversionRate);
                require(slippagePercent <= maxSlippage);

                sntAmount = kyberProxy.trade(_token, _amount, SNT, address(this), 0 - uint256(1), minConversionRate, walletId);
            } else {
                sntAmount = _amount;
            }
        }

        require(sntAmount != 0, "Not enough SNT for vote");
        require(sntToken.approve(address(discover), 0), "Could not reset SNT approval");
        require(sntToken.approve(address(discover), sntAmount), "Could not approve SNT amount");
    }

    event WalletIdChanged(address sender, address prevWalletId, address newWalletId);

    /**
     * @dev Changes the walletId address (for the fee sharing program)
     * @param _walletId New walletId address
     */
    function setWalletId(address _walletId) external onlyController {
        emit WalletIdChanged(msg.sender, walletId, _walletId);
        walletId = _walletId;
    }
    
    event SlippageUpdated(uint maxSlippage);
    
    /**
     * @param _maxSlippage most slippage as a percentage
     */
    function setSlippage(uint _maxSlippage) public onlyController {
      require(_maxSlippage < 100);
      maxSlippage = _maxSlippage;
      emit SlippageUpdated(_maxSlippage);
    }

}

