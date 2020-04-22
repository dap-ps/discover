/**
 *
 * ModalView
 *
 */

import React, { ReactNode, useRef } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import classNames from 'classnames';
import { uiConstants, appColors } from 'theme';
import { MODAL_COMPONENTS } from 'domain/App/constants';
import { useOnClickOutside } from 'hooks/useOnClickOutside';

const styles = ({breakpoints}: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      transitionDuration: `${uiConstants.global.animation.speeds.mutation}ms`,
      visibility: "hidden",
      opacity: 0,
      zIndex: uiConstants.global.zIndex.front,
      "&:before":{
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: uiConstants.global.zIndex.background,
        opacity: 0.2,
        backgroundColor: appColors.general.blue.base
      },
      "&.active":{
        visibility: "visible",
        opacity: 1,
      }
    },
    modal:{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: uiConstants.modal.modalWidthMax,
      transitionDuration: `${uiConstants.global.animation.speeds.mutation}ms`,
      visibility: "hidden",
      opacity: 0,
      backgroundColor: appColors.general.white.base,
      borderRadius: 20,
      maxHeight: "calc(100% - 40px)",
      [breakpoints.up("md")]:{
        width: "100%",
      },
      [breakpoints.up('xs')]:{
        width: "80vw"
      },
      "&.active":{
        transitionDelay: `${uiConstants.global.animation.speeds.mutation}ms`,
        visibility: "visible",
        opacity: 1,
      }
    },
    close:{
      position: "absolute",
      display: "block",
      zIndex: uiConstants.global.zIndex.raisedElement,
      borderRadius: 200,
      backgroundColor: uiConstants.modal.close.backgroundColor,
      ...uiConstants.modal.close.position,
      height: uiConstants.modal.close.size,
      width: uiConstants.modal.close.size,
      transform: "translate(50%, -50%)",
      cursor: "pointer",
      "&:before,&:after":{
        content: "''",
        position: "absolute",
        top: "50%",
        left: "50%",
        display: "block",
        height: uiConstants.modal.close.lineThickness,
        width: uiConstants.modal.close.lineLength,
        backgroundColor: uiConstants.modal.close.lineColor,
      },
      "&:before":{
        transform: "translate(-50%, -50%) rotateZ(-45deg)"
      },
      "&:after":{
        transform: "translate(-50%, -50%) rotateZ(45deg)"
      },
    }
  });

interface OwnProps extends WithStyles<typeof styles> {
  children: ReactNode[] | ReactNode | null,
  active: boolean,
  setModal(
    component: MODAL_COMPONENTS
  ): void;
}

const ModalView: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes, children, active, setModal } = props;

  const navRef = useRef(null);

  useOnClickOutside(navRef, () => {
    if(active){
      setModal(MODAL_COMPONENTS.CLEAR)
    }
  });

  return <div className={classNames(classes.root, active ? "active" : "")}>
    <section ref={navRef} className={classNames(classes.modal, active ? "active" : "")}>
      <div className={classes.close} onClick={() => setModal(MODAL_COMPONENTS.CLEAR)}>

      </div>
      {children}
    </section>
  </div>;
};

export default withStyles(styles, { withTheme: true })(ModalView);
