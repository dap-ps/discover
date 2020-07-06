/**
 *
 * DiscoverDappView
 *
 */

import React, { Fragment } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
  });

interface OwnProps extends WithStyles<typeof styles> {}

const DiscoverDappView: React.SFC<OwnProps> = ({ classes }: OwnProps) => {
  return <Fragment>DiscoverDappView</Fragment>;
};

export default withStyles(styles, { withTheme: true })(DiscoverDappView);
