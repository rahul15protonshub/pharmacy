import * as React from 'react';
import './assets/css/style.css';
import { useMediaQuery } from 'react-responsive';
import Carousel from "react-elastic-carousel";

const chevronLeft = require('./assets/images/chevron-left.svg');
const chevronRight = require('./assets/images/chevron-right.svg');

interface ArrowAnimateCarouselProps {
    children: any[],
    carouselProps?: any
}

export const ArrowAnimateCarousel: React.FunctionComponent<ArrowAnimateCarouselProps> = (props) => {
    const { children, carouselProps } = props
    const renderArrow = (props: any) => {
        const { type, onClick, isEdge } = props;
        if (type === 'PREV') {
            return (
                <button
                    className="carousel__back-button"
                    style={{
                        border: "none",
                        outline: "none",
                        background: "transparent"
                    }}
                    disabled={isEdge}
                    onClick={onClick}
                >
                    <img
                        src={chevronLeft}
                        className="slider-left img-fluid"
                        alt="prev"
                    />
                </button>
            )
        }
        else {
            return (
                <button
                    className="carousel__next-button"
                    style={{
                        border: "none",
                        outline: "none",
                        background: "transparent"
                    }}
                    disabled={isEdge}
                    onClick={onClick}
                >
                    <img
                        src={chevronRight}
                        className="slider-right img-fluid"
                        alt="prev"
                    />
                </button>
            )
        }
    }

    const isTabletMid = useMediaQuery({ query: '(min-width: 992px)' });

    const issmallDevice: boolean = useMediaQuery({ query: '(max-width:992px)' });
    const defaultSmSpacing: number = 8

    return (
        <Carousel
            className="animate-carousel"
            isRTL={false}
            itemsToShow={5}
            itemsToScroll={3}
            showArrows={isTabletMid && children.length > 0}
            itemPadding={isTabletMid ? [0, 12, 0, 12] : [0, 8, 0, 8]}
            pagination={false}
            showEmptySlots={true}
            outerSpacing={issmallDevice ? defaultSmSpacing : 0}
            //ref={(ref: any) => (carousel = ref)}
            breakPoints={[
                {
                    width: 0,
                    itemsToShow: 1.3,
                    itemsToScroll: 1
                },
                {
                    width: 500,
                    itemsToShow: 2.2,
                    itemsToScroll: 1
                },
                {
                    width: 1000,
                    itemsToShow: 5,
                    itemsToScroll: 1
                }
            ]}
            renderArrow={renderArrow}
            {...carouselProps}
        >
            {children}
        </Carousel>
    )
}