import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';

import EmptyRow from 'components/EmptyRow';

describe('Empty row', () => {
  beforeEach(() => {
    render(
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <EmptyRow columnAmount={3} />
          </Tbody>
        </Table>
      </TableContainer>
    );
  });
  it('render emptyrow', () => {
    const text = screen.getByTestId('empty-data');
    expect(text.innerHTML).toBe('Empty data!');
  });
});
