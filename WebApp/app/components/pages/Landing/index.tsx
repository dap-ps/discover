import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import SimpleWideBanner from 'components/helpers/SimpleWideBanner';
import DappFeature from 'components/contentViews/dapps/DappFeature';
import { DAPPS, FEATURED_DAPPS } from 'domain/Dapps/mocks';

// Future feature
// import { connectorsByName } from 'utils/connectors';
// import { AbstractConnector } from '@web3-react/abstract-connector'

const styles = ({ spacing, breakpoints }: Theme) => createStyles({
  root:{
  },
  heading:{
  },
  subheading:{

  },
});

interface OwnProps extends WithStyles<typeof styles> {

}

const Landing: React.SFC<OwnProps> = (props: OwnProps) => {
  const {
    classes,
  } = props;

  return <article className={classes.root}>
    <SimpleWideBanner>
      {
        FEATURED_DAPPS.map(key => <DappFeature key={`feature-${key}`} dapp={DAPPS[key]} />)
      }
    </SimpleWideBanner>
  </article>
}

export default withStyles(styles, { withTheme: true })(Landing);
