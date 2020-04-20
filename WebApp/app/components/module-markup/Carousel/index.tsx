/**
 *
 * Carousel
 *
 */

import React, { Fragment, ReactNode } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, CarouselProviderProps, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { uiConstants, brandColors } from 'theme';
import classNames from 'classnames';
import { isArray } from 'util';

// TODO: Button styling

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
    button: {

    },
    back: {

    },
    next: {

    },
    dots:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    },
    dot:{
      cursor: "pointer",
      display: "block",
      height: 10,
      width: 10,
      margin: "10px 5px",
      border: 0,
      backgroundColor: brandColors.default.main,
      borderRadius: 200,
      opacity: 0.2,
      transitionDuration: uiConstants.global.animation.speeds.mutation,
      "&.carousel__dot--selected":{
        opacity: 1
      }
    }
  });

interface OwnProps extends WithStyles<typeof styles> {
  children: ReactNode[] | ReactNode,
  providerProps?: Partial<CarouselProviderProps>
}

const defaultProps: CarouselProviderProps = {
  currentSlide: 0,
  naturalSlideHeight: uiConstants.carousel.defaults.slide.height,
  naturalSlideWidth: uiConstants.carousel.defaults.slide.width,
  children: [],
  totalSlides: 1,
  infinite: true,
  isIntrinsicHeight: true
}

const Carousel: React.SFC<OwnProps> = (props: OwnProps) => {
  const {
    classes,
    children,
    providerProps
  } = props;

  const finalProps: CarouselProviderProps = {
    ...defaultProps,
    ...providerProps,
    totalSlides: isArray(children) ? children.length : 1
  }

  return  <CarouselProvider {...finalProps} >
    <Slider>
      {
        isArray(children) && children.map((item, index) => <Slide key={index} index={index}>
          <Fragment>{item}</Fragment>
        </Slide>)
      }
      {
        !isArray(children) && <Slide index={0}>
          {children}
        </Slide>
      }
    </Slider>
    <section className={classes.dots}>
    {
      isArray(children) && children.map((item, index) => <Dot className={classes.dot} key={`dots-${index}`} slide={index}>
        <span></span>
      </Dot>)
    }
    {
      !isArray(children) && <Dot className={classes.dot} slide={0}>
        <span></span>
      </Dot>
    }

    </section>
    <ButtonBack className={classNames(classes.button, classes.back)}>Back</ButtonBack>
    <ButtonNext className={classNames(classes.button, classes.next)}>Next</ButtonNext>
  </CarouselProvider> ;
};

export default withStyles(styles, { withTheme: true })(Carousel);
