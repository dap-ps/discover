/**
 *
 * VoteModuleView
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { MODAL_COMPONENTS } from 'domain/App/constants';
import DownvoteContainer from 'containers/modules/VoteModule/subContainers/DownvoteContainer';
import UpvoteContainer from 'containers/modules/VoteModule/subContainers/UpvoteContainer';
import classNames from 'classnames';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
  });

interface OwnProps extends WithStyles<typeof styles> {
  modalState: MODAL_COMPONENTS;
  setModal(
    component: MODAL_COMPONENTS
  ): void;
}

const VoteModuleView: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes, modalState, setModal } = props;
  return <article className={classes.root}>
    <header>
      <span onClick={() => setModal(MODAL_COMPONENTS.UPVOTE)}>
        Upvote
      </span>
      <span onClick={() => setModal(MODAL_COMPONENTS.DOWNVOTE)}>
        Downvote
      </span>
    </header>
    <div className={classNames(classes.root, modalState === MODAL_COMPONENTS.UPVOTE  ? "upvote" : modalState === MODAL_COMPONENTS.DOWNVOTE ? "downvote" : "" )}>
      <UpvoteContainer />
      <DownvoteContainer />
    </div>
  </article>
};

export default withStyles(styles, { withTheme: true })(VoteModuleView);
