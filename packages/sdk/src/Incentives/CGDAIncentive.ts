import {
  type CGDAIncentivePayload,
  type CGDAParameters,
  type ClaimPayload,
  RegistryType,
  cgdaIncentiveAbi,
  prepareCGDAIncentivePayload,
  prepareClaimPayload,
  readCgdaIncentiveAsset,
  readCgdaIncentiveCgdaParams,
  readCgdaIncentiveClaimed,
  readCgdaIncentiveClaims,
  readCgdaIncentiveCurrentReward,
  readCgdaIncentiveIsClaimable,
  readCgdaIncentiveOwner,
  readCgdaIncentiveReward,
  readCgdaIncentiveTotalBudget,
  simulateCgdaIncentiveClaim,
  simulateCgdaIncentiveReclaim,
  writeCgdaIncentiveClaim,
  writeCgdaIncentiveReclaim,
} from '@boostxyz/evm';
import { bytecode } from '@boostxyz/evm/artifacts/contracts/incentives/CGDAIncentive.sol/CGDAIncentive.json';
import type { Address, Hex } from 'viem';
import type {
  DeployableOptions,
  GenericDeployableParams,
} from '../Deployable/Deployable';
import { DeployableTarget } from '../Deployable/DeployableTarget';
import type { ReadParams, WriteParams } from '../utils';

export type { CGDAIncentivePayload };

/**
 * Continuous Gradual Dutch Auction Incentive.
 * An ERC20 incentive implementation with reward amounts adjusting dynamically based on claim volume.
 *
 * @export
 * @class CGDAIncentive
 * @typedef {CGDAIncentive}
 * @extends {DeployableTarget<CGDAIncentivePayload>}
 */
export class CGDAIncentive extends DeployableTarget<CGDAIncentivePayload> {
  /**
   * @inheritdoc
   *
   * @public
   * @static
   * @type {Address}
   */
  public static override base: Address = import.meta.env
    .VITE_CGDA_INCENTIVE_BASE;
  /**
   * @inheritdoc
   *
   * @public
   * @static
   * @type {RegistryType}
   */
  public static override registryType: RegistryType = RegistryType.INCENTIVE;

  /**
   * The incentive's owner.
   *
   * @public
   * @async
   * @param {?ReadParams<typeof cgdaIncentiveAbi, 'owner'>} [params]
   * @returns {unknown}
   */
  public async owner(params?: ReadParams<typeof cgdaIncentiveAbi, 'owner'>) {
    return readCgdaIncentiveOwner(this._config, {
      address: this.assertValidAddress(),
      args: [],
      // biome-ignore lint/suspicious/noExplicitAny: Accept any shape of valid wagmi/viem parameters, wagmi does the same thing internally
      ...(params as any),
    });
  }

  /**
   * The number of claims that have been made
   *
   * @public
   * @async
   * @param {?ReadParams<typeof cgdaIncentiveAbi, 'claims'>} [params]
   * @returns {Promise<bigint>}
   */
  public async claims(params?: ReadParams<typeof cgdaIncentiveAbi, 'claims'>) {
    return readCgdaIncentiveClaims(this._config, {
      address: this.assertValidAddress(),
      args: [],
      // biome-ignore lint/suspicious/noExplicitAny: Accept any shape of valid wagmi/viem parameters, wagmi does the same thing internally
      ...(params as any),
    });
  }

  /**
   * The reward amount issued for each claim
   *
   * @public
   * @async
   * @param {?ReadParams<typeof allowListIncentiveAbi, 'reward'>} [params]
   * @returns {Promise<bigint>}
   */
  public async reward(params?: ReadParams<typeof cgdaIncentiveAbi, 'reward'>) {
    return readCgdaIncentiveReward(this._config, {
      address: this.assertValidAddress(),
      args: [],
      // biome-ignore lint/suspicious/noExplicitAny: Accept any shape of valid wagmi/viem parameters, wagmi does the same thing internally
      ...(params as any),
    });
  }

  /**
   * Get the claim status for a user
   *
   * @public
   * @async
   * @param {Address} address
   * @param {?ReadParams<typeof cgdaIncentiveAbi, 'claimed'>} [params]
   * @returns {Promise<boolean>}
   */
  public async claimed(
    address: Address,
    params?: ReadParams<typeof cgdaIncentiveAbi, 'claimed'>,
  ) {
    return readCgdaIncentiveClaimed(this._config, {
      address: this.assertValidAddress(),
      args: [address],
      // biome-ignore lint/suspicious/noExplicitAny: Accept any shape of valid wagmi/viem parameters, wagmi does the same thing internally
      ...(params as any),
    });
  }

  /**
   * The ERC20-like token used for the incentive
   *
   * @public
   * @async
   * @param {?ReadParams<typeof cgdaIncentiveAbi, 'asset'>} [params]
   * @returns {unknown}
   */
  public async asset(params?: ReadParams<typeof cgdaIncentiveAbi, 'asset'>) {
    return readCgdaIncentiveAsset(this._config, {
      address: this.assertValidAddress(),
      // biome-ignore lint/suspicious/noExplicitAny: Accept any shape of valid wagmi/viem parameters, wagmi does the same thing internally
      ...(params as any),
    });
  }

  /**
   * The configuration parameters for the CGDAIncentive
   *
   * @public
   * @async
   * @param {?ReadParams<typeof cgdaIncentiveAbi, 'cgdaParams'>} [params]
   * @returns {Promise<CGDAParameters>}
   */
  public async cgdaParams(
    params?: ReadParams<typeof cgdaIncentiveAbi, 'cgdaParams'>,
  ): Promise<CGDAParameters> {
    const [rewardDecay, rewardBoost, lastClaimTime, currentReward] =
      await readCgdaIncentiveCgdaParams(this._config, {
        address: this.assertValidAddress(),
        // biome-ignore lint/suspicious/noExplicitAny: Accept any shape of valid wagmi/viem parameters, wagmi does the same thing internally
        ...(params as any),
      });
    return {
      rewardDecay,
      rewardBoost,
      lastClaimTime,
      currentReward,
    };
  }

  /**
   * The total budget of the incentive
   *
   * @public
   * @async
   * @param {?ReadParams<typeof cgdaIncentiveAbi, 'totalBudget'>} [params]
   * @returns {Promise<bigint>}
   */
  public async totalBudget(
    params?: ReadParams<typeof cgdaIncentiveAbi, 'totalBudget'>,
  ) {
    return readCgdaIncentiveTotalBudget(this._config, {
      address: this.assertValidAddress(),
      // biome-ignore lint/suspicious/noExplicitAny: Accept any shape of valid wagmi/viem parameters, wagmi does the same thing internally
      ...(params as any),
    });
  }

  /**
   * Claim the incentive
   *
   * @public
   * @async
   * @param {ClaimPayload} payload
   * @param {?WriteParams<typeof cgdaIncentiveAbi, 'claim'>} [params]
   * @returns {Promise<boolean>} - Returns true if successfully claimed
   */
  public async claim(
    payload: ClaimPayload,
    params?: WriteParams<typeof cgdaIncentiveAbi, 'claim'>,
  ) {
    return this.awaitResult(this.claimRaw(payload, params));
  }

  /**
   * Claim the incentive
   *
   * @public
   * @async
   * @param {ClaimPayload} payload
   * @param {?WriteParams<typeof cgdaIncentiveAbi, 'claim'>} [params]
   * @returns {Promise<boolean>} - Returns true if successfully claimed
   */
  public async claimRaw(
    payload: ClaimPayload,
    params?: WriteParams<typeof cgdaIncentiveAbi, 'claim'>,
  ) {
    const { request, result } = await simulateCgdaIncentiveClaim(this._config, {
      address: this.assertValidAddress(),
      args: [prepareClaimPayload(payload)],
      ...this.optionallyAttachAccount(),
      // biome-ignore lint/suspicious/noExplicitAny: Accept any shape of valid wagmi/viem parameters, wagmi does the same thing internally
      ...(params as any),
    });
    const hash = await writeCgdaIncentiveClaim(this._config, request);
    return { hash, result };
  }

  /**
   * Reclaim assets from the incentive
   *
   * @public
   * @async
   * @param {ClaimPayload} payload
   * @param {?WriteParams<typeof cgdaIncentiveAbi, 'reclaim'>} [params]
   * @returns {Promise<boolean>} -  True if the assets were successfully reclaimed
   */
  public async reclaim(
    payload: ClaimPayload,
    params?: WriteParams<typeof cgdaIncentiveAbi, 'reclaim'>,
  ) {
    return this.awaitResult(this.reclaimRaw(payload, params));
  }

  /**
   * Reclaim assets from the incentive
   *
   * @public
   * @async
   * @param {ClaimPayload} payload
   * @param {?WriteParams<typeof cgdaIncentiveAbi, 'reclaim'>} [params]
   * @returns {Promise<boolean>} -  True if the assets were successfully reclaimed
   */
  public async reclaimRaw(
    payload: ClaimPayload,
    params?: WriteParams<typeof cgdaIncentiveAbi, 'reclaim'>,
  ) {
    const { request, result } = await simulateCgdaIncentiveReclaim(
      this._config,
      {
        address: this.assertValidAddress(),
        args: [prepareClaimPayload(payload)],
        ...this.optionallyAttachAccount(),
        // biome-ignore lint/suspicious/noExplicitAny: Accept any shape of valid wagmi/viem parameters, wagmi does the same thing internally
        ...(params as any),
      },
    );
    const hash = await writeCgdaIncentiveReclaim(this._config, request);
    return { hash, result };
  }

  /**
   * Check if an incentive is claimable
   *
   * @public
   * @async
   * @param {ClaimPayload} payload
   * @param {?ReadParams<typeof cgdaIncentiveAbi, 'isClaimable'>} [params]
   * @returns {Promise<boolean>} - True if the incentive is claimable based on the data payload
   */
  public async isClaimable(
    payload: ClaimPayload,
    params?: ReadParams<typeof cgdaIncentiveAbi, 'isClaimable'>,
  ) {
    return readCgdaIncentiveIsClaimable(this._config, {
      address: this.assertValidAddress(),
      args: [prepareClaimPayload(payload)],
      // biome-ignore lint/suspicious/noExplicitAny: Accept any shape of valid wagmi/viem parameters, wagmi does the same thing internally
      ...(params as any),
    });
  }

  /**
   * Calculates the current reward based on the time since the last claim.
   * The reward is calculated based on the time since the last claim, the available budget, and the reward parameters. It increases linearly over time in the absence of claims, with each hour adding `rewardBoost` to the current reward, up to the available budget.
   * For example, if there is one claim in the first hour, then no claims for three hours, the claimable reward would be `initialReward - rewardDecay + (rewardBoost * 3)`
   *
   * @public
   * @async
   * @param {?ReadParams<typeof cgdaIncentiveAbi, 'currentReward'>} [params]
   * @returns {Promise<bigint>} - The current reward
   */
  public async currentReward(
    params?: ReadParams<typeof cgdaIncentiveAbi, 'currentReward'>,
  ) {
    return readCgdaIncentiveCurrentReward(this._config, {
      address: this.assertValidAddress(),
      // biome-ignore lint/suspicious/noExplicitAny: Accept any shape of valid wagmi/viem parameters, wagmi does the same thing internally
      ...(params as any),
    });
  }

  /**
   * @inheritdoc
   *
   * @public
   * @param {?CGDAIncentivePayload} [_payload]
   * @param {?DeployableOptions} [_options]
   * @returns {GenericDeployableParams}
   */
  public override buildParameters(
    _payload?: CGDAIncentivePayload,
    _options?: DeployableOptions,
  ): GenericDeployableParams {
    const [payload, options] = this.validateDeploymentConfig(
      _payload,
      _options,
    );
    return {
      abi: cgdaIncentiveAbi,
      bytecode: bytecode as Hex,
      args: [prepareCGDAIncentivePayload(payload)],
      ...this.optionallyAttachAccount(options.account),
    };
  }
}
