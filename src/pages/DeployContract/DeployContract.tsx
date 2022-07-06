import { Button, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { mdiContentCopy } from '@mdi/js';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';

import Dropzone from './components/Dropzone';

import Banner from 'components/Banner';
import Card from 'components/card/Card';
import useDeploy from 'hooks/useDeploy';
import useMessageToast from 'hooks/useMessageToast';
import { shorten } from 'utils';

const DeployContract = () => {
  const [contractFiles, setContractFiles] = useState<any>([]);
  const { copySuccessToast } = useMessageToast();
  const { t } = useTranslation();
  const { deploy, contractAddresses, txnFee, isLoading, isConnected } =
    useDeploy();

  return (
    <>
      <Banner
        title={t('DEPLOY_CONTRACT')}
        subTitle={t('DEPLOY_CONTRACT_DESCRIPTION')}
        bannerBg="/assets/layout/deploycontract-banner.png"
        btnLink="https://wiki.gafi.network/learn/demo"
      />
      <Card>
        <VStack gap={4}>
          <Dropzone
            onUploadFile={files =>
              setContractFiles((prevContractFiles: any) => [
                ...prevContractFiles,
                ...files,
              ])
            }
          />
          {contractAddresses.length && (
            <Card
              bg="greyBg"
              width={{ base: 'full', md: '50%' }}
              boxShadow="none"
              border="1px dashed #B4CAFF"
              alignItems="center"
            >
              {contractAddresses.map(contractAddress => (
                <HStack mb={3}>
                  <Text>{shorten(contractAddress)}</Text>
                  <CopyToClipboard text={contractAddress}>
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
              ))}
              {txnFee && (
                <Text
                  sx={{
                    span: {
                      color: 'primary',
                      fontWeight: 'bold',
                    },
                  }}
                >
                  {t('TOTAL_TRANSACTION_FEE')}{' '}
                  <span>{(txnFee / 10 ** 18).toFixed(5)}</span>
                </Text>
              )}
            </Card>
          )}

          <VStack gap={2}>
            <Button
              px={8}
              colorScheme="greyBg"
              onClick={() => {
                deploy(contractFiles);
              }}
              isLoading={isLoading}
              disabled={contractFiles.length === 0 || !isConnected()}
            >
              {t('DEPLOY')}
            </Button>
          </VStack>
        </VStack>
      </Card>
    </>
  );
};

export default DeployContract;
