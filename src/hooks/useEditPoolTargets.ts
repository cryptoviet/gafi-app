import { useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { useSubstrateState } from 'contexts/substrateContext';
import { ITargets } from 'pages/SponsoredPool/components/EditTargetsForm';
import { getFromAcct, handleTxError } from 'utils';

const useEditPoolTargets = (onSuccess: () => void) => {
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

  const poolTargetsMutation = useMutation(
    async (params: { targetsData: ITargets; poolId: string }) => {
      const [account, options] = await getFromAcct(currentAccount);
      const newTargets = params.targetsData.map(
        target => target.contractAddress
      );
      const txSetNewTargets = api?.tx.sponsoredPool.newTargets(
        params.poolId,
        newTargets
      );
      return txSetNewTargets?.signAndSend(account, options || {}, txCallback);
    },
    {
      mutationKey: 'update-target-contract',
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
    editPoolTargets: (targetsData: ITargets, poolId: string) => {
      setIsLoading(true);
      poolTargetsMutation.mutate({ targetsData, poolId });
    },
    isLoading,
  };
};

export default useEditPoolTargets;
