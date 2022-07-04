import * as React from "react";
import "./assets/css/shadow-card.css";

interface ShadowCardProps {
  image?: any;
  onClick?: Function;
  productName: string;
  price: string;
}

const ShadowCard: React.FunctionComponent<ShadowCardProps> = (props) => {
  const { productName, price, image, onClick: handleClick } = props;
  return (
    <div
      className="shadow-card shadow-card--hover"
      onClick={() => handleClick && handleClick()}
    >
      <img className="shadow-card__image img-fluid" src={image} alt="product" />
      <div className="shadow-card__overlay">
        <h5 className="f-s-sm f-md mb-0">{productName}</h5>
        <span className="f-s-xs f-sm fw-light">{price}</span>
      </div>
    </div>
  );
};

export default ShadowCard;
