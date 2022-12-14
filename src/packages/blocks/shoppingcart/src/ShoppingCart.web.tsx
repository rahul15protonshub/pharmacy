import React, { Fragment, useState, useEffect } from "react";
import EmptyCartContent from "./EmptyCartContent.web";
import Ripple from "react-ripples";
import {
  Row,
  Col,
  Button,
  Table,
  Form,
  FormGroup,
} from "reactstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link, withRouter } from "react-router-dom";

//@ts-ignore
import content from "../../studio-store-ecommerce-components/src/content";
import ShoppingCartController, {
  Props,
  configJSON,
} from "./ShoppingCartController.web";
import "../assets/css/index.scoped.css";
import "../assets/css/modalAddressField.css";
import "../assets/css/index.css";
import { toast } from "react-toastify";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";
// Customizable Area Start
import { prescription } from "./assets";
// Customizable Area End

//// links to navigate hompage/////
export function CartBreadCrumbs() {
  // Customizable Area Start
  return (
    <div className="breaccurumcontainer">
      <Row>
        <Col md={12}>
          <div className="pageroute cart-pg-breadcrumbs my-3">
            <Link to="/home-page">
              <span
                className="cart-pg-home w3-hover-opacity"
                style={{ cursor: "pointer" }}
              >
                {content.home}
              </span>
            </Link>
            <img
              src={require("../assets/images/back-arrow.svg")}
              width="8"
              height="8"
              className="mx-2"
            />
            <span className="cart-pg-current">{content.cart}</span>
          </div>
        </Col>
      </Row>
    </div>
    // Customizable Area End
  );
}

///////cart listing//////
export function CartProduct(props: any) {
  // Customizable Area Start
  let variant: any;
  if (props.product?.attributes?.catalogue_variant) {
    variant = props.product?.attributes?.catalogue_variant.attributes;
  } else {
    variant = props.product?.attributes;
  }

  const index = props.index;

  return (
    variant && (
      <>
        {/* {props.loader && <Loader loading={props.loader} />} */}
        <div className="cart-produt-list-wrap radius-10 bg-white cart-pg-mb-30">
          {variant?.subscription_package != null &&
            (variant?.subscription_discount ? (
              <div className="subscription-tag text-center p-1">
                SUBSCRIPTION {`${variant?.subscription_discount}%`}
              </div>
            ) : (
              <div className="subscription-tag text-center p-1">
                SUBSCRIPTION
              </div>
            ))}
          <div className="d-flex flex-wrap cart-pg-product-list-row justify-content-between mt-2">
            <div
              className={`cart-pg-list-prdt-info d-flex justify-content-between ${
                props.product?.attributes?.catalogue.attributes.prescription
                  ? "cart-pg-list-prdt-res"
                  : ""
              }`}
            >
              <div className="cart-pg-list-image">
                <div
                  data-testid={"button-set-default-variant"}
                  className="cart-product Productct-image w3-ripple"
                  style={
                    Object.keys(
                      JSON.parse(localStorage.getItem("buyNow") || "{}")
                    ).length == 0
                      ? { cursor: "pointer" }
                      : { cursor: "default" }
                  }
                  onClick={() => {
                    if (props.product?.attributes?.catalogue_variant) {
                      //@ts-ignore
                      localStorage.setItem("catalogue_variant_id", variant?.id);
                    }
                    props.toSetdefaultVariant(index, variant.catalogue_id);
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    src={props.setDefaultImage(props.product?.attributes)}
                  />
                </div>
              </div>

              <div
                className="cart-prodict-info d-flex flex-column"
                style={{ cursor: "default" }}
              >
                <h2
                  data-testid={"button-set-default-variant"}
                  className="cart-product-title w3-ripple"
                  style={
                    Object.keys(
                      JSON.parse(localStorage.getItem("buyNow") || "{}")
                    ).length == 0
                      ? { cursor: "pointer" }
                      : { cursor: "default" }
                  }
                  onClick={() => {
                    if (
                      Object.keys(
                        JSON.parse(localStorage.getItem("buyNow") || "{}")
                      ).length == 0
                    ) {
                      //@ts-ignore
                      localStorage.setItem("catalogue_variant_id", variant?.id);
                      props.toSetdefaultVariant(index, variant.catalogue_id);
                    }
                  }}
                >
                  {props.product?.attributes?.catalogue.attributes.name}
                </h2>

                {variant?.catalogue_variant_properties &&
                  variant?.catalogue_variant_properties.length > 0 && (
                    <div className="cart-prodict-type-container">
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent:
                            variant.catalogue_variant_properties.length > 1
                              ? "space-between"
                              : "flex-start",
                        }}
                      >
                        {variant.catalogue_variant_properties.map(
                          (item: any, idx: any) => {
                            return (
                              props.product?.attributes?.catalogue_variant_id ==
                                item.attributes.catalogue_variant_id && (
                                <div key={idx} style={{ flexBasis: "40%" }}>
                                  <p
                                    className="product-feature-heading"
                                    style={{ marginBottom: "4px" }}
                                  >
                                    {item?.attributes?.variant_name}
                                  </p>
                                  <p className="product-feature-sub-heading">
                                    {item?.attributes?.property_name}
                                  </p>
                                </div>
                              )
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}

                {variant?.subscription_package != null && (
                  <>
                  <div className="sub-items subscription_period_text d-flex flex-column">
                    <div className="head">
                      {
                        ["9am to 12pm", "6am to 9am"].includes(variant?.preferred_delivery_slot)
                        ? `Morning (${variant?.preferred_delivery_slot
                          .replace(' to ', ' - ').replace(/am/g, 'AM').replace(/pm/g, 'PM')})`
                        : `Evening (${variant?.preferred_delivery_slot.replace(' to ', ' - ')
                        .replace(' to ', ' - ').replace(/am/g, 'AM').replace(/pm/g, 'PM')})`
                      }
                    </div>
                    <div className="sub-head text-capitalize">
                      {`Duration: ${variant.subscription_package} (${variant.subscription_period
                        } ${variant.subscription_period > 1 ? "Months" : "Month"})`}
                    </div>
                  </div>
                  <div>
                    <span
                      className="change subscription_changeBtn"
                      onClick={() =>
                        props.toSetdefaultVariant(index, variant.catalogue_id)
                      }
                    >
                      Change
                    </span>
                  </div>
                </>
                )}
                {variant?.catalogue_variant_properties &&
                variant?.catalogue_variant_properties.length > 0 ? (
                  <div
                    className={
                      !props.product?.attributes?.catalogue.attributes
                        .prescription
                        ? "priceBox"
                        : ""
                    }
                    style={{ marginTop: "auto" }}
                  >
                    <div className="product-feature-heading">
                      {/* @ts-ignore  */}
                      Price
                    </div>
                    <p className="cart-product-price">
                      {/* @ts-ignore  */}
                      {
                        JSON.parse(localStorage.getItem("countryCode") ?? "{}")
                          ?.countryCode
                      }{" "}
                      {variant.on_sale ? variant.sale_price : variant.price}
                    </p>
                  </div>
                ) : (
                  <div
                    className={
                      !props.product?.attributes?.catalogue.attributes
                        .prescription
                        ? "priceBox"
                        : ""
                    }
                    style={{ marginTop: "auto" }}
                  >
                    <div className="product-feature-heading">
                      {/* @ts-ignore  */}
                      Price
                    </div>
                    <p className="cart-product-price">
                      {/* @ts-ignore  */}
                      {
                        JSON.parse(localStorage.getItem("countryCode") ?? "{}")
                          .countryCode
                      }{" "}
                      {variant.product_on_sale
                        ? variant.product_sale_price
                        : variant.product_price}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {Object.keys(JSON.parse(localStorage.getItem("buyNow") || "{}"))
              .length == 0 && (
              <>
                <div className="cart-list-other-act">
                  <div className="cart-action">
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      className="wishlistBox"
                    >
                      <svg
                        width="17"
                        height="15"
                        viewBox="0 0 17 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.49991 13.6527L2.50741 7.40266C1.42728 6.32338 1.1596 4.67373 1.84303 3.30828C2.3528 2.28904 3.32141 1.57695 4.44632 1.39444C5.57122 1.21193 6.71529 1.58125 7.52116 2.38703L8.49991 3.36516L9.47866 2.38703C10.2845 1.58125 11.4286 1.21193 12.5535 1.39444C13.6784 1.57695 14.647 2.28904 15.1568 3.30828C15.8393 4.67315 15.5719 6.32159 14.493 7.40078L8.49991 13.6527Z"
                          fill="white"
                          stroke="#757575"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span
                        data-testid={"button-cart-item-move-to-wishlist"}
                        style={{ color: "#757575" }}
                        onClick={() => {
                          if (props.product?.attributes?.catalogue_variant) {
                            props.moveToWishlist(
                              variant.catalogue_id,
                              props.product?.attributes?.catalogue_variant_id
                            );
                          } else {
                            props.moveToWishlist(variant.catalogue_id, "");
                          }
                        }}
                      >
                        {content.MovetoWishlist}
                      </span>
                    </div>
                    <div
                      data-testid={"button-cart-item-remove"}
                      className="cart-product-delete"
                      onClick={() => {
                        if (props.product?.attributes.subscription_package) {
                          props.removingSubscriptionItem(
                            props.product?.attributes
                          );
                        } else {
                          if (props.product?.attributes?.catalogue_variant) {
                            props.deleteCartItem(
                              variant.catalogue_id,
                              props.product?.attributes?.catalogue_variant_id
                            );
                          } else {
                            props.deleteCartItem(variant.catalogue_id, "");
                          }
                        }
                        // @ts-ignore
                        // window.notify([
                        //   {
                        //     message: "Item deleted successfully.",
                        //     type: "success",
                        //   },
                        // ]);
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "4px",
                          alignItems: "center",
                        }}
                        className="deletecartitem"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.9375 2.8125H14.0625"
                            stroke="currentcolor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.90625 0.9375H6.09375C5.57598 0.9375 5.15625 1.35723 5.15625 1.875V2.8125H9.84375V1.875C9.84375 1.35723 9.42402 0.9375 8.90625 0.9375Z"
                            stroke="currentcolor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.09375 10.7812V6.09375"
                            stroke="currentcolor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.90625 10.7812V6.09375"
                            stroke="currentcolor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.7906 13.2025C11.7503 13.6886 11.344 14.0625 10.8562 14.0625H4.14438C3.65662 14.0625 3.25032 13.6886 3.21 13.2025L2.34375 2.8125H12.6562L11.7906 13.2025Z"
                            stroke="currentcolor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span>{content.remove}</span>
                      </div>
                    </div>
                  </div>
                  {props.product?.attributes?.catalogue.attributes
                    .prescription && (
                    <Fragment>
                      <div
                      className="d-flex align-items-center preCription presBox"
                      >
                        <div className="sp-verify-icn-wrap mx-2">
                          <img
                            src={prescription}
                            alt="verify"
                            className="img-fluid"
                            width="25"
                            height="25"
                          />
                        </div>
                        <p className="m-0 sp-prescription-tag-name">
                          Prescription needed
                        </p>
                      </div>
                    </Fragment>
                  )}
                </div>

                <div className="cart-action-wrap text-right">
                  <div
                    className={`${
                      !props.product?.attributes?.catalogue.attributes
                        .prescription
                        ? "cart-quantity-box-noPres"
                        : ""
                    } cart-quantity-box`}
                  >
                    <div className="cart-quantity-field">
                      <Form>
                        <FormGroup className="m-0">
                          <span className="cart-quantity-icn quantity-icn-left d-flex align-items-center p-2">
                            <FaMinus
                              className="cart-quantity-minus"
                              data-testid={"form-input-minus"}
                              onClick={() => {
                                let qty: any = props.product?.attributes
                                  .quantity
                                  ? props.product?.attributes.quantity
                                  : props.product?.attributes
                                      ?.subscription_quantity;
                                let isVarintId: any = props.product?.attributes
                                  .catalogue_variant_id
                                  ? props.product?.attributes
                                      .catalogue_variant_id
                                  : "";
                                if (
                                  qty - 1 <
                                  1
                                ) {
                                  //@ts-ignore
                                  window.notify([
                                    {
                                      message: `You can not set less than 1 quantity`,
                                      type: "warning",
                                    },
                                  ]);
                                } else {
                                  if (
                                    props.product?.attributes
                                      ?.subscription_quantity
                                  ) {
                                    props.updateitemQuantity(
                                      variant.catalogue_id,
                                      isVarintId,
                                      qty - 1,
                                      "subscription"
                                    );
                                  } else {
                                    props.updateitemQuantity(
                                      variant.catalogue_id,
                                      isVarintId,
                                      qty - 1
                                    );
                                  }
                                }
                              }}
                            />
                          </span>
                          <input
                            type="number"
                            className="form-control border-0"
                            id="cart-quantity-123"
                            value={
                              props.product?.attributes.quantity
                                ? props.product?.attributes.quantity
                                : props.product?.attributes
                                    ?.subscription_quantity
                            }
                          />
                          <span className="cart-quantity-icn quantity-icn-right d-flex align-items-center p-2">
                            <FaPlus
                              className="cart-quantity-plus"
                              data-testid={"form-input-plus"}
                              onClick={() => {
                                let qty: any = props.product?.attributes
                                  .quantity
                                  ? props.product?.attributes.quantity
                                  : props.product?.attributes
                                      ?.subscription_quantity;
                                let isVarintId: any = props.product?.attributes
                                  .catalogue_variant_id
                                  ? props.product?.attributes
                                      .catalogue_variant_id
                                  : "";
                                if (
                                  qty + 1 >
                                  variant.stock_qty
                                ) {
                                  //@ts-ignore
                                  window.notify([
                                    {
                                      message: `You can not add more than ${variant.stock_qty} quantity of this product`,
                                      type: "warning",
                                    },
                                  ]);
                                } else {
                                  //@ts-ignore
                                  // window.notify([
                                  //   {
                                  //     message: `You have this item in your cart and we have increased the quantity by 1"`,
                                  //     type: "success",
                                  //   },
                                  // ]);
                                  if (
                                    props.product?.attributes
                                      ?.subscription_quantity
                                  ) {
                                    props.updateitemQuantity(
                                      variant.catalogue_id,
                                      isVarintId,
                                      qty + 1,
                                      "subscription"
                                    );
                                  } else {
                                    props.updateitemQuantity(
                                      variant.catalogue_id,
                                      isVarintId,
                                      qty + 1
                                    );
                                  }
                                }
                              }}
                            />
                          </span>
                        </FormGroup>
                      </Form>
                    </div>
                  </div>
                </div>
              </>
            )}{" "}
          </div>
        </div>
      </>
    )
  );
  // Customizable Area End
}

///// cart Amount//////
export const CartAmount: any = withRouter((props: any) => {
  // Customizable Area Start
  const wholeCart = props.wholeCart;
  const [couponCode, setCouponCode] = useState(
    wholeCart?.coupon?.attributes?.code
  );

  function getProducts() {
    var items: any = [];
    wholeCart &&
      wholeCart.order_items.forEach((item: any, index: any) => {
        items.push(
          <tr key={index}>
            <td>
              <span className="cart-product-amount">
                {item.attributes.catalogue.attributes.name}
              </span>
            </td>
            <td style={{ textAlign: "center" }}>
              <span className="cart-product-amount">
                x
                {item.attributes.subscription_quantity
                  ? item.attributes.subscription_quantity
                  : item.attributes.quantity}
              </span>
            </td>
            <td style={{ textAlign: "right" }}>
              <span className="cart-product-amount">
                {/* @ts-ignore  */}
                {
                  JSON.parse(localStorage.getItem("countryCode") ?? "{}")
                    ?.countryCode
                }{" "}
                {parseFloat(item.attributes.total_price).toFixed(2)}
              </span>
            </td>
          </tr>
        );
      });

    return items;
    // Customizable Area End
  }

  //cart Submition handling for Guest and Normal User
  const proceedToCheckoutForm = () => {
    // Customizable Area Start
    const GuestUserUUId = localStorage.getItem("guestUUID");
    const GuestUserData = localStorage.getItem("guestUserData");
    const normalUserData = localStorage.getItem("userData");
    if (GuestUserData && GuestUserUUId && normalUserData == null) {
      props.history.push({
        pathname: "/",
        state: { calledFrom: "cart" },
      });
    } else {
      //@ts-ignore
      localStorage.removeItem("catalogue_variant_id");
      props?.history?.push("./checkout");
    }
  };

  return (
    wholeCart && (
      <div className="cart-price-container">
        <div className="radius-10 bg-white yt-cart-price-lister">
          <div style={{ marginBottom: "1rem" }}>
            <p className="summaryHeading">Order Summary</p>
          </div>
          <Table className="mb-0 cart-prodict-amount " borderless>
            <thead>
              <tr>
                <th>Product</th>
                <th className="qty-cls" style={{ textAlign: "center" }}>
                  {content.qty}
                </th>
                <th>{content.amount}</th>
              </tr>
            </thead>
            <tbody>{getProducts()}</tbody>
          </Table>
          <span className="cart-divider" />
         
          <Table className="yt-sub-ttl-tbl-wrap">
            <tbody>
              <tr>
                <td style={{ paddingLeft: 0 }}>
                  <span className="cart-product-amount">
                    {content.SubTotal}(Inclusive Taxes)
                  </span>
                </td>
                <td style={{ paddingRight: 0, textAlign: "right" }}>
                  <span className="cart-product-amount cart-sub-total">
                    {/* @ts-ignore  */}
                    {
                      JSON.parse(localStorage.getItem("countryCode") ?? "{}")
                        ?.countryCode
                    }{" "}
                    {parseFloat(wholeCart.sub_total).toFixed(2)}
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>
          {wholeCart.sub_discounted_total_price ?
            <Table className="yt-sub-ttl-tbl-wrap">
              <tbody>
                <tr>
                  <td style={{ paddingLeft: 0 }}>
                    <span className="cart-product-amount">
                      Subscription Discount
                    </span>
                  </td>
                  <td style={{ paddingRight: 0, textAlign: "right" }}>
                    <span className="cart-product-amount cart-sub-total">
                      {/* @ts-ignore  */}-{" "} 
                      {
                        JSON.parse(localStorage.getItem("countryCode") ?? "{}")
                          ?.countryCode
                      }{" "}
                      {parseFloat(wholeCart.sub_discounted_total_price).toFixed(2)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </Table>
            : ''
          }
          <Table className="mb-0 cart-prodict-total-amount " borderless>
            <tbody>
              
              <tr>
                <td>
                  <span className="cart-product-amount">
                    {content.DeliveryCharges}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <span className="cart-product-amount">
                    {/* @ts-ignore  */}+{" "}
                    {
                      JSON.parse(localStorage.getItem("countryCode") ?? "{}")
                        ?.countryCode
                    }{" "}
                    {wholeCart.shipping_total != null
                      ? wholeCart.shipping_total
                      : 0.0}
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>
          <span className="cart-divider" />
          {/* coupon */}
          {Object.keys(JSON.parse(localStorage.getItem("buyNow") || "{}"))
            .length == 0 && (
            <div style={{ marginBottom: 0 }} className="cart-coupon mt-3">
              <Form className="yt-cart-disct-wrap">
                <FormGroup
                  className={
                    "m-0 " + "success"
                  }
                >
                  <input
                    data-testid={"input-cart-coupon"}
                    type="text"
                    className="form-control"
                    id="cart-total-products-amount"
                    placeholder="Enter your promotion code"
                    //@ts-ignore
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      props.changeCouponCode(false);
                    }}
                    disabled={wholeCart.coupon_code_id != null}
                  />

                  <div className="pb-3 d-flex align-items-center cart-coupon-bottom-wrapper justify-content-between">
                    {wholeCart.coupon_code_id != null && (
                      <span
                        className="cart-coupon-code-message success-message"
                        style={{ color: "#43b7a7", display: "block" }}
                      >
                        {content.couponApplied}
                      </span>
                    )}
                    {props.couponCodeError ? (
                      <span style={{ fontSize: "14px", color: "red" }}>
                        Please enter promotion code.
                      </span>
                    ) : null}
                    <span className="cart-coupon-code-message error-message">
                      Coupon code can't be empty
                      {/* {codeError} */}
                    </span>
                    {wholeCart.coupon_code_id != null && (
                      <Button
                        color="link cart-coupon-change-btn p-0"
                        onClick={() => {
                          props.deleteCoupon();
                        }}
                        className="remove-coupon-btn"
                      >
                        {content.removeCoupon}
                      </Button>
                    )}
                  </div>

                  <Button
                    data-testid={"button-apply-coupon"}
                    color="secondary cart-coupon-btn"
                    onClick={() => {
                      props.toApplyCoupon(couponCode, wholeCart.sub_total);
                      //@ts-ignore
                    }}
                    disabled={
                      couponCode === "" ||
                      couponCode === undefined ||
                      wholeCart.coupon_code_id != null ||
                      props.couponCodeError
                    }
                  >
                    {content.apply}
                  </Button>
                </FormGroup>
              </Form>
              {wholeCart.coupon_code_id != null && (
                <div>
                  <Table
                    className="mb-0 cart-prodict-total-amount "
                    borderless
                    style={{ marginTop: "2rem" }}
                  >
                    <tbody>
                      <tr>
                        <td>
                          <span className="cart-product-amount-ttl">
                          Coupon Discount
                          </span>
                        </td>
                        <td>
                          <span className="cart-product-amount-price">
                            <span
                              className="deletecartitem"
                              style={{ marginRight: "10px", cursor: "pointer" }}
                              onClick={() => {
                                props.deleteCoupon();
                              }}
                            >
                              <svg
                                width="11"
                                height="12"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.9375 2.8125H14.0625"
                                  stroke="currentcolor"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M8.90625 0.9375H6.09375C5.57598 0.9375 5.15625 1.35723 5.15625 1.875V2.8125H9.84375V1.875C9.84375 1.35723 9.42402 0.9375 8.90625 0.9375Z"
                                  stroke="currentcolor"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M6.09375 10.7812V6.09375"
                                  stroke="currentcolor"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M8.90625 10.7812V6.09375"
                                  stroke="currentcolor"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M11.7906 13.2025C11.7503 13.6886 11.344 14.0625 10.8562 14.0625H4.14438C3.65662 14.0625 3.25032 13.6886 3.21 13.2025L2.34375 2.8125H12.6562L11.7906 13.2025Z"
                                  stroke="currentcolor"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </span>
                            {/* @ts-ignore  */}-{" "}
                            {
                              JSON.parse(
                                localStorage.getItem("countryCode") ?? "{}"
                              )?.countryCode
                            }{" "}
                            {parseFloat(wholeCart.applied_discount).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <span className="cart-divider" />
                </div>
              )}
            </div>
          )}
          <Table className="mb-0 cart-prodict-sub-total-amount " borderless>
            <tbody>
              <tr>
                <td>
                  <span
                    className="cart-product-total-amount"
                    style={{ color: "black" }}
                  >
                    {content.TotalAmount}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <span className="cart-product-total-amount cart-sub-total">
                    {/* @ts-ignore  */}+{" "}
                    {
                      JSON.parse(localStorage.getItem("countryCode") ?? "{}")
                        ?.countryCode
                    }{" "}
                    {parseFloat(wholeCart.total).toFixed(2)}
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="proceed-btn cart-proceed-btn">
          <Button
            style={{ width: "100%" }}
            data-testid={"button-proceed-checkout"}
            color="btn btn-secondary yt-login-btn btn-block"
            onClick={() => {
              proceedToCheckoutForm();
            }}
          >
            {content.proceed}
          </Button>
        </div>
      </div>
    )
  );
});

export const CartProductListData: any = withRouter((props: any) => {
  function getProducts() {
    var products: any = [];
    products = props.cart.map((item: any, idx: any) => {
      return (
        <CartProduct
          key={idx}
          index={idx}
          product={item}
          wholeCart={props.wholeCart}
          updateitemQuantity={props.updateitemQuantity}
          deleteCartItem={props.deleteCartItem}
          toSetdefaultVariant={props.toSetdefaultVariant}
          moveToWishlist={props.moveToWishlist}
          loader={props.loader}
          buyNowQuantity={props.buyNowQuantity}
          removingSubscriptionItem={props.removingSubscriptionItem}
          setDefaultImage={props.setDefaultImage}
        />
      );
    });
    return products;
  }

  return (
    <>
      <section className="cat-main-wrapper mb-4">
        <div className="cart-container">
          <Row style={{ display: "flex" }} className="yt-cm-row">
            <Col className="cart-product-container" lg={7} md={6} xs={12}>
              <Fragment>
                <Fragment>{getProducts()}</Fragment>
              </Fragment>
            </Col>
            <Col className="cart-price-container1" lg={5} md={6} xs={12}>
              <CartAmount
                wholeCart={props.wholeCart}
                toApplyCoupon={props.toApplyCoupon}
                couponSuccess={props.couponSuccess}
                deleteCoupon={props.deleteCoupon}
                couponCodeError={props.couponCodeError}
                changeCouponCode={props.changeCouponCode}
              />
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
  // Customizable Area End
});

//// main class component
export default class Cart extends ShoppingCartController {
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
      <section style={{ width: "93%", margin: "0 auto" }}>
        {this.state.loading ? (
          <Loader loading={this.state.loading} />
        ) : (
          <>
            {<CartBreadCrumbs />}
            {this.state.cart && this.state.cart.length > 0 ? (
              <CartProductListData
                cart={this.state.cart}
                wholeCart={this.state.wholeCart}
                updateitemQuantity={this.putUpdateCartQuantity}
                deleteCartItem={this.deleteCartItem}
                toSetdefaultVariant={this.toSetdefaultVariant}
                moveToWishlist={this.moveToWishlist}
                toApplyCoupon={this.toApplyCoupon}
                couponSuccess={this.state.couponSuccess}
                deleteCoupon={this.deleteCoupon}
                loader={this.state.loading}
                buyNowQuantity={this.state.buyNowQuantity}
                removingSubscriptionItem={this.isRemovingSubscriptionItem}
                setDefaultImage={this.setDefaultImage}
                couponCodeError={this.state.couponCodeError}
                changeCouponCode={this.changeCouponCode}
                // uploadPrescription={this.postPrescriptionFile}
              />
            ) : (
              <EmptyCartContent />
            )}
          </>
        )}
      </section>
    );
    // Customizable Area End
  }
}

// Customizable Area End
//@ts-ignore
// export default withRouter(Cart);
// Customizable Area Start
// Customizable Area End
