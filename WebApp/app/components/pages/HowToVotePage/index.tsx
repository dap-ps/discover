/**
 *
 * HowToVotePage
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

const HowToVotePage: React.SFC<OwnProps> = ({ classes }: OwnProps) => {
  return <article className={classes.root}>

  </article>
};

export default withStyles(styles, { withTheme: true })(HowToVotePage);
