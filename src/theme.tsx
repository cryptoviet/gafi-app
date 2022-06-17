import { color, ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/theme-tools';
import { mode, createBreakpoints } from '@chakra-ui/theme-tools';

import featureFlags from './components/FeatureFlags';

const Card: ComponentStyleConfig = {
  baseStyle: {
    p: { base: 2, lg: 4, xl: 6 },
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    minWidth: '0px',
    wordWrap: 'break-word',
    backgroundClip: 'border-box',
    bg: '#FFFFFF',
  },
  variants: {
    panel: (props: StyleFunctionProps) => ({
      bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
      width: '100%',
      boxShadow: '3px 4px 10px rgba(0, 0, 0, 0.05)',
      borderRadius: 'var(--chakra-radii-2xl)',
    }),
    dashed: (props: StyleFunctionProps) => ({
      border: '1px dashed #B4CAFF',
      bg: props.colorMode === 'dark' ? 'gray.700' : colors.greyBg,
      width: '100%',
      borderRadius: 'var(--chakra-radii-2xl)',
    }),
    solid: (props: StyleFunctionProps) => ({
      bg: props.colorMode === 'dark' ? 'gray.700' : colors.greyBg,
      width: '100%',
      borderRadius: 'var(--chakra-radii-2xl)',
      border: '2px dashed #EEF1FF',
      boxShadow: 'none',
    }),
  },
  defaultProps: {
    variant: 'panel',
  },
};

const CardBody: ComponentStyleConfig = {
  baseStyle: {
    display: 'flex',
    width: '100%',
  },
};

const CardHeader: ComponentStyleConfig = {
  baseStyle: {
    display: 'flex',
    width: '100%',
  },
};

const MainPanel: ComponentStyleConfig = {
  baseStyle: {
    float: 'right',
    maxWidth: '100%',
    overflow: 'auto',
    position: 'relative',
    maxHeight: '100%',
    transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
    transitionDuration: '.2s, .2s, .35s',
    transitionProperty: 'top, bottom, width',
    transitionTimingFunction: 'linear, linear, ease',
  },
  variants: {
    main: (props: StyleFunctionProps) => ({
      float: 'right',
    }),
    rtl: (props: StyleFunctionProps) => ({
      float: 'left',
    }),
  },
  defaultProps: {
    variant: 'main',
  },
};

const PanelContainer: ComponentStyleConfig = {
  baseStyle: {
    p: '30px 15px',
    minHeight: 'calc(100vh - 123px)',
  },
};

const PanelContent: ComponentStyleConfig = {
  baseStyle: {
    ms: 'auto',
    me: 'auto',
    ps: '15px',
    pe: '15px',
  },
};

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '740px',
  lg: '1024px',
  xl: '1200px',
});

const colors = {
  primary: '#2667FF',
  secondary: '#64DFDF',
  greyBg: '#F5F7FB',
  gradientColor1: '#56CCF2',
  gradientColor2: '#3860FF',
  btnHover: 'rgba(255, 255, 255, 0.25)',
};

export const theme = extendTheme(
  featureFlags.isDisplayNewDashboardUI
    ? {
        breakpoints,
        styles: {
          global: (props: StyleFunctionProps) => ({
            '#root': {
              position: 'relative',
              minHeight: '100vh',
              bg: mode('gray.50', 'gray.800')(props),
            },
          }),
        },
        colors,
        components: {
          Card,
          CardBody,
          CardHeader,
          MainPanel,
          PanelContainer,
          PanelContent,
          Link: {
            variants: {
              'no-underline': {
                _hover: {
                  textDecoration: 'none',
                },
                height: 10,
                minWidth: 10,
                paddingInlineStart: 4,
                paddingInlineEnd: 4,
                display: 'inline-flex',
                alignItems: 'center',
              },
            },
          },
          Button: {
            baseStyle: {
              lineHeight: 6,
              fontSize: 'md',
              fontWeight: 'normal',
              borderRadius: '32px',
              color: 'white',
              '&:hover': {
                opacity: 0.8,
              },
            },
            sizes: {
              sm: {
                h: '40px',
                fontSize: 'md',
                px: 4,
                borderRadius: '8px',
                fontWeight: 'bold',
              },
              xl: {
                h: '56px',
                fontSize: 'lg',
                px: 8,
              },
            },
            variants: {
              solid: {
                fontWeight: 'bold',
                fontSize: 'md',
                bg: `linear-gradient(97.48deg, ${colors.gradientColor1} -9.59%, ${colors.gradientColor2} 107.41%)`,
              },
              ghost: {
                bg: colors.greyBg,
                px: 10,
                py: 5,
                fontSize: 'md',
                fontWeight: 'normal',
                '&:hover': {
                  bg: 'gray.200',
                },
              },
              white: {
                bg: 'white',
                color: 'black',
              },
              primary: {
                bg: colors.primary,
                color: 'white',
              },
              secondary: {
                bg: colors.secondary,
                opacity: 0.8,
                '&:hover': {
                  opacity: 1,
                },
              },
              outline: {
                bg: 'white',
                color: colors.primary,
                border: `2px solid ${colors.primary}`,
                '&:hover': {
                  bg: colors.primary,
                  color: 'white',
                },
              },
              transparent: {
                bg: 'transparent',
                color: 'black',
              },
            },
            defaultProps: {
              size: 'xl',
              variant: 'solid',
              colorScheme: colors.primary,
            },
          },
          Text: {
            baseStyle: {
              fontSize: 'md',
              fontWeight: 'normal',
            },
            sizes: {},
            variants: {},
            defaultProps: {},
          },
          Menu: {
            baseStyle: () => ({
              list: {
                bg: `linear-gradient(227.25deg, ${colors.gradientColor2} 2.24%, ${colors.gradientColor1} 127.36%)`,
                border: 'none',
                borderRadius: '3xl',
                p: { base: 2, md: 6, xl: 8 },
              },
              item: {
                _focus: { bg: colors.btnHover, fontWeight: 'bold' },
                py: { base: 2, xl: 3 },
                px: { base: 2, md: 6, xl: 8 },
                m: 0,
                borderRadius: '3xl',
                color: 'white',
                mb: { base: 1, xl: 2 },
              },
            }),
          },
          Modal: {
            baseStyle: () => ({
              dialog: {
                borderRadius: '2xl',
                p: 8,
              },
              header: {
                p: 0,
                color: colors.primary,
                mb: 10,
                fontWeight: 'bold',
                fontSize: '2xl',
                fontHeight: 9,
              },
              body: {
                p: 0,
              },
              footer: {
                p: 0,
                mt: 10,
              },
            }),
          },
        },
      }
    : {
        breakpoints,
        styles: {
          global: (props: StyleFunctionProps) => ({
            '#root': {
              position: 'relative',
              minHeight: '100vh',
              bg: mode('gray.50', 'gray.800')(props),
            },
          }),
        },
        colors: { primary: '51c8c5' },
        components: {
          Card,
          CardBody,
          CardHeader,
          MainPanel,
          PanelContainer,
          PanelContent,
          Link: {
            variants: {
              'no-underline': {
                _hover: {
                  textDecoration: 'none',
                },
                height: 10,
                minWidth: 10,
                paddingInlineStart: 4,
                paddingInlineEnd: 4,
                display: 'inline-flex',
                alignItems: 'center',
              },
            },
          },
        },
      }
);
