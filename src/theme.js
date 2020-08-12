import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: '"Noto Sans", Roboto, Helvetica, Arial, sans-serif',
    button: {
      textTransform: 'none',
    },
    h1: {
      fontSize: 40,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    h4: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    overline: {
      textTransform: 'none',
    },
  },
})

export default {
  ...theme,
  overrides: {
    MuiButton: {
      root: {
        lineHeight: 1,
        minWidth: 24,
        borderRadius: 0,
      },
    },
    MuiIconButton: {
      root: {
        padding: 4
      }
    }
  },
}
