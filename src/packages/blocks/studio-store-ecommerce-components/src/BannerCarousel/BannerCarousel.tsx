import * as React from 'react';
import Carousel from "react-elastic-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useMediaQuery } from 'react-responsive';
import "./assets/css/style.css";

interface BannerCarouselProps {
    className?: any,
    children: any,
    otherProps: any,
    position: 'center' | 'right'
}

export const BannerCarousel: React.FunctionComponent<BannerCarouselProps> = React.forwardRef((props,ref) => {
    const { className = "", children, otherProps, position } = props
    const isMobile = useMediaQuery({ query: '(max-width: 545px)' });
    return (
        <Carousel
            className={`${className} banner-carousel banner-carousel--position-${position || 'right'}`}
            enableSwipe={isMobile}
            ref={ref}
            {...otherProps}
        >
            {children}
        </Carousel>
    );
});
