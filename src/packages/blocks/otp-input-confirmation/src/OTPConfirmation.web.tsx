//@ts-nocheck
import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import OTPConfirmationController, {
  Props,
} from "./OTPConfirmationController.web";
import OTPConfrimAccount from "./OTPConfirmAccount.web";
import "./css/index.css";
// @ts-ignore
import content from "../../studio-store-ecommerce-components/src/content";
// Customizable Area Start
// Customizable Area End
export default class OTPConfirm extends OTPConfirmationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  render() {
    // Customizable Area Start
    return (
      <>
        <Container>
          <div className="yt-forgot-pw-wrap yt-fpp-mb-5 yt-fpp-mt-5">
            <Row>
              <Col md={0} className="col-xxl-7 d-none">
                <div className="yt-fp-inner-content yt-fp-bg-banner">
                  <div className="yt-fp-other-info">
                    <p className="yt-fp-oi-tag-small">
                      {content.fashionAndTrendComeTogather}
                    </p>
                    <h3 className="yt-fp-oi-tag-big">{content.upto30Off}</h3>
                    <span className="yt-fp-bdr" />
                    <Button
                      color="secondary yt-fp-sp-now"
                      // onClick={() => history.push('/shop')}
                    >
                      {content.shopNow}
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md={12} className="">
                <div className="yt-fp-inner-content">
                  <OTPConfrimAccount />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </>
    );
    // Customizable Area End
  }
}
