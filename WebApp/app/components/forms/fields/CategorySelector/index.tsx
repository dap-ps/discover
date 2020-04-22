/**
 *
 * CategorySelector
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
  });

interface OwnProps extends WithStyles<typeof styles> {}

const CategorySelector: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes } = props;
  return <section className={classes.root}>
    <div>
      Selected
    </div>
    <div>
        not selected
    </div>
  </section>
};

export default withStyles(styles, { withTheme: true })(CategorySelector);
