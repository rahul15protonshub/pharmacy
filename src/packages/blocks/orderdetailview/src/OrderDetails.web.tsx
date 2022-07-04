import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "reactstrap";
//@ts-ignore
import ReactPaginate from "react-paginate";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { BsDot } from "react-icons/bs";
// @ts-ignore
import capitalize from "lodash/capitalize";
import "../assets/styles/order-details.scoped.css";
import "../assets/styles/cancelSubscriptionModal.css";
// @ts-ignore
import content from "../../studio-store-ecommerce-components/src/content.js";
import OrderDetailsController, { Props } from "./OrderDetailsController.web";
import PageLoadingBlog from "../../profilebio/src/PageLoadingBlog.web";
import {
  orderStatucheck,
  deiveryPic,
  onTheWay,
  modalCloseIcon,
} from "./assets";

// Customizable Area Start
// Customizable Area End
export class OrderDetails extends OrderDetailsController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    const { orderItem, order } = this.props.location.state;
    if (this.state.loader) {
      // @ts-ignore
      return <PageLoadingBlog title="Loading ..." />;
    }
    return (
      <>
        <Container>
          <Row>
            <Col md={12}>
              <div className="pageroute hc-breadcrumbs my-3">
                <Link to="/" className="hc-home order-page-prevpage">
                  {content.home} {">"}
                </Link>
                <Link to="/profilebio" className="hc-mid order-page-prevpage">
                  {" "}
                  {content.profile} {">"}
                </Link>{" "}
                <Link
                  to={{
                    pathname: "/profilebio",
                    state: { activeTab: "myorder" },
                  }}
                  className="hc-mid order-page-prevpage"
                >
                  {" "}
                  {content.myOrders} {">"}
                </Link>{" "}
                <span className="currpage hc-current">
                  {content.orderDetails}
                </span>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={12} lg={12} className="px-3 col-xxl-9">
              <div className="od-cm-col-pad">
                <div
                  data-testid={"btn-move-to-profile"}
                  className="hc-beckfrom-ct-page hc-mb-30 w3-ripple"
                  onClick={() => {
                    this.routeToProfile();
                  }}
                >
                  <FaLongArrowAltLeft className="hcp-back-arrow" />{" "}
                  <span className="pl-2 hc-back-tag">
                    {content.orderDetails}
                  </span>
                </div>
                <div className="order-details-main-wrapper bg-white radius-10 mt-3 hc-mb-80">
                  {orderItem?.attributes?.subscription_package != null &&
                    (orderItem?.attributes?.subscription_discount != null ? (
                      <div className="subscription-tag  order-subscription text-center p-1">
                        SUBSCRIPTION{" "}
                        {`${orderItem?.attributes?.subscription_discount}%`}
                      </div>
                    ) : (
                      <div className="subscription-tag  order-subscription text-center p-1">
                        SUBSCRIPTION
                      </div>
                    ))}
                  <div className="d-flex flex-wrap justify-content-between yt-sp-my-order-tdet-wrap">
                    <div className="d-flex align-items-center flex-wrap sinlge-mo-dt-wrap ">
                      <div className="order-number-wrap">
                        <span className="order-tag">
                          {content.orderNumber}:{" "}
                        </span>
                        <span className="order-tag-val">
                          {order?.order_number}
                        </span>
                      </div>
                      <div className="order-bdr-between" />
                      <div className="order-date-wrap">
                        <span className="order-tag">{content.orderedOn}: </span>
                        <span className="order-tag-val">
                          {order?.order_date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="py-3 d-flex align-items-center mb-3 od-single-prd-details-wrap">
                    <span className="d-flex">
                      <div
                        className="od-product-img p-1 d-flex align-items-center justify-content-center w3-ripple"
                        data-testid={"btn-catalogue-details"}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setTimeout(() => {
                            this.props.history.push(
                              "/shop/" +
                                this.state.trackingDetails?.order_item_detail
                                  ?.data?.attributes?.catalogue?.id
                            );
                          }, 500);
                        }}
                      >
                        <img src={this.getImageUrl()} className="img-fluid" />
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="order-product-info ">
                          <h2
                            className="pp-order-product-ttl mt-0 w3-ripple"
                            data-testid={"btn-product-details"}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              //@ts-ignore
                              localStorage.setItem(
                                "catalogue_variant_id",
                                this.state.trackingDetails?.order_item_detail
                                  ?.data?.attributes?.catalogue_variant_id
                              );
                              this.props.history.push(
                                "/shop/" +
                                  this.state.trackingDetails?.order_item_detail
                                    ?.product.id
                              );
                            }}
                          >
                            {orderItem.attributes.product_name}
                          </h2>
                          <div className="order-prodict-type-container">
                            {orderItem.attributes?.catalogue_variant?.attributes
                              ?.catalogue_variant_properties ? (
                              <Table
                                className="mb-0 order-prodict-type d-block"
                                borderless
                              >
                                <thead>
                                  <tr>
                                    {orderItem.attributes?.catalogue_variant?.attributes?.catalogue_variant_properties.map(
                                      (value: any, index: number) => (
                                        <th key={index}>
                                          {value?.attributes?.variant_name}
                                        </th>
                                      )
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    {orderItem.attributes?.catalogue_variant?.attributes?.catalogue_variant_properties.map(
                                      (value: any, index: number) => (
                                        <td key={index}>
                                          {value?.attributes?.property_name}
                                        </td>
                                      )
                                    )}
                                  </tr>
                                </tbody>
                              </Table>
                            ) : (
                              <div />
                            )}
                          </div>
                          <ul className="p-0 order-ul-list-none mb-0 mt-2 d-flex flex-wrap  flex-column">
                            <li className="op-order-product-price1 pr-4">
                              {/* need to check data */}
                              <span className="order-product-price">
                                {/* @ts-ignore */}
                                {
                                  JSON.parse(
                                    localStorage.getItem("countryCode") || "{}"
                                  )?.countryCode
                                }{" "}
                                {parseFloat(
                                  this.state.trackingDetails?.order_item_detail
                                    ?.data?.attributes?.unit_price || 0
                                ).toFixed(2)}
                              </span>
                            </li>
                            <li>
                              <span className="order-total-price">
                                {content.TotalAmount} : {/* @ts-ignore */}
                                {
                                  JSON.parse(
                                    localStorage.getItem("countryCode") || "{}"
                                  )?.countryCode
                                }{" "}
                                {parseFloat(order?.total || 0).toFixed(2)}
                              </span>
                            </li>
                            {orderItem?.attributes?.subscription_package &&
                              orderItem?.attributes?.total_price && (
                                <li
                                  style={{
                                    marginTop: "3.5rem",
                                    position: "absolute",
                                  }}
                                >
                                  Total Subscription Price: {/* @ts-ignore */}
                                  {
                                    JSON.parse(
                                      localStorage.getItem("countryCode") ||
                                        "{}"
                                    )?.countryCode
                                  }{" "}
                                  {`${parseFloat(
                                    orderItem?.attributes?.total_price
                                  ).toFixed(2)}`}
                                </li>
                              )}
                          </ul>
                        </div>
                      </div>
                    </span>
                    <div>
                      <div className="order-product-quanity text-center text-sm-right">
                        <ul className="p-0 order-ul-list-none m-0 ">
                          <li className="op-order-quantity mb-3">
                            {content.quantity}:{" "}
                            <span className="ord-product-quantity">
                              {orderItem?.attributes?.subscription_package !=
                              null
                                ? orderItem?.attributes?.subscription_quantity
                                : orderItem.attributes?.quantity}
                            </span>
                          </li>
                        </ul>
                      </div>
                      {orderItem?.attributes?.subscription_package != null && (
                        <div className="sub-items mt-2 text-end orderDetails-subscription">
                          <span className="head">
                            {["9am to 12pm", "6am to 9am"].includes(
                              orderItem?.attributes?.preferred_delivery_slot
                            )
                              ? "Morning "
                              : "Evening "}{" "}
                            {orderItem?.attributes?.preferred_delivery_slot}
                          </span>
                          {" | "}
                          <span className="sub-head text-capitalize">
                            {`${
                              orderItem?.attributes?.subscription_package
                            } for ${
                              orderItem?.attributes?.subscription_period
                            } ${
                              orderItem?.attributes?.subscription_period > 1
                                ? "Months"
                                : "Month"
                            } `}
                          </span>{" "}
                        </div>
                      )}
                      <div className="order-details-status on-the-way">
                        {capitalize(
                          this.state.trackingDetails?.tracking_detail?.data[0]
                            .attributes.status
                        )}
                      </div>
                    </div>
                  </div>
                  <Row>
                    <Col md={12}>
                      <div className="order-details-status-bar py-3 my-3">
                        <h2 className="order-details-sub-title">
                          {content.orderStatus}
                        </h2>
                        <ul className="pl-2 order-ul-list-none mb-0 ml-3 order-details-status-wrap">
                          {this.state.orderItemSubscriptionInfo?.data &&
                          this.state.orderItemSubscriptionInfo.data.length >
                            0 ? (
                            <>
                              {this.state.orderItemSubscriptionInfo.data?.map(
                                (item: any, index: number) => (
                                  <div key={index}>
                                    <li>
                                      <img
                                        alt="status check"
                                        src={orderStatucheck}
                                        className="order-details-status-icn"
                                      />
                                      <div className="order-step-1 order-st-otw">
                                        <div className="d-flex align-items-center">
                                          {item?.attributes?.delivery_date}{" "}
                                          &nbsp;
                                          {[
                                            "placed",
                                            "confirmed",
                                            "pending",
                                          ].includes(
                                            item?.attributes?.status
                                          ) ? (
                                            <img
                                              src={deiveryPic}
                                              className="myIcon"
                                              alt=""
                                            />
                                          ) : [
                                              "delivered",
                                              "in transit",
                                            ].includes(
                                              item?.attributes?.status
                                            ) ? (
                                            <img
                                              src={onTheWay}
                                              className="myIcon"
                                              alt=""
                                            />
                                          ) : (
                                            [
                                              "cancelled",
                                              "refunded",
                                              "returned",
                                            ].includes(
                                              item?.attributes?.status
                                            ) && <MdCancel className="myIcon" />
                                          )}
                                        </div>
                                      </div>
                                    </li>
                                    <div className="py-3 d-flex align-items-center mb-3 od-single-prd-details-wrap">
                                      <span className="d-flex">
                                        <div
                                          className="od-product-img p-1 d-flex align-items-center justify-content-center w3-ripple"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            setTimeout(() => {
                                              this.props.history.push(
                                                "/shop/" +
                                                  this.state.trackingDetails
                                                    ?.order_item_detail?.data
                                                    ?.attributes?.catalogue?.id
                                              );
                                            }, 500);
                                          }}
                                        >
                                          <img
                                            src={this.getImageUrl()}
                                            className="img-fluid"
                                          />
                                        </div>
                                        <div className="d-flex align-items-center">
                                          <div className="order-product-info ">
                                            <div
                                              className="pp-order-product-tt mt-0 w3-ripple text-capitalize"
                                              style={{ cursor: "pointer" }}
                                              onClick={() => {
                                                setTimeout(() => {
                                                  this.props.history.push(
                                                    "/shop/" +
                                                      this.state.trackingDetails
                                                        ?.order_item_detail
                                                        ?.data?.attributes
                                                        ?.catalogue?.id
                                                  );
                                                }, 500);
                                              }}
                                            >
                                              {
                                                orderItem?.attributes
                                                  ?.product_name
                                              }
                                            </div>
                                            <div className="order-prodict-type-container">
                                              {orderItem?.product_variant ? (
                                                <Table
                                                  className="mb-0 order-prodict-type d-block"
                                                  borderless
                                                >
                                                  <thead>
                                                    <tr>
                                                      {orderItem?.product_variant.product_variant_properties.map(
                                                        (
                                                          value: any,
                                                          idx: number
                                                        ) => (
                                                          <th key={idx}>
                                                            {value.variant_name}
                                                          </th>
                                                        )
                                                      )}
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    <tr>
                                                      {orderItem?.product_variant.product_variant_properties.map(
                                                        (
                                                          value: any,
                                                          idx: number
                                                        ) => (
                                                          <td key={idx}>
                                                            {
                                                              value.property_name
                                                            }
                                                          </td>
                                                        )
                                                      )}
                                                    </tr>
                                                  </tbody>
                                                </Table>
                                              ) : (
                                                <div />
                                              )}
                                            </div>
                                            {orderItem?.attributes?.attributes
                                              ?.subscription_quantity !==
                                              null && (
                                              <ul className="p-0 order-ul-list-none mb-0 mt-2 d-flex flex-wrap align-items-center">
                                                <li>
                                                  <span className="subscription-timeslot1">
                                                    {[
                                                      "9am to 12pm",
                                                      "6am to 9am",
                                                    ].includes(
                                                      orderItem?.attributes
                                                        ?.preferred_delivery_slot
                                                    )
                                                      ? "Morning "
                                                      : "Evening "}
                                                    {
                                                      orderItem?.attributes
                                                        ?.preferred_delivery_slot
                                                    }{" "}
                                                    |{" "}
                                                    <span className="subscription-duration text-capitalize">
                                                      {`${
                                                        orderItem?.attributes
                                                          ?.subscription_package
                                                      } for ${
                                                        orderItem?.attributes
                                                          ?.subscription_period
                                                      } ${
                                                        orderItem?.attributes
                                                          ?.subscription_period >
                                                        1
                                                          ? "Months"
                                                          : "Month"
                                                      } `}
                                                    </span>
                                                  </span>
                                                </li>
                                              </ul>
                                            )}
                                            <ul className="p-0 order-ul-list-none mb-0 mt-2 d-flex flex-wrap align-items-center">
                                              <li>
                                                <span className="w3-text-gray subscription-orderStatus">
                                                  Your order is{" "}
                                                  {item?.attributes?.status}.
                                                </span>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </span>
                                      <div>
                                        <div className="order-product-quanity text-center text-sm-right">
                                          <ul className="p-0 order-ul-list-none m-0 ">
                                            <li className="op-order-quantity mb-3">
                                              {content.quantity}:{" "}
                                              {orderItem?.attributes
                                                ?.subscription_quantity ===
                                              null ? (
                                                <span className="ord-product-quantity">
                                                  {
                                                    orderItem?.attributes
                                                      .quantity
                                                  }
                                                </span>
                                              ) : (
                                                <span className="ord-product-quantity">
                                                  {
                                                    orderItem?.attributes
                                                      ?.subscription_quantity
                                                  }
                                                </span>
                                              )}
                                            </li>
                                            <li className="op-order-quantity mb-3">
                                              <span className="order-sub-status">
                                                <BsDot
                                                  // @ts-ignore
                                                  className={
                                                    [
                                                      "placed",
                                                      "confirmed",
                                                      "pending",
                                                    ].includes(
                                                      item?.attributes?.status
                                                    )
                                                      ? "myDot transit-me"
                                                      : [
                                                          "delivered",
                                                          "in transit",
                                                        ].includes(
                                                          item?.attributes
                                                            ?.status
                                                        )
                                                      ? "myDot success-me"
                                                      : [
                                                          "cancelled",
                                                          "refunded",
                                                          "returned",
                                                        ].includes(
                                                          item?.attributes
                                                            ?.status
                                                        ) && "myDot cancel-me"
                                                  }
                                                />
                                                {capitalize(
                                                  item?.attributes?.status
                                                ) + " "}
                                              </span>
                                            </li>
                                            {[
                                              "placed",
                                              "confirmed",
                                              "pending",
                                            ].includes(
                                              item?.attributes?.status
                                            ) && (
                                              <li>
                                                <span
                                                  style={{ cursor: "pointer" }}
                                                  className="subscrition-cancel-btn"
                                                  onClick={() => {
                                                    this.setState({
                                                      isOpenCancelSubscription:
                                                        !this.state
                                                          .isOpenCancelSubscription,
                                                      subscriptionDayId:
                                                        item.id,
                                                    });
                                                  }}
                                                >
                                                  Cancel Subscription
                                                </span>
                                              </li>
                                            )}
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                              {this.state.orderItemSubscriptionInfo?.meta
                                ?.pagination &&
                                (this.state.orderItemSubscriptionInfo?.meta
                                  ?.pagination.next_page ||
                                  this.state.orderItemSubscriptionInfo?.meta
                                    ?.pagination.prev_page) && (
                                  <div id="subscriptionpagination">
                                    <ReactPaginate
                                      previousLabel={"<<<"}
                                      nextLabel={">>>"}
                                      breakLabel={"..."}
                                      breakClassName={"break-me"}
                                      pageCount={
                                        this.state.orderItemSubscriptionInfo
                                          ?.meta?.pagination?.total_pages
                                      }
                                      marginPagesDisplayed={2}
                                      pageRangeDisplayed={5}
                                      onPageChange={(val: any) => {
                                        this.setState({
                                          currentSubscriptionPageNo:
                                            this.state
                                              .currentSubscriptionPageNo + 1,
                                        });
                                        let pageNo: any = val.selected + 1;
                                        this.fetchSubscriptionList(pageNo);
                                      }}
                                      containerClassName={"pagination"}
                                      // @ts-ignore
                                      subContainerClassName={"pages pagination"}
                                      activeClassName={"active"}
                                    />
                                  </div>
                                )}
                            </>
                          ) : (
                            this.state.trackingDetails?.tracking_detail?.data.map(
                              (item: any, index: number) => (
                                <div key={index}>
                                  <li>
                                    <img
                                      alt="status check"
                                      src={orderStatucheck}
                                      className="order-details-status-icn"
                                    />
                                    <div className="order-step-1 order-st-otw">
                                      <h4 className="d-flex align-items-center">
                                        {capitalize(item?.attributes?.status) +
                                          " "}
                                        <span className="order-status-date">
                                          {item?.attributes?.order_date}
                                        </span>
                                        <img
                                          className="ml-1"
                                          src={
                                            item?.attributes?.status ==
                                            "ontheway"
                                              ? onTheWay
                                              : deiveryPic
                                          }
                                          alt=""
                                        />
                                      </h4>
                                      <p className="order-details-message">
                                        {item?.attributes?.message},{" "}
                                        {item?.attributes?.order_datetime}
                                      </p>
                                    </div>
                                  </li>
                                </div>
                              )
                            )
                          )}
                        </ul>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <div className="order-details-shipping-barmy-3">
                        <h2 className="order-details-sub-title">
                          {content.shippingAddress}
                        </h2>
                        <div className="order-shipping-address-wrap">
                          <h2 className="order-details-address-type">
                            {capitalize(this.state.shippingAddress?.name)}
                          </h2>
                          <p className="order-details-address-details">
                            {this.getAddressString()}
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="order-details-contact">
                          {content.phoneNumber}:
                          <span className="order-details-phone">
                            {this.state.shippingAddress?.phone_number}
                          </span>
                        </div>
                        <div className="order-cancel-wrap text-right" />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {/* Modal for Cancel Subscription Start */}
        <Modal
          isOpen={this.state.isOpenCancelSubscription}
          className="cm-small-modal-4"
          centered={true}
          toggle={() =>
            this.setState({
              isOpenCancelSubscription: !this.state.isOpenCancelSubscription,
            })
          }
        >
          <ModalHeader
            close={
              <img
                src={modalCloseIcon}
                alt=""
                onClick={() =>
                  this.setState({
                    isOpenCancelSubscription:
                      !this.state.isOpenCancelSubscription,
                  })
                }
              />
            }
            className="co-title-bar  border-0"
          >
            <span>Cancel Subscription</span>
          </ModalHeader>
          <ModalBody className="py-5">
            <div className="text-center co-body-text">
              Are you sure you want to cancel subscription
            </div>
          </ModalBody>

          <ModalFooter className="co-bottom-bar p-1 d-flex">
            {/* {"deleteorder" ? (
              <Button color=" pp-co-btn-modal p-3 pp-co-btn-light-grey w-100" block
                onClick={() => { }}
              >
                {content.ok}
              </Button>
            ) : ( */}
            <Fragment>
              <Button
                className="pp-co-btn-modal p-3 pp-co-btn-light-grey"
                onClick={() =>
                  this.setState({ isOpenCancelSubscription: false })
                }
                block
              >
                {content.cancel}
              </Button>
              <span className="yt-form-spacer" />
              <Button
                className="pp-co-btn-modal p-3 pp-co-btn-dark-grey"
                onClick={() => this.cancelSubscriptionDay()}
                block
              >
                {content.yesConfirm}
              </Button>
            </Fragment>
            {/* )} */}
          </ModalFooter>
        </Modal>
        {/* Modal for Cancel Subscription End */}
      </>
    );
    // Customizable Area End
  }
}
// @ts-ignore
export default withRouter(OrderDetails);
// Customizable Area Start
// Customizable Area End
