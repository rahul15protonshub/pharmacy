// @ts-nocheck
import React, { createRef } from "react";
import {
  Container,
  Row,
  Col,
  // Customizable Area Start
  // Customizable Area End
} from "reactstrap";
import { Link } from "react-router-dom";

import FilteroptionsList from "../src/FilteroptionsList.web";
import FilterProduct from "../src/FilterProduct.web";
//@ts-ignore
import content from "../../studio-store-ecommerce-components/src/content";

import "../assets/css/index.scoped.css";
import "../assets/css/pagination.css";

import FilteroptionsController, { Props } from "./FilteroptionsController.web";
// Customizable Area Start
// Customizable Area End

export default class Filteroptions extends FilteroptionsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
  render() {
    return (
      // Customizable Area Start
      <div>
        <div style={{ width: "92%", margin: "0 auto" }}>
          <div className="pageroute">
            <Link style={{ textDecoration: "none" }} to="/home-page">
              <span
                className="cart-pg-home w3-hover-opacity"
                style={{ cursor: "pointer" }}
              >
                {content.home}
              </span>
            </Link>
            {" > "}
            <span className="currpage">{content.shop}</span>
          </div>
          <div
            onClick={this.ytmbFilter}
            className={this.state.YtMbFilter ? "overlay" : ""}
          >
            <div
              id="mySidenav"
              className="sidenav"
              style={this.state.YtMbFilter ? {} : { width: "0%" }}
            >
              <div
                className={
                  this.state.YtMbFilter ? "ytMbfilteropen" : "yt-cm-lt-col "
                }
              >
                <FilteroptionsList
                  mbOpenState={this.state.YtMbFilter}
                  cancel={this.ytmbFilter}
                />
              </div>
            </div>
          </div>

          <div className="filterpage1">
            <Row className="yt-cm-row">
              <Col lg={3} className="desktopFilter">
                <FilteroptionsList
                  mbOpenState={this.state.YtMbFilter}
                  cancel={this.ytmbFilter}
                />
                {/* <div
                    className="w3-overlay w3-show"
                    style={{ zIndex: -1, backgroundColor: "transparent" }}
                    onClick={() => this.ytmbFilter()}
                  /> */}
              </Col>
              <Col xs={12} sm={12} lg={9} className="1yt-cm-rt-col">
                <div className="d-flex flex-column justify-content-between h-100">
                  <div id="SingelnewProducts">
                    <FilterProduct openFilter={this.ytmbFilter} />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      // Customizable Area End
    );
  }
}
