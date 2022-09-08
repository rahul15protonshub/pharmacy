import React, { Fragment } from "react";
import { Container, Button, Row, Col } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import {
  IoIosArrowDropleft,
  IoIosArrowDropright,
  IoIosStar,
} from "react-icons/io";
//@ts-ignore
import content from "../content";
import Loader from "../AppLoader/AppLoader.web";
export const configJSON = require("./config.js");
import "./css/index.scoped.css";
import "../../../dashboard/assets/css/index.css";
import ProductBox from "../../../dashboard/src/components/ProductBox";

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
  const {
    createWishlist,
    deleteWishlist,
    addToCart,
    onProductIncreaseCartQuantity,
    onProductDecreaseCartQuantity,
    isProductAddtoCart,
    productsAddingToCart,
    productWishlisting,
  } = props;

  /// to display products

  function getList() {
    let list: any = [];
    props.collection &&
      props.collection.forEach((product: any, index: number) => {
        let catalogue_variant_in_stock: any,
          productOnSale: any,
          productSlaeprice: any,
          ProductPrice: any;
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

        let percentageValue =
          ((parseInt(catalogue_variant_in_stock.attributes.price) -
            parseInt(catalogue_variant_in_stock.attributes.sale_price)) /
            parseInt(catalogue_variant_in_stock.attributes.price)) *
          100;
        list.push(
          <Col xs="6" md="4" lg="3" key={index}>
            <ProductBox
              onProductAddToWishlist={createWishlist}
              onProductDeleteFromWishlist={deleteWishlist}
              product={product}
              onProductAddToCart={addToCart}
              onProductDecreaseCartQuantity={onProductDecreaseCartQuantity}
              onProductIncreaseCartQuantity={onProductIncreaseCartQuantity}
              addToCartLoading={productsAddingToCart.includes(product.id)}
              wishlistLoading={productWishlisting == product.id}
              isProductAddtoCart={isProductAddtoCart}
            />
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
          {list}
        </Row>
      </div>
    </section>
  ) : (
    <Loader loading={props.loading} />
  );
});

export default ProductCard;
