import { Icon, Text } from '@chakra-ui/react';
import { mdiCloudUploadOutline } from '@mdi/js';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

import Card from 'components/card/Card';

interface DropzoneProps {
  onUploadFile: React.Dispatch<React.SetStateAction<any>>;
}

const Dropzone: React.FC<DropzoneProps> = ({ onUploadFile }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { t } = useTranslation();
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        if (acceptedFiles.length + files.length > 5) {
          return;
        }
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
        const filesParsed = await Promise.all(
          acceptedFiles.map(async acceptedFile =>
            JSON.parse(await acceptedFile.text())
          )
        );
        onUploadFile(filesParsed);
      }
      // Do something with the files
    },
    [files.length, onUploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 5,
    accept: 'application/json',
  });

  const fileList = files.map(file => (
    <Text textAlign="center">{`${file.name} - ${file.size / 1024} kb`}</Text>
  ));

  return (
    <Card
      {...getRootProps()}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        cursor: 'pointer',
        background: 'greyBg',
        boxShadow: 'none',
        borderRadius: '2xl',
        py: { base: 8, md: 12, '2xl': 16 },
        px: { base: 8 },
      }}
    >
      <input {...getInputProps()} />
      <Icon mb={4} color="primary" w={40} h={30}>
        <path fill="currentColor" d={mdiCloudUploadOutline} />
      </Icon>
      {isDragActive ? (
        <Text color="gray.500">{t('DROP_THE_FILES_HERE')}</Text>
      ) : (
        <Text
          sx={{
            textAlign: 'center',
            color: 'black',
            span: {
              color: 'primary',
            },
          }}
        >
          <span>Drag &amp; drop</span> contract files here, or click to select
          files.
        </Text>
      )}
      {React.Children.toArray(
        fileList.map(file => (
          <Text mt={3} color="grey">
            {t('FILE_FILE_NAME', {
              fileName: file.props.children,
            })}
          </Text>
        ))
      )}
    </Card>
  );
};

export default Dropzone;
