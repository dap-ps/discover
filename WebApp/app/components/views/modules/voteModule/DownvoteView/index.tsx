/**
 *
 * DownvoteView
 *
 */

import React, { useState, useEffect } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { IDapp } from 'domain/Dapps/types';
import DappInfoHeader from 'components/theme/elements/DappInfoHeader';
import DownvoteForm from 'components/views/modules/voteModule/DownvoteForm';
import { DiscoverDownVoteCost } from 'domain/Dapps/contracts/Discover.contract';
import { useSelector } from 'react-redux';
import { makeSelectDappsLoading } from 'domain/Dapps/selectors';
import classNames from 'classnames';
import { appColors, uiConstants } from 'theme';
import LoadingIcon from 'components/theme/elements/LoadingIcon';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      padding: `20px 15px`,
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
  downvote: (dapp: IDapp) => void;
}

const DownvoteView: React.FC<OwnProps> = ({
  classes,
  downvote,
  dapp,
}: OwnProps) => {
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const check = async () => {
      const cost = (await DiscoverDownVoteCost(dapp.id)).c;
      setCost(parseInt(cost));
    };
    check();
  }, [dapp]);

  const loading = useSelector(makeSelectDappsLoading);

  return (
    <section className={classes.root}>
      <section
        className={classNames(classes.loading, {
          ['active']: loading,
        })}
      >
        <LoadingIcon />
      </section>
      <DappInfoHeader dapp={dapp} changeIndicator={-(cost as number)} />
      <DownvoteForm downvote={downvote} cost={cost} dapp={dapp} />
    </section>
  );
};

export default withStyles(styles, { withTheme: true })(DownvoteView);
