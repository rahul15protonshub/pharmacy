import * as React from "react";
import Carousel from "../../../../../studio-store-ecommerce-components/src/ArrowAnimateCarousel";
import { Container, Row, Col } from "reactstrap";
import SectionHeading from "../../../../../studio-store-ecommerce-components/src/SectionHeading";
import { withRouter, RouteComponentProps } from "react-router-dom";
import CategoryCard from "./CategoryCard";

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

  return (
    <section className="ds-mb-40 ds-mb-md-80 ds-mb-lg-104 ds-py-40 bg-light-grey-4 essence-category">
      <Container className="essence-category__container">
        <Row>
          <Col xs="5" md="4" className="essence-category_col">
            <SectionHeading
              name="Categories"
              link={() => {
                localStorage.setItem("newest", "By Newest");
                onViewMore();
              }}
              className="px-lg-5 mb-0 essence-category_heading_wrapper"
            />
          </Col>
          <Col xs="7" md="8">
            {slicedProducts.length > 0 ? (
              <Carousel
                carouselProps={{
                  breakPoints: [
                    {
                      width: 0,
                      itemsToShow: 1.6,
                      itemsToScroll: 1,
                    },
                    {
                      width: 500,
                      itemsToShow: 2.4,
                      itemsToScroll: 1,
                    },
                    {
                      width: 800,
                      itemsToShow: 4,
                      itemsToScroll: 1,
                    },
                  ],
                  showArrows: false,
                }}
              >
                {slicedProducts.map((category: any, index) => {
                  return (
                    <CategoryCard
                      categoryName={category.attributes.name}
                      image={
                        category.attributes.product_image.url || defaultImage
                      }
                      onClick={() => {
                        localStorage.setItem("category", category.id);
                        history.push(
                          `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=&q[category_id][]=${
                            category.id
                          }`
                        );
                      }}
                    />
                  );
                })}
              </Carousel>
            ) : (
              <p>No Products Found.</p>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
});
