// @ts-nocheck
import React, { useRef, useState, useEffect, Fragment } from "react";
import { Container, Button, NavItem } from "reactstrap";
import { useMediaQuery } from "react-responsive";
import Carousel from "react-elastic-carousel";
import { withRouter, Link } from "react-router-dom";
// import HeartImage from './images/heart-icon.svg';
//import {LikeImage} from './images/like.png';
import {
  IoIosArrowDropleft,
  IoIosArrowDropright,
  IoIosStar,
  AiOutlineLeft,
} from "react-icons/io";
export const configJSON = require("../config.js");
import "../css/index.scoped.css";
import { chevronLeft, chevronRight } from "../assets";
import { SectionHeading } from "../../../../../studio-store-ecommerce-components/src/SectionHeading/SectionHeading";
//@ts-ignore
import content from "../../../../../studio-store-ecommerce-components/src/content";

let list: any = [];

function TitleBar(props: any) {
  let viewAllShop = window.location.pathname.split("/");
  if (props.name != undefined) {
    return (
      <div className="mx-3 yt-produstslider-info d-flex justify-content-between align-items-center">
        <h2 className="yt-comonent-top-title my-0">TRENDING PRODUCTS</h2>
        {list.length > 4 && props.onViewMore && (
          <div className="yt-comonent-link">
            <Button
              color="link yt-component-more px-0"
              onClick={props.onViewMore}
            >
              {window.location.pathname !=
                `/${viewAllShop[1]}/${viewAllShop[2]}` &&
                content.productCard.viewAll}
            </Button>
          </div>
        )}
      </div>
    );
  } else {
    return <></>;
  }
}

function ArrowCarousel(props: any) {
  const {
    list,
    showArrow = false,
    enableSwipe = false,
    itemPadding = [0, 0, 0, 0],
    breakPoints = [
      {
        width: 0,
        itemsToShow: 1.3,
        itemsToScroll: 1,
      },
      {
        width: 500,
        itemsToShow: 2.2,
        itemsToScroll: 1,
      },
      {
        width: 1000,
        itemsToShow: 4,
        itemsToScroll: 1,
      },
      {
        width: 1350,
        itemsToShow: 5,
        itemsToScroll: 1,
      },
    ],
  } = props;
  const renderArrow = (props: any) => {
    const { type, onClick, isEdge } = props;
    if (type === "PREV") {
      return (
        <button
          className="carousel__back-button"
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
          }}
          disabled={isEdge || list.length == 0}
        >
          <svg
            onClick={onClick}
            className="slider-left img-fluid"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
          </svg>
        </button>
      );
    } else {
      return (
        <button
          className="carousel__next-button"
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
          }}
          onClick={onClick}
          disabled={isEdge || list.length == 0}
        >
          <svg
            onClick={onClick}
            className="slider-right img-fluid"
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeWidth={3.5}
              d="M1.5 1.5L6.39956 6.74089C6.46387 6.80958 6.5 6.90279 6.5 7C6.5 7.09721 6.46387 7.19042 6.39956 7.25911L1.5 12.5"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      );
    }
  };

  const isTabletMid = useMediaQuery({ query: "(max-width: 992px)" });
  const isSmallMobile = useMediaQuery({ query: "(max-width: 480px)" });
  return (
    <Carousel
      className="arrow-carousel"
      isRTL={false}
      itemsToShow={5}
      itemsToScroll={3}
      showArrows={showArrow}
      enableSwipe={enableSwipe}
      itemPadding={itemPadding}
      pagination={false}
      showEmptySlots={true}
      //ref={(ref: any) => (carousel = ref)}
      breakPoints={breakPoints}
      //@ts-ignore
      renderArrow={renderArrow}
    >
      {list}
    </Carousel>
  );
}

function ArrowAnimateCarousel(props: any) {
  const isArrow = props.collection.length > 4;
  const renderArrow = (props: any) => {
    const { type, onClick, isEdge } = props;
    if (isArrow) {
      if (type === "PREV") {
        return (
          <button
            className="carousel__back-button"
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
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
        );
      } else {
        return (
          <button
            className="carousel__next-button"
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
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
        );
      }
    }
  };
  const { list } = props;

  const isLaptop = useMediaQuery({ query: "(min-width: 1200px)" });
  const isTabletMid = useMediaQuery({ query: "(min-width: 992px)" });
  const isTabletSmall = useMediaQuery({ query: "(min-width: 768px)" });
  let gutterX = 24,
    paddingLeft,
    outerSpacing;
  if (isLaptop) {
    paddingLeft = 4 * 16;
  } else if (isTabletMid) {
    paddingLeft = 3.5 * 16;
  } else if (isTabletSmall) {
    paddingLeft = 2 * 16;
  } else {
    paddingLeft = 1.5 * 16;
  }
  outerSpacing = gutterX * 0.5 + paddingLeft;
  return (
    <Carousel
      className="arrow-animate-carousel"
      isRTL={false}
      showArrows={true}
      itemPadding={isTabletMid ? [0, 40, 0, 0] : [0, 20, 0, 0]}
      pagination={false}
      showEmptySlots={true}
      outerSpacing={outerSpacing}
      breakPoints={[
        {
          width: 0,
          itemsToShow: 1.3,
          itemsToScroll: 1,
        },
        {
          width: 500,
          itemsToShow: 2.5,
          itemsToScroll: 1,
        },
        {
          width: 1000,
          itemsToShow: 4.2,
          itemsToScroll: 1,
        },
        {
          width: 1200,
          itemsToShow: 5.2,
          itemsToScroll: 1,
        },
        {
          width: 1400,
          itemsToShow: 6.2,
          itemsToScroll: 1,
        },
      ]}
      //@ts-ignore
      renderArrow={renderArrow}
    >
      {list}
    </Carousel>
  );
}
export const Prime: any = withRouter((props: any) => {
  /// to display products

  function getList() {
    let list: any = [];

    props.collection &&
      props.collection.forEach((product: any, index: number) => {
        // console.log(props.collection, "props.collection", product)
        let catalogue_variant_in_stock: any,
          productOnSale: any,
          productSlaeprice: any,
          ProductPrice: any;
        if (product.attributes.default_variant) {
          catalogue_variant_in_stock =
            product.attributes.stock_qty > 0
              ? product.attributes.default_variant.stock_qty > 0
                ? product.attributes.catalogue_variants.filter(
                    (variant: any, index: any) => {
                      return (
                        variant.id ==
                        parseInt(product.attributes.default_variant.id)
                      );
                    }
                  )[0]
                : product.attributes.catalogue_variants.filter(
                    (variant: any, index: any) => {
                      return variant.attributes.stock_qty > 0;
                    }
                  )[0]
              : product.attributes.catalogue_variants[0];
        } else {
          catalogue_variant_in_stock = product;
        }
        productOnSale = catalogue_variant_in_stock
          ? catalogue_variant_in_stock.attributes.on_sale
          : catalogue_variant_in_stock.attributes.on_sale;
        ProductPrice = catalogue_variant_in_stock
          ? productOnSale
            ? catalogue_variant_in_stock.attributes?.actual_price_including_tax
            : catalogue_variant_in_stock.attributes?.price_including_tax
          : productOnSale
          ? catalogue_variant_in_stock?.attributes?.actual_price_including_tax
          : catalogue_variant_in_stock?.attributes?.price_including_tax;
        productSlaeprice = catalogue_variant_in_stock
          ? catalogue_variant_in_stock.attributes.price_including_tax
          : catalogue_variant_in_stock?.attributes.price_including_tax;

        // console.log("catalogue_variant_in_stock", catalogue_variant_in_stock)
        // let catalogue_variant_in_stock =
        //   catalogue_variant_in_stock && product.attributes.stock_qty > 0
        //     ? catalogue_variant_in_stock
        //     : product;

        let percentageValue =
          ((parseInt(catalogue_variant_in_stock.attributes.price) -
            parseInt(catalogue_variant_in_stock.attributes.sale_price)) /
            parseInt(catalogue_variant_in_stock.attributes.price)) *
          100;

        list.push(
          <div
            className="templatethree-product-container slider-container"
            key={index}
          >
            <div className="item-slider">
              <div className="templatethree-product product-slider-cpnt-template1 text-center">
                <img
                  style={{ position: "relative" }}
                  alt={catalogue_variant_in_stock.attributes.name}
                  src={
                    product.attributes.images
                      ? product.attributes.images.data[0].attributes.url
                      : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
                  }
                  className="img-fluid prodimage w3-ripple ml-auto mr-auto"
                  onClick={() => {
                    setTimeout(() => {
                      props.history.push(`/shop/${product.id}`);
                    }, 500);
                  }}
                />
                {product.attributes.wishlisted ? (
                  <svg
                    className="addedtowishlistt3"
                    onClick={() => props.deleteWishlist(product.id)}
                    width="18"
                    height="18"
                    viewBox="0 0 24 20"
                    fill="#fff"
                    stroke="#8899A4"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                ) : (
                  <svg
                    className="addtowishlistt3"
                    onClick={() => props.createWishlist(product.id)}
                    width="18"
                    height="18"
                    viewBox="0 0 24 20"
                    fill="#fff"
                    stroke="#8899A4"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                )}
                <div style={{ textAlign: "start" }}>
                  <p
                    style={{ display: "inline-block" }}
                    className={"productName"}
                  >
                    {product.attributes.name}
                  </p>
                  <p className="productPrice">
                    <span>
                      {
                        JSON.parse(localStorage.getItem("countryCode") ?? "{}")
                          ?.countryCode
                      }{" "}
                      {parseFloat(ProductPrice).toFixed(2)}
                    </span>
                  </p>
                </div>
                {/* </Link> */}
              </div>
            </div>
          </div>
        );

        list = [...list];
      });

    return list;
  }

  // let list: any = [];
  if (
    props.collection &&
    Array.isArray(props.collection) &&
    props.collection.length > 0
  ) {
    list = getList();
  }

  const { defaultCarousel = true } = props;

  const showCard = list.length > 0;
  const isTabletMid = useMediaQuery({ query: "(max-width: 992px)" });
  return props.collection &&
    Array.isArray(props.collection) &&
    props.collection.length > 0 &&
    showCard ? (
    <section className="templatethree-product-slider product-slider ds-mb-40 ds-mb-md-80 ds-mb-lg-104">
      <Container>
        {/* <TitleBar name={props.name} onViewMore={props.onViewMore} /> */}
        <SectionHeading
          className="mx-3 mx-md-0 mb-2 mb-md-40"
          name="TRENDING PRODUCTS"
          separator
          link={props.onViewMore}
        />
        <div className="yt-component-wrapper yt-slider-component">
          {defaultCarousel ? (
            <ArrowCarousel
              list={list}
              breakPoints={[
                {
                  width: 0,
                  itemsToShow: 1.1,
                  itemsToScroll: 1,
                },
                {
                  width: 500,
                  itemsToShow: 1.3,
                  itemsToScroll: 1,
                },
                {
                  width: 1000,
                  itemsToShow: 2.2,
                  itemsToScroll: 1,
                },
                {
                  width: 1350,
                  itemsToShow: 3.2,
                  itemsToScroll: 1,
                },
              ]}
              enableSwipe={true}
              showArrow={true}
            />
          ) : (
            <ArrowAnimateCarousel list={list} />
          )}
        </div>
      </Container>
    </section>
  ) : (
    <section className="hp-product-slider">
      <Container>
        <TitleBar name={props.name} />
        <div className="yt-component-wrapper yt-slider-component mt-4">
          No Products Found.
        </div>
      </Container>
      {/* backup */}
      {/* <div className="product-details ">
                <div className="product-title ellises sdfsdf" title={product.attributes.name}>
                  {product.attributes.name}
                </div>
                <div className="price-wrap">
                  {productOnSale && (
                    <>
                      <span className="price1 product-sale-price">
                        {JSON.parse(localStorage.getItem('countryCode') ?? "{}")?.countryCode} {parseFloat(productSlaeprice).toFixed(2)}
                      </span>
                      <span className="price2 product-reg-price2">
                        {JSON.parse(localStorage.getItem('countryCode') ?? "{}")?.countryCode} {parseFloat(ProductPrice).toFixed(2)}
                      </span>
                    </>
                  )}
                  {!productOnSale && (
                    <span className="price1 product-sale-price">
                      {JSON.parse(localStorage.getItem('countryCode') ?? "{}")?.countryCode} {parseFloat(ProductPrice).toFixed(2)}
                    </span>
                  )}
                </div>
              </div> */}
    </section>
  );
});
