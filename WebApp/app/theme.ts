import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { fade } from '@material-ui/core';
import { Inter, InterMedium, InterBold } from '../fonts/font-faces';

// TODO Extract colors into css variables, potentially inject via css baseline or theme provider
export const appColors = {
  general: {
    backgroundColor: '#ffffff',
    black: {
      base: '#000000',
    },
    gray: {
      base: '#939ba1',
      light: '#eef2f5',
      background: '#eceffc',
    },
    white: {
      base: '#ffffff',
    },
    blue: {
      base: '#4360df',
    },
    red: {
      base: '#fa6565',
    },
  },
  sections: {
    EXCHANGES: {
      base: '#887af9',
    },
    MARKETPLACES: {
      base: '#fe8f59',
    },
    COLLECTIBLES: {
      base: '#51d0f0',
    },
    GAMES: {
      base: '#d37ef4',
    },
    SOCIAL_NETWORKS: {
      base: '#7cda00',
    },
    UTILITIES: {
      base: '#fa6565',
    },
    OTHER: {
      base: '#ffca0f',
    },
  },
};

export const brandColors = {
  default: {
    main: '#4360df',
    secondary: '#81e4da',
  },
};

export const uiConstants = {
  global: {
    zIndex: {
      background: -1,
      page: 1,
      raisedElement: 100,
      front: 400,
      blocker: 1000,
    },
    mixins: {
      scrollBar: {
        scrollbarWidth: 'thin',
        scrollbarColor: `${brandColors.default.main} ${appColors.general.white.base}`,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: 11,
        },
        '&::-webkit-scrollbar-track': {
          borderRadius: 6,
          opacity: 0,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: brandColors.default.main,
          borderRadius: 6,
          border: `2px solid ${appColors.general.white.base}`,
        },
      },
    },
    animation: {
      speeds: {
        mutation: 200,
        movement: 400,
      },
    },
    fonts: {
      item: {
        headerSize: 15,
        bodySize: 13,
      },
    },
    headerHeight: 50,
    footerHeight: 40,
    pageMargin: 40,
  },
  banner: {
    itemsPerSlide: {
      large: 3,
      desktop: 3,
      tablet: 2,
      mobile: 1,
    },
    item: {
      minWidth: 360,
    },
  },
  modal: {
    modalWidthMax: 860,
    borderThickness: 1,
    borderColor: fade(brandColors.default.main, 0.8),
    margin: 20,
    padding: {
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 20,
      paddingBottom: 20,
    },
    close: {
      position: {
        top: 0,
        right: 0,
      },
      size: 35,
      lineThickness: 2,
      lineLength: 17,
      backgroundColor: appColors.general.gray.base,
      hoverColor: brandColors.default.main,
      lineColor: appColors.general.white.base,
    },
  },
  nav: {
    menu: {},
    position: {
      top: 10,
      left: 10,
    },
    burger: {
      size: 40,
      patties: {
        spacing: 5,
        height: 2,
        width: 16,
      },
    },
  },
  search: {
    position: {
      top: 10,
      right: 10,
    },
    input: {
      width: 260,
    },
  },
  carousel: {
    defaults: {
      slide: {
        height: 260,
        width: 360,
      },
    },
  },
  gridCarousel: {
    itemsPerSlide: {
      large: 12,
      desktop: 9,
      tablet: 6,
      mobile: 4,
    },
  },
  dapps: {
    card: {
      iconSize: 40,
      reviewedSize: 24,
      iconMargin: 25,
    },
  },
};

const theme = createMuiTheme({
  typography: {
    fontFamily: ["'Inter'", "'sans-serif'"].join(','),
  },
  palette: {
    type: 'light',
    background: {
      paper: '#ffffff',
      default: '#ffffff',
    },
    primary: {
      main: brandColors.default.main,
    },
    secondary: {
      main: brandColors.default.main,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [Inter, InterMedium, InterBold],
      },
    },
    MuiButton: {
      outlined: {
        textTransform: 'unset',
        backgroundColor: brandColors.default.main,
        borderRadius: 48,
        color: appColors.general.white.base,
        border: 'none',
        '&:hover': {
          backgroundColor: fade(brandColors.default.main, 0.8),
        },
      },
    },
    MuiTypography: {
      h1: {
        fontSize: 17,
        fontWeight: 600,
      },
      h2: {
        fontSize: 15,
        fontWeight: 600,
      },
      h3: {
        fontSize: 13,
        fontWeight: 500,
      },
    },
    MuiLink: {
      root: {
        color: brandColors.default.main,
        textDecoration: 'none',
      },
    },
  },
});

export default theme;
