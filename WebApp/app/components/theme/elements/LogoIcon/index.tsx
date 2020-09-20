/**
 *
 * LogoIcon
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
// @ts-ignore
import LogoPng from '../../../../../static/dapps-logo.png'

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
  });

interface OwnProps extends WithStyles<typeof styles> {}

const LogoIcon: React.FC<OwnProps> = ({ classes }: OwnProps) => {
  return <img src={LogoPng} alt="Discover logo"/>
};

export default withStyles(styles, { withTheme: true })(LogoIcon);
