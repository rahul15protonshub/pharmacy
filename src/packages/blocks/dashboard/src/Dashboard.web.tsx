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
    let carousel = React.createRef();
    let Breakpoints = [
      { width: 200, itemsToShow: 2, itemsToScroll: 2 },
      { width: 320, itemsToShow: 2, itemsToScroll: 2 },
      { width: 500, itemsToShow: 3, itemsToScroll: 1 },
      { width: 769, itemsToShow: 5, itemsToScroll: 2 },
      { width: 1000, itemsToShow: 6, itemsToScroll: 2 },
      { width: 1300, itemsToShow: 7, itemsToScroll: 3 },
    ];
    let BreakpointsForCollection = [
      { width: 1, itemsToShow: 2.5 },
      { width: 500, itemsToShow: 3.5 },
      { width: 1000, itemsToShow: 4 },
    ];
    const banner_one =
      this.state.banners.length > 1 &&
      this.state.banners[0].attributes.images.data[0].attributes.url;
    localStorage.removeItem("newest");
    const selectedBanner =
      this.state.selectedTemplate &&
      templates[this.state.selectedTemplate].find(
        (temp) => temp.sectionName === "headerBanner"
      );
    // const selectedCategory =
    //   this.state.selectedTemplate &&
    //   templates[this.state.selectedTemplate].find(
    //     (temp) => temp.sectionName === "categories"
    //   );
    // const selectedTrendingProducts =
    //   this.state.selectedTemplate &&
    //   templates[this.state.selectedTemplate].find(
    //     (temp) => temp.sectionName === "TrendingProduct"
    //   );

    return (
      <>
        {/* {this.state.dashboardLoader && (
          <Loader loading={this.state.dashboardLoader} />
        )} */}

        {/* Shib start */}
        <Container className={`home-layout ${!this.state.showProducts ? 'home-layout--show' : ''} h-100 mb-40`}>
          <Row className="home-layout__row gx-40 h-100">
            <Col
              xs="auto"
              className="home-layout__col home-layout__left"
            >
              <div className="home-layout__toggle-icon" onClick={this.toggeProduct}>
                <IoMdClose/>
              </div>
              <LeftContent data={this.state.collectionCategory} banners={this.state.bannerPosition2?.attributes?.images?.data || []}
               onSelectSubCategory={category => {
                this.setSelectedCategory(category)
                setTimeout(() => {
                  if (this.state.showOurProducts) {
                    this.closeOurProducts()
                  }
                }, 300) // dont close immediately
              }}
              onSelectCategory={id => {
                if (id === 0) {
                  this.clearSelectedCategory()
                  setTimeout(() => {
                    if (this.state.showOurProducts) {
                      this.closeOurProducts()
                    }
                  }, 300) // dont close immediately
                }
              }} 
              
              />
            </Col>
            <Col
              xs="12"
              lg=""
              className="home-layout__col home-layout__right"
            >
              <RightContent
                // toggeProduct={this.toggeProduct}
                // banners={this.state.banners || []}
                // products={this.state.dashboardFilteredProducts}
                // onScrollEnd={() => {
                //   if (this.state.dashboardFilteredProductsTotalPages > this.state.dashboardFilteredProductsActivePage) {
                //     this.setDashboardFilters(this.state.dashboardFilteredProductsActivePage + 1)
                //   }
                // }}
                // loading={this.state.dashboardFilterLoading}
                // onProductAddToWishlist={id => this.postWishlist(id)}
                // onProductDeleteFromWishlist={id => this.delWishlist(id)}
                // onSortingChange={(sortBy, sortOrder) => this.setDashboardFilters(1, undefined, undefined, sortBy, sortOrder)}
                // productListTitle={this.state.selectedCategory.name || 'All Products'}
                // onProductAddToCart={product => this.addToCart(product)}
                // productsAddingToCart={this.state.productsAddingToCart}
                // onProductDecreaseCartQuantity={product => this.increaseOrDecreaseCartQuantity(product, -1)}
                // onProductIncreaseCartQuantity={product => this.increaseOrDecreaseCartQuantity(product, 1)}
                // fetchMoreData={this.fetchMoreData}
                // productWishlisting={this.state.productWishlisting}
                toggleOurProducts={this.toggleOurProducts}
                banners={this.state.banners || []}
                products={this.state.dashboardFilteredProducts}
                loading={this.state.dashboardFilterLoading}
                onProductAddToWishlist={id => this.postWishlist(id)}
                onProductDeleteFromWishlist={id => this.delWishlist(id)}
                onSortingChange={(sortBy, sortOrder) => this.setDashboardFilters(1, undefined, undefined, sortBy, sortOrder)}
                productListTitle={this.state.selectedCategory?.name || 'New Arrivals'}
                onProductAddToCart={product => this.addToCart(product, product.attributes.default_variant?.id)}
                productWishlisting={this.state.productWishlisting}
                productsAddingToCart={this.state.productsAddingToCart}
                onProductDecreaseCartQuantity={product => this.increaseOrDecreaseCartQuantity(product, -1, product.attributes.default_variant?.id)}
                onProductIncreaseCartQuantity={product => this.increaseOrDecreaseCartQuantity(product, 1, product.attributes.default_variant?.id)}
              />
            </Col>
          </Row>
          <div className="home-layout__backdrop" onClick={this.toggeProduct}></div>
        </Container>
        {/* Shib end */}

        {/* {this.state.selectedTemplate && templates[this.state.selectedTemplate] && (
          <>
            {dynamicComponentLoad(
              {
                data:
                  (this.state.banners.length > 0 &&
                    this.state.banners[0].attributes.images.data) ||
                  [],
              },
              SECTIONS_PATH.HEADER_BANNER,
              selectedBanner,
              this.state.selectedTemplate,
              "HeaderBanner"
            )} */}
{/* 
            {dynamicComponentLoad(
              {
                collection: this.state.collectionCategory,
                onViewMore: () => {
                  localStorage.setItem("newest", "By Newest");
                  //@ts-ignore
                  this.props?.history?.push(
                    `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc`
                  );
                },
                disablePropertyName: "isNewCollectionPrevButtonActive",
                isNewCollectionPrevButtonActive:
                  this.state.isNewCollectionPrevButtonActive,
                setPrvsButtonDisabled: (carousel) => {
                  setTimeout(() => {
                    this.setState({
                      isNewCollectionPrevButtonActive:
                        carousel?.current?.state.activePage != 0,
                    });
                  }, 500);
                },
                addToCart: this.addToCart,
                createWishlist: this.postWishlist,
                deleteWishlist: this.delWishlist,
                toSetDefaultVariant: this.toSetDefaultVariant,
              },
              SECTIONS_PATH.CATEGORY,
              selectedCategory,
              this.state.selectedTemplate,
              "Categories"
            )} */}
{/* 
            {dynamicComponentLoad(
              {
                collection: this.state.newCollection,
                onViewMore: () => {
                  localStorage.setItem("newest", "By Newest");
                  //@ts-ignore
                  this.props?.history?.push(
                    `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc`
                  );
                },
                disablePropertyName: "isNewCollectionPrevButtonActive",
                isNewCollectionPrevButtonActive:
                  this.state.isNewCollectionPrevButtonActive,
                setPrvsButtonDisabled: (carousel) => {
                  setTimeout(() => {
                    this.setState({
                      isNewCollectionPrevButtonActive:
                        carousel?.current?.state.activePage != 0,
                    });
                  }, 500);
                },
                addToCart: this.addToCart,
                createWishlist: this.postWishlist,
                deleteWishlist: this.delWishlist,
                toSetDefaultVariant: this.toSetDefaultVariant,
              },
              SECTIONS_PATH.NEW_ARRIVALS,
              selectedCategory,
              this.state.selectedTemplate,
              "NewArrivals"
            )} */}

            {/* <section className="container ds-mb-40 ds-mb-md-80 ds-mb-lg-104">
              {this.state.banners.length > 0 &&
                this.state.bannerPosition2 &&
                this.state.bannerPosition2.attributes.images != null && (
                  <div className="banner-single">
                    <img
                      src={
                        this.state.bannerPosition2.attributes.images.data[0]
                          .attributes.url
                      }
                      style={
                        this.state.bannerPosition2.attributes.images.data[0]
                          .attributes.url_link
                          ? { cursor: "pointer" }
                          : { cursor: "default" }
                      }
                      alt="Card image cap"
                      onClick={() => {
                        //@ts-ignore
                        this.state.bannerPosition2.attributes.images.data[0]
                          .attributes.url_link &&
                          window.location.replace(
                            this.state.bannerPosition2.attributes.images.data[0]
                              .attributes.url_link
                          );
                      }}
                    />
                  </div>
                )}
            </section> */}
            {/* {this.state.selectedTemplate &&
              templates[this.state.selectedTemplate] &&
              selectedTrendingProducts &&
              dynamicComponentLoad(
                {
                  collection: this.state.featuredProduct,
                  name: "Trending Products",
                  onViewMore: () => {
                    localStorage.setItem("newest", "Recommended");
                    //@ts-ignore
                    this.props?.history?.push(
                      `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=sold&sort[direction]=desc`
                    );
                  },
                  disablePropertyName: "isrcmdCollectionPrevButtonActive",
                  isrcmdCollectionPrevButtonActive:
                    this.state.isrcmdCollectionPrevButtonActive,
                  setPrvsButtonDisabled: (carousel) => {
                    setTimeout(() => {
                      this.setState({
                        isrcmdCollectionPrevButtonActive:
                          carousel?.current?.state.activePage != 0,
                      });
                    }, 500);
                  },
                  addToCart: this.addToCart,
                  createWishlist: this.postWishlist,
                  deleteWishlist: this.delWishlist,
                  toSetDefaultVariant: this.toSetDefaultVariant,
                },
                SECTIONS_PATH.TRENDINGPRODUCTS,
                selectedTrendingProducts,
                this.state.selectedTemplate,
                "TrendingProducts"
              )} */}
            {/* <section className="container ds-mb-40 ds-mb-md-80 ds-mb-lg-104">
              {this.state.banners.length > 0 &&
                this.state.bannerPosition4 &&
                this.state.bannerPosition4.attributes.images != null && (
                  <div className="banner-single">
                    <img
                      src={
                        this.state.bannerPosition4.attributes.images.data[0]
                          .attributes.url
                      }
                      style={
                        this.state.bannerPosition4.attributes.images.data[0]
                          .attributes.url_link
                          ? { cursor: "pointer" }
                          : { cursor: "default" }
                      }
                      alt="Card image cap"
                      onClick={() => {
                        //@ts-ignore
                        this.state.bannerPosition4.attributes.images.data[0]
                          .attributes.url_link &&
                          window.location.replace(
                            this.state.bannerPosition4.attributes.images.data[0]
                              .attributes.url_link
                          );
                      }}
                    />
                  </div>
                )}
            </section> */}
          </>
        // )}
      // </>
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
