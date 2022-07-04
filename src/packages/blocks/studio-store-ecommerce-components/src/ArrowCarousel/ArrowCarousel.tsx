import * as React from 'react';
import { useMediaQuery } from 'react-responsive';
import Carousel from "react-elastic-carousel";
import './assets/css/style.css';
interface ArrowCarouselProps {
    children: any[],
    carouselProps?: any
}

export const ArrowCarousel: React.FunctionComponent<ArrowCarouselProps> = (props) => {
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
                    onClick={onClick}
                    disabled={isEdge}
                >
                    <svg
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="slider-left"
                    >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20 38.75C30.3553 38.75 38.75 30.3553 38.75 20C38.75 9.64466 30.3553 1.25 20 1.25C9.64466 1.25 1.25 9.64466 1.25 20C1.25 30.3553 9.64466 38.75 20 38.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M25.0001 11.25L12.9067 18.945C12.5466 19.1749 12.3286 19.5727 12.3286 20C12.3286 20.4273 12.5466 20.8251 12.9067 21.055L25.0001 28.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button >
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
                    onClick={onClick}
                    disabled={isEdge}
                >
                    <svg
                        className="slider-right"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20 38.75C30.3553 38.75 38.75 30.3553 38.75 20C38.75 9.64466 30.3553 1.25 20 1.25C9.64466 1.25 1.25 9.64466 1.25 20C1.25 30.3553 9.64466 38.75 20 38.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16 26.6668L24.9075 20.804C25.1728 20.6288 25.3333 20.3257 25.3333 20.0002C25.3333 19.6746 25.1728 19.3715 24.9075 19.1964L16 13.3335" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            )
        }

    }

    const isTabletMid = useMediaQuery({ query: '(min-width: 992px)' });
    return (
        <Carousel
            className="arrow-carousel"
            isRTL={false}
            itemsToShow={5}
            itemsToScroll={3}
            showArrows={isTabletMid && children.length > 0}
            itemPadding={isTabletMid ? [0, 12, 0, 12] : [0, 8, 0, 8]}
            pagination={false}
            showEmptySlots={true}
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