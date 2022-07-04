import * as React from "react";
import Carousel from "../../../../../studio-store-ecommerce-components/src/ArrowAnimateCarousel";
import { Container, Col } from "reactstrap";
import SectionHeading from "../../../../../studio-store-ecommerce-components/src/SectionHeading";
import { withRouter, RouteComponentProps } from "react-router-dom";
import CategoryCard from "./CategoryCard";

interface UltraProps extends RouteComponentProps {
  collection: any[];
  addToCart: Function;
  createWishlist: Function;
  deleteWishlist: Function;
  onViewMore: Function;
}

export const Ultra: any = withRouter((props: UltraProps) => {
  const { collection, onViewMore, history } = props;
  const slicedProducts: any[] = collection.slice(0, 4);
  const defaultImage: any =
    "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";

  return (
    <section className="ds-mb-40 ds-mb-md-80 ds-mb-lg-104">
      <Container className="carousel-responsive-container">
        <SectionHeading
          name="Categories"
          link={() => {
            localStorage.setItem("newest", "By Newest");
            onViewMore();
          }}
          underline
          className="px-3 px-lg-0 ds-mb-md-40 mb-2"
        />
        {slicedProducts.length > 0 ? (
          <Carousel
            carouselProps={{
              breakPoints: [
                {
                  width: 0,
                  itemsToShow: 2.2,
                  itemsToScroll: 1,
                },
                {
                  width: 768,
                  itemsToShow: 2.6,
                  itemsToScroll: 1,
                },
                {
                  width: 1000,
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
                  image={category.attributes.product_image.url || defaultImage}
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
          <p className="px-3 px-lg-0">No Products Found.</p>
        )}
      </Container>
    </section>
  );
});
