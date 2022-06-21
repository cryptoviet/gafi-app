import { useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { getFromAcct, handleTxError } from 'components/utils';
import { ITargets } from 'pages/SponsoredPool/components/EditTargetsForm';
import { useSubstrateState } from 'substrate-lib';

const useEditPoolTargets = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { api, currentAccount } = useSubstrateState();
  const toast = useToast();
  const { t } = useTranslation();

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        description: t('FINALIZED_BLOCK_HASH', {
          hash: status.asFinalized.toString(),
        }),
        isClosable: true,
        status: 'success',
      });
      setIsLoading(false);
      onSuccess();
    } else {
      toast({
        description: t('CURRENT_TRANSACTION_STATUS', {
          statusType: status.type,
        }),
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
      if (options) {
        return txSetNewTargets?.signAndSend(account, options, txCallback);
      }
      return txSetNewTargets?.signAndSend(account, txCallback);
    },
    {
      mutationKey: 'update-target-contract',
      onError: (error: any) => {
        toast({
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