/****************************
SUBSCRITPTION ORDER LIST SCREEN CONTROLLER
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
  isFetching: boolean;
  subscriptionOrders: any;
  showAlertModal: boolean;
  isShowError: boolean;
  message: any;
  pageCount: any;
  limit: any;
  loading: boolean;
  pageLoader: boolean;
  pullToRefresh: boolean;
  onEndReachedCalledDuringMomentum: boolean;
  lastLoadCount: any;
  notFinalLoad: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SubscriptionOrderListController extends BlockComponent<
  Props,
  S,
  SS
> {
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
      isFetching: true,
      subscriptionOrders: [],
      showAlertModal: false,
      isShowError: false,
      message: "",
      pageCount: 1,
      limit: 10,
      loading: true,
      pageLoader: false,
      pullToRefresh: false,
      onEndReachedCalledDuringMomentum: true,
      lastLoadCount: 0,
      notFinalLoad: false,
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
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
        if (apiRequestCallId === this.getSubscrptionOrdersAPICallID) {
          this.getSubscrptionOrdersSuccess(responseJson.data);
        }

        if (apiRequestCallId === this.extendDeliveryAPICallID) {
          this.extendDeliveryOrderSuccess();
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.getSubscrptionOrdersAPICallID) {
          this.getSubscrptionOrdersFailure(responseJson.data);
        }

        if (apiRequestCallId === this.extendDeliveryAPICallID) {
          this.extendDeliveryOrderFailure(responseJson);
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

  getSubscrptionOrders = async (isFromPagination = false) => {
    if (!isFromPagination) {
      this.setState({ isFetching: true });
    }
    const orderData = this.props.navigation.state.params.orderData;
    console.log("@@@ Order Data ===========", orderData);
    if (orderData.attributes.subscription_package) {
      this.getSubscrptionOrdersAPICallID = await this.apiCall({
        contentType: configJSON.ApiContentType,
        method: configJSON.GetMethodType,
        endPoint: `${configJSON.getSubscrptionOrdersAPIEndPoint}/${orderData.id}?page=${this.state.pageCount}&per_page=${this.state.limit}`,
      });
    }
  };

  getSubscrptionOrdersSuccess = (res: any) => {
    console.log("@@@ Get Subscription Orders Success CallBack =========", res);
    this.setState({
      subscriptionOrders: this.state.subscriptionOrders.concat(res),
      pageLoader: false,
      lastLoadCount: this.state.subscriptionOrders.concat(res).length,
      onEndReachedCalledDuringMomentum:
        this.state.subscriptionOrders.concat(res).length >= this.state.limit
          ? true
          : false,
      notFinalLoad:
        this.state.subscriptionOrders.concat(res).length >= this.state.limit
          ? true
          : false,
      isFetching: false,
    });
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
    this.setState({ subscriptionOrders: [], pageCount: 1 }, () => {
      this.getSubscrptionOrders();
    });
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

  onEndReached = () => {
    console.log(
      "@@@ On End Reached ==============",
      this.state.onEndReachedCalledDuringMomentum,
      this.state.lastLoadCount,
      this.state.limit,
      this.state.notFinalLoad
    );
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({ onEndReachedCalledDuringMomentum: true }, () => {
        setTimeout(() => {
          if (
            this.state.lastLoadCount >= this.state.limit &&
            this.state.notFinalLoad
          ) {
            this.setState(
              { pageLoader: true, pageCount: this.state.pageCount + 1 },
              async () => {
                this.getSubscrptionOrders(true);
              }
            );
          }
        }, 1500);
      });
    }
  };

  // Key Extractor
  _keyExtractor = (item: any, index: any) => item.id;

  // Check if list has started scrolling
  _onMomentumScrollBegin = () =>
    this.setState({ onEndReachedCalledDuringMomentum: false });
  // Customizable Area Start
  // Customizable Area End
}
