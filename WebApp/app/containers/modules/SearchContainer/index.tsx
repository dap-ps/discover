/**
 *
 * SearchContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import SearchView from 'components/views/modules/SearchView';

interface OwnProps {}

interface DispatchProps {}

type Props = DispatchProps & OwnProps;

const SearchContainer: React.FC<Props> = (props: Props) => {
  return <SearchView />;
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

export default compose(withConnect)(SearchContainer);
