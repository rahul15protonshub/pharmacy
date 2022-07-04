import * as React from "react";
import Carousel from "../../../../../studio-store-ecommerce-components/src/BannerCarousel";
import "./assets/css/style.css";

interface CommonBannerProps {
  data: any[];
}

export const CommonBanner: React.FunctionComponent<CommonBannerProps> = (
  props
) => {
  const { children, data } = props;
  return (
    <section className="common-header-banner ds-mb-lg-104 ds-mb-md-80 ds-mb-40">
      <div className="common-header-banner__container">
        <Carousel
          className="common-header-banner__carousel"
          otherProps={{
            itemsToShow: 1,
            itemsToScroll: 1,
            pagination: data.length > 1,
            showArrows: false,
            enableAutoPlay: true,
            autoPlaySpeed: 5000,
          }}
          position="right"
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
      </div>
    </section>
  );
};
