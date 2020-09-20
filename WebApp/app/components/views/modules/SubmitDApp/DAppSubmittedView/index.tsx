/**
 *
 * DAppSubmittedView
 *
 */

import React from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Typography,
} from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      padding: 16,
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  variant: 'pending-review' | 'completed';
}

const DAppSubmittedView: React.FC<OwnProps> = ({
  classes,
  variant,
}: OwnProps) => {
  return (
    <section className={classes.root}>
      <Typography variant="h2" component="h2">
        {variant == 'completed' && `✓ Thank you for submitting.`}
        {variant == 'pending-review' &&
          `✓ Thank you for submitting. Your dapp will be reviewed soon.`}
      </Typography>
    </section>
  );
};

export default withStyles(styles, { withTheme: true })(DAppSubmittedView);
