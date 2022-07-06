import { Box, Button, Icon, useToast } from '@chakra-ui/react';
import { mdiWaterPump } from '@mdi/js';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct, handleTxError } from 'utils';

const Faucet = () => {
  const { api, currentAccount } = useSubstrateState();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  // @ts-ignore
  const txResHandler = ({ status, events }) => {
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

  // @ts-ignore
  const txErrHandler = err => {
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

  const onFaucet = async () => {
    setIsLoading(true);
    if (currentAccount) {
      const [account, options] = await getFromAcct(currentAccount);

      if (api) {
        const txExecute = api.tx.faucet.faucet();

        if (options) {
          const unsub = await txExecute
            .signAndSend(account, options, txResHandler)
            .catch(txErrHandler);
        } else {
          const unsub = await txExecute
            .signAndSend(account, txResHandler)
            .catch(txErrHandler);
        }
      }
    }
  };

  return (
    <Box pt={{ base: '120px', md: '75px' }}>
      <Button
        width="full"
        onClick={onFaucet}
        isLoading={isLoading}
        leftIcon={
          <Icon>
            <path d={mdiWaterPump} />
          </Icon>
        }
      >
        Faucet
      </Button>
    </Box>
  );
};

export default Faucet;
