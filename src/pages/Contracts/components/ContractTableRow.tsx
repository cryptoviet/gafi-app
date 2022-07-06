import {
  Button,
  Td,
  Tr,
  Text,
  Icon,
  HStack,
  VStack,
  Avatar,
} from '@chakra-ui/react';
import { mdiContentCopy } from '@mdi/js';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';

import ModalChangeContractOwner from './ModalChangeContractOwner';

import { IResponseContract } from 'hooks/useLoadContracts';
import useMessageToast from 'hooks/useMessageToast';
import { shorten } from 'utils';

interface IProps {
  contract: IResponseContract;
}
const ContractsTableRow: React.FC<IProps> = ({ contract }) => {
  const { t } = useTranslation();
  const { copySuccessToast } = useMessageToast();
  const [contractChanging, setContractChanging] = useState('');
  return (
    <>
      <Tr>
        <Td>
          <HStack>
            <Avatar
              mr={4}
              w={14}
              h={14}
              name="Segun Adebayo"
              src="/assets/layout/contract-img-1.png"
            />
            <VStack ml={0} alignItems="flex-start">
              <Text fontWeight="bold" fontSize="md" minWidth="100%">
                {shorten(contract.owner)}
              </Text>
              <Text fontSize="xs">Games</Text>
            </VStack>
          </HStack>
        </Td>
        <Td>
          <HStack justify="center">
            <Text>{shorten(contract.address)}</Text>
            <CopyToClipboard text={contract.address}>
              <Icon
                onClick={copySuccessToast}
                cursor="pointer"
                ml={4}
                color="primary"
              >
                <path fill="currentColor" d={mdiContentCopy} />
              </Icon>
            </CopyToClipboard>
          </HStack>
        </Td>
        <Td textAlign="center">
          <Button
            onClick={() => {
              const contractAddress = contract.address?.toString();
              if (contractAddress) {
                setContractChanging(contractAddress);
              }
            }}
            color="primary"
            size="sm"
            variant="outline"
          >
            {t('CHANGE_OWNER')}
          </Button>
        </Td>
      </Tr>
      <ModalChangeContractOwner
        contractAddress={contractChanging}
        onClose={() => {
          setContractChanging('');
        }}
      />
    </>
  );
};

export default ContractsTableRow;
