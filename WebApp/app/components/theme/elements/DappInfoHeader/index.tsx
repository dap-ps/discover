/**
 *
 * DappInfoHeader
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
import { IDapp } from 'domain/Dapps/types';

import SNTIcon from '../../../../images/icons/SNT.svg';
import { uiConstants, appColors } from 'theme';
import { DAPP_CATEGORY_STRINGS, DAPP_CATEGORY_ICONS } from 'utils/constants';
import classNames from 'classnames';

let categoryColors = {};
Object.keys(DAPP_CATEGORY_STRINGS).map((key) => {
  categoryColors = {
    ...categoryColors,
    [`&.${key}`]: {
      '&:before': {
        backgroundColor: appColors.sections[key].base,
      },
    },
  };
});
const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      '& > *': {
        margin: '10px 0',
        position: 'relative',
      },
      '& span': {
        fontWeight: 500,
        fontSize: 15,
      },
    },
    title: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      '& img': {
        width: 24,
        marginRight: 15,
      },
      '& span': {
        fontSize: 17,
        fontWeight: 600,
      },
    },
    staked: {
      '& svg': {
        width: 24,
        height: 24,
        marginRight: 15,
      },
    },
    category: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    categoryIcon: {
      position: 'relative',
      width: 24,
      height: 24,
      marginRight: 15,
      '&:before': {
        content: "''",
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        opacity: 0.2,
        zIndex: uiConstants.global.zIndex.background,
        borderRadius: 10,
      },
      ...categoryColors,
      '& svg': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 14,
        height: 14,
        transform: 'translate(-50%, -50%)',
        fill: appColors.general.white.base,
      },
    },
    changeIndicator: {
      position: 'absolute',
      right: 15,
      top: '50%',
      transform: 'translate(0, -50%)',
      color: appColors.general.white.base,
      display: 'block',
      padding: `2px 10px`,
      borderRadius: 10,

      '&.positive': {
        // TODO: Get official green color
        backgroundColor: 'green',
        '&:before': {
          content: `'+'`,
        },
      },
      '&.negative': {
        // TODO: Get official red color
        backgroundColor: 'red',
      },
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  dapp: IDapp;
  changeIndicator?: number;
}

const DappInfoHeader: React.SFC<OwnProps> = ({
  dapp,
  classes,
  changeIndicator,
}: OwnProps) => {
  return (
    <section className={classes.root}>
      <div className={classes.title}>
        <img src={dapp.icon} alt={`${dapp.name}-icon`} />
        <Typography variant="body1" component="span">
          {dapp.name}
        </Typography>
      </div>
      <div className={classes.staked}>
        <SNTIcon />
        <Typography variant="body1" component="span">
          {dapp.votes}
        </Typography>
        {changeIndicator && (
          <span
            className={classNames(
              classes.changeIndicator,
              changeIndicator > 0 ? 'positive' : 'negative',
            )}
          >
            {changeIndicator}
          </span>
        )}
      </div>
      <div className={classes.category}>
        <div className={classNames(classes.categoryIcon, dapp.category)}>
          {DAPP_CATEGORY_ICONS[dapp.category].minimal({})}
        </div>
        <Typography variant="body1" component="span">
          {DAPP_CATEGORY_STRINGS[dapp.category]}
        </Typography>
      </div>
    </section>
  );
};

export default withStyles(styles, { withTheme: true })(DappInfoHeader);
