/**
 *
 * DappCard
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles, Typography } from '@material-ui/core';
import { IDapp } from 'domain/Dapps/types';
import classNames from 'classnames';
import ArrowUpIcon from '../../../../images/icons/upvote-arrow.svg';
import ArrowDownIcon from '../../../../images/icons/downvote-arrow.svg';
import ReviewBadgeIcon from '../../../../images/icons/reviewBadge.svg';
import SNTIcon from '../../../../images/icons/SNT.svg';
import { uiConstants, appColors, brandColors } from 'theme';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      display: "flex",
      flexDirection: "row",
      margin: 5,
      justifyContent: "flex-start",
      // alignItems: "center",
    },
    icon: {
      position: "relative",
      marginRight: uiConstants.dapps.card.iconMargin,
      "& img":{
        width: uiConstants.dapps.card.iconSize,
        height: uiConstants.dapps.card.iconSize,
      },
      "& svg":{
        width: uiConstants.dapps.card.reviewedSize,
        height: uiConstants.dapps.card.reviewedSize,
        position: "absolute",
        top: "60%",
        left: "60%"
      }
    },
    meta: {
      width: "100%",
      maxWidth: `calc(100% - ${uiConstants.dapps.card.iconSize}px - ${uiConstants.dapps.card.iconMargin}px)`,
      "& h3":{
        fontSize: uiConstants.global.fonts.item.headerSize,
        fontWeight: 500
      },
      "& p":{
        fontSize: uiConstants.global.fonts.item.bodySize,
        color: appColors.general.gray.base,
        margin: "3px 0",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }
    },
    votes:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
    },
    voteCount:{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      "& svg":{
        marginRight: 5
      }
    },
    voteControls: {
      display: "flex",
      flexDirection: "row",
      color: brandColors.default.main,
      flexWrap: "wrap",
      textTransform: "uppercase",
      fontWeight: 600,
      fontSize: 11,
      "& > div":{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 7.5,
        cursor: "pointer",
        "& svg":{
          marginRight: 2
        }
      },
    }
  });

interface OwnProps extends WithStyles<typeof styles> {
  dapp: IDapp
}

const DappCard: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes, dapp } = props;
  return <article className={classes.root}>
    <div>
      <div className={classNames(classes.icon, dapp.reviewed ? "reviewed" : "")}>
        <img src={dapp.icon} alt={`${dapp.name}-icon`}/>
        {
          dapp.reviewed && <ReviewBadgeIcon />
        }
      </div>
    </div>
    <div className={classes.meta}>
      <Typography variant="h3" component="h3">
        {dapp.name}
      </Typography>
      <Typography  variant="body1" component="p">
        {dapp.description}
      </Typography>
      <div className={classes.votes}>
        <span className={classes.voteCount}>
          <SNTIcon/>
          {dapp.votes}
        </span>
        <div className={classes.voteControls}>
          <div>
            <ArrowUpIcon/>
            <span>
              upvote
            </span>
          </div>
          <div>
            <ArrowDownIcon/>
            <span>
              downvote
            </span>
          </div>
        </div>
      </div>

    </div>
  </article>;
};

export default withStyles(styles, { withTheme: true })(DappCard);
