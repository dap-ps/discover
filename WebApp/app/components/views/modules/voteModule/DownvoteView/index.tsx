/**
 *
 * DownvoteView
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { IDapp } from 'domain/Dapps/types';
import DappInfoHeader from 'components/theme/elements/DappInfoHeader';
import DownvoteForm from 'components/DownvoteForm';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      padding: `20px 15px`,
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  dapp: IDapp;
  downvote: (dappId: string) => void;
}

const DownvoteView: React.SFC<OwnProps> = ({
  classes,
  downvote,
  dapp,
}: OwnProps) => {
  return (
    <section className={classes.root}>
      <DappInfoHeader
        dapp={dapp}
        changeIndicator={-(dapp.downvoteCost as number)}
      />
      <DownvoteForm downvote={downvote} dapp={dapp} />
    </section>
  );
};

export default withStyles(styles, { withTheme: true })(DownvoteView);
