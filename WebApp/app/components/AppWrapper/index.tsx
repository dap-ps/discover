import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import React, { ReactNode } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponent from 'components/module-markup/LoadingComponent';
import { AppRoute } from 'routes';
import NavMenu from 'components/module-markup/NavMenu';


const styles = theme => createStyles({
  root: {
  },
  header:{
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
