// @ts-nocheck
import React from "react";
import DashboardController, { Props } from "./DashboardController.web";
import SimilarProductListCard from "../../studio-store-ecommerce-components/src/ProductCard/SimilarProductListCard";
import ProductImageWithSlider from "../../studio-store-ecommerce-components/src/ProductImageWithSlider";
import { withRouter } from "react-router-dom";
import content from "../../studio-store-ecommerce-components/src/content.js";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";
import ChoiceChips from "../../studio-store-ecommerce-components/src/ChoiceChips";
import CartQuantity from "../../studio-store-ecommerce-components/src/AddOrRemoveQuantity";
import NotifyModal from "../../studio-store-ecommerce-components/src/NotifyModal";
import { Container, Row, Col, Button, Card, CardBody } from "reactstrap";
import { FaStar } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { available } from "./assets";
import BreadCrumbs from "../../studio-store-ecommerce-components/src/BreadCrumbs";
import Scheduling from "../../scheduling/src/Scheduling.web";
import { debounce } from "../../studio-store-ecommerce-components/src/Utils";
import "../assets/css/productDetail.css";
import "../assets/css/index.css";
import "../assets/css/subscribeModal.css";

class ProductDetails extends DashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    const { params } = this.props.match;
    if (params && params.id) {
      this.setState(
        {
          catalogue_id: params.id,
        },
        () => {
          window.scrollTo(0, 0);
          this.getProductDetails();
          this.getIsCartCreated();
          this.getAllProductReview();
        }
      );
    }
    // Customizable Area Start
    // Customizable Area End
  }

  componentDidUpdate(prevProps) {
    const { params } = this.props.match;
    if (params && params.id !== prevProps.match.params.id) {
      this?.getProductDetails();
    }
  }

  renderToolSelector = () => {
    // Customizable Area Start
    const { selectedAttributes } = this.state;
    const product_attributes = this.getProductAttributes();
    if (product_attributes) {
      const attributes = Object?.keys(product_attributes).sort();
      return (
        <>
          {attributes.map((attribute, i) => {
            const selected = selectedAttributes[attribute]?.variant_property_id;
            const options = product_attributes[attribute].map((item) => ({
              ...item,
              label: item.name,
              value: item.variant_property_id,
              // disabled: this.isProductAttrDisabled(item)
            }));
            return (
              <div key={i} className="product-detail-price">
                <h5 className="text-dark-grey-2 mb-2 f-md text-capitalize">
                  {attribute}
                </h5>
                <ChoiceChips
                  options={options}
                  value={selected}
                  onClick={(item) => this?.onPressTool(item, attribute)}
                />
              </div>
            );
          })}
        </>
      );
    } else {
      return null;
    }
    // Customizable Area End
  };

  renderToolListSelector = (
    attributeData: any,
    attribute: any,
    isFromColor: boolean
  ) => {
    // Customizable Area Start
    return (
      <div>
        <ul className="mb-3 p-0 mt-2 list-style-none d-flex flex-wrap align-items-center justify-content-start">
          {attributeData?.map((item: any, index: number) =>
            this?.renderToolItem(item, attribute, isFromColor)
          )}
        </ul>
      </div>
    );
    // Customizable Area End
  };

  renderToolItem = (item: any, attribute: any, isFromColor: boolean) => {
    const { selectedAttributes } = this?.state;
    const isSelected =
      selectedAttributes[attribute] &&
      selectedAttributes[attribute]?.variant_property_id ===
        item?.variant_property_id
        ? true
        : false;
    return (
      <li className="mx-2">
        {item?.name && (
          <Button
            key={item?.id}
            onClick={() => this?.onPressTool(item, attribute)}
            className={`${
              isSelected ? "active" : ""
            } sp-size-details p-2 text-center`}
          >
            {!isFromColor && <p>{item?.name}</p>}
          </Button>
        )}
      </li>
    );
  };

  renderImages = (product: any) => {
    // console?.log(this?.state?.currentImage, "this?.state?.currentImage", this?.state?.dashboardData)
    return (
      <ProductImageWithSlider
        images={
          this?.state?.selectedProduct
            ? this?.state?.selectedProduct?.attributes?.images?.data
            : product && this?.state?.productDetails?.attributes?.images?.data
        }
        currentImage={this?.state?.currentImage}
        imageSlider={this?.imageSlider}
      />
    );
  };

  handleCartQuantityChange = (itemQuantity) => {
    const { catalogue_id, selectedProduct } = this.state;
    this.setState({ itemQuantity }, () => {
      let itemAddedToCart = this.isItemAddedToCart(selectedProduct?.id);
      if (itemAddedToCart) {
        this.debounceCartQuanityChange(catalogue_id, selectedProduct?.id);
      }
    });
  };

  debounceCartQuanityChange = debounce(this.putUpdateCartQuantity);

  render() {
    // Customizable Area Start
    const {
      productDetails,
      selectedProduct,
      itemQuantity,
      productDescriptionLoader,
      default_variant,
      currentImage,
      catalogue_id,
      isProductAvailable,
      notifyModelOpen,
    } = this.state;

    const { history } = this.props;

    const product = default_variant?.attributes;

    //Enable qty increase for Cart Products end
    let quantity: any;
    if (
      productDetails?.attributes?.cart_items &&
      Object?.keys(this?.state?.productDetails?.attributes?.cart_items)
        ?.length > 0
    ) {
      quantity = true;
    } else if (this?.state?.productDetails?.attributes?.cart_quantity) {
      quantity = true;
    }
    //Enable qty increase for Cart Products end

    //Price showing Dynamically start
    const stock_qty = selectedProduct
      ? selectedProduct?.attributes?.stock_qty
      : product?.stock_qty;
    let productOnSale: any = selectedProduct
      ? selectedProduct?.attributes?.on_sale
      : product?.on_sale;
    let productPrice: any = selectedProduct
      ? productOnSale
        ? selectedProduct?.attributes?.actual_price_including_tax
        : selectedProduct?.attributes?.price_including_tax
      : productOnSale
      ? product?.actual_price_including_tax
      : product?.price_including_tax;
    let productSlaeprice: any = selectedProduct
      ? selectedProduct?.attributes?.price_including_tax
      : product?.price_including_tax;
    //Price showing Dynamically End

    //Button Dynamic Rendering start

    const isInCart = this.isItemAddedToCart(selectedProduct?.id);
    const isSubscribed = this.isItemAddedToCart(selectedProduct?.id, true);
    const isNotifyProduct =
      selectedProduct?.attributes?.is_notify_product ||
      productDetails?.attributes?.is_notify_product;
    //Button Dynamic Rendering

    let breadcrumbs = [
      {
        label: content.home,
        link: "/home-page",
      },
      {
        label: content.shop,
        link: `/Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=`,
      },
      {
        label: productDetails?.attributes?.name,
      },
    ];

    let countryCode = JSON.parse(localStorage.getItem("countryCode"));
    localStorage.removeItem("buyNow");
    return (
      <section className="product-container">
        {(productDescriptionLoader || !productDetails) && (
          <Loader loading={productDescriptionLoader || !productDetails} />
        )}
        {productDetails && (
          <Container className="">
            <BreadCrumbs list={breadcrumbs} />
            <Col sm="12" className="mb-4">
              <Card className="border-0 shadow-sm">
                <CardBody className="bg-white product-wrapper rounded">
                  <Container fluid>
                    <Row className="gx-lg-109 gx-md-40">
                      <Col sm="12" md="5" xl="auto">
                        <div className="product-left-content">
                          <div className="product-image mb-5 d-flex">
                            <ProductImageWithSlider
                              images={
                                selectedProduct
                                  ? selectedProduct?.attributes?.images?.data
                                  : productDetails?.attributes?.images?.data
                              }
                              currentImage={currentImage}
                              imageSlider={this?.imageSlider}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col sm="12" md="" xl="" className="ms-md-4">
                        <div className="product-detail vstack gap-3 mb-4 product-right-content">
                          <div className="product-detail-heading">
                            <h4 className="d-flex align-items-center">
                              <span>{productDetails?.attributes?.name}</span>
                              &nbsp; &nbsp;
                              <a
                                href="javascript:void(0)"
                                onClick={() =>
                                  productDetails?.attributes?.wishlisted
                                    ? this.delWishlist(catalogue_id)
                                    : this.postWishlist(catalogue_id)
                                }
                                className="cursor-pointer"
                              >
                                {productDetails?.attributes?.wishlisted ? (
                                  <svg
                                    className="wishlist-fill-icon"
                                    width="21"
                                    height="21"
                                    viewBox="0 0 24 24"
                                    fill="#fff"
                                    stroke="#8899A4"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                  </svg>
                                ) : (
                                  <svg
                                    className="wishlist-stroke-icon"
                                    width="21"
                                    height="21"
                                    viewBox="0 0 24 24"
                                    fill="#fff"
                                    stroke="#8899A4"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                  </svg>
                                )}
                              </a>
                            </h4>
                            <div className="product-detail-rating d-flex align-items-center">
                              <div className="f-14 d-flex align-items-center font-weight-light">
                                <span className="f-sm fw-light">
                                  {productDetails?.attributes?.average_rating?.toFixed(
                                    1
                                  )}
                                </span>
                                &nbsp;
                                <FaStar />
                              </div>
                              <div class="vr mx-2" />
                              <div className="f-14 d-flex align-items-center font-weight-light">
                                <span className="f-sm fw-light">
                                  {productDetails?.attributes?.reviews?.length}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="product-detail-price">
                            <h5 className="text-dark-grey-2 mb-2 f-md">
                              Price
                            </h5>
                            {stock_qty > 0 ? (
                              <div className="d-flex align-items-center">
                                <h5 className="f-md d-flex align-items-center fw-light">
                                  <span>
                                    {countryCode?.countryCode}{" "}
                                    {parseFloat(productPrice)?.toFixed(2)}
                                  </span>
                                  &nbsp; &nbsp;
                                  <img
                                    src={available}
                                    alt="verify"
                                    className="img-fluid"
                                  />
                                  &nbsp;
                                  <span className="m-0 text-capitalize">
                                    In stock online
                                  </span>
                                </h5>
                              </div>
                            ) : (
                              <div className="d-flex align-items-center out-of-stock-desc">
                                <IoIosCloseCircleOutline className="f-md" />
                                &nbsp;
                                <p className="m-0 text-capitalize out-of-stock-desc">
                                  {content?.soldOut}
                                </p>
                              </div>
                            )}
                          </div>
                          {this.renderToolSelector()}
                        </div>
                        <div className="mb-5">
                          <h5 className="text-dark-grey-2 mb-2 f-md">
                            Quantity
                          </h5>
                          <CartQuantity
                            value={itemQuantity}
                            onChange={this.handleCartQuantityChange}
                            max={stock_qty}
                            disabled={!isProductAvailable}
                          />
                        </div>
                        <>
                          {!stock_qty ? (
                            isNotifyProduct ? (
                              content?.willNotify
                            ) : (
                              <div class="d-grid gap-3 product-btn-group">
                                {/* <p className="product-stock-message mb-0">{content?.itemOutOfStock}</p> */}
                                <button
                                  type="button"
                                  class="btn btn-outline-primary-1"
                                  onClick={() => {
                                    this?.postNotifyMe(
                                      selectedProduct
                                        ? selectedProduct?.attributes?.id
                                        : productDetails?.id
                                    );
                                  }}
                                >
                                  {content?.notifyMe}
                                </button>
                              </div>
                            )
                          ) : (
                            <>
                              <div class="d-grid gap-3 product-btn-group">
                                <Button
                                  className="product-btns"
                                  type="button"
                                  color="primary-1"
                                  disabled={!isProductAvailable}
                                  outline={true}
                                  onClick={() => {
                                    if (!isInCart) {
                                      this?.addToCart(product);
                                    } else {
                                      localStorage?.removeItem("buyNow");
                                      //@ts-ignore
                                      history?.push("/cart");
                                    }
                                  }}
                                >
                                  {!isInCart
                                    ? content?.addToCart
                                    : content?.goToCart}
                                </Button>
                                {productDetails?.attributes
                                  ?.is_subscription_available && (
                                  <Button
                                    className="product-btns"
                                    type="button"
                                    color="primary-1"
                                    onClick={this.toggleSubscribe}
                                  >
                                    {isSubscribed
                                      ? content?.subscribed
                                      : content?.subscribe}
                                  </Button>
                                )}
                                <Button
                                  className="product-btns"
                                  type="button"
                                  color="primary-1"
                                  disabled={!isProductAvailable}
                                  onClick={() => {
                                    this?.setState({
                                      catalogue_id: productDetails?.attributes
                                        ?.default_variant
                                        ? product?.catalogue_id
                                        : productDetails?.id,
                                    });
                                    this?.onPressBuyNow();
                                    //@ts-ignore
                                    history?.push("/cart");
                                  }}
                                >
                                  {content?.buyNow}
                                </Button>
                              </div>
                              <div>
                                {productDetails?.attributes?.description && (
                                  <>
                                    <h5 className="d-flex align-items-center text-dark-grey-2 f-md product-desc">
                                      Description
                                    </h5>
                                    <p
                                      className="f-md"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          productDetails?.attributes
                                            ?.description,
                                      }}
                                    />
                                  </>
                                )}
                              </div>
                            </>
                          )}
                        </>
                        <NotifyModal
                          show={notifyModelOpen}
                          toggle={this?.handleNotifyProductClose}
                          heading={`We’ll notify you!`}
                          desc={`We have received your request, as soon as this product is back on stock we’ll send you an email`}
                        />
                        <Scheduling
                          productDetails={productDetails}
                          isSubscribed={isSubscribed}
                          isSubscribeClicked={this?.state?.isSubscribeClicked}
                          productSlaeprice={productSlaeprice}
                          productOnSale={productOnSale}
                          ProductPrice={productPrice}
                          toggleSubscribe={this?.toggleSubscribe}
                          addToCartWithSubscription={
                            this?.addToCartWithSubscription
                          }
                        />
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
            {product &&
              this?.state?.productDetails?.attributes?.similar_products?.data
                ?.length > 0 && (
                <Col sm="12" className="mb-4">
                  <Card className="border-0 shadow-sm bg-white rounded py-5">
                    {this?.state?.productDetails?.attributes?.similar_products
                      ?.data && (
                      <>
                        <h4 className="similar-product-heading mb-4">
                          Similar Products
                        </h4>
                        <SimilarProductListCard
                          collection={
                            this?.state?.productDetails?.attributes
                              ?.similar_products?.data
                          }
                          onViewMore={() =>
                            //@ts-ignore
                            this?.props?.history?.push("/Filteroptions")
                          }
                          addToCart={this?.addToCart}
                          createWishlist={this?.postWishlist}
                          deleteWishlist={this?.delWishlist}
                          toSetDefaultVariant={this?.toSetDefaultVariant}
                          defaultCarousel={false}
                        />
                      </>
                    )}
                  </Card>
                </Col>
              )}
          </Container>
        )}
      </section>
      // Customizable Area End
    );
  }
  // Customizable Area Start
  // Customizable Area End
}

const ProductDetailClass: any = withRouter(ProductDetails);
export default ProductDetailClass;
export { ProductDetails };
// Customizable Area Start
// Customizable Area End
