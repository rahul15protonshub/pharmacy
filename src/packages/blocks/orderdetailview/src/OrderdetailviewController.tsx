/****************************
ORDER DETAIL SCREEN CONTROLLER
*****************************/
import { Alert, BackHandler } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { initialRatingList } from "../../studio-store-ecommerce-theme/src/constants";
import StorageProvider from "../../../framework/src/StorageProvider";
import {
  ChangeStackNow,
  OnManageNavigation,
} from "../../studio-store-ecommerce-components/src/UtilNavigation/UtilNavigation";
// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  myOrderList: any;
  shippingAddressData: any;
  showCancelOrderModal: boolean;
  ratingList: any;
  showSubmitReviewModal: boolean;
  trackingDetails: any;
  orderDetails: any;
  productDetails: any;
  reviewText: any;
  isInvalidReview: boolean;
  isFetching: boolean;
  subscriptionOrders: [];
  showAlertModal: boolean;
  isShowError: boolean;
  cartHasProduct: boolean;
  message: any;
  cartData: any;
  // Customizable Area Start
  cartcount: any
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class OrderdetailviewController extends BlockComponent<
  Props,
  S,
  SS
> {
  getLogisiticTrackIdDetailsCallID: any;
  getTrackIdDetailsCallID: any;
  createCartAPICallID: any;
  submitOrderReviewCallID: any;
  cartHasProductAPICallID: any;
  cancelOrderAPICallID: any;
  getSubscrptionOrdersAPICallID: any;
  extendDeliveryAPICallID: any;

  _unsubscribe: any;

  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      myOrderList: [1, 2, 3, 4, 5],
      shippingAddressData: null,
      showCancelOrderModal: false,
      ratingList: initialRatingList,
      showSubmitReviewModal: false,
      trackingDetails: null,
      orderDetails: null,
      productDetails: null,
      reviewText: "",
      isInvalidReview: false,
      isFetching: true,
      subscriptionOrders: [],
      showAlertModal: false,
      isShowError: false,
      cartHasProduct: false,
      message: "",
      cartData: null,
      // Customizable Area Start
      cartcount: 0
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      this.getTrackIdDetails();
      this.getSubscrptionOrders();
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
    });
    // Customizable Area Start
    // Customizable Area End
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  async componentWillUnmount() {
    this._unsubscribe.remove();
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
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

      let resultSesseion = OnManageNavigation(
        responseJson,
        errorReponse,
        this.props.navigation
      );
      if (resultSesseion) {
        this.setState({ isFetching: false });
        ChangeStackNow(this.props.navigation);
      }

      if (responseJson && responseJson.data) {
        if (apiRequestCallId === this.getLogisiticTrackIdDetailsCallID) {
          this.getLogisticTrackIdDetailsSuccessCallBack(responseJson.data);
        }

        if (apiRequestCallId === this.getTrackIdDetailsCallID) {
          this.getTrackIdDetailsSuccessCallBack(responseJson.data);
        }

        if (apiRequestCallId === this.getSubscrptionOrdersAPICallID) {
          this.getSubscrptionOrdersSuccess(responseJson.data);
        }

        if (apiRequestCallId === this.extendDeliveryAPICallID) {
          this.extendDeliveryOrderSuccess();
        }

        if (apiRequestCallId === this.cancelOrderAPICallID) {
          this.cancelOrderSuccessCallBack();
        }

        if (apiRequestCallId === this.createCartAPICallID) {
          this.createCartSuccessCallBack();
        }

        if (apiRequestCallId === this.cartHasProductAPICallID) {
          this.cartHasProductSuccessCallBack(responseJson.data);
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.getLogisiticTrackIdDetailsCallID) {
          this.getLogisticTrackIdDetailsFailureCallBack(responseJson);
        }

        if (apiRequestCallId === this.getTrackIdDetailsCallID) {
          this.getTrackIdDetailsFailureCallBack(responseJson);
        }

        if (apiRequestCallId === this.getSubscrptionOrdersAPICallID) {
          this.getSubscrptionOrdersFailure(responseJson.data);
        }

        if (apiRequestCallId === this.extendDeliveryAPICallID) {
          this.extendDeliveryOrderFailure(responseJson);
        }

        if (apiRequestCallId === this.cancelOrderAPICallID) {
          this.cancelOrderFailureCallBack(responseJson);
        }

        if (apiRequestCallId === this.createCartAPICallID) {
          this.createCartFailureCallBack(responseJson);
        }

        if (apiRequestCallId === this.cartHasProductAPICallID) {
          this.cartHasProductFailureCallBack();
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (errorReponse) {
        this.setState({
          isShowError: true,
          message: errorReponse,
          showAlertModal: true,
          isFetching: false,
        });
        // Customizable Area Start
        // Customizable Area End
      }
    }
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    const token = (await StorageProvider.get("Userdata")) || "";
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

  getTrackIdDetails = async () => {
    const orderData = this.props.navigation.state.params.orderData;
    this.getTrackIdDetailsCallID = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: `${configJSON.getTrackIdDetailsEndPoint}?id=${orderData.id}&track=order_item`,
    });
  };

  getTrackIdDetailsSuccessCallBack = (res: any) => {
    // console.log("@@@ Get Track ID Details ==============", res);
    this.setState(
      {
        trackingDetails: res.tracking_detail.data,
        orderDetails: res.order_item_detail.data.attributes,
        productDetails:
          res.order_item_detail.data.attributes.catalogue.attributes,
        isFetching: false,
        shippingAddressData:
          res.order_item_detail.data.attributes.delivery_address,
      },
      () => {
        this.refreshCart();
      }
    );
  };

  getTrackIdDetailsFailureCallBack = (error: any) => {
    if (error) {
      setTimeout(() => {
        this.setState({
          message: this.parseApiErrorResponse(error),
          isShowError: true,
          showAlertModal: true,
        });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({
          message: "Network Error!",
          isShowError: true,
          showAlertModal: true,
        });
      }, 0);
    }
  };

  cartHasProductSuccessCallBack = (res: any) => {
    // console.log("@@@ Cart Has Product Success CallBack ===================");
    this.setState({ cartHasProduct: res.has_cart_product });
    // Customizable Area Start
    this.setState({ cartcount: res.total_cart_item });
    // Customizable Area End
  };

  cartHasProductFailureCallBack = () => {
    // console.log("@@@ Cart Has Product Failure CallBack ===================");
    // Customizable Area Start
    // Customizable Area End
  };

  createCartSuccessCallBack = () => {
    // Customizable Area Start
    // Customizable Area End
  };

  createCartFailureCallBack = (error: any) => {
    if (error) {
      setTimeout(() => {
        this.setState({
          message: this.parseApiErrorResponse(error),
          isShowError: true,
          showAlertModal: true,
        });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({
          message: "Network Error!",
          isShowError: true,
          showAlertModal: true,
        });
      }, 0);
    }
    // Customizable Area Start
    // Customizable Area End
  };

  getLogisticTrackIdDetails = async () => {
    const mainOrderData = this.props.navigation.state.params.mainOrderData;
    const orderData = this.props.navigation.state.params.orderData;
    this.getLogisiticTrackIdDetailsCallID = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: `${configJSON.shippingLogisiticAPIEndPoint}?order_item_id=${orderData.id}&track=order_item&order_id=${mainOrderData.id}`,
    });
  };

  getLogisticTrackIdDetailsSuccessCallBack = (res: any) => {
    let trackingDetails: any = {};
    let trackingResponse = res.data.tracking;
    trackingDetails.status = trackingResponse.status;
    trackingDetails.msg = trackingResponse.msg;
    trackingDetails.order_datetime = trackingResponse.order_datetime;
    trackingDetails.tracking_number = trackingResponse.tracking_number;
    trackingDetails.order_date = trackingResponse.order_date;
    let orderDetails: any = {};
    orderDetails.id = this.props.navigation.state.params.orderData.id;
    orderDetails.product_name =
      this.props.navigation.state.params.orderData.product_name;
    orderDetails.quantity =
      this.props.navigation.state.params.orderData.quantity;
    orderDetails.unit_price_including_tax =
      this.props.navigation.state.params.orderData.unit_price_including_tax;
    orderDetails.is_review_present =
      this.props.navigation.state.params.orderData.is_review_present;
    orderDetails.is_item_cancelled =
      this.props.navigation.state.params.orderData.is_item_cancelled;
    orderDetails.order_number = trackingResponse.order_number;
    orderDetails.status = trackingResponse.status;
    orderDetails.order_date = trackingResponse.order_date;
    let shippingAddressData: any = {};
    shippingAddressData.name = trackingResponse.name;
    shippingAddressData.address = trackingResponse.address;
    shippingAddressData.phone_number = trackingResponse.phone_number;
    let productDetails = {
      images: [
        {
          image: this.props.navigation.state.params.orderData.product_image,
        },
      ],
    };
    this.setState(
      {
        trackingDetails: [trackingDetails],
        orderDetails: orderDetails,
        shippingAddressData: shippingAddressData,
        productDetails: productDetails,
        isFetching: false,
      },
      () => {
        this.refreshCart();
      }
    );
  };

  getLogisticTrackIdDetailsFailureCallBack = (error: any) => {
    if (error) {
      setTimeout(() => {
        if (error !== "Shipment Not Found.") {
          this.setState({
            message: this.parseApiErrorResponse(error),
            isShowError: true,
            showAlertModal: true,
          });
        } else {
          let productDetails = {
            images: [
              {
                image:
                  this.props.navigation.state.params.orderData.product_image,
              },
            ],
          };
          let orderDetails: any = {};
          let trackingDetails: any = {};
          orderDetails.id = this.props.navigation.state.params.orderData.id;
          orderDetails.product_name =
            this.props.navigation.state.params.orderData.product_name;
          orderDetails.quantity =
            this.props.navigation.state.params.orderData.quantity;
          orderDetails.unit_price =
            this.props.navigation.state.params.orderData.unit_price;
          orderDetails.is_review_present =
            this.props.navigation.state.params.orderData.is_review_present;
          orderDetails.is_item_cancelled =
            this.props.navigation.state.params.orderData.is_item_cancelled;
          orderDetails.order_number =
            this.props.navigation.state.params.mainOrderData.order_number;
          orderDetails.order_date =
            this.props.navigation.state.params.mainOrderData.order_date;
          trackingDetails.status = "Placed";
          trackingDetails.msg = "Your order is placed";
          trackingDetails.order_datetime =
            this.props.navigation.state.params.mainOrderData.order_date;
          trackingDetails.tracking_number = "";
          trackingDetails.order_date =
            this.props.navigation.state.params.mainOrderData.order_date;
          this.setState({
            orderDetails: orderDetails,
            productDetails: productDetails,
            trackingDetails: [trackingDetails],
            isFetching: false,
          });
        }
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({
          message: "Network Error.",
          isShowError: true,
          showAlertModal: true,
        });
      }, 0);
    }
  };

  getSubscrptionOrders = async () => {
    const orderData = this.props.navigation.state.params.orderData;
    // console.log("@@@ Order Data ===========", orderData);
    if (orderData.attributes.subscription_package) {
      this.getSubscrptionOrdersAPICallID = await this.apiCall({
        contentType: configJSON.ApiContentType,
        method: configJSON.GetMethodType,
        endPoint: `${configJSON.getSubscrptionOrdersAPIEndPoint}/${orderData.id}`,
      });
    }
  };

  getSubscrptionOrdersSuccess = (res: any) => {
    // console.log("@@@ Get Subscription Orders Success CallBack =========", res);
    this.setState({ subscriptionOrders: res, isFetching: false });
  };

  getSubscrptionOrdersFailure = (error: any) => {
    if (error) {
      setTimeout(() => {
        this.setState({
          message: this.parseApiErrorResponse(error),
          isShowError: true,
          showAlertModal: true,
        });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({
          message: "Network Error!",
          isShowError: true,
          showAlertModal: true,
        });
      }, 0);
    }
  };

  submitOrderReview = async () => {
    if (this.state.reviewText.trim().length === 0) {
      this.setState({ isInvalidReview: true });
      return;
    }
    this.setState({ showSubmitReviewModal: false }, async () => {
      let count = 0;
      this.state.ratingList.map((item: any) => {
        if (item.isSelected) {
          count = count + 1;
        }
      });

      let userID = (await StorageProvider.get("USER_ID")) || "";
      let data = {
        userID: userID,
        order_item_id: this.state.orderDetails.id,
        rating: count,
        comment: this.state.reviewText,
      };
      this.submitOrderReviewCallID = await this.apiCall({
        contentType: configJSON.ApiContentType,
        method: configJSON.GetMethodType,
        endPoint: configJSON.userProfileApiEndPoint,
        body: data,
      });
    });
  };

  submitOrderReviewSuccessCallBack = () => {
    this.resetStar();
    setTimeout(() => {
      this.setState({
        message: "Review submitted successfully.",
        isShowError: false,
        showAlertModal: true,
        isFetching: false,
      });
    }, 0);
    this.props.navigation.goBack();
  };

  submitOrderReviewFailureCallBack = (error: any) => {
    this.resetStar();
    if (error) {
      setTimeout(() => {
        this.setState({
          message: this.parseApiErrorResponse(error),
          isShowError: true,
          showAlertModal: true,
        });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({
          message: "Network Error!",
          isShowError: true,
          showAlertModal: true,
        });
      }, 0);
    }
  };

  cancelOrder = async () => {
    let userID = (await StorageProvider.get("USER_ID")) || "";
    let formData = new FormData();
    formData.append("item_id[]", this.state.orderDetails.id);
    let data = {
      userID: userID,
      itemId: this.props.navigation.state.params.mainOrderData.id,
      productItemId: this.state.orderDetails.id,
      formData: formData,
      isFromMyOrder: false,
    };
    this.cancelOrderAPICallID = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: configJSON.userProfileApiEndPoint,
      body: data,
    });
  };

  cancelOrderSuccessCallBack = () => {
    setTimeout(() => {
      this.setState({
        message: "Order item cancelled successfully.",
        isShowError: false,
        showAlertModal: true,
        isFetching: false,
      });
    }, 0);
    this.props.navigation.goBack();
  };

  cancelOrderFailureCallBack = (error: any) => {
    this.resetStar();
    if (error) {
      setTimeout(() => {
        this.setState({
          message: this.parseApiErrorResponse(error),
          isShowError: true,
          showAlertModal: true,
        });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({
          message: "Network Error!",
          isShowError: true,
          showAlertModal: true,
        });
      }, 0);
    }
  };

  onPressStar = (item: any) => {
    let localRating = this.state.ratingList;
    let selectedRatingIndex = localRating.findIndex(
      (ratItem: any) => ratItem.id === item.id
    );
    localRating.map((ratingItem: any, index: any) => {
      if (index <= selectedRatingIndex) {
        return (ratingItem.isSelected = true);
      } else {
        return (ratingItem.isSelected = false);
      }
    });
    this.setState({ ratingList: localRating });
  };

  resetStar = () => {
    let localRating = this.state.ratingList;
    localRating.map((ratingItem: any) => {
      if (ratingItem.id !== 1) {
        ratingItem.isSelected = false;
      }
    });
    this.setState({ ratingList: localRating, reviewText: "" }, () => { });
  };

  getVarientString = (properties: any) => {
    let varientString = "";
    if (properties) {
      properties.map((property: any, index: any) => {
        varientString = `${varientString}${property.attributes.variant_name}: ${property.attributes.property_name}`;
        if (!(index === properties.length - 1)) {
          varientString += `,${"\n"}`;
        }
      });
    }
    return varientString;
  };

  getSlotString = (slot: any) => {
    if (slot.includes("AM") || slot.includes("am")) {
      return "Morning";
    }
    return "Evening";
  };

  onPressCancelDelivery = (subscriptionOrderId: any) => {
    Alert.alert(
      "Cancel delivery",
      "Are you sure to cancel this order delivery ?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => this.onCancelDelivery(subscriptionOrderId),
        },
      ],
      { cancelable: false }
    );
  };

  onCancelDelivery = async (subscriptionOrderId: any) => {
    let data = {};
    this.setState({ isFetching: true });
    this.extendDeliveryAPICallID = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.PostMethodType,
      endPoint: `${configJSON.extendDeliveryOrdersAPIEndPoint}/${subscriptionOrderId}/extend_delivery`,
      body: data,
    });
  };

  extendDeliveryOrderSuccess = () => {
    this.getSubscrptionOrders();
  };

  extendDeliveryOrderFailure = (error: any) => {
    if (error) {
      setTimeout(() => {
        this.setState({
          message: this.parseApiErrorResponse(error),
          isShowError: true,
          showAlertModal: true,
        });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({
          message: "Network Error!",
          isShowError: true,
          showAlertModal: true,
        });
      }, 0);
    }
  };

  refreshCart = async () => {
    this.cartHasProductAPICallID = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: configJSON.cartHasProductEndPoint,
    });
  };
  // Customizable Area Start
  // Customizable Area End
}
