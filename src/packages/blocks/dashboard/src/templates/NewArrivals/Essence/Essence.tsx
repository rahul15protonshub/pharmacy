import * as React from "react";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "./ShadowCard";
import SectionHeading from "../../../../../studio-store-ecommerce-components/src/SectionHeading";
import { withRouter, RouteComponentProps } from "react-router-dom";
import "./assets/css/index.scoped.css";

interface EssenceProps extends RouteComponentProps {
  collection: any[];
  addToCart: Function;
  createWishlist: Function;
  deleteWishlist: Function;
  onViewMore: Function;
}

export const Essence: any = withRouter((props: EssenceProps) => {
  const { collection, onViewMore, history } = props;
  const slicedProducts: any[] = collection.slice(0, 4);
  const defaultImage: any =
    "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";

  const getItemProps = (product: any) => {
    let catalogue_variant_in_stock: any = product,
      productOnSale: any,
      // productSaleprice: any,
      ProductPrice: any,
      countryCode: any = JSON.parse(
        localStorage.getItem("countryCode") ?? "{}"
      )?.countryCode;
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
    }
    productOnSale = catalogue_variant_in_stock.attributes.on_sale;
    ProductPrice =
      catalogue_variant_in_stock && productOnSale
        ? catalogue_variant_in_stock.attributes?.actual_price_including_tax
        : catalogue_variant_in_stock.attributes?.price_including_tax;
    // productSaleprice = catalogue_variant_in_stock ? catalogue_variant_in_stock.attributes.price_including_tax : catalogue_variant_in_stock?.attributes.price_including_tax;
    return {
      productName: product.attributes.name,
      price: `${countryCode} ${ProductPrice}`,
    };
  };
  return (
    <section className="product-shadow ds-mb-40 ds-mb-md-80 ds-mb-lg-104">
      <Container className="product-shadow__container">
        <Row className="gx-lg-4 gx-md-3 gx-2 flex-row-reverse">
          <Col xs="12" lg="6" className="product-shadow__heading-col">
            <SectionHeading
              name="new arrivals"
              className="mb-0 flex-column product-shadow__heading-container h-100 align-items-start justify-content-center"
              link={onViewMore}
            />
          </Col>
          {slicedProducts.length > 0 ? (
            <Col
              xs="12"
              lg="6"
              className="product-shadow__grid d-flex flex-column overflow-hidden"
            >
              <Row className="h-50 flex-nowrap gx-lg-4 gx-md-3 gx-2">
                {slicedProducts.slice(0, 2).map((product, key) => (
                  <Col xs="6">
                    <ProductCard
                      image={
                        (product.attributes.images &&
                          product.attributes.images.data[0].attributes.url) ||
                        defaultImage
                      }
                      onClick={() => history.push(`/shop/${product.id}`)}
                      {...getItemProps(product)}
                    />
                  </Col>
                ))}
              </Row>
              <Row className="h-50 mt-lg-4 mt-md-3 mt-2 flex-nowrap gx-lg-4 gx-md-3 gx-2">
                {slicedProducts.slice(2, 4).map((product, key) => (
                  <Col xs="6">
                    <ProductCard
                      image={
                        (product.attributes.images &&
                          product.attributes.images.data[0].attributes.url) ||
                        defaultImage
                      }
                      onClick={() => history.push(`/shop/${product.id}`)}
                      {...getItemProps(product)}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          ) : (
            <Col
              className="product-shadow__grid d-flex align-items-center justify-content-center"
              xs="12"
              lg="6"
            >
              <p>No Products Found.</p>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
});
