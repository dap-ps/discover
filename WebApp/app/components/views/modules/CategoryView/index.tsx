/**
 *
 * CategoryView
 *
 */

import React, { useState, useRef } from 'react';
import { Theme, createStyles, withStyles, WithStyles, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import { useRouteMatch, match } from 'react-router-dom';
import { ROUTE_LINKS } from 'routeLinks';
import { DAPP_CATEGORY, DAPP_CATEGORY_STRINGS, DAPP_CATEGORY_ICONS } from 'utils/constants';
import { appColors, uiConstants, brandColors } from 'theme';
import classNames from 'classnames';
import DropDownArrowsIcon from '../../../../images/icons/dropdown-arrows.svg';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import LoadingIcon from 'components/theme/elements/LoadingIcon';
import GridCarousel from 'components/theme/elements/GridCarousel';
import { makeSelectDapps } from 'domain/Dapps/selectors';
import { useSelector } from 'react-redux';
import { IDapp } from 'domain/Dapps/types';
import DappCard from 'components/theme/content/DappCard';
import { forwardTo } from 'utils/history';
import LogoIcon from 'components/theme/elements/LogoIcon';

let categoryColors = {};
Object.keys(DAPP_CATEGORY_STRINGS).map((key) => {
  categoryColors = {
    ...categoryColors,
    [`&.${key}`]: {
      backgroundColor: appColors.sections[key].base,
    },
  };
});
const styles = ({
  palette,
  breakpoints
}: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      width: "100vw",
      maxWidth: uiConstants.modal.modalWidthMax,
      minHeight: 400,
      [breakpoints.up('xs')]: {
        maxWidth: '80vw',
      },
      [breakpoints.up('md')]: {
        maxWidth: '80vw',
      },
      ...uiConstants.modal.padding
    },
    selector: {
      position: 'relative',
    },
    internal: {
      position: 'relative',
      margin: '0 0 10px',
    },
    error: {
      color: palette.error.main,
    },
    errorText: {
      marginLeft: 15,
      marginRight: 15,
    },
    selected: {
      position: 'relative',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,.1), 0 2px 6px rgba(136,122,249,.2)',
      '&.unset': {
        backgroundColor: brandColors.default.main,
      },
    },
    options: {
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 8,
      // height: "100%",
      transitionDuration: `${uiConstants.global.animation.speeds.movement}ms`,
      opacity: 0,
      visibility: 'hidden',
      maxHeight: '0vh',
      boxShadow: '0 2px 8px rgba(0,0,0,.1), 0 2px 6px rgba(136,122,249,.2)',
      zIndex: 99999,
      overflow: 'hidden',
      '&.active': {
        opacity: 1,
        visibility: 'visible',
        maxHeight: '100vh',
      },
    },
    item: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '10px 15px',
      justifyContent: 'space-between',
      color: appColors.general.white.base,
      backgroundColor: brandColors.default.main,
      cursor: 'pointer',
      '& svg, & img': {
        fill: appColors.general.white.base,
        width: 24,
      },
      '& p': {
        flexGrow: 1,
        maxWidth: `calc(100% - ${24 * 2 + 20 * 2}px)`,
      },
      ...categoryColors,
    },
    content: {

    },
    gridCarousel: {
      margin: '15px 0',
    },
    loading: {
      padding: '20px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& svg': {
        display: 'block',
        height: 80,
        width: 80,
      },
    },
  });

interface OwnProps extends WithStyles<typeof styles> {}

interface RouteParams {
  category: string;
}

const CategoryView: React.FC<OwnProps> = ({ classes }: OwnProps) => {
  const match: match<RouteParams> | null = useRouteMatch({
    path: ROUTE_LINKS.categories.select,
    strict: true,
    sensitive: true,
  });
  
  const category = Object.keys(DAPP_CATEGORY_STRINGS)
  .find((key: DAPP_CATEGORY) => DAPP_CATEGORY_STRINGS[key].replace(' ', '-').toLowerCase() == match?.params.category)

  const [open, setOpen] = useState<boolean>(false);
  const handleSetCategory = (value: DAPP_CATEGORY | undefined) => {
    setOpen(false);
    if (value) {
      forwardTo(ROUTE_LINKS.categories[value])
    } else { 
      forwardTo(ROUTE_LINKS.categories.All)
    }
  };

  const dapps = useSelector(makeSelectDapps())
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    if (open) {
      setOpen(false);
    }
  })

  const theme = useTheme()
  const large = useMediaQuery(theme.breakpoints.up('lg'));
  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const columns = large 
    ? "three"
    : desktop
    ? "two"
    : "one"

  const perSlide = large 
    ? 12
    : desktop
    ? 10
    : 4
  return (
    <article className={classes.root}>
      <section className={classes.selector}>
      <div className={classes.internal} ref={ref}>
        <div className={classNames(classes.options, open ? 'active' : '')}>
          <div
            className={classes.item}
            onClick={() => handleSetCategory(undefined)}
            key={`cat-selector-all`}
          >
            <LogoIcon />
            <Typography>All</Typography>
          </div>
          {Object.keys(DAPP_CATEGORY_ICONS).map(
            (key: DAPP_CATEGORY, index: number) => (
              <div
                className={classes.item}
                onClick={() => handleSetCategory(key)}
                style={{ backgroundColor: appColors.sections[key].base }}
                key={`cat-selector-${index}`}
              >
                {DAPP_CATEGORY_ICONS[key].minimal({})}
                <Typography>{DAPP_CATEGORY_STRINGS[key]}</Typography>
              </div>
            ),
          )}
        </div>
        <div
          className={classNames(
            classes.item,
            classes.selected,
            category && appColors.sections[category] ? category : 'unset',
          )}
          onClick={() => setOpen(true)}
        >
          {category && appColors.sections[category]
            ? DAPP_CATEGORY_ICONS[category].minimal({})
            : <LogoIcon />}
          <Typography>
            {category
              ? DAPP_CATEGORY_STRINGS[category]
              : "All"}
          </Typography>
          <DropDownArrowsIcon />
        </div>
      </div>
    </section>
    <section className={classes.content}>
      {dapps.length == 0 || dapps.filter((dapp: IDapp) => !category || dapp.category == category).length == 0 ? (
        <section className={classes.loading}>
          <LoadingIcon />
        </section>
      ) : (
        <GridCarousel providerProps={{ dragEnabled: true }} columns={columns} perSlide={perSlide} className={classes.gridCarousel}>
          {dapps
            .filter((dapp: IDapp) => !category || dapp.category == category)
            .sort((dapp1, dapp2) =>
              dapp1.dateAdded > dapp2.dateAdded ? -1 : +1,
            )
            .map((dapp: IDapp, index: number) => (
              <DappCard
                onClick={() => forwardTo(ROUTE_LINKS.Discover(dapp.name))}
                key={`category-dapp-${index}-${dapp.name}`}
                dapp={dapp}
              />
            ))}
        </GridCarousel>
        )}
    </section>
    </article>
  );
};

export default withStyles(styles, { withTheme: true })(CategoryView);
