/**
 *
 * SimpleWideBanner
 *
 */

import React, { ReactNode } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import classNames from 'classnames';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  children: ReactNode[] | ReactNode;
  className?: string;
}

const SimpleWideBanner: React.FC<OwnProps> = (props: OwnProps) => {
  const { classes, className, children } = props;
  return (
    <section className={classNames(classes.root, className)}>
      {children}
    </section>
  );
};

export default withStyles(styles, { withTheme: true })(SimpleWideBanner);
