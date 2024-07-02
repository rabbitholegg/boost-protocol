// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface ContractAction$Type {
  "_format": "hh-sol-artifact-1",
  "contractName": "ContractAction",
  "sourceName": "contracts/actions/ContractAction.sol",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "CloneAlreadyInitialized",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ExecuteNotImplemented",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InitializerNotImplemented",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidInitialization",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidInitializationData",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotInitializing",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "targetChainId",
          "type": "uint256"
        }
      ],
      "name": "TargetChainUnsupported",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "executor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "caller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "ActionExecuted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isValidated",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "ActionValidated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "version",
          "type": "uint64"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "VALIDATOR",
      "outputs": [
        {
          "internalType": "contract Validator",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "chainId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "data_",
          "type": "bytes"
        }
      ],
      "name": "execute",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "data_",
          "type": "bytes"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "interfaceName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "data_",
          "type": "bytes"
        }
      ],
      "name": "prepare",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "bytes_",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "selector",
      "outputs": [
        {
          "internalType": "bytes4",
          "name": "",
          "type": "bytes4"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "target",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "value",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x60a0604052348015600e575f80fd5b50601b601f60201b60201c565b60b0565b5f602c608760201b60201c565b90508054600181161560455763f92ee8a95f526004601cfd5b8160c01c808260011c146082578060011b8355806020527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2602080a15b505050565b5f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffbf6011325f1b905090565b608051610cca6100c85f395f6103dc0152610cca5ff3fe608060405260043610610090575f3560e01c80636e441e4c116100585780636e441e4c1461017d5780639a8a0592146101a7578063d4b83992146101d1578063d7768c47146101fb578063ea3d508a1461023757610090565b806301ffc9a71461009457806309c5eabe146100d0578063393df8cb146101015780633fa4f2451461012b578063439fab9114610155575b5f80fd5b34801561009f575f80fd5b506100ba60048036038101906100b59190610775565b610261565b6040516100c791906107ba565b60405180910390f35b6100ea60048036038101906100e59190610834565b6102da565b6040516100f89291906108ef565b60405180910390f35b34801561010c575f80fd5b506101156103da565b6040516101229190610997565b60405180910390f35b348015610136575f80fd5b5061013f6103fe565b60405161014c91906109c8565b60405180910390f35b348015610160575f80fd5b5061017b60048036038101906101769190610834565b610404565b005b348015610188575f80fd5b50610191610491565b60405161019e9190610a33565b60405180910390f35b3480156101b2575f80fd5b506101bb6104ce565b6040516101c891906109c8565b60405180910390f35b3480156101dc575f80fd5b506101e56104d3565b6040516101f29190610a73565b60405180910390f35b348015610206575f80fd5b50610221600480360381019061021c9190610834565b6104f8565b60405161022e9190610a8c565b60405180910390f35b348015610242575f80fd5b5061024b61051c565b6040516102589190610abb565b60405180910390f35b5f7fe6715795000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806102d357506102d28261052f565b5b9050919050565b5f6060465f5414610323575f546040517f180098f400000000000000000000000000000000000000000000000000000000815260040161031a91906109c8565b60405180910390fd5b5f8060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660025461037a600160149054906101000a900460e01b89896105a8565b6040516103879190610b0e565b5f6040518083038185875af1925050503d805f81146103c1576040519150601f19603f3d011682016040523d82523d5f602084013e6103c6565b606091505b509150915081819350935050509250929050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60025481565b5f61040d6105d4565b9050805460038255801561043f5760018160011c14303b106104365763f92ee8a95f526004601cfd5b818160ff1b1b91505b5061045783838101906104529190610c69565b6105fd565b801561048c576002815560016020527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2602080a15b505050565b60606040518060400160405280600e81526020017f436f6e7472616374416374696f6e000000000000000000000000000000000000815250905090565b5f5481565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6060610514600160149054906101000a900460e01b84846105a8565b905092915050565b600160149054906101000a900460e01b81565b5f7f2c247c7a000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806105a157506105a082610682565b5b9050919050565b606081600401604051915080825260208101820160405284602083015282846024840137509392505050565b5f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffbf6011325f1b905090565b6106056106eb565b805f01515f81905550806020015160015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060400151600160146101000a81548163ffffffff021916908360e01c0217905550806060015160028190555050565b5f7f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b5f6106f46105d4565b9050805460011661070c5763d7e6bcf85f526004601cfd5b50565b5f604051905090565b5f80fd5b5f80fd5b5f7fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61075481610720565b811461075e575f80fd5b50565b5f8135905061076f8161074b565b92915050565b5f6020828403121561078a57610789610718565b5b5f61079784828501610761565b91505092915050565b5f8115159050919050565b6107b4816107a0565b82525050565b5f6020820190506107cd5f8301846107ab565b92915050565b5f80fd5b5f80fd5b5f80fd5b5f8083601f8401126107f4576107f36107d3565b5b8235905067ffffffffffffffff811115610811576108106107d7565b5b60208301915083600182028301111561082d5761082c6107db565b5b9250929050565b5f806020838503121561084a57610849610718565b5b5f83013567ffffffffffffffff8111156108675761086661071c565b5b610873858286016107df565b92509250509250929050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f6108c18261087f565b6108cb8185610889565b93506108db818560208601610899565b6108e4816108a7565b840191505092915050565b5f6040820190506109025f8301856107ab565b818103602083015261091481846108b7565b90509392505050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f819050919050565b5f61095f61095a6109558461091d565b61093c565b61091d565b9050919050565b5f61097082610945565b9050919050565b5f61098182610966565b9050919050565b61099181610977565b82525050565b5f6020820190506109aa5f830184610988565b92915050565b5f819050919050565b6109c2816109b0565b82525050565b5f6020820190506109db5f8301846109b9565b92915050565b5f81519050919050565b5f82825260208201905092915050565b5f610a05826109e1565b610a0f81856109eb565b9350610a1f818560208601610899565b610a28816108a7565b840191505092915050565b5f6020820190508181035f830152610a4b81846109fb565b905092915050565b5f610a5d8261091d565b9050919050565b610a6d81610a53565b82525050565b5f602082019050610a865f830184610a64565b92915050565b5f6020820190508181035f830152610aa481846108b7565b905092915050565b610ab581610720565b82525050565b5f602082019050610ace5f830184610aac565b92915050565b5f81905092915050565b5f610ae88261087f565b610af28185610ad4565b9350610b02818560208601610899565b80840191505092915050565b5f610b198284610ade565b915081905092915050565b5f80fd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b610b5e826108a7565b810181811067ffffffffffffffff82111715610b7d57610b7c610b28565b5b80604052505050565b5f610b8f61070f565b9050610b9b8282610b55565b919050565b610ba9816109b0565b8114610bb3575f80fd5b50565b5f81359050610bc481610ba0565b92915050565b610bd381610a53565b8114610bdd575f80fd5b50565b5f81359050610bee81610bca565b92915050565b5f60808284031215610c0957610c08610b24565b5b610c136080610b86565b90505f610c2284828501610bb6565b5f830152506020610c3584828501610be0565b6020830152506040610c4984828501610761565b6040830152506060610c5d84828501610bb6565b60608301525092915050565b5f60808284031215610c7e57610c7d610718565b5b5f610c8b84828501610bf4565b9150509291505056fea2646970667358221220b3012813d25608e81d980a0c3a9d236e44adc43ec8bf6c415d9d609fd92cd52164736f6c63430008190033",
  "deployedBytecode": "0x608060405260043610610090575f3560e01c80636e441e4c116100585780636e441e4c1461017d5780639a8a0592146101a7578063d4b83992146101d1578063d7768c47146101fb578063ea3d508a1461023757610090565b806301ffc9a71461009457806309c5eabe146100d0578063393df8cb146101015780633fa4f2451461012b578063439fab9114610155575b5f80fd5b34801561009f575f80fd5b506100ba60048036038101906100b59190610775565b610261565b6040516100c791906107ba565b60405180910390f35b6100ea60048036038101906100e59190610834565b6102da565b6040516100f89291906108ef565b60405180910390f35b34801561010c575f80fd5b506101156103da565b6040516101229190610997565b60405180910390f35b348015610136575f80fd5b5061013f6103fe565b60405161014c91906109c8565b60405180910390f35b348015610160575f80fd5b5061017b60048036038101906101769190610834565b610404565b005b348015610188575f80fd5b50610191610491565b60405161019e9190610a33565b60405180910390f35b3480156101b2575f80fd5b506101bb6104ce565b6040516101c891906109c8565b60405180910390f35b3480156101dc575f80fd5b506101e56104d3565b6040516101f29190610a73565b60405180910390f35b348015610206575f80fd5b50610221600480360381019061021c9190610834565b6104f8565b60405161022e9190610a8c565b60405180910390f35b348015610242575f80fd5b5061024b61051c565b6040516102589190610abb565b60405180910390f35b5f7fe6715795000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806102d357506102d28261052f565b5b9050919050565b5f6060465f5414610323575f546040517f180098f400000000000000000000000000000000000000000000000000000000815260040161031a91906109c8565b60405180910390fd5b5f8060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660025461037a600160149054906101000a900460e01b89896105a8565b6040516103879190610b0e565b5f6040518083038185875af1925050503d805f81146103c1576040519150601f19603f3d011682016040523d82523d5f602084013e6103c6565b606091505b509150915081819350935050509250929050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60025481565b5f61040d6105d4565b9050805460038255801561043f5760018160011c14303b106104365763f92ee8a95f526004601cfd5b818160ff1b1b91505b5061045783838101906104529190610c69565b6105fd565b801561048c576002815560016020527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2602080a15b505050565b60606040518060400160405280600e81526020017f436f6e7472616374416374696f6e000000000000000000000000000000000000815250905090565b5f5481565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6060610514600160149054906101000a900460e01b84846105a8565b905092915050565b600160149054906101000a900460e01b81565b5f7f2c247c7a000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806105a157506105a082610682565b5b9050919050565b606081600401604051915080825260208101820160405284602083015282846024840137509392505050565b5f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffbf6011325f1b905090565b6106056106eb565b805f01515f81905550806020015160015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060400151600160146101000a81548163ffffffff021916908360e01c0217905550806060015160028190555050565b5f7f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b5f6106f46105d4565b9050805460011661070c5763d7e6bcf85f526004601cfd5b50565b5f604051905090565b5f80fd5b5f80fd5b5f7fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61075481610720565b811461075e575f80fd5b50565b5f8135905061076f8161074b565b92915050565b5f6020828403121561078a57610789610718565b5b5f61079784828501610761565b91505092915050565b5f8115159050919050565b6107b4816107a0565b82525050565b5f6020820190506107cd5f8301846107ab565b92915050565b5f80fd5b5f80fd5b5f80fd5b5f8083601f8401126107f4576107f36107d3565b5b8235905067ffffffffffffffff811115610811576108106107d7565b5b60208301915083600182028301111561082d5761082c6107db565b5b9250929050565b5f806020838503121561084a57610849610718565b5b5f83013567ffffffffffffffff8111156108675761086661071c565b5b610873858286016107df565b92509250509250929050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f6108c18261087f565b6108cb8185610889565b93506108db818560208601610899565b6108e4816108a7565b840191505092915050565b5f6040820190506109025f8301856107ab565b818103602083015261091481846108b7565b90509392505050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f819050919050565b5f61095f61095a6109558461091d565b61093c565b61091d565b9050919050565b5f61097082610945565b9050919050565b5f61098182610966565b9050919050565b61099181610977565b82525050565b5f6020820190506109aa5f830184610988565b92915050565b5f819050919050565b6109c2816109b0565b82525050565b5f6020820190506109db5f8301846109b9565b92915050565b5f81519050919050565b5f82825260208201905092915050565b5f610a05826109e1565b610a0f81856109eb565b9350610a1f818560208601610899565b610a28816108a7565b840191505092915050565b5f6020820190508181035f830152610a4b81846109fb565b905092915050565b5f610a5d8261091d565b9050919050565b610a6d81610a53565b82525050565b5f602082019050610a865f830184610a64565b92915050565b5f6020820190508181035f830152610aa481846108b7565b905092915050565b610ab581610720565b82525050565b5f602082019050610ace5f830184610aac565b92915050565b5f81905092915050565b5f610ae88261087f565b610af28185610ad4565b9350610b02818560208601610899565b80840191505092915050565b5f610b198284610ade565b915081905092915050565b5f80fd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b610b5e826108a7565b810181811067ffffffffffffffff82111715610b7d57610b7c610b28565b5b80604052505050565b5f610b8f61070f565b9050610b9b8282610b55565b919050565b610ba9816109b0565b8114610bb3575f80fd5b50565b5f81359050610bc481610ba0565b92915050565b610bd381610a53565b8114610bdd575f80fd5b50565b5f81359050610bee81610bca565b92915050565b5f60808284031215610c0957610c08610b24565b5b610c136080610b86565b90505f610c2284828501610bb6565b5f830152506020610c3584828501610be0565b6020830152506040610c4984828501610761565b6040830152506060610c5d84828501610bb6565b60608301525092915050565b5f60808284031215610c7e57610c7d610718565b5b5f610c8b84828501610bf4565b9150509291505056fea2646970667358221220b3012813d25608e81d980a0c3a9d236e44adc43ec8bf6c415d9d609fd92cd52164736f6c63430008190033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

declare module "@nomicfoundation/hardhat-viem/types" {
  export function deployContract(
    contractName: "ContractAction",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<ContractAction$Type["abi"]>>;
  export function deployContract(
    contractName: "contracts/actions/ContractAction.sol:ContractAction",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<ContractAction$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "ContractAction",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<ContractAction$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;
  export function sendDeploymentTransaction(
    contractName: "contracts/actions/ContractAction.sol:ContractAction",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<ContractAction$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "ContractAction",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<ContractAction$Type["abi"]>>;
  export function getContractAt(
    contractName: "contracts/actions/ContractAction.sol:ContractAction",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<ContractAction$Type["abi"]>>;
}
