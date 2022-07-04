//@ts-nocheck;
import React, { Fragment } from "react";
import "../assets/styles/styles.css";
import "../assets/styles/address.css";
import {
  buildImg,
  emptyCheck,
  checkCheck,
  closeImg,
  listAddressImg,
} from "./assets";
import { Formik } from "formik";
import * as Yup from "yup";
import AddressController, { Props } from "./AddressController.web";
import {
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
} from "reactstrap";
import "../assets/styles/deleteAddressModal.css";
import "../assets/styles/defaultAddressModal.css";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";
import { CgSpinner } from "react-icons/cg";
// @ts-ignore
import content from "../../studio-store-ecommerce-components/src/content.js";
import { _ } from "../../../framework/src/IBlock";

// Customizable Area Start
/** Validations start */
const addNewAddressSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is Too Short")
    .max(20, "Maximum 20 Characters are allowed")
    .required("Name is Required"),
  doorNo: Yup.string().required("Flat/House/Apartment No. is Required"),
  addressLine1: Yup.string()
    .matches(
      /^[A-Za-z0-9 ]+$/,
      "Special characters are not allow in Address Line 1"
    )
    .min(3, "Address Line 1 is Too Short")
    .required("Address Line 1 is Required"),
  addressLine2: Yup.string()
    .matches(
      /^[A-Za-z0-9 ]+$/,
      "Special characters are not allow in Address Line 2"
    )
    .min(3, "Address Line 2 is Too Short")
    .required("Address Line 2 is Required"),
  city: Yup.string().min(3, "City is Too Short").required("City is Required"),
  state: Yup.string().min(3, "State is Required").required("State is Required"),
  country: Yup.string()
    .min(2, "Country is Too Short")
    .required("Country is Required"),
  pinCode: Yup.number()
    .min(100000, "Pin Code is Minimum 6 digits")
    .max(999999, "Pin Code is Maximum 6 digits")
    .required("Pin Code is Required"),
  phone: Yup.number()
    .min(1000000000, "Phone Number Minimum 10 digits")
    .max(9999999999, "Phone Number Maximum 10 digits")
    .required("Phone Number is Required"),
});
/** validations end */
// Customizable Area End

export default class Address extends AddressController {
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  render() {
    return (
      // Customizable Area Start
      <>
        {this.state.loading && <Loader loading={this.state.loading} />}
        {this.state.userAddress && this.state.userAddress.length > 0 ? (
          <>
            <div className="profile-pg-inner-wrapper">
              <div className="profile-pg-sa-address-main-wrap addres">
                <ul
                  className="pp-sa-list-none p-0 m-0 pp-sa-all-addres-list"
                  style={{ listStyle: "none" }}
                >
                  {this.state.userAddress.map((ele, index) => (
                    <Fragment key={index}>
                      <li key={index}>
                        <div className="profile-pg-address-list bg-white radius-10 profile-pg-mb-30">
                          <div className="d-flex flex-wrap align-items-center">
                            <div className="pp-sa-img-wrap1 d-flex">
                              <img
                                src={listAddressImg}
                                width="65"
                                height="65"
                              />
                              <div className="pp-sa-info-wrap pr-5">
                                <h2 className="pp-sa-type mt-0">
                                  {ele.attributes.name}
                                </h2>
                                <p
                                  className="pp-sa-address mb-0"
                                  style={{ overflow: "hidden" }}
                                  id="addressContentData"
                                >
                                  {ele.attributes.flat_no}{" "}
                                  {ele.attributes.address} {ele.attributes.city}
                                  ,{ele.attributes.state},
                                  {ele.attributes.country}{" "}
                                  {ele.attributes.pinCode}
                                </p>
                              </div>
                            </div>
                            <div className="pp-sa-action-wrap d-flex align-items-end justify-content-end">
                              <div className="pp-sa-edit pr-3 border-right">
                                <Button
                                  color="link pp-add-edit-btn"
                                  className="addressbtn"
                                  onClick={() =>
                                    this.setState({
                                      ...this.state,
                                      editAddressChecked: true,
                                      addressIndex: index,
                                      deliveryAddressID: ele.attributes.id,
                                      defaultAddressID: ele.attributes
                                        .is_default
                                        ? ele.id
                                        : "",
                                    })
                                  }
                                >
                                  {content.edit}
                                </Button>
                              </div>
                              <div className="pp-sa-delet text-right pl-3">
                                {this.state.deliveryAddressID &&
                                this.state.defaultAddressCheck ? (
                                  <img
                                    src={
                                      this.state.deliveryAddressID ==
                                      ele.attributes.id
                                        ? checkCheck
                                        : emptyCheck
                                    }
                                    alt=""
                                    className="img-fluid d-block ml-auto mb-2"
                                    onClick={() => {
                                      this.setState({
                                        isDefaultAddressChanged: true,
                                      }),
                                        this.changeDefaultAddressHandler(
                                          ele.attributes.id
                                        );
                                    }}
                                    width="29"
                                    height="29"
                                  />
                                ) : (
                                  <img
                                    src={
                                      ele.attributes.is_default
                                        ? checkCheck
                                        : emptyCheck
                                    }
                                    alt=""
                                    className="img-fluid d-block ml-auto mb-2"
                                    onClick={() =>
                                      this.changeDefaultAddressHandler(
                                        ele.attributes.id
                                      )
                                    }
                                    width="29"
                                    height="29"
                                  />
                                )}
                                <Button
                                  color="link pr-0 pp-add-delete-btn"
                                  className="addressbtn"
                                  style={{ color: "#324688" }}
                                  onClick={() =>
                                    this.setState({
                                      ...this.state,
                                      isDeleteAddressCheck: true,
                                      deleteAddressId: ele.attributes.id,
                                    })
                                  }
                                >
                                  {content.delete}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </Fragment>
                  ))}
                </ul>
                <div className="d-flex justify-content-end">
                  <Button
                    color="secondary pp-no-addr-btn py-2 px-3"
                    onClick={() => this.openingNewAddressHandler()}
                  >
                    {content.addNewAddress}
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="profile-pg-inner-wrap profile-pg-inner-no-add p-3 bg-white radius-10 profile-pg-mb-30">
              <div className="profile-pg-sa-no-address-main-wrap text-center">
                <img
                  src={buildImg}
                  alt=""
                  className="saveAddressImg img-fluid mb-5"
                />
                <div className="pp-sa-no-add-wrap mt-2 mb-5">
                  <h2 className="pp-na-ttl mt-0 mb-3">
                    {content.noAddressesSaved}
                  </h2>
                  <p className="pp-na-text mb-0">{content.noAddressesList}</p>
                </div>
                <Button
                  color="secondary pp-no-addr-btn py-3 px-3"
                  onClick={() => this.openingNewAddressHandler()}
                >
                  {content.addAddress}
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Modal for Add New Address start */}
        <Modal
          className="cm-small-modal-6"
          isOpen={this.state && this.state.addingNewAddressCheck}
          toggle={() => this.newAddressModalClose()}
        >
          <ModalHeader
            className="add-addr-title-bar p-4 menu-text "
            close={
              <img
                src={closeImg}
                alt=""
                onClick={() => this.newAddressModalClose()}
              />
            }
          >
            {content.addNewAddress}
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                doorNo: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                country: "",
                pinCode: "",
                phone: "",
              }}
              validationSchema={() => {
                const hn = this.state?.countryName;
                //@ts-ignore
                switch (hn?.toLowerCase()) {
                  case "india":
                    return Yup.object().shape({
                      name: Yup.string()
                        .min(2, "Name is Too Short")
                        .max(20, "Maximum 20 Characters are allowed")
                        .required("Name is Required"),
                      doorNo: Yup.string().required(
                        "Flat/House/Apartment No. is Required"
                      ),
                      addressLine1: Yup.string()
                        .min(3, "Address Line 1 is Too Short")
                        .required("Address Line 1 is Required"),
                      // .matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 1")
                      // .matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 2")
                      addressLine2: Yup.string().min(
                        3,
                        "Address Line 2 is Too Short"
                      ),
                      city: Yup.string()
                        .min(3, "City is Too Short")
                        .required("City is Required"),
                      state: Yup.string()
                        .min(2, "State is Minimum 2 Characters")
                        .required("State is Required"),
                      country: Yup.string()
                        .min(2, "Country is Too Short")
                        .required("Country is Required"),
                      pinCode: Yup.number()
                        .min(100000, "Pin Code is Minimum 6 digits")
                        .max(999999, "Pin Code is Maximum 6 digits")
                        .required("Pin Code is Required"),
                      phone: Yup.number()
                        .min(1000000000, "Phone Number Minimum 10 digits")
                        .max(9999999999, "Phone Number Maximum 10 digits")
                        .required("Phone Number is Required"),
                    });
                  default:
                    return Yup.object().shape({
                      name: Yup.string()
                        .min(2, "Name is Too Short")
                        .max(20, "Maximum 20 Characters are allowed")
                        .required("Name is Required"),
                      doorNo: Yup.string().required(
                        "Flat/House/Apartment No. is Required"
                      ),
                      addressLine1: Yup.string()
                        .min(3, "Address Line 1 is Too Short")
                        .required("Address Line 1 is Required"),
                      // .matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 1")
                      addressLine2: Yup.string().min(
                        3,
                        "Address Line 2 is Too Short"
                      ),
                      // .required('Address Line 2 is Required').matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 2"),
                      city: Yup.string()
                        .min(3, "City is Too Short")
                        .required("City is Required"),
                      state: Yup.string()
                        .min(2, "State is Minimum 2 Characters")
                        .required("State is Required"),
                      country: Yup.string()
                        .min(2, "Country is Too Short")
                        .required("Country is Required"),
                      pinCode: Yup.string()
                        .min(3, "Pin Code is Minimum 3 Characters")
                        .required("Pin Code is Required"),
                      phone: Yup.number()
                        .min(1000000000, "Phone Number Minimum 10 digits")
                        .max(9999999999, "Phone Number Maximum 10 digits")
                        .required("Phone Number is Required"),
                    });
                }
              }}
              onSubmit={(values) => {
                let finalValues: any;
                finalValues = {
                  ...values,
                  country2: values.country.toLowerCase(),
                };
                this.addNewAddressHandler(finalValues);
              }}
            >
              {(props) => {
                const {
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  touched,
                  errors,
                  values,
                } = props;
                return (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    style={{ padding: 10 }}
                  >
                    <FormGroup row>
                      <Label htmlFor="name" className="modalTitleInputLable">
                        {content.name}
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      <FormText color="danger">
                        {errors.name && touched.name ? errors.name : ""}
                      </FormText>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="doorNo" className="modalTitleInputLable">
                        {content.flatHouseApartment}
                      </Label>
                      <Input
                        type="text"
                        name="doorNo"
                        id="doorNo"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.doorNo}
                      />
                      <FormText color="danger">
                        {errors.doorNo && touched.doorNo ? errors.doorNo : ""}
                      </FormText>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="addressLine1"
                        className="modalTitleInputLable"
                      >
                        {content.addressLine1}
                      </Label>
                      <Input
                        type="text"
                        name="addressLine1"
                        id="addressLine1"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.addressLine1}
                      />
                      <FormText color="danger">
                        {errors.addressLine1 && touched.addressLine1
                          ? errors.addressLine1
                          : ""}
                      </FormText>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="addressLine2"
                        className="modalTitleInputLable"
                      >
                        {content.addressLine2}
                      </Label>
                      <Input
                        type="text"
                        name="addressLine2"
                        id="addressLine2"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.addressLine2}
                      />
                      <FormText color="danger">
                        {errors.addressLine2 && touched.addressLine2
                          ? errors.addressLine2
                          : ""}
                      </FormText>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="city" className="modalTitleInputLable">
                        {content.city}
                      </Label>
                      <Input
                        type="text"
                        name="city"
                        id="city"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                      />
                      <FormText color="danger">
                        {errors.city && touched.city ? errors.city : ""}
                      </FormText>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="state" className="modalTitleInputLable">
                        {content.state}
                      </Label>
                      <Input
                        type="text"
                        name="state"
                        id="state"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.state}
                      />
                      <FormText color="danger">
                        {errors.state && touched.state ? errors.state : ""}
                      </FormText>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="country" className="modalTitleInputLable">
                        {content.country}
                      </Label>
                      <Input
                        type="text"
                        name="country"
                        id="country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                      />
                      <FormText color="danger">
                        {errors.country && touched.country
                          ? errors.country
                          : ""}
                      </FormText>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="pinCode" className="modalTitleInputLable">
                        {content.pinCode}
                      </Label>
                      {/* @ts-ignore */}
                      <Input
                        type={
                          this.state?.countryName?.toLowerCase() == "india"
                            ? "number"
                            : "text"
                        }
                        name="pinCode"
                        id="pinCode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.pinCode}
                      />
                      <FormText color="danger">
                        {errors.pinCode && touched.pinCode
                          ? errors.pinCode
                          : ""}
                      </FormText>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="phone" className="modalTitleInputLable">
                        {content.phoneNumber}
                      </Label>
                      <Input
                        type="number"
                        name="phone"
                        id="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                      />
                      <FormText color="danger">
                        {errors.phone && touched.phone ? errors.phone : ""}
                      </FormText>
                    </FormGroup>
                    <FormGroup>
                      <div className="mt-4 pt-1 yt-otp-sd-wrap">
                        {this.state.showSpinner ? (
                          <CgSpinner
                            style={{
                              color: "black",
                              fontSize: 32,
                              width: "100%",
                              margin: 10,
                            }}
                            className="w3-spin"
                          />
                        ) : (
                          <Button
                            type="submit"
                            className="saveProfileBtn"
                            style={{ width: "100%" }}
                          >
                            {content.saveAddress}
                          </Button>
                        )}
                      </div>
                    </FormGroup>
                  </form>
                );
              }}
            </Formik>
          </ModalBody>
        </Modal>
        {/* Modal fro Add New Address End */}

        {/* Modal for Edit Address Based on Selected Index start */}
        <Modal
          isOpen={this.state.editAddressChecked}
          toggle={() =>
            this.setState({
              ...this.state,
              editAddressChecked: !this.state.editAddressChecked,
            })
          }
        >
          <ModalHeader
            toggle={() =>
              this.setState({
                ...this.state,
                editAddressChecked: !this.state.editAddressChecked,
              })
            }
            close={
              <img
                src={closeImg}
                onClick={() =>
                  this.setState({
                    ...this.state,
                    editAddressChecked: !this.state.editAddressChecked,
                  })
                }
              />
            }
          >
            {content.editAddress}
          </ModalHeader>
          <ModalBody className="py-4 px-5 yt-edit-add-body">
            <div className="edit-add-addr-body-wrap">
              {this.state.userAddress && this.state.userAddress.length > 0 ? (
                <>
                  {this.state.userAddress.map((ele, index) => {
                    if (ele.attributes.id == this.state.deliveryAddressID) {
                      let eleData = ele.attributes;
                      return (
                        <Formik
                          initialValues={{
                            name: eleData.name || "",
                            doorNo: eleData.flat_no || "",
                            addressLine1: eleData.address || "",
                            addressLine2: eleData.address_line_2 || "",
                            city: eleData.city || "",
                            state: eleData.state || "",
                            country: eleData.country || "",
                            pinCode: eleData.zip_code || "",
                            phone: eleData.phone_number || "",
                          }}
                          // validationSchema={addNewAddressSchema}
                          validationSchema={() => {
                            const hn = this.state?.countryName;
                            //@ts-ignore
                            switch (hn?.toLowerCase()) {
                              case "india":
                                return Yup.object().shape({
                                  name: Yup.string()
                                    .min(2, "Name is Too Short")
                                    .max(
                                      20,
                                      "Maximum 20 Characters are allowed"
                                    )
                                    .required("Name is Required"),
                                  doorNo: Yup.string().required(
                                    "Flat/House/Apartment No. is Required"
                                  ),
                                  addressLine1: Yup.string()
                                    .min(3, "Address Line 1 is Too Short")
                                    .required("Address Line 1 is Required"),
                                  // .matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 1")
                                  addressLine2: Yup.string().min(
                                    3,
                                    "Address Line 2 is Too Short"
                                  ),
                                  // .matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 2").required('Address Line 2 is Required'),
                                  city: Yup.string()
                                    .min(3, "City is Too Short")
                                    .required("City is Required"),
                                  state: Yup.string()
                                    .min(2, "State is Minimum 2 Characters")
                                    .required("State is Required"),
                                  country: Yup.string()
                                    .min(2, "Country is Too Short")
                                    .required("Country is Required"),
                                  pinCode: Yup.number()
                                    .min(100000, "Pin Code is Minimum 6 digits")
                                    .max(999999, "Pin Code is Maximum 6 digits")
                                    .required("Pin Code is Required"),
                                  phone: Yup.number()
                                    .min(
                                      1000000000,
                                      "Phone Number Minimum 10 digits"
                                    )
                                    .max(
                                      9999999999,
                                      "Phone Number Maximum 10 digits"
                                    )
                                    .required("Phone Number is Required"),
                                });
                              default:
                                return Yup.object().shape({
                                  name: Yup.string()
                                    .min(2, "Name is Too Short")
                                    .max(
                                      20,
                                      "Maximum 20 Characters are allowed"
                                    )
                                    .required("Name is Required"),
                                  doorNo: Yup.string().required(
                                    "Flat/House/Apartment No. is Required"
                                  ),
                                  addressLine1: Yup.string()
                                    .min(3, "Address Line 1 is Too Short")
                                    .required("Address Line 1 is Required"),
                                  // .matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 1")
                                  addressLine2: Yup.string().min(
                                    3,
                                    "Address Line 2 is Too Short"
                                  ),
                                  //.matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 2") .required('Address Line 2 is Required'),
                                  city: Yup.string()
                                    .min(3, "City is Too Short")
                                    .required("City is Required"),
                                  state: Yup.string()
                                    .min(2, "State is Minimum 2 Characters")
                                    .required("State is Required"),
                                  country: Yup.string()
                                    .min(2, "Country is Too Short")
                                    .required("Country is Required"),
                                  pinCode: Yup.string()
                                    .min(3, "Pin Code is Minimum 3 Characters")
                                    .required("Pin Code is Required"),
                                  phone: Yup.number()
                                    .min(
                                      1000000000,
                                      "Phone Number Minimum 10 digits"
                                    )
                                    .max(
                                      9999999999,
                                      "Phone Number Maximum 10 digits"
                                    )
                                    .required("Phone Number is Required"),
                                });
                            }
                          }}
                          onSubmit={(values) => {
                            let finalValues: any;
                            const da = values.country;
                            finalValues = {
                              ...values,
                              country2: da.toLowerCase(),
                            };
                            this.updateAddressBasedonId(
                              finalValues,
                              this.state.deliveryAddressID
                            );
                          }}
                        >
                          {(props) => {
                            const {
                              handleBlur,
                              handleChange,
                              handleSubmit,
                              touched,
                              errors,
                              values,
                            } = props;
                            return (
                              <form
                                onSubmit={handleSubmit}
                                noValidate
                                style={{ padding: 10 }}
                              >
                                <FormGroup row>
                                  <Label
                                    htmlFor="name"
                                    className="modalTitleInputLable"
                                  >
                                    {content.name}
                                  </Label>
                                  <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                  />
                                  <FormText color="danger">
                                    {errors.name && touched.name
                                      ? errors.name
                                      : ""}
                                  </FormText>
                                </FormGroup>
                                <FormGroup row>
                                  <Label
                                    htmlFor="doorNo"
                                    className="modalTitleInputLable"
                                  >
                                    {content.flatHouseApartment}
                                  </Label>
                                  <Input
                                    type="text"
                                    name="doorNo"
                                    id="doorNo"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.doorNo}
                                  />
                                  <FormText color="danger">
                                    {errors.doorNo && touched.doorNo
                                      ? errors.doorNo
                                      : ""}
                                  </FormText>
                                </FormGroup>
                                <FormGroup row>
                                  <Label
                                    htmlFor="addressLine1"
                                    className="modalTitleInputLable"
                                  >
                                    {content.addressLine1}
                                  </Label>
                                  <Input
                                    type="text"
                                    name="addressLine1"
                                    id="addressLine1"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.addressLine1}
                                  />
                                  <FormText color="danger">
                                    {errors.addressLine1 && touched.addressLine1
                                      ? errors.addressLine1
                                      : ""}
                                  </FormText>
                                </FormGroup>
                                <FormGroup row>
                                  <Label
                                    htmlFor="addressLine2"
                                    className="modalTitleInputLable"
                                  >
                                    {content.addressLine2}
                                  </Label>
                                  <Input
                                    type="text"
                                    name="addressLine2"
                                    id="addressLine2"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.addressLine2}
                                  />
                                  <FormText color="danger">
                                    {errors.addressLine2 && touched.addressLine2
                                      ? errors.addressLine2
                                      : ""}
                                  </FormText>
                                </FormGroup>
                                <FormGroup row>
                                  <Label
                                    htmlFor="city"
                                    className="modalTitleInputLable"
                                  >
                                    {content.city}
                                  </Label>
                                  <Input
                                    type="text"
                                    name="city"
                                    id="city"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city}
                                  />
                                  <FormText color="danger">
                                    {errors.city && touched.city
                                      ? errors.city
                                      : ""}
                                  </FormText>
                                </FormGroup>
                                <FormGroup row>
                                  <Label
                                    htmlFor="state"
                                    className="modalTitleInputLable"
                                  >
                                    {content.state}
                                  </Label>
                                  <Input
                                    type="text"
                                    name="state"
                                    id="state"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.state}
                                  />
                                  <FormText color="danger">
                                    {errors.state && touched.state
                                      ? errors.state
                                      : ""}
                                  </FormText>
                                </FormGroup>
                                <FormGroup row>
                                  <Label
                                    htmlFor="country"
                                    className="modalTitleInputLable"
                                  >
                                    {content.country}
                                  </Label>
                                  <Input
                                    type="text"
                                    name="country"
                                    id="country"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                  />
                                  <FormText color="danger">
                                    {errors.country && touched.country
                                      ? errors.country
                                      : ""}
                                  </FormText>
                                </FormGroup>
                                <FormGroup row>
                                  <Label
                                    htmlFor="pinCode"
                                    className="modalTitleInputLable"
                                  >
                                    {content.pinCode}
                                  </Label>
                                  {/* @ts-ignore */}
                                  <Input
                                    type={
                                      this.state?.countryName?.toLowerCase() ==
                                      "india"
                                        ? "number"
                                        : "text"
                                    }
                                    name="pinCode"
                                    id="pinCode"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.pinCode}
                                  />
                                  <FormText color="danger">
                                    {errors.pinCode && touched.pinCode
                                      ? errors.pinCode
                                      : ""}
                                  </FormText>
                                </FormGroup>
                                <FormGroup row>
                                  <Label
                                    htmlFor="phone"
                                    className="modalTitleInputLable"
                                  >
                                    {content.phoneNumber}
                                  </Label>
                                  <Input
                                    type="number"
                                    name="phone"
                                    id="phone"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                  />
                                  <FormText color="danger">
                                    {errors.phone && touched.phone
                                      ? errors.phone
                                      : ""}
                                  </FormText>
                                </FormGroup>
                                <FormGroup>
                                  <div className="mt-4 pt-1 yt-otp-sd-wrap">
                                    {this.state.showSpinner ? (
                                      <CgSpinner
                                        style={{
                                          color: "black",
                                          fontSize: 32,
                                          width: "100%",
                                          margin: 10,
                                        }}
                                        className="w3-spin"
                                      />
                                    ) : (
                                      <Button
                                        type="submit"
                                        className="saveProfileBtn"
                                        style={{ width: "100%" }}
                                      >
                                        {content.saveAddress}
                                      </Button>
                                    )}
                                  </div>
                                </FormGroup>
                              </form>
                            );
                          }}
                        </Formik>
                      );
                    }
                  })}
                </>
              ) : (
                ""
              )}
            </div>
          </ModalBody>
        </Modal>
        {/* Modal for Edit Address Based on Selected Index end */}
        {/* Modal for Delete a Address Start */}
        <Modal
          modalClassName="popopop"
          className="cm-small-modal-4"
          isOpen={this.state.isDeleteAddressCheck}
          toggle={() => this.deleteAddressModalClose()}
          centered={true}
        >
          <ModalHeader
            className="delete-addr-title-bar border-0"
            toggle={() => this.deleteAddressModalClose()}
          >
            <span>{content.deleteAddress}</span>
          </ModalHeader>
          <ModalBody className="py-4">
            <div className="text-center delete-addr-body-text px-0 pt-4">
              {content.areYouSureDeleteAddress}
            </div>
          </ModalBody>
          <ModalFooter className="delete-addr-bottom-bar p-1 border-1 d-flex justify-content-between">
            <Button
              color="secondary pp-delete-addr-btn-modal p-3 pp-delete-addr-btn-light-grey mr-1"
              onClick={() => this.deleteAddressModalClose()}
            >
              {content.cancel}
            </Button>
            <span className="yt-form-spacer" />
            <Button
              color="secondary pp-delete-addr-btn-modal p-3 pp-delete-addr-btn-dark-grey ml-1"
              onClick={() => this.deleteAddressBasedOnId()}
            >
              {content.yesDelete}
            </Button>
          </ModalFooter>
        </Modal>
        {/* Modal for Delete a Address end */}
        {/* Modal for Default Address start */}
        <Modal
          isOpen={this.state && this.state.isDefaultAddressChanged}
          toggle={() => this.closeDefaultAddressModal()}
          className="cm-small-modal-4"
          centered={true}
          modalClassName="popopop"
        >
          <ModalHeader
            toggle={() => this.closeDefaultAddressModal()}
            className="remove-wh-lst-title-bar1  border-0"
          >
            <span>{content.defaultAdreess}</span>
          </ModalHeader>
          <ModalBody className="py-4">
            <div className="text-center wh-lst-body-text pt-4">
              {content.defaultaddressContent}
            </div>
          </ModalBody>
          <ModalFooter className="remove-wh-lst-bottom-bar p-1 d-flex">
            <Button
              color="secondary pp-remove-wh-lst-btn-modal p-3 pp-remove-wh-lst-btn-dark-grey"
              onClick={() => this.closeDefaultAddressModal()}
              block
            >
              {content.okay}
            </Button>
          </ModalFooter>
        </Modal>
        {/* Modal for Default Address End */}
      </>
    );
    // Customizable Area End
  }
}
