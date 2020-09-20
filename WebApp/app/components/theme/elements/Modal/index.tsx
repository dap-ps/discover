/**
 *
 * Modal
 *
 */

import React, { useState, useRef, ReactNode } from 'react';
import classNames from 'classnames';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { appColors, uiConstants } from 'theme';
import { ROUTE_LINKS } from 'routeLinks';
import { forwardTo } from 'utils/history';
import { Link } from 'react-router-dom';

const styles = ({ breakpoints }: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transitionDuration: `${uiConstants.global.animation.speeds.mutation}ms`,
      visibility: 'hidden',
      opacity: 0,
      zIndex: uiConstants.global.zIndex.front,
      '&:before': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: uiConstants.global.zIndex.background,
        opacity: 0.2,
        backgroundColor: appColors.general.blue.base,
      },
      '&.active': {
        visibility: 'visible',
        opacity: 1,
      },
    },
    inner: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: uiConstants.modal.modalWidthMax,
      transitionDuration: `${uiConstants.global.animation.speeds.mutation}ms`,
      visibility: 'hidden',
      opacity: 0,
      backgroundColor: appColors.general.white.base,
      borderRadius: 20,
      maxHeight: `calc(100% - ${uiConstants.modal.margin * 2}px)`,
      [breakpoints.up('xs')]: {
        maxWidth: '80vw',
        width: '100%',
      },
      [breakpoints.up('md')]: {
        maxWidth: '80vw',
        width: 'auto !important',
      },
      '&.active': {
        transitionDelay: `${uiConstants.global.animation.speeds.mutation}ms`,
        visibility: 'visible',
        opacity: 1,
      },
    },
    close: {
      position: 'absolute',
      display: 'block',
      zIndex: uiConstants.global.zIndex.raisedElement,
      borderRadius: 200,
      backgroundColor: uiConstants.modal.close.backgroundColor,
      ...uiConstants.modal.close.position,
      height: uiConstants.modal.close.size,
      width: uiConstants.modal.close.size,
      transform: 'translate(50%, -50%)',
      cursor: 'pointer',
      transitionDuration: `${uiConstants.global.animation.speeds.mutation}ms`,
      '&:before,&:after': {
        content: "''",
        position: 'absolute',
        top: '50%',
        left: '50%',
        display: 'block',
        height: uiConstants.modal.close.lineThickness,
        width: uiConstants.modal.close.lineLength,
        backgroundColor: uiConstants.modal.close.lineColor,
      },
      '&:before': {
        transform: 'translate(-50%, -50%) rotateZ(-45deg)',
      },
      '&:after': {
        transform: 'translate(-50%, -50%) rotateZ(45deg)',
      },
      '&:hover': {
        backgroundColor: uiConstants.modal.close.hoverColor,
      },
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  children: ReactNode;
}

const Modal: React.FC<OwnProps> = ({ children, classes }: OwnProps) => {
  const [active, setActive] = useState<boolean>(children !== undefined);
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    if (active) {
      setActive(false);
      forwardTo(ROUTE_LINKS.Home);
    }
  });
  return (
    <article className={classNames(classes.root, active ? 'active' : 'closed')}>
      <section
        ref={ref}
        className={classNames(classes.inner, active ? 'active' : '')}
      >
        <Link to={ROUTE_LINKS.Home} className={classes.close}></Link>
        {children}
      </section>
    </article>
  );
};

export default withStyles(styles, { withTheme: true })(Modal);
