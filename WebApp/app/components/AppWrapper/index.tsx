import CssBaseline from '@material-ui/core/CssBaseline';
import React, { ReactNode } from 'react';
import { Typography } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import NavMenu from 'components/views/modules/NavMenu';
import routes, { AppRoute } from 'routes';
import { Switch, Route, Link } from 'react-router-dom';

import { uiConstants, appColors } from 'theme';
import DappIcon from '../../images/icons/add-dapp.svg';
import CommunityIcon from '../../images/icons/community.svg';
import SupportIcon from '../../images/icons/support.svg';

import SearchContainer from 'containers/modules/SearchContainer';

import LoadingComponent from 'components/views/modules/LoadingComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'components/theme/elements/Modal';
import TransactionStatus from 'components/views/modules/TransactionStatus';
import ChangeNetworkIndicator from 'components/views/modules/ChangeNetworkIndicator';
import { ROUTE_LINKS } from 'routeLinks';

const iconSize = 40;
const styles = ({breakpoints}) =>
  createStyles({
    root: {},
    header: {
      padding: '25px 10px',
      '& h2': {
        marginLeft:
          5 + uiConstants.nav.burger.size + uiConstants.nav.position.left,
        fontSize: 17,
        fontWeight: 700,
      },
    },
    content: {},
    footer: {
      backgroundColor: appColors.general.gray.light,
      padding: 32,
      "& > section": {
        display: "flex",
        [breakpoints.down(600)]: {
          flexDirection: "column"
        },
        "& > *": {
          width: 0,
          flex: "1 1 0",
          [breakpoints.down(600)]: {
            width: "initial",
            flex: "initial"
          },
        } 
      }
    },
    footerItem: {
      textDecoration: 'none',
      color: 'unset',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: '15px 0',
      '& div:first-child': {
        display: 'block',
        width: iconSize,
        height: iconSize,
        backgroundColor: appColors.general.gray.base,
        borderRadius: 200,
        position: 'relative',
        '& svg': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      },
      '& div:last-child': {
        maxWidth: `calc(100% - ${iconSize + 15}px)`,
        paddingLeft: 15,
      },
      '& h5': {
        fontSize: uiConstants.global.fonts.item.headerSize,
        fontWeight: 500,
      },
      '& p': {
        fontSize: uiConstants.global.fonts.item.bodySize,
        color: appColors.general.gray.base,
      },
    },
  });

interface Props extends WithStyles<typeof styles> {
  currentlySending: boolean;
  isConnected: boolean;
  children: ReactNode;
  navLinks: AppRoute[];
  modalComponent?: React.ComponentType<any>;
}

const AppWrapper: React.FC<Props> = ({
  classes,
  children,
  currentlySending,
  navLinks,
}: Props) => {
  return (
    <div className={classes.root}>
      <CssBaseline />
      <TransactionStatus />
      <NavMenu navLinks={navLinks} />
      <header className={classes.header}>
        <Typography variant="h1" component="h2">
          Discover
        </Typography>
        <SearchContainer />
      </header>
      <main className={classes.content}>{children}</main>
      <footer className={classes.footer}>
        <section>
          <a
            href="https://join.status.im/chat/public/dap-ps"
            target="_blank"
            className={classes.footerItem}
          >
            <div>
              <CommunityIcon />
            </div>
            <div>
              <Typography variant="h5" component="h5">
                Join the DApp community chat
              </Typography>
              <Typography variant="body1" component="p">
                Status is a worldwide community committed to web3. Come discuss
                your new favourite DApp with us.
              </Typography>
            </div>
          </a>
          <Link to={ROUTE_LINKS.CreateDApp} className={classes.footerItem}>
            <div>
              <DappIcon />
            </div>
            <div>
              <Typography variant="h5" component="h5">
                Submit a DApp
              </Typography>
              <Typography variant="body1" component="p">
                Submit your favourite DApp now! No permission required.
              </Typography>
            </div>
          </Link>
          <a
            href="https://join.status.im/chat/public/status-core-dapps"
            target="_blank"
            className={classes.footerItem}
          >
            <div>
              <SupportIcon />
            </div>
            <div>
              <Typography variant="h5" component="h5">
                Support
              </Typography>
              <Typography variant="body1" component="p">
                Can't find what you're looking for? Reach out and we'll see if
                we can help.
              </Typography>
            </div>
          </a>
        </section>
      </footer>
      <ToastContainer autoClose={5000} />
      <LoadingComponent loading={currentlySending} />
      <ChangeNetworkIndicator />
      <Switch>
        {routes.map(({ path, modalComponent }) => (
          <Route
            exact
            path={path}
            key={`modal-switch-${path}`}
            render={(props) => (
              <Modal>
                {modalComponent && React.createElement(modalComponent, {})}
              </Modal>
            )}
          />
        ))}
      </Switch>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(AppWrapper);
