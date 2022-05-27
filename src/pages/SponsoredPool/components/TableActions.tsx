import { Button, useToast } from '@chakra-ui/react';
import { GafiPrimitivesPlayerTicketInfo } from '@polkadot/types/lookup';
import { ISubmittableResult } from '@polkadot/types/types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { getFromAcct, handleTxError } from 'components/utils';
import { useSubstrateState } from 'substrate-lib';

interface IProps {
  poolId: string;
}

const TableActions: React.FC<IProps> = ({ poolId }) => {
  const { t } = useTranslation();
  const { api, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        description: `😉 Finalized. Block hash: ${status.asFinalized.toString()}`,
        isClosable: true,
        status: 'success',
      });
      refetch();
      setIsLoading(false);
    } else {
      toast({
        description: `Current transaction status: ${status.type}`,
        isClosable: true,
        status: 'info',
      });
    }
  };

  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedStakingPool', currentAccount],
    async (): Promise<GafiPrimitivesPlayerTicketInfo | undefined> => {
      if (api && currentAccount?.address) {
        const res = await api.query.pool.tickets(currentAccount?.address);
        if (res.isSome) {
          return res.unwrap();
        }
        return undefined;
      }
    },
    {
      enabled: !!currentAccount,
    }
  );

  const isJoinedPool = !!joinedPoolInfo?.ticketType.toHuman();

  const onJoinPool = async () => {
    setIsLoading(true);
    const [account, options] = await getFromAcct(currentAccount);
    if (api && account) {
      const txExecute = api.tx.pool.join({ Sponsored: poolId });
      if (options) {
        try {
          await txExecute.signAndSend(account, options, txCallback);
        } catch (err: any) {
          toast({
            description: `😞 Transaction Failed: ${err.toString()}`,
            isClosable: true,
            status: 'error',
          });
          setIsLoading(false);
        }
      } else {
        try {
          await txExecute.signAndSend(account, txCallback);
        } catch (err: any) {
          toast({
            description: `😞 Transaction Failed: ${err.toString()}`,
            isClosable: true,
            status: 'error',
          });
          setIsLoading(false);
        }
      }
    }
  };

  const onLeavePool = async () => {
    setIsLoading(true);
    const [account, options] = await getFromAcct(currentAccount);
    if (api && account) {
      const txExecute = api.tx.pool.leave();
      if (options) {
        try {
          await txExecute.signAndSend(account, options, txCallback);
        } catch (err: any) {
          toast({
            description: `😞 Transaction Failed: ${err.toString()}`,
            isClosable: true,
            status: 'error',
          });
          setIsLoading(false);
        }
      } else {
        try {
          await txExecute.signAndSend(account, txCallback);
        } catch (err: any) {
          toast({
            description: `😞 Transaction Failed: ${err.toString()}`,
            isClosable: true,
            status: 'error',
          });
          setIsLoading(false);
        }
      }
    }
  };

  return joinedPoolInfo?.ticketType.isSponsored &&
    joinedPoolInfo?.ticketType.asSponsored.toHuman() === poolId ? (
    <Button
      color="red.300"
      variant="solid"
      onClick={() => {
        onLeavePool();
      }}
      isLoading={isLoading}
    >
      {t('LEAVE')}
    </Button>
  ) : (
    <Button
      color="primary"
      variant="solid"
      onClick={() => {
        onJoinPool();
      }}
      disabled={isJoinedPool}
      isLoading={isLoading}
    >
      {t('JOIN')}
    </Button>
  );
};

export default TableActions;
