import {
  Box,
  Button,
  HStack,
  InputGroup,
  NumberInput as ChakraNumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { cast } from 'utils/utils';

interface Props {
  value: string | number;
  onChange: (value: string | number) => void;
  max: number;
}

const NumberInput: React.FC<Props> = ({ value, onChange, max }) => {
  const { t } = useTranslation();
  return (
    <HStack spacing={0}>
      <InputGroup size="lg" overflow="hidden">
        <ChakraNumberInput
          width="100%"
          keepWithinRange
          precision={3}
          min={0}
          value={value}
          onChange={valueAsString => {
            if (!valueAsString) {
              onChange(0);
              return;
            }
            onChange(valueAsString);
          }}
          onBlur={e => {
            const value = cast(e.target.value, 1, 3);
            const maxValue = Number(cast(max.toString(), 1, 3));
            if (value) {
              Number(value) > maxValue
                ? onChange(maxValue)
                : onChange(Number(value));
            }
          }}
          clampValueOnBlur={false}
        >
          <NumberInputField
            sx={{
              borderRadius: '0.375rem 0 0 0.375rem',
            }}
            paddingX="4"
          />
        </ChakraNumberInput>
      </InputGroup>
      <Box h={12}>
        <Button
          variant="primary"
          sx={{
            borderRadius: '0 0.375rem 0.375rem 0',
            height: '100%',
            px: 4,
          }}
          onClick={() => onChange(Number(cast(max.toString(), 1, 4)))}
        >
          {t('MAX')}
        </Button>
      </Box>
    </HStack>
  );
};

export default NumberInput;
