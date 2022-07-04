//@ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { runEngine } from "../../../framework/src/RunEngine";
import axios from "axios";
export const configJSON = require("./config");
// Customizable Area Start
// Customizable Area End

export interface Props {
  addressData: any;
  cartDetails: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  checkingZipCode: string;
  stripe: any;
  elements: any;
  loading: boolean;
  paymentMethodData?: any;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class StripeWebController extends BlockComponent<Props, S, SS> {
  checkZipcodeId: any;
  checkAvailabilityId: any;
  releaseBlockId: any;
  placeOrderId: any;
  createOrderId: any;
  getUserProfileApiCallId: any;
  releaseBlockQuantityApiCallId: any;
  createStripeAPICallId: string;
  confrimStripeAPICallId: string;
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      loading: false,
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
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

      if (apiRequestCallId === this.checkZipcodeId) {
        this.setState({ checkingZipCode: "error" });
        if (
          responseJson?.message ===
          "Sorry, currently delivery is not available for this location."
        ) {
          this.setState({ loading: false });
          window.notify([{ message: responseJson?.message, type: "error" }]);
        } else {
          this.checkProductAvailability();
        }
      } else if (apiRequestCallId === this.checkAvailabilityId) {
        if (responseJson?.message === "All products are available.") {
          this.placeOrder();
        } else {
          this.setState({ loading: false });
          window.notify([{ message: responseJson?.errors, type: "error" }]);
        }
      } else if (apiRequestCallId === this.createStripeAPICallId) {
        if (responseJson && responseJson.data) {
          this.setState({ loading: false });
          this.createStripePaymentSuccess(
            responseJson?.data,
            this.state.paymentMethodData,
            this.state.stripe
          );
          // @ts-ignore
          // window.notify([
          //   {
          //     type: "success",
          //     message: responseJson?.message || "something went wrong!",
          //   },
          // ]);
        }
        if (responseJson && responseJson.error) {
          this.setState({ loading: false });
          this.props.history.push("/transactionfailed");
          // @ts-ignore
          // window.notify([
          //   {
          //     type: "success",
          //     message: responseJson?.error?.message || "something went wrong!",
          //   },
          // ]);
        }
      } else if (apiRequestCallId === this.confrimStripeAPICallId) {
        if (responseJson && responseJson.data) {
          this.setState({ loading: false });
          this.props.history.push({
            pathname: "/order-placed",
            state: {
              orderData: {
                order: {
                  placed_at: responseJson.data?.order?.placed_at,
                  total: responseJson.data?.order?.total,
                },
              },
            },
          });
          localStorage.setItem("cart_length", "0");
          // @ts-ignore
          // window.notify([
          //   {
          //     type: "success",
          //     message: responseJson.data?.message || "Payment successfull.",
          //   },
          // ]);
        }
        if (responseJson && responseJson.error) {
          this.setState({ loading: false });
          this.props.history.push("/transactionfailed");
          // @ts-ignore
          window.notify([
            {
              type: "danger",
              message: responseJson?.error?.message || "Something went wrong",
            },
          ]);
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
    this.setState({ checkingZipCode: "checking" });
    const shipping = this.props?.addressData;
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
        this.props.cartDetails.id +
        "/check_availability",
    });
  };

  onConfirmingOrder = () => {
    const confirVal = window.confirm("Are you sure want to place the order?");

    if (confirVal) {
      this.checkZipcodeAvailability();
    } else {
      this.releaseBlockQuantity();
    }
  };

  placeOrder = async () => {
    const { stripe, elements } = this.state;
    const { cartDetails } = this.props;
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const { paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      // @ts-ignore
      card: elements.getElement(CardNumberElement),
    });

    const requestBody = {
      data: {
        attributes: {
          amount: parseFloat(cartDetails?.total),
          account_id: user?.id,
          order_id: cartDetails?.id,
        },
        payment_token: paymentMethod?.id,
      },
    };

    const headers = {
      "Content-Type": "application/json",
      token,
    };
    this.setState({
      paymentMethodData: paymentMethod.id,
    });

    return this.handleCreateSTrip(requestBody, headers);
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
  };

  createStripePaymentSuccess = async (res: any, token: any, stripe: any) => {
    try {
      // @ts-ignore
      const result = await stripe.confirmPaymentIntent(res.client_secret, {
        payment_method: token,
      });
      if (result?.paymentIntent?.status === "succeeded") {
        // this.setState({ isFetching: true });
        let stripeData = {
          data: {
            stripe_payment_id: token,
            payment_intent_id: result?.paymentIntent?.id,
          },
        };
        this.confirmPaymentSuccess(stripeData);
      }
    } catch (e) {
      // console.log('@@@ Stripe Confirm Payment Error ============', e);
      // this.releaseBlockQuantity();
    }
  };

  confirmPaymentSuccess = (data: any) => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      token,
    };
    return this.handleConfrimStripe(data, headers);
  };

  handleSubmit = async (event: any, stripe, elements) => {
    const { cartDetails } = this.props;
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    this.setState(
      { stripe, elements, loading: true },
      this.checkZipcodeAvailability
    );
  };
  handleCreateSTrip = (data: any, headers: any) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createStripeAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.stripePaymentPPIEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handleConfrimStripe = (data: any, headers: any) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.confrimStripeAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.stripeConfirmPaymentAPIEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePut
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Customizable Area Start
  // Customizable Area End
}
