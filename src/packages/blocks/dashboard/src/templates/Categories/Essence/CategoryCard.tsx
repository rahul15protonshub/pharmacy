import * as React from "react";
import "./assets/css/style.css";

interface CategoryCardProps {
  categoryName: string;
  image?: string;
  onClick?: Function;
  // size:'lg'|'md'
}

const CategoryCard: React.FunctionComponent<CategoryCardProps> = (props) => {
  const { image, onClick: handleClick, categoryName } = props;
  return (
    <div
      className="essence-category-card essence-category-card--hover essence-category-card--size-lg"
      onClick={() => typeof handleClick === "function" && handleClick()}
    >
      <img
        className="essence-category-card__image img-fluid"
        src={image}
        alt="product"
      />
      <div className="essence-category-card__overlay bd-gray-200">
        <h6 className="f-md text-truncate essence-category-card__overlay__text text-capitalize text-center mb-0 ">
          {categoryName}
        </h6>
      </div>
    </div>
  );
};

export default CategoryCard;
