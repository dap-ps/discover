/**
 *
 * SearchView
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

const SearchView: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes } = props;
  return <Fragment>
    <span className={classes.root}>
      SearchView
    </span>
  </Fragment>;
};

export default withStyles(styles, { withTheme: true })(SearchView);
