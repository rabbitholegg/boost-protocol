// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

import {Ownable} from "lib/solady/src/auth/Ownable.sol";
import {ReentrancyGuard} from "lib/solady/src/utils/ReentrancyGuard.sol";

import {Cloneable} from "src/shared/Cloneable.sol";

/// @title Boost Incentive
/// @notice Abstract contract for a generic Incentive within the Boost protocol
/// @dev Incentive classes are expected to decode the calldata for implementation-specific handling. If no data is required, calldata should be empty.
abstract contract Incentive is Ownable, Cloneable, ReentrancyGuard {
    /// @notice Emitted when an incentive is claimed
    /// @dev The `data` field contains implementation-specific context. See the implementation's `claim` function for details.
    event Claimed(address indexed recipient, bytes data);

    /// @notice Thrown when a claim fails
    error ClaimFailed();

    /// @notice Thrown when the incentive is not claimable
    error NotClaimable();

    /// @notice A struct representing the payload for an incentive claim
    /// @param target The address of the recipient
    /// @param data The implementation-specific data for the claim, if needed
    struct ClaimPayload {
        address target;
        bytes data;
    }

    /// @notice The number of claims that have been made
    uint256 public claims;

    /// @notice A mapping of address to claim status
    mapping(address => bool) public claimed;

    /// @notice Initialize the contract and set the owner
    /// @dev The owner is set to the contract deployer
    constructor() {
        _initializeOwner(msg.sender);
    }

    /// @notice Claim the incentive
    /// @param data_ The data payload for the incentive claim
    /// @return True if the incentive was successfully claimed
    function claim(bytes calldata data_) external virtual returns (bool);

    /// @notice Reclaim assets from the incentive
    /// @param data_ The data payload for the reclaim
    /// @return True if the assets were successfully reclaimed
    function reclaim(bytes calldata data_) external virtual returns (bool);

    /// @notice Check if an incentive is claimable
    /// @param data_ The data payload for the claim check (data, signature, etc.)
    /// @return True if the incentive is claimable based on the data payload
    function isClaimable(bytes calldata data_) external view virtual returns (bool);

    /// @notice Get the required allowance for the incentive
    /// @param data_ The initialization payload for the incentive
    /// @return The data payload to be passed to the {Budget} for interpretation
    /// @dev This function is to be called by {BoostCore} before the incentive is initialized to determine the required budget allowance. It returns a compressed, ABI-encoded payload that can be passed directly to the {Budget} contract for interpretation.
    function preflight(bytes calldata data_) external view virtual returns (bytes memory);

    /// @inheritdoc Cloneable
    function supportsInterface(bytes4 interfaceId) public view virtual override(Cloneable) returns (bool) {
        return interfaceId == type(Incentive).interfaceId || super.supportsInterface(interfaceId);
    }
}
