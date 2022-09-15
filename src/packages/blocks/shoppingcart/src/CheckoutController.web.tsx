//@ts-nocheck;
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
// @ts-ignore
import isEmpty from "lodash/isEmpty";
// @ts-ignore
import cloneDeep from "lodash/cloneDeep";
// @ts-ignore
import map from "lodash/map";

export const configJSON = require("./config");

export interface Props {
  history: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  activeTab?: any;
  addingNewAddressCheck?: boolean;
  selectAddressCheck?: boolean;
  addressIndex?: number;
  editAddressChecked?: boolean;
  userAddedAddressDeatails?: any;
  userToken?: any;
  //get all deliveryAddress list
  userAddress?: Array<any>;
  //edit /delete deliveryAddress data
  deliveryAddressID?: any;
  defaultAddressCheck?: boolean;
  stateList: Array<any>;
  selectedAddress: {
    name: string;
    flat_no: string;
    address: string;
    address_line_2: string;
    city: string;
    address_state_id: string;
    country: string;
    zip_code: string;
    phone_number: string;
    id: any;
  };
  deliveryId: any;
  isShippingAddressSame: boolean;
  billingAndAddressSame: boolean;
  cart: any;
  wholeCart: any;
  cartId: any;
  catalogue_id: any;
  couponSuccess: any;
  zipCode: string;
  isCheckedShippingCharge: boolean;
  countryName?: any;
  loading?: boolean;
  buyNowCartId?: any;
  // Customizable Area Start
  address:any
  presModal:boolean;
  submitValue:any;
  isPresExist:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  history: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CheckoutController extends BlockComponent<Props, S, SS> {
  addNewAddressAPICallId: string = "";
  getUserDeliveryAddressAPICallId: string = "";
  updateDeliveryAddressByIdAPICallId: string = "";
  deleteDeliveryAddressByIdAPICallId: string = "";
  calculateShippingAddressChargeCallId: string = "";
  releaseShippingAddressChargeCallId: string = "";
  getStateListCallId: string = "";
  backListener: any;
  auth: string | null | undefined = localStorage.getItem("token");
  GetCartApiCallId: string = "";
  putUpdateCartQuantityApiCallId: string = "";
  delCartItemApiCallId: string = "";
  postWishlistApiCallId: string = "";
  postApplyCouponApiCallId: string = "";
  delCouponApiCallId: string = "";
  postBuyNowApiCallId: string = "";
  updateDeliveryAddressAPiCallID: string = "";
  postPrescription:string="";
  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.AlertMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];
    this.state = {
      selectedAddress: {
        name: "",
        flat_no: "",
        address: "",
        address_line_2: "",
        city: "",
        address_state_id: "",
        country: "",
        zip_code: "",
        phone_number: "",
        id: "",
      },
      deliveryId: "",
      isShippingAddressSame: true,
      billingAndAddressSame: false,
      cart: [],
      wholeCart: "",
      cartId: "",
      catalogue_id: "",
      couponSuccess: "",
      zipCode: "",
      isCheckedShippingCharge: false,
      stateList: [],
      // Customizable Area Start
      address:"",
      presModal:false,
      submitValue:{},
      isPresExist:false
      // Customizable Area End
    };
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    window.addEventListener("popstate", (event) => {
      this.props.history.push({
        pathname: "/cart",
        state: { refetchCart: true },
      });
      this.releaseShippingCharge();
    });
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (this.parseExpireTokenResponse(responseJson, this.state, this.props)) {
        if (apiRequestCallId === this.addNewAddressAPICallId) {
          if (responseJson.success !== false) {
            this.setState({
              ...this.state,
              userAddedAddressDeatails: responseJson?.data,
              addingNewAddressCheck: false,
              selectAddressCheck: false,
            });
            // @ts-ignore
            // window.notify([
            //   { message: responseJson?.message, type: "success" },
            // ]);
            this.getDeliveryAddressList();
          } else {
            // @ts-ignore
            window.notify([{ message: responseJson?.errors, type: "error" }]);
          }
        }
        if (apiRequestCallId === this.getStateListCallId) {
          if (responseJson.data) {
            this.setState({
              stateList: responseJson?.data,
            });
          }
        }
        // get cart
        if (apiRequestCallId === this.GetCartApiCallId) {
          if (responseJson.data) {
            this.setState({
              cart: responseJson?.data[0]?.attributes?.order_items,
              cartId: responseJson?.data[0]?.id,
              wholeCart: responseJson?.data[0]?.attributes,
            });
            localStorage.setItem(
              "cart_length",
              responseJson?.data[0]?.attributes?.order_items?.length
            );
          }
        }

        //post buynow
        if (apiRequestCallId === this.postBuyNowApiCallId) {
          this.setState({
            cart: responseJson.data.attributes.order_items,
            cartId: responseJson.data.id,
            wholeCart: responseJson.data.attributes,
          });
          localStorage.setItem(
            "cart_length",
            responseJson.data.attributes.order_items.length
          );
        }

        //apply coupon
        if (apiRequestCallId === this.postApplyCouponApiCallId) {
          if (responseJson.data) {
            // @ts-ignore
            // window.notify([
            //   { message: responseJson?.data?.message, type: "success" },
            // ]);
            this.getCart();
          } else {
            // @ts-ignore
            window.notify([
              { message: responseJson?.message, type: "warning" },
            ]);
          }
        }

        // delete coupon
        else if (apiRequestCallId === this.delCouponApiCallId) {
          // @ts-ignore
          // window.notify([
          //   { message: "Coupon deleted successfully", type: "success" },
          // ]);
          this.calculateShippingAddressCharge();
          setTimeout(() => {
            this.getCart();
          }, 500);
        } else if (apiRequestCallId === this.getUserDeliveryAddressAPICallId) {
          if (responseJson && responseJson.data) {
            map(responseJson.data, (address: any) => {
              if (address.attributes?.is_default) {
                let clonedAddress = cloneDeep(address?.attributes);
                if (clonedAddress?.address_line_2 === null) {
                  // @ts-ignore
                  clonedAddress.address_line_2 = "";
                }
                this.setState({
                  deliveryAddressID: clonedAddress,
                  deliveryId: address?.attributes?.id,
                });
              }
            });

            this.setState({
              ...this.state,
              userAddress: responseJson.data,
              defaultAddressCheck:
                responseJson.data.attributes &&
                responseJson.data.attributes.is_default,
              // deliveryAddressID: responseJson.data.atrributes && responseJson.data.attributes.id
            });
          } else {
            this.parseApiErrorResponse(responseJson);
          }
        }

        if (apiRequestCallId === this.calculateShippingAddressChargeCallId) {
          if (responseJson && responseJson.data) {
            this.setState({
              isCheckedShippingCharge: true,
              buyNowCartId: responseJson.data?.id,
              //  loading: false
            });
            //@ts-ignore
            // window.notify([
            //   { type: "success", message: "ZipCode Validate Successfully!" },
            // ]);
            setTimeout(() => {
              this.getCart();
            }, 500);
          }
          if (responseJson && responseJson.errors) {
            this.setState({
              isCheckedShippingCharge: false,
              // loading: false
            });
            this.getCart();
            //@ts-ignore
            window.notify([
              { message: responseJson?.errors?.message, type: "error" },
            ]);
          }
        }
        // Release Shipping charges
        if (apiRequestCallId === this.releaseShippingAddressChargeCallId) {
          this.props.history.push({
            pathname: "/cart",
            state: { refetchCart: true },
          });
        }
        if (apiRequestCallId === this.updateDeliveryAddressAPiCallID) {
          if (responseJson) {
          }
        }
      }
    } else if (getName(MessageEnum.AlertMessage) === message.id) {
      const title = message.getData(getName(MessageEnum.AlertTitleMessage));
      let AlertBodyMessage = message.getData(
        getName(MessageEnum.AlertBodyMessage)
      );
    }
    // Customizable Area End
  }

  //get state list
  getStateList = (): boolean => {
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getStateListCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getStateListAPIEndpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //add a new address
  addNewAddressHandler = (values: any) => {
    console.log('values :>> ', values);
    const token = localStorage.getItem("token");
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    const headers = {
      "Content-Type": "application/json",
      token,
    };
    let requestBody = {};
    const checkingExistedData =
      this.state.userAddress && this.state.userAddress.length > 0
        ? false
        : true;

    // if (values.billing_address.id) {
    //   const address = values.isShippingAddressSame
    //     ? "delivery_address_id"
    //     : "billing_address_id";
    //   requestBody = { [address]: values.billing_address.id };
    // }

    if (values.isShippingAddressSame == true) {
      requestBody = {
        ...requestBody,
        billing_same_as_shipping: values.isShippingAddressSame,
        // delivery_address_id: values.billing_address.id,
        address: {
          name: values.billing_address.name,
          flat_no: values.billing_address.flat_no,
          address: values.billing_address.address,
          address_line_2: values.billing_address.address_line_2,
          city: values.billing_address.city,
          country: values.billingCountry2,
          zip_code: values.billing_address.zip_code,
          phone_number: values.billing_address.phone_number,
          is_default: checkingExistedData,
          address_state_id: values.billing_address.address_state_id,
          billing_address: {
            name: values.billing_address.name,
            flat_no: values.billing_address.flat_no,
            address: values.billing_address.address,
            address_line_2: values.billing_address.address_line_2,
            city: values.billing_address.city,
            country: values.billingCountry2,
            zip_code: values.billing_address.zip_code,
            phone_number: values.billing_address.phone_number,
            is_default: checkingExistedData,
            address_state_id: values.billing_address.address_state_id,
          },
        },
      };
    } else {
      requestBody = {
        ...requestBody,
        billing_same_as_shipping: values.isShippingAddressSame,
        // delivery_address_id: values.billing_address.id,
        address: {
          name: values.address.name,
          flat_no: values.address.flat_no,
          address: values.address.address,
          address_line_2: values.address.address_line_2,
          address_state_id: values.address.address_state_id,
          city: values.address.city,
          country: values.country2,
          zip_code: values.address.zip_code,
          phone_number: values.address.phone_number,
          is_default: checkingExistedData,
          billing_address: {
            name: values.billing_address.name,
            flat_no: values.billing_address.flat_no,
            address: values.billing_address.address,
            address_line_2: values.billing_address.address_line_2,
            city: values.billing_address.city,
            address_state_id: values.billing_address.address_state_id,
            country: values.billingCountry2,
            zip_code: values.billing_address.zip_code,
            phone_number: values.billing_address.phone_number,
            is_default: checkingExistedData,
          },
        },
      };
    }
    this.addNewAddressAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiPostApplyCoupon +
        this.state.wholeCart.id +
        "/add_address_to_order"
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(requestBody)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putAPiMethod
    );

    if (!checkingExistedData) {
      this.updateDeliveryAddress(
        this.state.deliveryId,
        values.billing_address.zip_code
      );
    }

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  //get a delivery address by user Id
  getDeliveryAddressList = () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    const token = localStorage.getItem("token");

    this.getUserDeliveryAddressAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createNewAddressAPIEndPoint
    );

    const headers = {
      "Content-Type": "application/json",
      token,
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  calculateShippingAddressCharge = () => {
    // this.setState({
    //     loading: true
    // })
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    const token = localStorage.getItem("token");
    const httpBody = {
      cart_id: this.state?.cartId,
      zipcode: isEmpty(this.state.zipCode)
        ? this.state?.deliveryAddressID?.zip_code
        : this.state.zipCode,
    };
    //@ts-ignore
    window.notify([
      { type: "info", message: "Please Wait your ZipCode Validating!" },
    ]);

    this.calculateShippingAddressChargeCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.calculateShippingAddressChargeAPIEndPoint
    );

    const headers = {
      "Content-Type": "application/json",
      token,
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putAPiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  releaseShippingCharge = () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    const token = localStorage.getItem("token");
    const httpBody = {
      cart_id: this.state?.cartId,
    };
    this.releaseShippingAddressChargeCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.releaseShippingAddressChargeAPIEndPoint
    );

    const headers = {
      "Content-Type": "application/json",
      token,
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putAPiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // get cart items
  getCart = (): boolean => {
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.GetCartApiCallId = requestMessage.messageId;
    if (this.state.buyNowCartId) {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.endPointApiGetIsCartCreated +
          `?cart_id=${this.state.buyNowCartId}`
      );
    } else {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.endPointApiGetIsCartCreated
      );
    }
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // apply coupon
  postApplyCoupon = (code: any, amount: any): boolean => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),
    };
    const httpBody = {
      code: code,
      cart_value: amount,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postApplyCouponApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiPostApplyCoupon +
        `${this.state.cartId}/apply_coupon`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //buy now post
  postBuyNow = (
    catalogue_id: any,
    catalogue_variant_id: any,
    subscriptionBody: any
  ): boolean => {
    let buyNow = JSON.parse(localStorage.getItem("buyNow") || "{}");
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),
    };
    let httpBody;
    if (subscriptionBody) {
      httpBody = subscriptionBody;
    } else {
      httpBody = {
        catalogue_id: catalogue_id,
        catalogue_variant_id: catalogue_variant_id,
        quantity: buyNow.quantity,
      };
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postBuyNowApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApipostBuyNow
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // delete coupon
  deleteCoupon = (): boolean => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.delCouponApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiPostApplyCoupon + `${this.state.cartId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.delAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  // to apply coupon

  toApplyCoupon = (code: any, amount: any) => {
    this.state.cartId && this.postApplyCoupon(code, amount);
  };

  setZipCode = (value: any) => {
    this.setState({ zipCode: value, isCheckedShippingCharge: false });
  };
  checkShippingAggressCharge = () => {
    const { zipCode, isCheckedShippingCharge, countryName } = this.state;
    //@ts-ignore
    if (countryName.toLowerCase() == "india") {
      if (
        zipCode.trim().length > 5 &&
        zipCode.trim().length < 7 &&
        !isCheckedShippingCharge
      ) {
        this.calculateShippingAddressCharge();
      }
    } else {
      if (zipCode.trim().length >= 3) {
        this.calculateShippingAddressCharge();
      }
    }
    // if (zipCode.trim().length > 5 && zipCode.trim().length < 7 && !isCheckedShippingCharge) {
    //     this.calculateShippingAddressCharge();
    // }
  };
  //Update the Address
  updateDeliveryAddress = (id: number, pincode: any) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.updateDeliveryAddressAPiCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createNewAddressAPIEndPoint + "/" + id
    );

    const headers = {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    };
    const requestBody = {
      address: {
        zip_code: pincode,
      },
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(requestBody)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  changeDefaultAddressHandler = (data: any) => {
    console.log('data changeDefaultAddressHandler :>> ', data);
    this.setState({
      ...this.state,
      defaultAddressCheck: true,
      deliveryAddressID: data,
      deliveryId: data.id,
    });
  };

  updateAddress = (selectedAddress: any) => {
    //@ts-nocheck;
    this.setState({
      selectedAddress: this.state.deliveryAddressID,
      selectAddressCheck: false,
    });
    this.calculateShippingAddressCharge();
  };

  handleCheckBoxChange = () => {
    this.setState({
      isShippingAddressSame: !this.state.isShippingAddressSame,
    });
  };

  onHandleBack = () => {
    this.props.history.goBack();
  };
  // Customizable Area Start
  setIsPrescModal=(value:boolean)=>{
    this.setState({
      presModal:value
    })
  }

  postPrescriptionFile = (order_items: any): boolean => {
    console.log('order_items', order_items)
    // Customizable Area End
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    
    this.postPrescription = requestMessage.messageId;
  
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiUploadPrescription
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
  
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(order_items)
    );
  
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  isPrescriptionExist=(value:boolean)=>{
    this.setState({
      isPresExist:value
    })
  }
  // Customizable Area End
}
