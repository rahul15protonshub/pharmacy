import * as React from "react";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "./GalleryCard";
import SectionHeading from "../../../../../studio-store-ecommerce-components/src/SectionHeading";
import { withRouter, RouteComponentProps } from "react-router-dom";
import "./assets/css/index.scoped.css";

interface PrimeProps extends RouteComponentProps {
  collection: any[];
  addToCart: Function;
  createWishlist: Function;
  deleteWishlist: Function;
  onViewMore: Function;
}

export const Prime: any = withRouter((props: PrimeProps) => {
  const { collection, onViewMore, history } = props;
  const slicedProducts: any[] = collection.slice(0, 4);
  const defaultImage: any =
    "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";
  return (
    <section className="product-gallery ds-mb-40 ds-mb-md-80 ds-mb-lg-104">
      <Container className="product-gallery__container">
        <SectionHeading
          className="mb-4"
          name="new arrivals"
          separator
          link={onViewMore}
        />
        {slicedProducts.length > 0 ? (
          <Row className="product-gallery__grid flex-nowrap gx-lg-4 gx-md-3 gx-2">
            <Col xs="6" className="h-100">
              <ProductCard
                image={
                  (slicedProducts[0].attributes.images &&
                    slicedProducts[0].attributes.images.data[0].attributes
                      .url) ||
                  defaultImage
                }
                onClick={() => history.push(`/shop/${slicedProducts[0].id}`)}
              />
            </Col>
            <Col xs="6" className="d-flex flex-column h-100 ">
              <Col className="h-50">
                {slicedProducts.length > 1 && (
                  <ProductCard
                    image={
                      (slicedProducts[1].attributes.images &&
                        slicedProducts[1].attributes.images.data[0].attributes
                          .url) ||
                      defaultImage
                    }
                    onClick={() =>
                      history.push(`/shop/${slicedProducts[1].id}`)
                    }
                  />
                )}
              </Col>
              <Row className="h-50 overflow-hidden mt-md-3 mt-2 flex-nowrap gx-lg-4 gx-md-3 gx-2">
                <Col xs="7" md="6">
                  {slicedProducts.length > 2 && (
                    <ProductCard
                      image={
                        (slicedProducts[2].attributes.images &&
                          slicedProducts[2].attributes.images.data[0].attributes
                            .url) ||
                        defaultImage
                      }
                      onClick={() =>
                        history.push(`/shop/${slicedProducts[2].id}`)
                      }
                    />
                  )}
                </Col>
                <Col xs="5" md="6">
                  {slicedProducts.length > 3 && (
                    <ProductCard
                      image={
                        (slicedProducts[3].attributes.images &&
                          slicedProducts[3].attributes.images.data[0].attributes
                            .url) ||
                        defaultImage
                      }
                      onClick={() =>
                        history.push(`/shop/${slicedProducts[3].id}`)
                      }
                    />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col xs="12" className="h-100">
              <p>No Products Found.</p>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
});
