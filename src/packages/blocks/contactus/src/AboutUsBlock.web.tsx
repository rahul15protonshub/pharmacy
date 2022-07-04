import React from "react";
import { withRouter } from "react-router-dom";
import "../assets/css/index.scoped.css";
import AboutUsReviews from "./AboutUsReview.web";
import { Container } from "reactstrap";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";
// Customizable Area Start
// Customizable Area End

import AboutUsController, { Props } from "./AboutUsController.web";

export class AboutUsBlockBlock extends AboutUsController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      // Customizable Area Start
      <div>
        {/*<HeroBanner />*/}
        <section className="yt-about-us-pg">
          <Loader loading={this.state.loading} />
          {this.state.content && (
            <Container>
              <div className="yt-cm-mobile-bread">
                <div className="pageroute profile-pg-breadcrumbs">
                  <span className="profile-pg-home">Home {">"}</span>{" "}
                  <span className="">About Us</span>
                </div>
                <h2 className="yt-profile-mb-ttl profile-pg-title">About Us</h2>
              </div>

              <div className="cardcontainer yt-main-wrapper border-radius-10 bg-white">
                <div className="customcard yt-inner-wrap">
                  {this.state.content}
                </div>
              </div>
            </Container>
          )}
        </section>
        <AboutUsReviews feedbackData={this.state?.customerFeedBackData} />
        <div className="mt-5" />
      </div>
      // Customizable Area End
    );
  }
}
// @ts-ignore
export default withRouter(AboutUsBlockBlock);
// Customizable Area Start
// Customizable Area End
