import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { fade } from '@material-ui/core';
import { Inter, InterMedium, InterBold } from '../fonts/font-faces';

export const appColors = {
  general: {
    backgroundColor: "#ffffff",
    black: {
      base: "#000000",
    },
    gray: {
      base: "#939ba1",
      light: "#eef2f5"
    },
    white:{
      base: "#ffffff"
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
    headerHeight: 50,
    footerHeight: 40,
    pageMargin: 40,
  },
  modal:{
    modalWidthMax: 640,
    borderThickness: 1,
    borderColor: fade(brandColors.default.main, 0.8)
  },
  nav:{
    menu:{
    },
    position:{
      top: 10,
      left: 10
    },
    burger:{
      size: 40,
      patties:{
        spacing: 5,
        height: 2,
        width: 16
      }
    }
  },
  search: {
    position: {
      top: 10,
      right: 10
    },
    input: {
      width: 260
    }
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
