import React from "react";
import { Container, Button, Col } from "reactstrap";

import "../assets/css/orderplace.css";

function OrderPlaced(props: any) {
  return (
    <>
      <section>
        <Container>
          <Col lg="5" className="m-auto">
            <div className="orderplc-pg-inner-wrap radius-10 orderplc-pg-mb-80 mt-5">
              <div className="orderplc-pg-success-main-wrap text-center">
                <img
                  src={require("../assets/tick.svg")}
                  className="img-fluid yt-order-placed-icn"
                  width="170"
                  height="212"
                />
                <div className="orderplc-wrap mt-4">
                  <h4 className="fw-bold my-3">Thank You</h4>
                  <p className="mb-0 orderplc-text">Order placed succesfully</p>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    color="primary-1"
                    block
                    onClick={() => {
                      // console.log("order");
                      //@ts-ignore
                      props?.history?.push({
                        pathname: "/profilebio",
                        state: { activeTab: "myorder" },
                      });
                    }}
                  >
                    View order
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Container>
      </section>
    </>
  );
}
export default OrderPlaced;
