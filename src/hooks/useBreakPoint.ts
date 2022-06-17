import { useBreakpointValue } from '@chakra-ui/react';

const useBreakPoint = () => {
  const device = useBreakpointValue({
    base: 'mobile',
    md: 'tablet',
    lg: 'desktop',
  });
};

export default useBreakPoint;
