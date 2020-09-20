/**
 *
 * HowToVotePage
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
import { appColors } from 'theme';
import { goBack } from 'utils/history';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
    header: {
      textAlign: 'center',
      padding: `10px 20px`,
      borderBottom: `1px solid ${appColors.general.gray.background}`,
    },
    body: {
      padding: 20,
      '& img': {
        maxWidth: '100%',
      },
    },
    footer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px 0',
    },
  });

interface OwnProps extends WithStyles<typeof styles> {}

const HowToVotePage: React.FC<OwnProps> = ({ classes }: OwnProps) => {
  return (
    <article className={classes.root}>
      <header className={classes.header}>
        <Typography variant="h1" component="p">
          How voting works
        </Typography>
      </header>
      <section className={classes.body}>
        <img src="./learn-more-curve.png" />
        <Typography>
          This is what the curve you're using really looks like. The more SNT
          staked on a DApp, the cheaper it becomes for anyone to downvote it.
        </Typography>

        <Typography>
          However, you can upvote this DApp by any amount of SNT you wish. SNT
          you spend is sent directly to the contract and locked up there. It
          does not go to Status, the developer of the DApp, or any other
          middleman. There are no fees, but once the SNT is spent, you cannot
          get it back.
        </Typography>

        <Typography>
          What you spend is added directly to the DApp's balance, and the effect
          this will have on it's ranking is shown in the previous screen.
        </Typography>

        <Typography>
          Welcome to the future of decentralised curation!
        </Typography>
      </section>
      <footer className={classes.footer}>
        <Button variant="outlined" onClick={() => goBack()}>
          Back
        </Button>
      </footer>
    </article>
  );
};

export default withStyles(styles, { withTheme: true })(HowToVotePage);
