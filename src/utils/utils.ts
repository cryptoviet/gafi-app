import { ApiPromise } from '@polkadot/api';
import { AddressOrPair, SignerOptions } from '@polkadot/api/types';
import { web3FromSource } from '@polkadot/extension-dapp';
import { KeyringPair } from '@polkadot/keyring/types';
import { EventRecord } from '@polkadot/types/interfaces';
import { encodeAddress } from '@polkadot/util-crypto';

interface ContractValueParams {
  amount: number;
  decimal?: number;
}

const trauncateFractionAndFormat = (
  parts: Intl.NumberFormatPart[],
  digits: number
) =>
  parts
    .map(({ type, value }) => {
      if (type !== 'fraction' || !value || value.length < digits) {
        return value;
      }

      let retVal = '';
      for (
        let idx = 0, counter = 0;
        idx < value.length && counter < digits;
        idx++
      ) {
        if (value[idx] !== '0') {
          counter++;
        }
        retVal += value[idx];
      }
      return retVal;
    })
    .reduce((string, part) => string + part);

export const formatNumber = (num: number, digits?: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
  });
  return trauncateFractionAndFormat(formatter.formatToParts(num), digits || 3);
};
export const covertToContractValue = ({
  amount,
  decimal = 18,
}: ContractValueParams) => {
  const strVal = `${amount}`;
  const afterDot =
    strVal.indexOf('.') > -1 ? strVal.length - strVal.indexOf('.') - 1 : 0;
  const toInteger = strVal.replace('.', '');
  const returnVal = parseInt(toInteger, 10) * 10 ** (decimal - afterDot);
  return returnVal.toLocaleString('fullwide', { useGrouping: false });
};

export function countDecimalPlaces(value: number): number {
  if (!Number.isFinite(value)) return 0;

  let e = 1;
  let p = 0;
  while (Math.round(value * e) / e !== value) {
    e *= 10;
    p += 1;
  }
  return p;
}

export function isNotNumber(value: number): boolean {
  return (
    typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)
  );
}

function toNumber(value: string | number) {
  const num = parseFloat(value.toString());
  return isNotNumber(num) ? 0 : num;
}

export function toPrecision(value: number, precision?: number): string {
  let nextValue: string | number = toNumber(value);
  const scaleFactor = 10 ** (precision ?? 10);
  nextValue = Math.trunc(nextValue * scaleFactor) / scaleFactor;
  return precision ? nextValue.toFixed(precision) : nextValue.toString();
}

function parse(value: string | number) {
  return parseFloat(value.toString().replace(/[^\w.-]+/g, ''));
}

function getDecimalPlaces(value: number, step: number) {
  return Math.max(countDecimalPlaces(step), countDecimalPlaces(value));
}

export function cast(
  value: string | number,
  step: number,
  precision?: number
): string | undefined {
  const parsedValue = parse(value);
  if (Number.isNaN(parsedValue)) return undefined;
  const decimalPlaces = getDecimalPlaces(parsedValue, step);
  return toPrecision(parsedValue, precision ?? decimalPlaces);
}

export const getFromAcct = async (
  currentAccount: any
): Promise<[AddressOrPair, Partial<SignerOptions>?]> => {
  const {
    address,
    meta: { source, isInjected },
  } = currentAccount;

  if (!isInjected) {
    return [currentAccount];
  }

  // currentAccount is injected from polkadot-JS extension, need to return the addr and signer object.
  // ref: https://polkadot.js.org/docs/extension/cookbook#sign-and-send-a-transaction
  const injector = await web3FromSource(source);
  return [address, { signer: injector.signer }];
};

export const shorten = (hash: string, length = 6) => {
  const n = hash.length;
  return `${hash.substr(0, length)}...${hash.substr(n - length)}`;
};

export const handleTxError = (events: any, api: any, toast: any) => {
  events.forEach(({ event }: any) => {
    if (api.events.system.ExtrinsicFailed.is(event)) {
      // extract the data for this event
      const [dispatchError] = event.data;
      let errorInfo;

      // decode the error
      if (dispatchError.isModule) {
        // for module errors, we have the section indexed, lookup
        // (For specific known errors, we can also do a check against the
        // api.errors.<module>.<ErrorName>.is(dispatchError.asModule) guard)
        const decoded = api.registry.findMetaError(dispatchError.asModule);

        errorInfo = `${decoded.name}`;
      } else {
        // Other, CannotLookup, BadOrigin, no extra info
        errorInfo = dispatchError.toString();
      }

      toast({
        description: errorInfo,
        isClosable: true,
        status: 'error',
      });
    }
  });
};

export const getGAKIAccountAddress = (addressRaw: Uint8Array) =>
  encodeAddress(addressRaw, 24);

export const acctAddr = (acct: KeyringPair | null) =>
  acct ? acct.address : '';
