/**
 *
 * SubmitDAppContainer
 *
 */

import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import HowToSubmitDAppView from 'components/views/modules/SubmitDApp/HowToSubmitDAppView';
import SubmitDAppTermsView from 'components/views/modules/SubmitDApp/SubmitDAppTermsView';
import SubmitDappForm from 'components/views/modules/SubmitDApp/SubmitDappForm';

import * as Yup from 'yup';
import { createStructuredSelector } from 'reselect';
import { RootState } from 'domain/App/types';
// import { fileSizeValidation, MAX_FILE_SIZE, SUPPORTED_IMAGE_FORMATS, fileTypeValidation } from 'fileManagement';
import { Formik } from 'formik';
import UpdateDAppForm from 'components/views/modules/SubmitDApp/UpdateDAppForm';
import { makeSelectDapp } from 'domain/Dapps/selectors';
import { ApplicationRootState } from 'types';

interface OwnProps {
  dappId?: string
}

interface StateProps {
}

interface DispatchProps {}

type Props = DispatchProps & StateProps & OwnProps;

const DAppManagementContainer: React.SFC<Props> = ({
  dappId
}: Props) => {
  if(!dappId){
    // Create DApp
    const [slide, setSlide] = useState<number>(0);

    const SubmitDappSchema = Yup.object().shape({
      name: Yup.string().required("Please provide a name for your Ðapp"),
      logo: Yup.mixed().required("Please provide a logo"),
        // .test('fileSize', 'Maximum file size of 10MB exceeded', file => fileSizeValidation(file, MAX_FILE_SIZE))
        // .test('fileType', 'Please supply an image file', file => fileTypeValidation(file, SUPPORTED_IMAGE_FORMATS)),
      description: Yup.string().max(140,"140 character limit exceeded").required("Please provide a description"),
      url: Yup.string().url("Please provide a valid url").required("Please provide a valid url"),
      category: Yup.string().required("Please select a category"),
      email: Yup.string().email("Please provide a valid email").required("Please provide a valid email"),
    })

    return <Fragment>
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
          category: "",
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
            back={() => setSlide(1)}
            submitForm={submitForm}
          />
        }
      />
      }
    </Fragment>;
  } else {

    const UpdateSchema = Yup.object().shape({
      name: Yup.string().required("Please provide a name for your Ðapp"),
      logo: Yup.mixed().required("Please provide a logo"),
        // .test('fileSize', 'Maximum file size of 10MB exceeded', file => fileSizeValidation(file, MAX_FILE_SIZE))
        // .test('fileType', 'Please supply an image file', file => fileTypeValidation(file, SUPPORTED_IMAGE_FORMATS)),
      description: Yup.string().max(140,"140 character limit exceeded").required("Please provide a description"),
      url: Yup.string().url("Please provide a valid url").required("Please provide a valid url"),
      category: Yup.string().required("Please select a category"),
      email: Yup.string().email("Please provide a valid email").required("Please provide a valid email"),
    })

    return <Formik
      initialValues={{
        name: "",
        logo: "",
        description: "",
        url: "",
        category: "",
        email: ""
      }}
      validationSchema={UpdateSchema}

      onSubmit={
        (values, actions) => {
          console.log(values)
        }
      }

      render={({submitForm}) =>
        <UpdateDAppForm
          submitForm={submitForm}
        />
      }
    />
  }

};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {
    dispatch: dispatch,
  };
};

const mapStateToProps = (state: ApplicationRootState, props: OwnProps) => createStructuredSelector<RootState, StateProps>({
  dapp: props.dappId ? makeSelectDapp(props.dappId) : undefined
});


// const mapStateToProps =  createStructuredSelector<RootState, StateProps>({
// });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DAppManagementContainer);
