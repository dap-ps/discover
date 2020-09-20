import {
  Theme,
  WithStyles,
  useMediaQuery,
  Typography,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import DappFeature from 'components/theme/content/DappFeature';
import { CarouselProviderProps } from 'pure-react-carousel';
import { Link } from 'react-router-dom';
import { ROUTE_LINKS } from 'routeLinks';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { DAPP_CATEGORY_STRINGS, DAPP_CATEGORY_ICONS } from 'utils/constants';
import classNames from 'classnames';
import DappCard from 'components/theme/content/DappCard';
import GridCarousel from 'components/theme/elements/GridCarousel';
import { appColors, uiConstants, brandColors } from 'theme';
import Carousel from 'components/views/modules/Carousel';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectDapps,
  makeSelectFeaturedDapps,
} from 'domain/Dapps/selectors';
import { IDapp } from 'domain/Dapps/types';
import { forwardTo } from 'utils/history';
import LoadingIcon from 'components/theme/elements/LoadingIcon';

let categoryColors = {};
Object.keys(DAPP_CATEGORY_STRINGS).map((key) => {
  categoryColors = {
    ...categoryColors,
    [`&.${key}`]: {
      '&:before': {
        backgroundColor: appColors.sections[key].base,
      },
    },
  };
});

const styles = ({ breakpoints }: Theme) =>
  createStyles({
    root: {
      padding: '0 15px',
    },
    banner: {
      maxWidth: '100vw',
    },
    bannerItem: {},
    content: {
      margin: '10px 0',
    },
    sectionTitle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& span': {
        fontSize: 17,
        fontWeight: 700,
      },
    },
    link: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: brandColors.default.main,
      textDecoration: 'none',
    },
    categories: {
      display: 'grid',
      marginTop: 15,
      [breakpoints.up('xs')]: {
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr 1fr',
      },
      [breakpoints.up('sm')]: {
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr',
      },
      [breakpoints.up('md')]: {
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridTemplateRows: 'unset',
      },
    },
    category: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: 15,
      margin: 4,
      cursor: 'pointer',
      color: appColors.general.black.base,
      textDecoration: 'none',
      '& svg': {
        height: 52,
      },
      '&:before': {
        content: "''",
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        opacity: 0.2,
        zIndex: uiConstants.global.zIndex.background,
        borderRadius: 10,
      },
      ...categoryColors,
      '& span': {
        marginTop: 10,
        fontSize: uiConstants.global.fonts.item.bodySize,
        fontWeight: 500,
      },
    },
    heading: {},
    subheading: {},
    gridCarousel: {
      margin: '15px 0',
    },
    loading: {
      padding: '20px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& svg': {
        display: 'block',
        height: 80,
        width: 80,
      },
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  theme: Theme;
}

const Landing: React.FC<OwnProps> = (props: OwnProps) => {
  const { classes, theme } = props;
  const large = useMediaQuery(theme.breakpoints.up('lg'));
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const tablet = useMediaQuery(theme.breakpoints.up('sm'));

  const { dapps, featuredDapps } = useSelector(
    createStructuredSelector({
      dapps: makeSelectDapps(),
      featuredDapps: makeSelectFeaturedDapps,
    }),
  );

  const largeCarouselSettings: Partial<CarouselProviderProps> = {
    dragEnabled: true,
    visibleSlides: uiConstants.banner.itemsPerSlide.large,
  };

  const desktopCarouselSettings: Partial<CarouselProviderProps> = {
    dragEnabled: true,
    visibleSlides: uiConstants.banner.itemsPerSlide.desktop,
  };

  const tabletCarouselSettings: Partial<CarouselProviderProps> = {
    dragEnabled: true,
    visibleSlides: uiConstants.banner.itemsPerSlide.tablet,
  };
  
  const mobileCarouselSettings: Partial<CarouselProviderProps> = {
    dragEnabled: true,
    visibleSlides: uiConstants.banner.itemsPerSlide.mobile,
  };

  const displayArrows = large 
    ? featuredDapps.length > uiConstants.banner.itemsPerSlide.large
    : desktop
      ? featuredDapps.length > uiConstants.banner.itemsPerSlide.desktop
      : tablet 
        ? featuredDapps.length > uiConstants.banner.itemsPerSlide.tablet
        :  featuredDapps.length > uiConstants.banner.itemsPerSlide.mobile

  return (
    <article className={classes.root}>
      {featuredDapps.length == 0 ? (
        <section className={classes.loading}>
          <LoadingIcon />
        </section>
      ) : (
        <Carousel
          arrows={displayArrows}
          providerProps={
            large
              ? largeCarouselSettings
              : desktop
              ? desktopCarouselSettings
              : tablet
              ? tabletCarouselSettings
              : mobileCarouselSettings
          }
        >
          {featuredDapps.map((dapp: IDapp) => (
            <DappFeature
              className={classes.bannerItem}
              key={`feature-${dapp.name}`}
              dapp={dapp}
            />
          ))}
        </Carousel>
      )}
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
          {Object.keys(DAPP_CATEGORY_STRINGS).map(
            (key: string, index: number) => (
              <Link
                to={ROUTE_LINKS.categories[key]}
                key={`${index}-${key}`}
                className={classNames(classes.category, `${key}`)}
              >
                {DAPP_CATEGORY_ICONS[key].base({})}
                <span>{DAPP_CATEGORY_STRINGS[key]}</span>
              </Link>
            ),
          )}
        </div>
      </section>
      <section className={classes.content}>
        <div className={classes.sectionTitle}>
          <Typography variant="h2" component="span">
            Highest Ranked
          </Typography>
        </div>
        {dapps.length == 0 ? (
          <section className={classes.loading}>
            <LoadingIcon />
          </section>
        ) : (
          <GridCarousel providerProps={{
            dragEnabled: true,
          }} className={classes.gridCarousel}>
            {dapps
              .sort((dapp0, dapp1) => (dapp0.votes > dapp1.votes ? -1 : +1))
              .map((dapp: IDapp, index: number) => (
                <DappCard
                  onClick={() => forwardTo(ROUTE_LINKS.Discover(dapp.name))}
                  key={`dapp-${index}-${dapp.name}`}
                  dapp={dapp}
                />
              ))}
          </GridCarousel>
        )}
      </section>
      <section className={classes.content}>
        <div className={classes.sectionTitle}>
          <Typography variant="h2" component="span">
            Recently Added
          </Typography>
        </div>
        {dapps.length == 0 ? (
          <section className={classes.loading}>
            <LoadingIcon />
          </section>
        ) : (
          <GridCarousel
            providerProps={{
              dragEnabled: true,
            }}  
            className={classes.gridCarousel}>
            {dapps
              .sort((dapp1, dapp2) =>
                dapp1.dateAdded > dapp2.dateAdded ? -1 : +1,
              )
              .map((dapp: IDapp, index: number) => (
                <DappCard
                  onClick={() => forwardTo(ROUTE_LINKS.Discover(dapp.name))}
                  key={`dapp-${index}-${dapp.name}`}
                  dapp={dapp}
                />
              ))}
          </GridCarousel>
        )}
      </section>
    </article>
  );
};

export default withStyles(styles, { withTheme: true })(Landing);
