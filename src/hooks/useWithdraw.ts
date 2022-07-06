import { useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct, handleTxError } from 'utils';

const useWithdraw = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { api, currentAccount } = useSubstrateState();
  const toast = useToast();
  const { t } = useTranslation();

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
    async (poolId: string) => {
      const [account, options] = await getFromAcct(currentAccount);

      const txExecute = api?.tx.sponsoredPool.withdrawPool(poolId);
      return txExecute?.signAndSend(account, options || {}, txCallback);
    },
    {
      mutationKey: 'withdraw-pool',
      onError: (err: any) => {
        toast({
          position: 'top-right',
          description: t('TRANSACTION_FAILED', {
            errorMessage: err.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setIsLoading(false);
      },
    }
  );

  return {
    withdrawPoolBalance: (poolId: string) => {
      setIsLoading(true);
      mutation.mutate(poolId);
    },
    isLoading,
  };
};

export default useWithdraw;
