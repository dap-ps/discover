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
import { appColors, brandColors } from 'theme';
import ReviewBadgeIcon from '../../../../images/icons/reviewBadge.svg';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
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
  });

interface OwnProps extends WithStyles<typeof styles> {
  dapp: IDapp;
}

const DiscoverDappView: React.SFC<OwnProps> = ({ classes, dapp }: OwnProps) => {
  return (
    <article className={classes.root}>
      <header className={classes.header}>
        <div className={classes.logo}>
          <img src={dapp.icon} alt={`${dapp.name}-banner`} />
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
              <Typography component="p">Ranking checker module</Typography>
            </section>
          </Fragment>
        )}
      </section>
    </article>
  );
};

export default withStyles(styles, { withTheme: true })(DiscoverDappView);
