// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface ERC1155Utils$Type {
  "_format": "hh-sol-artifact-1",
  "contractName": "ERC1155Utils",
  "sourceName": "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Utils.sol",
  "abi": [],
  "bytecode": "0x6055604b600b8282823980515f1a607314603f577f4e487b71000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b305f52607381538281f3fe730000000000000000000000000000000000000000301460806040525f80fdfea2646970667358221220924f25f62396ae568832d3d548ba14cb20d73e680d2e087017be43b3f1c3262a64736f6c63430008190033",
  "deployedBytecode": "0x730000000000000000000000000000000000000000301460806040525f80fdfea2646970667358221220924f25f62396ae568832d3d548ba14cb20d73e680d2e087017be43b3f1c3262a64736f6c63430008190033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

declare module "@nomicfoundation/hardhat-viem/types" {
  export function deployContract(
    contractName: "ERC1155Utils",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<ERC1155Utils$Type["abi"]>>;
  export function deployContract(
    contractName: "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Utils.sol:ERC1155Utils",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<ERC1155Utils$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "ERC1155Utils",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<ERC1155Utils$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;
  export function sendDeploymentTransaction(
    contractName: "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Utils.sol:ERC1155Utils",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<ERC1155Utils$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "ERC1155Utils",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<ERC1155Utils$Type["abi"]>>;
  export function getContractAt(
    contractName: "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Utils.sol:ERC1155Utils",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<ERC1155Utils$Type["abi"]>>;
}
