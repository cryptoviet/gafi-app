// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api-base/types';
import type { Bytes, Compact, Option, U256, U8aFixed, Vec, bool, u128, u32, u64, u8 } from '@polkadot/types-codec';
import type { AnyNumber, ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, H160, H256, MultiAddress, Perbill, Permill } from '@polkadot/types/interfaces/runtime';
import type { EthereumTransactionTransactionV2, GafiPrimitivesPoolTicketType, SpCoreVoid, SpFinalityGrandpaEquivocationProof } from '@polkadot/types/lookup';

declare module '@polkadot/api-base/types/submittable' {
  export interface AugmentedSubmittables<ApiType extends ApiTypes> {
    balances: {
      /**
       * Exactly as `transfer`, except the origin must be root and the source account may be
       * specified.
       * # <weight>
       * - Same as transfer, but additional read and write because the source account is not
       * assumed to be in the overlay.
       * # </weight>
       **/
      forceTransfer: AugmentedSubmittable<(source: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, MultiAddress, Compact<u128>]>;
      /**
       * Unreserve some balance from a user by force.
       * 
       * Can only be called by ROOT.
       **/
      forceUnreserve: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, u128]>;
      /**
       * Set the balances of a given account.
       * 
       * This will alter `FreeBalance` and `ReservedBalance` in storage. it will
       * also alter the total issuance of the system (`TotalIssuance`) appropriately.
       * If the new free or reserved balance is below the existential deposit,
       * it will reset the account nonce (`frame_system::AccountNonce`).
       * 
       * The dispatch origin for this call is `root`.
       **/
      setBalance: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, newFree: Compact<u128> | AnyNumber | Uint8Array, newReserved: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>, Compact<u128>]>;
      /**
       * Transfer some liquid free balance to another account.
       * 
       * `transfer` will set the `FreeBalance` of the sender and receiver.
       * If the sender's account is below the existential deposit as a result
       * of the transfer, the account will be reaped.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       * 
       * # <weight>
       * - Dependent on arguments but not critical, given proper implementations for input config
       * types. See related functions below.
       * - It contains a limited number of reads and writes internally and no complex
       * computation.
       * 
       * Related functions:
       * 
       * - `ensure_can_withdraw` is always called internally but has a bounded complexity.
       * - Transferring balances to accounts that did not exist before will cause
       * `T::OnNewAccount::on_new_account` to be called.
       * - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
       * - `transfer_keep_alive` works the same way as `transfer`, but has an additional check
       * that the transfer will not kill the origin account.
       * ---------------------------------
       * - Origin account is already in memory, so no DB operations for them.
       * # </weight>
       **/
      transfer: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * Transfer the entire transferable balance from the caller account.
       * 
       * NOTE: This function only attempts to transfer _transferable_ balances. This means that
       * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
       * transferred by this function. To ensure that this function results in a killed account,
       * you might need to prepare the account by removing any reference counters, storage
       * deposits, etc...
       * 
       * The dispatch origin of this call must be Signed.
       * 
       * - `dest`: The recipient of the transfer.
       * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
       * of the funds the account has, causing the sender account to be killed (false), or
       * transfer everything except at least the existential deposit, which will guarantee to
       * keep the sender account alive (true). # <weight>
       * - O(1). Just like transfer, but reading the user's transferable balance first.
       * #</weight>
       **/
      transferAll: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, keepAlive: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, bool]>;
      /**
       * Same as the [`transfer`] call, but with a check that the transfer will not kill the
       * origin account.
       * 
       * 99% of the time you want [`transfer`] instead.
       * 
       * [`transfer`]: struct.Pallet.html#method.transfer
       **/
      transferKeepAlive: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    baseFee: {
      setBaseFeePerGas: AugmentedSubmittable<(fee: U256 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [U256]>;
      setElasticity: AugmentedSubmittable<(elasticity: Permill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Permill]>;
      setIsActive: AugmentedSubmittable<(isActive: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [bool]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    dynamicFee: {
      noteMinGasPriceTarget: AugmentedSubmittable<(target: U256 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [U256]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    ethereum: {
      /**
       * Transact an Ethereum transaction.
       **/
      transact: AugmentedSubmittable<(transaction: EthereumTransactionTransactionV2 | { Legacy: any } | { EIP2930: any } | { EIP1559: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [EthereumTransactionTransactionV2]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    evm: {
      /**
       * Issue an EVM call operation. This is similar to a message call transaction in Ethereum.
       **/
      call: AugmentedSubmittable<(source: H160 | string | Uint8Array, target: H160 | string | Uint8Array, input: Bytes | string | Uint8Array, value: U256 | AnyNumber | Uint8Array, gasLimit: u64 | AnyNumber | Uint8Array, maxFeePerGas: U256 | AnyNumber | Uint8Array, maxPriorityFeePerGas: Option<U256> | null | object | string | Uint8Array, nonce: Option<U256> | null | object | string | Uint8Array, accessList: Vec<ITuple<[H160, Vec<H256>]>> | ([H160 | string | Uint8Array, Vec<H256> | (H256 | string | Uint8Array)[]])[]) => SubmittableExtrinsic<ApiType>, [H160, H160, Bytes, U256, u64, U256, Option<U256>, Option<U256>, Vec<ITuple<[H160, Vec<H256>]>>]>;
      /**
       * Issue an EVM create operation. This is similar to a contract creation transaction in
       * Ethereum.
       **/
      create: AugmentedSubmittable<(source: H160 | string | Uint8Array, init: Bytes | string | Uint8Array, value: U256 | AnyNumber | Uint8Array, gasLimit: u64 | AnyNumber | Uint8Array, maxFeePerGas: U256 | AnyNumber | Uint8Array, maxPriorityFeePerGas: Option<U256> | null | object | string | Uint8Array, nonce: Option<U256> | null | object | string | Uint8Array, accessList: Vec<ITuple<[H160, Vec<H256>]>> | ([H160 | string | Uint8Array, Vec<H256> | (H256 | string | Uint8Array)[]])[]) => SubmittableExtrinsic<ApiType>, [H160, Bytes, U256, u64, U256, Option<U256>, Option<U256>, Vec<ITuple<[H160, Vec<H256>]>>]>;
      /**
       * Issue an EVM create2 operation.
       **/
      create2: AugmentedSubmittable<(source: H160 | string | Uint8Array, init: Bytes | string | Uint8Array, salt: H256 | string | Uint8Array, value: U256 | AnyNumber | Uint8Array, gasLimit: u64 | AnyNumber | Uint8Array, maxFeePerGas: U256 | AnyNumber | Uint8Array, maxPriorityFeePerGas: Option<U256> | null | object | string | Uint8Array, nonce: Option<U256> | null | object | string | Uint8Array, accessList: Vec<ITuple<[H160, Vec<H256>]>> | ([H160 | string | Uint8Array, Vec<H256> | (H256 | string | Uint8Array)[]])[]) => SubmittableExtrinsic<ApiType>, [H160, Bytes, H256, U256, u64, U256, Option<U256>, Option<U256>, Vec<ITuple<[H160, Vec<H256>]>>]>;
      /**
       * Withdraw balance from EVM into currency/balances pallet.
       **/
      withdraw: AugmentedSubmittable<(address: H160 | string | Uint8Array, value: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160, u128]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    faucet: {
      /**
       * donate
       * 
       * The origin must be Signed
       * 
       * Parameters:
       * - `amount`: donation amount
       * 
       * Weight: `O(1)`
       **/
      donate: AugmentedSubmittable<(amount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128]>;
      /**
       * faucet
       * 
       * The origin must be Signed
       * 
       * Weight: `O(1)`
       **/
      faucet: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    gameCreator: {
      changeOwnership: AugmentedSubmittable<(contract: H160 | string | Uint8Array, newOwner: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160, AccountId32]>;
      claimContract: AugmentedSubmittable<(contract: H160 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160]>;
      withdrawContract: AugmentedSubmittable<(contract: H160 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    grandpa: {
      /**
       * Note that the current authority set of the GRANDPA finality gadget has
       * stalled. This will trigger a forced authority set change at the beginning
       * of the next session, to be enacted `delay` blocks after that. The delay
       * should be high enough to safely assume that the block signalling the
       * forced change will not be re-orged (e.g. 1000 blocks). The GRANDPA voters
       * will start the new authority set using the given finalized block as base.
       * Only callable by root.
       **/
      noteStalled: AugmentedSubmittable<(delay: u32 | AnyNumber | Uint8Array, bestFinalizedBlockNumber: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Report voter equivocation/misbehavior. This method will verify the
       * equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence
       * will be reported.
       **/
      reportEquivocation: AugmentedSubmittable<(equivocationProof: SpFinalityGrandpaEquivocationProof | { setId?: any; equivocation?: any } | string | Uint8Array, keyOwnerProof: SpCoreVoid | null) => SubmittableExtrinsic<ApiType>, [SpFinalityGrandpaEquivocationProof, SpCoreVoid]>;
      /**
       * Report voter equivocation/misbehavior. This method will verify the
       * equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence
       * will be reported.
       * 
       * This extrinsic must be called unsigned and it is expected that only
       * block authors will call it (validated in `ValidateUnsigned`), as such
       * if the block author is defined it will be defined as the equivocation
       * reporter.
       **/
      reportEquivocationUnsigned: AugmentedSubmittable<(equivocationProof: SpFinalityGrandpaEquivocationProof | { setId?: any; equivocation?: any } | string | Uint8Array, keyOwnerProof: SpCoreVoid | null) => SubmittableExtrinsic<ApiType>, [SpFinalityGrandpaEquivocationProof, SpCoreVoid]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    palletCache: {
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    player: {
      createPlayer: AugmentedSubmittable<(name: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [U8aFixed]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    pool: {
      /**
       * join pool
       * 
       * The origin must be Signed
       * 
       * Parameters:
       * - `ticket`: ticket type
       * 
       * Weight: `O(1)`
       **/
      join: AugmentedSubmittable<(ticket: GafiPrimitivesPoolTicketType | { Upfront: any } | { Staking: any } | { Sponsored: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [GafiPrimitivesPoolTicketType]>;
      /**
       * leave pool
       * 
       * The origin must be Signed
       * 
       * Weight: `O(1)`
       **/
      leave: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    poolName: {
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    proofAddressMapping: {
      /**
       * Bond Substrate(H256) address with EVM(H160) address
       * 
       * The origin must be Signed
       * 
       * Parameters:
       * - `signature`: signature of the address that signed the message contain hex format of origin
       * 
       * - `address`: EVM(H160) address that you want to bond
       * 
       * - `withdraw`: true/false withdraw all the balance of original account of address trasfer to
       * the origin, always KeepAlive original address
       * 
       * Emits `Bonded` event when successful.
       * 
       * Weight: `O(1)`
       **/
      bond: AugmentedSubmittable<(signature: U8aFixed | string | Uint8Array, address: H160 | string | Uint8Array, withdraw: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [U8aFixed, H160, bool]>;
      /**
       * Unbonded Substrate(H256) address to EVM(H160) address remove
       * the bond so both two accounts will be using the default AddressMapping
       * 
       * The origin must be Signed
       * 
       * Emits `Unbonded` event when successful.
       * 
       * Weight: `O(1)`
       **/
      unbond: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    sponsoredPool: {
      clearPoolName: AugmentedSubmittable<(poolId: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [U8aFixed]>;
      /**
       * Create Pool
       * 
       * Create new pool and deposit amount of `value` to the pool,
       * the origin must be Signed
       * 
       * Parameters:
       * - `targets`: smart-contract addresses
       * - `value`: the amount token deposit to the pool
       * - `discount`: transaction fee discount
       * - `tx_limit`: the number of discounted transaction per period of time
       * 
       * Weight: `O(1)`
       **/
      createPool: AugmentedSubmittable<(targets: Vec<H160> | (H160 | string | Uint8Array)[], value: u128 | AnyNumber | Uint8Array, discount: u8 | AnyNumber | Uint8Array, txLimit: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<H160>, u128, u8, u32]>;
      killPoolName: AugmentedSubmittable<(poolId: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [U8aFixed]>;
      /**
       * New Targets
       * 
       * change the contract addresses by replace old addresses with the new one
       * the origin as the owner of the pool must be Signed
       * 
       * Parameters:
       * - `pool_id`: the id of the pool
       * - `targets`: new smart-contract addresses
       * 
       * Weight: `O(1)`
       **/
      newTargets: AugmentedSubmittable<(poolId: U8aFixed | string | Uint8Array, targets: Vec<H160> | (H160 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [U8aFixed, Vec<H160>]>;
      setPoolName: AugmentedSubmittable<(poolId: U8aFixed | string | Uint8Array, name: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [U8aFixed, Bytes]>;
      /**
       * Withdraw Pool
       * 
       * withdraw all the balances remain in the pool and destroy the pool,
       * the origin as the owner of the pool must be Signed
       * 
       * Parameters:
       * - `pool_id`: the id of the pool
       * 
       * Weight: `O(1)`
       **/
      withdrawPool: AugmentedSubmittable<(poolId: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [U8aFixed]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    stakingPool: {
      /**
       * Set MaxPlayer
       * 
       * The root must be Signed
       * 
       * Parameters:
       * - `max_player`: new value of MaxPlayer
       * 
       * Weight: `O(1)`
       **/
      setMaxPlayer: AugmentedSubmittable<(newMaxPlayer: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    sudo: {
      /**
       * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
       * key.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB change.
       * # </weight>
       **/
      setKey: AugmentedSubmittable<(updated: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Weight of derivative `call` execution + 10,000.
       * # </weight>
       **/
      sudo: AugmentedSubmittable<(call: Call | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Signed` origin from
       * a given account.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Weight of derivative `call` execution + 10,000.
       * # </weight>
       **/
      sudoAs: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, call: Call | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Call]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * This function does not check the weight of the call, and instead allows the
       * Sudo user to specify the weight of the call.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - The weight of this call is defined by the caller.
       * # </weight>
       **/
      sudoUncheckedWeight: AugmentedSubmittable<(call: Call | { callIndex?: any; args?: any } | string | Uint8Array, weight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, u64]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    system: {
      /**
       * A dispatch that will fill the block weight up to the given ratio.
       **/
      fillBlock: AugmentedSubmittable<(ratio: Perbill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Perbill]>;
      /**
       * Kill all storage items with a key that starts with the given prefix.
       * 
       * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
       * the prefix we are removing to accurately calculate the weight of this function.
       **/
      killPrefix: AugmentedSubmittable<(prefix: Bytes | string | Uint8Array, subkeys: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, u32]>;
      /**
       * Kill some items from storage.
       **/
      killStorage: AugmentedSubmittable<(keys: Vec<Bytes> | (Bytes | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Bytes>]>;
      /**
       * Make some on-chain remark.
       * 
       * # <weight>
       * - `O(1)`
       * # </weight>
       **/
      remark: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Make some on-chain remark and emit event.
       **/
      remarkWithEvent: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the new runtime code.
       * 
       * # <weight>
       * - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
       * - 1 call to `can_set_code`: `O(S)` (calls `sp_io::misc::runtime_version` which is
       * expensive).
       * - 1 storage write (codec `O(C)`).
       * - 1 digest item.
       * - 1 event.
       * The weight of this function is dependent on the runtime, but generally this is very
       * expensive. We will treat this as a full block.
       * # </weight>
       **/
      setCode: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the new runtime code without doing any checks of the given `code`.
       * 
       * # <weight>
       * - `O(C)` where `C` length of `code`
       * - 1 storage write (codec `O(C)`).
       * - 1 digest item.
       * - 1 event.
       * The weight of this function is dependent on the runtime. We will treat this as a full
       * block. # </weight>
       **/
      setCodeWithoutChecks: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the number of pages in the WebAssembly environment's heap.
       **/
      setHeapPages: AugmentedSubmittable<(pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      /**
       * Set some items of storage.
       **/
      setStorage: AugmentedSubmittable<(items: Vec<ITuple<[Bytes, Bytes]>> | ([Bytes | string | Uint8Array, Bytes | string | Uint8Array])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[Bytes, Bytes]>>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    timestamp: {
      /**
       * Set the current time.
       * 
       * This call should be invoked exactly once per block. It will panic at the finalization
       * phase, if this call hasn't been invoked by that time.
       * 
       * The timestamp should be greater than the previous one by the amount specified by
       * `MinimumPeriod`.
       * 
       * The dispatch origin for this call must be `Inherent`.
       * 
       * # <weight>
       * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
       * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in
       * `on_finalize`)
       * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
       * # </weight>
       **/
      set: AugmentedSubmittable<(now: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    txHandler: {
      /**
       * Set Gas Price
       * 
       * The root must be Signed
       * 
       * Parameters:
       * - `new_gas_price`: new gas_price value
       * 
       * Weight: `O(1)`
       **/
      setGasPrice: AugmentedSubmittable<(newGasPrice: U256 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [U256]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    upfrontPool: {
      /**
       * Set MaxPlayer
       * 
       * The root must be Signed
       * 
       * Parameters:
       * - `max_player`: new value of MaxPlayer
       * 
       * Weight: `O(1)`
       **/
      setMaxPlayer: AugmentedSubmittable<(maxPlayer: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  } // AugmentedSubmittables
} // declare module
