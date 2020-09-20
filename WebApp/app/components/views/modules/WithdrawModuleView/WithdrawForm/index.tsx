/**
 *
 * WithdrawForm
 *
 */

import React, { useEffect, useState } from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Typography,
  Button,
} from '@material-ui/core';
import { IDapp } from 'domain/Dapps/types';
import { makeSelectDappsLoading } from 'domain/Dapps/selectors';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field, Formik } from 'formik';
import { appColors, uiConstants } from 'theme';
import { TOKENS } from 'utils/constants';
import { DiscoverWithdrawMax } from 'domain/Dapps/contracts/Discover.contract';
import { withdrawAction } from 'domain/Dapps/actions';
import { TextField } from 'formik-material-ui';
import classNames from 'classnames';
import LoadingIcon from 'components/theme/elements/LoadingIcon';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
    inputSection: {
      display: 'flex',
      justifyContent: 'center',
      // alignItems: 'center',
      fontSize: 32,
      position: 'relative',
      '&:after': {
        position: 'absolute',
        content: '""',
        display: 'block',
        bottom: 0,
        left: '50%',
        backgroundColor: appColors.general.gray.background,
        height: 1,
        width: 'calc(100% + 30px)',
        transform: 'translate(-50%, 0)',
      },
    },
    field: {
      width: '50%',
      maxWidth: '50%',
      '& > *': {
        '&:before,&:after': {
          display: 'none',
        },
      },
      '& input': {
        fontSize: 32,
        textAlign: 'right',
      },
    },
    tokenLabel: {
      maxWidth: '50%',
      width: '50%',
      height: 51,
      display: 'flex',
      alignItems: 'center',
      marginLeft: 5,
      color: appColors.general.gray.base,
    },
    information: {
      color: appColors.general.gray.base,
      padding: `20px 0`,
      position: 'relative',
      '&:after': {
        position: 'absolute',
        content: '""',
        display: 'block',
        bottom: 0,
        left: '50%',
        backgroundColor: appColors.general.gray.background,
        height: 1,
        width: 'calc(100% + 30px)',
        transform: 'translate(-50%, 0)',
      },
      '& a': {
        textDecoration: 'none',
        color: appColors.general.blue.base,
      },
    },
    ctas: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
    },
    setMax: {
      cursor: 'pointer',
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translate(0, -50%)',
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
  dapp: IDapp;
}

const WithdrawForm: React.FC<OwnProps> = ({ classes, dapp }: OwnProps) => {
  const loading = useSelector(makeSelectDappsLoading);

  const [max, setMax] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const temp = await DiscoverWithdrawMax(dapp.id);
      setMax(temp);
    };
    fetch();
  }, []);

  const token = TOKENS.SNT;

  const WithdrawSchema = Yup.object().shape({
    amount: Yup.number()
      .min(1, 'Minimum amount is 1')
      .max(max, 'Maximum amount exceeded')
      .required('Please input a value'),
  });

  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        amount: 0,
      }}
      validationSchema={WithdrawSchema}
      onSubmit={(values, actions) => {
        dispatch(
          withdrawAction.request({
            amount: values.amount,
            desc: dapp.desc,
            icon: dapp.icon,
            id: dapp.id,
            max: values.amount == max,
            name: dapp.name,
          }),
        );
      }}
      render={({ submitForm, values, setFieldValue }) => (
        <Form className={classes.root}>
          <section
            className={classNames(classes.loading, {
              ['active']: loading,
            })}
          >
            <LoadingIcon />
          </section>
          <section className={classes.inputSection}>
            <Field
              className={classes.field}
              name="amount"
              type="number"
              step="1"
              min="0"
              component={TextField}
            />
            <span className={classes.tokenLabel}>{token}</span>
            <Typography
              className={classes.setMax}
              onClick={() => setFieldValue('amount', max)}
            >
              Set Max
            </Typography>
          </section>
          <section className={classes.information}>
            <Typography>
              {token} you spend to rank your DApp is locked in the store. You
              can earn back through votes, or withdraw, the majority of this{' '}
              {token} at any time.
            </Typography>
          </section>
          <section className={classes.ctas}>
            <Button
              size="large"
              disabled={values.amount == 0 || values.amount > max}
              variant="outlined"
              onClick={() => submitForm()}
            >
              Withdraw
            </Button>
          </section>
        </Form>
      )}
    />
  );
};

export default withStyles(styles, { withTheme: true })(WithdrawForm);
