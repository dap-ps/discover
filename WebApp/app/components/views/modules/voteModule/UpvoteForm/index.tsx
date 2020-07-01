/**
 *
 * UpvoteForm
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TOKENS } from 'utils/constants';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
  });

interface OwnProps extends WithStyles<typeof styles> {}

const UpvoteForm: React.SFC<OwnProps> = ({ classes }: OwnProps) => {

  const UpvoteSchema = Yup.object().shape({
    amount: Yup.number()
      .min(1)
      .required('Please input a value'),
  });

  return  <Formik
    initialValues={{
      amount: 0,
      token: TOKENS.SNT
    }}
    validationSchema={UpvoteSchema}
    onSubmit={(values, actions) => {
      console.log(values);
    }}
    render={({ submitForm }) => (
      <></>
    )}
  />
};

export default withStyles(styles, { withTheme: true })(UpvoteForm);
