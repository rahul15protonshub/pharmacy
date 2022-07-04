import * as React from "react";
import Carousel from "../../../../../studio-store-ecommerce-components/src/BannerCarousel";
import { Container } from "reactstrap";
import "./assets/css/style.css";

interface MinimalProps {
  data: any[];
}

export const Minimal: React.FunctionComponent<MinimalProps> = (props) => {
  const { children, data } = props;
  return (
    <section className="minimal-header-banner ds-mt-md-40 ds-mb-md-40 my-4">
      <Container>
        <Carousel
          className="minimal-header-banner__carousel"
          otherProps={{
            itemsToShow: 1,
            itemsToScroll: 1,
            pagination: data.length > 1,
            showArrows: false,
            enableAutoPlay: true,
            autoPlaySpeed: 5000,
          }}
          position="center"
        >
          {data.map((banner: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => {
                  banner.attributes.url_link &&
                    window.location.replace(banner.attributes.url_link);
                }}
              >
                <img
                  src={banner.attributes.url}
                  style={{
                    cursor: banner.attributes.url_link ? "pointer" : "default",
                  }}
                />
              </div>
            );
          })}
          {children}
        </Carousel>
      </Container>
    </section>
  );
};
