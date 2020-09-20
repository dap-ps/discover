/**
 *
 * GridCarousel
 *
 */

import React, { ReactNode } from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  useMediaQuery,
} from '@material-ui/core';
import { CarouselProviderProps } from 'pure-react-carousel';
import Carousel from 'components/views/modules/Carousel';
import classNames from 'classnames';
import { isArray } from 'util';
import { uiConstants } from 'theme';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
    gridSlide: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      '&.four': {
        '& > *': {
          width: `calc(25% - 20px)`,
        },
      },
      '&.three': {
        '& > *': {
          width: `calc(33% - 20px)`,
        },
      },
      '&.two': {
        '& > *': {
          width: `calc(50% - 20px)`,
        },
      },
      '&.one': {
        left: '12.5%',
        position: 'relative',
        '& > *': {
          width: '75%',
        },
      },
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  children: ReactNode[] | ReactNode;
  providerProps?: Partial<CarouselProviderProps>;
  className?: string;
  theme: Theme;
  perSlide?: number
  columns?: "four" | "three" | "two" | "one"
}

const GridCarousel: React.FC<OwnProps> = ({
    classes, 
    children, 
    className, 
    providerProps, 
    theme, 
    perSlide, 
    columns
  }: OwnProps) => {

  const large = useMediaQuery(theme.breakpoints.up('lg'));
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const tablet = useMediaQuery(theme.breakpoints.up('sm'));

  const createGridSlide = (children: ReactNode[]): Array<ReactNode[]> => {
    let slides: Array<ReactNode[]> = [];
    const internalPerSlide: number = perSlide 
      ? perSlide 
      : large
      ? uiConstants.gridCarousel.itemsPerSlide.large
      : desktop
      ? uiConstants.gridCarousel.itemsPerSlide.desktop
      : tablet
      ? uiConstants.gridCarousel.itemsPerSlide.tablet
      : uiConstants.gridCarousel.itemsPerSlide.mobile;

    for (let i = 0; i < children.length; i++) {
      if (i % internalPerSlide == 0) {
        slides.push([]);
      }
      slides[slides.length - 1].push(children[i]);
    }
    return slides;
  };

  return (
    <Carousel
      className={classNames(classes.root, className)}
      providerProps={{
        ...providerProps,
      }}
    >
      {isArray(children) ? (
        createGridSlide(children).map((slideItems, index) => (
          <div
            className={classNames(
              classes.gridSlide,
              columns 
                ? columns
                : large
                ? 'four'
                : desktop
                ? 'three'
                : tablet
                ? 'two'
                : 'one',
            )}
            key={`grid-slide-${index}`}
          >
            {slideItems}
          </div>
        ))
      ) : (
        <div
          className={classNames(
            classes.gridSlide,
            columns 
              ? columns
              : large
              ? 'four'
              : desktop
              ? 'three'
              : tablet
              ? 'two'
              : 'one',
          )}
        >
          {children}
        </div>
      )}
    </Carousel>
  );
};

export default withStyles(styles, { withTheme: true })(GridCarousel);
