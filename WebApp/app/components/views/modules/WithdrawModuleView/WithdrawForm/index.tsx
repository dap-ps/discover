/**
 *
 * WithdrawForm
 *
 */

import React, { useEffect, useState } from 'react';
import { Theme, createStyles, withStyles, WithStyles, TextField, Typography, Button } from '@material-ui/core';
import { IDapp } from 'domain/Dapps/types';
import { makeSelectDappsLoading } from 'domain/Dapps/selectors';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field, Formik } from 'formik';
import { appColors } from 'theme';
import { TOKENS } from 'utils/constants';
import { DiscoverWithdrawMax } from 'domain/Dapps/contracts/Discover.contract';
import { withdrawAction } from 'domain/Dapps/actions';

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
  });

interface OwnProps extends WithStyles<typeof styles> {
  dapp: IDapp
}

const WithdrawForm: React.SFC<OwnProps> = ({ classes, dapp }: OwnProps) => {
  const loading = useSelector(makeSelectDappsLoading);


  const [max, setMax] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      const temp = await DiscoverWithdrawMax(dapp.id)
      setMax(temp)
    }
    fetch()
  }, [])

  const token = TOKENS.SNT;

  const WithdrawSchema = Yup.object().shape({
    amount: Yup.number()
      .min(1, 'Minimum amount is 1')
      .max(max, "Maximum amount exceeded")
      // TODO Validate against balance
      .test('updatingChange', '', (value: number) => {
        // setIndicator(value);
        return true;
      })
      .required('Please input a value'),
  });

  const dispatch = useDispatch()


  return (
    <Formik
      initialValues={{
        amount: 0,
      }}
      validationSchema={WithdrawSchema}
      onSubmit={(values, actions) => {
        // upvote(dapp, values.amount, token);
        dispatch(withdrawAction.request({
          amount: values.amount,
          desc: dapp.desc,
          icon: dapp.icon,
          id: dapp.id,
          max: values.amount == max,
          name: dapp.name
        }))
      }}
      render={({ submitForm, values, setFieldValue }) => (
        <Form className={classes.root}>
          <section className={classes.inputSection}>
            <Field
              className={classes.field}
              name="amount"
              type="number"
              step="1"
              component={TextField}
            />
            <span className={classes.tokenLabel}>{token}</span>
            <Typography onClick={() => setFieldValue("amount", max)}>
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
            <Button variant="outlined" onClick={() => submitForm()}>
              Withdraw
            </Button>
          </section>
        </Form>
      )}
    />
  )
};

export default withStyles(styles, { withTheme: true })(WithdrawForm);
