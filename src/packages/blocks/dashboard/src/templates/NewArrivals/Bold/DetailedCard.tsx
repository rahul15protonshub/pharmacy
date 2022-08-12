import * as React from "react";
import { Row, Col, Button } from "reactstrap";
import { HiArrowNarrowRight } from "react-icons/hi";
//@ts-ignore
import content from "../../../../../studio-store-ecommerce-components/src/content";
import { Scrollbars } from "react-custom-scrollbars";
import "./assets/css/detailed-card.scoped.css";

interface DetailedCardProps {
  className?: string;
  image?: any;
  productName: string;
  price: string;
  desc: any;
  stockAvailable: boolean;
  isItemAddedToCart: boolean;
  addItemToCart?: Function;
  goToCart?: Function;
  goToProductDetails?: Function;
  // size:'lg'|'md'
}

const DetailedCard: React.FunctionComponent<DetailedCardProps> = (props) => {
  const {
    image,
    className,
    productName,
    price,
    desc,
    isItemAddedToCart,
    addItemToCart,
    goToCart,
    stockAvailable,
    goToProductDetails,
  } = props;
  return (
    <Row
      className={`detailed-card detailed-card--hover detailed-card--size-lg gx-0 ${className}`}
    >
      <Col xs="12" md="6">
        <img
          className="detailed-card__image img-fluid"
          src={image}
          alt="product"
        />
      </Col>
      <Col xs="12" md="6">
        <div className="detailed-card__content">
          <div className="detailed-card__content__product-details">
            <h4
              className="mb-2 d-flex align-items-center detailed-card__content__product-details__heading"
              onClick={() => goToProductDetails && goToProductDetails()}
            >
              <span>{productName}</span>
              &nbsp; &nbsp;
              <span className="detailed-card__content__product-details__icon">
                <HiArrowNarrowRight />
              </span>
            </h4>
            <h5 className="fw-light mb-0">{price}</h5>
          </div>
          <Scrollbars className="detailed-card__content__desc">
            <div
              className="f-md pe-4 pe-md-5"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          </Scrollbars>
          {stockAvailable ? (
            !isItemAddedToCart ? (
              <Button
                color="primary-1"
                size="md"
                outline
                onClick={() => addItemToCart && addItemToCart()}
              >
                {content.addToCart}
              </Button>
            ) : (
              <Button
                color="primary-1"
                size="md"
                outline
                onClick={() => goToCart && goToCart()}
              >
                {content.goToCart}
              </Button>
            )
          ) : (
            <Button color="primary-1" size="md" outline disabled>
              {content.outOfStock}
            </Button>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default DetailedCard;
