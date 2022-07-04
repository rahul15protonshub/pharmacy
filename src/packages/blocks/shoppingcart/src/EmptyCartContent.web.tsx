import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import { emptyCart } from "./assets";
//@ts-ignore
import content from "../../studio-store-ecommerce-components/src/content.js";
// Customizable Area Start
// Customizable Area End

export const EmptyCartContent = (props: any) => {
  // Customizable Area Start
  return (
    <>
      <section>
        <Container>
          {localStorage.removeItem("coupon")}

          <div className="yt-empty-cart-wrap cart-pg-inner-wrap p-4 bg-white radius-10 cart-pg-mb-30 mt-5">
            <div className="cart-pg-empty-main-wrap text-center py-5">
              <img
                src={emptyCart}
                className="img-fluid"
                width="170"
                height="212"
              />
              <div className="cartno-wrap">
                <h2 className="empty-cartn-ttl mt-0">{content.cartEmpty}</h2>
                <p className="empty-cart-text mb-0">
                  {content.cartEmptyDescription}
                </p>
              </div>
              {/* <Ripple> */}

              {/* </Ripple> */}
            </div>
          </div>
          <div className="yt-empty-cart-wrap cart-pg-inner-wrap radius-10 cart-pg-mb-30">
            <Button
              style={{ width: "100%" }}
              className="primary-btn"
              onClick={() => {
                //@ts-ignore
                props.history.push("./Filteroptions");
              }}
            >
              {content.browseProducts}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
  // Customizable Area End
};

export default withRouter(EmptyCartContent);
// Customizable Area Start
// Customizable Area End
