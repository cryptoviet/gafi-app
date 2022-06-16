import { Box, Heading, Icon, Image, Text, CSSObject } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import Card from 'components/card/Card';
import routes from 'routes';

const SideBar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const activeRoute = (routeName: string) =>
    location.pathname === routeName ? 'active' : '';

  return (
    <Card sx={sidebarStyled}>
      <Box sx={sidebarHead}>
        <Image src="/assets/layout/logo.svg" alt="Gafi logo" />
        <Heading display={{ '2xl': 'block', xl: 'none' }} ml={4}>
          GAFI
        </Heading>
      </Box>
      <Box>
        {React.Children.toArray(
          routes.map(route => (
            <NavLink to={route.layout + route.path}>
              <Box
                sx={
                  activeRoute(route.layout + route.path) === 'active'
                    ? { ...activeMenuItem, ...menuItem }
                    : menuItem
                }
              >
                <Icon w={18} h={18}>
                  <path fill="currentColor" d={route.icon} />
                </Icon>
                <Text
                  display={{ '2xl': 'block', xl: 'none' }}
                  fontWeight="semibold"
                  fontSize="md"
                  ml={7}
                >
                  {t(route.name)}
                </Text>
              </Box>
            </NavLink>
          ))
        )}
      </Box>
      <Text
        display={{ '2xl': 'block', xl: 'none' }}
        mt={20}
        opacity="inherit"
        fontSize="sm"
      >
        &copy; copyright by cryptoviet
      </Text>
    </Card>
  );
};

export default SideBar;

const sidebarStyled: CSSObject = {
  minWidth: { '2xl': '360px', xl: '120px' },
  w: { '2xl': '360px', xl: '120px' },
  alignItems: 'center',
  py: 10,
};

const sidebarHead = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  mb: { '2xl': 20, xl: 10 },
  pl: { '2xl': 8, xl: 4 },
};

const menuItem = {
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'flex-start',
  borderRadius: 48,
  alignItems: 'center',
  px: 8,
  py: 6,
};
const activeMenuItem = {
  background: 'greyBg',
  color: 'primary',
  fontWeight: 'semibold',
};

const menuStyled = {
  width: '100%',
};
