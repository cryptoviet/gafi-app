import { u128 } from '@polkadot/types';
import { formatBalance } from '@polkadot/util';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import { useSubstrateState } from 'contexts/substrateContext';
import { acctAddr } from 'utils';

export const usePolkadotBalance = () => {
  const { api, currentAccount, chainDecimal } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<u128>();
  const { formatUnits } = ethers.utils;

  const fetchPolkadotBalance = useCallback(async () => {
    setIsLoading(true);
    let unsubscribe: any;
    if (currentAccount)
      unsubscribe = await api?.query.system.account(
        acctAddr(currentAccount),
        res => {
          setResponse(res.data.free);
        }
      );
    setIsLoading(false);
    return () => unsubscribe && unsubscribe();
  }, [api, currentAccount]);

  useEffect(() => {
    fetchPolkadotBalance();
  }, [fetchPolkadotBalance]);

  return {
    polkadotBalance: formatUnits(response?.toString() || '0', chainDecimal),
    polkadotFormatedBalance: formatBalance(
      response,
      { withSi: false, forceUnit: '-' },
      chainDecimal
    ),
    isLoading,
  };
};
