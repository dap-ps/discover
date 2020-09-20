/**
 *
 * CategoryModule
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import CategoryView from 'components/views/modules/CategoryView';

interface OwnProps {}

interface DispatchProps {}

type Props = DispatchProps & OwnProps;

const CategoryModule: React.FC<Props> = (props: Props) => {
  return (
    <CategoryView />
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {
    dispatch: dispatch,
  };
};

const withConnect = connect(mapDispatchToProps);

export default compose(withConnect)(CategoryModule);
