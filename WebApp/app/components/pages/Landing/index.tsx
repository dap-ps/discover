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
import { DAPP_CATEGORY_STRINGS, DAPP_CATEGORY_ICONS } from 'utils/constants';
import classNames from 'classnames';
import DappCard from 'components/contentViews/dapps/DappCard';
import GridCarousel from 'components/helpers/GridCarousel';

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

const styles = ({ breakpoints }: Theme) => createStyles({
  root:{
    padding: "0 15px"
  },
  banner:{
    maxWidth: "100vw"
  },
  bannerItem:{
  },
  content: {
    margin: "10px 0"
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
    marginTop: 15,
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 15,
    margin: 4,
    cursor: "pointer",
    color: appColors.general.black.base,
    textDecoration: "none",
    "&:before":{
      content: "''",
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      opacity: 0.2,
      zIndex: uiConstants.global.zIndex.background,
      borderRadius: 10
    },
    ...categoryColors,
    "& span":{
      marginTop: 10,
      fontSize: uiConstants.global.fonts.item.bodySize,
      fontWeight: 500,
    }
  },
  heading:{
  },
  subheading:{

  },
  gridCarousel:{
    margin: "15px 0"
  }
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
          Object.keys(DAPP_CATEGORY_STRINGS).map(key => <Link to={ROUTE_LINKS.categories[key]} key={`${key}`} className={classNames(classes.category, `${key}`)}>
            {DAPP_CATEGORY_ICONS[key].base({})}
            <span>
              {DAPP_CATEGORY_STRINGS[key]}
            </span>
          </Link>)
        }
      </div>
    </section>
    <section className={classes.content}>
      <div className={classes.sectionTitle}>
        <Typography variant="h2" component="span">
          Highest Ranked
        </Typography>
      </div>
      <GridCarousel className={classes.gridCarousel}>
        {
          Object.keys(DAPPS)
            .sort((key0, key1) => DAPPS[key0].votes > DAPPS[key1].votes ? -1 : +1)
            .map(key => <DappCard key={`dapp-${key}`} dapp={DAPPS[key]} />)
        }
      </GridCarousel>
    </section>
    <section className={classes.content}>
      <div className={classes.sectionTitle}>
        <Typography variant="h2" component="span">
          Recently Added
        </Typography>
      </div>
      <GridCarousel className={classes.gridCarousel}>
        {
          Object.keys(DAPPS)
            .sort((key0, key1) => DAPPS[key0].dateAdded > DAPPS[key1].dateAdded ? -1 : +1)
            .map(key => <DappCard key={`dapp-${key}`} dapp={DAPPS[key]} />)
        }
      </GridCarousel>
    </section>
  </article>
}

export default withStyles(styles, { withTheme: true })(Landing);
