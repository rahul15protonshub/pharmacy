//@ts-nocheck
import React from "react";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
export const configJSON = require("./config");
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

export interface Props {
  navigation: any;
  id: string;
  history: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  paymentType: string;
  cardtData: any;
  wholeCartData: any;
  addressData: any;
  razorpay_order_id: any;
  isOpen: any;
  loading:boolean
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class OrderSummaryController extends BlockComponent<
  Props,
  S,
  SS
> {
  saveAddressId: any;
  checkZipcodeId: any;
  checkAvailabilityId: any;
  releaseBlockId: any;
  placeOrderId: any;
  createOrderId: any;
  verifyRazorPayId: any;
  getUserProfileApiCallId: any;
  releaseBlockQuantityApiCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      paymentType: "stripe",
      cardtData: "",
      wholeCartData: "",
      addressData: "",
      razorpay_order_id: "",
      cartId: null,
      loading:false
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    const cartId = this.props.history.location.state.cardtData.id;
    const cardtData = this.props.history.location.state.cart;
    const addressData = this.props.history.location.state.addressData;
    const billing_address_data =
      this.props.history.location.state.billing_address_Data;
    const wholeCartData = this.props.history.location.state.cardtData;
    this.setState({
      cardtData: cardtData,
      addressData: addressData,
      billing_address_data: billing_address_data,
      wholeCartData: wholeCartData,
      cartId: cartId,
    });
    /* @ts-ignore */
    if (
      JSON.parse(
        localStorage.getItem("countryCode")
      )?.countryName?.toLowerCase() == "uk"
    ) {
      this.setState({
        paymentType: "stripe",
      });
    }
    /* @ts-ignore */
    if (
      JSON.parse(
        localStorage.getItem("countryCode")
      )?.countryName?.toLowerCase() == "india"
    ) {
      this.setState({
        paymentType: "razorpay",
      });
    }
  }

  async componentWillUnmount() {
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
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
        if (apiRequestCallId === this.emptyCartApiCallId) {
          this.setState({
            emptyCart: true,
            isFetching: false,
          });
        }
        if (apiRequestCallId === this.GetCartApiCallId) {
          if (responseJson && responseJson.data) {
            //console.log(responseJson.data[0], "here iscart")
            this.setState(
              {
                cardtData: responseJson.data[0]?.attributes?.order_items,
                cartId: responseJson.data[0]?.id,
                wholeCartData: responseJson.data[0]?.attributes,
                loading: false,
              },
              this.releaseShippingCharge
            );
            localStorage.setItem(
              "cart_length",
              responseJson.data[0].attributes.order_items.length
            );
          }
          if (
            responseJson &&
            responseJson.errors &&
            responseJson.errors.length > 0
          ) {
            this.setState({
              loading: false,
            });
            localStorage.removeItem("cart_length");

            //@ts-ignore
            //window.notify([{ type: 'error', message: responseJson.errors[0].message }])
          }
        }
        if (apiRequestCallId === this.putUpdateCartQuantityApiCallId) {
          console.log('responseJson.data.id',responseJson);
          
          if (responseJson.data.id) {
            {
              Object.keys(
                JSON.parse(localStorage.getItem("buyNow") || "{}")
              ).length == 0 && this.getCart();
            }
            // @ts-ignore
            window.notify([
              { message: "Cart updated successfully ", type: "success" },
            ]);
          } else {
            this.parseApiErrorResponse(responseJson);
          }
          //console.log(responseJson, "UpdateCartQuantity");
        }
        if (apiRequestCallId === this.postApplyCouponApiCallId) {
          if (responseJson && responseJson.data) {
            //console.log(responseJson, "apply coupon");
            // @ts-ignore
            // window.notify([
            //   { message: responseJson?.data?.message, type: "success" },
            // ]);
            this.getCart();
          }
          if (responseJson && responseJson.errors) {
            // @ts-ignore
            window.notify([{ message: responseJson.errors[0], type: "error" }]);
          } else {
            // @ts-ignore
            window.notify([{ message: responseJson.message, type: "warning" }]);
          }
        }
        if (apiRequestCallId === this.delCouponApiCallId) {
          //console.log(responseJson, "delete coupon");
          // @ts-ignore
          // window.notify([
          //   { message: "Coupon deleted successfully", type: "success" },
          // ]);
          setTimeout(() => {
            this.getCart();
          }, 300);
        }
        if (apiRequestCallId === this.releaseShippingAddressChargeCallId) {
          Object.keys(this.state.buyNow).length > 0
            ? this.postBuyNow(
                this.state.buyNow.cat_id,
                this.state.buyNow.sub_id
              )
            : this.getCart();
        }
        if (responseJson && responseJson.data) {
          if (apiRequestCallId === this.releaseBlockId) {
          } else if (apiRequestCallId === this.placeOrderId) {
            if (responseJson) {
              this.setState({
                loading:false
              })
              this.props.history.push({
                pathname: "/order-placed",
                state: {
                  orderData: {
                    order: {
                      placed_at: responseJson.data.placed_at,
                      total: responseJson.data.total,
                    },
                  },
                },
              });
            }
          }
          if (apiRequestCallId === this.createOrderId) {
            this.razorpayAddonMethod(
              responseJson.data.order.data.attributes.razorpay_order_id
            );
          } else if (apiRequestCallId === this.verifyRazorPayId) {
            this.onVerifyAddonRazorpaySuccess(responseJson.data);
          }
        }
        if (responseJson && responseJson.message) {
          if (apiRequestCallId === this.checkAvailabilityId) {
            if (responseJson.message === "All products are available.") {
              this.placeOrder();
            } else {
              window.notify([{ message: responseJson.errors, type: "error" }]);
            }
          } else if (apiRequestCallId === this.checkZipcodeId) {
            if (
              responseJson.message ===
              "Sorry, currently delivery is not available for this location."
            ) {
              window.notify([{ message: responseJson.message, type: "error" }]);
            } else {
              this.checkProductAvailability();
            }
          } else if (apiRequestCallId === this.releaseBlockId) {
          } else if (apiRequestCallId === this.placeOrderId) {
            this.setState({
              isShowError: false,
              message: responseJson.message,
              showAlertModal: true,
              isFetching: false,
              isValidCoupon: false,
            });
          } else if (apiRequestCallId === this.createOrderId) {
            this.setState({
              isFetching: false,
            });
          } else if (apiRequestCallId === this.verifyRazorPayId) {
            this.releaseBlockQuantity();
            this.setState({
              isFetching: false,
            });
          } else if (apiRequestCallId === this.releaseBlockQuantityApiCallId) {
            this.releaseBlockQuantityFailureCallBack(responseJson.message);
          }
        }
        if (responseJson && responseJson.errors) {
          if (apiRequestCallId === this.checkAvailabilityId) {
            window.notify([{ message: responseJson.errors, type: "error" }]);
            this.setState({
              isShowError: true,
              message: responseJson.errors,
              showAlertModal: true,
              isFetching: false,
            });
          } else if (apiRequestCallId === this.checkZipcodeId) {
            this.setState({
              isShowError: true,
              message: responseJson.errors,
              showAlertModal: true,
              isFetching: false,
              isValidCoupon: false,
            });
          } else if (apiRequestCallId === this.releaseBlockId) {
          } else if (apiRequestCallId === this.placeOrderId) {
            this.setState({
              isShowError: true,
              message: responseJson.errors,
              showAlertModal: true,
              isFetching: false,
            });
          } else if (apiRequestCallId === this.createOrderId) {
            this.setState({
              isShowError: true,
              message: responseJson.errors,
              showAlertModal: true,
              isFetching: false,
            });
          } else if (apiRequestCallId === this.verifyRazorPayId) {
            this.setState({
              isShowError: true,
              message: responseJson.errors,
              showAlertModal: true,
              isFetching: false,
            });
          }
        }
        if (errorReponse) {
          if (apiRequestCallId === this.getUserProfileApiCallId) {
            this.setState({
              isFetching: false,
            });
          }
          if (apiRequestCallId === this.getCartProductId) {
            this.setState({
              isFetching: false,
            });
          }
          if (apiRequestCallId === this.getCartListApiCallId) {
            this.setState({
              isShowError: true,
              message: errorReponse,
              showAlertModal: true,
              isFetching: false,
            });
          } else if (apiRequestCallId === this.saveAddressId) {
            this.setState({
              isFetching: false,
            });
          } else if (apiRequestCallId === this.checkAvailabilityId) {
            this.setState({
              isShowError: true,
              message: errorReponse,
              showAlertModal: true,
              isFetching: false,
            });
          } else if (apiRequestCallId === this.releaseBlockId) {
          } else if (apiRequestCallId === this.placeOrderId) {
            this.setState({
              isShowError: true,
              message: errorReponse,
              showAlertModal: true,
              isFetching: false,
            });
          } else if (apiRequestCallId === this.createOrderId) {
            this.setState({
              isShowError: true,
              message: errorReponse,
              showAlertModal: true,
              isFetching: false,
            });
          } else if (apiRequestCallId === this.verifyRazorPayId) {
            this.setState({
              isShowError: true,
              message: errorReponse,
              showAlertModal: true,
              isFetching: false,
            });
          }
        }
      }
    }
    // Customizable Area End
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    const token = localStorage.getItem("token");
    const header = {
      "Content-Type": contentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };

  getCartHasProduct = async () => {
    this.setState({ isFetching: false });
    this.getCartProductId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.cartHasProductAPIEndPoint,
    });
  };

  getUserProfile = async () => {
    this.getUserProfileApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.userProfileApiEndPoint,
    });
  };

  getUserProfileSuccessCallBack = async (res: any) => {
    this.setState({ profileData: res, isFetching: false });
  };

  onSetAddress = (isFromShipping: boolean, addressData: any) => {
    if (isFromShipping) {
      this.setState({ shippingAddressData: addressData });
    } else {
      this.setState({ billingAddressData: addressData });
    }
  };

  onAddAddress = (isFromShipping: boolean) => {
    this.props.navigation.navigate("SavedAddress", {
      isFromCheckout: true,
      onSetAddress: (addressData: any) =>
        this.onSetAddress(isFromShipping, addressData),
    });
  };

  saveAddress = async () => {
    let addressData = this.props.navigation.state.params.checkoutData;
    if (addressData.address && addressData.address.id) {
      addressData.delivery_address_id = addressData.address.id;
    }
    this.saveAddressId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypePut,
      endPoint:
        configJSON.addAddressToOrder +
        "/" +
        this.state.wholeCartData.id +
        "/add_address_to_order",
      body: addressData,
    });
  };

  releaseBlockQuantity = async () => {
    this.toggleIsOpen();

    this.releaseBlockQuantityApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypePut,
      endPoint:
        configJSON.cartListAPiEndPoint +
        "/" +
        this.state.wholeCartData.id +
        "/release_products",
    });
  };

  releaseBlockQuantitySuccessCallBack = (res: any) => {
    // console.log('@@@ Release Block Quantity Success CallBack =============', res);
  };

  releaseBlockQuantityFailureCallBack = (error: any) => {
    // console.log('@@@ Release Block Quantity Failure CallBack =============', error);
  };

  checkZipcodeAvailability = async () => {
    this.setState({
      loading:true
    })
    this.toggleIsOpen();

    const shipping = this.state.addressData;
    this.checkZipcodeId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.checkZipCodeApiEndPoint + shipping.zip_code,
    });
  };

  checkProductAvailability = async () => {
    this.checkAvailabilityId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint:
        configJSON.cartListAPiEndPoint +
        "/" +
        this.state.wholeCartData.id +
        "/check_availability",
    });
  };

  toggleIsOpen = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  onConfirmingOrder = () => {
    const confirVal = window.confirm("Are you sure want to place the order?");

    if (confirVal) {
      this.checkZipcodeAvailability();
    } else {
      this.releaseBlockQuantity();
    }
  };
  
  onSelectCod=(event)=>{
    if(this.state.paymentType=="cod"){
      this.setState({ paymentType: "razorpay" })
    }else{
      this.setState({ paymentType: event.target.name })
    }
  }


  placeOrder = async () => {
    if (this.state.paymentType === "cod") {
      this.placeConfirmOrder();
      //localStorage.removeItem("cart_length");
    } else {
      const id = this.state.wholeCartData;
      let orderData = new FormData();
      orderData.append("order_id", id);
      this.getRazorpayOrderId();
      //   localStorage.removeItem("cart_length");
    }
  };

  getRazorpayOrderId = async () => {
    const { id } = this.state.wholeCartData;
    let data = {
      order_id: id,
      value: 1500,
    };
    this.createOrderId = await this.apiCall({
      endPoint: configJSON.createRazorpayApiEndPoint,
      contentType: configJSON.ApiContentType,
      method: configJSON.ApiMethodPostType,
      body: data,
    });
  };

  razorpayAddonMethod = async (razorpay_order_id: any) => {
    const self = this;
    const { email, full_name, full_phone_number } =
      this.state.wholeCartData.account.attributes;
    const Appthem = JSON.parse(localStorage.getItem("appThemData") ?? "{}");
    var options = {
      description: "Credits towards consultation",
      currency: "INR",
      key: Appthem?.PaymentKeys?.razorpay?.api_key
        ? Appthem?.PaymentKeys?.razorpay?.api_key
        : themeJson.attributes.razorpay.api_key, // Your api key
      amount: `${parseFloat(this.state.wholeCartData.total).toFixed(2) * 100}`,
      handler: function (response) {
        self.verifyAddonRazorPay(response);
      },
      name: "Branded Wholesale",
      order_id: razorpay_order_id,
      prefill: {
        email: email,
        contact: full_phone_number,
        name: full_name,
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      window.notify([{ message: response.error.description, type: "error" }]);
      self.releaseBlockQuantity();
      self.props.history.push({
        pathname: "/transactionfailed",
      });
    });
    rzp1.open(options);
  };

  verifyAddonRazorPay = async (razorPay_data: any) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      razorPay_data;

    let razorPayData = {
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_signature: razorpay_signature,
    };
    this.verifyRazorPayId = await this.apiCall({
      endPoint: configJSON.verifyRazorpayApiEndPoint,
      contentType: configJSON.ApiContentType,
      method: configJSON.ApiMethodPostType,
      body: razorPayData,
    });
  };

  placeConfirmOrder = async () => {
    const data = {
      cart_id: this.state.wholeCartData.id,
      is_gift: false,
      schedule_time: "",
    };
    this.placeOrderId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.ApiMethodPostType,
      endPoint: configJSON.placeOrderAPIEndPoint,
      body: data,
    });
    localStorage.removeItem("cart_length");
  };

  onVerifyAddonRazorpaySuccess = (res: any) => {
    if (res) {
      this.props.history.push({
        pathname: "/order-placed",
        state: {
          orderSuccess: true,
          orderData: {
            order: {
              placed_at: res.order.placed_at,
              total: res.order.total,
            },
          },
        },
      });
    }

    localStorage.removeItem("cart_length");
  };

  onHandleBack = () => {
    this.props.history.push("/checkout");
  };
  // to apply coupon
  toApplyCoupon = (code: any, amount: any) => {
    // Customizable Area Start
    this.state.wholeCartData.id && this.postApplyCoupon(code, amount);
    // Customizable Area End
  };
  // apply coupon
  postApplyCoupon = (code: any, amount: any): boolean => {
    // Customizable Area Start
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
    //console.log(this.state.cartId)
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
    // Customizable Area End
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
      configJSON.apiMethodTypeDel
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };
  getCart = (): boolean => {
    const token1 = localStorage.getItem("token");
    this.setState({
      ...this.state,
      loading: true,
    });

    let headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: token1,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetCartApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetIsCartCreated
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

    // update cart quantity
    putUpdateCartQuantity = (
      product_id: any,
      product_variant: any,
      quantity: any,
      type: any
    ): boolean => {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token: localStorage.getItem("token"),
      };
      setTimeout(() => {
        let httpBody: any;
        if (type == "subscription") {
          httpBody = {
            subscription_quantity: quantity,
            catalogue_id: product_id,
            // catalogue_variant_id: product_variant,
          };
        } else {
          httpBody = {
            quantity: quantity,
            catalogue_id: product_id,
            catalogue_variant_id: product_variant,
          };
        }
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
  
        this.putUpdateCartQuantityApiCallId = requestMessage.messageId;
  
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.endPointApiPutUpdateCartQuantity +
            `${this.state.cartId}/update_item_quantity`
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
          configJSON.putAPiMethod
        );
  
        runEngine.sendMessage(requestMessage.id, requestMessage);
      }, 500);
  
      return true;
    };

  releaseShippingCharge = () => {
    // Customizable Area Start
    const { isRealeasedShippingCharge } = this.state;

    if (!isRealeasedShippingCharge) {
      this.setState({ isRealeasedShippingCharge: true });
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
    }
    // Customizable Area End
  };
}
