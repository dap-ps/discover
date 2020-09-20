/**
 *
 * UpdateDAppForm
 *
 */

import React from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Typography,
  FormControl,
  Button,
} from '@material-ui/core';
import { Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import UploadImageField from '../../../../theme/formElements/UploadImageField';
import { uiConstants, appColors, brandColors } from 'theme';
import CategorySelector from 'components/theme/formElements/CategorySelector';
import classNames from 'classnames';
import { makeSelectDappsLoading } from 'domain/Dapps/selectors';
import { useSelector } from 'react-redux';
import LoadingIcon from 'components/theme/elements/LoadingIcon';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      ...uiConstants.modal.padding,
      height: '100%',
    },
    header: {
      position: 'relative',
      paddingBottom: uiConstants.modal.padding.paddingTop,
      '&:before': {
        content: "''",
        display: 'block',
        position: 'absolute',
        bottom: 0,
        left: -uiConstants.modal.padding.paddingRight,
        height: 1,
        width: `calc(100% + ${
          uiConstants.modal.padding.paddingLeft +
          uiConstants.modal.padding.paddingRight
        }px)`,
        backgroundColor: appColors.general.gray.light,
      },
      '& h1': {
        textAlign: 'center',
        fontWeight: 600,
        fontSize: 17,
      },
    },
    heading: {
      fontSize: 15,
      color: appColors.general.gray.base,
      margin: '10px 0',
    },
    // @ts-ignore
    content: {
      display: 'flex',
      flexDirection: 'column',
      // The modal's max height is 100vh - margin top & bottom, then the modal has padding, and the header has padding, and the lineheight is 19
      height: `calc(100vh -
        ${
          uiConstants.modal.margin * 2 +
          (uiConstants.modal.padding.paddingTop +
            uiConstants.modal.padding.paddingBottom * 2 +
            19) *
            2
        }px)`,
      ...uiConstants.global.mixins.scrollBar,
      padding: '10px',
      '& > p': {
        textIndent: 20,
        margin: '5px 0',
        fontSize: 14,
      },
      '& a': {
        color: brandColors.default.main,
        textDecoration: 'none',
      },
    },
    input: {
      display: 'block',
      margin: '10px 0',
      width: '100%',
    },
    footer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '15px 0 0',
      position: 'relative',
      '&:before': {
        content: "''",
        display: 'block',
        position: 'absolute',
        top: 0,
        left: -uiConstants.modal.padding.paddingRight,
        height: 1,
        width: `calc(100% + ${
          uiConstants.modal.padding.paddingLeft +
          uiConstants.modal.padding.paddingRight
        }px)`,
        backgroundColor: appColors.general.gray.light,
      },
    },
    link: {
      color: brandColors.default.main,
      cursor: 'pointer',
    },
    loading: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: 10,
      opacity: 0,
      visibility: 'hidden',
      transitionDuration: `${uiConstants.global.animation.speeds.mutation}ms`,
      '& svg': {
        height: 80,
        width: 80,
      },
      '&.active': {
        opacity: 1,
        visibility: 'visible',
      },
      '&:before': {
        content: "''",
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        borderRadius: '20px',
        opacity: 0.4,
        backgroundColor: appColors.general.backgroundColor,
      },
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  submitForm(): void;
}

const UpdateDAppForm: React.FC<OwnProps> = ({
  classes,
  submitForm,
}: OwnProps) => {
  const loading = useSelector(makeSelectDappsLoading);

  return (
    <Form className={classes.root}>
      <section
        className={classNames(classes.loading, {
          ['active']: loading,
        })}
      >
        <LoadingIcon />
      </section>
      <header className={classes.header}>
        <Typography component="h1" variant="h1">
          Update ÐApp
        </Typography>
      </header>
      <section className={classes.content}>
        <FormControl className={classes.input}>
          <Field component={UploadImageField} name="icon" />
        </FormControl>
        <FormControl className={classes.input}>
          <Field
            fullWidth
            size="small"
            name="name"
            label="Name of your Ðapp"
            placeholder="Name"
            variant="outlined"
            component={TextField}
          />
        </FormControl>
        <FormControl className={classes.input}>
          <Field
            fullWidth
            size="small"
            name="desc"
            label="Short Description"
            variant="outlined"
            max="140"
            multiline
            rows={4}
            rowsMax={10}
            placeholder="Max 140 characters"
            component={TextField}
          />
        </FormControl>
        <FormControl className={classes.input}>
          <Field
            fullWidth
            size="small"
            name="url"
            label="URL"
            variant="outlined"
            component={TextField}
          />
        </FormControl>
        <FormControl className={classes.input}>
          <Field
            fullWidth
            size="small"
            name="email"
            label="Your email"
            placeholder="email"
            variant="outlined"
            component={TextField}
          />
        </FormControl>
        <FormControl className={classes.input}>
          <Field name="category" component={CategorySelector} />
        </FormControl>
      </section>
      <footer className={classes.footer}>
        <Button size="large" variant="outlined" onClick={() => submitForm()}>
          Submit changes
        </Button>
      </footer>
    </Form>
  );
};

export default withStyles(styles, { withTheme: true })(UpdateDAppForm);
