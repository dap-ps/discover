/**
 *
 * SearchView
 *
 */

import React, { useState, useRef } from 'react';
import { Theme, createStyles, withStyles, WithStyles, Input } from '@material-ui/core';
import classNames from 'classnames';
import { useOnClickOutside } from 'hooks/useOnClickOutside';

import SearchIcon from '../../../images/icons/search.svg';
import { uiConstants, appColors } from 'theme';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "center",
      padding: 10,
      position: "fixed",
      borderRadius: 200,
      ...uiConstants.search.position,
      boxShadow: "0 4px 12px rgba(0,34,51,.08), 0 2px 4px rgba(0,34,51,.16)",
      cursor: "pointer",
      zIndex: 9999,
      backgroundColor: appColors.general.white.base
    },
    icon:{
      height: 30,
      width: 30,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: 5,
    },
    search:{
      width: 0,
      overflow: "hidden",
      transitionDuration: uiConstants.global.animation.speeds.movement,
      position: "relative",

      "&.focused":{
        width: uiConstants.search.input.width
      }
    },
    content:{

    },
    item:{

    }
  });

interface OwnProps extends WithStyles<typeof styles> {
  setSearchTerm: (input: string) => void
}

// TODO: Content styling
// TODO: Content load animation

const SearchView: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes, setSearchTerm } = props;
  const [focused, setFocused] = useState<boolean>(false);

  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    if(focused){
      setFocused(false)
    }
  })
  return <section ref={ref} className={classes.root} onClick={() => setFocused(true)}>
    <div className={classes.icon}>
      <SearchIcon />
    </div>
    <div className={classNames(classes.search, focused ? "focused" : "")}>
      <Input type="text" fullWidth={true} disableUnderline={true} placeholder="Search Dapps" onChange={(event) => setSearchTerm(event.target.value)}/>
    </div>
    <section className={classNames(classes.content)}>

    </section>
  </section>;
};

export default withStyles(styles, { withTheme: true })(SearchView);
