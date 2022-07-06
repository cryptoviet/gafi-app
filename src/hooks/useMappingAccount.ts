import { useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { u8aToHex } from '@polkadot/util';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWallet } from 'use-wallet';
import Web3 from 'web3';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct, handleTxError } from 'utils';

const useMappingAccount = () => {
  const toast = useToast();
  const { t } = useTranslation();
  const { account, ethereum } = useWallet();
  const { api, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);

  const txResHandler = ({ status, events }: ISubmittableResult) => {
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

  const txErrHandler = (err: any) => {
    toast({
      position: 'top-right',
      description: t('TRANSACTION_FAILED', {
        errorMessage: err.toString(),
      }),
      isClosable: true,
      status: 'error',
    });
    setIsLoading(false);
  };

  const mappingAccount = async (isWithdraw: boolean) => {
    setIsLoading(true);
    if (account && ethereum) {
      const [accountAddress, options] = await getFromAcct(currentAccount);
      const web3 = new Web3(ethereum);
      const data = u8aToHex(currentAccount?.publicKey, undefined, false);
      const signature = await web3.eth.personal.sign(
        `Bond Gafi Network account:${data.toString()}`,
        account,
        ''
      );
      if (api) {
        const txExecute = api.tx.proofAddressMapping.bond(
          signature,
          account,
          isWithdraw
        );

        await txExecute
          .signAndSend(accountAddress, options || {}, txResHandler)
          .catch(txErrHandler);
      }
    }
  };

  return {
    isLoading,
    mappingAccount,
  };
};

export default useMappingAccount;
