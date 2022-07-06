import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { mdiChevronDown } from '@mdi/js';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import NumberInput from 'components/numberInput/NumberInput';
import { useSubstrateState } from 'contexts/substrateContext';
import useTransferGaki from 'hooks/useTransferGaki';
import { usePolkadotBalance } from 'hooks/useUserBalance';
import { shorten } from 'utils';

interface Iprops {
  isOpen: boolean;
  onClose: () => void;
}

interface ITransferForm {
  transferTo: string;
  amount: number;
}

const ModalTransferGaki: React.FC<Iprops> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { currentPolkadotAccount, polkadotAccounts } = useSubstrateState();
  const { polkadotBalance } = usePolkadotBalance();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ITransferForm>({
    defaultValues: {
      transferTo: '',
      amount: 0,
    },
  });

  const handleClickSelection = (account: string) => {
    setValue('transferTo', account);
  };

  const { transferGaki, isLoading } = useTransferGaki(() => {
    onClose();
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('TRANSFER_GAKI')}</ModalHeader>
        <form
          onSubmit={handleSubmit((data: ITransferForm) => {
            transferGaki(data.transferTo, data.amount);
          })}
        >
          <ModalBody>
            <FormControl isRequired mb={4}>
              <FormLabel htmlFor="">{t('TRANSFER_TO')}</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  {...register('transferTo', {
                    required: t(
                      'PLEASE_ENTER_THE_ADDRESS_YOU_WANT_TO_TRANSFER_TO'
                    ),
                  })}
                />
                <InputRightAddon px={0}>
                  <Menu>
                    <MenuButton w="full" h="full" type="button">
                      <Icon color="white">
                        <path fill="currentColor" d={mdiChevronDown} />
                      </Icon>
                    </MenuButton>
                    <MenuList zIndex={99}>
                      {React.Children.toArray(
                        polkadotAccounts?.map(account => {
                          if (currentPolkadotAccount === account) {
                            return null;
                          }
                          return (
                            <MenuItem
                              onClick={() => {
                                handleClickSelection(account);
                              }}
                            >
                              {shorten(account)}
                            </MenuItem>
                          );
                        })
                      )}
                    </MenuList>
                  </Menu>
                </InputRightAddon>
              </InputGroup>
              <ErrorMessage
                errors={errors}
                name="transferTo"
                render={({ message }) => <Text color="red.400">{message}</Text>}
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel htmlFor="">{t('TOKEN_AMOUNT')}</FormLabel>
              <Controller
                control={control}
                name="amount"
                render={({ field }) => (
                  <NumberInput
                    value={field.value}
                    onChange={field.onChange}
                    max={parseFloat(polkadotBalance)}
                  />
                )}
                rules={{
                  min: {
                    value: 0.001,
                    message: t('AMOUNT_MUST_BE_GREATER_THAN_AMOUNT_GAKI', {
                      minAmount: 0.001,
                    }),
                  },
                  required: {
                    value: true,
                    message: t('PLEASE_ENTER_AMOUNT'),
                  },
                }}
              />
              <ErrorMessage
                errors={errors}
                name="amount"
                render={({ message }) => <Text color="red.400">{message}</Text>}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              type="submit"
              color="white"
              background="primary"
              variant="solid"
              isLoading={isLoading}
            >
              {t('TRANSFER')}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalTransferGaki;
