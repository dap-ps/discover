import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { fade } from '@material-ui/core';
import { Inter, InterMedium, InterBold } from '../fonts/font-faces';

export const appColors = {
  general: {
    backgroundColor: "#ffffff",
    gray: {
      base: "#939ba1",
      light: "#eef2f5"
    }
  },
  sections:{
    exchange: {
      base: "#887af9"
    },
    marketplaces: {
      base: "#fe8f59"
    },
    collectibles: {
      base: "#51d0f0"
    },
    games: {
      base: "#d37ef4"
    },
    socialNetworks: {
      base: "#7cda00"
    },
    utilities: {
      base: "#fa6565"
    },
    other: {
      base: "#ffca0f"
    }
  }
}

export const brandColors = {
  default: {
    main: "#4360df",
    secondary: "#81e4da"
  },
}

export const uiConstants = {
  global:{
    animation:{
      speeds: {
        mutation: "200ms",
        movement: "400ms"
      }
    },
    nav:{
      position:{
        top: 20,
        left: 15
      },
      burger:{
        size: 40,
        patties:{
          height: 6,
          width: 16
        }
      }
    }
  },
  headerHeight: 50,
  footerHeight: 40,
  pageMargin: 40,
  modal:{
    modalWidthMax: 640,
    borderThickness: 1,
    borderColor: fade(brandColors.default.main, 0.8)
  }
}

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "'Inter'",
      "'sans-serif'"
    ].join(','),
  },
  palette: {
    type: 'light',
    background: {
      paper: '#ffffff',
      default: '#ffffff',
    },
    primary: {
      main: brandColors.default.main
    },
    secondary: {
      main: brandColors.default.main
    }
  },
  overrides:{
    MuiCssBaseline:{
      '@global':{
        '@font-face': [Inter, InterMedium, InterBold]
      }
    },
    MuiTypography:{
      h1:{
        fontSize: "3.5rem"
      },
      h2:{
        fontSize: "2rem"
      }
    }
  }

});

export default theme;
