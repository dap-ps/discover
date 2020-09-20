/**
 *
 * Carousel
 *
 */

import React, { Fragment, ReactNode } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  CarouselProviderProps,
  Dot,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { uiConstants, brandColors } from 'theme';
import classNames from 'classnames';
import { isArray } from 'util';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
// TODO: Button styling

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      position: 'relative',
    },
    button: {
      position: 'absolute',
      top: '50%',
      border: 0,
      backgroundColor: 'unset',
      borderRadius: 200,
      overflow: 'hidden',
      width: 40,
      height: 40,
      transitionDuration: `${uiConstants.global.animation.speeds.mutation}ms`,
      outline: 'none',
      '&:before': {
        content: "''",
        display: 'block',
        backgroundColor: brandColors.default.main,
        transitionDuration: `${uiConstants.global.animation.speeds.mutation}ms`,
        opacity: 0.3,
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
      },
      '&:hover': {
        '&:before': {
          opacity: 1,
        },
      },
      '& svg': {
        position: 'absolute',
        height: 30,
        width: 30,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
    back: {
      left: 0,
      transform: 'translate(50%, -50%)',
    },
    next: {
      right: 0,
      transform: 'translate(-50%, -50%)',
    },
    dots: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    dot: {
      cursor: 'pointer',
      display: 'block',
      height: 10,
      width: 10,
      margin: '10px 5px',
      border: 0,
      backgroundColor: brandColors.default.main,
      borderRadius: 200,
      opacity: 0.2,
      transitionDuration: `${uiConstants.global.animation.speeds.mutation}ms`,
      '&.carousel__dot--selected': {
        opacity: 1,
      },
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  children: ReactNode[] | ReactNode;
  providerProps?: Partial<CarouselProviderProps>;
  className?: string;
  arrows?: boolean;
}

const defaultProps: CarouselProviderProps = {
  currentSlide: 0,
  naturalSlideHeight: uiConstants.carousel.defaults.slide.height,
  naturalSlideWidth: uiConstants.carousel.defaults.slide.width,
  children: [],
  totalSlides: 1,
  infinite: true,
  isIntrinsicHeight: true,
};

const Carousel: React.FC<OwnProps> = (props: OwnProps) => {
  const { classes, children, providerProps, className, arrows = false } = props;

  const finalProps: CarouselProviderProps = {
    ...defaultProps,
    ...providerProps,
    totalSlides: isArray(children) ? children.length : 1,
  };

  return (
    <CarouselProvider
      className={classNames(classes.root, className)}
      {...finalProps}
    >
      <Slider>
        {isArray(children) &&
          children.map((item, index) => (
            <Slide key={index} index={index}>
              <Fragment>{item}</Fragment>
            </Slide>
          ))}
        {!isArray(children) && <Slide index={0}>{children}</Slide>}
      </Slider>
      <section className={classes.dots}>
        {isArray(children) &&
          children.map((item, index) => (
            <Dot className={classes.dot} key={`dots-${index}`} slide={index}>
              <span></span>
            </Dot>
          ))}
        {!isArray(children) && (
          <Dot className={classes.dot} slide={0}>
            <span></span>
          </Dot>
        )}
      </section>
      {arrows && isArray(children) && children.length > 1 && (
        <Fragment>
          <ButtonBack className={classNames(classes.button, classes.back)}>
            <ChevronLeft />
          </ButtonBack>
          <ButtonNext className={classNames(classes.button, classes.next)}>
            <ChevronRight />
          </ButtonNext>
        </Fragment>
      )}
    </CarouselProvider>
  );
};

export default withStyles(styles, { withTheme: true })(Carousel);
