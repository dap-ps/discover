/**
 *
 * ÐAppCard
 *
 */

import React from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Typography,
} from '@material-ui/core';
// @ts-ignore
import { IDapp } from 'domain/Dapps/types';
import classNames from 'classnames';
import ArrowUpIcon from '../../../../images/icons/upvote-arrow.svg';
import ArrowDownIcon from '../../../../images/icons/downvote-arrow.svg';
import ReviewBadgeIcon from '../../../../images/icons/reviewBadge.svg';
import SNTIcon from '../../../../images/icons/SNT.svg';
import { uiConstants, appColors, brandColors } from 'theme';
import { DAPP_STATUS } from 'utils/constants';
import { Link } from 'react-router-dom';
import { ROUTE_LINKS } from 'routeLinks';
import { generateUri } from 'api/apiUrlBuilder';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      display: 'flex',
      flexDirection: 'row',
      padding: 15,
      justifyContent: 'flex-start',
      // alignItems: "center",
      '&.clickable': {
        cursor: 'pointer',
      },
    },
    icon: {
      position: 'relative',
      marginRight: uiConstants.dapps.card.iconMargin,
      
      '& img': {
        width: uiConstants.dapps.card.iconSize,
        height: uiConstants.dapps.card.iconSize,
        display: 'block',
        borderRadius: "50%",
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
      width: '100%',
      maxWidth: `calc(100% - ${uiConstants.dapps.card.iconSize}px - ${uiConstants.dapps.card.iconMargin}px)`,
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
    },
    votes: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginTop: 10,
    },
    voteCount: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: 82,
      '& svg': {
        marginRight: 5,
        height: 15,
        width: 15,
      },
    },
    voteControls: {
      display: 'flex',
      flexDirection: 'row',
      color: brandColors.default.main,
      flexWrap: 'wrap',
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: 11,
      '& > a': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 7.5,
        cursor: 'pointer',
        color: 'inherit',
        textDecoration: 'none',
        '& svg': {
          marginRight: 2,
        },
      },
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  dapp: IDapp;
  onClick?: () => void;
}

const DappCard: React.FC<OwnProps> = ({
  classes,
  dapp,
  onClick,
}: OwnProps) => {
  const dappIconUrl = dapp.icon?.includes('base64')
    ? dapp.icon
    : generateUri(dapp.icon);
  return (
    <article className={classNames(classes.root, onClick ? 'clickable' : '')}>
      <div onClick={() => (onClick ? onClick() : null)}>
        <div
          className={classNames(
            classes.icon,
            dapp.status == DAPP_STATUS.APPROVED ? 'approved' : '',
          )}
        >
          <img src={dappIconUrl} alt={`${dapp.name}-icon`} />
          {dapp.status == DAPP_STATUS.APPROVED && <ReviewBadgeIcon />}
        </div>
      </div>
      <div className={classes.meta}>
        <Typography
          onClick={() => (onClick ? onClick() : null)}
          variant="h3"
          component="h3"
        >
          {dapp.name}
        </Typography>
        <Typography
          onClick={() => (onClick ? onClick() : null)}
          variant="body1"
          component="p"
        >
          {dapp.desc}
        </Typography>
        <div className={classes.votes}>
          <span
            onClick={() => (onClick ? onClick() : null)}
            className={classes.voteCount}
          >
            <SNTIcon />
            {dapp.votes}
          </span>
          <div className={classes.voteControls}>
            <Link to={ROUTE_LINKS.Vote(`${dapp.name}`, 'upvote')}>
              <ArrowUpIcon />
              <span>upvote</span>
            </Link>
            <Link to={ROUTE_LINKS.Vote(`${dapp.name}`, 'downvote')}>
              <ArrowDownIcon />
              <span>downvote</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default withStyles(styles, { withTheme: true })(DappCard);
