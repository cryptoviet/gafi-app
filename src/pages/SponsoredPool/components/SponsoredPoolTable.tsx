// Chakra imports
import {
  Avatar,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import { mdiContentCopy } from '@mdi/js';
import { formatBalance } from '@polkadot/util';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';

import ModalEditPool from './ModalEditPool';
import SponsoredPoolData from './SponsoredPoolData';

import Card from 'components/card/Card';
import SkeletonLoadingRow from 'components/SkeletonLoadingRow';
import { useSubstrateState } from 'contexts/substrateContext';
import { SponsoredPool } from 'graphQL/generates';
import useLoadSponsoredPool from 'hooks/useLoadSponsoredPool';
import useMessageToast from 'hooks/useMessageToast';
import usePool from 'hooks/useSponsoredPool';
import { shorten } from 'utils';

export interface ISponsoredPool {
  id: string | undefined;
  amount: string | undefined;
  owner: string | undefined;
  discount: number | undefined;
  limit: number | undefined;
}

export interface TableCaption {
  label: string;
  fieldName: string;
  display: boolean;
}

interface ISponsoredPoolTableProps {
  captions: TableCaption[];
  sponsoredPools: SponsoredPool[];
  children: React.ReactNode;
  limitRow: number;
  isLoading: boolean;
}

const SponsoredPoolTable = (props: ISponsoredPoolTableProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { captions, sponsoredPools, children, limitRow, isLoading } = props;
  const { joinedPoolInfo, isJoinedPool, refetch, joinedPool } =
    useLoadSponsoredPool();
  const onCloseDetail = () => {
    setSelectedPoolDetail(undefined);
  };
  const {
    joinSponsoredPool,
    isLoading: isSponsoredPoolLoading,
    leavePool,
  } = usePool(refetch, onCloseDetail);
  const { copySuccessToast } = useMessageToast();
  const [selectedPool, setSelectedPool] = useState<SponsoredPool | undefined>();
  const [selectedPoolDetail, setSelectedPoolDetail] = useState<
    SponsoredPool | undefined
  >();
  const { chainDecimal } = useSubstrateState();
  const [selectedEditPool, setSelectedEditPool] = useState<
    SponsoredPool | undefined
  >();
  const SkeletonArray = new Array(limitRow).fill(0);
  const tableSize = useBreakpointValue({
    sm: 'sm',
    md: 'md',
    lg: 'sm',
    xl: 'md',
  });
  const columnAmount = useBreakpointValue({
    sm: 3,
    md: limitRow,
  });

  return (
    <>
      {joinedPool && (
        <Card px={0} py={4} mt={4}>
          <HStack
            px={5}
            py={4}
            borderBottom={`1px solid ${theme.colors.borderBottom}`}
          >
            <Avatar
              mr={{ base: 0, md: 4 }}
              w={{ base: 10, md: 14 }}
              h={{ base: 10, md: 14 }}
              name="Segun Adebayo"
              src="/assets/layout/contract-img-1.png"
            />
            <VStack ml={0} alignItems="flex-start">
              <Text fontWeight="bold" fontSize="md" minWidth="100%">
                {shorten(joinedPool?.poolOwner || '')}
              </Text>
              <Text fontSize="xs">Games</Text>
            </VStack>
          </HStack>

          <Flex
            borderBottom={`1px solid ${theme.colors.borderBottom}`}
            px={5}
            py={4}
            direction="column"
          >
            <Flex py={4} justifyContent="space-between">
              <Text>{t('DISCOUNT')}</Text>
              <Text fontWeight="bold">{joinedPool.discount / 10000}%</Text>
            </Flex>
            <Flex justifyContent="space-between" py={4}>
              <Text>
                {t('TRANSACTION_LIMIT_AMOUNT_MINUTES', {
                  minuteAmount: 30,
                })}
              </Text>
              <Text fontWeight="bold">{joinedPool.txLimit}</Text>
            </Flex>
            <Flex justifyContent="space-between" py={4}>
              <Text>{t('BALANCE')}</Text>
              <Text fontWeight="bold">
                {formatBalance(
                  joinedPool.amount,
                  { withSi: true, forceUnit: '-', withUnit: '' },
                  chainDecimal || 18
                )}
              </Text>
            </Flex>
          </Flex>
          <Flex justifyContent="center" px={5} py={4}>
            <Button
              size="sm"
              w={{ base: 'full', md: 80 }}
              variant="secondary"
              borderRadius="4xl"
              onClick={e => {
                e.stopPropagation();
                leavePool();
              }}
              isLoading={isSponsoredPoolLoading}
            >
              {t('LEAVE')}
            </Button>
          </Flex>
        </Card>
      )}
      <Card
        px={0}
        p={0}
        mb={8}
        mt={4}
        overflowX={{ sm: 'scroll', xl: 'hidden' }}
      >
        <Table size={tableSize} variant="simple" textAlign="center">
          <Thead>
            <Tr pl="0px">
              {React.Children.toArray(
                captions.map(caption => (
                  <Th
                    sx={(!caption.display && { display: 'none' }) || {}}
                    textAlign={caption.label === 'owner' ? 'left' : 'center'}
                    textTransform="capitalize"
                  >
                    {caption.label}
                  </Th>
                ))
              )}
            </Tr>
          </Thead>
          <Tbody justifyContent="flex-start">
            {!isLoading ? (
              <SponsoredPoolData
                setSelectedPoolDetail={setSelectedPoolDetail}
                sponsoredPools={sponsoredPools}
                setSelectedPool={setSelectedPool}
                setSelectedEditPool={setSelectedEditPool}
              />
            ) : (
              React.Children.toArray(
                SkeletonArray.map(() => (
                  <SkeletonLoadingRow columnAmount={columnAmount} />
                ))
              )
            )}
          </Tbody>

          {/* <TableCaption>{}</TableCaption> */}
        </Table>
      </Card>
      {children}

      <ModalEditPool
        pool={selectedEditPool}
        isOpen={!!selectedEditPool}
        onClose={() => {
          setSelectedEditPool(undefined);
        }}
      />
      <Modal
        isOpen={!!selectedPool}
        onClose={() => setSelectedPool(undefined)}
        scrollBehavior="inside"
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedPool?.id &&
              t('POOL_POOL_NAME', { poolName: shorten(selectedPool?.id) })}
          </ModalHeader>
          <ModalBody>
            <Text fontSize="md" fontWeight="normal" mb={4}>
              {t('SPONSORED_CONTRACTS')}
            </Text>
            <VStack alignItems="flex-start">
              {React.Children.toArray(
                selectedPool?.targets.map((target: string) => (
                  <InputGroup size="lg" w="full">
                    <Input value={shorten(target)} readOnly />
                    <InputRightAddon
                      cursor="pointer"
                      _hover={{
                        opacity: 0.8,
                      }}
                      bg="primary"
                      color="white"
                      fontSize="md"
                      fontWeight="bold"
                      onClick={copySuccessToast}
                    >
                      <CopyToClipboard text={target}>
                        <Icon aria-label="copy-button" color="white">
                          <path fill="currentColor" d={mdiContentCopy} />
                        </Icon>
                      </CopyToClipboard>
                    </InputRightAddon>
                  </InputGroup>
                ))
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              variant="transparent"
              mr={3}
              onClick={() => setSelectedPool(undefined)}
            >
              {t('CLOSE')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {selectedPoolDetail && (
        <Drawer
          autoFocus={false}
          isOpen={!!selectedPoolDetail}
          placement="bottom"
          onClose={onCloseDetail}
          returnFocusOnClose={false}
          onOverlayClick={onCloseDetail}
          size="md"
        >
          <DrawerOverlay />
          <DrawerContent bg="transparent">
            <Card px={0} py={4} sx={poolDetail}>
              <HStack
                px={5}
                py={4}
                borderBottom={`1px solid ${theme.colors.borderBottom}`}
              >
                <Avatar
                  mr={{ base: 0, md: 4 }}
                  w={{ base: 10, md: 14 }}
                  h={{ base: 10, md: 14 }}
                  name="Segun Adebayo"
                  src="/assets/layout/contract-img-1.png"
                />
                <VStack ml={0} alignItems="flex-start">
                  <Text fontWeight="bold" fontSize="md" minWidth="100%">
                    {shorten(selectedPoolDetail?.poolOwner || '')}
                  </Text>
                  <Text fontSize="xs">Games</Text>
                </VStack>
              </HStack>
              <Flex
                borderBottom={`1px solid ${theme.colors.borderBottom}`}
                px={5}
                py={4}
                direction="column"
              >
                <Flex py={4} justifyContent="space-between">
                  <Text>{t('DISCOUNT')}</Text>
                  <Text fontWeight="bold">
                    {selectedPoolDetail.discount / 10000}%
                  </Text>
                </Flex>
                <Flex justifyContent="space-between" py={4}>
                  <Text>
                    {t('TRANSACTION_LIMIT_AMOUNT_MINUTES', {
                      minuteAmount: 30,
                    })}
                  </Text>
                  <Text fontWeight="bold">{selectedPoolDetail.txLimit}</Text>
                </Flex>
                <Flex justifyContent="space-between" py={4}>
                  <Text>{t('BALANCE')}</Text>
                  <Text fontWeight="bold">
                    {formatBalance(
                      selectedPoolDetail.amount,
                      { withSi: true, forceUnit: '-', withUnit: '' },
                      chainDecimal || 18
                    )}
                  </Text>
                </Flex>
              </Flex>
              <Flex justifyContent="center" px={5} py={4}>
                {joinedPoolInfo?.ticketType.isCustom &&
                joinedPoolInfo?.ticketType.asCustom.asSponsored.toHuman() ===
                  selectedPoolDetail.id ? (
                  <Button
                    size="sm"
                    w={{ base: 'full', md: 80 }}
                    variant="solid"
                    borderRadius="4xl"
                    onClick={e => {
                      e.stopPropagation();
                      leavePool();
                    }}
                    isLoading={isSponsoredPoolLoading}
                  >
                    {t('LEAVE')}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    w={{ base: 'full', md: 80 }}
                    variant="solid"
                    borderRadius="4xl"
                    onClick={e => {
                      e.stopPropagation();
                      joinSponsoredPool(selectedPoolDetail.id);
                    }}
                    disabled={isJoinedPool}
                    isLoading={isSponsoredPoolLoading}
                  >
                    {t('JOIN')}
                  </Button>
                )}
              </Flex>
            </Card>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default SponsoredPoolTable;

const poolDetail = {
  h: '400px',
  borderRadius: '24px 24px 0px 0px',
};
