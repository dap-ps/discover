/**
 *
 * WithdrawModuleView
 *
 */

import React, { Fragment } from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Typography,
} from '@material-ui/core';
import { makeSelectDappByName } from 'domain/Dapps/selectors';
import { useSelector } from 'react-redux';
import { brandColors, appColors } from 'theme';
import ReviewBadgeIcon from '../../../../images/icons/reviewBadge.svg';
import LoadingIcon from 'components/theme/elements/LoadingIcon';
import { generateUri } from 'api/apiUrlBuilder';
import { DAPP_STATUS } from 'utils/constants';
import RankingModule from '../RankingModule';
import WithdrawForm from './WithdrawForm';
import { makeSelectWalletAddress } from 'domain/Wallet/selectors';
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
      '& > *': {
        margin: `0 4px`,
      },
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  dappname: string;
}

const WithdrawModuleView: React.FC<OwnProps> = ({
  classes,
  dappname,
}: OwnProps) => {
  const dapp = useSelector(makeSelectDappByName(dappname));
  const address = useSelector(makeSelectWalletAddress);

  if (dapp) {
    if (dapp.uploader.toLowerCase() != address.toLowerCase()) {
      forwardTo(ROUTE_LINKS.Discover(dapp.id));
    }
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
        </header>
        <section>
          <section className={classes.section}>
            <Typography component="h4">Description</Typography>
            <Typography component="p">{dapp.desc}</Typography>
          </section>
          <section className={classes.section}>
            <Typography component="h4">Available</Typography>
            <Typography component="p">
              {parseInt(`${dapp.available / 10e5}`)}
            </Typography>
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
            <WithdrawForm dapp={dapp} />
          </section>
        </section>
      </article>
    );
  } else {
    return (
      <section className={classes.loading}>
        <LoadingIcon />
      </section>
    );
  }
};

export default withStyles(styles, { withTheme: true })(WithdrawModuleView);
