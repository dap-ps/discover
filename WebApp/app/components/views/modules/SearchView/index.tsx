/**
 *
 * SearchView
 *
 */

import React, { useState, useRef } from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Input,
  Typography,
} from '@material-ui/core';
import classNames from 'classnames';
import { useOnClickOutside } from 'hooks/useOnClickOutside';

import SearchIcon from '../../../../images/icons/search.svg';
import { uiConstants, appColors } from 'theme';
import { makeSelectSearchDapps } from 'domain/Dapps/selectors';
import { useSelector } from 'react-redux';
import { IDapp } from 'domain/Dapps/types';
import { forwardTo } from 'utils/history';
import { ROUTE_LINKS } from 'routeLinks';
import { generateUri } from 'api/apiUrlBuilder';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'center',
      padding: 10,
      position: 'fixed',
      borderRadius: 20,
      ...uiConstants.search.position,
      boxShadow: '0 4px 12px rgba(0,34,51,.08), 0 2px 4px rgba(0,34,51,.16)',
      cursor: 'pointer',
      zIndex: uiConstants.global.zIndex.raisedElement,
      backgroundColor: appColors.general.white.base,
      "&.results-active": {
      }
    },
    searchWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      alignItems: 'center',
    },
    icon: {
      height: 30,
      width: 30,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 5,
    },
    search: {
      width: 0,
      overflow: 'hidden',
      transitionDuration: `${uiConstants.global.animation.speeds.movement}ms`,
      position: 'relative',

      '&.focused': {
        width: uiConstants.search.input.width,
      },
    },
    content: {
      backgroundColor: appColors.general.white.base,
      // position: "absolute",
      // top: "100%",
      width: "100%",
      left: 0,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    item: {
      display: 'flex',
      flexDirection: 'row',
      padding: 5,
      margin: 5,
      alignItems: "center",
      justifyContent: 'flex-start',
      // alignItems: "center",
      '&.clickable': {
        cursor: 'pointer',
      },
    },
    dappIcon: {
      position: 'relative',
      marginRight: uiConstants.dapps.card.iconMargin,
      borderRadius: "50%",
      '& img': {
        width: uiConstants.dapps.card.iconSize,
        height: uiConstants.dapps.card.iconSize,
        display: 'block',
        overflow: 'hidden',
      },
      '& svg': {
        width: uiConstants.dapps.card.reviewedSize,
        height: uiConstants.dapps.card.reviewedSize,
        position: 'absolute',
        top: '60%',
        left: '60%',
      },
    },
    meta: {
      width: 0,
      flex: "1 1 0",
      '& h3': {
        fontSize: uiConstants.global.fonts.item.headerSize,
        fontWeight: 500,
      },
      '& p': {
        fontSize: uiConstants.global.fonts.item.bodySize,
        color: appColors.general.gray.base,
        margin: '3px 0',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      "& span": {
        fontSize: uiConstants.global.fonts.item.bodySize,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }
    }
  });

interface OwnProps extends WithStyles<typeof styles> {
}

const SearchView: React.FC<OwnProps> = ({ classes }: OwnProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);

  const foundDapps = useSelector(makeSelectSearchDapps(searchTerm))
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    if (focused) {
      setFocused(false);
    }
  });

  const handleClick = (dapp: IDapp) => {
    setSearchTerm('')
    setFocused(false)
    forwardTo(ROUTE_LINKS.Discover(dapp.name))
  }

  return (
    <article
      ref={ref}
      className={classNames(
        classes.root,
        {
          ["results-active"]: searchTerm.length >= 2 && foundDapps.length > 0 
        }
      )}
      onClick={() => setFocused(true)}
    >
      <label className={classes.searchWrapper}>
        <div className={classes.icon}>
          <SearchIcon />
        </div>
        <div className={classNames(classes.search, focused ? 'focused' : '')}>
          <Input
            type="text"
            fullWidth={true}
            disableUnderline={true}
            placeholder="Search Ðapp"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </label>
      <section className={classNames(classes.content)}>
        {
          searchTerm.length >= 2 && foundDapps.length > 0 
            && foundDapps.map((dapp: IDapp) => (
              <div className={classes.item}>
                <div
                  onClick={() => handleClick(dapp)}
                  className={classes.dappIcon}
                >
                  <img src={dapp.icon?.includes('base64')
                    ? dapp.icon
                    : generateUri(dapp.icon)} alt={`${dapp.name}-icon`} />
                </div>
                <div className={classes.meta}>
                  <Typography
                    onClick={() => handleClick(dapp)}
                    variant="h3"
                    component="h3"
                  >
                    {dapp.name}
                  </Typography>
                  <Typography
                    onClick={() => handleClick(dapp)}
                    variant="body1"
                    component="p"
                  >
                    {dapp.desc}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="span"
                  >
                    <a href={dapp.url} target="_blank">
                      {dapp.url}
                    </a>
                  </Typography>
                </div>
              </div>
            )
          )
        }
      </section>
    </article>
  );
};

export default withStyles(styles, { withTheme: true })(SearchView);
