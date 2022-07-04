//@ts-ignore
import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  FormFeedback,
} from "reactstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import AddOrRemoveQuantity from "../../studio-store-ecommerce-components/src/AddOrRemoveQuantity";
//subscribe css
import "../assets/css/scheduling.css";
//@ts-ignore
import content from "../../studio-store-ecommerce-components/src/content.js";
import { closebutton } from "./assets";
import SchedulingController, { Props } from "./SchedulingController.web";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import { shallowEqual } from "recompose";
// Customizable Area Start
// Customizable Area End
import Radio from "../../studio-store-ecommerce-components/src/UI/Radio";

export class Scheduling extends SchedulingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  async componentDidMount() {
    // Customizable Area Start
    window.scrollTo(0, 0);
    // Customizable Area End
  }
  render() {
    // Customizable Area Start
    const validationSchema = yup.object().shape({
      subscription_quantity: yup.number(),
      subscription_package: yup.string().required("Package is required"),
      subscription_period: yup.string().required("Period is required"),
      preferred_delivery_period: yup
        .string()
        .required("Time period is required"),
      preferred_delivery_slot: yup.string().required("Time slot is required"),
    });
    const { productDetails, addToCartWithSubscription, isSubscribed, history } =
      this.props;
    let initialValues: any = {
      catalogue_id: Number(productDetails?.id),
      subscription_quantity:
        productDetails?.attributes?.subscription_quantity || 1,
      subscription_package:
        productDetails?.attributes?.subscription_package || "",
      subscription_period:
        productDetails?.attributes?.subscription_period || "",
      preferred_delivery_period:
        !productDetails?.attributes?.preferred_delivery_slot?.includes("am") &&
        productDetails?.attributes?.preferred_delivery_slot?.includes("pm")
          ? "evening"
          : "morning",
      preferred_delivery_slot:
        productDetails?.attributes?.preferred_delivery_slot || "",
      subscription_discount: "",
      isAddToCart: true,
    };
    let subscriptionPackageOptions: string[] = [];
    if (productDetails?.attributes?.available_subscription) {
      subscriptionPackageOptions = Object.keys(
        productDetails?.attributes?.available_subscription
      );
    }
    return (
      /* Modal for Subscription Start */
      <Modal
        isOpen={this.props?.isSubscribeClicked}
        toggle={this.props?.toggleSubscribe}
        centered={true}
        className="cm-small-modal-6"
      >
        <ModalHeader
          className="edit-add-addr-title-bar p-4"
          close={
            <div
              className="edit-add-addr-close-btn px-2 py-1"
              role="button"
              onClick={this.props?.toggleSubscribe}
            >
              <img src={closebutton} />
            </div>
          }
        >
          <span>{content.subscription}</span>
        </ModalHeader>
        <Formik
          initialValues={Object.assign({}, initialValues)}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            let varient: any = this.getCatalogueVarient(productDetails, values),
              newValues = {
                ...values,
                subscription_period: +values.subscription_period,
                subscription_discount: varient?.attributes?.discount,
              };
            delete newValues.preferred_delivery_period;
            if (newValues.isAddToCart) {
              delete newValues.isAddToCart;
              addToCartWithSubscription(newValues);
            } else {
              delete newValues.isAddToCart;
              localStorage.setItem(
                "buyNow",
                JSON.stringify({
                  cat_id: values.catalogue_id,
                  quantity: values.subscription_quantity,
                  subscriptionReqBodyData: newValues,
                })
              ),
                //@ts-ignore
                this.props?.history?.push("/cart");
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
            ...rest
          }) => {
            const {
              subscribePeriodOptions,
              availableDeliveryPeriod,
              availableDeliveryTimeSlotOptions,
            } = this.getSubscriptionOptions(productDetails, values);
            const hasChanged = !shallowEqual(initialValues, values);
            console.log(productDetails, "data");
            return (
              <form onSubmit={handleSubmit}>
                <ModalBody className="py-4 px-5 yt-add-modal-body text-start">
                  <div className="right-price-sec">
                    <div className="sp-price-right-content">
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="m-0 pr-2 subscription-qty">
                          {" "}
                          {content.quantity}{" "}
                        </p>
                        <AddOrRemoveQuantity
                          value={values.subscription_quantity}
                          onChange={(val: number) =>
                            setFieldValue("subscription_quantity", val)
                          }
                          max={productDetails?.stock_qty}
                        />
                        {productDetails?.stock_qty}
                      </div>
                    </div>
                  </div>
                  <hr style={{ border: "solid 1px #cae2fe" }} />
                  <div className="sp-price-right-content">
                    <p className="quantity pr-2 subscribePackageText">
                      {content.subscriptionPackage}
                    </p>
                    {subscriptionPackageOptions.map(
                      (pac: string, key: number) => (
                        <Radio
                          id={pac}
                          name="subscription_package"
                          label={<span className="text-capitalize">{pac}</span>}
                          inline={true}
                          onChange={() => {
                            setFieldValue("subscription_package", pac);
                            setFieldValue("subscription_period", "");
                            setFieldValue("preferred_delivery_period", "");
                            setFieldValue("preferred_delivery_slot", "");
                          }}
                          onBlur={handleBlur}
                          checked={values.subscription_package === pac}
                        />
                      )
                    )}
                    <ErrorMessage name="subscription_package">
                      {(str: string) => (
                        <FormFeedback className="d-block">{str}</FormFeedback>
                      )}
                    </ErrorMessage>
                    <br />
                    <p className="quantity subscriptionPeriod pr-2 mt-4">
                      {content.subscriptionPeriod}
                    </p>
                    <Input
                      type="select"
                      name="subscription_period"
                      value={values.subscription_period}
                      onChange={(e) => {
                        setFieldValue("subscription_period", e.target.value);
                        setFieldValue("preferred_delivery_period", "");
                        setFieldValue("preferred_delivery_slot", "");
                      }}
                      onBlur={handleBlur}
                      disabled={!subscribePeriodOptions.length}
                    >
                      <option value="">Select</option>
                      {subscribePeriodOptions.map(
                        (option: number, key: number) => (
                          <option key={key} value={option}>
                            {option} {+option > 1 ? "Months" : "Month"}
                          </option>
                        )
                      )}
                    </Input>
                    <ErrorMessage name="subscription_period">
                      {(str: string) => (
                        <FormFeedback className="d-block">{str}</FormFeedback>
                      )}
                    </ErrorMessage>
                  </div>
                  <br />
                  {availableDeliveryPeriod.length > 0 && (
                    <div className="sp-price-right-content">
                      <p className="quantity subscription-timeslot pr-2">
                        {content.subscriptionTimeslot}
                      </p>
                      {availableDeliveryPeriod.map(
                        (per: string, key: number) => (
                          <Radio
                            id={per + key}
                            name="preferred_delivery_period"
                            label={
                              <span className="text-capitalize">{per}</span>
                            }
                            inline={true}
                            onChange={() => {
                              setFieldValue("preferred_delivery_period", per);
                              setFieldValue("preferred_delivery_slot", "");
                            }}
                            onBlur={handleBlur}
                            checked={values.preferred_delivery_period === per}
                          />
                        )
                      )}
                      <ErrorMessage name="preferred_delivery_period">
                        {(str: string) => (
                          <FormFeedback className="d-block">{str}</FormFeedback>
                        )}
                      </ErrorMessage>
                      <br />
                      <Input
                        type="select"
                        name="preferred_delivery_slot"
                        value={values.preferred_delivery_slot}
                        onChange={handleChange}
                        disabled={!availableDeliveryTimeSlotOptions.length}
                      >
                        <option value="">Select</option>
                        {availableDeliveryTimeSlotOptions.map(
                          (option: string, key: number) => (
                            <option key={key} value={option}>
                              {option}
                            </option>
                          )
                        )}
                      </Input>
                      <ErrorMessage name="preferred_delivery_slot">
                        {(str: string) => (
                          <FormFeedback className="d-block">{str}</FormFeedback>
                        )}
                      </ErrorMessage>
                    </div>
                  )}
                  <hr style={{ border: "solid 1px #cae2fe" }} />
                  <div className="sp-price-right-content">
                    <div className="col d-flex">
                      <p className="quantity sp-quantity-tag-name pr-2">
                        {content.totalPrice} :{" "}
                      </p>
                      <p className="price pr-2">
                        {
                          JSON.parse(
                            localStorage.getItem("countryCode") ?? "{}"
                          )?.countryCode
                        }{" "}
                        {this.props?.productOnSale
                          ? parseFloat(
                              // @ts-ignore
                              this.props?.productSlaeprice *
                                values.subscription_quantity
                            ).toFixed(2)
                          : parseFloat(
                              // @ts-ignore
                              this.props?.ProductPrice *
                                values.subscription_quantity
                            ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter className="d-flex flex-nowrap px-5">
                  <Button
                    className="mr-4"
                    color="primary-1"
                    block
                    outline
                    disabled={rest.isSubmitting}
                    type={isSubscribed && !hasChanged ? "button" : "submit"}
                    onClick={() => {
                      if (isSubscribed && !hasChanged) {
                        history.push("/cart");
                      } else {
                        setFieldValue("isAddToCart", true);
                      }
                    }}
                  >
                    {isSubscribed
                      ? hasChanged
                        ? content.updateCart
                        : content.goToCart
                      : content.addToCart}
                  </Button>
                  <Button
                    color="primary-1"
                    block
                    type="submit"
                    disabled={rest.isSubmitting}
                    onClick={() => setFieldValue("isAddToCart", false)}
                  >
                    {content.buyNow}
                  </Button>
                </ModalFooter>
              </form>
            );
          }}
        </Formik>
      </Modal>
      /* Modal for Subscription End */
    );
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
}

//@ts-ignore
export default withRouter(Scheduling);
