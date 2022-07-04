import * as React from "react";
import Carousel from "../../../../../studio-store-ecommerce-components/src/ArrowCarousel";
import { Container, Col } from "reactstrap";
import { MinimalHeading } from "../../../../../studio-store-ecommerce-components/src/SectionHeading";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ShadowCard from "../common/ShadowCard";

interface MinimalProps extends RouteComponentProps {
  collection: any[];
  addToCart: Function;
  createWishlist: Function;
  deleteWishlist: Function;
  onViewMore: Function;
}

export const Minimal: any = withRouter((props: MinimalProps) => {
  const { collection, onViewMore, history } = props;
  const slicedProducts: any[] = [...collection];
  const defaultImage: any =
    "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";
  return (
    <section className="ds-py-md-40 py-4 bg-light-grey-4 ds-mb-40 ds-mb-md-64">
      <Container className="carousel-responsive-container">
        <MinimalHeading
          name="Categories"
          link={() => {
            localStorage.setItem("newest", "By Newest");
            onViewMore();
          }}
          className="px-3 px-lg-0 ds-mb-md-40 mb-2"
        />
        {slicedProducts.length > 0 ? (
          <Carousel
            carouselProps={{
              breakPoints: [
                {
                  width: 0,
                  itemsToShow: 3.2,
                  itemsToScroll: 1,
                },
                {
                  width: 768,
                  itemsToShow: 3.9,
                  itemsToScroll: 1,
                },
                {
                  width: 1000,
                  itemsToShow: 5,
                  itemsToScroll: 1,
                },
              ],
            }}
          >
            {slicedProducts.map((category: any, index) => {
              return (
                <ShadowCard
                  categoryName={category.attributes.name}
                  image={category.attributes.product_image.url || defaultImage}
                  onClick={() => {
                    localStorage.setItem("category", category.id);
                    history.push(
                      `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=&q[category_id][]=${
                        category.id
                      }`
                    );
                  }}
                  size="sm"
                />
              );
            })}
          </Carousel>
        ) : (
          <p className="px-3 px-lg-0">No Products Found.</p>
        )}
      </Container>
    </section>
  );
});
