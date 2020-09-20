/**
 *
 * ToastWrapper
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
  });

interface OwnProps extends WithStyles<typeof styles> {}

const ToastWrapper: React.FC<OwnProps> = ({}: OwnProps) => {
  return (
    <ToastContainer
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
    />
  );
};

export default withStyles(styles, { withTheme: true })(ToastWrapper);
