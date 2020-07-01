/**
 *
 * UpvoteView
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { IDapp } from 'domain/Dapps/types';
import DappInfoHeader from 'components/theme/elements/DappInfoHeader';
import UpvoteForm from '../UpvoteForm';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      padding: `20px 15px`,
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  dapp: IDapp;
}

const UpvoteView: React.SFC<OwnProps> = ({ classes, dapp }: OwnProps) => {
  return (
    <section className={classes.root}>
      <DappInfoHeader dapp={dapp} />
      <UpvoteForm />
    </section>
  );
};

export default withStyles(styles, { withTheme: true })(UpvoteView);
