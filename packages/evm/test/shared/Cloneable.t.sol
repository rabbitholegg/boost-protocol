// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

import {Test, console} from "lib/forge-std/src/Test.sol";
import {Cloneable} from "contracts/shared/Cloneable.sol";

contract CloneableImpl is Cloneable {
    function interfaceName() public pure override(Cloneable) returns (string memory) {
        return "CloneableImpl2";
    }
}

contract CloneableImpl2 is Cloneable {
    uint256 private something;

    function initialize(bytes calldata data_) public override initializer {
        (something) = abi.decode(data_, (uint256));
    }

    function getSomething() external view returns (uint256) {
        return something;
    }

    function interfaceName() public pure override(Cloneable) returns (string memory) {
        return "CloneableImpl2";
    }
}

contract CloneableTest is Test {
    CloneableImpl cloneable;
    CloneableImpl2 cloneable2;

    function setUp() public {
        cloneable = new CloneableImpl();
        cloneable2 = new CloneableImpl2();
    }

    /////////////////////////////////
    // Cloneable.supportsInterface //
    /////////////////////////////////

    function testSupportsInterface() public {
        assertTrue(cloneable.supportsInterface(type(Cloneable).interfaceId));
    }

    function testSupportsInterface_NotSupported() public {
        assertFalse(cloneable.supportsInterface(type(Test).interfaceId));
    }

    //////////////////////////
    // Cloneable.initialize //
    //////////////////////////

    function testInitialize() public {
        cloneable2.initialize(abi.encode(type(uint256).max));
        assertEq(cloneable2.getSomething(), type(uint256).max);
    }

    function testInitialize_NotImplemented() public {
        vm.expectRevert(Cloneable.InitializerNotImplemented.selector);
        cloneable.initialize(unicode"🦄 unicorns (and 🌈 rainbows!) are *so cool*");
    }
}
