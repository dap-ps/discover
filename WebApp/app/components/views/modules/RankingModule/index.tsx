/**
 *
 * RankingModule
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
import {
  makeSelectOverallRanking,
  makeSelectCategoryRanking,
} from 'domain/Dapps/selectors';
import { useSelector } from 'react-redux';
import { appColors } from 'theme';
import { DAPP_CATEGORY_STRINGS } from 'utils/constants';
import classNames from 'classnames';

let categoryColors = {};
Object.keys(DAPP_CATEGORY_STRINGS).map((key) => {
  categoryColors = {
    ...categoryColors,
    [`&.${key}`]: {
      backgroundColor: appColors.sections[key].base,
    },
  };
});

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
    rank: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: `8px 0`,
    },
    rankIndex: {
      fontSize: 16,
      color: appColors.general.white.base,
      height: 40,
      width: 40,
      marginRight: 16,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: appColors.general.red.base,
      ...categoryColors,
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  dapp: IDapp;
}

const RankingModule: React.FC<OwnProps> = ({ classes, dapp }: OwnProps) => {
  const ranking = useSelector(makeSelectOverallRanking(dapp));
  const categoryRanking = useSelector(makeSelectCategoryRanking(dapp));
  return (
    <article className={classes.root}>
      <section className={classes.rank}>
        <div className={classNames(classes.rankIndex, dapp.category)}>
          {categoryRanking}
        </div>
        <Typography>
          №{categoryRanking} in {DAPP_CATEGORY_STRINGS[dapp.category]}
        </Typography>
      </section>
      <section className={classes.rank}>
        <div className={classes.rankIndex}>{ranking}</div>
        <Typography>№{ranking} in highest ranked DApps</Typography>
      </section>
    </article>
  );
};

export default withStyles(styles, { withTheme: true })(RankingModule);
