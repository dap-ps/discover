import { WithStyles, useMediaQuery, Typography } from '@material-ui/core';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import DappFeature from 'components/theme/content/DappFeature';
import { FEATURED_DAPPS } from 'domain/Dapps/mocks';
import { uiConstants, brandColors, appColors } from 'theme';
import Carousel from 'components/views/modules/Carousel';
import { CarouselProviderProps } from 'pure-react-carousel';
import { Link } from 'react-router-dom';
import { ROUTE_LINKS } from 'routeLinks';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { DAPP_CATEGORY_STRINGS, DAPP_CATEGORY_ICONS } from 'utils/constants';
import classNames from 'classnames';
import DappCard from 'components/theme/content/DappCard';
import GridCarousel from 'components/theme/elements/GridCarousel';
import { IDapp } from 'domain/Dapps/types';
import { forwardTo } from 'utils/history';


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
      '& svg': {
        height: 52,
      },
    },
    heading: {},
    subheading: {},
    gridCarousel: {
      margin: '15px 0',
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  theme: Theme;
  dapps: IDapp[];
}

const Landing: React.SFC<OwnProps> = ({ classes, dapps, theme }: OwnProps) => {
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const tablet = useMediaQuery(theme.breakpoints.up('sm'));

  const desktopCarouselSettings: Partial<CarouselProviderProps> = {
    visibleSlides: uiConstants.banner.itemsPerSlide.desktop,
  };
  const tabletCarouselSettings: Partial<CarouselProviderProps> = {
    visibleSlides: uiConstants.banner.itemsPerSlide.tablet,
  };
  const mobileCarouselSettings: Partial<CarouselProviderProps> = {
    visibleSlides: uiConstants.banner.itemsPerSlide.mobile,
  };

  return (
    <article className={classes.root}>
      <Carousel
        arrows={true}
        providerProps={
          desktop
            ? desktopCarouselSettings
            : tablet
            ? tabletCarouselSettings
            : mobileCarouselSettings
        }
      >
        {FEATURED_DAPPS.map((key) => (
          <DappFeature
            className={classes.bannerItem}
            key={`feature-${key}`}
            dapp={
              dapps.find(
                (dapp: IDapp) => dapp.name.toLowerCase() == key.toLowerCase(),
              ) as IDapp
            }
          />
        ))}
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
          {Object.keys(DAPP_CATEGORY_STRINGS).map((key) => (
            <Link
              to={ROUTE_LINKS.categories[key]}
              key={`${key}`}
              className={classNames(classes.category, `${key}`)}
            >
              {DAPP_CATEGORY_ICONS[key].base({})}
              <span>{DAPP_CATEGORY_STRINGS[key]}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className={classes.content}>
        <div className={classes.sectionTitle}>
          <Typography variant="h2" component="span">
            Highest Ranked
          </Typography>
        </div>
        <GridCarousel className={classes.gridCarousel}>
          {dapps
            .sort((dapp0, dapp1) => (dapp0.votes > dapp1.votes ? -1 : +1))
            .map((dapp) => (
              <DappCard
                onClick={() =>
                  forwardTo(ROUTE_LINKS.Discover(dapp.ipfsHash as string))
                }
                key={`dapp-${dapp.ipfsHash}`}
                dapp={dapp}
              />
            ))}
        </GridCarousel>
      </section>
      <section className={classes.content}>
        <div className={classes.sectionTitle}>
          <Typography variant="h2" component="span">
            Recently Added
          </Typography>
        </div>
        <GridCarousel className={classes.gridCarousel}>
          {dapps
            .sort((dapp0, dapp1) =>
              dapp0.dateAdded > dapp1.dateAdded ? -1 : +1,
            )
            .map((dapp) => (
              <DappCard
                onClick={() =>
                  forwardTo(ROUTE_LINKS.Discover(dapp.ipfsHash as string))
                }
                key={`dapp-${dapp.ipfsHash}`}
                dapp={dapp}
              />
            ))}
        </GridCarousel>
      </section>
    </article>
  );
};

export default withStyles(styles, { withTheme: true })(Landing);
