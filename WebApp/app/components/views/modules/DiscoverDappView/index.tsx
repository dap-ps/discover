/**
 *
 * DiscoverDappView
 *
 */

import React, { Fragment } from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Typography,
  Button,
} from '@material-ui/core';
import { IDapp } from 'domain/Dapps/types';
import { DAPP_STATUS } from 'utils/constants';
import { appColors, brandColors, uiConstants } from 'theme';
import ReviewBadgeIcon from '../../../../images/icons/reviewBadge.svg';
import { generateUri } from 'api/apiUrlBuilder';
import RankingModule from '../RankingModule';
import LoadingIcon from 'components/theme/elements/LoadingIcon';
import { useSelector, useDispatch } from 'react-redux';
import { makeSelectWalletAddress } from 'domain/Wallet/selectors';
import { AddressZero } from 'ethers/constants';
import classNames from 'classnames';
import { connectAccountAction } from 'domain/Wallet/actions';
import { ROUTE_LINKS } from 'routeLinks';
import { forwardTo } from 'utils/history';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      [theme.breakpoints.up('sm')]: {
        minWidth: 400,
      },
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `20px 0`,
      borderBottom: `1px solid ${appColors.general.gray.background}`,
      '& > *': {},
      '& h1': {
        marginTop: 15,
        fontSize: 22,
        fontWeight: 600,
      },
      '& h2': {
        fontSize: 16,
        fontWeight: 400,
        textTransform: 'capitalize',
        marginBottom: 15,
      },
      '& a': {
        textDecoration: 'none',
      },
    },
    logo: {
      boxShadow: '0 4px 12px rgba(0,34,51,.08), 0 2px 4px rgba(0,34,51,.16)',
      height: 100,
      width: 100,
      borderRadius: '50%',
      '& img': {
        objectFit: 'contain',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: '50%',
      },
    },
    button: {
      textDecoration: 'none',
    },
    section: {
      padding: `10px 20px`,
      borderBottom: `1px solid ${appColors.general.gray.background}`,
      '&:last-child': {
        borderBottom: `none`,
      },
      '& h4': {
        fontSize: 13,
        color: appColors.general.gray.base,
        marginBottom: 4,
      },
      '& a': {
        color: brandColors.default.main,
        textDecoration: 'none',
        fontSize: 16,
      },
    },
    reviewBadge: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      '& >*:first-child': {
        marginRight: 5,
      },
    },
    loading: {
      padding: 40,
      '& svg': {
        height: 40,
        width: 40,
      },
    },
    adminControls: {
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      '& > *': {
        margin: `0 4px`,
      },
      '& .blocker': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0,
        visibility: 'hidden',
        transitionDuration: `${uiConstants.global.animation.speeds.mutation}ms`,
      },
      '&.blocked': {
        '& > *': {
          visibility: 'hidden',
          opacity: 0,
        },
        '& > .blocker': {
          visibility: 'visible',
          opacity: 1,
          '&:before': {
            content: "''",
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: appColors.general.backgroundColor,
            opacity: 0.4,
            zIndex: 0,
          },
        },
      },
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  dapp?: IDapp;
}

const DiscoverDappView: React.FC<OwnProps> = ({ classes, dapp }: OwnProps) => {
  const address = useSelector(makeSelectWalletAddress);
  const dispatch = useDispatch();
  if (!dapp) {
    return (
      <section className={classes.loading}>
        <LoadingIcon />
      </section>
    );
  } else {
    const dappIconUrl = dapp.icon?.includes('base64')
      ? dapp.icon
      : generateUri(dapp.icon);
    return (
      <article className={classes.root}>
        <header className={classes.header}>
          <div className={classes.logo}>
            <img src={dappIconUrl} alt={`${dapp.name}-banner`} />
          </div>
          <Typography variant="h1" component="h1">
            {dapp.name}
          </Typography>
          <Typography variant="h4" component="h2">
            {dapp.category.toLowerCase()}
          </Typography>
          <a href={dapp.url} rel="ugc" target="_blank">
            <Button size="large" className={classes.button} variant="outlined">
              Open
            </Button>
          </a>
        </header>
        <section>
          <section className={classes.section}>
            <Typography component="h4">Description</Typography>
            <Typography component="p">{dapp.desc}</Typography>
          </section>
          <section className={classes.section}>
            <Typography component="h4">URL</Typography>
            <a href={dapp.url} rel="ugc" target="_blank">
              {dapp.url}
              {' →'}
            </a>
          </section>
          {dapp.status == DAPP_STATUS.APPROVED && (
            <Fragment>
              <section className={classes.section}>
                <div className={classes.reviewBadge}>
                  <ReviewBadgeIcon />
                  <Typography component="span">Reviewed</Typography>
                </div>
              </section>
              <section className={classes.section}>
                <Typography component="h4">Rankings</Typography>
                <RankingModule dapp={dapp} />
              </section>
            </Fragment>
          )}
          <section className={classes.section}>
            <div
              className={classNames(classes.adminControls, {
                ['blocked']: address == AddressZero || address != dapp.uploader,
              })}
            >
              <div className={'blocker'}>
                {address == AddressZero && (
                  <Button
                    variant="outlined"
                    onClick={() => dispatch(connectAccountAction.request())}
                  >
                    Connect Wallet to access controls
                  </Button>
                )}
                {address != AddressZero &&
                  address.toLowerCase() != dapp.uploader.toLowerCase() && (
                    <Typography>
                      {`${address.substr(0, 7)}...`} is not uploader
                    </Typography>
                  )}
              </div>
              <Button
                size="large"
                className={classes.button}
                variant="outlined"
                onClick={() => forwardTo(ROUTE_LINKS.UpdateDApp(dapp.name))}
              >
                Edit
              </Button>
              <Button
                size="large"
                className={classes.button}
                variant="outlined"
                onClick={() => forwardTo(ROUTE_LINKS.Withdraw(dapp.name))}
              >
                Withdraw
              </Button>
            </div>
          </section>
        </section>
      </article>
    );
  }
};

export default withStyles(styles, { withTheme: true })(DiscoverDappView);
