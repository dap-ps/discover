/**
 *
 * NavMenu
 *
 */

import React, {  useState } from 'react';
import { Theme, createStyles, withStyles, WithStyles, Typography } from '@material-ui/core';
import { AppRoute } from 'routes';
import classNames from 'classnames';
import { uiConstants, appColors } from 'theme';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      position: "fixed",
      ...uiConstants.global.nav.position,

    },
    burger:{
      position: "absolute",
      top: 0,
      left: 0,
      height: uiConstants.global.nav.burger.size,
      width: uiConstants.global.nav.burger.size,
      opacity: 0,
      visibility: "hidden",
      transitionDuration: uiConstants.global.animation.speeds.mutation,
      zIndex: 3,
      "&.open":{
        opacity: 1,
        visibility: "visible",
      },
      "&:before": {
        content: "''",
        position: "absolute",
        top: "50%",
        left: "50%",
        backgroundColor: appColors.general.gray,
        width: uiConstants.global.nav.burger.patties.width,
        height: uiConstants.global.nav.burger.patties.height,
        transform: "translate(-50%, -50%)"
      },
      "&:after": {
        content: "''",
        position: "absolute",
        top: "50%",
        left: "50%",
        backgroundColor: appColors.general.gray,
        width: uiConstants.global.nav.burger.patties.width,
        height: uiConstants.global.nav.burger.patties.height,
        transform: "translate(-50%, -50%)"
      }
    },
    content:{

    },
    item:{

    }
  });

interface OwnProps extends WithStyles<typeof styles> {
  navLinks: AppRoute[]
}

const NavMenu: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes } = props;

  const [open, setOpen] = useState<boolean>(false);
  return <div className={classNames(classes.root, open ? " open" : "")}>
    <span className={classNames(classes.burger,  open ? " active" : "")} onClick={() => setOpen(true)}>

    </span>
    <div>
      <section>
        <Typography variant="h2" component="span">
          Categories
        </Typography>
      </section>
      <section>
        <Typography variant="h2" component="span">
          Lists
        </Typography>
      </section>
      <div>

      </div>
    </div>
  </div>;
};

export default withStyles(styles, { withTheme: true })(NavMenu);
