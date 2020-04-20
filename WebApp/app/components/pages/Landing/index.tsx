import { Theme, WithStyles, useMediaQuery } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import DappFeature from 'components/contentViews/dapps/DappFeature';
import { DAPPS, FEATURED_DAPPS } from 'domain/Dapps/mocks';
import { uiConstants } from 'theme';
import Carousel from 'components/module-markup/Carousel';
import { CarouselProviderProps } from 'pure-react-carousel';

const styles = ({ spacing, breakpoints }: Theme) => createStyles({
  root:{
  },
  banner:{
    maxWidth: "100vw"
  },
  bannerItem:{
    // Mobile


  },
  heading:{
  },
  subheading:{

  },
});

interface OwnProps extends WithStyles<typeof styles> {
  theme: Theme
}

const Landing: React.SFC<OwnProps> = (props: OwnProps) => {
  const {
    classes,
    theme
  } = props;
  console.log(props)
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const tablet = useMediaQuery(theme.breakpoints.up('sm'));

  const desktopCarouselSettings: Partial<CarouselProviderProps>= {
    visibleSlides: uiConstants.banner.itemsPerSlide.desktop
  }

  const tabletCarouselSettings: Partial<CarouselProviderProps>= {
    visibleSlides: uiConstants.banner.itemsPerSlide.tablet
  }
  const mobileCarouselSettings: Partial<CarouselProviderProps>= {
    visibleSlides: uiConstants.banner.itemsPerSlide.mobile
  }

  return <article className={classes.root}>
    <Carousel providerProps={desktop ? desktopCarouselSettings : tablet ? tabletCarouselSettings : mobileCarouselSettings}>
      {
        FEATURED_DAPPS.map(key => <DappFeature className={classes.bannerItem} key={`feature-${key}`} dapp={DAPPS[key]} />)
      }
    </Carousel>
  </article>
}

export default withStyles(styles, { withTheme: true })(Landing);
