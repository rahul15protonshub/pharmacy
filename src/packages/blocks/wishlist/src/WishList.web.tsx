//@ts-ignore
import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";

// @ts-ignore
import content from "../../studio-store-ecommerce-components/src/content.js";
import "../assets/styles/wishlist.scoped.css";
import "../assets/styles/wishlist-modal.css";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";
import WishListController, { Props } from "./WishListController.web";
// Customizable Area Start
// Customizable Area End

function FavouriteProductSet(props: any) {
  // Customizable Area Start
  return (
    <>
      {props.isFav ? (
        <FaHeart
          className="yt-sglproduct-fav active"
          color="red"
          style={{ cursor: "pointer" }}
          onClick={() => props.onClick()}
        />
      ) : (
        <FaRegHeart
          className="yt-sglproduct-fav"
          onClick={() => props.onClick()}
        />
      )}
    </>
  );
  // Customizable Area End
}

const WishlistRemoveModal = (props: any) => {
  // Customizable Area Start
  const { modal, toggle, confirm } = props;
  return (
    <div className="cm-main-modal-wrapper">
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="cm-small-modal-4"
        centered={true}
        modalClassName="popopop"
      >
        <ModalHeader
          toggle={toggle}
          className="remove-wh-lst-title-bar  border-0"
        >
          <span>Wishlist Item</span>
        </ModalHeader>
        <ModalBody className="py-4">
          <div className="text-center remove-wh-lst-body-text pt-4">
            The Item has been removed from the wishlist.
          </div>
        </ModalBody>
        <ModalFooter className="remove-wh-lst-bottom-bar p-1 d-flex">
          <Button
            data-testid={"button-remove-confirm"}
            color="pp-remove-wh-lst-btn-modal p-3 pp-remove-wh-lst-btn-dark-grey"
            onClick={confirm}
            block
          >
            Okay
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
  // Customizable Area End
};

export class WishList extends WishListController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  render() {
    // Customizable Area Start
    return (
      <>
        {this.state.loading && <Loader loading={this.state.loading} />}
        {this.state.showModal && (
          <WishlistRemoveModal
            // @ts-ignore
            confirm={this.onHandleConfirm}
            toggle={this.toggleModal}
            bodyMessage="Are you sure to remove this product from wishlist ?"
            modal={this.state.showModal}
          />
        )}

        <div className="profile-pg-whish-lt-inner-wrap profile-pg-inner-wrap bg-white radius-10 profile-pg-mb-30 profile-p-30">
          <div className="profile-pg-inner-wrapper">
            <div className="profile-tab-content">
              <div className="profile-pg-wl-allproduct-main-wrap">
                <Row className="profile-pg-wl-cm-row-margin">
                  {this.props.productList &&
                    this.props.productList.map((product: any, index: any) => {
                      const productData: any =
                        product?.data?.attributes?.id?.data?.attributes;
                      const productID = product?.data?.attributes?.id?.data?.id;
                      const productWishlIstData: any = product?.data?.attributes
                        ?.catalogue_variant?.data
                        ? product?.data?.attributes?.catalogue_variant?.data
                        : product?.data?.attributes?.id?.data;
                      let catalogue_variant_in_stock: any;
                      if (productWishlIstData) {
                        if (productWishlIstData?.attributes?.default_variant) {
                          catalogue_variant_in_stock =
                            productWishlIstData &&
                            productWishlIstData.attributes &&
                            productWishlIstData.attributes.stock_qty > 0
                              ? productWishlIstData?.attributes?.default_variant
                                  ?.stock_qty > 0
                                ? productWishlIstData?.attributes?.catalogue_variants.filter(
                                    (variant: any, index: any) => {
                                      return (
                                        variant.id ==
                                        parseInt(
                                          productWishlIstData?.attributes
                                            ?.default_variant?.id
                                        )
                                      );
                                    }
                                  )[0]
                                : productWishlIstData?.attributes?.catalogue_variants.filter(
                                    (variant: any, index: any) => {
                                      return variant.attributes.stock_qty > 0;
                                    }
                                  )[0]
                              : productWishlIstData?.attributes
                                  ?.catalogue_variants[0];
                        } else {
                          catalogue_variant_in_stock = productWishlIstData;
                        }

                        return (
                          <Fragment key={index}>
                            <Col
                              md={6}
                              lg={4}
                              className="px-2 col-xxl-4 yt-cm-wl-col"
                            >
                              <div className="product profile-pg-wl-sgl-product-cpnt text-center mb-4">
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                  {catalogue_variant_in_stock?.attributes
                                    ?.on_sale && (
                                    <div className="yt-product-off text-center p-1">
                                      {parseInt(productData?.discount)}
                                      {content.productCard.off}
                                    </div>
                                  )}
                                  {productData.on_sale && false ? (
                                    <div className="profile-yt-sgl-product-off text-center p-1">
                                      {content.sale}
                                    </div>
                                  ) : (
                                    <div className="text-center p-1" />
                                  )}
                                  <div className="text-right text-right-wishlist pr-2">
                                    <FavouriteProductSet
                                      data-testid={
                                        "button-favorite-product-set"
                                      }
                                      onDataId={index}
                                      onPageType="shop"
                                      isFav={productData.wishlisted || true}
                                      onClick={() => {
                                        if (
                                          product?.data?.attributes
                                            ?.catalogue_variant?.data
                                        ) {
                                          this.setState({
                                            removeData:
                                              product?.data?.attributes?.id
                                                ?.data?.attributes?.id,
                                            isVaraintId:
                                              catalogue_variant_in_stock.id,
                                          });
                                        } else {
                                          this.setState({
                                            removeData:
                                              product?.data?.attributes?.id
                                                ?.data?.attributes?.id,
                                            // isVaraintId: catalogue_variant_in_stock.id,
                                          });
                                        }
                                        productData.wishlisted
                                          ? this.removeFromWishlist(product)
                                          : this.addToWishlist(product);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div
                                  data-testid={"button-product-details"}
                                  onClick={() => {
                                    setTimeout(() => {
                                      this.props.history.push(
                                        "/shop/" + productID
                                      );
                                    }, 500);
                                  }}
                                  className="w3-ripple product-details"
                                  style={{ cursor: "pointer" }}
                                >
                                  <img
                                    src={
                                      this.setImage(
                                        productWishlIstData?.attributes?.images
                                          ?.data
                                      )
                                      // productWishlIstData?.attributes.images
                                      //   ? productWishlIstData?.attributes.images
                                      //     .data[0].attributes.url
                                      //   : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
                                    }
                                    className="yt-product-bg-image img-fluid"
                                    // alt="ytrend"
                                    alt={
                                      catalogue_variant_in_stock?.attributes
                                        ?.name
                                    }
                                  />
                                  <div className="mt-3 profile-pg-wl-sgl-product-title text-center">
                                    {productData?.name}
                                  </div>

                                  <div className="price profile-pg-wl-sgl-price-wrap text-center ">
                                    {catalogue_variant_in_stock?.attributes
                                      ?.on_sale && (
                                      <>
                                        <span className="price1 profile-pg-wl-sgl-product-sale-price">
                                          {/* @ts-ignore  */}
                                          {
                                            JSON.parse(
                                              localStorage.getItem(
                                                "countryCode"
                                              ) || "{}"
                                            )?.countryCode
                                          }{" "}
                                          {
                                            catalogue_variant_in_stock
                                              ?.attributes?.sale_price
                                          }
                                        </span>
                                        <span className="price2 profile-pg-wl-sgl-product-reg-price2">
                                          {/* @ts-ignore  */}
                                          {
                                            JSON.parse(
                                              localStorage.getItem(
                                                "countryCode"
                                              ) || "{}"
                                            )?.countryCode
                                          }{" "}
                                          {
                                            catalogue_variant_in_stock
                                              ?.attributes?.price
                                          }
                                        </span>
                                      </>
                                    )}
                                    {!catalogue_variant_in_stock?.attributes
                                      ?.on_sale && (
                                      <span className="price1 profile-pg-wl-sgl-product-sale-price">
                                        {/* @ts-ignore  */}
                                        {
                                          JSON.parse(
                                            localStorage.getItem(
                                              "countryCode"
                                            ) || "{}"
                                          )?.countryCode
                                        }{" "}
                                        {
                                          catalogue_variant_in_stock.attributes
                                            ?.price
                                        }
                                        {/* {content.currency} {catalogue_variant_in_stock.attributes?.price} */}
                                      </span>
                                    )}
                                  </div>
                                  <div className="ratings">
                                    <span>
                                      {productData?.average_rating?.toFixed(1)}
                                      <IoIosStar className="rating-star-icon" />
                                      <span className="product-rating ">
                                        | {productData?.reviews.length}
                                      </span>
                                    </span>
                                  </div>
                                </div>

                                {productData.stock_qty > 0 &&
                                Object.keys(catalogue_variant_in_stock)
                                  .length !== 0 &&
                                catalogue_variant_in_stock?.attributes
                                  ?.stock_qty >= 1 ? (
                                  <Fragment>
                                    {Object.keys(productData?.cart_items)
                                      .length !== 0 ||
                                    catalogue_variant_in_stock?.attributes
                                      ?.cart_quantity >= 1 ? (
                                      Object.keys(
                                        productData?.cart_items
                                      ).filter(
                                        (keyName: any, keyIndex: any) => {
                                          return (
                                            parseInt(keyName) ==
                                            catalogue_variant_in_stock.id
                                          );
                                        }
                                      )[0] ||
                                      catalogue_variant_in_stock?.attributes
                                        ?.cart_quantity >= 1 ? (
                                        <Button
                                          // color="secondary button-cart"
                                          data-testid={"button-goto-cart"}
                                          color="secondary profile-pg-wl-sgl-product-add-btn buttoncart py-3"
                                          onClick={() => {
                                            localStorage.removeItem("buyNow");
                                            //@ts-ignore
                                            this.props?.history.push("/cart");
                                          }}
                                        >
                                          {content.goToCart}
                                        </Button>
                                      ) : (
                                        <Button
                                          data-testid={"button-addto-cart"}
                                          color="secondary profile-pg-wl-sgl-product-add-btn buttoncart py-3"
                                          onClick={() => {
                                            if (
                                              productData.default_variant ||
                                              productWishlIstData?.attributes
                                                ?.is_subscription_available
                                            ) {
                                              setTimeout(() => {
                                                this.props.history.push(
                                                  "/shop/" + productID
                                                );
                                              }, 500);
                                            } else {
                                              this.addToCart(
                                                catalogue_variant_in_stock
                                              );
                                            }
                                          }}
                                        >
                                          {content.addToCart}
                                        </Button>
                                      )
                                    ) : (
                                      <Button
                                        data-testid={
                                          "button-add-catalogue-variant"
                                        }
                                        color="secondary profile-pg-wl-sgl-product-add-btn buttoncart py-3"
                                        onClick={() => {
                                          if (
                                            productData.default_variant ||
                                            productWishlIstData?.attributes
                                              ?.is_subscription_available
                                          ) {
                                            setTimeout(() => {
                                              this.props.history.push(
                                                "/shop/" + productID
                                              );
                                            }, 500);
                                          } else {
                                            this.addToCart(
                                              catalogue_variant_in_stock
                                            );
                                          }
                                        }}
                                      >
                                        {content.addToCart}
                                      </Button>
                                    )}
                                  </Fragment>
                                ) : (
                                  <Button
                                    disabled
                                    color="secondary profile-pg-wl-sgl-product-add-btn buttoncart py-3"
                                  >
                                    {content.outOfStock}
                                  </Button>
                                )}
                              </div>
                            </Col>
                          </Fragment>
                        );
                      }

                      return product?.product_variants?.map(
                        (value: any, index: any) =>
                          value.is_master && (
                            <>
                              <Col
                                md={6}
                                lg={4}
                                className="px-2 col-xxl-4 yt-cm-wl-col"
                              >
                                <div className="product profile-pg-wl-sgl-product-cpnt text-center mb-4">
                                  <div className="d-flex justify-content-between align-items-center mt-3">
                                    {catalogue_variant_in_stock.attributes
                                      .on_sale && (
                                      <div className="yt-product-off text-center p-1">
                                        {`${Math.floor(
                                          catalogue_variant_in_stock.attributes
                                            ?.discount_price
                                        )}${content.productCard.off}`}
                                      </div>
                                    )}
                                    {value.on_sale && false ? (
                                      <div className="profile-yt-sgl-product-off text-center p-1">
                                        {content.sale}
                                      </div>
                                    ) : (
                                      <div className="text-center p-1" />
                                    )}
                                    <div className="text-right pr-2">
                                      <FavouriteProductSet
                                        onDataId={index}
                                        onPageType="shop"
                                        data-testid={
                                          "button-favorite-product-set"
                                        }
                                        isFav={product.is_wishlisted}
                                        onClick={() =>
                                          product.is_wishlisted
                                            ? this.removeFromWishlist(product)
                                            : this.addToWishlist(product)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div
                                    data-testid={"button-product-details"}
                                    onClick={() => {
                                      this.props.history.push(
                                        "/shop/" + value.id
                                      );
                                    }}
                                    className="w3-ripple"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <img
                                      src={
                                        value.images.length > 0
                                          ? value.images[0].image
                                          : product.images[0].image
                                      }
                                      className="yt-product-bg-image img-fluid"
                                      alt="image"
                                    />
                                    <div className="mt-3 profile-pg-wl-sgl-product-title text-center">
                                      {product.name}
                                    </div>

                                    <div className="price profile-pg-wl-sgl-price-wrap text-center ">
                                      {value.on_sale && (
                                        <>
                                          <span className="price1 profile-pg-wl-sgl-product-sale-price">
                                            {content.currency}{" "}
                                            {value.sale_price}
                                          </span>
                                          <span className="price2 profile-pg-wl-sgl-product-reg-price2">
                                            {content.currency}{" "}
                                            {value.actual_price}
                                          </span>
                                        </>
                                      )}
                                      {!value.on_sale && (
                                        <span className="price1 profile-pg-wl-sgl-product-sale-price">
                                          {content.currency}{" "}
                                          {value.actual_price}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  {value.stock_qty >= 1 &&
                                  value.current_availability === "in_stock" ? (
                                    <React.Fragment>
                                      {value.is_in_cart && (
                                        <Button
                                          data-testid={"button-goto-cart"}
                                          color="secondary profile-pg-wl-sgl-product-add-btn buttoncart py-3"
                                          onClick={() => {
                                            localStorage.removeItem("buyNow");
                                            //@ts-ignore
                                            this.props?.history.push("/cart");
                                          }}
                                        >
                                          {content.goToCart}
                                        </Button>
                                      )}
                                      {!value.is_in_cart && (
                                        <Button
                                          data-testid={"button-addto-cart"}
                                          color="secondary profile-pg-wl-sgl-product-add-btn buttoncart py-3"
                                        >
                                          {content.addToCart}
                                        </Button>
                                      )}
                                    </React.Fragment>
                                  ) : (
                                    <Button
                                      disabled
                                      color="secondary profile-pg-wl-sgl-product-add-btn buttoncart py-3"
                                    >
                                      {content.outOfStock}
                                    </Button>
                                  )}
                                </div>
                              </Col>
                            </>
                          )
                      );
                    })}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </>
    );
    // Customizable Area End
  }
}
// @ts-ignore
export default withRouter(WishList);
// Customizable Area Start
// Customizable Area End
