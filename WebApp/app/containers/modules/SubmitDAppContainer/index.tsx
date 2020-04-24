/**
 *
 * SubmitDAppContainer
 *
 */

import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import HowToSubmitDAppView from 'components/module-markup/SubmitDApp/HowToSubmitDAppView';
import SubmitDAppTermsView from 'components/module-markup/SubmitDApp/SubmitDAppTermsView';
import SubmitDappForm from 'components/module-markup/SubmitDApp/SubmitDappForm';

interface OwnProps {}

interface DispatchProps {}

type Props = DispatchProps & OwnProps;

const SubmitDAppContainer: React.SFC<Props> = (props: Props) => {
  const [slide, setSlide] = useState<number>(0);
  return <Fragment>
    {
      slide === 0 && <HowToSubmitDAppView nextPage={() => setSlide(1)} />
    }
    {
      slide === 1 && <SubmitDAppTermsView continue={() => setSlide(2)} />
    }
    {
      slide === 2 && <SubmitDappForm />
    }
  </Fragment>;
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

export default compose(withConnect)(SubmitDAppContainer);
