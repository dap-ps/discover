/**
 *
 * ChangeNetworkIndicator
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
import { makeSelectNetworkValid } from 'domain/App/selectors';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { getNetworkName } from 'domain/App/blockchainUtils';
import { uiConstants, appColors } from 'theme';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      position: 'fixed',
      display: 'block',
      transitionDuration: `${uiConstants.global.animation.speeds.mutation}ms`,
      opacity: 0,
      visibility: 'hidden',
      right: 0,
      transform: 'translate(100%, 0)',
      bottom: '10vh',
      backgroundColor: appColors.general.red.base,
      // backgroundColor: brandColors.default.main,
      borderRadius: 15,
      padding: 20,
      color: appColors.general.white.base,
      '&.show': {
        opacity: 1,
        visibility: 'visible',
        right: 10,
        transform: 'translate(0, 0)',
      },
    },
  });

interface OwnProps extends WithStyles<typeof styles> {}

const ChangeNetworkIndicator: React.FC<OwnProps> = ({ classes }: OwnProps) => {
  const correctNetwork = useSelector(makeSelectNetworkValid);
  const correctNetworkName = getNetworkName(
    parseInt(process.env['TARGET_NETWORK'] as string),
  );
  return (
    <article
      className={classNames(classes.root, {
        ['show']: !correctNetwork,
      })}
    >
      <Typography>Please change network to {correctNetworkName}!</Typography>
    </article>
  );
};

export default withStyles(styles, { withTheme: true })(ChangeNetworkIndicator);
