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

import * as Yup from 'yup';
import { createStructuredSelector } from 'reselect';
import { RootState } from 'domain/App/types';
import { fileSizeValidation, MAX_FILE_SIZE, SUPPORTED_IMAGE_FORMATS, fileTypeValidation } from 'fileManagement';
import { Formik } from 'formik';

interface OwnProps {}

interface StateProps {

}

interface DispatchProps {}

type Props = DispatchProps & StateProps & OwnProps;

const SubmitDAppContainer: React.SFC<Props> = (props: Props) => {
  const [slide, setSlide] = useState<number>(0);

  const SubmitDappSchema = Yup.object().shape({
    name: Yup.string().required("Please provide a name for your Ðapp"),
    logo: Yup.mixed()
      .test('fileSize', 'Maximum file size of 10MB exceeded', file => fileSizeValidation(file, MAX_FILE_SIZE))
      .test('fileType', 'Please supply an image file', file => fileTypeValidation(file, SUPPORTED_IMAGE_FORMATS)),
    description: Yup.string().max(140,"140 character limit exceeded").required(),
    url: Yup.string().url("Please provide a valid url").required(),
    // category: Yup.string().email("Please provide a valid email").required(),
    email: Yup.string().email("Please provide a valid email").required(),
  })

  return <Fragment>)
    {
      slide === 0 && <HowToSubmitDAppView nextPage={() => setSlide(1)} />
    }
    {
      slide === 1 && <SubmitDAppTermsView nextPage={() => setSlide(2)} />
    }
    {
      slide === 2 && <Formik
      initialValues={{
        name: "",
        logo: "",
        description: "",
        url: "",
        email: ""
      }}
      validationSchema={SubmitDappSchema}

      onSubmit={
        (values, actions) => {
          console.log(values)
        }
      }

      render={({submitForm}) =>
      <SubmitDappForm
        submitForm={submitForm}
      />

      }
    />
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

const mapStateToProps = createStructuredSelector<RootState, StateProps>({
});

const withConnect = connect(
  mapDispatchToProps,
  mapStateToProps
);

export default compose(withConnect)(SubmitDAppContainer);
