// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@solady/tokens/ERC20.sol";
import {Initializable} from "@solady/utils/Initializable.sol";
import {OwnableRoles} from "@solady/auth/OwnableRoles.sol";

/// @title Points
/// @notice A soulbound token that can be used to track points on-chain. Points are permanently assigned to an address and cannot be transferred.
contract Points is ERC20, Initializable, OwnableRoles {
    string private _name;
    string private _symbol;

    /// @notice The role for issuing points
    uint256 public constant ISSUER_ROLE = 1 << 1;

    /// @notice Thrown when an attempt is made to transfer points
    error NonTransferable();

    /// @notice Initialize the Points contract
    /// @param name_ The name of the token
    /// @param symbol_ The symbol of the token
    /// @param minter_ The initial holder of the minter role
    function initialize(string memory name_, string memory symbol_, address minter_) external initializer {
        _initializeOwner(msg.sender);

        _name = name_;
        _symbol = symbol_;

        _grantRoles(minter_, ISSUER_ROLE);
    }

    /// @notice Issue `amount` points and assign them to `to`
    /// @param to The address to assign the points to
    /// @param amount The amount of points to issue
    function issue(address to, uint256 amount) external onlyOwnerOrRoles(ISSUER_ROLE) {
        _mint(to, amount);
    }

    /// @inheritdoc ERC20
    /// @return The name of the token
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /// @inheritdoc ERC20
    /// @return The symbol of the token
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /// @inheritdoc ERC20
    /// @notice A hook that is called before any transfer of points
    /// @dev Reverts if the transfer is not a mint or burn (i.e. if neither `from` nor `to` are the zero address)
    function _beforeTokenTransfer(address from, address to, uint256) internal virtual override {
        if (from != address(0) && to != address(0)) revert NonTransferable();
    }
}
