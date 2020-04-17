/**
 *
 * Carousel
 *
 */

import React, { Fragment, ReactNode } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, CarouselProviderProps } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { uiConstants } from 'theme';
import classNames from 'classnames';
import { isArray } from 'util';

// TODO: Button styling
// TODO:

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
    button: {

    },
    back: {

    },
    next: {

    }
  });

interface OwnProps extends WithStyles<typeof styles> {
  children: ReactNode[] | ReactNode,
  providerProps: CarouselProviderProps
}

const defaultProps: Partial<CarouselProviderProps> = {
  currentSlide: 0,
  naturalSlideHeight: uiConstants.carousel.defaults.slide.height,
  naturalSlideWidth: uiConstants.carousel.defaults.slide.width,
}

const Carousel: React.SFC<OwnProps> = (props: OwnProps) => {
  const {
    classes,
    children,
    providerProps
  } = props;

  const finalProps = {
    ...defaultProps,
    ...providerProps
  }

  return  <CarouselProvider {...finalProps} >
    <Slider>
      {
        isArray(children) && children.map((item, index) => <Slide index={index}>
          <Fragment>{item}</Fragment>
        </Slide>)
      }
      {
        !isArray(children) && <Slide index={0}>
          {children}
        </Slide>
      }
    </Slider>
    <ButtonBack className={classNames(classes.button, classes.back)}>Back</ButtonBack>
    <ButtonNext className={classNames(classes.button, classes.next)}>Next</ButtonNext>
  </CarouselProvider> ;
};

export default withStyles(styles, { withTheme: true })(Carousel);
