import { useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct, handleTxError } from 'utils';

const useChangeOwner = (onSuccess: () => void) => {
  const toast = useToast();
  const { t } = useTranslation();
  const { api, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        position: 'top-right',
        title: t('FINALIZED_BLOCK_HASH'),
        description: status.asFinalized.toString(),
        isClosable: true,
        status: 'success',
      });
      setIsLoading(false);
      onSuccess();
    } else {
      toast({
        position: 'top-right',
        title: t('CURRENT_TRANSACTION_STATUS'),
        description: status.type,
        isClosable: true,
        status: 'info',
      });
    }
  };

  const mutation = useMutation(
    async (params: { contractAddress: string; ownerAddress: string }) => {
      const [account, options] = await getFromAcct(currentAccount);
      const txChangeContractOwnerExecute = api?.tx.gameCreator.changeOwnership(
        params.contractAddress,
        params.ownerAddress
      );
      return txChangeContractOwnerExecute?.signAndSend(
        account,
        options || {},
        txCallback
      );
    },
    {
      mutationKey: 'change-contract-onwer',
      onError: (error: any) => {
        toast({
          position: 'top-right',
          description: t('TRANSACTION_FAILED', {
            errorMessage: error.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setIsLoading(false);
      },
    }
  );

  const changeOwner = (contractAddress: string, ownerAddress: string) => {
    setIsLoading(true);
    mutation.mutate({ contractAddress, ownerAddress });
  };

  return {
    changeOwner,
    isLoading,
  };
};

export default useChangeOwner;
