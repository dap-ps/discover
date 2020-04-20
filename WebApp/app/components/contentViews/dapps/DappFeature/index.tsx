/**
 *
 * DappFeature
 *
 */

import React, { Fragment } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { Dapp } from 'domain/Dapps/types';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
  });

interface OwnProps extends WithStyles<typeof styles> {
  dapp: Dapp
}

const DappFeature: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes } = props;
  return <Fragment>
      <span className={classes.root}>
        DappFeature
      </span>
    </Fragment>;
};

export default withStyles(styles, { withTheme: true })(DappFeature);
