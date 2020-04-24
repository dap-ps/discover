/**
 *
 * SearchContainer
 *
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import SearchView from 'components/module-markup/SearchView';

interface OwnProps {}

interface DispatchProps {}

type Props = DispatchProps & OwnProps;

const SearchContainer: React.SFC<Props> = (props: Props) => {

  const [searchTerm, setSearchTerm] = useState<string>("");
  // TODO: wire up
  console.log(`Search input: ${searchTerm}`)
  return <SearchView setSearchTerm={setSearchTerm} />
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
