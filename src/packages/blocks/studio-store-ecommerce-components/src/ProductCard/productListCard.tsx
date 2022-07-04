import React, { Fragment } from "react";
import { Container, Button, Row, Col } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import {
  IoIosArrowDropleft,
  IoIosArrowDropright,
  IoIosStar,
} from "react-icons/io";
//@ts-ignore
import content from "../content.js"
import Loader from "../AppLoader/AppLoader.web";
export const configJSON = require("./config.js");
import "./css/index.scoped.css";
import "../../../dashboard/assets/css/index.css"

//************title bar*************/////
function TitleBar(props: any) {
  if (props.name != undefined) {
    return (
      <div className="yt-produstslider-info d-flex justify-content-between align-items-center">
        <h2 className="yt-comonent-top-title my-0">{props.name}</h2>
        {props.onViewMore && (
          <div className="yt-comonent-link">
            <Button
              color="link yt-component-more px-0"
              onClick={props.onViewMore}
            >
              View All
            </Button>
          </div>
        )}
      </div>
    );
  } else {
    return <></>;
  }
}

//*************product card*************/////
const ProductCard: any = withRouter((props: any) => {
  let carousel = React.createRef();
  let Breakpoints = [
    { width: 320, itemsToShow: 2, itemsToScroll: 2 },
    { width: 730, itemsToShow: 4, itemsToScroll: 4 },
    { width: 1300, itemsToShow: 5 },
  ];

  /// to display products

  function getList() {
    let list: any = [];
    props.collection && props.collection.forEach((product: any, index: number) => {
      let catalogue_variant_in_stock: any, productOnSale: any, productSlaeprice: any, ProductPrice: any;
      if (product.attributes.default_variant) {
        catalogue_variant_in_stock =
          product?.attributes?.stock_qty > 0
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
      }
      else {
        catalogue_variant_in_stock = product;
      }
      productOnSale = catalogue_variant_in_stock ? catalogue_variant_in_stock.attributes.on_sale : catalogue_variant_in_stock.attributes.on_sale;
      ProductPrice = catalogue_variant_in_stock ? productOnSale ? catalogue_variant_in_stock.attributes?.actual_price_including_tax : catalogue_variant_in_stock.attributes?.price_including_tax : productOnSale ? catalogue_variant_in_stock?.attributes?.actual_price_including_tax : catalogue_variant_in_stock?.attributes?.price_including_tax;
      productSlaeprice = catalogue_variant_in_stock ? catalogue_variant_in_stock.attributes.price_including_tax : catalogue_variant_in_stock?.attributes.price_including_tax;

      let percentageValue =
        ((parseInt(catalogue_variant_in_stock.attributes.price) -
          parseInt(catalogue_variant_in_stock.attributes.sale_price)) /
          parseInt(catalogue_variant_in_stock.attributes.price)) *
        100;
      list.push(
        <Col xs="6" md="4" lg="3" key={index}>
          <div className="slider-container m-0">
            <div className="item-slider">
              <div className="product product-slider-cpnt text-center">
                {/* <div className="d-flex justify-content-between align-items-center">
                  {catalogue_variant_in_stock.attributes.on_sale && (
                    <div className="yt-product-off text-center p-1">
                      {`${Math.floor(percentageValue)}${content.productCard.off}`}
                    </div>
                  )}
                  {!catalogue_variant_in_stock.attributes.on_sale && (
                    <div className="text-center p-1" />
                  )}
                </div> */}
                <div style={{position:'relative',width:'fit-content',margin:'0 auto'}}>
                <img src={product.attributes.images
                  ? product.attributes.images.data[0].attributes.url
                  : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
                }
                  className="pt-3 px-3 img-fluid yt-td-product-img prodimage w3-ripple ml-auto mr-auto"
                  alt={catalogue_variant_in_stock.attributes.name}
                  onClick={() => {
                    setTimeout(() => {
                      props.history.push(`/shop/${product.id}`);
                    }, 500);
                  }}
                />  
                {product.attributes.wishlisted ? (
                      
                      <svg className="likebuttononimage active"  width="21" height="21" onClick={() => props.createWishlist(product.id)} viewBox="0 0 24 24" fill="#fff" stroke="#8899a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                      // <img
                      //   style={{position:'absolute',top:'24px',right:'28px'}}
                      //   src={require("./images/like.png")}
                      //   alt="add to wishlist"
                      //   onClick={() => props.deleteWishlist(product.id)}
                      // />
                    ) : (
                      <svg className="likebuttononimage"  onClick={() => props.createWishlist(product.id)} width="21" height="21" viewBox="0 0 24 24" fill="#fff" stroke="#8899a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                      // <img
                      // style={{position:'absolute',top:'24px',right:'28px'}}
                      //   src={require("./images/heart-icon.svg")}
                      //   alt="add to wishlist"
                      //   onClick={() => props.createWishlist(product.id)}
                      // />
                    )}
                </div>    
                
                {/* </Link> */}
                <div className="product-details">
                  <div className="product-title ellises" title={product.attributes.name}>
                    {product.attributes.name}
                  </div>
                  <div className="price-wrap">
                    {productOnSale && (
                      <>
                        <span className="price1 product-sale-price">
                          {/* @ts-ignore  */}
                          {JSON.parse(localStorage.getItem('countryCode') ?? "{}")?.countryCode} {parseFloat(productSlaeprice).toFixed(2)}
                        </span>
                        <span className="price2 product-reg-price2">
                          {/* @ts-ignore  */}
                          {JSON.parse(localStorage.getItem('countryCode') ?? "{}")?.countryCode} {parseFloat(ProductPrice).toFixed(2)}
                        </span>
                      </>
                    )}
                    {!productOnSale && (
                      <span className="price1 product-sale-price">
                        {/* @ts-ignore  */}
                        {JSON.parse(localStorage.getItem('countryCode') ?? "{}")?.countryCode} {parseFloat(ProductPrice).toFixed(2)}
                      </span>
                    )}
                  </div>
                  {/* <div
                    className="ratings">
                    style={{ opacity: product.attributes.average_rating > 0 ? 1 : 0 }}
                    <span>
                      {product.attributes.average_rating.toFixed(1)}
                      <IoIosStar className="rating-star-icon" />
                      <span className="product-rating"> | {product.attributes.reviews.length} </span>
                    </span>
                  </div> */}

                  {product.attributes.stock_qty > 0 && Object.keys(catalogue_variant_in_stock).length !== 0 &&
                    catalogue_variant_in_stock.attributes.stock_qty >= 1 ? (
                    <Fragment>
                      {(Object.keys(product.attributes.cart_items).length !== 0 || product.attributes.cart_quantity >= 1)
                        ? ((Object.keys(product.attributes.cart_items).filter(
                          (keyName: any, keyIndex: any) => {
                            return (
                              parseInt(keyName) == catalogue_variant_in_stock.id
                            );
                          }
                        )[0] || product.attributes.cart_quantity >= 1)
                          ?
                          (
                            <Button
                              color="secondary button-cart"
                              onClick={() => {
                                localStorage.removeItem("buyNow")
                                //@ts-ignore
                                props?.history.push("/cart")
                              }}
                            >
                              {content.goToCart}
                            </Button>
                          ) : (
                            <Button
                              color="secondary button-cart"
                              onClick={() => {
                                if ((product.attributes.catalogue_variants && product.attributes.catalogue_variants.length > 0) || product.attributes.is_subscription_available) {
                                  setTimeout(() => {
                                    props.history.push(`/shop/${product.id}`);
                                  }, 500);
                                }
                                else {
                                  props.addToCart(
                                    catalogue_variant_in_stock
                                    // .attributes
                                  );
                                }
                              }}
                            >
                              {content.addToCart}
                            </Button>
                          )
                        ) : (
                          <Button
                            color="secondary button-cart"
                            onClick={() => {
                              if ((product.attributes.catalogue_variants && product.attributes.catalogue_variants.length > 0) || product.attributes.is_subscription_available) {
                                setTimeout(() => {
                                  props.history.push(`/shop/${product.id}`);
                                }, 500);
                              }
                              else {
                                props.addToCart(
                                  catalogue_variant_in_stock
                                  // .attributes
                                );
                              }
                            }}
                          >
                            {content.addToCart}
                          </Button>
                        )}
                    </Fragment>
                  ) : (
                    <Button disabled color="secondary button-cart">
                      {content.outOfStock}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Col>
      );

      list = [...list];
    });


    return list;
  }

  let list: any = [];
  if (
    props.collection &&
    Array.isArray(props.collection) &&
    props.collection.length > 0
  ) {
    list = getList();
  }

  const showCard = list.length > 0;

  return props.collection &&
    Array.isArray(props.collection) &&
    props.collection.length > 0 &&
    showCard ? (
    <section className="product-slider">
      <div className="">
        <TitleBar name={props.name} onViewMore={props.onViewMore} />
        <Row className="yt-component-wrapper yt-slider-component">
          {/* <button
          className="carousel__back-button"
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            color: "#324688",
          }}
        >
          <IoIosArrowDropleft
            className="slider-left img-fluid"
            //@ts-ignore
            onClick={() => carousel.current.slidePrev()}
          />
        </button> */}
          {/* <button
          className="carousel__next-button"
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            color: "#324688",
          }}
        >
          <IoIosArrowDropright
            className="slider-right img-fluid"
            width="20"
            height="20"
            //@ts-ignore
            onClick={() => carousel.current.slideNext()}
          />
        </button> */}
          {/* <Carousel
          isRTL={false}
          itemsToShow={15}
          itemsToScroll={0}
          pagination={false}
          showArrows={false}
          //ref={(ref: any) => (carousel = ref)}
          //@ts-ignore
          ref={carousel}
          breakPoints={Breakpoints}
        >
        </Carousel> */}
          {list}
        </Row>
      </div>
    </section>
  ) : (
    <Loader loading={props.loading} />
    // <section className="hp-product-slider">
    //   <TitleBar name={props.name} />
    //   <div className="yt-component-wrapper yt-slider-component mt-4">
    //     No Products Found.
    //   </div>
    // </section>
  );
}
)

export default ProductCard
