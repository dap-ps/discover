/**
 *
 * ExpandSection
 *
 */

import React, { ReactNode, useState } from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Button,
} from '@material-ui/core';
import { uiConstants } from 'theme';
import classNames from 'classnames';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      position: 'relative',
      maxHeight: 110,
      height: 'auto',
      transitionDuration: `${uiConstants.global.animation.speeds.movement}ms`,
      overflow: 'hidden',

      '&:after': {
        content: "''",
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 0)',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg,hsla(0,0%,100%,0),#fff)',
        transitionDuration: `${uiConstants.global.animation.speeds.movement}ms`,
        opacity: 1,
        visibility: 'visible',
      },
      '& button': {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 0)',
        zIndex: 1,
        transitionDuration: `${uiConstants.global.animation.speeds.movement}ms`,
        opacity: 1,
        visibility: 'visible',
      },
      '&.expand': {
        maxHeight: '100%',
        '&:after': {
          opacity: 0,
          visibility: 'hidden',
        },
        '& button': {
          opacity: 0,
          visibility: 'hidden',
        },
      },
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  children: ReactNode[] | ReactNode;
  className?: string;
}

const ExpandSection: React.FC<OwnProps> = (props: OwnProps) => {
  const { classes, className, children } = props;
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <section
      className={classNames(classes.root, className, expanded ? 'expand' : '')}
    >
      {children}
      <Button variant="outlined" onClick={() => setExpanded(true)}>
        Read more
      </Button>
    </section>
  );
};

export default withStyles(styles, { withTheme: true })(ExpandSection);
