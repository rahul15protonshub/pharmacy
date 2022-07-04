import * as React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import "./assets/css/gallery-card.css";

interface GalleryCardProps {
  image?: any;
  onClick?: Function;
}

const GalleryCard: React.FunctionComponent<GalleryCardProps> = (props) => {
  const { image, onClick: handleClick } = props;
  return (
    <div className="gallery-card" onClick={() => handleClick && handleClick()}>
      <img
        className="gallery-card__image img-fluid"
        src={image}
        alt="product"
      />
      <div className="gallery-card__overlay d-flex align-items-center justify-content-center">
        <HiArrowNarrowRight />
        <div className="gallery-card__overlay__bg" />
      </div>
    </div>
  );
};

export default GalleryCard;
