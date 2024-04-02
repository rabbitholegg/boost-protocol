// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

import {Test, console} from "lib/forge-std/src/Test.sol";

import {ERC721} from "lib/solady/src/tokens/ERC721.sol";
import {LibClone} from "lib/solady/src/utils/LibClone.sol";

import {Action} from "src/actions/Action.sol";
import {ERC721MintAction} from "src/actions/ERC721MintAction.sol";
import {Validator} from "src/validators/Validator.sol";

import {MockERC721} from "src/shared/Mocks.sol";

contract ERC721MintActionTest is Test {
    MockERC721 public mockAsset = new MockERC721();
    ERC721MintAction public baseAction = new ERC721MintAction();
    ERC721MintAction public action;

    function setUp() public {
        action = _newActionClone();
    }

    /////////////////////////////////
    // ERC721MintAction.initialize //
    /////////////////////////////////

    function testInitialize() public {
        // Initialize the ERC721MintAction
        _initialize(address(mockAsset), MockERC721.mint.selector, mockAsset.mintPrice());

        // Ensure the action was initialized correctly
        assertEq(action.target(), address(mockAsset));
        assertEq(action.selector(), bytes4(keccak256("mint(address)")));
        assertEq(action.value(), 0.1 ether);
    }

    //////////////////////////////
    // ERC721MintAction.execute //
    //////////////////////////////

    function testExecute() public {
        // Initialize the ERC721MintAction
        _initialize(address(mockAsset), MockERC721.mint.selector, mockAsset.mintPrice());

        // Execute is not implemented => revert
        vm.expectRevert(Action.ExecuteNotImplemented.selector);
        action.execute("");
    }

    //////////////////////////////
    // ERC721MintAction.prepare //
    //////////////////////////////

    function testPrepare() public {
        // Initialize the ERC721MintAction
        _initialize(address(mockAsset), MockERC721.mint.selector, mockAsset.mintPrice());

        // Prepare the action
        bytes memory payload = action.prepare(abi.encode(address(1)));
        assertEq(payload, abi.encodeWithSelector(MockERC721.mint.selector, address(1)));
    }

    function testPrepare_SendPayload() public {
        // Initialize the ERC721MintAction
        _initialize(address(mockAsset), MockERC721.mint.selector, mockAsset.mintPrice());

        // Prepare the action
        bytes memory payload = action.prepare(abi.encode(address(0xdeadbeef)));
        (bool success, bytes memory returnData) = address(mockAsset).call{value: mockAsset.mintPrice()}(payload);
        assertTrue(success);
        assertEq(returnData.length, 0);
        assertEq(mockAsset.totalSupply(), 1);
        assertEq(mockAsset.ownerOf(1), address(0xdeadbeef));
    }

    ///////////////////////////////
    // ERC721MintAction.validate //
    ///////////////////////////////

    function testValidate() public {
        // Initialize the ERC721MintAction
        _initialize(address(mockAsset), MockERC721.mint.selector, mockAsset.mintPrice());

        // Mint a token
        mockAsset.mint{value: mockAsset.mintPrice()}(address(this));
        assertTrue(mockAsset.ownerOf(1) == address(this));

        // Validate the action
        assertTrue(action.validate(abi.encode(address(this), abi.encode(1))));
    }

    function testValidate_WrongHolder() public {
        // Initialize the ERC721MintAction
        _initialize(address(mockAsset), MockERC721.mint.selector, mockAsset.mintPrice());

        // Mint a token
        mockAsset.mint{value: mockAsset.mintPrice()}(address(this));
        assertTrue(mockAsset.ownerOf(1) == address(this));

        // Validate the action with an invalid holder
        assertFalse(action.validate(abi.encode(address(0xdeadbeef), abi.encode(1))));
    }

    function testValidate_AlreadyValidated() public {
        // Initialize the ERC721MintAction
        _initialize(address(mockAsset), MockERC721.mint.selector, mockAsset.mintPrice());

        // Mint a token
        mockAsset.mint{value: mockAsset.mintPrice()}(address(this));
        assertTrue(mockAsset.ownerOf(1) == address(this));

        // Validate the action
        assertTrue(action.validate(abi.encode(address(this), abi.encode(1))));

        // Validate the action again => false
        assertFalse(action.validate(abi.encode(address(this), abi.encode(1))));
    }

    function testValidate_NonExistentToken() public {
        // Initialize the ERC721MintAction
        _initialize(address(mockAsset), MockERC721.mint.selector, mockAsset.mintPrice());

        // Validate the action with a non-existent token
        vm.expectRevert(ERC721.TokenDoesNotExist.selector);
        action.validate(abi.encode(address(this), abi.encode(1)));
    }

    ////////////////////////////////
    // ERC721MintAction.validated //
    ////////////////////////////////

    function testValidated() public {
        // Initialize the ERC721MintAction
        _initialize(address(mockAsset), MockERC721.mint.selector, mockAsset.mintPrice());

        // Mint a token
        mockAsset.mint{value: mockAsset.mintPrice()}(address(this));
        assertTrue(mockAsset.ownerOf(1) == address(this));

        // Validate the action
        assertTrue(action.validate(abi.encode(address(this), abi.encode(1))));

        // Check the validation status of the token
        assertTrue(action.validated(1));
    }

    function testValidated_NotValidated() public {
        // Initialize the ERC721MintAction
        _initialize(address(mockAsset), MockERC721.mint.selector, mockAsset.mintPrice());

        // Check the validation status of a non-existent token
        assertFalse(action.validated(1));
    }

    ////////////////////////////////////////
    // ERC721MintAction.supportsInterface //
    ////////////////////////////////////////

    function testSupportsInterface() public {
        // Initialize the ERC721MintAction
        _initialize(address(mockAsset), MockERC721.mint.selector, mockAsset.mintPrice());

        // Check the interface support
        assertTrue(action.supportsInterface(type(Action).interfaceId));
        assertTrue(action.supportsInterface(type(Validator).interfaceId));
    }

    function testSupportsInterface_NotSupported() public {
        // Initialize the ERC721MintAction
        _initialize(address(mockAsset), MockERC721.mint.selector, mockAsset.mintPrice());

        // Check the interface support
        assertFalse(action.supportsInterface(type(ERC721).interfaceId));
    }

    ///////////////////////////
    // Test Helper Functions //
    ///////////////////////////

    function _newActionClone() internal returns (ERC721MintAction) {
        return ERC721MintAction(LibClone.clone(address(baseAction)));
    }

    function _initialize(address target_, bytes4 selector_, uint256 value_) internal {
        action.initialize(abi.encode(block.chainid, target_, selector_, value_));
    }
}
