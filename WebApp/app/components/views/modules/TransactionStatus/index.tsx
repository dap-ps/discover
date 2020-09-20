/**
 *
 * TransactionStatus
 *
 */

import React, { useState, useEffect } from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Typography,
} from '@material-ui/core';
import { uiConstants, appColors } from 'theme';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { makeSelectNetwork } from 'domain/App/selectors';
import LoadingSpinnerSVG from '../../../../images/loading-spinner.svg';
import { TRANSACTION_STATUS } from 'utils/constants';
import { getNetworkName } from 'domain/App/blockchainUtils';
import { makeSelectTransaction } from 'domain/Wallet/selectors';
import { clearAwaitTxAction } from 'domain/Wallet/actions';

// TODO see if this should be configurable from theme object
const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      position: 'fixed',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      opacity: 0,
      top: uiConstants.global.pageMargin,
      left: '50%',
      transitionDuration: `${uiConstants.global.animation.speeds.mutation}ms`,
      transform: `translate(-50%, calc(-100% - ${uiConstants.global.pageMargin}px))`,
      borderRadius: 16,
      backgroundColor: appColors.general.backgroundColor,
      boxShadow:
        '0px 4px 12px rgba(0, 34, 51, 0.08), 0px 2px 4px rgba(0, 34, 51, 0.16)',
      ...uiConstants.modal.padding,
      zIndex: 1000,
      '&.active': {
        opacity: 1,
        transform: `translate(-50%, 0)`,
      },
      minWidth: 350,
    },
    icon: {
      width: 60,
      '& img': {
        width: 40,
        height: 40,
        borderRadius: '50%',
        marginRight: 16,
      },
    },
    close: {
      position: 'absolute',
      display: 'block',
      zIndex: uiConstants.global.zIndex.raisedElement,
      borderRadius: 200,
      backgroundColor: uiConstants.modal.close.backgroundColor,
      ...uiConstants.modal.close.position,
      top: uiConstants.modal.padding.paddingTop,
      right: uiConstants.modal.padding.paddingRight,
      height: uiConstants.modal.close.size / 2,
      width: uiConstants.modal.close.size / 2,
      transform: 'translate(50%, -50%)',
      cursor: 'pointer',
      transitionDuration: `${uiConstants.global.animation.speeds.mutation}ms`,
      '&:before,&:after': {
        content: "''",
        position: 'absolute',
        top: '50%',
        left: '50%',
        display: 'block',
        height: uiConstants.modal.close.lineThickness,
        width: uiConstants.modal.close.lineLength / 2,
        backgroundColor: uiConstants.modal.close.lineColor,
      },
      '&:before': {
        transform: 'translate(-50%, -50%) rotateZ(-45deg)',
      },
      '&:after': {
        transform: 'translate(-50%, -50%) rotateZ(45deg)',
      },
      '&:hover': {
        backgroundColor: uiConstants.modal.close.hoverColor,
      },
    },
    meta: {
      fontSize: 15,
      '& > *:first-child': {
        fontWeight: 600,
      },
    },
    state: {
      marginTop: uiConstants.modal.padding.paddingTop,
      width: '100%',
      color: appColors.general.blue.base,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center ',
      lineHeight: 15,
      fontSize: 12,
      '& svg': {
        height: 16,
        width: 16,
      },
      '&.failure': {
        color: appColors.general.red.base,
      },
    },
  });

interface OwnProps extends WithStyles<typeof styles> {}

const TransactionStatus: React.FC<OwnProps> = ({ classes }: OwnProps) => {
  const [active, setActive] = useState(false);
  const transaction = useSelector(makeSelectTransaction);
  const networkId = useSelector(makeSelectNetwork);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!transaction && active) {
      setActive(false);
    }
    if (transaction && !active) {
      setActive(true);
    }
  }, [transaction]);

  const handleDismiss = () => {
    setActive(false);
    dispatch(clearAwaitTxAction());
  };

  return (
    <div
      className={classNames(classes.root, {
        ['active']: active,
      })}
    >
      <section className={classes.icon}>
        {transaction?.iconSrc && (
          <img src={transaction.iconSrc} alt={transaction.heading} />
        )}
      </section>
      <section className={classes.meta}>
        <Typography>{transaction?.heading}</Typography>
        <Typography>{transaction?.caption}</Typography>
      </section>
      {transaction?.state == TRANSACTION_STATUS.PENDING && (
        <div className={classes.state}>
          <LoadingSpinnerSVG />
          <Typography>Waiting for confirmation from Ethereum...</Typography>
        </div>
      )}
      {transaction?.state == TRANSACTION_STATUS.SUCCESS && (
        <div className={classes.state}>
          <Typography>
            ✓ Transaction Successfull{' '}
            <a
              target="_blank"
              href={`https://${
                networkId != 1 ? `${getNetworkName(networkId)}.` : ''
              }etherscan.io/tx/${transaction?.hash}`}
            >
              View on Etherscan
            </a>
          </Typography>
        </div>
      )}
      {transaction?.state == TRANSACTION_STATUS.FAILURE && (
        <div className={classNames(classes.state, 'failure')}>
          <Typography>
            Transaction failed. Please check EtherScan for tx:{' '}
            <a
              target="_blank"
              href={`https://${
                networkId != 1 ? `${getNetworkName(networkId)}.` : ''
              }etherscan.io/tx/${transaction?.hash}`}
            >
              {transaction?.hash}
            </a>
          </Typography>
        </div>
      )}
      <section
        onClick={() => handleDismiss()}
        className={classes.close}
      ></section>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(TransactionStatus);
