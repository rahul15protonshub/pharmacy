// @ts-nocheck
import React from "react";
import { Container } from "reactstrap";
import { useMediaQuery } from 'react-responsive';
import { withRouter, Link } from "react-router-dom";
import "./css/index.scoped.css";
import { SectionHeading } from "../../../../../studio-store-ecommerce-components/src/SectionHeading/SectionHeading";
import ArrowAnimateCarousel from "../../../../../studio-store-ecommerce-components/src/ArrowAnimateCarousel";

export const Bold: any = withRouter((props: any) => {

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
        <div className="templatetwo-product-container slider-container" key={index}>
          <div className="item-slider">
            <div

              className="templatetwo-product product-slider-cpnt text-center d-flex flex-column"
              style={{ backgroundImage: `url(${product.attributes.images.data[0].attributes.url})` }}
            >
              {product.attributes.wishlisted ?
                (
                  <svg className="templatetwo-product-wishlist addtowishlistt2 active" onClick={() => props.deleteWishlist(product.id)} width="21" height="21" viewBox="0 0 24 24" fill="#fff" stroke="#8899A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                ) : (
                  <svg className="templatetwo-product-wishlist addtowishlistt2" onClick={() => props.createWishlist(product.id)} width="21" height="21" viewBox="0 0 24 24" fill="#fff" stroke="#8899A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                )
              }
              <div
                className="flex-grow-1 position-relative"
                onClick={() => {
                  setTimeout(() => {
                    props.history.push(`/shop/${product.id}`);
                  }, 500);
                }}
              >
                <div class="hoveroverlay"></div>
              </div>
              <div class="templatetwo-overlay">
                <div className="product-detail-container">
                  <p className="productName text-truncate mb-1">{product.attributes.name}</p>
                  <p className="productPrice">
                    {<span className="">
                      {JSON.parse(localStorage.getItem('countryCode') ?? "{}")?.countryCode} {parseFloat(ProductPrice).toFixed(2)}
                    </span>
                    }</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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

  return (
    <section className="templatetwo-product-slider product-slider ds-mb-40 ds-mb-md-80 ds-mb-lg-104">
      <Container className="carousel-responsive-container">
        <SectionHeading
          className='mb-4 mb-md-40 px-3 px-lg-0'
          name="TRENDING PRODUCTS"
          link={props.onViewMore}
        />
        <div className="yt-component-wrapper yt-slider-component">
          {
            props.collection &&
              Array.isArray(props.collection) &&
              props.collection.length > 0 &&
              showCard ? (
              <ArrowAnimateCarousel
                carouselProps={
                  {
                    breakPoints: [
                      {
                        width: 0,
                        itemsToShow: 2.2,
                        itemsToScroll: 1
                      },
                      {
                        width: 768,
                        itemsToShow: 2.6,
                        itemsToScroll: 1
                      },
                      {
                        width: 1000,
                        itemsToShow: 4,
                        itemsToScroll: 1
                      }
                    ],
                    showArrows: false
                  }
                }
              >
                {list}
              </ArrowAnimateCarousel>
            ) : <p className="px-3 px-lg-0">No Products Found.</p>
          }
        </div>
      </Container>
    </section >
  )
});

