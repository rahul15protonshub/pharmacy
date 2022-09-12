import { BackHandler } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider";
// Customizable Area Start
import {
  OnManageNavigation,
  ChangeStackNow,
} from "../../studio-store-ecommerce-components/src/UtilNavigation/UtilNavigation";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  notificationList: any;
  noProductFound: boolean;
  isFetchingData: boolean;
  showReadAll: boolean;
  pageCount: number;
  limit: number;
  index: number;
  loading: boolean;
  pageLoader: boolean;
  pullToRefresh: boolean;
  onEndReachedCalledDuringMomentum: boolean;
  lastLoadCount: number;
  notFinalLoad: boolean;
  isFetching: boolean;
  isShowError: boolean;
  message: any;
  showAlertModal: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class NotificationsController extends BlockComponent<
  Props,
  S,
  SS
> {
  getNotificationListApiCallId: any;
  readNotificationApiCallId: any;
  deleteNotificationApiCallId: any;
  _unsubscribe: any;
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      notificationList: [],
      noProductFound: false,
      isFetchingData: true,
      showReadAll: false,
      pageCount: 1,
      limit: 10,
      loading: true,
      pageLoader: false,
      pullToRefresh: false,
      onEndReachedCalledDuringMomentum: true,
      lastLoadCount: 0,
      index: 0,
      notFinalLoad: false,
      isFetching: true,
      isShowError: false,
      message: undefined,
      showAlertModal: false,
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this._unsubscribe = this.props.navigation.addListener(
      "willFocus",
      async () => {
        this.getNotificationList();
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.handleBackButtonClick
        );
      }
    );
    // Customizable Area Start
    // Customizable Area End
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  async componentWillUnmount() {
    super.componentWillUnmount();
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
        if (apiRequestCallId === this.getNotificationListApiCallId) {
          this.getNotificationListSuccessCallBack(responseJson.data);
        }

        if (apiRequestCallId === this.readNotificationApiCallId) {
          this.readNotificationSuccessCallBack();
        }

        if (apiRequestCallId === this.deleteNotificationApiCallId) {
          this.deleteNotificationSuccessCallBack();
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.getNotificationListApiCallId) {
          this.getNotificationListFailureCallBack(responseJson.data);
        }

        if (apiRequestCallId === this.readNotificationApiCallId) {
          this.readNotificationFailureCallBack(responseJson.data);
        }

        if (apiRequestCallId === this.deleteNotificationApiCallId) {
          this.deleteNotificationFailureCallBack(responseJson.data);
        }
        // Customizable Area Start
        // Customizable Area End

        this.setState({
          isFetching: false,
        });
      } else if (errorReponse) {
        this.setState({ isFetching: false });
        // Customizable Area Start
        // Customizable Area End
      }
      // Customizable Area Start
      // Customizable Area End
    }
    // Customizable Area Start
    // Customizable Area End
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

  getNotificationList = async () => {
    this.getNotificationListApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: `${configJSON.getNotificationListApiEndPoint}?page=${this.state.pageCount}&per_page=10`,
    });
  };

  getNotificationListSuccessCallBack = async (res: any) => {
    this.setState(
      {
        notificationList: this.state.notificationList.concat(
          res.notifications.data
        ),
        pageLoader: false,
        lastLoadCount: this.state.notificationList.concat(
          res.notifications.data
        ).length,
        onEndReachedCalledDuringMomentum:
          this.state.notificationList.concat(res.notifications.data).length >=
          this.state.limit
            ? true
            : false,
        notFinalLoad:
          this.state.notificationList.concat(res.notifications.data).length >=
          this.state.limit
            ? true
            : false,
      },
      () => {
        if (this.state.notificationList.length === 0) {
          this.setState(
            { noProductFound: true, isFetchingData: false, showReadAll: false },
            () => {}
          );
        } else {
          this.setState({ isFetchingData: false, showReadAll: true }, () => {});
        }
      }
    );
  };

  getNotificationListFailureCallBack = (error: any) => {
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

  deleteNotification = async (item: any) => {
    this.deleteNotificationApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.DeleteMethodType,
      endPoint: `${configJSON.deleteNotificationListApiEndPoint}/${item.id}`,
    });
  };

  deleteNotificationSuccessCallBack = async () => {
    this.setState({ notificationList: [], pageCount: 1 }, () => {
      this.getNotificationList();
    });
  };

  deleteNotificationFailureCallBack = (error: any) => {
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

  readNotification = async (item: any) => {
    let data = {
      notification_id: item.id,
    };
    this.readNotificationApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.PutMethodType,
      endPoint: configJSON.readNotificationListApiEndPoint,
      body: data,
    });
  };

  readNotificationSuccessCallBack = async () => {
    this.setState({ notificationList: [], pageCount: 1 }, () => {
      this.getNotificationList();
    });
  };

  readNotificationFailureCallBack = (error: any) => {
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

  readAllNotification = async () => {
    let data = {
      read_all: true,
    };
    this.readNotificationApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.PutMethodType,
      endPoint: configJSON.readNotificationListApiEndPoint,
      body: data,
    });
  };

 
  onEndReached = () => {
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
                this.getNotificationListApiCallId = await this.apiCall({
                  contentType: configJSON.ApiContentType,
                  method: configJSON.GetMethodType,
                  endPoint: `${configJSON.getNotificationListApiEndPoint}?page=${this.state.pageCount}&per_page=10`,
                });
              }
            );
          }
        }, 1500);
      });
    }
  };

  // Key Extractor
  _keyExtractor = (item: any) => item.id;

  // Check if list has started scrolling
  _onMomentumScrollBegin = () =>
    this.setState({ onEndReachedCalledDuringMomentum: false });

  // Customizable Area Start
  // Customizable Area End
}
