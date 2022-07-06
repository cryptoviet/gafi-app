import { useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct, handleTxError } from 'utils';

const useEditPool = (onSuccess: () => void) => {
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

  const poolNameMutation = useMutation(
    async (params: { poolName: string; poolId: string }) => {
      const [account, options] = await getFromAcct(currentAccount);
      const txSetPoolNameExecute = api?.tx.sponsoredPool.setPoolName(
        params.poolId,
        params.poolName
      );
      return txSetPoolNameExecute?.signAndSend(
        account,
        options || {},
        txCallback
      );
    },
    {
      mutationKey: 'update-pool-name',
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

  return {
    editPoolName: (poolName: string, poolId: string) => {
      setIsLoading(true);
      poolNameMutation.mutate({ poolName, poolId });
    },
    isLoading,
  };
};

export default useEditPool;
