/**
 *
 * ModalView
 *
 */

import React, { Fragment, ReactNode } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {

    },
    // TODO: Width control on responsive sizes, click off & modal shadow color
  });

interface OwnProps extends WithStyles<typeof styles> {
  children: ReactNode[] | ReactNode
}

const ModalView: React.SFC<OwnProps> = (props: OwnProps) => {
  const { children } = props;
  return <Fragment>
    {children}
  </Fragment>;
};

export default withStyles(styles, { withTheme: true })(ModalView);
