/**
 *
 * TokenInput
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

const TokenInput: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes } = props;
  return <Fragment>TokenInput</Fragment>;
};

export default withStyles(styles, { withTheme: true })(TokenInput);
