/**
 *
 * SubmitÐAppTermsView
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
import { appColors, uiConstants, brandColors } from 'theme';
import ExpandSection from 'components/theme/elements/ExpandSection';

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
      margin: '30px 0',
    },
    infoBlock: {
      border: `1px solid ${appColors.general.gray.light}`,
      borderRadius: 16,
      margin: '15px 0',
      padding: '10px 15px',
      '& p': {
        fontWeight: 500,
      },
    },
    termSection: {
      '& p': {
        textIndent: 20,
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

const SubmitDAppTermsView: React.FC<OwnProps> = (props: OwnProps) => {
  const { classes, nextPage } = props;
  return (
    <article className={classes.root}>
      <header className={classes.header}>
        <Typography variant="h1" component="h1">
          Terms and Conditions
        </Typography>
      </header>
      <section className={classes.content}>
        <Typography className={classes.heading} variant="h2" component="h3">
          Terms and conditions
        </Typography>
        <div className={classes.infoBlock}>
          <Typography variant="body1" component="p">
            You must be over 13, agree that using our service is legal in your
            jurisdiction, and that you won't do anything illegal with what we
            provide.
          </Typography>
          <Typography variant="body1" component="p">
            We are not lawyers or financial advisors, and you use this software
            at your own risk.
          </Typography>
        </div>
        <ExpandSection className={classes.termSection}>
          <Typography variant="body1" component="p">
            You accept the Terms by either (1) clicking to agree or accept where
            these options are presented to you, or (2) actually using Discover
            (“Discover”) at{' '}
            <Link to="https://dap.ps" target="_blank">
              https://dap.ps
            </Link>
          </Typography>
          <Typography variant="body1" component="p">
            In order to use Discover you must be 13 years of age or older. If
            you are between 13 and 18 years of age, you must have your parent or
            legal guardian’s permission to use Discover.
          </Typography>
          <Typography variant="body1" component="p">
            By accessing Discover you accept the terms of use as set out herein.
            All information is provided of a mere general nature for
            informational purposes only. By accessing Discover you warrant to
            the operators, contributors and the host thereof that you may
            freely, without limitation, access the ÐApp store and all of its
            contents in your jurisdiction and shall not use Discover and its
            contents in any way that infringes on laws or the rights of others
            including those of the aforementioned persons (including the
            entities they may represent).
          </Typography>
          <Typography variant="body1" component="p">
            Neither Discover nor any of the persons or entities involved in any
            way in respect of Discover, including its host and its contributors,
            provide for specific legal, fiscal, economical and/or any other kind
            of advice or recommendation that may be relied upon. A visitor to
            Discover will therefore act at their own risk in accessing or in any
            way relying on the content of the Discover and the visitor is
            therefore solely responsible for any consequences thereof.
          </Typography>
        </ExpandSection>

        <Typography className={classes.heading} variant="h2" component="h3">
          Your Responsibilities
        </Typography>
        <div className={classes.infoBlock}>
          <Typography variant="body1" component="p">
            You will protect your users' information, no matter what.
          </Typography>
          <Typography variant="body1" component="p">
            You will not use information you do not have permission to use, and
            you may not hack anyone by submitting malicious code or otherwise
            manipulating our service.
          </Typography>
        </div>
        <ExpandSection className={classes.termSection}>
          <Typography variant="body1" component="p">
            You agree that if You make Your ÐApp available through Discover, You
            will protect the privacy and legal rights of users. If the users
            provide You with, or Your ÐApp accesses or uses, usernames,
            passwords, or other login information or personal information, You
            agree to make the users aware that the information will be available
            to Your ÐApp, and You agree to provide legally adequate privacy
            notice and protection for those users. Further, Your ÐApp may only
            use that information for the limited purposes for which the user has
            given You permission to do so.
          </Typography>
          <Typography variant="body1" component="p">
            If Your ÐApp stores personal or sensitive information provided by
            users, You agree to do so securely and only for as long as it is
            needed. However, if the user has opted into a separate agreement
            with You that allows You or Your ÐApp to store or use personal or
            sensitive information directly related to Your ÐApp (not including
            other products or applications), then the terms of that separate
            agreement will govern Your use of such information.
          </Typography>
          <Typography variant="body1" component="p">
            You will not engage in any activity with Discover, including making
            Your ÐApp available via Discover, that interferes with, disrupts,
            damages, or accesses in an unauthorized manner the devices, servers,
            networks, or other properties or services of any third party
            including, but not limited to, Status or any Authorized Provider.
            You may not use user information obtained via Discover to sell or
            distribute ÐApp outside of Discover.
          </Typography>
          <Button variant="outlined">Read more</Button>
        </ExpandSection>

        <Typography className={classes.heading} variant="h2" component="h3">
          Limitation of liability
        </Typography>
        <div className={classes.infoBlock}>
          <Typography variant="body1" component="p">
            The people responsible for Discover are not liable for your
            mistakes.
          </Typography>
        </div>
        <ExpandSection className={classes.termSection}>
          <Typography variant="body1" component="p">
            The content, data, materials and/or other services on Discover are
            provided without any warranties of any kind regarding its title,
            ownership, accuracy, completeness and correctness.
          </Typography>
          <Typography variant="body1" component="p">
            Specifically, unless otherwise required by law, in no event shall
            the operators, contributors to or hosts of Discover be liable for
            any damages of any kind, including, but not limited to, loss of use,
            loss of assets or rights or privileges, loss of profits, or loss of
            data arising out of or in any way connected with the use of the
            ÐApps and the information thereon from time to time.
          </Typography>
          <Typography variant="body1" component="p">
            In no way are the operators, contributors to or host of Discover
            responsible for the actions, decisions, transactions, or other
            behavior taken or not taken by You or person relying on You in
            reliance upon Discover and its contents from time to time.
          </Typography>
          <Button variant="outlined">Read more</Button>
        </ExpandSection>

        <Typography className={classes.heading} variant="h2" component="h3">
          Limitation of liability
        </Typography>
        <Typography variant="body1" component="p">
          Swiss law exclusively applies to the use of content, data, materials
          and/or other services provided for/on Discover. The court of the
          Canton of Zug, Switzerland, will be the sole and exclusive competent
          court regarding any dispute relating to or stemming from the use of
          Discover including, without limitation, in respect of any breach of or
          dispute in respect as referred above, irrespective of the jurisdiction
          applicable thereto.
        </Typography>

        <Typography className={classes.heading} variant="h2" component="h3">
          Last Amendment
        </Typography>
        <Typography variant="body1" component="p">
          These terms of use were amended for the last time on 15th April 2019
          and may be altered at any time without prior notice.
        </Typography>
        <Typography variant="body1" component="p">
          <strong>Good luck reaching the top of the rankings!</strong>
        </Typography>
      </section>
      <footer className={classes.footer}>
        <Button variant="outlined" onClick={nextPage}>
          Get Started
        </Button>
      </footer>
    </article>
  );
};

export default withStyles(styles, { withTheme: true })(SubmitDAppTermsView);
