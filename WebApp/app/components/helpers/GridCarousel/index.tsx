/**
 *
 * GridCarousel
 *
 */

import React, { ReactNode } from 'react';
import { Theme, createStyles, withStyles, WithStyles, useMediaQuery } from '@material-ui/core';
import { CarouselProviderProps } from 'pure-react-carousel';
import Carousel from 'components/module-markup/Carousel';
import classNames from 'classnames';
import { isArray } from 'util';
import { uiConstants } from 'theme';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {

    },
    gridSlide: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      "&.desktop":{
        "& > *":{
          width: "25%"
        }
      },
      "&.tablet": {
        "& > *":{
          width: "33%"
        }
      },
      "&.mobile":{
        left: "12.5%",
        position: "relative",
        "& > *":{
          width: "75%"
        }
      },

    }
  });

interface OwnProps extends WithStyles<typeof styles> {
  children: ReactNode[] | ReactNode,
  providerProps?: Partial<CarouselProviderProps>,
  className?: string,
  theme: Theme
}



const GridCarousel: React.SFC<OwnProps> = (props: OwnProps) => {
  const {
    classes,
    children,
    className,
    providerProps,
    theme
  } = props;

  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const tablet = useMediaQuery(theme.breakpoints.up('sm'));

  const createGridSlide = (children: ReactNode[]): Array<ReactNode[]> => {
    let slides: Array<ReactNode[]> = [];
    const perSlide: number = desktop ? uiConstants.gridCarousel.itemsPerSlide.desktop : tablet ? uiConstants.gridCarousel.itemsPerSlide.tablet : uiConstants.gridCarousel.itemsPerSlide.mobile;

    for(let i = 0; i < children.length; i++){
      if(i % perSlide == 0){
        slides.push([]);
      }
      slides[slides.length - 1].push(children[i])
    }
    return slides
  }


  return <Carousel className={classNames(classes.root, className)} providerProps={{
    ...providerProps,
  }}>
    {
      isArray(children) ? createGridSlide(children).map((slideItems, index) => <div className={classNames(classes.gridSlide, desktop ? "desktop" : tablet ? "tablet" : "mobile")} key={`grid-slide-${index}`}>
        {slideItems}
      </div>) : <div className={classNames(classes.gridSlide, desktop ? "desktop" : tablet ? "tablet" : "mobile")}>
        {children}
      </div>
    }
  </Carousel>;
};

export default withStyles(styles, { withTheme: true })(GridCarousel);
