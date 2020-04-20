/**
 *
 * DappCard
 *
 */

import React, { Fragment } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { IDapp } from 'domain/Dapps/types';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
  });

interface OwnProps extends WithStyles<typeof styles> {
  dapp: IDapp
}

const DappCard: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes, dapp } = props;
  return <Fragment>
    <span className={classes.root}>
      {dapp.name}
    </span>
  </Fragment>;
};

export default withStyles(styles, { withTheme: true })(DappCard);
