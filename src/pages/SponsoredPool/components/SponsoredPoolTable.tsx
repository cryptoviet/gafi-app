// Chakra imports
import {
  Box,
  Button,
  chakra,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { mdiContentCopy } from '@mdi/js';
import { AnimateSharedLayout, isValidMotionProp, motion } from 'framer-motion';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';

import SponsoredPoolTableRow from './SponsoredPoolTableRow';

import Card from 'components/card/Card';
import CardBody from 'components/card/CardBody';
import CardHeader from 'components/card/CardHeader';
import EmptyRow from 'components/EmptyRow';
import featureFlag from 'components/FeatureFlags';
import SkeletonLoadingRow from 'components/SkeletonLoadingRow';
import { shorten } from 'components/utils';
import { SponsoredPool } from 'graphQL/generates';
import useMessageToast from 'hooks/useMessageToast';

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
}

interface ISponsoredPoolTableProps {
  title: string;
  captions: TableCaption[];
  sponsoredPools: SponsoredPool[];
  children: React.ReactNode;
  limitRow: number;
  isLoading: boolean;
}

const ChakraTbody = chakra(motion.tbody, {
  /**
   * Allow motion props and the children prop to be forwarded.
   * All other chakra props not matching the motion props will still be forwarded.
   */
  shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children',
});

const SponsoredPoolTable = (props: ISponsoredPoolTableProps) => {
  const { t } = useTranslation();
  const { title, captions, sponsoredPools, children, limitRow, isLoading } =
    props;
  const { copySuccessToast } = useMessageToast();
  const textColor = useColorModeValue('gray.700', 'white');
  const [selectedPool, setSelectedPool] = useState<SponsoredPool | undefined>();
  const SkeletonArray = new Array(limitRow).fill(0);
  return (
    <>
      {featureFlag.isDisplayNewDashboardUI ? (
        <>
          <Card p={0} mb={8} mt={4} overflowX={{ sm: 'scroll', xl: 'hidden' }}>
            <Table variant="simple" textAlign="center" color={textColor}>
              <Thead>
                <Tr pl="0px" color="gray.400">
                  {React.Children.toArray(
                    captions.map(caption => (
                      <Th
                        color="gray.400"
                        fontSize="md"
                        lineHeight="10"
                        fontWeight="normal"
                        textAlign={
                          caption.label === 'owner' ? 'left' : 'center'
                        }
                        sx={{
                          textTransform: 'capitalize',
                        }}
                      >
                        {caption.label}
                      </Th>
                    ))
                  )}
                </Tr>
              </Thead>
              <AnimateSharedLayout>
                {!isLoading ? (
                  sponsoredPools.length ? (
                    <ChakraTbody
                      layoutId="table-rows"
                      // @ts-ignore
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      cursor="pointer"
                      justifyContent="flex-start"
                    >
                      {React.Children.toArray(
                        sponsoredPools.map(pool => (
                          <SponsoredPoolTableRow
                            pool={pool}
                            onClick={() => setSelectedPool(pool)}
                          />
                        ))
                      )}
                    </ChakraTbody>
                  ) : (
                    <EmptyRow columnAmount={6} />
                  )
                ) : (
                  <ChakraTbody
                    layoutId="table-rows"
                    // @ts-ignore
                    transition={{ delay: 0.3 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    cursor="pointer"
                    justifyContent="flex-start"
                  >
                    {React.Children.toArray(
                      SkeletonArray.map(() => (
                        <SkeletonLoadingRow columnAmount={limitRow} />
                      ))
                    )}
                  </ChakraTbody>
                )}
              </AnimateSharedLayout>

              {/* <TableCaption>{}</TableCaption> */}
            </Table>
          </Card>
          {children}
        </>
      ) : (
        <Card overflowX={{ sm: 'scroll', xl: 'hidden' }}>
          <CardHeader p="6px 0px 22px 0px">
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              {title}
            </Text>
          </CardHeader>

          <CardBody>
            <Table variant="simple" textAlign="center" color={textColor}>
              <TableCaption>{children}</TableCaption>
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400">
                  {React.Children.toArray(
                    captions.map(caption => (
                      <Th color="gray.400">{caption.label}</Th>
                    ))
                  )}
                </Tr>
              </Thead>
              <Tbody justifyContent="flex-start">
                {!isLoading ? (
                  sponsoredPools.length ? (
                    React.Children.toArray(
                      sponsoredPools.map(pool => (
                        <SponsoredPoolTableRow
                          pool={pool}
                          onClick={() => setSelectedPool(pool)}
                        />
                      ))
                    )
                  ) : (
                    <EmptyRow columnAmount={6} />
                  )
                ) : (
                  React.Children.toArray(
                    SkeletonArray.map(() => (
                      <SkeletonLoadingRow columnAmount={limitRow} />
                    ))
                  )
                )}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      )}
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
    </>
  );
};

export default SponsoredPoolTable;
