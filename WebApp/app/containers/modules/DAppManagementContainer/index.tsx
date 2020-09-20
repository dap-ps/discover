/**
 *
 * SubmitDAppContainer
 *
 */

import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { compose, Dispatch } from 'redux';
import HowToSubmitDAppView from 'components/views/modules/SubmitDApp/HowToSubmitDAppView';
import SubmitDAppTermsView from 'components/views/modules/SubmitDApp/SubmitDAppTermsView';
import SubmitDappForm from 'components/views/modules/SubmitDApp/SubmitDappForm';

import * as Yup from 'yup';
// import { fileSizeValidation, MAX_FILE_SIZE, SUPPORTED_IMAGE_FORMATS, fileTypeValidation } from 'fileManagement';
import { Formik } from 'formik';
import UpdateDAppForm from 'components/views/modules/SubmitDApp/UpdateDAppForm';
import {
  makeSelectDappsLoading,
  makeSelectNumberOfDapps,
  makeSelectDappByName,
  makeSelectDappNames,
} from 'domain/Dapps/selectors';
import StakeAndPublishView from 'components/views/modules/SubmitDApp/StakeAndPublishView';
import { IDapp } from 'domain/Dapps/types';
import { createDappAction, updateDappAction } from 'domain/Dapps/actions';
import DAppSubmittedView from 'components/views/modules/SubmitDApp/DAppSubmittedView';
import { useRouteMatch, match } from 'react-router-dom';
import { ROUTE_LINKS } from 'routeLinks';
import LoadingIcon from 'components/theme/elements/LoadingIcon';
import { generateUri } from 'api/apiUrlBuilder';
import { forwardTo } from 'utils/history';
import { makeSelectWalletAddress } from 'domain/Wallet/selectors';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {
  createDapp: (dapp: IDapp, stake: number) => void;
  updateDapp: (dapp: IDapp) => void;
}

interface RouteParams {
  dappname: string;
  voteType: string;
}

type Props = DispatchProps & StateProps & OwnProps;

enum SLIDES {
  HOW_TO = 'howTo',
  TERMS = 'terms',
  FORM = 'form',
  SUBMIT = 'submit',
  COMPLETE = 'complete',
}

const DAppManagementContainer: React.FC<Props> = ({
  createDapp,
  updateDapp,
}: Props) => {
  const match: match<RouteParams> | null = useRouteMatch({
    path: ROUTE_LINKS.UpdateDApp(':dappname'),
    strict: true,
    sensitive: true,
  });
  const dappNames = useSelector(makeSelectDappNames);
  const address = useSelector(makeSelectWalletAddress);

  if (!match?.params.dappname) {
    // Create DApp
    const loading = useSelector(makeSelectDappsLoading);
    const numberOfDapps = useSelector(makeSelectNumberOfDapps);
    const [initialCountDapps] = useState(numberOfDapps);
    const [sentToChain, setSentToChain] = useState(false);

    const [slide, setSlide] = useState<SLIDES>(SLIDES.HOW_TO);
    const [newDapp, setNewDapp] = useState<Partial<IDapp>>({
      name: '',
      icon: '',
      desc: '',
      url: '',
      category: '',
      email: '',
      sntValue: 0,
    });
    useEffect(() => {
      if (slide == SLIDES.SUBMIT) {
        if (numberOfDapps > initialCountDapps) {
          setSlide(SLIDES.COMPLETE);
        }
      }
    }, [loading, newDapp, slide]);

    const SubmitDappSchema = Yup.object().shape({
      name: Yup.string()
        .test(
          'Name duplicate',
          'Dapp by name already exists',
          (input: string) => dappNames.indexOf(input.toLowerCase()) < 0,
        )
        .required('Please provide a name for your Ðapp'),
      icon: Yup.mixed().required('Please provide a logo'),
      // .test('fileSize', 'Maximum file size of 10MB exceeded', file => fileSizeValidation(file, MAX_FILE_SIZE))
      // .test('fileType', 'Please supply an image file', file => fileTypeValidation(file, SUPPORTED_IMAGE_FORMATS)),
      desc: Yup.string()
        .max(140, '140 character limit exceeded')
        .required('Please provide a description'),
      url: Yup.string()
        .url('Please provide a valid url')
        .required('Please provide a valid url'),
      category: Yup.string().required('Please select a category'),
      email: Yup.string()
        .email('Please provide a valid email')
        .required('Please provide a valid email'),
    });

    switch (slide) {
      case SLIDES.HOW_TO:
        return <HowToSubmitDAppView nextPage={() => setSlide(SLIDES.TERMS)} />;
      case SLIDES.TERMS:
        return <SubmitDAppTermsView nextPage={() => setSlide(SLIDES.FORM)} />;
      case SLIDES.FORM:
        return (
          <Formik
            initialValues={{
              name: newDapp.name,
              icon: newDapp.icon,
              desc: newDapp.desc,
              url: newDapp.url,
              category: newDapp.category,
              email: newDapp.email,
            }}
            validationSchema={SubmitDappSchema}
            onSubmit={(values, actions) => {
              setNewDapp({
                ...values,
              });
              setSlide(SLIDES.SUBMIT);
            }}
            render={({ submitForm }) => (
              <SubmitDappForm
                back={() => setSlide(SLIDES.TERMS)}
                submitForm={submitForm}
              />
            )}
          />
        );
      case SLIDES.SUBMIT:
        return (
          <StakeAndPublishView
            loading={loading}
            submit={(stake) => {
              setNewDapp({
                ...newDapp,
                sntValue: stake,
              });
              createDapp(newDapp as IDapp, stake);
              if (stake > 0) {
                setSentToChain(true);
              }
            }}
            dapp={newDapp}
          />
        );
      case SLIDES.COMPLETE:
        return (
          <DAppSubmittedView
            variant={sentToChain ? 'completed' : 'pending-review'}
          />
        );
    }
  } else {
    const dapp = useSelector(makeSelectDappByName(match.params.dappname));

    const UpdateSchema = Yup.object().shape({
      name: Yup.string()
        .test(
          'Name duplicate',
          'Dapp by name already exists',
          (input: string) => dappNames.indexOf(input.toLowerCase()) < 0,
        )
        .required('Please provide a name for your Ðapp'),
      icon: Yup.mixed().required('Please provide a logo'),
      // .test('fileSize', 'Maximum file size of 10MB exceeded', file => fileSizeValidation(file, MAX_FILE_SIZE))
      // .test('fileType', 'Please supply an image file', file => fileTypeValidation(file, SUPPORTED_IMAGE_FORMATS)),
      desc: Yup.string()
        .max(140, '140 character limit exceeded')
        .required('Please provide a description'),
      url: Yup.string()
        .url('Please provide a valid url')
        .required('Please provide a valid url'),
      category: Yup.string().required('Please select a category'),
      email: Yup.string()
        .email('Please provide a valid email')
        .required('Please provide a valid email'),
    });

    if (dapp) {
      if (dapp.uploader.toLowerCase() != address.toLowerCase()) {
        forwardTo(ROUTE_LINKS.Discover(dapp.id));
      }
      return (
        <Formik
          initialValues={{
            name: dapp.name,
            icon: dapp.icon?.includes('base64')
              ? dapp.icon
              : generateUri(dapp.icon),
            desc: dapp.desc,
            url: dapp.url,
            category: dapp.category,
            email: dapp.email,
          }}
          validationSchema={UpdateSchema}
          onSubmit={(values, actions) => {
            updateDapp({
              ...dapp,
              ...values,
            });
          }}
          render={({ submitForm }) => (
            <UpdateDAppForm submitForm={submitForm} />
          )}
        />
      );
    } else {
      return (
        <section>
          <LoadingIcon />
        </section>
      );
    }
  }
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {
    createDapp: (dapp: IDapp, stake: number) => {
      dispatch(
        createDappAction.request({
          ...dapp,
          sntValue: stake,
        }),
      );
    },
    updateDapp: (dapp: IDapp) => {
      dispatch(updateDappAction.request(dapp));
    },
  };
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(DAppManagementContainer);
