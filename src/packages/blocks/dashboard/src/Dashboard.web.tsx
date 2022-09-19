// @ts-nocheck
import React from "react";

import DashboardController, { Props } from "./DashboardController.web";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";
// Customizable Area Start
import { setTimeout } from "timers";
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
    // let carousel = React.createRef();
    // let Breakpoints = [
    //   { width: 200, itemsToShow: 2, itemsToScroll: 2 },
    //   { width: 320, itemsToShow: 2, itemsToScroll: 2 },
    //   { width: 500, itemsToShow: 3, itemsToScroll: 1 },
    //   { width: 769, itemsToShow: 5, itemsToScroll: 2 },
    //   { width: 1000, itemsToShow: 6, itemsToScroll: 2 },
    //   { width: 1300, itemsToShow: 7, itemsToScroll: 3 },
    // ];
    // let BreakpointsForCollection = [
    //   { width: 1, itemsToShow: 2.5 },
    //   { width: 500, itemsToShow: 3.5 },
    //   { width: 1000, itemsToShow: 4 },
    // ];
    // const banner_one =
    //   this.state.banners.length > 1 &&
    //   this.state.banners[0].attributes.images.data[0].attributes.url;
    // localStorage.removeItem("newest");
    // const selectedBanner =
    //   this.state.selectedTemplate &&
    //   templates[this.state.selectedTemplate].find(
    //     (temp) => temp.sectionName === "headerBanner"
    //   );
    return (
      <>
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
                toggleOurProducts={this.toggeProduct}
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
                isProductAddtoCart={this.state.isProductAddtoCart}
              />
            </Col>
          </Row>
          <div className="home-layout__backdrop" onClick={this.toggeProduct}></div>
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


