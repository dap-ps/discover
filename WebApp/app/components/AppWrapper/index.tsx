import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import React, { ReactNode } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponent from 'components/module-markup/LoadingComponent';
import { AppRoute } from 'routes';
import NavMenu from 'components/module-markup/NavMenu';
import { Typography } from '@material-ui/core';
import SearchContainer from 'containers/modules/SearchContainer';
import { uiConstants } from 'theme';


const styles = theme => createStyles({
  root: {
  },
  header:{
    padding: "20px 10px",
    "& h2": {
      marginLeft: 5 + uiConstants.nav.burger.size + uiConstants.nav.position.left,
      fontSize: 17,
      fontWeight: 700
    }
  },
  content: {

  },
  footer: {
  }
});

interface Props extends WithStyles<typeof styles> {
  currentlySending: boolean;
  isConnected: boolean;
  children: ReactNode,
  navLinks: AppRoute[]
}

const AppWrapper: React.SFC<Props> = (props: Props) => {
  const {
    classes,
    children,
    currentlySending,
    navLinks
  } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavMenu navLinks={navLinks}/>
      <header className={classes.header}>
        <Typography variant="h1" component="h2">
          Discover
        </Typography>
        <SearchContainer />
      </header>
      <main className={classes.content}>
        {children}
      </main>
      <footer className={classes.footer}>

      </footer>
      <ToastContainer autoClose={5000} />
      <LoadingComponent loading={currentlySending} />
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(AppWrapper);
