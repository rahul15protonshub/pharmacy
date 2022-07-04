import React, { useState, useEffect, useRef } from "react";
import "./css/index.scoped.css";
import { Row, Col } from "reactstrap";
import Carousel from "react-elastic-carousel";
import {
  IoIosArrowDropleft,
  IoIosArrowDropright
} from "react-icons/io";
import ReactImageMagnify from 'react-image-magnify';
import { useMediaQuery } from 'react-responsive';
import ProductImageCarousel from './ProductImageCarouselModal';

function ProductverticalSlider(props: any) {

  const renderArrow = (props: any) => {
    const { type, onClick, isEdge } = props;
    if (type === 'PREV') {
      return (
        <button
          className="yt-slider-prev"
          style={{
            border: "none",
            outline: "none",
            background: "transparent"
          }}
          disabled={isEdge}
        >
          <IoIosArrowDropleft
            className="slider-left img-fluid"
            //@ts-ignore
            onClick={onClick}
          />
        </button>
      )
    }
    else {
      return (
        <button
          className="yt-slider-next"
          style={{
            border: "none",
            outline: "none",
            background: "transparent"
          }}
          disabled={isEdge}
        >
          <IoIosArrowDropright
            className="slider-right img-fluid"
            width="20"
            height="20"
            //@ts-ignore
            onClick={onClick}
          />
        </button>
      )
    }

  }

  const { activeImage } = props
  const isArrow = props?.images?.length >= 4;
  return (
    <>
      {props?.images?.length >= 2 &&
        (
          <div className="w-100 position-relative">
            <Carousel
              className="product-image-slider"
              isRTL={false}
              itemPadding={[5, 4, 5, 4]}
              itemsToShow={6}
              showArrows={isArrow}
              itemsToScroll={1}
              pagination={false}
              showEmptySlots={true}
              //@ts-ignore
              renderArrow={renderArrow}
              breakPoints={
                [
                  {
                    width: 350,
                    itemsToShow: 5
                  },
                  {
                    width: 399,
                    itemsToShow: 6
                  },
                  {
                    width: 580,
                    itemsToShow: 8
                  }
                ]
              }
            >
              {
                props.images.map(
                  (item: any, idx: any) => {
                    return <div
                      key={idx}
                      className={`vert-slider-item my-1 d-flex align-items-center justify-content-center ${activeImage === item.attributes.url && 'active'}`}
                      onClick={() => props.imageSlider(item.attributes.url)}
                    >
                      <img
                        src={item.attributes.url || null || "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"}
                        alt={"img " + idx}
                        className="img-fluid"
                      />
                    </div>
                  }
                )
              }
            </Carousel>
          </div>
        )}
    </>
  );
}



function ProductImageWithSlider(props: any) {
  const [isCarouselModelOpen, setCarouselModelOpen] = useState(false)
  const isMobileDevice = useMediaQuery({ query: '(max-width: 992px)' });
  const isMobileDeviceRef: any = useRef();
  useEffect(() => {
    isMobileDeviceRef.current = isMobileDevice
  }, [isMobileDevice])
  useEffect(() => {
    let imageEl = document.getElementsByClassName('magnify-product-thumbnail-image-container')?.[0]
    if (imageEl) {
      imageEl.addEventListener('click', function (e) {
        if (isMobileDeviceRef?.current)
          setCarouselModelOpen(true)
      })
    }
  }, [])
  let magnifyConfig: any = {
    largeImage: {
      isFluidWidth: true,
      src: props.currentImage,
      width: 1200,
      height: 1800
    },
    smallImage: {
      src: props.currentImage,
      isFluidWidth: true
    },
    enlargedImageContainerClassName: 'magnify-product-magnify-image-container',
    imageClassName: "magnify-product-image",
    className: "magnify-product-thumbnail-image-container",
    enlargedImageContainerDimensions: {
      width: '200%',
      height: '150%'
    },
    shouldUsePositiveSpaceLens: true
  }

  return (
    <div className="radius-10 w-100" >
      <Row className="yt-product-img-inner-row">
        <Col xs={12} className="yt-inner-col">
          <div className="w-100 h-100">
            <ReactImageMagnify
              {...magnifyConfig}
            />
            <div id="portal" className="portal"></div>
            <ProductImageCarousel
              isOpen={isCarouselModelOpen}
              toggle={() => setCarouselModelOpen(!isCarouselModelOpen)}
              images={props?.images}
            />
          </div>
        </Col>
        <Col xs={12} className="yt-inner-col">
          <ProductverticalSlider
            images={props?.images}
            imageSlider={props?.imageSlider}
            activeImage={props.currentImage}
          />
        </Col>
      </Row>
    </div >
  );
}


export default ProductImageWithSlider;
