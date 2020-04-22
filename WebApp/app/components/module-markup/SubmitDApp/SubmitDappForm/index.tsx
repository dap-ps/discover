/**
 *
 * SubmitDappForm
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles, Typography, FormControl, Button } from '@material-ui/core';
import { Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import UploadImageField from '../../../forms/fields/UploadImageField';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
  });

interface OwnProps extends WithStyles<typeof styles> {}

const SubmitDappForm: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes } = props;
  return  <Form className={classes.root}>
    <Typography  component="h1" variant="h1">
      SUBMIT A ÐAPP
    </Typography>
    <FormControl>
      <Field name="name" label="Name of your Ðapp" placeholder="Name" component={TextField} />
    </FormControl>
    <FormControl>
      <Field name="description" label="Short Description" placeholder="Max 140 characters" component={TextField} />
    </FormControl>
    <FormControl>
      <Field name="name" label="URL" component={TextField} />
    </FormControl>
    <FormControl>
      <Typography component="h4" variant="h4">
        Upload the logo or icon of your Ðapp
      </Typography>
      <Field component={UploadImageField} name="logo"  />
      <Typography component="h4" variant="h4">
        The image should be a square 1:1 ratio JPG or PNG file, minimum size is 160 × 160 pixels. The image will be placed in a circle
      </Typography>
    </FormControl>
    {/* Category choice */}
    <FormControl>
      <Field name="email" label="Your email" placeholder="email" component={TextField} />
    </FormControl>
    <Typography>
      By continuing you agree to our <span onClick={() => console.log("back a step")}>Terms and Conditions.</span>
    </Typography>
    <div>
      <Button>
        Continue
      </Button>
    </div>
  </Form>;
};

export default withStyles(styles, { withTheme: true })(SubmitDappForm);
