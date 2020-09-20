/**
 *
 * LoadingIcon
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import LoadingSpinnerSVG from '../../../../images/loading-spinner.svg';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
  });

interface OwnProps extends WithStyles<typeof styles> {}

const LoadingIcon: React.FC<OwnProps> = ({ classes }: OwnProps) => {
  return <LoadingSpinnerSVG />;
};

export default withStyles(styles, { withTheme: true })(LoadingIcon);
