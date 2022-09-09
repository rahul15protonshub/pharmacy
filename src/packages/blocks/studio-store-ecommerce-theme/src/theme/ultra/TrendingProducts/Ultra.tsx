// @ts-nocheck
import React from "react";
import { Container } from "reactstrap";
import { withRouter } from "react-router-dom";
export const configJSON = require("./config.js");
import "./css/index.scoped.css";
import { SectionHeading } from "../../../../../studio-store-ecommerce-components/src/SectionHeading/SectionHeading";
import ArrowAnimateCarousel from "../../../../../studio-store-ecommerce-components/src/ArrowAnimateCarousel";

export const Ultra: any = withRouter((props: any) => {

  /// to display products

  function getList() {
    let list: any = [];

    props.collection && props.collection.forEach((product: any, index: number) => {
      // console.log(props.collection, "props.collection", product)
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

      // console.log("catalogue_variant_in_stock", catalogue_variant_in_stock)
      // let catalogue_variant_in_stock =
      //   catalogue_variant_in_stock && product.attributes.stock_qty > 0
      //     ? catalogue_variant_in_stock
      //     : product;

      let percentageValue =
        (
          (
            parseInt(catalogue_variant_in_stock.attributes.price) - parseInt(catalogue_variant_in_stock.attributes.sale_price)
          ) /
          parseInt(catalogue_variant_in_stock.attributes.price)
        ) * 100;

      list.push(
        <div className="templateone1-product-container slider-container" key={index}>
          <div className="templateone1-product product-slider-cpnt-template1 text-center">
            <div className="templateone1-product-image-container" style={{ position: 'relative' }}>
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
              }} className="templateone1-overlay">
                <svg stroke="currentColor" className="arrow" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path></svg>
              </div>
            </div>

            <div className="text-start">
              <div className="templateone1-product-detail">
                <p className="productName mb-0 text-truncate">{product.attributes.name}</p>
                <span className="d-inline-flex">
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
            {/* </Link> */}

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
    <section className="templateone-product-slider product-slider ds-mb-40 ds-mb-md-80 ds-mb-lg-104">
      <Container className="carousel-responsive-container">
        {/* <TitleBar name={props.name} onViewMore={props.onViewMore} /> */}
        <SectionHeading
          className='px-3 px-lg-0 mb-2 mb-md-40'
          name="TRENDING PRODUCTS"
          underline
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
    </section>
  )
});

// export default ProductCard;

