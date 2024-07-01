import BoostCoreArtifact from '@boostxyz/evm/artifacts/contracts/BoostCore.sol/BoostCore.json';
import {
  getAccount,
  getTransaction,
  waitForTransactionReceipt,
} from '@wagmi/core';
import { createWriteContract } from '@wagmi/core/codegen';
import {
  type Address,
  type Hash,
  type Hex,
  decodeFunctionData,
  zeroAddress,
  zeroHash,
} from 'viem';
import {
  type BoostPayload as OnChainBoostPayload,
  type Target,
  boostCoreAbi,
  prepareBoostPayload,
  simulateBoostCoreCreateBoost,
} from '../../evm/artifacts';

import type { Action } from './Actions/Action';
import {
  ContractAction,
  type ContractActionPayload,
} from './Actions/ContractAction';
import {
  ERC721MintAction,
  type ERC721MintActionPayload,
} from './Actions/ERC721MintAction';
import type { AllowList } from './AllowLists/AllowList';
import {
  SimpleAllowList,
  type SimpleAllowListPayload,
} from './AllowLists/SimpleAllowList';
import {
  SimpleDenyList,
  type SimpleDenyListPayload,
} from './AllowLists/SimpleDenyList';
import { Boost } from './Boost';
import type { Budget } from './Budgets/Budget';
import { SimpleBudget, type SimpleBudgetPayload } from './Budgets/SimpleBudget';
import {
  VestingBudget,
  type VestingBudgetPayload,
} from './Budgets/VestingBudget';
import {
  Deployable,
  type DeployableOptions,
  type DeployablePayloadOrAddress,
  type GenericDeployableParams,
} from './Deployable/Deployable';
import {
  AllowListIncentive,
  type AllowListIncentivePayload,
} from './Incentives/AllowListIncentive';
import {
  CGDAIncentive,
  type CGDAIncentivePayload,
} from './Incentives/CGDAIncentive';
import {
  ERC20Incentive,
  type ERC20IncentivePayload,
} from './Incentives/ERC20Incentive';
import {
  ERC1155Incentive,
  type ERC1155IncentivePayload,
} from './Incentives/ERC1155Incentive';
import type { Incentive } from './Incentives/Incentive';
import {
  PointsIncentive,
  type PointsIncentivePayload,
} from './Incentives/PointsIncentive';
import {
  SignerValidator,
  type SignerValidatorPayload,
} from './Validators/SignerValidator';
import type { Validator } from './Validators/Validator';
import { DeployableUnknownOwnerProvidedError } from './errors';

export const BOOST_CORE_ADDRESS: Address = import.meta.env
  .VITE_BOOST_CORE_ADDRESS;

export interface BoostCoreDeployedOptions extends DeployableOptions {
  address?: Address;
}

// biome-ignore lint/suspicious/noExplicitAny: type guard
function isBoostCoreDeployed(opts: any): opts is BoostCoreDeployedOptions {
  return opts.address;
}

export interface BoostCoreOptionsWithPayload extends DeployableOptions {
  registryAddress: Address;
  protocolFeeReceiver: Address;
}

// biome-ignore lint/suspicious/noExplicitAny: type guard
function isBoostCoreDeployable(opts: any): opts is BoostCoreOptionsWithPayload {
  return opts.registryAddress && opts.protocolFeeReceiver;
}

export type BoostClientConfig =
  | BoostCoreDeployedOptions
  | BoostCoreOptionsWithPayload;

export type CreateBoostPayload = {
  budget: Budget;
  action: Action;
  validator: Validator;
  allowList: AllowList;
  incentives: Array<Incentive>;
  protocolFee?: bigint;
  referralFee?: bigint;
  maxParticipants?: bigint;
  owner?: Address;
};

export class BoostCore extends Deployable<[Address, Address]> {
  constructor({ config, account, ...options }: BoostClientConfig) {
    if (isBoostCoreDeployed(options) && options.address) {
      super({ account, config }, options.address);
    } else if (isBoostCoreDeployable(options)) {
      super({ account, config }, [
        options.registryAddress,
        options.protocolFeeReceiver,
      ]);
    } else {
      super({ account, config }, BOOST_CORE_ADDRESS);
    }
  }

  // TODO make this transactional? if any deployment fails what do we do with the previously deployed deployables?
  public async createBoost(
    _boostPayload: CreateBoostPayload,
    _options: DeployableOptions = {
      config: this._config,
      account: this._account,
    },
  ) {
    const [payload, options] =
      this.validateDeploymentConfig<CreateBoostPayload>(
        _boostPayload,
        _options,
      );

    let {
      budget,
      action,
      validator,
      allowList,
      incentives,
      protocolFee = 0n,
      referralFee = 0n,
      maxParticipants = 0n,
      owner,
    } = payload;

    const boostFactory = createWriteContract({
      abi: boostCoreAbi,
      functionName: 'createBoost',
      address: this.address,
    });

    if (!owner) {
      owner =
        this._account?.address ||
        getAccount(options.config).address ||
        zeroAddress;
      if (owner === zeroAddress) {
        throw new DeployableUnknownOwnerProvidedError();
      }
    }

    let budgetPayload: OnChainBoostPayload['budget'] = zeroAddress,
      budgetHash: Hash | undefined = undefined;
    if (typeof budget === 'string') budgetPayload = budget;
    else {
      if (budget.address) budgetPayload = budget.address;
      else {
        budgetHash = await budget.deploy(undefined, options);
      }
    }

    let actionPayload: OnChainBoostPayload['action'] = {
        instance: zeroAddress,
        isBase: false,
        parameters: zeroHash,
      },
      actionHash: Hash | undefined = undefined;
    if (action.address)
      actionPayload = {
        isBase: action.isBase,
        instance: action.address,
        parameters: action.isBase
          ? action.buildParameters(undefined, options).args.at(0) || zeroHash
          : zeroHash,
      };
    else {
      actionHash = await action.deploy(undefined, options);
    }

    let validatorPayload: OnChainBoostPayload['validator'] = {
        instance: zeroAddress,
        isBase: false,
        parameters: zeroHash,
      },
      validatorHash: Hash | undefined = undefined;
    if (validator.address)
      validatorPayload = {
        isBase: validator.isBase,
        instance: validator.address,
        parameters: validator.isBase
          ? validator.buildParameters(undefined, options).args.at(0) || zeroHash
          : zeroHash,
      };
    else {
      validatorHash = await validator.deploy(undefined, options);
    }

    let allowListPayload: OnChainBoostPayload['allowList'] = {
        instance: zeroAddress,
        isBase: false,
        parameters: zeroHash,
      },
      allowListHash: Hash | undefined = undefined;
    if (allowList.address)
      allowListPayload = {
        isBase: allowList.isBase,
        instance: allowList.address,
        parameters: allowList.isBase
          ? allowList.buildParameters(undefined, options).args.at(0) || zeroHash
          : zeroHash,
      };
    else {
      allowListHash = await allowList.deploy(undefined, options);
    }

    let incentivesPayloads: Array<Target> = incentives.map(() => ({
        instance: zeroAddress,
        isBase: false,
        parameters: zeroHash,
      })),
      incentiveHashes = incentives.map<Hash | undefined>(() => undefined);
    for (let i = 0; i < incentives.length; i++) {
      // biome-ignore lint/style/noNonNullAssertion: this will never be undefined
      const incentive = incentives.at(i)!;
      if (incentive.address)
        incentivesPayloads[i] = {
          isBase: incentive.isBase,
          instance: incentive.address,
          parameters: incentive.isBase
            ? incentive.buildParameters(undefined, options).args.at(0) ||
              zeroHash
            : zeroHash,
        };
      else {
        incentiveHashes[i] = await incentive.deploy(undefined, options);
      }
    }

    const [
      budgetAddress,
      actionAddress,
      validatorAddress,
      allowListAddress,
      incentiveAddresses,
    ] = await Promise.all([
      budgetHash
        ? waitForTransactionReceipt(options.config, {
            hash: budgetHash,
          }).then((contract) => contract.contractAddress)
        : Promise.resolve(budgetPayload),
      actionHash
        ? waitForTransactionReceipt(options.config, {
            hash: actionHash,
          }).then((contract) => contract.contractAddress)
        : Promise.resolve(actionPayload.instance),
      validatorHash
        ? waitForTransactionReceipt(options.config, {
            hash: validatorHash,
          }).then((contract) => contract.contractAddress)
        : Promise.resolve(validatorPayload.instance),
      allowListHash
        ? waitForTransactionReceipt(options.config, {
            hash: allowListHash,
          }).then((contract) => contract.contractAddress)
        : Promise.resolve(allowListPayload.instance),
      Promise.all(
        incentiveHashes.map((hash, i) =>
          hash
            ? waitForTransactionReceipt(options.config, {
                hash: hash,
              }).then((contract) => contract.contractAddress)
            : // biome-ignore lint/style/noNonNullAssertion: these incentive arrays will always be of the same length
              Promise.resolve(incentivesPayloads.at(i)!.instance),
        ),
      ),
    ]);

    if (budgetAddress) budgetPayload = budgetAddress;
    if (actionAddress) actionPayload.instance = actionAddress;
    if (validatorAddress) validatorPayload.instance = validatorAddress;
    if (allowListAddress) allowListPayload.instance = allowListAddress;
    for (let i = 0; i < incentiveAddresses.length; i++) {
      // biome-ignore lint/style/noNonNullAssertion: these incentive arrays will always be of the same length
      incentivesPayloads.at(i)!.instance = incentiveAddresses.at(i)!;
    }

    const onChainPayload = {
      budget: budgetPayload,
      action: actionPayload,
      validator: validatorPayload,
      allowList: allowListPayload,
      incentives: incentivesPayloads,
      protocolFee,
      referralFee,
      maxParticipants,
      owner,
    };

    const boostHash = await boostFactory(options.config, {
      args: [prepareBoostPayload(onChainPayload)],
      ...this.optionallyAttachAccount(options.account),
    });
    await waitForTransactionReceipt(options.config, {
      hash: boostHash,
    });
    const tx = await getTransaction(options.config, {
      hash: boostHash,
    });
    const { args } = decodeFunctionData({
      abi: boostCoreAbi,
      data: tx.input,
    });
    const { result } = await simulateBoostCoreCreateBoost(options.config, {
      address: this.address!,
      args: args as [Hex],
      ...this.optionallyAttachAccount(),
    });

    // TODO we need to figure out how to ensure the boost has the correct component instances, ie SimpleAllowList vs SimpleDenyList
    return new Boost({
      budget: budget.at(result.budget),
      action: action.at(result.action),
      validator: validator.at(result.validator),
      allowList: allowList.at(result.allowList),
      incentives: incentives.map((incentive, i) =>
        incentive.at(result.incentives.at(i)!),
      ),
      protocolFee: result.protocolFee,
      referralFee: result.referralFee,
      maxParticipants: result.maxParticipants,
      owner: result.owner,
    });
  }

  ContractAction(
    options: DeployablePayloadOrAddress<ContractActionPayload>,
    isBase = false,
  ) {
    return new ContractAction(
      { config: this._config, account: this._account },
      options,
      isBase,
    );
  }
  ERC721MintAction(
    options: DeployablePayloadOrAddress<ERC721MintActionPayload>,
    isBase = false,
  ) {
    return new ERC721MintAction(
      { config: this._config, account: this._account },
      options,
      isBase,
    );
  }
  SimpleAllowList(
    options: DeployablePayloadOrAddress<SimpleAllowListPayload>,
    isBase = false,
  ) {
    return new SimpleAllowList(
      { config: this._config, account: this._account },
      options,
      isBase,
    );
  }
  SimpleDenyList(
    options: DeployablePayloadOrAddress<SimpleDenyListPayload>,
    isBase = false,
  ) {
    return new SimpleDenyList(
      { config: this._config, account: this._account },
      options,
      isBase,
    );
  }
  SimpleBudget(options: DeployablePayloadOrAddress<SimpleBudgetPayload>) {
    return new SimpleBudget(
      { config: this._config, account: this._account },
      options,
    );
  }
  VestingBudget(options: DeployablePayloadOrAddress<VestingBudgetPayload>) {
    return new VestingBudget(
      { config: this._config, account: this._account },
      options,
    );
  }
  AllowListIncentive(
    options: DeployablePayloadOrAddress<AllowListIncentivePayload>,
    isBase = false,
  ) {
    return new AllowListIncentive(
      { config: this._config, account: this._account },
      options,
      isBase,
    );
  }
  CGDAIncentive(
    options: DeployablePayloadOrAddress<CGDAIncentivePayload>,
    isBase = false,
  ) {
    return new CGDAIncentive(
      { config: this._config, account: this._account },
      options,
      isBase,
    );
  }
  ERC20Incentive(
    options: DeployablePayloadOrAddress<ERC20IncentivePayload>,
    isBase = false,
  ) {
    return new ERC20Incentive(
      { config: this._config, account: this._account },
      options,
      isBase,
    );
  }
  ERC1155Incentive(
    options: DeployablePayloadOrAddress<ERC1155IncentivePayload>,
    isBase = false,
  ) {
    return new ERC1155Incentive(
      { config: this._config, account: this._account },
      options,
      isBase,
    );
  }
  PointsIncentive(
    options: DeployablePayloadOrAddress<PointsIncentivePayload>,
    isBase = false,
  ) {
    return new PointsIncentive(
      { config: this._config, account: this._account },
      options,
      isBase,
    );
  }
  SignerValidator(
    options: DeployablePayloadOrAddress<SignerValidatorPayload>,
    isBase = false,
  ) {
    return new SignerValidator(
      { config: this._config, account: this._account },
      options,
      isBase,
    );
  }

  protected override buildParameters(
    _payload?: [Address, Address],
    _options?: DeployableOptions,
  ): GenericDeployableParams {
    const [payload, options] = this.validateDeploymentConfig(
      _payload,
      _options,
    );
    return {
      abi: BoostCoreArtifact.abi,
      bytecode: BoostCoreArtifact.bytecode as Hex,
      args: payload,
      ...this.optionallyAttachAccount(options.account),
    };
  }
}
