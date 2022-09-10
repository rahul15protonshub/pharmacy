// @ts-nocheck
import React, { Fragment } from "react";
import { Container, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import ArrowCarousel from "../../../../../studio-store-ecommerce-components/src/ArrowCarousel";
export const configJSON = require("./config.js");
import "./css/index.scoped.css";
import { MinimalHeading } from "../../../../../studio-store-ecommerce-components/src/SectionHeading/SectionHeading";
//@ts-ignore
import content from "../../../../../studio-store-ecommerce-components/src/content"

export const Minimal: any = withRouter((props: any) => {

  /// to display products

  function getList() {
    let list: any = [];

    props.collection && props.collection.forEach((product: any, index: number) => {
      let catalogue_variant_in_stock: any, productOnSale: any, productSlaeprice: any, ProductPrice: any;
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
      productOnSale = catalogue_variant_in_stock ? catalogue_variant_in_stock.attributes.on_sale : catalogue_variant_in_stock.attributes.on_sale;
      ProductPrice = catalogue_variant_in_stock ? productOnSale ? catalogue_variant_in_stock.attributes?.actual_price_including_tax : catalogue_variant_in_stock.attributes?.price_including_tax : productOnSale ? catalogue_variant_in_stock?.attributes?.actual_price_including_tax : catalogue_variant_in_stock?.attributes?.price_including_tax;
      productSlaeprice = catalogue_variant_in_stock ? catalogue_variant_in_stock.attributes.price_including_tax : catalogue_variant_in_stock?.attributes.price_including_tax;

      let percentageValue =
        (
          (
            parseInt(catalogue_variant_in_stock.attributes.price) - parseInt(catalogue_variant_in_stock.attributes.sale_price)
          ) /
          parseInt(catalogue_variant_in_stock.attributes.price)
        ) * 100;

      list.push(
        <div className="slider-container" key={index}>
          <div className="item-slider">
            <div className="product product-slider-cpnt text-center">
              <div style={{ position: 'relative', width: 'fit-content', margin: '0 16px' }}>
                <img style={{ position: 'relative', padding: 0, borderRadius: '5px' }} alt={catalogue_variant_in_stock.attributes.name} src={product.attributes.images
                  ? product.attributes.images.data[0].attributes.url
                  : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"}
                  className="img-fluid yt-td-product-img prodimage w3-ripple ml-auto mr-auto"
                  onClick={() => {
                    setTimeout(() => {
                      props.history.push(`/shop/${product.id}`);
                    }, 500);
                  }}
                />
                {product.attributes.wishlisted ?
                  (
                    <svg className="addedtowishlist" onClick={() => props.deleteWishlist(product.id)} width="21" height="21" viewBox="0 0 24 24" fill="#fff" stroke="#8899A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  ) : (
                    <svg className=" addtowishlist" onClick={() => props.createWishlist(product.id)} width="21" height="21" viewBox="0 0 24 24" fill="#fff" stroke="#8899A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  )
                }
              </div>

              <div className="product-details ">
                <div className="product-title ellises sdfsdf" title={product.attributes.name}>
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


                {product.attributes.stock_qty > 0 && Object.keys(catalogue_variant_in_stock).length !== 0 &&
                  catalogue_variant_in_stock.attributes.stock_qty >= 1
                  ?
                  (
                    <Fragment>
                      {(Object.keys(product.attributes.cart_items).length !== 0 || product.attributes.cart_quantity >= 1)
                        ?
                        ((Object.keys(product.attributes.cart_items).filter((keyName: any, keyIndex: any) => {
                          return (parseInt(keyName) == catalogue_variant_in_stock.id);
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
                          )
                          :
                          (
                            <Button
                              color="secondary button-cart"
                              onClick={() => {
                                if (
                                  (product.attributes.catalogue_variants && product.attributes.catalogue_variants.length > 0) || product.attributes.is_subscription_available) {
                                  setTimeout(() => {
                                    props.history.push(`/shop/${product.id}`);
                                  }, 500);
                                }
                                else {
                                  props.addToCart(
                                    catalogue_variant_in_stock
                                  );
                                }
                              }}
                            >
                              {content.addToCart}
                            </Button>
                          )
                        )
                        :
                        (
                          <Button
                            color="secondary button-cart"
                            onClick={() => {
                              if (
                                (product.attributes.catalogue_variants && product.attributes.catalogue_variants.length > 0) || product.attributes.is_subscription_available) {
                                setTimeout(() => {
                                  props.history.push(`/shop/${product.id}`);
                                }, 500);
                              } else {
                                props.addToCart(
                                  catalogue_variant_in_stock
                                );
                              }
                            }}
                          >
                            {content.addToCart}
                          </Button>
                        )
                      }
                    </Fragment>
                  )
                  : (
                    <Button disabled color="secondary button-cart">
                      {content.outOfStock}
                    </Button>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      );

      list = [...list];
    });

    return list;
  }

  let list = [];

  if (
    props.collection &&
    Array.isArray(props.collection) &&
    props.collection.length > 0
  ) {
    list = getList();
  }

  const showCard = list.length > 0;
  return (
    <section className="product-slider ds-mb-40 ds-mb-md-80 ds-mb-lg-104">
      <Container className='carousel-responsive-container'>
        <MinimalHeading name={props.name} className='px-3 px-lg-0 ds-mb-md-40 mb-2' link={props.onViewMore} />
        <div className="yt-component-wrapper yt-slider-component">
          {
            props.collection &&
              Array.isArray(props.collection) &&
              props.collection.length > 0 &&
              showCard ? (
              <ArrowCarousel
                name="aaaa"
                carouselProps={
                  {
                    breakPoints: [
                      {
                        width: 0,
                        itemsToShow: 1.9,
                        itemsToScroll: 1
                      },
                      {
                        width: 768,
                        itemsToShow: 3.9,
                        itemsToScroll: 1
                      },
                      {
                        width: 1000,
                        itemsToShow: 5,
                        itemsToScroll: 1
                      }
                    ]
                  }
                }
              >
                {list}
              </ArrowCarousel>
            ) : <p className="px-3 px-lg-0">No Products Found.</p>
          }
        </div>
      </Container>
    </section>
  )
});

