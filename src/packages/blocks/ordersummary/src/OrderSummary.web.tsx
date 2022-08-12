//@ts-nocheck;
import React, { Fragment, useState } from "react";
// Customizable Area Start
import {
  Container,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Alert,
  Table,
  CardBody,
} from "reactstrap";
import Ripple from "react-ripples";
import "../assets/css/order-summary.css";
import "../assets/css/index.scoped.css";
// Customizable Area End
import { Link, withRouter } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import OrderSummaryWebController, { Props } from "./OrderSummaryController.web";
import StripePayments from "../../payments/src/Stripe.web";
// @ts-ignore
import content from "../../studio-store-ecommerce-components/src/content";
//@ts-ignore
import lowerCase from "lodash/lowerCase";
import Card from "../../studio-store-ecommerce-components/src/Card";
import BreadCrumbs from "../../studio-store-ecommerce-components/src/BreadCrumbs";
import Checkbox from "../../studio-store-ecommerce-components/src/UI/Checkbox";
import Radio from "../../studio-store-ecommerce-components/src/UI/Radio";

///// cart Amount//////
const CartAmount: any = withRouter((props: any) => {
  // Customizable Area Start
  const wholeCart = props.wholeCart;

  const [couponCode, setCouponCode] = useState(
    wholeCart?.coupon?.attributes?.code
  );
  const [accordianOpen, setAccordianOpen] = useState("");
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
            <td>
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
                {/* {content.inr} {item.attributes.total_price} */}
              </span>
            </td>
          </tr>
        );
      });

    return items;
    // Customizable Area End
  }

  return (
    wholeCart && (
      <div className="cart-price-container">
        <div className="radius-10 bg-white yt-cart-price-lister">
          <div className="order-summary-container">
            <div style={{ flex: 1 }} className="summaryHeading">
              Order Summary
            </div>
            <div
              onClick={() => {
                accordianOpen !== ""
                  ? setAccordianOpen("")
                  : setAccordianOpen("accordian-panel-show");
              }}
              className="accordian-icon"
            >
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 1.5L7.25911 6.39955C7.19042 6.46386 7.09721 6.5 7 6.5C6.90279 6.5 6.80958 6.46386 6.74089 6.39955L1.5 1.5"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {/* <FaLongArrowAltDown  /> */}
            </div>
          </div>
          <div className={`accordian-panel ${accordianOpen}`}>
            <Table className="mb-0 cart-prodict-amount " borderless>
              <thead>
                <tr>
                  <th>{content.product}</th>
                  <th>{content.qty}</th>
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
                      {content.SubTotal}
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
                      {/* {content.inr} {wholeCart.sub_total} */}
                    </span>
                  </td>
                </tr>
              </tbody>
            </Table>

            <Table className="mb-0 cart-prodict-total-amount " borderless>
              <tbody>
                <tr>
                  <td>
                    <span className="cart-product-amount">{content.taxes}</span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span className="cart-product-amount">
                      {/* @ts-ignore  */}
                      {
                        JSON.parse(localStorage.getItem("countryCode") ?? "{}")
                          ?.countryCode
                      }{" "}
                      {parseFloat(wholeCart.total_tax).toFixed(2)}
                      {/* + {content.inr} {wholeCart.total_tax} */}
                    </span>
                  </td>
                </tr>
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
                      {/* + {content.inr} {wholeCart.shipping_total!= null? wholeCart.shipping_total: 0} */}
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
                      //(codeError || codeEmptyError ? "yt-form-cpn-err error" : "") +
                      //(cart.coupon && !codeError && !codeEmptyError ? "success" : "")
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
                      <span className="cart-coupon-code-message error-message">
                        Coupon code can't be empty
                        {/* {codeError} */}
                      </span>
                      {/* {cart.coupon && !enableInput)&& (
                    <Button
                      color="link cart-coupon-change-btn p-0"

                    >
                      Change Coupon
                    </Button>
                  )} */}
                      {wholeCart.coupon_code_id != null && (
                        <Button
                          color="link cart-coupon-change-btn p-0"
                          onClick={() => {
                            props.deleteCoupon();
                            setCouponCode("");
                          }}
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
                        couponCode == "" || wholeCart.coupon_code_id != null
                      }
                    >
                      {content.apply}
                    </Button>
                  </FormGroup>
                </Form>
                {wholeCart.coupon_code_id != null && (
                  <div>
                    <Table
                      className="mt-2 mb-0 cart-prodict-total-amount "
                      borderless
                    >
                      <tbody>
                        <tr>
                          <td>
                            <span className="cart-product-amount-ttl">
                              Discount
                            </span>
                          </td>
                          <td>
                            <span className="cart-product-amount-price">
                              {/* @ts-ignore  */}-{" "}
                              {
                                JSON.parse(
                                  localStorage.getItem("countryCode") ?? "{}"
                                )?.countryCode
                              }{" "}
                              {parseFloat(wholeCart.applied_discount).toFixed(
                                2
                              )}
                              {/* - {content.inr} {wholeCart.applied_discount} */}
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
                      {/* {content.inr} {parseInt(wholeCart.total).toFixed(2)} */}
                    </span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div className="proceed-btn checkoutbutton">
          {/* <Ripple style={{width}}> */}
          <Button
            style={{ width: "100%" }}
            data-testid={"button-proceed-checkout"}
            color="btn btn-secondary yt-login-btn btn-block"
            onClick={() => props.toggleIsOpen()}
          >
            {content.proceed}
          </Button>
          {/* </Ripple> */}
        </div>
      </div>
    )
  );
});

const CartProductListData: any = withRouter((props: any) => {
  function getProducts() {
    var products: any = [];
    products = props.cart.map((item: any, idx: any) => {});
  }

  return (
    <CartAmount
      wholeCart={props.wholeCart}
      toggleIsOpen={props.toggleIsOpen}
      toApplyCoupon={props.toApplyCoupon}
      couponSuccess={""}
      deleteCoupon={props.deleteCoupon}
    />
  );
});

// @ts-ignore
const PaymentModal = ({ onHandleCancel, onHandleConfirm, isOpen }) => {
  return (
    <Modal
      modalClassName="popopop"
      className="cm-small-modal-4"
      isOpen={isOpen}
      toggle={onHandleCancel}
      centered={true}
    >
      {/* <ModalHeader toggle={() => this.deleteLogout()} className="log-out-title-bar  border-0">
      <span>{content.logout}</span>
    </ModalHeader> */}
      <ModalBody className="yt-log-body-wrap">
        <div className="text-center log-out-body-text">
          {content.placeOrderConfirmation}
        </div>
      </ModalBody>
      <ModalFooter className="d-flex modal-footer flex-nowrap">
        <Button color="primary-1" block outline onClick={onHandleCancel}>
          {content.cancel}
        </Button>
        <Button color="primary-1" block onClick={onHandleConfirm}>
          {content.ok}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default class OrderSummary extends OrderSummaryWebController {
  constructor(props: Props) {
    super(props);
  }

  getPaymentOptions = () => {
    const paymentOptions = [
      {
        label: "Cash on delivery",
        name: "cod",
        value: "cod",
      },
    ];

    let countryCode: any = localStorage.getItem("countryCode");
    let appThemeData: any = localStorage.getItem("appThemData");

    if (countryCode) {
      countryCode = JSON.parse(countryCode);
    }
    if (appThemeData) {
      appThemeData = JSON.parse(appThemeData);
    }

    if (
      countryCode?.countryName?.toLowerCase() === "india" &&
      appThemeData.PaymentKeys?.razorpay?.api_key
    ) {
      paymentOptions.unshift({
        label: "RazorPay",
        name: "razorpay",
        value: "razorpay",
      });
    } else if (countryCode?.countryName?.toLowerCase() === "uk") {
      paymentOptions.unshift({
        label: "Stripe",
        name: "payment",
        value: "stripe",
      });
    }
    return paymentOptions;
  };

  render() {
    let breadcrumbs = [
      {
        label: content.home,
        link: "/home-page",
      },
      {
        label: content.cart,
        link: "/cart",
      },
      {
        label: content?.payment,
        link: "/order-summary",
      },
    ];

    const paymentOptions: any = this.getPaymentOptions();

    const { paymentType, isOpen } = this.state;

    return (
      <div className="checkout-form-wrap">
        <div style={{ width: "92%", margin: "0 auto" }}>
          <BreadCrumbs list={breadcrumbs} />
          <Row className="payment-container" style={{ display: "flex" }}>
            <Col className="order-summary-item-container" md={7}>
              <Card className="mb-3">
                <CardBody>
                  <h4 className="mb-4">Payment method</h4>
                  {paymentOptions.map((option: any) => (
                    <Radio
                      label={option.label}
                      name={option.name}
                      id={option.value}
                      checked={paymentType === option.value}
                      onChange={() => {
                        this.setState({
                          paymentType: option.value,
                        });
                      }}
                    />
                  ))}
                  {paymentType === "stripe" && (
                    <StripePayments
                      // @ts-ignore
                      cartDetails={this.state.wholeCartData}
                      addressData={this.state.addressData}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>

            <Col className="order-summary-price-container" md={5}>
              <CartProductListData
                cart={this.state.cardtData}
                wholeCart={this.state.wholeCartData}
                toggleIsOpen={this.toggleIsOpen}
                toApplyCoupon={this.toApplyCoupon.bind(this)}
                couponSuccess={""}
                deleteCoupon={this.deleteCoupon.bind(this)}
              />
            </Col>
          </Row>
          <div className="mobileViewProceedbuttoncontainer">
            <Col md={11}>
              <div className="proceed-btn">
                <Button
                  style={{ width: "100%" }}
                  data-testid={"button-proceed-checkout"}
                  color="btn btn-secondary yt-login-btn btn-block"
                  onClick={() => this.toggleIsOpen()}
                >
                  {content.proceed}
                </Button>
              </div>
            </Col>
          </div>
        </div>
        {this.state.isOpen && (
          <PaymentModal
            onHandleCancel={this.releaseBlockQuantity}
            onHandleConfirm={this.checkZipcodeAvailability}
            isOpen={true}
          />
        )}
      </div>
    );
  }
}
