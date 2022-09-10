// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
// @ts-ignore
import BackgroundHead from "./images/playstorebg.png";;
//@ts-ignore
import googleplay from "./images/googleplay.svg";
//@ts-ignore
import appstore from "./images/appstore.svg";
//@ts-ignore
import promotion from "./images/promotion.png";;
import { withRouter } from "react-router-dom";
// @ts-ignore
import isEmpty from "lodash/isEmpty";
// @ts-ignore
import includes from "lodash/includes";
import "./css/index.scoped.css";
//@ts-ignore
import content from "../content";
import PageLoadingBlog from "../../../profilebio/src/PageLoadingBlog.web";
import FooterController, { Props } from "./FooterController.web";

const twitterImage = require("./images/social-media-twitter.png");
const instagramImage = require("./images/social-instagram.png");
const facebookImage = require("./images/f_logo_RGB-Grey_144 1.png");
const playStoreImage = require("./images/google-play-badge 1.png");
const appStoreImage = require("./images/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917 1.png");
const youtubeImage = require("./images/social-video-youtube-clip.png");

class Footer extends FooterController {
  constructor(props: Props) {
    super(props);
  }
  async componentDidMount() {
    super.componentDidMount();
    const themData = JSON.parse(localStorage.getItem("appThemData") ?? "{}");
    if (themData) {
      this.setState({ theamData: themData });
    }
    window.scroll(0, 0);
  }
  routeToAll(route: string) {
    //@ts-ignore
    this.props?.history?.push(route);
  }
  routeHelpCenter = (value: any) => {
    if (value !== undefined && includes(value.toLowerCase(), "about")) {
      //@ts-ignore
      this.props.history.push("/aboutus");
    } else if (value !== undefined) {
      let path = "/help-center/" + value;
      setTimeout(() => {
        //@ts-ignore
        this.props.history.push(path);
      }, 1000);
    } else {
      let path = "/help-center";
      //@ts-ignore
      this.props.history.push(path);
    }
  };
  render() {
    const appThemData = JSON.parse(localStorage.getItem("appThemData") ?? "{}");
    if (this.state.isBrandSettingsLoaded) {
      // @ts-ignore
      return <div title="Loading ..." />;
    }
    return (
      <footer className="footer-border">
        <div className="container footer-internal-content">
          <div className="row">
            <div className="col-lg-3 col-sm-3 col-xs-12">
              <div
                className="footer-contact-details"
                style={{ cursor: "pointer" }}
                onClick={() => this.props.history.push("/contact-us")}
              >
                <h2>Contact us</h2>
                <p>Send a Message</p>
                <p>
                  +
                  {
                    JSON.parse(localStorage.getItem("countryCode") || "{}")
                      ?.countryPinCode
                  }{" "}
                  {this.state.theamData?.commonTextsContent?.callUs}{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-3 col-xs-12">
              <div
                className="footer-contact-details"
                style={{ cursor: "pointer" }}
              >
                <h2
                  onClick={() => {
                    this.props.history.push("/aboutus");
                  }}
                >
                  About us
                </h2>
                <p
                  onClick={() => {
                    this.props.history.push("/aboutus");
                  }}
                >
                  Customer Reviews
                </p>
                <p
                  onClick={() => {
                    this.props.history.push("/help-center/FAQs");
                  }}
                >
                  FAQs
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-3 col-md-3 col-xs-12 icon-tab">
              <div className="footer-contact-details footer-icon-tab">
                <h2>Social</h2>
                <div className="row footer-media-btn">
                  {this.state.isShowFB && (
                    <div className="col-lg-auto col-sm-auto icon-tab">
                      <a
                        href={this.state.theamData?.footerContent?.facebookSrc}
                        target="_blank"
                      >
                        <img src={facebookImage} alt="facebook" />
                      </a>
                    </div>
                  )}
                  {this.state.isShowInsta && (
                    <div className="col-lg-auto col-sm-auto icon-tab">
                      <a
                        href={this.state.theamData?.footerContent?.instagramSrc}
                        target="_blank"
                      >
                        <img src={instagramImage} alt="instagram" />
                      </a>
                    </div>
                  )}
                  {this.state.isShowTwitter && (
                    <div className="col-lg-auto col-sm-auto icon-tab">
                      <a
                        href={this.state.theamData?.footerContent?.twitterSrc}
                        target="_blank"
                      >
                        <img src={twitterImage} alt="twitter" />
                      </a>
                    </div>
                  )}
                  {this.state.isShowYouTube && (
                    <div className="col-lg-auto col-sm-auto icon-tab">
                      <a
                        href={this.state.theamData?.footerContent?.youtubeSrc}
                        target="_blank"
                      >
                        <img src={youtubeImage} alt="twitter" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-3 col-md-3 col-xs-12 xs-mob">
              <div className="footer-contact-details">
                <h2>Download App</h2>
                <div className="row footerdownload footer-tab-view mobileViewContainer">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mob mobicon mobileViewAndroid">
                    <a href="https://play.google.com/store" target="_blank">
                      <img src={playStoreImage} alt="playstore" />
                    </a>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mob xs-mob mobileViewIos">
                    <a
                      href="https://www.apple.com/in/app-store/"
                      target="_blank"
                    >
                      <img
                        style={{
                          marginLeft: "10px",
                          marginTop: "9px",
                          height: "37px",
                          width: "126px",
                        }}
                        src={appStoreImage}
                        alt="appstore"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottombar">
          <Container>
            <p className="m-0 yt-copyright-text">
              {/* @ts-ignore */}
              {this.state.theamData &&
              this.state.theamData.footerContent?.copyright
                ? this.state.theamData.footerContent.copyright
                : content.copyrightText}
            </p>
          </Container>
        </div>
      </footer>
    );
  }
}
// @ts-ignore
export default withRouter(Footer);

