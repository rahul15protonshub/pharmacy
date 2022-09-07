// @ts-nocheck
import React from "react";

import DashboardController, { Props } from "./DashboardController.web";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";
// Customizable Area Start
import { setTimeout } from "timers";
const templates = require("../../studio-store-ecommerce-theme/src/templates.json");
const THEMEPATH = "../../studio-store-ecommerce-theme/src/theme";
const SECTIONS_PATH = {
  HEADER_BANNER: "./templates/HeaderBanner",
  CATEGORY: "./templates/Categories",
  NEW_ARRIVALS: "./templates/NewArrivals",
  TRENDINGPRODUCTS: "./templates/TrendingProducts",
};
const dynamicComponentLoad = (
  block: any,
  PATH: string,
  template: any,
  templateName,
  sectionName
) => {
  try {
    let Component =
      require(`../../studio-store-ecommerce-theme/src/theme/${templateName}/${sectionName}`)?.default;
    if (typeof Component !== "undefined") {
      return React.createElement(Component, { ...block });
    }
    // component doesn't exist yet
    return React.createElement(
      () => (
        <div>The component {block.component} has not been created yet.</div>
      ),
      { key: block._uid }
    );
  } catch (err) {
    console.log(err, "err");
  }
};
import "../assets/css/index.css";
import { IoMdClose } from "react-icons/io";
import LeftContent from "./components/LeftContent";
import RightContent from "./components/RightContent";
// Customizable Area End
class HomeDashboard extends DashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    return (
      <>
        <Container
          className={`home-layout ${
            !this.state.showProducts ? "home-layout--show" : ""
          } h-100 mb-40`}
        >
          <Row className="home-layout__row gx-40 h-100">
            <Col xs="auto" className="home-layout__col home-layout__left">
              <div
                className="home-layout__toggle-icon"
                onClick={this.toggeProduct}
              >
                <IoMdClose />
              </div>
              <LeftContent
                data={this.state.collectionCategory}
                banners={
                  this.state.bannerPosition2?.attributes?.images?.data || []
                }
                onSelectSubCategory={(category) => {
                  this.setSelectedCategory(category);
                  setTimeout(() => {
                    if (this.state.showOurProducts) {
                      this.closeOurProducts();
                    }
                  }, 300); // dont close immediately
                }}
                onSelectCategory={(id) => {
                  if (id === 0) {
                    this.clearSelectedCategory();
                    setTimeout(() => {
                      if (this.state.showOurProducts) {
                        this.closeOurProducts();
                      }
                    }, 300); // dont close immediately
                  }
                }}
              />
            </Col>
            <Col xs="12" lg="" className="home-layout__col home-layout__right">
              <RightContent
                toggleOurProducts={this.toggeProduct}
                banners={this.state.banners || []}
                products={this.state.dashboardFilteredProducts}
                loading={this.state.dashboardFilterLoading}
                onProductAddToWishlist={(id) => this.postWishlist(id)}
                onProductDeleteFromWishlist={(id) => this.delWishlist(id)}
                onSortingChange={(sortBy, sortOrder) =>
                  this.setDashboardFilters(
                    1,
                    undefined,
                    undefined,
                    sortBy,
                    sortOrder
                  )
                }
                productListTitle={
                  this.state.selectedCategory?.name || "New Arrivals"
                }
                onProductAddToCart={(product) =>
                  this.addToCart(
                    product,
                    product.attributes.default_variant?.id
                  )
                }
                productWishlisting={this.state.productWishlisting}
                productsAddingToCart={this.state.productsAddingToCart}
                onProductDecreaseCartQuantity={(product) =>
                  this.increaseOrDecreaseCartQuantity(
                    product,
                    -1,
                    product.attributes.default_variant?.id
                  )
                }
                onProductIncreaseCartQuantity={(product) =>
                  this.increaseOrDecreaseCartQuantity(
                    product,
                    1,
                    product.attributes.default_variant?.id
                  )
                }
                isProductAddtoCart={this.state.isProductAddtoCart}
              />
            </Col>
          </Row>
          <div
            className="home-layout__backdrop"
            onClick={this.toggeProduct}
          ></div>
        </Container>
      </>
    );
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
}

export { HomeDashboard };
//@ts-ignore
export default withRouter(HomeDashboard);

{
  /* <div className="main-container">
                <div className="service-steps d-none">
                  <div className="step">
                    <img src={Serviceicon1} className="banner-image" />
                    <div>
                      <p>
                        <strong>
                          {content.homeFreeDeliveryStrip.FreeDelivery}
                        </strong>
                      </p>
                      <p>
                        {content.homeFreeDeliveryStrip.FreeDeliveryDescription}
                      </p>
                    </div>
                  </div>
                  <div className="step">
                    <img src={Serviceicon2} className="banner-image" />
                    <div>
                      <p>
                        <strong>
                          {content.homeFreeDeliveryStrip.SecurePayment}
                        </strong>
                      </p>
                      <p>
                        {content.homeFreeDeliveryStrip.SecurePaymentDescription}
                      </p>
                    </div>
                  </div>
                  <div className="step">
                    <img src={Serviceicon3} className="banner-image" />
                    <div>
                      <p>
                        <strong>{content.homeFreeDeliveryStrip.return}</strong>
                      </p>
                      <p>{content.homeFreeDeliveryStrip.returnDescription}</p>
                    </div>
                  </div>
                  <div className="step border-0">
                    <img src={Serviceicon4} className="banner-image" />
                    <div>
                      <p>
                        <strong>{content.homeFreeDeliveryStrip.support}</strong>
                      </p>
                      <p>{content.homeFreeDeliveryStrip.supportDescrip}</p>
                    </div>
                  </div>
                </div>
              </div> */
}
