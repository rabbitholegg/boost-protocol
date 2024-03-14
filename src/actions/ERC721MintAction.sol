// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

import {LibZip} from "lib/solady/src/utils/LibZip.sol";
import {ERC721} from "lib/solady/src/tokens/ERC721.sol";

import {Action} from "src/actions/Action.sol";
import {Cloneable} from "src/shared/Cloneable.sol";
import {ContractAction} from "src/actions/ContractAction.sol";
import {Validator} from "src/validators/Validator.sol";

/// @title ERC721 Mint Action
/// @notice A primitive action to mint and/or validate that an ERC721 token has been minted
/// @dev The action is expected to be prepared with the data payload for the minting of the token
/// @dev This a minimal generic implementation that should be extended if additional functionality or customizations are required
/// @dev It is expected that the target contract has an externally accessible mint function whose selector
contract ERC721MintAction is ContractAction, Validator {
    using LibZip for bytes;

    /// @notice The set of validated tokens
    /// @dev This is intended to prevent multiple validations against the same token ID
    mapping(uint256 => bool) public validated;

    /// @notice Construct the ERC721 Mint Action
    /// @dev Because this contract is a base implementation, it should not be initialized through the constructor. Instead, it should be cloned and initialized using the {initialize} function.
    constructor() {
        _disableInitializers();
    }

    /// @inheritdoc Cloneable
    /// @notice Initialize the contract with the owner and the required mint data
    /// @param data_ The data payload for the mint action `(address target, bytes4 selector, uint256 value)`
    function initialize(bytes calldata data_) public virtual override(Cloneable, ContractAction) initializer {
        _initialize(abi.decode(data_.cdDecompress(), (InitPayload)));
    }

    /// @notice Execute the action (not yet implemented)
    /// @param - The data payload for the call (not used in this implementation)
    /// @return success The success status of the call
    /// @return returnData The return data from the call
    function execute(bytes calldata /* data_ */ )
        external
        payable
        override
        returns (bool success, bytes memory returnData)
    {
        revert ExecuteNotImplemented();
    }

    /// @notice Prepare the action for execution and return the expected payload
    /// @param data_ The ABI-encoded payload for the target contract call
    /// @return The encoded payload to be sent to the target contract
    /// @dev Note that the mint value is NOT included in the prepared payload but must be sent with the call
    function prepare(bytes calldata data_) public view override returns (bytes memory) {
        return super.prepare(data_);
    }

    /// @inheritdoc Validator
    /// @notice Validate that the action has been completed successfully
    /// @param data_ The data payload for the action `(address holder, (uint256 tokenId))`
    /// @return success True if the action has been validated for the user
    /// @dev The first 20 bytes of the payload must be the holder address and the remaining bytes must be an encoded token ID (uint256)
    /// @dev Example: `abi.encode(address(holder), abi.encode(uint256(tokenId)))`
    function validate(bytes calldata data_) external virtual override returns (bool success) {
        (address holder, bytes memory payload) = abi.decode(data_.cdDecompress(), (address, bytes));
        uint256 tokenId = uint256(bytes32(payload));

        if (ERC721(target).ownerOf(tokenId) == holder && !validated[tokenId]) {
            validated[tokenId] = true;
            return true;
        } else {
            return false;
        }
    }

    /// @inheritdoc Cloneable
    function supportsInterface(bytes4 interfaceId) public view virtual override(Action, Validator) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _initialize(InitPayload memory init_) internal override onlyInitializing {
        super._initialize(init_);
        _initializeOwner(msg.sender);
    }
}
