import {
  Box,
  Button,
  chakra,
  HStack,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { mdiPlus } from '@mdi/js';
import { isValidMotionProp, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryParam } from 'use-query-params';

import ModalAddSponsoredPool from './components/ModalAddSponsoredPool';
import SponsoredPoolTable from './components/SponsoredPoolTable';

import Banner from 'components/Banner';
import featureFlag from 'components/FeatureFlags';
import Pagination from 'components/pagination';
import { getGAKIAccountAddress } from 'components/utils';
import client from 'graphQL/client';
import {
  Scalars,
  SponsoredPool,
  useSponsoredPoolsQuery,
} from 'graphQL/generates';
import { useSubstrateState } from 'substrate-lib';
import * as constants from 'utils/constants';

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children',
});

const SponsoredPoolPage: React.FC = () => {
  const { t } = useTranslation();
  const [type, setType] = useQueryParam('type');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const { currentAccount } = useSubstrateState();
  const isOwned = type === 'owned';

  // Example for query data from graphql.

  const {
    data: sponsoredPoolData,
    refetch,
    isLoading,
  } = useSponsoredPoolsQuery(
    client,
    {
      first: constants.SPONSORED_POOL_AMOUNT_PER_PAGE,
      offset: isOwned
        ? 0
        : (currentPage - 1) * constants.SPONSORED_POOL_AMOUNT_PER_PAGE,
      filter: isOwned
        ? {
            poolOwner: {
              equalTo: currentAccount?.addressRaw
                ? getGAKIAccountAddress(currentAccount?.addressRaw)
                : '',
            },
          }
        : undefined,
    },
    { enabled: !!currentAccount?.addressRaw }
  );
  const sponsoredPools = sponsoredPoolData
    ? (sponsoredPoolData.sponsoredPools?.nodes as SponsoredPool[])
    : [];
  const totalCount = sponsoredPoolData?.sponsoredPools
    ?.totalCount as Scalars['Int'];
  const totalPage = Math.ceil(
    totalCount / constants.SPONSORED_POOL_AMOUNT_PER_PAGE
  );
  const pageNumberOfNewPool = Math.ceil(
    (totalCount + 1) / constants.SPONSORED_POOL_AMOUNT_PER_PAGE
  );

  return (
    <ChakraBox
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      // @ts-ignore
      transition={{ duration: 0.5 }}
    >
      {featureFlag.isDisplayNewDashboardUI ? (
        <>
          <Banner
            title={t('POOL.SPONSORED_POOL')}
            subTitle={t('POOL_DESCRIPTION.SPONSORED_POOL')}
            bannerBg="/assets/layout/sponsored-banner-bg.png"
            btnLink="https://wiki.gafi.network/learn/sponsored-pool"
          />
          <HStack justifyContent="flex-end">
            <Button
              size="sm"
              variant="primary"
              fontWeight="bold"
              rightIcon={
                <Icon w={18} h={18}>
                  <path fill="currentColor" d={mdiPlus} />
                </Icon>
              }
              onClick={onOpen}
            >
              {t('ADD_POOL')}
            </Button>
          </HStack>
          <SponsoredPoolTable
            title="Sponsored Pools"
            captions={[
              { label: t('OWNER'), fieldName: 'poolOwner' },
              { label: t('DISCOUNT'), fieldName: 'discount' },
              {
                label: t('TRANSACTION_LIMIT_AMOUNT_MINUTES', {
                  minuteAmount: 30,
                }),
                fieldName: 'txLimit',
              },
              { label: t('BALANCE'), fieldName: 'amount' },
              { label: t('ACTIONS'), fieldName: 'actions' },
            ]}
            sponsoredPools={sponsoredPools}
            limitRow={constants.SPONSORED_POOL_AMOUNT_PER_PAGE}
            isLoading={isLoading}
          >
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalCount={totalCount}
              resultsPerPage={constants.SPONSORED_POOL_AMOUNT_PER_PAGE}
              totalPage={totalPage}
              isLoading={isLoading}
            />
          </SponsoredPoolTable>
          {isOpen && (
            <ModalAddSponsoredPool
              setCurrentPage={setCurrentPage}
              pageNumberOfNewPool={pageNumberOfNewPool}
              isOpen={isOpen}
              onClose={onClose}
              refetch={refetch}
            />
          )}
        </>
      ) : (
        <Box pt={{ base: '120px', md: '75px' }}>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold" fontSize="2xl" mb={5}>
              {t('POOL.SPONSORED_POOL')}
            </Text>
            <Button
              background="primary"
              variant="solid"
              leftIcon={
                <Icon>
                  <path fill="currentColor" d={mdiPlus} />
                </Icon>
              }
              onClick={onOpen}
            >
              {t('ADD_POOL')}
            </Button>
          </HStack>
          <SponsoredPoolTable
            title="Sponsored Pools"
            captions={[
              { label: t('OWNER'), fieldName: 'poolOwner' },
              { label: t('DISCOUNT'), fieldName: 'discount' },
              {
                label: t('TRANSACTION_LIMIT_AMOUNT_MINUTES', {
                  minuteAmount: 30,
                }),
                fieldName: 'txLimit',
              },
              { label: t('BALANCE'), fieldName: 'amount' },
              { label: '', fieldName: '' },
            ]}
            sponsoredPools={sponsoredPools}
            limitRow={constants.SPONSORED_POOL_AMOUNT_PER_PAGE}
            isLoading={isLoading}
          >
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalCount={totalCount}
              resultsPerPage={constants.SPONSORED_POOL_AMOUNT_PER_PAGE}
              totalPage={totalPage}
              isLoading={isLoading}
            />
          </SponsoredPoolTable>
          {isOpen && (
            <ModalAddSponsoredPool
              setCurrentPage={setCurrentPage}
              pageNumberOfNewPool={pageNumberOfNewPool}
              isOpen={isOpen}
              onClose={onClose}
              refetch={refetch}
            />
          )}
        </Box>
      )}
    </ChakraBox>
  );
};

export default SponsoredPoolPage;
