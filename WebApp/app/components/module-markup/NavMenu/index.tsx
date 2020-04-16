/**
 *
 * NavMenu
 *
 */

import React, {  useState, useRef } from 'react';
import { Theme, createStyles, withStyles, WithStyles, Typography } from '@material-ui/core';
import { AppRoute } from 'routes';
import classNames from 'classnames';
import { uiConstants, appColors } from 'theme';
import { ROUTE_TYPE } from 'utils/constants';
import AddIcon from '../../../images/icons/add.svg';
import { useOnClickOutside } from 'hooks/useOnClickOutside';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      position: "fixed",
      backgroundColor: appColors.general.white.base,
      minWidth: uiConstants.nav.burger.size,
      minHeight: uiConstants.nav.burger.size,
      borderRadius: 20,
      boxShadow: "0 4px 12px rgba(0,34,51,.08), 0 2px 4px rgba(0,34,51,.16)",
      overflow: "hidden",
      ...uiConstants.nav.position,
      transitionDuration: uiConstants.global.animation.speeds.mutation,
      "&.open":{
        borderRadius: 10,
      }
    },

    burger:{
      position: "absolute",
      cursor: "pointer",
      top: 0,
      left: 0,
      height: uiConstants.nav.burger.size,
      width: uiConstants.nav.burger.size,
      opacity: 0,
      visibility: "hidden",
      transitionDuration: uiConstants.global.animation.speeds.mutation,
      // transitionDelay: "100ms",
      zIndex: 3,
      "&.active": {
        opacity: 1,
        visibility: "visible",
        transitionDelay: "0ms",
      },
      "&:before": {
        content: "''",
        position: "absolute",
        top: `calc(50% - ${uiConstants.nav.burger.patties.spacing}px)`,
        left: "50%",
        backgroundColor: appColors.general.black.base,
        width: uiConstants.nav.burger.patties.width,
        height: uiConstants.nav.burger.patties.height,
        transform: "translate(-50%, -50%)"
      },
      "&:after": {
        content: `''`,
        position: "absolute",
        top: `calc(50% + ${uiConstants.nav.burger.patties.spacing}px)`,
        left: "50%",
        backgroundColor: appColors.general.black.base,
        width: uiConstants.nav.burger.patties.width,
        height: uiConstants.nav.burger.patties.height,
        transform: "translate(-50%, -50%)"
      }
    },
    content:{
      overflow: "hidden",
      width: "100%",
      height: "100%",
      maxWidth: 0,
      maxHeight: 0,
      opacity: 0,
      visibility: "hidden",

      padding: "12px 24px 12px 16px",
      transitionDuration: uiConstants.global.animation.speeds.mutation,
      "&.active":{
        // width: uiConstants.nav.menu.width,
        maxWidth: "80vw",
        maxHeight: "80vh",
        visibility: "visible",
        opacity: 1
      },
    },
    sectionTitle:{
      color: appColors.general.gray.base,
      fontSize: 13,
    },
    item:{
      display: "flex",
      flexDirection: "row",
      margin: "10px 0",
      alignItems: "center",
      "& span": {
        display: "block",
        marginLeft: 20,
      }
    },
    icon:{
      display: "flex",
      width: 24,
      justifyContent: "space-around"
    },
    submit: {
      marginTop: 20
    }
  });

interface OwnProps extends WithStyles<typeof styles> {
  navLinks: AppRoute[]
}

const NavMenu: React.SFC<OwnProps> = (props: OwnProps) => {
  const {
    classes,
    navLinks
  } = props;

  const navRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);

  useOnClickOutside(navRef, () => {
    if(open){
      setOpen(false)
    }
  });

  return <div ref={navRef} className={classNames(classes.root, open ? "open" : "")}>
    <span className={classNames(classes.burger,  !open ? "active" : "")} onClick={() => setOpen(true)}>

    </span>
    <section className={classNames(classes.content, open ? "active" : "")}>
      <section>
        <Typography className={classes.sectionTitle} variant="h2" component="span">
          Categories
        </Typography>
        <nav>
          {
            navLinks
            .filter(item => item.routeType == ROUTE_TYPE.CATEGORY && item.routeNavLinkIcon != undefined)
            .map((item, index) =>
            <div className={classes.item} key={`cat-${index}`}>
              <div className={classes.icon}>
                {item.routeNavLinkIcon && item.routeNavLinkIcon({})}
              </div>
              <span>
                {item.name}
              </span>
            </div>)
          }
        </nav>
      </section>
      <section>
        <Typography className={classes.sectionTitle}  variant="h2" component="span">
          Lists
        </Typography>
      </section>
      <div>
        <nav>
          {
            navLinks
            .filter(item => item.routeType == ROUTE_TYPE.LIST && item.routeNavLinkIcon != undefined)
            .map((item, index) =>
            <div className={classes.item} key={`list-${index}`}>
              <div className={classes.icon}>
                {item.routeNavLinkIcon && item.routeNavLinkIcon({})}
              </div>
              <span>
                {item.name}
              </span>
            </div>)
          }
        </nav>
        <div className={classNames(classes.item, classes.submit)}>
          <div className={classes.icon}>
            <AddIcon />
          </div>
          <span>
            Submit a Ðapp
          </span>
        </div>
      </div>
    </section>
  </div>;
};

export default withStyles(styles, { withTheme: true })(NavMenu);
