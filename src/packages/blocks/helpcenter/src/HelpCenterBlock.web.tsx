import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col, TabContent, TabPane } from "reactstrap";
// @ts-ignore
import classnames from "classnames";
// @ts-ignore

import { FaLongArrowAltLeft } from "react-icons/fa";

import "../assets/styles/help-center.scoped.css";
import PageLoadingBlog from "../../profilebio/src/PageLoadingBlog.web";
// Customizable Area Start
// Customizable Area End
import HelpCenterController, { Props } from "./HelpCenterController.web";

class HelpCenterBlock extends HelpCenterController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    if (
      this.state.tabName !== undefined &&
      this.state.helpCenterData !== undefined
    ) {
      let matchTabName = "";
      this.state.helpCenterData.map((data: any, index: any) => {
        if (this.state.tabName === data.attributes.help_center_type) {
          matchTabName = index + 1;
        }
      });
      this.toggle(matchTabName);
    }

    if (
      this.state.tabName === undefined &&
      this.state.helpCenterData !== undefined
    ) {
      this.toggle(1);
    }
    if (this.state.loading) {
      // @ts-ignore
      return <PageLoadingBlog title="Loading ..." />;
    }

    return (
      <Container
        className={
          this.state.activeMobileTab ? "bb-mobile-datapg" : "bb-desktop-datapg"
        }
      >
        <Row>
          <Col md={12}>
            <div className="pageroute hcb-breadcrumbs my-3 mb-5">
              <Link to="/">
                <span
                  className="hcb-home w3-hover-opacity w3-ripple"
                  style={{ cursor: "pointer" }}
                >
                  Home
                </span>
              </Link>
              {" > "}
              {this.state.isLoggedIn && (
                <Link to="/profilebio">
                  <span
                    className="hcb-home w3-hover-opacity w3-ripple"
                    style={{ cursor: "pointer" }}
                  >
                    Profile
                  </span>
                </Link>
              )}
              {" > "}
              <span className="currpage hcb-current">Help Center</span>
            </div>
          </Col>
        </Row>
        <section className="mb-4 d-block hcb-mb-30">
          <div
            className="hcb-beckfrom-ct-page d-flexx align-items-center hcb-mb-30 w3-ripple my-0 mb-4"
            onClick={() => {
              this.routeToProfile();
            }}
            style={{ cursor: "pointer" }}
          >
            {this.state.isLoggedIn && (
              <FaLongArrowAltLeft className="hcp-back-arrow" />
            )}{" "}
            <span className="pl-2 hc-back-tag" style={{ opacity: 1 }}>
              Help Center
            </span>
          </div>
          <Row className="bb-cm-row bb-desktop-view">
            <Col md={5} lg={4} className="bb-cm-lt-col col">
              {this.state.helpCenterData && (
                <div className="hcb-inner-wrap bg-white radius-10 hcb-mb-30">
                  <div className="hcb-inner-contnet bb-desk-hc">
                    <ul className="p-0 m-0 list-style-none hcb-tabs-name">
                      {this.state.helpCenterData.map(
                        (data: any, index: any) => (
                          <li
                            key={index}
                            className={classnames({
                              active: this.state.activeTab === index + 1,
                            })}
                            onClick={() => {
                              this.routeHelpCenter(
                                data.attributes.help_center_type
                              );
                            }}
                          >
                            {data.attributes.title}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </Col>
            <Col md={7} lg={8} className="bb-cm-rt-col col">
              <div className="bb-mb-pg-ttl">
                <div className="hcb-beckfrom-ct-page d-flex align-items-center hcb-mb-30">
                  <FaLongArrowAltLeft
                    className="hcp-back-arrow"
                    onClick={() => {
                      this.routeHelpCenterMb(undefined);
                    }}
                  />{" "}
                </div>
              </div>
              {this.state.helpCenterData && (
                <div
                  className="hcb-content-wrap hcb-tab-content bg-white radius-10 hcb-mb-30 mt-0"
                  style={{ maxHeight: "460px", overflow: "auto" }}
                >
                  <div className="hc-inner-content">
                    {this.state.helpCenterData.map((data: any, index: any) => (
                      <TabContent activeTab={this.state.activeTab} key={index}>
                        <TabPane tabId={index + 1}>
                          <div className="help-center-list-content">
                            {data?.attributes?.help_center_type != "FAQs" && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: data.attributes.description.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                                }}
                              />
                            )}
                            {data.attributes.help_center_type == "FAQs" &&
                              data.attributes.description.map(
                                (faq: any, index: number) => {
                                  return (
                                    <div key={index}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: faq.title.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                        }}
                                      />
                                      <div
                                        style={{
                                          fontSize: "15px",
                                          fontWeight: "normal",
                                          color: "#737373",
                                        }}
                                        dangerouslySetInnerHTML={{
                                          __html: faq.content.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                        }}
                                      />
                                    </div>
                                  );
                                }
                              )}
                          </div>
                        </TabPane>
                      </TabContent>
                    ))}
                  </div>
                </div>
              )}
            </Col>
          </Row>
          {/* mobile-view */}
          <Row className="bb-mobile-view">
            <Col>
              <>
                {this.state.helpCenterData && !this.state.activeMobileTab && (
                  <div className="hcb-inner-wrap bg-white radius-10 hcb-mb-30">
                    <div className="hcb-inner-contnet bb-mobile-hc">
                      <ul className="p-0 m-0 list-style-none hcb-tabs-name">
                        {this.state.helpCenterData.map(
                          (data: any, index: any) => (
                            <li
                              key={index}
                              className={classnames({
                                active: this.state.activeTab === index + 1,
                              })}
                              onClick={() => {
                                this.routeHelpCenterMb(
                                  data.attributes.help_center_type
                                );
                              }}
                            >
                              {data.attributes.title}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}
                {this.state.activeMobileTab && (
                  <div className="bb-mb-pg-ttl">
                    <div className="hcb-beckfrom-ct-page d-flex align-items-center hcb-mb-30">
                      <FaLongArrowAltLeft
                        className="hcp-back-arrow-inner"
                        onClick={() => {
                          this.setState({
                            // activeMobileTab: true
                            activeMobileTab: !this.state.activeMobileTab,
                          });
                        }}
                      />{" "}
                    </div>
                  </div>
                )}
                {this.state.helpCenterData && this.state.activeMobileTab && (
                  <div
                    className="hcb-content-wrap hcb-tab-content bg-white radius-10 hcb-mb-30 mt-0"
                    style={{ maxHeight: "460px", overflow: "auto" }}
                  >
                    <div className="hc-inner-content">
                      {this.state.helpCenterData.map(
                        (data: any, index: any) => (
                          <TabContent
                            activeTab={this.state.activeTab}
                            key={index}
                          >
                            <TabPane tabId={index + 1}>
                              <div className="help-center-list-content">
                                {data.attributes.help_center_type != "FAQs" && (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        data.attributes.description.replace(
                                          /\n/g,
                                          "<br />"
                                        ),
                                    }}
                                  />
                                )}
                                {data.attributes.help_center_type == "FAQs" &&
                                  data.attributes.description.map(
                                    (faq: any, index: number) => {
                                      return (
                                        <div key={index}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: faq.title.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                            }}
                                          />
                                          <div
                                            style={{
                                              fontSize: "15px",
                                              fontWeight: "normal",
                                              color: "#737373",
                                            }}
                                            dangerouslySetInnerHTML={{
                                              __html: faq.content.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                            }}
                                          />
                                        </div>
                                      );
                                    }
                                  )}
                              </div>
                            </TabPane>
                          </TabContent>
                        )
                      )}
                    </div>
                  </div>
                )}
              </>
            </Col>
          </Row>
        </section>
      </Container>
      // Customizable Area End
    );
  }
}
// @ts-ignore
export default withRouter(HelpCenterBlock);
export { HelpCenterBlock };
// Customizable Area Start
// Customizable Area End
