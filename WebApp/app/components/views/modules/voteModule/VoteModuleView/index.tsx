/**
 *
 * VoteModuleView
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import DownvoteContainer from 'containers/modules/VoteModule/subContainers/DownvoteContainer';
import UpvoteContainer from 'containers/modules/VoteModule/subContainers/UpvoteContainer';
import classNames from 'classnames';
import { ROUTE_LINKS } from 'routeLinks';
import { Link, useLocation } from 'react-router-dom';
import { appColors } from 'theme';
import UpvoteArrow from '../../../../../images/icons/upvote-arrow.svg';
import DownvoteArrow from '../../../../../images/icons/downvote-arrow.svg';
import { useSelector } from 'react-redux';
import { makeSelectDappByName } from 'domain/Dapps/selectors';
import { IDapp } from 'domain/Dapps/types';
import LoadingIcon from 'components/theme/elements/LoadingIcon';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      borderBottom: `1px solid ${appColors.general.gray.background}`,
      '& > *': {
        textTransform: 'uppercase',
        position: 'relative',
        display: 'block',
        padding: `15px 0px 10px`,
        margin: `0px 15px`,
        textDecoration: 'none',
        transitionDuration: '200ms',
        color: appColors.general.gray.base,
        '& svg': {
          transitionDuration: '200ms',
          fill: appColors.general.gray.base,
          position: 'relative',
          top: -1,
          marginRight: 5,
          '& path': {
            stroke: appColors.general.gray.base,
          },
        },
        '&:after': {
          content: `''`,
          display: 'block',
          height: 1,
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transitionDuration: '200ms',
          transform: 'translate(-50%, -50%)',
          width: `calc(100% - 20px)`,
        },
      },

      '& .active': {
        color: appColors.general.blue.base,
        '& svg': {
          transitionDuration: '200ms',
          fill: appColors.general.blue.base,
          '& path': {
            stroke: appColors.general.blue.base,
          },
        },
        '&:after': {
          backgroundColor: appColors.general.blue.base,
        },
      },
    },
    viewArea: {
      position: 'relative',

      '& > *': {
        transitionDuration: '400ms',
        opacity: 0,
        visibility: 'hidden',
        overflow: 'hidden',
        height: 0,
        '& > svg': {
          height: 40,
          width: 40,
          margin: '10px auto',
          display: 'block',
        },
      },
      '&.upvote > *:first-child': {
        opacity: 1,
        visibility: 'visible',
        height: 'initial',
      },
      '&.downvote > *:last-child': {
        opacity: 1,
        visibility: 'visible',
        height: 'initial',
      },
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  upvote: boolean;
  dappname: string;
}

const VoteModuleView: React.FC<OwnProps> = ({
  classes,
  upvote,
  dappname,
}: OwnProps) => {
  const location = useLocation();
  const dapp: IDapp | undefined = useSelector(makeSelectDappByName(dappname));
  return (
    <article className={classes.root}>
      <header className={classes.header}>
        <Link
          className={
            location.pathname == ROUTE_LINKS.Vote(dappname, 'upvote')
              ? 'active'
              : ''
          }
          to={ROUTE_LINKS.Vote(dappname, 'upvote')}
        >
          <UpvoteArrow />
          Upvote
        </Link>
        <Link
          className={
            location.pathname == ROUTE_LINKS.Vote(dappname, 'downvote')
              ? 'active'
              : ''
          }
          to={ROUTE_LINKS.Vote(dappname, 'downvote')}
        >
          <DownvoteArrow />
          Downvote
        </Link>
      </header>
      <div
        className={classNames(classes.viewArea, upvote ? 'upvote' : 'downvote')}
      >
        <div>{dapp ? <UpvoteContainer dapp={dapp} /> : <LoadingIcon />}</div>
        <div>{dapp ? <DownvoteContainer dapp={dapp} /> : <LoadingIcon />}</div>
      </div>
    </article>
  );
};

export default withStyles(styles, { withTheme: true })(VoteModuleView);
