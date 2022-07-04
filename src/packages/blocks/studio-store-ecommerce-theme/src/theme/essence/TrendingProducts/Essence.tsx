// @ts-nocheck
import React from "react";
import { Container } from "reactstrap";
import { withRouter } from "react-router-dom";
import { SectionHeading } from "../../../../../studio-store-ecommerce-components/src/SectionHeading/SectionHeading";
import Carousel from '../../../../../studio-store-ecommerce-components/src/ArrowAnimateCarousel';
import "./css/index.scoped.css";

export const configJSON = require("./config.js");
export const Essence: any = withRouter((props: any) => {

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

      list.push(
        <div className="templatefour-product-container slider-container" key={index}>
          <div className="templatefour-product product-slider-cpnt-template1 text-center">
            <div className="templatefour-product-image-container">
              <img alt={catalogue_variant_in_stock.attributes.name} src={product.attributes.images
                ? product.attributes.images.data[0].attributes.url
                : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"}
                className="img-fluid prodimage w3-ripple ml-auto mr-auto"
                onClick={() => {
                  setTimeout(() => {
                    props.history.push(`/shop/${product.id}`);
                  }, 500);
                }}
              />
              <div onClick={() => {
                setTimeout(() => {
                  props.history.push(`/shop/${product.id}`);
                }, 500);
              }} className="templatefour-overlay">
                <svg stroke="currentColor" className="arrow" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path></svg>
              </div>
            </div>
            <div className="text-start">
              <div className="templatefour-product-detail d-flex align-items-center flex-nowrap">
                <p className="productName d-inline-block text-truncate me-2 me-lg-3 mb-0">{product.attributes.name}</p>
                <span className="d-inline-flex mb-1">
                  {product.attributes.wishlisted ?
                    (
                      <svg className="wishlist active" onClick={() => props.deleteWishlist(product.id)} width="18" height="18" viewBox="0 0 24 20" fill="#fff" stroke="#8899A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    ) : (
                      <svg className="wishlist" onClick={() => props.createWishlist(product.id)} width="18" height="18" viewBox="0 0 24 20" fill="#fff" stroke="#8899A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    )
                  }
                </span>

              </div>
              <p className="productPrice">
                <span>
                  {JSON.parse(localStorage.getItem('countryCode') ?? "{}")?.countryCode} {parseFloat(ProductPrice).toFixed(2)}
                </span>
              </p>
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
    <section className="product-slider ds-mb-40 ds-mb-md-80 ds-mb-lg-104">
      <Container>
        <SectionHeading
          className='mb-3 mb-md-4 heading-center justify-content-center justify-content-lg-start'
          name="TRENDING PRODUCTS"
        // link={props.onViewMore}
        />
      </Container>

      {
        props.collection &&
          Array.isArray(props.collection) &&
          props.collection.length > 0 &&
          showCard ? (
          <div className="templatefour-product-slider ">
            <Container className="carousel-responsive-container">
              <div className="yt-component-wrapper yt-slider-component">
                <Carousel
                  carouselProps={
                    {
                      breakPoints: [
                        {
                          width: 0,
                          itemsToShow: 2.3,
                          itemsToScroll: 1
                        },
                        {
                          width: 576,
                          itemsToShow: 2.5,
                          itemsToScroll: 1
                        },
                        {
                          width: 992,
                          itemsToShow: 4,
                          itemsToScroll: 1
                        }
                      ],
                      showArrows: false
                    }
                  }
                >
                  {list}
                </Carousel>
              </div>
            </Container>
          </div>
        ) :
          <div>
            <Container>
              <div>
                <p>No Products Found.</p>
              </div>
            </Container>
          </div>
      }

    </section>
  );
});
// export default ProductCard;

