import { Td, Tr, Text } from '@chakra-ui/react';
import React from 'react';

interface IProps {
  columnAmount: number;
}

const EmptyRow: React.FC<IProps> = ({ columnAmount }) => (
  <Tr>
    <Td colSpan={columnAmount}>
      <Text data-testid="empty-data" fontSize="2xl">
        Empty data!
      </Text>
    </Td>
  </Tr>
);

export default EmptyRow;
