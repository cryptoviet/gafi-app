import { useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct, handleTxError } from 'utils';

interface IMutationParams {
  transferTo: string;
  amount: number;
}

const useTransferGaki = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { api, currentAccount, chainDecimal } = useSubstrateState();
  const toast = useToast();
  const { t } = useTranslation();
  const { parseUnits } = ethers.utils;

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        position: 'top-right',
        description: t('TRANSFER_SUCCESS'),
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
    async ({ transferTo, amount }: IMutationParams) => {
      const [account, options] = await getFromAcct(currentAccount);
      const txTransferToken = api?.tx.balances.transfer(
        transferTo,
        parseUnits(amount.toString(), chainDecimal).toString()
      );
      return txTransferToken?.signAndSend(account, options || {}, txCallback);
    },
    {
      mutationKey: 'transfer-gaki',
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
    transferGaki: (transferTo: string, amount: number) => {
      setIsLoading(true);
      mutation.mutate({
        transferTo,
        amount,
      });
    },
    isLoading,
  };
};

export default useTransferGaki;
