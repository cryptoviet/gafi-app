import {
  Box,
  Button,
  Heading,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { mdiArrowRightThin } from '@mdi/js';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from 'components/card/Card';

interface IProp {
  title: string;
  subTitle: string;
  bannerBg: string;
  btnLink?: string;
}

const Banner: React.FC<IProp> = ({ title, subTitle, bannerBg, btnLink }) => {
  const { t } = useTranslation();

  const isDisplaySmallBtn = useBreakpointValue({
    sm: true,
    md: false,
    lg: true,
    xl: false,
  });
  return (
    <Card
      mb={4}
      sx={{ ...bannerStyled, bg: `url(${bannerBg}) no-repeat center` }}
    >
      <Box w="80%">
        <Heading
          data-testid="title"
          sx={{
            fontSize: { base: 'md', md: '4xl' },
          }}
        >
          {title}
        </Heading>
        <Text data-testid="sub-title" sx={subTitleStyled} fontSize="md">
          {subTitle}
        </Text>
      </Box>
      {btnLink && !isDisplaySmallBtn ? (
        <Button
          data-testid="show-more-button"
          as="a"
          variant="white"
          target="_blank"
          href={btnLink}
          mt={{ base: 8, md: 0 }}
          rightIcon={
            <Icon color="primary">
              <path fill="currentColor" d={mdiArrowRightThin} />
            </Icon>
          }
        >
          {t('MORE_DETAIL')}
        </Button>
      ) : (
        <IconButton
          data-testid="show-more-button"
          as="a"
          w={10}
          h={10}
          borderRadius="50%"
          aria-label="see-more-btn"
          target="_blank"
          href={btnLink}
          variant="white"
          icon={
            <Icon color="primary">
              <path fill="currentColor" d={mdiArrowRightThin} />
            </Icon>
          }
        />
      )}
    </Card>
  );
};

export default Banner;

const bannerStyled = {
  px: { base: 6, md: 8 },
  py: { base: 8, md: 12 },
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  bg: 'url(/assets/layout/upfront-banner-bg.png) no-repeat center',
  backgroundSize: 'cover',
  justifyContent: 'space-between',
  color: 'white',
};

const subTitleStyled = {
  width: { base: 48, md: '90%', '2xl': '70%' },
  mt: 4,
  color: 'white',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: { base: 'nowrap', md: 'normal' },
};
