import { Theme, WithStyles, useMediaQuery, Typography } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import DappFeature from 'components/contentViews/dapps/DappFeature';
import { DAPPS, FEATURED_DAPPS } from 'domain/Dapps/mocks';
import { uiConstants, brandColors, appColors } from 'theme';
import Carousel from 'components/module-markup/Carousel';
import { CarouselProviderProps } from 'pure-react-carousel';
import { Link } from 'react-router-dom';
import { ROUTE_LINKS } from 'routeLinks';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { DAPP_CATEGORY_STRINGS } from 'utils/constants';
import classNames from 'classnames';

let categoryColors = {};
Object.keys(DAPP_CATEGORY_STRINGS).map(key => {
  categoryColors = {
    ...categoryColors,
    [`&.${key}`]: {
      "&:before": {
        backgroundColor: appColors.sections[key].base
      }
    }
  }
})

const styles = ({ spacing, breakpoints }: Theme) => createStyles({
  root:{
    padding: "0 15px"
  },
  banner:{
    maxWidth: "100vw"
  },
  bannerItem:{
  },
  content: {
  },
  sectionTitle:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    "& span":{
      fontSize: 17,
      fontWeight: 700
    }
  },
  link:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: brandColors.default.main,
    textDecoration: "none",
  },
  categories:{
    display: "grid",
    [breakpoints.up('xs')]: {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr 1fr"
    },
    [breakpoints.up('sm')]:{
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr"
    },
    [breakpoints.up('md')]: {
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      gridTemplateRows: "unset",
    },

  },
  category:{
    position: "relative",
    "&:before":{
      content: "''",
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      opacity: 0.2,
      zIndex: -1
    },
    ...categoryColors
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
    <section className={classes.content}>
      <div className={classes.sectionTitle}>
        <Typography variant="h2" component="span">
          Categories
        </Typography>
        <Link className={classes.link} to={ROUTE_LINKS.categories.All}>
          View All <ArrowRightAltIcon />
        </Link>
      </div>
      <div className={classes.categories}>
        {
          Object.keys(DAPP_CATEGORY_STRINGS).map(key => <div key={`${key}`} className={classNames(classes.category, `${key}`)}>
            <span>
              {DAPP_CATEGORY_STRINGS[key]}
            </span>
          </div>)
        }
      </div>
    </section>
  </article>
}

export default withStyles(styles, { withTheme: true })(Landing);
