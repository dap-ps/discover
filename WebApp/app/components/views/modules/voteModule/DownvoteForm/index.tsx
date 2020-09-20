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
import { makeSelectWalletAddress } from 'domain/Wallet/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { connectAccountAction } from 'domain/Wallet/actions';
import { AddressZero } from 'ethers/constants';
import { makeSelectToken } from 'domain/Tokens/selectors';
import { formatUnits } from 'ethers/utils';

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

const DownvoteForm: React.FC<OwnProps> = ({
  classes,
  downvote,
  dapp,
  cost,
}: OwnProps) => {
  const address = useSelector(makeSelectWalletAddress);
  const dispatch = useDispatch();
  const SNTToken = useSelector(makeSelectToken(TOKENS.SNT));

  const activeBalance = SNTToken
    ? parseFloat(formatUnits(SNTToken.balance, 18))
    : 0;

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
        {address == AddressZero && (
          <Button
            variant="outlined"
            onClick={() => dispatch(connectAccountAction.request())}
          >
            Connect Wallet to continue
          </Button>
        )}
        {address != AddressZero && cost > 0 ? (
          activeBalance > cost ? (
            <Button
              onClick={() => downvote(dapp)}
              variant="outlined"
              type="button"
            >
              Downvote
            </Button>
          ) : (
            <Typography>Insufficient funds</Typography>
          )
        ) : (
          <Typography>Down votes permitted once cost is above 0</Typography>
        )}
      </section>
    </article>
  );
};

export default withStyles(styles, { withTheme: true })(DownvoteForm);
