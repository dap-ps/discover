/**
 *
 * HowToSubmitÐAppView
 *
 */

import React from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Typography,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { uiConstants, appColors, brandColors } from 'theme';

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
    // @ts-ignore
    content: {
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
    heading: {
      fontSize: 15,
      color: appColors.general.gray.base,
      margin: '10px 0',
    },
    infoBlock: {
      border: `1px solid ${appColors.general.gray.light}`,
      borderRadius: 16,
      margin: '15px 0',
      padding: '10px 15px',
      '& ol': {
        margin: '0',
        listStyle: 'none',
        counterReset: 'li',
        paddingLeft: 20,
        '& li': {
          margin: '5px 0',
          counterIncrement: 'li',
          position: 'relative',
          fontSize: 14,
          '&:before': {
            content: "counter(li) '.'",
            color: appColors.general.gray.base,
            display: 'inline-block',
            width: '1em',
            position: 'absolute',
            left: -20,
          },
        },
      },
    },
    footer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
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
  });

interface OwnProps extends WithStyles<typeof styles> {
  nextPage: () => void;
}

const HowToSubmitDAppView: React.FC<OwnProps> = (props: OwnProps) => {
  const { classes, nextPage } = props;
  return (
    <article className={classes.root}>
      <header className={classes.header}>
        <Typography variant="h1" component="h1">
          How to submit a Ðapp
        </Typography>
      </header>
      <section className={classes.content}>
        <Typography className={classes.heading} variant="h3" component="h4">
          Submit your ÐApp
        </Typography>
        <div className={classes.infoBlock}>
          <ol>
            <li>
              Upload a name, url, description, category and image for your ÐApp
              in the next step compulsory.
            </li>
            <li>
              Stake the amount of SNT you want to rank your ÐApp optional.
            </li>
            <li>Hit “submit”.</li>
            <li>
              Our team will ensure that your ÐApp works well on mobile devices
              and will then include it on the live site using the information
              you provided in Step 1.
            </li>
          </ol>
        </div>
        <Typography className={classes.heading} variant="h3" component="h4">
          Staking
        </Typography>
        <Typography variant="body1" component="p">
          You need not stake anything to be included - your ÐApp just won’t
          appear in the “Highest Ranked” section. If you do stake SNT, your ÐApp
          will appear in that section immediately. The ÐApp with the highest
          effective balance (that is, SNT staked plus/minus votes cast
          for/against) ranks highest.
        </Typography>
        <Typography variant="body1" component="p">
          SNT you stake is locked in the Discover contract. You can, at any
          time, withdraw a percentage of what you have staked. The more you
          stake, the lower the percentage you can withdraw. Withdrawals must be
          made from the same wallet as you submitted with, so PLEASE SECURE THIS
          ADDRESS.
        </Typography>
        <div className={classes.infoBlock}>
          <ol>
            <li>
              Staking <strong>10 000 SNT</strong> returns a rate of{' '}
              <strong>99.5%</strong>, so you can withdraw up to{' '}
              <strong>9 950 SNT</strong>.
            </li>
            <li>
              Staking <strong>1 000 000 SNT</strong> returns a rate of{' '}
              <strong>50.99%</strong>, so you can withdraw up to{' '}
              <strong>509 958 SNT</strong>.
            </li>
          </ol>
        </div>
        <Typography variant="body1" component="p">
          Furthermore, the operators of{' '}
          <Link to="https://dap.ps" target="_blank">
            https://dap.ps
          </Link>{' '}
          reserve the right to remove any ÐApp from the UI for reasons
          including, but not limited to:
        </Typography>
        <div className={classes.infoBlock}>
          <ol>
            <li>Malicious code injection</li>
            <li>
              Violation of{' '}
              <Link to="https://status.im/about/" target="_blank">
                Status' principles
              </Link>
            </li>
            <li>Lack of usability (especially on mobile)</li>
            <li>Vote manipulation.</li>
          </ol>
        </div>
        <Typography variant="body1" component="p">
          Anyone is welcome to fork the software and implement different UI
          choices for the same underlying contract. Note that Discover is not
          affiliated with Status directly, we have simply chosen to use SNT as a
          token of value, to abide by{' '}
          <Link to="https://status.im/about/" target="_blank">
            Status' principles
          </Link>
          , and to take a mobile-first approach to development.
        </Typography>
      </section>
      <footer className={classes.footer}>
        <Button variant="outlined" onClick={nextPage}>
          Continue
        </Button>
      </footer>
    </article>
  );
};

export default withStyles(styles, { withTheme: true })(HowToSubmitDAppView);
