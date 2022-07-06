import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { useSubstrateState } from 'contexts/substrateContext';
import { acctAddr } from 'utils';
import * as constants from 'utils/constants';

export interface IResponseContract {
  owner: string;
  address: string;
}

const useLoadContracts = () => {
  const { api, currentAccount, keyring } = useSubstrateState();
  const [currentPage, setCurrentPage] = useState(1);
  const [contractsDisplay, setContractsDisplay] =
    useState<IResponseContract[]>();

  const loadingContract = async () => {
    const response = await api?.query.gameCreator.contractOwner.entries();

    if (response && keyring) {
      let contractArray = response.map(([key, exposure]) => {
        const addresses = key.args.map(k => k.toHuman());
        const ownerAddress = keyring.getPair(
          exposure.toHuman()?.toString() || ''
        );
        return {
          owner: acctAddr(ownerAddress),
          address: addresses[0]?.toString() || '',
        };
      });
      if (currentAccount) {
        contractArray = contractArray.filter(
          contract => contract.owner === acctAddr(currentAccount)
        ) as IResponseContract[];
        return {
          contracts: contractArray as IResponseContract[],
          totalPage: contractArray.length
            ? Math.ceil(
                contractArray.length / constants.CONTRACT_AMOUNT_PER_PAGE
              )
            : 0,
        };
      }
    }
  };

  // loading contracts
  const { data, refetch, isLoading } = useQuery(
    ['loading-contract', currentAccount],
    loadingContract,
    {
      enabled: !!currentAccount,
    }
  );

  useEffect(() => {
    if (currentAccount) {
      setCurrentPage(1);
    }
  }, [currentAccount]);

  // display contracts
  useEffect(() => {
    setContractsDisplay(
      data?.contracts?.slice(
        (currentPage - 1) * constants.CONTRACT_AMOUNT_PER_PAGE,
        (currentPage - 1) * constants.CONTRACT_AMOUNT_PER_PAGE +
          constants.CONTRACT_AMOUNT_PER_PAGE
      )
    );
  }, [currentPage, data?.contracts]);

  return {
    listContract: contractsDisplay,
    currentPage,
    setCurrentPage,
    refetch,
    isLoading,
    maxCount: data?.contracts.length,
    totalPage: data?.totalPage,
  };
};

export default useLoadContracts;
