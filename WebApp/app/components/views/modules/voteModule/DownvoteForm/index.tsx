/**
 *
 * DownvoteForm
 *
 */

import React from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Typography,
  Button,
} from '@material-ui/core';
import { IDapp } from 'domain/Dapps/types';
import { TOKENS } from 'utils/constants';
import { Link } from 'react-router-dom';
import { ROUTE_LINKS } from 'routeLinks';
import { appColors } from 'theme';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
    inputSection: {
      display: 'flex',
      justifyContent: 'center',
      // alignItems: 'center',
      fontSize: 32,
      position: 'relative',
      height: 51,
      '&:after': {
        position: 'absolute',
        content: '""',
        display: 'block',
        bottom: 0,
        left: '50%',
        backgroundColor: appColors.general.gray.background,
        height: 1,
        width: 'calc(100% + 30px)',
        transform: 'translate(-50%, 0)',
      },
      '& > span': {
        height: 51,
      },
    },
    field: {
      width: '50%',
      maxWidth: '50%',
      '& > *': {
        '&:before,&:after': {
          display: 'none',
        },
      },
      '& input': {
        fontSize: 32,
        textAlign: 'right',
      },
    },
    tokenLabel: {
      marginLeft: 5,
      color: appColors.general.gray.base,
    },
    information: {
      color: appColors.general.gray.base,
      padding: `20px 0`,
      position: 'relative',
      '&:after': {
        position: 'absolute',
        content: '""',
        display: 'block',
        bottom: 0,
        left: '50%',
        backgroundColor: appColors.general.gray.background,
        height: 1,
        width: 'calc(100% + 30px)',
        transform: 'translate(-50%, 0)',
      },
      '& a': {
        textDecoration: 'none',
        color: appColors.general.blue.base,
      },
    },
    ctas: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  downvote: (dapp: IDapp) => void;
  dapp: IDapp;
  cost: number;
}

const DownvoteForm: React.SFC<OwnProps> = ({
  classes,
  downvote,
  dapp,
  cost,
}: OwnProps) => {
  return (
    <article className={classes.root}>
      <section className={classes.inputSection}>
        <span>{cost}</span>
        <span className={classes.tokenLabel}>{TOKENS.SNT}</span>
      </section>
      <section className={classes.information}>
        <Typography>
          SNT you spend to downvote goes directly back to {dapp.name}.
          Downvoting moves their DApp down by 1% of the current ranking. The
          cost is fixed by our unique bonded curve.{' '}
          <Link to={ROUTE_LINKS.HowToVote}>Learn more↗</Link>
        </Typography>
      </section>
      <section className={classes.ctas}>
        <Button onClick={() => downvote(dapp)} variant="outlined" type="button">
          Downvote
        </Button>
      </section>
    </article>
  );
};

export default withStyles(styles, { withTheme: true })(DownvoteForm);
