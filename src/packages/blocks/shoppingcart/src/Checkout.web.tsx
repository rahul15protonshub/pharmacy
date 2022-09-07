//@ts-nocheck;
import React, { Fragment, useState, useEffect } from "react";
import { emptyCheck, checkCheck, closeImg, addressImage } from "./assetsWeb";
import { Formik } from "formik";
import * as Yup from "yup";
import CheckoutController, {
  Props,
  configJSON,
} from "./CheckoutController.web";
import { FaLessThanEqual, FaLongArrowAltLeft } from "react-icons/fa";
//@ts-ignore
import isEmpty from "lodash/isEmpty";
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
  Button,
  Table,
  CardBody,
  Card,
  Progress,
  ModalFooter,
} from "reactstrap";
import { withRouter } from "react-router-dom";
import BreadCrumbs from "../../studio-store-ecommerce-components/src/BreadCrumbs";
import { Scrollbars } from "react-custom-scrollbars";
//@ts-ignore
import content from "../../studio-store-ecommerce-components/src/content";
import Checkbox from "../../studio-store-ecommerce-components/src/UI/Checkbox";
import CustomCard from "../../studio-store-ecommerce-components/src/Card";
import "../assets/css/index.scoped.css";
import "../assets/css/modalAddressField.css";
import "../assets/css/index.css";
import { BsFileEarmarkText } from "react-icons/bs";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";
import { MultiSelect } from "react-multi-select-component";

// cart Amount //
function CartAmount(props: any) {
  // Customizable Area Start
  const wholeCart = props.wholeCart;
  const isCheckedShippingCharge = props.isCheckedShippingCharge;
  const [couponCode, setCouponCode] = useState("");
  const [accordianOpen, setAccordianOpen] = useState("");

  useEffect(() => {
    if (props.wholeCart?.coupon?.attributes?.code != undefined) {
      setCouponCode(props.wholeCart?.coupon?.attributes?.code);
    }
  }, [props.wholeCart?.coupon?.attributes?.code]);
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

  if (!wholeCart) {
    // Customizable Area Start
    return <div />;
    // Customizable Area End
  }

  // Customizable Area Start
  return (
    wholeCart && (
      <div className="cart-price-container">
        <div className="radius-10 bg-white yt-cart-price-lister">
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
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
                      {/* {content.inr} {wholeCart.sub_total} */}
                    </span>
                  </td>
                </tr>
              </tbody>
            </Table>

            <Table className="mb-0 cart-prodict-total-amount " borderless>
              <tbody>
                {/* <tr>
                  <td>
                    <span className="cart-product-amount">{content.taxes}</span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span className="cart-product-amount">
                      {
                        JSON.parse(localStorage.getItem("countryCode") ?? "{}")
                          ?.countryCode
                      }{" "}
                      {parseFloat(wholeCart.total_tax).toFixed(2)}
                    </span>
                  </td>
                </tr> */}
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
            {/* {Object.keys(JSON.parse(localStorage.getItem("buyNow") || "{}"))
              .length == 0 && ( */}
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
                            {parseFloat(wholeCart.applied_discount).toFixed(2)}
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
            {/* )} */}
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
            type="submit"
            style={{ width: "100%" }}
            disabled={!isCheckedShippingCharge}
            color="primary-1"
          >
            {content.proceed}
          </Button>
          {/* </Ripple> */}
        </div>
      </div>
    )
  );
  // Customizable Area End
}

const CartProductListData: any = withRouter((props: any) => {
  // Customizable Area Start
  function getProducts() {
    var products: any = [];
    products = props.cart.map((item: any, idx: any) => {});
  }
  useEffect(()=>{
    props.wholeCart?.order_items?.filter((item: any) => {
        if(item.attributes.catalogue.attributes.prescription == true){
          props.isPrescriptionExist(true)
        }
      });
  },[props.wholeCart])
  return (
    <CartAmount
      wholeCart={props.wholeCart}
      toApplyCoupon={props.toApplyCoupon}
      couponSuccess={props.couponSuccess}
      deleteCoupon={props.deleteCoupon}
      isCheckedShippingCharge={props.isCheckedShippingCharge}
    />
  );
  // Customizable Area End
});

const PrescriptionModal = (props: any) => {
  const [prescriptionFile, setPrescriptionFile] = useState<any>([]);
  const [presProduct, setpresProduct] = useState<any>([]);
  const [progress, setProgress] = useState<any>([]);
  const [uploading, setUploading] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>([]);
  const [preFiles, setPreFiles] = useState<any>([]);
  const [dropDown, setDropdown] = useState([
    {
      id: 0,
      options: presProduct && presProduct,
      selected: [],
    },
  ]);
  const { presModal, setIsPrescModal,wholeCart,uploadPrescription,submitValue,state,history } = props;

  useEffect(() => {
    let preProduct = wholeCart.order_items.filter((item: any) => {
      return item.attributes.catalogue.attributes.prescription == true;
    });
    preProduct.filter((elm: any) => {
      setpresProduct((presProduct: any) => [
        ...presProduct,
        { label: elm.attributes.catalogue.attributes.name, value: elm.id},
      ]);
    });
  }, [props.wholeCart]);

  useEffect(() => {
    if (presProduct.length > 0) {
      let arr1= [...new Map(presProduct?.map((item:any) =>[item["label"],item])).values()]
      let newArr = dropDown.map((item, i) => {
        return { ...item, options:arr1 };
      });
      setDropdown(newArr);
    }
  }, [presProduct]);

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL: any = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleUpload = () => {
    let itemIds: any = [];
    dropDown.map((elm: any) => {
      elm.options.map((item: any) => {
        itemIds.push(parseInt(item.value));
      });
    });
    let itemIds1: any = [];
    dropDown.map((elm: any) => {
      elm.options.map((item: any) => {
        let id = parseInt(item.value) + 1;
        itemIds1.push(id);
      });
    });
    let data: any = {
      order_items: [
        {
          order_item_ids: itemIds,
          prescription_files: preFiles,
        },
      ],
    };
  

    let res = uploadPrescription(data);
    if(res){
      if(submitValue.isShippingAddressSame==true){
         //  @ts-ignore
              history.push({
                pathname: "/order-summary",
                state: {
                  addressData: submitValue.billing_address,
                  billing_address_Data: submitValue.billing_address,
                  cardtData:state.wholeCart,
                  cart:state.cart,
                  couponData:state.couponSuccess,
                },
              });
      }else{
         //  @ts-ignore
              history.push({
                pathname: "/order-summary",
                state: {
                  addressData: submitValue.address,
                  billing_address_Data: submitValue.billing_address,
                  cardtData:state.wholeCart,
                  cart:state.cart,
                  couponData:state.couponSuccess,
                },
              });
      }
    }
  
  };
  // cheek input value is valid or not {rf}
  const checkValidFile = (file: any) => {
    const filePath = file[0].path;
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif|.pdf|.docx)/;

    if (!allowedExtensions.exec(filePath)) {
      toast.warning("Please Upload PDF or Image.");
      return false;
    }
    return true;
  };
  // function for handle Prescription Upload {rf}
  function handlePrescriptionUpload(event: any, index: any) {
    if (checkValidFile(event)) {
      var file = event[0];
      event.map((elm: any) => {
        getBase64(file)
          .then((result) => {
            file["base64"] = result;
            setPreFiles((preFiles: any) => [...preFiles, result]);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(event: any) {
        file.url = reader.result;
        setProgress([
          ...progress,
          Math.round((100 * event.loaded) / event.total),
        ]);
        setPrescriptionFile((prescriptionFile: any) => [
          ...prescriptionFile,
          file,
        ]);
        let obj = {
          id: index,
          file: file.path,
        };
        setUploading((uploading: any) => [...uploading, obj]);
        toast.success("File upload Successfully");
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    }
  }

  const handleDeleteUploadFile = (id: any) => {
    setPrescriptionFile(
      prescriptionFile.filter((elm: any, index: any) => index !== id)
    );
    setUploading(uploading.filter((el: any) => el.id !== id));
    setProgress(progress.filter((item: any, index: any) => index != id));
  };
  const handleUploadAnotherPre = () => {
    setSelectedProduct([]);
    let remainProduct = dropDown[dropDown.length - 1].options.filter(
      (o1: { value: any }) =>
        !selectedProduct.some((o2: { value: any }) => o1.value === o2.value)
    );
    let obj = {
      id: dropDown.length,
      options: remainProduct.reduce((a: any, b: any) => a.concat(b), []),
      selected: [],
    };
    setDropdown((dropDown) => [...dropDown, obj]);
  };
  const handleOnSelect = (e: any, index: number) => {
    let proArr: any = [];
    e.map((elm: any) => {
      proArr.push(elm);
    });
    setSelectedProduct(proArr);
    let newArr = dropDown.map((item, i) => {
      if (index == i) {
        return { ...item, selected: e };
      } else {
        return item;
      }
    });
    setDropdown(newArr);
  };
  const removeUploadFile = (id: any) => {
    let updateArray = dropDown.filter((elm: any, index: any) => index != id);
    setDropdown(updateArray);
  };
  return (
    <div className={` modal-wrap`}>
      <Modal
        isOpen={presModal}
        toggle={() => setIsPrescModal(!presModal)}
        centered
      >
        <ModalHeader
          toggle={() => setIsPrescModal(!presModal)}
          style={{ border: "none" }}
          closed
        >
          <h5 className="modalTitle"> Prescription</h5>
        </ModalHeader>
        <ModalBody>
          <div className="modalContent">
            <h6 className="sub-heading">Please upload the prescription </h6>
            {dropDown &&
              dropDown.map((elm: any, index: any) => {
                return (
                  <>
                    {index != 0 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <span
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => removeUploadFile(index)}
                        >
                          x
                        </span>
                      </div>
                    )}
                    <div className="dropzone">
                      {uploading.length > 0 &&
                      uploading[index] &&
                      uploading[index].id == index ? (
                        <div className="d-flex justify-content-betweeen align-items-center w-100">
                          <div className="file-icon">
                            <BsFileEarmarkText size={"2rem"} />
                          </div>
                          <div style={{ width: "80%" }}>
                            <div className="d-flex justify-content-between align-items-center w-100">
                              <h6 style={{ color: "#000" }}>
                                {prescriptionFile &&
                                  prescriptionFile.length > 0 &&
                                  prescriptionFile[index] &&
                                  prescriptionFile[index].path}{" "}
                                {(
                                  prescriptionFile &&
                                  prescriptionFile.length > 0 &&
                                  prescriptionFile[index] &&
                                  prescriptionFile[index].size / 1024 / 1024
                                ).toFixed(2)}{" "}
                                mb
                              </h6>
                              <div
                                style={{
                                  color: "#3FC1CB",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleDeleteUploadFile(index)}
                              >
                                x
                              </div>
                            </div>
                            <Progress value={progress[index]} />
                            <div className="d-flex justify-content-start mt-1">
                              <span
                                style={{ color: "#000" }}
                              >{`${progress[index]}% done`}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Dropzone
                          multiple={true}
                          onDrop={(e: any) =>
                            handlePrescriptionUpload(e, index)
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <p style={{ color: "#000000" }}>
                                Drag & Drop the document here
                              </p>
                              <p style={{ color: "#000000" }}>OR</p>
                              <Button color="secondary" className="browse-btn">
                                Browse File
                              </Button>
                            </div>
                          )}
                        </Dropzone>
                      )}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span style={{ color: "#000000" }}>Prescription For</span>
                      <MultiSelect
                        options={elm.options}
                        value={elm.selected}
                        onChange={(e: any) => handleOnSelect(e, index)}
                        labelledBy="Select Product"
                        disableSearch={true}
                        className="multiselect dropDownItem"
                        disabled={dropDown.length > index + 1 ? true : false}
                      />
                    </div>
                  </>
                );
              })}
          </div>
        </ModalBody>
        <ModalFooter
              className="justify-content-between"
              style={{ border: "none" }}
            >
              {Object.keys(JSON.parse(localStorage.getItem("buyNow") || "{}")).length == 0 &&dropDown[dropDown.length - 1].options.length !=
              selectedProduct.length ? (
                <Button
                  className="textDecorationNone px-0"
                  color="link"
                  onClick={handleUploadAnotherPre}
                  disabled={
                    selectedProduct.length != 0 && progress.length != 0
                      ? false
                      : true
                  }
                >
                  + Add prescription
                </Button>
              ) : (
                <div></div>
              )}
              <div className="d-flex btnsize">
                <Button
                  className="cancel px-1 me-3 "
                  color="link"
                  onClick={() => setIsPrescModal(false)}
                >
                  cancel
                </Button>{" "}
                <Button
                  disabled={
                    dropDown[dropDown.length - 1].options.length !=
                    selectedProduct.length
                      ? true
                      : false || progress[progress.length-1] != 100
                      ? true
                      : false
                  }
                  onClick={handleUpload}
                  className=" btn-btn btn-secondary yt-login-btn btn-block px-4 py-1"
                >
                  Upload
                </Button>
              </div>
            </ModalFooter> 
      </Modal>
    </div>
  );
};
export class Checkout extends CheckoutController {
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  selectAddressHandler = () => {
    this.setState({
      ...this.state,
      selectAddressCheck: true,
    });
  };
  selectAddressModalClose = () => {
    this.setState({
      ...this.state,
      selectAddressCheck: false,
    });
  };

  openingNewAddressHandler = () => {
    this.setState({
      ...this.state,
      addingNewAddressCheck: true,
    });
  };
  newAddressModalClose = () => {
    this.setState({
      ...this.state,
      addingNewAddressCheck: !this.state.addingNewAddressCheck,
    });
  };

  async componentDidMount() {
    super.componentDidMount();
    const localData = await localStorage.getItem("user");
    const tpoken = await localStorage.getItem("token");
    if (localData && tpoken) {
      const userDetails = JSON.parse(localData);
      if (userDetails?.data) {
        this.setState({
          ...this.state,
          userAddress: userDetails && userDetails.data,
          userToken: tpoken,
        });
      }
      await this.getDeliveryAddressList();
      await this.getStateList();
    }
    {
      Object.keys(JSON.parse(localStorage.getItem("buyNow") || "{}")).length ==
      0
        ? this.getCart()
        : this.postBuyNow(
            JSON.parse(localStorage.getItem("buyNow") || "{}").cat_id,
            JSON.parse(localStorage.getItem("buyNow") || "{}").sub_id,
            JSON.parse(localStorage.getItem("buyNow") || "{}")
              .subscriptionReqBodyData
          );
    }
    this.setState({
      countryName: JSON.parse(localStorage.getItem("countryCode") ?? "{}")
        ?.countryName,
    });
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    //@ts-nocheck;
    //@ts-ignore;

    // Customizable Area Start
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
        label: content?.checkOut,
        link: "/checkout",
      },
    ];
    return (
      <div className="checkout-form-wrap">
        <Formik
          initialValues={{
            address: {
              name: "",
              flat_no: "",
              address: "",
              address_line_2: "",
              city: "",
              address_state_id: "",
              country: "",
              zip_code: "",
              phone_number: "",
            },
            isShippingAddressSame: true,
            billing_address: this.state.selectedAddress,
          }}
          enableReinitialize
          validationSchema={() => {
            const nameCountry = this.state?.countryName;
            //@ts-ignore
            switch (nameCountry?.toLowerCase()) {
              case "india":
                return Yup.object({
                  isShippingAddressSame: Yup.boolean(),
                  address: Yup.object().when("isShippingAddressSame", {
                    is: false,
                    then: Yup.object({
                      name: Yup.string()
                        .matches(/^[A-Za-z]+$/, "Only letters are allowed.")
                        .min(2, "Name is Too Short")
                        .required("Name is Required"),
                      flat_no: Yup.string().required(
                        "Flat/House/Apartment No. is Required"
                      ),
                      address: Yup.string()
                        // .matches(
                        //   /^[A-Za-z0-9 ]+$/,
                        //   "Special characters are not allow in Address Line 1"
                        // )
                        .min(3, "Address Line 1 is Too Short")
                        .required("Address Line 1 is Required"),
                      address_line_2: Yup.string(),
                      // .matches(
                      //   /^[A-Za-z0-9 ]+$/,
                      //   "Special characters are not allow in Address Line 2"
                      // ),
                      city: Yup.string()
                        .min(3, "City is Too Short")
                        .required("City is Required"),
                      address_state_id: Yup.string().required(
                        "State is Required"
                      ),
                      country: Yup.string()
                        .min(2, "Country is Too Short")
                        .required("Country is Required"),
                      zip_code: Yup.number()
                        .min(100000, "Pin Code is Minimum 6 digits")
                        .max(999999, "Pin Code is Maximum 6 digits")
                        .required("Pin Code is Required"),
                      phone_number: Yup.number()
                        .min(1000000000, "Phone Number Minimum 10 digits")
                        .max(9999999999, "Phone Number Maximum 10 digits")
                        .required("Phone Number is Required"),
                    }),
                  }),
                  billing_address: Yup.object().shape({
                    name: Yup.string()
                      .min(2, "Name is Too Short")
                      .required("Name is Required"),
                    flat_no: Yup.string().required(
                      "Flat/House/Apartment No. is Required"
                    ),
                    address: Yup.string()
                      // .matches(
                      //   /^[A-Za-z0-9 ]+$/,
                      //   "Special characters are not allow in Address Line 1"
                      // )
                      .min(3, "Address Line 1 is Too Short")
                      .required("Address Line 1 is Required"),
                    address_line_2: Yup.string(),
                    // .matches(
                    //   /^[A-Za-z0-9 ]+$/,
                    //   "Special characters are not allow in Address Line 2"
                    // ),
                    city: Yup.string()
                      .min(3, "City is Too Short")
                      .required("City is Required"),
                    address_state_id: Yup.string().required(
                      "State is Required"
                    ),
                    country: Yup.string()
                      .min(2, "Country is Too Short")
                      .required("Country is Required"),
                    zip_code: Yup.number()
                      .min(100000, "Pin Code is Minimum 6 digits")
                      .max(999999, "Pin Code is Maximum 6 digits")
                      .required("Pin Code is Required"),
                    phone_number: Yup.number()
                      .min(1000000000, "Phone Number Minimum 10 digits")
                      .max(9999999999, "Phone Number Maximum 10 digits")
                      .required("Phone Number is Required"),
                  }),
                });
              default:
                return Yup.object({
                  isShippingAddressSame: Yup.boolean(),
                  address: Yup.object().when("isShippingAddressSame", {
                    is: false,
                    then: Yup.object({
                      name: Yup.string()
                        .min(2, "Name is Too Short")
                        .required("Name is Required"),
                      flat_no: Yup.string().required(
                        "Flat/House/Apartment No. is Required"
                      ),
                      address: Yup.string()
                        // .matches(
                        //   /^[A-Za-z0-9 ]+$/,
                        //   "Special characters are not allow in Address Line 1"
                        // )
                        .min(3, "Address Line 1 is Too Short")
                        .required("Address Line 1 is Required"),
                      address_line_2: Yup.string(),
                      // .matches(
                      //   /^[A-Za-z0-9 ]+$/,
                      //   "Special characters are not allow in Address Line 2"
                      // ),
                      city: Yup.string()
                        .min(3, "City is Too Short")
                        .required("City is Required"),
                      address_state_id: Yup.string().required(
                        "State is Required"
                      ),
                      country: Yup.string()
                        .min(2, "Country is Too Short")
                        .required("Country is Required"),
                      zip_code: Yup.string()
                        .min(3, "Pin Code is Minimum 3 characters")
                        .required("Pin Code is Required"),
                      //zip_code: Yup.number().min(100000, 'Pin Code is Minimum 6 digits').max(999999, 'Pin Code is Maximum 6 digits').required('Pin Code is Required'),
                      phone_number: Yup.number()
                        .min(1000000000, "Phone Number Minimum 10 digits")
                        .max(9999999999, "Phone Number Maximum 10 digits")
                        .required("Phone Number is Required"),
                    }),
                  }),
                  billing_address: Yup.object().shape({
                    name: Yup.string()
                      .min(2, "Name is Too Short")
                      .required("Name is Required"),
                    flat_no: Yup.string().required(
                      "Flat/House/Apartment No. is Required"
                    ),
                    address: Yup.string()
                      // .matches(
                      //   /^[A-Za-z0-9 ]+$/,
                      //   "Special characters are not allow in Address Line 1"
                      // )
                      .min(3, "Address Line 1 is Too Short")
                      .required("Address Line 1 is Required"),
                    address_line_2: Yup.string(),
                    // .matches(
                    //   /^[A-Za-z0-9 ]+$/,
                    //   "Special characters are not allow in Address Line 2"
                    // ),
                    city: Yup.string()
                      .min(3, "City is Too Short")
                      .required("City is Required"),
                    address_state_id: Yup.string().required(
                      "State is Required"
                    ),
                    country: Yup.string()
                      .min(2, "Country is Too Short")
                      .required("Country is Required"),
                    zip_code: Yup.string()
                      .min(3, "Pin Code is Minimum 3 characters")
                      .required("Pin Code is Required"),
                    // zip_code: Yup.number().min(100000, 'Pin Code is Minimum 6 digits').max(999999, 'Pin Code is Maximum 6 digits').required('Pin Code is Required'),
                    phone_number: Yup.number()
                      .min(1000000000, "Phone Number Minimum 10 digits")
                      .max(9999999999, "Phone Number Maximum 10 digits")
                      .required("Phone Number is Required"),
                  }),
                });
            }
          }}
          onSubmit={(values) => {
            let finalValues: any;
            finalValues = {
              ...values,
              country2: values.address.country.toLowerCase(),
              billingCountry2: values.billing_address.country.toLowerCase(),
            };
            this.setState({
              submitValue:values
            })
            if(this.state.isPresExist){
              if(values.isShippingAddressSame == false){
                this.addNewAddressHandler(finalValues);
              }
              this.setState({
                presModal: !this.state.presModal,
              });
            }else{
              if (values.isShippingAddressSame == true) {
                //  @ts-ignore
                this.props.history.push({
                  pathname: "/order-summary",
                  state: {
                    addressData: values.billing_address,
                    billing_address_Data: values.billing_address,
                    cardtData: this.state.wholeCart,
                    cart: this.state.cart,
                    couponData: this.state.couponSuccess,
                  },
                });
              } else {
                this.addNewAddressHandler(finalValues);
                //  @ts-ignore
                this.props.history.push({
                  pathname: "/order-summary",
                  state: {
                    addressData: values.address,
                    billing_address_Data: values.billing_address,
                    cardtData: this.state.wholeCart,
                    cart: this.state.cart,
                    couponData: this.state.couponSuccess,
                  },
                });
              }
            }
           
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
              setFieldValue,
            } = props;
            return (
              <div style={{ width: "92%", margin: "0 auto" }}>
                <BreadCrumbs list={breadcrumbs} />
                <form onSubmit={handleSubmit} className="checkout-form">
                  <Row className="gx-4">
                    <Col className="checoutAddreess" lg="7" md="6">
                      <CustomCard className="mb-3">
                        <CardBody>
                          <div className="d-flex align-items-center justify-content-between mb-4">
                            <h4 className="mb-0 f-md">Address</h4>
                            <Button
                              href="javascript:void(0)"
                              color="link"
                              onClick={() => {
                                this.selectAddressHandler();
                                this.setZipCode("");
                              }}
                            >
                              Select Address
                            </Button>
                          </div>
                          <div>
                            <Row className="gx-lg-64">
                              <Col lg={6}>
                                <FormGroup>
                                  <span className="checkout-form-label">
                                    Name
                                  </span>
                                  <Input
                                    type="text"
                                    className="py-2 border-0 ps-0"
                                    name="billing_address.id"
                                    id="id"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.billing_address?.id}
                                    style={{ display: "none" }}
                                  />
                                  <Input
                                    type="text"
                                    className="py-2 border-0 ps-0"
                                    name="billing_address.name"
                                    id="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.billing_address?.name}
                                  />
                                  {errors?.billing_address?.name &&
                                  touched?.billing_address?.name ? (
                                    <FormText color="danger" className="mt-1">
                                      {errors?.billing_address?.name}
                                    </FormText>
                                  ) : (
                                    ""
                                  )}
                                </FormGroup>
                              </Col>
                              <Col lg={6}>
                                <FormGroup>
                                  <span className="checkout-form-label">
                                    Flat / House / Apartment No.
                                  </span>
                                  <Input
                                    type="text"
                                    className="py-2 border-0 ps-0"
                                    name="billing_address.flat_no"
                                    id="flat_no"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.billing_address?.flat_no}
                                  />
                                  {errors?.billing_address?.flat_no &&
                                  touched?.billing_address?.flat_no ? (
                                    <FormText color="danger" className="mt-1">
                                      {errors?.billing_address?.flat_no}
                                    </FormText>
                                  ) : (
                                    ""
                                  )}
                                </FormGroup>
                              </Col>

                              <Col lg={6}>
                                <FormGroup>
                                  <span className="checkout-form-label">
                                    Address Line 1
                                  </span>
                                  <Input
                                    type="text"
                                    className="py-2 border-0 ps-0"
                                    name="billing_address.address"
                                    id="address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.billing_address?.address}
                                  />
                                  {errors?.billing_address?.address &&
                                  touched?.billing_address?.address ? (
                                    <FormText color="danger" className="mt-1">
                                      {errors?.billing_address?.address}
                                    </FormText>
                                  ) : (
                                    ""
                                  )}
                                </FormGroup>
                              </Col>

                              <Col lg={6}>
                                <FormGroup>
                                  <span className="checkout-form-label">
                                    Address Line 2
                                  </span>
                                  <Input
                                    type="text"
                                    className="py-2 border-0 ps-0"
                                    name="billing_address.address_line_2"
                                    id="address_line_2"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={
                                      isEmpty(
                                        values?.billing_address?.address_line_2
                                      )
                                        ? ""
                                        : values?.billing_address
                                            ?.address_line_2
                                    }
                                  />
                                  {errors?.billing_address?.address_line_2 &&
                                  touched?.billing_address?.address_line_2 ? (
                                    <FormText color="danger" className="mt-1">
                                      {errors?.billing_address?.address_line_2}
                                    </FormText>
                                  ) : (
                                    ""
                                  )}
                                </FormGroup>
                              </Col>

                              {/* <Col lg={6}>
                                <FormGroup>
                                  <span className="checkout-form-label">
                                    City
                                  </span>
                                  <Input
                                    type="text"
                                    className="py-2 border-0 ps-0"
                                    name="billing_address.city"
                                    id="city"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.billing_address?.city}
                                  />
                                  {errors?.billing_address?.city &&
                                  touched?.billing_address?.city ? (
                                    <FormText color="danger" className="mt-1">
                                      {errors?.billing_address?.city}
                                    </FormText>
                                  ) : (
                                    ""
                                  )}
                                </FormGroup>
                              </Col> */}
                              <Col lg={6}>
                                <FormGroup>
                                  <span className="checkout-form-label">
                                    Pin Code{" "}
                                  </span>
                                  <Input
                                    // @ts-ignore
                                    type={
                                      this.state?.countryName?.toLowerCase() ==
                                      "india"
                                        ? "number"
                                        : "text"
                                    }
                                    data-testid={"text-input-zip-code"}
                                    className="py-2 border-0 ps-0"
                                    name="billing_address.zip_code"
                                    id="zip_code"
                                    onChange={(event) => {
                                      this.setZipCode(event.target.value);
                                      handleChange(event);
                                    }}
                                    onBlur={(event) => {
                                      this.checkShippingAggressCharge();
                                      handleBlur(event);
                                    }}
                                    value={values?.billing_address?.zip_code}
                                  />
                                  {errors?.billing_address?.zip_code &&
                                  touched?.billing_address?.zip_code ? (
                                    <FormText color="danger" className="mt-1">
                                      {errors?.billing_address?.zip_code}
                                    </FormText>
                                  ) : (
                                    ""
                                  )}
                                </FormGroup>
                              </Col>
                              <Col lg={6}>
                                <FormGroup>
                                  <span className="checkout-form-label">
                                    Country
                                  </span>
                                  <Input
                                    type="text"
                                    className="py-2 border-0 ps-0"
                                    name="billing_address.country"
                                    id="country"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.billing_address?.country}
                                  />
                                  {errors?.billing_address?.country &&
                                  touched?.billing_address?.country ? (
                                    <FormText color="danger" className="mt-1">
                                      {errors?.billing_address?.country}
                                    </FormText>
                                  ) : (
                                    ""
                                  )}
                                </FormGroup>
                              </Col>

                              <Col lg={6}>
                                <FormGroup>
                                  <span className="checkout-form-label">
                                    State
                                  </span>
                                  <Input
                                    type="select"
                                    className="py-2 border-0 ps-0 form-select"
                                    name="billing_address.address_state_id"
                                    id="address_state_id"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={
                                      values?.billing_address?.address_state_id
                                    }
                                  >
                                    <option value="">Select</option>
                                    {this.state.stateList.map((option) => (
                                      <option key={option.id} value={option.id}>
                                        {option.attributes.name}
                                      </option>
                                    ))}
                                  </Input>
                                  {errors?.billing_address?.address_state_id &&
                                  touched?.billing_address?.address_state_id ? (
                                    <FormText color="danger" className="mt-1">
                                      {errors?.billing_address.address_state_id}
                                    </FormText>
                                  ) : (
                                    ""
                                  )}
                                </FormGroup>
                              </Col>

                              <Col lg={6}>
                                <FormGroup>
                                  <span className="checkout-form-label">
                                    City
                                  </span>
                                  <Input
                                    type="text"
                                    className="py-2 border-0 ps-0"
                                    name="billing_address.city"
                                    id="city"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.billing_address?.city}
                                  />
                                  {errors?.billing_address?.city &&
                                  touched?.billing_address?.city ? (
                                    <FormText color="danger" className="mt-1">
                                      {errors?.billing_address?.city}
                                    </FormText>
                                  ) : (
                                    ""
                                  )}
                                </FormGroup>
                              </Col>

                              <Col lg={6}>
                                <FormGroup>
                                  <span className="checkout-form-label">
                                    Phone Number
                                  </span>
                                  <Input
                                    type="number"
                                    data-testid={
                                      "input-billing-address-phone-number"
                                    }
                                    className="py-2 border-0 ps-0"
                                    name="billing_address.phone_number"
                                    id="phone_number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={
                                      values?.billing_address?.phone_number
                                    }
                                  />
                                  {errors?.billing_address?.phone_number &&
                                  touched?.billing_address?.phone_number ? (
                                    <FormText color="danger" className="mt-1">
                                      {errors?.billing_address?.phone_number}
                                    </FormText>
                                  ) : (
                                    ""
                                  )}
                                </FormGroup>
                              </Col>
                              <Col lg={6}>
                                <div className="pt-4">
                                  <Checkbox
                                    label={
                                      "My billing and shipping address are the same"
                                    }
                                    id="checkout-billing-addr"
                                    name="isShippingAddressSame"
                                    checked={values.isShippingAddressSame}
                                    onChange={handleChange}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </CardBody>
                      </CustomCard>
                      {!values.isShippingAddressSame && (
                        <CustomCard className="mb-3">
                          <CardBody>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                              <h4 className="mb-0 f-md">Shipping Address</h4>
                            </div>
                            <div>
                              <Row className="gx-64">
                                <Col lg={6}>
                                  <FormGroup>
                                    <span className="checkout-form-label">
                                      Name
                                    </span>
                                    <Input
                                      type="text"
                                      className="py-2 border-0 ps-0"
                                      name="address.name"
                                      id="name"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values?.address?.name}
                                    />
                                    {errors?.address?.name &&
                                    touched?.address?.name ? (
                                      <FormText color="danger" className="mt-1">
                                        {errors?.address?.name}
                                      </FormText>
                                    ) : (
                                      ""
                                    )}
                                  </FormGroup>
                                </Col>

                                <Col lg={6}>
                                  <FormGroup>
                                    <span className="checkout-form-label">
                                      Flat / House / Apartment No.
                                    </span>
                                    <Input
                                      type="text"
                                      className="py-2 border-0 ps-0"
                                      name="address.flat_no"
                                      id="flat_no"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values?.address?.flat_no}
                                    />
                                    {errors?.address?.flat_no &&
                                    touched?.address?.flat_no ? (
                                      <FormText color="danger" className="mt-1">
                                        {errors?.address?.flat_no}
                                      </FormText>
                                    ) : (
                                      ""
                                    )}
                                  </FormGroup>
                                </Col>

                                <Col lg={6}>
                                  <FormGroup>
                                    <span className="checkout-form-label">
                                      Address Line 1
                                    </span>
                                    <Input
                                      type="text"
                                      className="py-2 border-0 ps-0"
                                      name="address.address"
                                      id="address"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values?.address?.address}
                                    />
                                    {errors?.address?.address &&
                                    touched?.address?.address ? (
                                      <FormText color="danger" className="mt-1">
                                        {errors?.address?.address}
                                      </FormText>
                                    ) : (
                                      ""
                                    )}
                                  </FormGroup>
                                </Col>

                                <Col lg={6}>
                                  <FormGroup>
                                    <span className="checkout-form-label">
                                      Address Line 2{" "}
                                    </span>
                                    <Input
                                      type="text"
                                      className="py-2 border-0 ps-0"
                                      name="address.address_line_2"
                                      id="address_line_2"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values?.address?.address_line_2}
                                    />
                                    {errors?.address?.address_line_2 &&
                                    touched?.address?.address_line_2 ? (
                                      <FormText color="danger" className="mt-1">
                                        {errors?.address?.address_line_2}
                                      </FormText>
                                    ) : (
                                      ""
                                    )}
                                  </FormGroup>
                                </Col>

                                <Col lg={6}>
                                  <FormGroup>
                                    <span className="checkout-form-label">
                                      City
                                    </span>
                                    <Input
                                      type="text"
                                      className="py-2 border-0 ps-0"
                                      name="address.city"
                                      id="city"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values?.address?.city}
                                    />
                                    {errors?.address?.city &&
                                    touched?.address?.city ? (
                                      <FormText color="danger" className="mt-1">
                                        {errors?.address?.city}
                                      </FormText>
                                    ) : (
                                      ""
                                    )}
                                  </FormGroup>
                                </Col>

                                <Col lg={6}>
                                  <FormGroup>
                                    <span className="checkout-form-label">
                                      State
                                    </span>
                                    <Input
                                      type="select"
                                      className="py-2 border-0 ps-0 form-select"
                                      name="address.address_state_id"
                                      id="address_state_id"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values?.address?.address_state_id}
                                    >
                                      <option value="">Select</option>
                                      {this.state.stateList.map((option) => (
                                        <option
                                          key={option.id}
                                          value={option.id}
                                        >
                                          {option.attributes.name}
                                        </option>
                                      ))}
                                    </Input>
                                    {errors?.address?.address_state_id &&
                                    touched?.address?.address_state_id ? (
                                      <FormText color="danger" className="mt-1">
                                        {errors?.address?.address_state_id}
                                      </FormText>
                                    ) : (
                                      ""
                                    )}
                                  </FormGroup>
                                </Col>

                                <Col lg={6}>
                                  <FormGroup>
                                    <span className="checkout-form-label">
                                      Country
                                    </span>
                                    <Input
                                      type="text"
                                      className="py-2 border-0 ps-0"
                                      name="address.country"
                                      id="country"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values?.address?.country}
                                    />
                                    {errors?.address?.country &&
                                    touched?.address?.country ? (
                                      <FormText color="danger" className="mt-1">
                                        {errors?.address?.country}
                                      </FormText>
                                    ) : (
                                      ""
                                    )}
                                  </FormGroup>
                                </Col>

                                <Col lg={6}>
                                  <FormGroup>
                                    <span className="checkout-form-label">
                                      Pin Code{" "}
                                    </span>
                                    <Input
                                      type="text"
                                      className="py-2 border-0 ps-0"
                                      name="address.zip_code"
                                      id="zip_code"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values?.address?.zip_code}
                                    />
                                    {errors?.address?.zip_code &&
                                    touched?.address?.zip_code ? (
                                      <FormText color="danger" className="mt-1">
                                        {errors?.address?.zip_code}
                                      </FormText>
                                    ) : (
                                      ""
                                    )}
                                  </FormGroup>
                                </Col>

                                <Col lg={6}>
                                  <FormGroup>
                                    <span className="checkout-form-label">
                                      Phone Number
                                    </span>
                                    <Input
                                      type="number"
                                      className="py-2 border-0 ps-0"
                                      name="address.phone_number"
                                      id="phone_number"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values?.address?.phone_number}
                                    />
                                    {errors?.address?.phone_number &&
                                    touched?.address?.phone_number ? (
                                      <FormText color="danger" className="mt-1">
                                        {errors?.address?.phone_number}
                                      </FormText>
                                    ) : (
                                      ""
                                    )}
                                  </FormGroup>
                                </Col>
                              </Row>
                            </div>
                          </CardBody>
                        </CustomCard>
                      )}
                    </Col>
                    <Col className="checoutordersummary" lg="5" md="6">
                      <CartProductListData
                        cart={this.state.cart}
                        wholeCart={this.state.wholeCart}
                        toApplyCoupon={this.toApplyCoupon}
                        couponSuccess={this.state.couponSuccess}
                        deleteCoupon={this.deleteCoupon}
                        isCheckedShippingCharge={
                          this.state.isCheckedShippingCharge
                        }
                        isPrescriptionExist={this.isPrescriptionExist}
                      />
                    </Col>
                  </Row>
                  <div className="mobileViewProceedbuttoncontainer">
                    <Col md={11}>
                      <div className="proceed-btn">
                        <Button
                          type="submit"
                          style={{ width: "100%" }}
                          disabled={!this.state.isCheckedShippingCharge}
                          color="primary-1"
                        >
                          {content.proceed}
                        </Button>
                      </div>
                    </Col>
                  </div>
                </form>
              </div>
            );
          }}
        </Formik>

        <Modal
          className="cm-small-modal-6 select-address-model"
          isOpen={this.state && this.state.selectAddressCheck}
          toggle={() => this.selectAddressModalClose()}
        >
          <ModalHeader
            className="select-addr-title-bar p-4"
            close={
              <img
                src={closeImg}
                style={{ cursor: "pointer" }}
                alt=""
                onClick={() => this.selectAddressModalClose()}
              />
            }
          >
            <span>Select Address</span>
          </ModalHeader>
          <ModalBody className="p-2 yt-cm-sadd-body">
            <div className="select-addr-body-wrap">
              <div className="profile-pg-inner-wrapper">
                <Scrollbars autoHeight autoHeightMin={400} autoHeightMax={420}>
                  <div className="profile-pg-sa-address-main-wrap px-3">
                    <ul
                      className="pp-sa-list-none p-0 m-0 pp-sa-all-addres-list"
                      style={{ listStyle: "none" }}
                    >
                      {this.state.userAddress &&
                      this.state.userAddress.length > 0 ? (
                        [
                          ...new Map(
                            this.state.userAddress?.map((item) => [
                              item["address"],
                              item,
                            ])
                          ).values(),
                        ].map((ele, index) => (
                          <li
                            key={index}
                            className={
                              this.state.deliveryId == ele.attributes.id
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              this.changeDefaultAddressHandler(ele.attributes)
                            }
                          >
                            <div className="profile-pg-inner-wrap p-4 bg-white radius-10">
                              <Row className="yt-cm-sadd-row">
                                <Col md={2} className="yt-cm-sadd-col">
                                  <div className="pp-sa-img-wrap">
                                    <img
                                      src={require("../assets/images/address-icn.png")}
                                      width="65"
                                      height="65"
                                    />
                                  </div>
                                </Col>
                                <Col md={10} className="yt-cm-sadd-col">
                                  <div className="pp-sa-info-wrap">
                                    <div className="d-flex align-items-center justify-content-between mb-3 yt-sadd-ttl-chek-img">
                                      <h2 className="pp-sa-type  my-0">
                                        {ele.attributes.name}
                                      </h2>
                                      <div
                                        className="pp-sa-action-wrap d-flex align-items-end justify-content-end"
                                        style={{ right: "10px" }}
                                      >
                                        <div className="pp-sa-delet text-right pl-3">
                                          {this.state.deliveryId &&
                                          this.state.defaultAddressCheck ? (
                                            <img
                                              src={
                                                this.state.deliveryId ==
                                                ele.attributes.id
                                                  ? checkCheck
                                                  : emptyCheck
                                              }
                                              alt=""
                                              className="img-fluid d-block ml-auto mb-2"
                                              // onClick={() => this.changeDefaultAddressHandler(ele.attributes)}
                                              width="20"
                                              height="20"
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
                                              // onClick={() => this.changeDefaultAddressHandler(ele.attributes)}
                                              width="20"
                                              height="20"
                                            />
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <p className="pp-sa-address mb-0">
                                      {ele.attributes.flat_no}{" "}
                                      {ele.attributes.address}{" "}
                                      {ele.attributes.city},
                                      {ele.attributes.state},
                                      {ele.attributes.country}{" "}
                                      {ele.attributes.pinCode}
                                    </p>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </li>
                        ))
                      ) : (
                        <div className="w3-panel w3-text-gray w3-large">
                          No existing address is available right now.
                        </div>
                      )}
                    </ul>
                  </div>
                </Scrollbars>
              </div>
              <div className="d-flex px-3 pb-4">
                <Button
                  className="mr-2"
                  color="primary-1"
                  block={true}
                  onClick={() => this.openingNewAddressHandler()}
                >
                  Add New Address
                </Button>
                <Button
                  color="primary-1"
                  block={true}
                  onClick={() => {
                    this.updateAddress(this.state.deliveryAddressID);
                  }}
                >
                  Continue
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* Modal for Add New Address start */}
        <Modal
          className="cm-small-modal-6 select-address-model"
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
            Add New Address
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                address: {
                  name: "",
                  flat_no: "",
                  address: "",
                  address_line_2: "",
                  city: "",
                  address_state_id: "",
                  country: "",
                  zip_code: "",
                  phone_number: "",
                },
                isShippingAddressSame: true,
                billing_address: {
                  name: "",
                  flat_no: "",
                  address: "",
                  address_state_id: "",
                  address_line_2: "",
                  city: "",
                  country: "",
                  zip_code: "",
                  phone_number: "",
                },
              }}
              enableReinitialize
              validationSchema={() => {
                const nameCountry = this.state?.countryName;
                //@ts-ignore
                switch (nameCountry?.toLowerCase()) {
                  case "india":
                    return Yup.object({
                      isShippingAddressSame: Yup.boolean(),
                      address: Yup.object().when("isShippingAddressSame", {
                        is: false,
                        then: Yup.object({
                          name: Yup.string()
                            .min(2, "Name is Too Short")
                            .required("Name is Required"),
                          flat_no: Yup.string().required(
                            "Flat/House/Apartment No. is Required"
                          ),
                          address: Yup.string()
                            // .matches(
                            //   /^[A-Za-z0-9 ]+$/,
                            //   "Special characters are not allow in Address Line 1"
                            // )
                            .min(3, "Address Line 1 is Too Short")
                            .required("Address Line 1 is Required"),
                          address_line_2: Yup.string(),
                          // .matches(
                          //   /^[A-Za-z0-9 ]+$/,
                          //   "Special characters are not allow in Address Line 2"
                          // ),
                          city: Yup.string()
                            .min(3, "City is Too Short")
                            .required("City is Required"),
                          address_state_id: Yup.string().required(
                            "State is Required"
                          ),
                          country: Yup.string()
                            .min(2, "Country is Too Short")
                            .required("Country is Required"),
                          zip_code: Yup.number()
                            .min(100000, "Pin Code is Minimum 6 digits")
                            .max(999999, "Pin Code is Maximum 6 digits")
                            .required("Pin Code is Required"),
                          phone_number: Yup.number()
                            .min(1000000000, "Phone Number Minimum 10 digits")
                            .max(9999999999, "Phone Number Maximum 10 digits")
                            .required("Phone Number is Required"),
                        }),
                      }),
                      billing_address: Yup.object().shape({
                        name: Yup.string()
                          .min(2, "Name is Too Short")
                          .required("Name is Required"),
                        flat_no: Yup.string().required(
                          "Flat/House/Apartment No. is Required"
                        ),
                        address: Yup.string()
                          // .matches(
                          //   /^[A-Za-z0-9 ]+$/,
                          //   "Special characters are not allow in Address Line 1"
                          // )
                          .min(3, "Address Line 1 is Too Short")
                          .required("Address Line 1 is Required"),
                        address_line_2: Yup.string(),
                        // .matches(
                        //   /^[A-Za-z0-9 ]+$/,
                        //   "Special characters are not allow in Address Line 2"
                        // ),
                        city: Yup.string()
                          .min(3, "City is Too Short")
                          .required("City is Required"),
                        address_state_id: Yup.string().required(
                          "State is Required"
                        ),
                        country: Yup.string()
                          .min(2, "Country is Too Short")
                          .required("Country is Required"),
                        zip_code: Yup.number()
                          .min(100000, "Pin Code is Minimum 6 digits")
                          .max(999999, "Pin Code is Maximum 6 digits")
                          .required("Pin Code is Required"),
                        phone_number: Yup.number()
                          .min(1000000000, "Phone Number Minimum 10 digits")
                          .max(9999999999, "Phone Number Maximum 10 digits")
                          .required("Phone Number is Required"),
                      }),
                    });
                  default:
                    return Yup.object({
                      isShippingAddressSame: Yup.boolean(),
                      address: Yup.object().when("isShippingAddressSame", {
                        is: false,
                        then: Yup.object({
                          name: Yup.string()
                            .min(2, "Name is Too Short")
                            .required("Name is Required"),
                          flat_no: Yup.string().required(
                            "Flat/House/Apartment No. is Required"
                          ),
                          address: Yup.string()
                            // .matches(
                            //   /^[A-Za-z0-9 ]+$/,
                            //   "Special characters are not allow in Address Line 1"
                            // )
                            .min(3, "Address Line 1 is Too Short")
                            .required("Address Line 1 is Required"),
                          address_line_2: Yup.string(),
                          // .matches(
                          //   /^[A-Za-z0-9 ]+$/,
                          //   "Special characters are not allow in Address Line 2"
                          // ),
                          city: Yup.string()
                            .min(3, "City is Too Short")
                            .required("City is Required"),
                          address_state_id: Yup.string().required(
                            "State is Required"
                          ),
                          country: Yup.string()
                            .min(2, "Country is Too Short")
                            .required("Country is Required"),
                          zip_code: Yup.string()
                            .min(3, "Pin Code is Minimum 3 characters")
                            .required("Pin Code is Required"),
                          //zip_code: Yup.number().min(100000, 'Pin Code is Minimum 6 digits').max(999999, 'Pin Code is Maximum 6 digits').required('Pin Code is Required'),
                          phone_number: Yup.number()
                            .min(1000000000, "Phone Number Minimum 10 digits")
                            .max(9999999999, "Phone Number Maximum 10 digits")
                            .required("Phone Number is Required"),
                        }),
                      }),
                      billing_address: Yup.object().shape({
                        name: Yup.string()
                          .min(2, "Name is Too Short")
                          .required("Name is Required"),
                        flat_no: Yup.string().required(
                          "Flat/House/Apartment No. is Required"
                        ),
                        address: Yup.string()
                          // .matches(
                          //   /^[A-Za-z0-9 ]+$/,
                          //   "Special characters are not allow in Address Line 1"
                          // )
                          .min(3, "Address Line 1 is Too Short")
                          .required("Address Line 1 is Required"),
                        address_line_2: Yup.string(),
                        // .matches(
                        //   /^[A-Za-z0-9 ]+$/,
                        //   "Special characters are not allow in Address Line 2"
                        // ),
                        city: Yup.string()
                          .min(3, "City is Too Short")
                          .required("City is Required"),
                        address_state_id: Yup.string().required(
                          "State is Required"
                        ),
                        country: Yup.string()
                          .min(2, "Country is Too Short")
                          .required("Country is Required"),
                        zip_code: Yup.string()
                          .min(3, "Pin Code is Minimum 3 characters")
                          .required("Pin Code is Required"),
                        // zip_code: Yup.number().min(100000, 'Pin Code is Minimum 6 digits').max(999999, 'Pin Code is Maximum 6 digits').required('Pin Code is Required'),
                        phone_number: Yup.number()
                          .min(1000000000, "Phone Number Minimum 10 digits")
                          .max(9999999999, "Phone Number Maximum 10 digits")
                          .required("Phone Number is Required"),
                      }),
                    });
                }
              }}
              onSubmit={(values, props) => {
                let finalValues: any;
                finalValues = {
                  ...values,
                  country2: values.address.country.toLowerCase(),
                  billingCountry2: values.billing_address.country.toLowerCase(),
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
                    className="checkout-form"
                  >
                    <FormGroup>
                      <Label
                        htmlFor="name"
                        className="checkout-form-label form-label"
                      >
                        Name
                      </Label>
                      <Input
                        type="text"
                        name="billing_address.name"
                        id="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.billing_address?.name}
                      />
                      {errors?.billing_address?.name &&
                      touched?.billing_address?.name ? (
                        <FormText
                          color="danger"
                          className="mt-1 d-inline-block"
                        >
                          {errors?.billing_address?.name}
                        </FormText>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label
                        htmlFor="flat_no"
                        className="checkout-form-label form-label"
                      >
                        Flat / House / Apartment No.
                      </Label>
                      <Input
                        type="text"
                        name="billing_address.flat_no"
                        id="flat_no"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.billing_address?.flat_no}
                      />
                      {errors?.billing_address?.flat_no &&
                      touched?.billing_address?.flat_no ? (
                        <FormText
                          color="danger"
                          className="mt-1 d-inline-block"
                        >
                          {errors?.billing_address?.flat_no}
                        </FormText>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label
                        htmlFor="address"
                        className="checkout-form-label form-label"
                      >
                        Address Line 1
                      </Label>
                      <Input
                        type="text"
                        name="billing_address.address"
                        id="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.billing_address?.address}
                      />
                      {errors?.billing_address?.address &&
                      touched?.billing_address?.address ? (
                        <FormText
                          color="danger"
                          className="mt-1 d-inline-block"
                        >
                          {errors?.billing_address?.address}
                        </FormText>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label
                        htmlFor="address_line_2"
                        className="checkout-form-label form-label"
                      >
                        Address Line 2
                      </Label>
                      <Input
                        type="text"
                        name="billing_address.address_line_2"
                        id="address_line_2"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.billing_address?.address_line_2}
                      />
                      {errors?.billing_address?.address_line_2 &&
                      touched?.billing_address?.address_line_2 ? (
                        <FormText
                          color="danger"
                          className="mt-1 d-inline-block"
                        >
                          {errors?.billing_address?.address_line_2}
                        </FormText>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label
                        htmlFor="city"
                        className="checkout-form-label form-label"
                      >
                        City
                      </Label>
                      <Input
                        type="text"
                        name="billing_address.city"
                        id="city"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.billing_address?.city}
                      />
                      {errors?.billing_address?.city &&
                      touched?.billing_address?.city ? (
                        <FormText
                          color="danger"
                          className="mt-1 d-inline-block"
                        >
                          {errors?.billing_address?.city}
                        </FormText>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label
                        htmlFor="state"
                        className="checkout-form-label form-label"
                      >
                        State
                      </Label>
                      <Input
                        type="select"
                        className="form-select"
                        name="billing_address.address_state_id"
                        id="address_state_id"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.billing_address?.address_state_id}
                      >
                        <option value="">Select</option>
                        {this.state.stateList.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.attributes.name}
                          </option>
                        ))}
                      </Input>
                      {errors?.billing_address?.address_state_id &&
                      touched?.billing_address?.address_state_id ? (
                        <FormText
                          color="danger"
                          className="mt-1 d-inline-block"
                        >
                          {errors?.billing_address?.address_state_id}
                        </FormText>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label
                        htmlFor="country"
                        className="checkout-form-label form-label"
                      >
                        Country
                      </Label>
                      <Input
                        type="text"
                        name="billing_address.country"
                        id="country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.billing_address?.country}
                      />
                      {errors?.billing_address?.country &&
                      touched?.billing_address?.country ? (
                        <FormText
                          color="danger"
                          className="mt-1 d-inline-block"
                        >
                          {errors?.billing_address?.country}
                        </FormText>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label
                        htmlFor="zip_code"
                        className="checkout-form-label form-label"
                      >
                        Pin Code
                      </Label>
                      {/* @ts-ignore */}
                      <Input
                        type={
                          this.state?.countryName?.toLowerCase() == "india"
                            ? "number"
                            : "text"
                        }
                        name="billing_address.zip_code"
                        id="zip_code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.billing_address?.zip_code}
                      />
                      {errors?.billing_address?.zip_code &&
                      touched?.billing_address?.zip_code ? (
                        <FormText
                          color="danger"
                          className="mt-1 d-inline-block"
                        >
                          {errors?.billing_address?.zip_code}
                        </FormText>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label
                        htmlFor="phone_number"
                        className="checkout-form-label form-label"
                      >
                        Phone Number
                      </Label>
                      <Input
                        type="number"
                        name="billing_address.phone_number"
                        id="phphone_numberone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.billing_address?.phone_number}
                      />
                      {errors?.billing_address?.phone_number &&
                      touched?.billing_address?.phone_number ? (
                        <FormText
                          color="danger"
                          className="mt-1 d-inline-block"
                        >
                          {errors?.billing_address?.phone_number}
                        </FormText>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Button type="submit" className="mt-4" block>
                        Save Address
                      </Button>
                    </FormGroup>
                  </form>
                );
              }}
            </Formik>
          </ModalBody>
        </Modal>
        {/* Modal fro Add New Address End */}

        {/* Modal for prescription upload start */}
        {this.state.presModal && (
          <PrescriptionModal
            presModal={this.state.presModal}
            setIsPrescModal={this.setIsPrescModal}
            wholeCart={this.state.wholeCart}
            uploadPrescription={this.postPrescriptionFile}
            submitValue={this.state.submitValue}
            state={this.state}
            history={this.props.history}
          />
        )}

        {/* Modal for prescription upload End */}
      </div>
    );
    // Customizable Area End
  }
}
// @ts-ignore
export default withRouter(Checkout);
// Customizable Area Start
// Customizable Area End
