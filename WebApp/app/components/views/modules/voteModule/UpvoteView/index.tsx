/**
 *
 * UpvoteView
 *
 */

import React, { useState, useEffect } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { IDapp } from 'domain/Dapps/types';
import DappInfoHeader from 'components/theme/elements/DappInfoHeader';
import UpvoteForm from '../UpvoteForm';
import { TOKENS } from 'utils/constants';
import classNames from 'classnames';
import LoadingIcon from 'components/theme/elements/LoadingIcon';
import { uiConstants, appColors } from 'theme';
import { useSelector } from 'react-redux';
import { makeSelectDappsLoading } from 'domain/Dapps/selectors';
import { DiscoverUpVoteEffect } from 'domain/Dapps/contracts/Discover.contract';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      padding: `20px 15px`,
      position: 'relative',
    },
    loading: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: 10,
      opacity: 0,
      visibility: 'hidden',
      transitionDuration: `${uiConstants.global.animation.speeds.mutation}ms`,
      '& svg': {
        height: 80,
        width: 80,
      },
      '&.active': {
        opacity: 1,
        visibility: 'visible',
      },
      '&:before': {
        content: "''",
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        borderRadius: '20px',
        opacity: 0.4,
        backgroundColor: appColors.general.backgroundColor,
      },
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  dapp: IDapp;
  upvote: (dapp: IDapp, amount: number, token: TOKENS) => void;
}

const UpvoteView: React.FC<OwnProps> = ({
  classes,
  dapp,
  upvote,
}: OwnProps) => {
  const loading = useSelector(makeSelectDappsLoading);

  const [value, setValue] = useState(0);
  const [valuationMemo, setValidationMemo] = useState<Record<number, number>>({
    0: 0,
  });
  // TODO: improve memoize
  useEffect(() => {
    const fetchRating = async (input: number) => {
      const rating = await DiscoverUpVoteEffect(dapp.id, input);
      setValidationMemo({
        ...valuationMemo,
        [input]: parseInt(rating),
      });
    };
    if (!valuationMemo[value]) {
      fetchRating(value);
    }
  }, [value]);
  return (
    <section className={classes.root}>
      <section
        className={classNames(classes.loading, {
          ['active']: loading,
        })}
      >
        <LoadingIcon />
      </section>
      <DappInfoHeader
        dapp={dapp}
        changeIndicator={valuationMemo[value] ? valuationMemo[value] : 0}
      />
      <UpvoteForm dapp={dapp} upvote={upvote} setIndicator={setValue} />
    </section>
  );
};

export default withStyles(styles, { withTheme: true })(UpvoteView);
