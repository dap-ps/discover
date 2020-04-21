/**
 *
 * HowToSubmitDAppView
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
    header:{

    },
    infoBlock:{

    }
  });

interface OwnProps extends WithStyles<typeof styles> {}

const HowToSubmitDAppView: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes } = props;
  return <article className={classes.root}>
    <header>
      How to submit a dapp
    </header>
    <section>
      <Typography>
        Submit your ÐApp
      </Typography>
      <ol>
        <li>
          Upload a name, url, description, category and image for your DApp in the next step compulsory.
        </li>
        <li>
          Stake the amount of SNT you want to rank your DApp optional.
        </li>
        <li>
          Hit “submit”.
        </li>
        <li>
          Our team will ensure that your DApp works well on mobile devices and will then include it on the live site using the information you provided in Step 1.
        </li>
      </ol>
      <Typography>
        Staking
      </Typography>
      <Typography variant="body1" component="p">
        You need not stake anything to be included - your DApp just won’t appear in the “Highest Ranked” section. If you do stake SNT, your DApp will appear in that section immediately. The DApp with the highest effective balance (that is, SNT staked plus/minus votes cast for/against) ranks highest.
      </Typography>
      <Typography variant="body1" component="p">
        SNT you stake is locked in the Discover contract. You can, at any time, withdraw a percentage of what you have staked. The more you stake, the lower the percentage you can withdraw. Withdrawals must be made from the same wallet as you submitted with, so PLEASE SECURE THIS ADDRESS.
      </Typography>
      <div className={classes.infoBlock}>
        <ol>
          <li>
            Staking 10 000 SNT returns a rate of 99.5%, so you can withdraw up to 9 950 SNT.
          </li>
          <li>
            Staking 1 000 000 SNT returns a rate of 50.99%, so you can withdraw up to 509 958 SNT.
          </li>
        </ol>
      </div>
      <Typography variant="body1" component="p">
        Furthermore, the operators of <Link to="https://dap.ps" target="_blank">https://dap.ps</Link> reserve the right to remove any DApp from the UI for reasons including, but not limited to:
      </Typography>
      <div className={classes.infoBlock}>
        <ol>
          <li>
            Malicious code injection
          </li>
          <li>
            Violation of <Link to="https://status.im/about/" target="_blank">Status' principles</Link>
          </li>
          <li>
            Lack of usability (especially on mobile)
          </li>
          <li>
            Vote manipulation.
          </li>
        </ol>
      </div>
      <Typography variant="body1" component="p">
        Anyone is welcome to fork the software and implement different UI choices for the same underlying contract. Note that Discover is not affiliated with Status directly, we have simply chosen to use SNT as a token of value, to abide by <Link to="https://status.im/about/" target="_blank">Status' principles</Link>, and to take a mobile-first approach to development.
      </Typography>
    </section>
    <Button variant="outlined">
      Continue
    </Button>
  </article>;
};

export default withStyles(styles, { withTheme: true })(HowToSubmitDAppView);
