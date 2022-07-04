import { BackHandler, Linking, Platform } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";

import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

import StorageProvider from "../../../framework/src/StorageProvider";
//@ts-ignore
import { fcmService } from "../../studio-store-ecommerce-services/src/FCMService";
import { localNotificationService } from "../../studio-store-ecommerce-services/src/LocalNotificationService";
import { OnManageNavigation } from "../../studio-store-ecommerce-components/src/UtilNavigation/UtilNavigation";

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
  isShowError: boolean;
  arrayHolder: any;
  recommendedList: any;
  token: string;
  customErrorModal: boolean;
  customErrorMessage: any;
  isFetching: boolean;
  categoriesArray: any;
  cartProduct: any;
  cartLength: number;
  selectedCatalogues: any;
  focusStatus: string;
  isDeepLinkUtilised: boolean;
  bannerImages: any;
  noDataFound: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CatalogueController extends BlockComponent<Props, S, SS> {
  _unsubscribe: any;
  getProductApiCallId: any;
  getRecommendedApiCallId: any;
  addToWishlistApiCallId: any;
  removeFromWishlistApiCallId: any;

  getCategoriesApiCallId: any;
  getCartProductId: any;
  addToCartApiCallId: any;
  sendDeviceTokenApiCallId: any;
  getCartListId: any;
  notificationMessageId: any;
  getBannerImagesAPICallId: any;
  appObj: any;
  // Customizable Area Start
  removeFromNewProductWishlistApiCallId: any;
  addToWishNewlistApiCallId: any;
  UpdateWishlistTempId: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      isShowError: false,
      arrayHolder: [],
      recommendedList: [],
      token: "",
      customErrorModal: false,
      customErrorMessage: "",
      isFetching: false,
      categoriesArray: [],
      bannerImages: [],
      cartProduct: null,
      cartLength: 0,
      selectedCatalogues: null,
      focusStatus: "",
      isDeepLinkUtilised: false,
      noDataFound: false,
      // Customizable Area Start
      // Customizable Area End
    };

    if (Platform.OS !== "macos") {
      this.appObj = require("../../../mobile/App").appObj;
    }

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }
  async componentDidMount() {
    super.componentDidMount();
    this.setDeepLink();
    this.setupNotification();
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      this.getToken();
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
    });
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
    });
    this._unsubscribe = this.props.navigation.addListener("blur", () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
      Linking.removeEventListener("url", this.handleOpenURL);
    });
    // Customizable Area Start
    // Customizable Area End
  }

  setupNotification = () => {
    try {
      fcmService.register(
        (token: any) => this.onRegister(token),
        (notify: any) => this.onNotification(notify),
        (notify: any) => this.onOpenNotification(notify)
      );
      localNotificationService.configure((notify: any) => {
        this.onOpenNotification(notify);
      });
    } catch (error) {}
  };

  onRegister = async (token: any) => {
    let fcmToken = await StorageProvider.get("USER_FCM_TOKEN");
    let data = {
      fcm_token: fcmToken,
    };
    this.sendDeviceTokenApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypePut,
      endPoint: configJSON.sendDeviceTokenAPiEndPoint,
      body: data,
    });
    // Customizable Area Start
    // Customizable Area End
  };

  onNotification = (notify: any) => {
    let uniquedNotifId = Math.floor(Math.random() * 1000 + 1);
    const options = {
      soundName: "default",
      playSound: true,
    };
    if (notify.title) {
      if (this.notificationMessageId != notify.messageId) {
        localNotificationService.showNotification(
          uniquedNotifId,
          notify.title,
          notify.message,
          notify,
          options
        );
        this.notificationMessageId = notify.messageId;
      }
    }
    // Customizable Area Start
    // Customizable Area End
  };

  onOpenNotification = (notify: any) => {
    // Customizable Area Start
    let notificationData = notify.data.notification;
    if (notificationData) {
      let noificationKey = notify.data.data.notification_key;
      if (
        noificationKey === "ORDER ITEM CONFIRMED" ||
        noificationKey === "ORDER ITEM SHIPPED" ||
        noificationKey === "ORDER ITEM DELIVERED" ||
        noificationKey === "ORDER ITEM CANCELLED"
      ) {
        if (!notify.data.data) {
          return;
        }
        let productData = notify.data.data;
        this.props.navigation.navigate("MyOrderDetails", {
          orderData: { id: productData.order_id },
          mainOrderData: { id: productData.order_item_id },
        });
      } else if (
        noificationKey === "PLACED" ||
        noificationKey === "CANCELLED" ||
        noificationKey === "CONFIRMED" ||
        noificationKey === "DELIVERED" ||
        noificationKey === "IN_TRANSIT"
      ) {
        this.props.navigation.navigate("Ordermanagement", {
          isFromPlaced: true,
        });
      } else if (noificationKey === "PRODUCT_IS_IN_STOCK") {
        if (!notify.data.data) {
          return;
        }
        let productData = notify.data.data;
        this.props.navigation.navigate("ProductDescription", {
          productData: { id: Number(productData.product_id) },
        });
      } else {
      }
    } else {
      notificationData = notify.notification;
      if (!notificationData) {
        return;
      }
      let noificationKey = notify.data.notification_key;
      if (
        noificationKey === "ORDER ITEM CONFIRMED" ||
        noificationKey === "ORDER ITEM SHIPPED" ||
        noificationKey === "ORDER ITEM DELIVERED" ||
        noificationKey === "ORDER ITEM CANCELLED"
      ) {
        if (!notify.data) {
          return;
        }
        let productData = notify.data;
        this.props.navigation.navigate("MyOrderDetails", {
          orderData: { id: productData.order_id },
          mainOrderData: { id: productData.order_item_id },
        });
      } else if (
        noificationKey === "PLACED" ||
        noificationKey === "CANCELLED" ||
        noificationKey === "CONFIRMED" ||
        noificationKey === "DELIVERED" ||
        noificationKey === "IN_TRANSIT"
      ) {
        this.props.navigation.navigate("Ordermanagement", {
          isFromPlaced: true,
        });
      } else if (noificationKey === "PRODUCT_IS_IN_STOCK") {
        if (!notify.data) {
          return;
        }
        let productData = notify.data;
        this.props.navigation.navigate("ProductDescription", {
          productData: { id: Number(productData.product_id) },
        });
      } else {
      }
    }
    // Customizable Area End
  };

  sendDeviceTokenSuccessCallBack = (res: any) => {
    // Customizable Area Start
    // Customizable Area End
  };

  sendDeviceTokenFailureCallBack = (error: any) => {
    // Customizable Area Start
    // Customizable Area End
  };

  handleBackButtonClick = () => {
    BackHandler.exitApp();
    return true;
  };

  async componentWillUnmount() {
    super.componentWillUnmount();
    this._unsubscribe.remove();
    Linking.removeEventListener("url", this.handleOpenURL);
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // Customizable Area Start
    // Customizable Area End
  }

  setDeepLink = () => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        if (this.appObj && !this.appObj.state.isDeepLinkUtilised) {
          this.appObj.setState({ isDeepLinkUtilised: true }, () => {
            this.deepLinkNavigate(url);
          });
        }
      }
    });
    Linking.addEventListener("url", this.handleOpenURL);
    // Customizable Area Start
    // Customizable Area End
  };

  handleOpenURL = (event: any) => {
    if (this.appObj && !this.appObj.state.isDeepLinkUtilised) {
      this.appObj.setState({ isDeepLinkUtilised: true }, () => {
        this.deepLinkNavigate(event.url);
        // Customizable Area Start
        // Customizable Area End
      });
    }
  };

  deepLinkNavigate = async (url: any) => {
    const route = url.replace(/.*?:\/\//g, "");
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split("/")[0];
    if (routeName === "product") {
      this.props.navigation.navigate("ProductDescription", {
        productData: { id: Number(id) },
        isFromDeepLink: true,
      });
    }
  };

  getToken = async () => {
    // Customizable Area Start
    let token = await StorageProvider.get("Userdata");
    // token=token
    this.setState({ token: token });
    this.getCartList();
    // this.getListRequest(token);

    this.getRecommendedListRequest(token);
    this.getCartHasProduct();
    this.getBannerImages();
    this.getCategories();
    // Customizable Area End
  };

  apiCall = async (data: any) => {
    // Customizable Area Start
    const { contentType, method, endPoint, body } = data;
    const token = (await StorageProvider.get("Userdata")) || "";
    const header = {
      "Content-Type": contentType,
      token: this.state.token,
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
    // Customizable Area End
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      // console.log("responseJson", responseJson);
      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      OnManageNavigation(responseJson, errorReponse, this.props.navigation);

      if (responseJson.data) {
        // console.log("responseJson.data",responseJson.data)
        if (apiRequestCallId == this.getProductApiCallId) {
          let array = responseJson?.data?.catalogue?.data;
          this.setState({ isFetching: false, arrayHolder: array });
          this.getCategories();
        } else if (apiRequestCallId === this.getRecommendedApiCallId) {
          let array = responseJson?.data?.catalogue?.data
            ? responseJson?.data?.catalogue?.data
            : [];

          this.setState({
            isFetching: false,
            recommendedList: responseJson?.data.recommended_products.data,
            arrayHolder: array,
          });
        } else if (apiRequestCallId === this.getCartProductId) {
          let array = responseJson?.data;
          this.setState({ isFetching: false, cartProduct: array });
        } else if (apiRequestCallId === this.getCartListId) {
          let selectedCatalogues = [];
          let array = responseJson?.data[0].attributes.order_items;
          array.map((ar: any) =>
            selectedCatalogues.push(ar.attributes.catalogue_variant_id)
          );
          this.setState({
            isFetching: false,
            cartLength: array.length,
            selectedCatalogues: array,
          });
        } else if (apiRequestCallId === this.addToWishNewlistApiCallId) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: false,
            customErrorMessage: responseJson.message,
          });
          this.updateWhiseList(
            [...this.state.arrayHolder],
            this.UpdateWishlistTempId,
            "newProducts"
          );
        } else if (apiRequestCallId === this.addToWishlistApiCallId) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: false,
            customErrorMessage: responseJson.message,
          });
          this.updateWhiseList(
            [...this.state.recommendedList],
            this.UpdateWishlistTempId,
            "Recommended"
          );
          // this.getListRequest(this.state.token);
          // this.getRecommendedListRequest(this.state.token);
        } else if (
          apiRequestCallId === this.removeFromNewProductWishlistApiCallId
        ) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            customErrorMessage: responseJson.message,
          });
          // this.updateWhiseList([...this.state.recommendedList],this.UpdateWishlistTempId,"newProducts");
          this.updateWhiseList(
            [...this.state.arrayHolder],
            this.UpdateWishlistTempId,
            "newProducts"
          );
          // this.getListRequest(this.state.token);
          // this.getRecommendedListRequest(this.state.token);
        } else if (apiRequestCallId === this.removeFromWishlistApiCallId) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            customErrorMessage: responseJson.message,
          });
          this.updateWhiseList(
            [...this.state.recommendedList],
            this.UpdateWishlistTempId,
            "Recommended"
          );
          // this.updateWhiseList([...this.state.arrayHolder],this.UpdateWishlistTempId,"Recommended");
          // this.getListRequest(this.state.token);
          // this.getRecommendedListRequest(this.state.token);
        } else if (apiRequestCallId === this.getCategoriesApiCallId) {
          let array = responseJson?.data;
          this.setState({ categoriesArray: array, isFetching: false });
        } else if (apiRequestCallId === this.sendDeviceTokenApiCallId) {
          this.sendDeviceTokenSuccessCallBack(responseJson);
        } else if (apiRequestCallId === this.getBannerImagesAPICallId) {
          this.getBannerImagesSuccessCallBack(responseJson.data);
        }
      } else if (responseJson && responseJson.message) {
        if (responseJson.message === "No catalogue found") {
          this.setState({ noDataFound: true, isFetching: false });
          return;
        }
        if (apiRequestCallId == this.getProductApiCallId) {
        } else if (apiRequestCallId === this.getRecommendedApiCallId) {
        } else if (apiRequestCallId === this.getCartProductId) {
        } else if (apiRequestCallId === this.getCartListId) {
        } else if (apiRequestCallId === this.addToWishlistApiCallId) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: false,
            customErrorMessage: responseJson.message,
          });
        } else if (apiRequestCallId === this.removeFromWishlistApiCallId) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            customErrorMessage: responseJson.message,
          });
        } else if (apiRequestCallId === this.getCategoriesApiCallId) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            customErrorMessage: responseJson.message,
          });
        } else if (apiRequestCallId === this.sendDeviceTokenApiCallId) {
          // Customizable Area Start
          // Customizable Area End
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (responseJson && responseJson.errors) {
        if (
          this.parseApiErrorResponse(responseJson) === "Invalid token" ||
          this.parseApiErrorResponse(responseJson) === "Token has Expired"
        ) {
          await StorageProvider.remove("Userdata");
          await StorageProvider.remove("GUEST_USER");
          await StorageProvider.remove("USER_ID");
          await StorageProvider.remove("SOCIAL_LOGIN_USER");
          this.props.navigation.replace("Auth");
          return;
        }
        if (apiRequestCallId === this.sendDeviceTokenApiCallId) {
          this.sendDeviceTokenFailureCallBack(responseJson);
        }
        if (apiRequestCallId === this.getCartListId) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            customErrorMessage: this.parseApiErrorResponse(responseJson),
          });
        }
      } else if (responseJson.error) {
        this.setState({ isFetching: false });
      } else if (errorReponse) {
        if (apiRequestCallId == this.getProductApiCallId) {
        } else if (apiRequestCallId === this.getRecommendedApiCallId) {
        } else if (apiRequestCallId === this.getCartProductId) {
        } else if (apiRequestCallId === this.getCartListId) {
        } else if (apiRequestCallId === this.addToWishlistApiCallId) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            customErrorMessage: errorReponse,
          });
        } else if (apiRequestCallId === this.removeFromWishlistApiCallId) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            customErrorMessage: errorReponse,
          });
        } else if (apiRequestCallId === this.getCategoriesApiCallId) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            customErrorMessage: errorReponse,
          });
        } else if (apiRequestCallId === this.sendDeviceTokenApiCallId) {
        }
      }
      // Customizable Area Start
      // Customizable Area End
    }
    // Customizable Area Start
    // Customizable Area End
  }

  getBannerImages = async () => {
    this.getBannerImagesAPICallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.getMobileBannersAPIEndPoint,
    });
  };

  getBannerImagesSuccessCallBack = (res: any) => {
    this.setState({ bannerImages: res.banners.data });
  };

  onPressBanner = (item: any) => {
    if (item.url_id && item.url_type === "category") {
      this.props.navigation.navigate("Filteritems", {
        categoryData: { id: item.url_id },
        isFromExplore: true,
        screenName: item.url_name,
        isFromCategory: true,
      });
    } else if (item.url_id && item.url_type === "product") {
      this.props.navigation.navigate("ProductDescription", {
        productData: { id: item.url_id },
      });
    }
  };

  viewAll(productType: string) {
    this.props.navigation.navigate("Filteritems", {
      screenName: productType,
      productType: productType,
    });
  }

  onHeartPress = (item: any, source: any) => {
    this.UpdateWishlistTempId = item.id;

    item.attributes.wishlisted
      ? this.removeFromWishlist(item.id, source)
      : this.addToWishlist(item.id, source);
  };

  addToWishlist = async (id: any, source: any) => {
    this.UpdateWishlistTempId = id;
    if (source == "newProducts") {
      this.setState({ isFetching: true });
      const httpBody = {
        catalogue_id: id,
      };

      this.addToWishNewlistApiCallId = await this.apiCall({
        contentType: configJSON.productApiContentType,
        method: configJSON.apiMethodTypePost,
        endPoint: configJSON.addToWishlistApiEndPoint,
        body: httpBody,
      });
    } else {
      this.setState({ isFetching: true });
      const httpBody = {
        catalogue_id: id,
      };

      this.addToWishlistApiCallId = await this.apiCall({
        contentType: configJSON.productApiContentType,
        method: configJSON.apiMethodTypePost,
        endPoint: configJSON.addToWishlistApiEndPoint,
        body: httpBody,
      });
    }
  };

  removeFromWishlist = async (id: any, source: any = "newProducts") => {
    this.UpdateWishlistTempId = id;
    if (source == "newProducts") {
      this.setState({ isFetching: true });
      this.removeFromNewProductWishlistApiCallId = await this.apiCall({
        contentType: configJSON.productApiContentType,
        method: configJSON.DeleteMethodType,
        endPoint:
          configJSON.addToWishlistApiEndPoint + "/remove_catalogue/" + id,
      });
    } else {
      this.setState({ isFetching: true });

      this.removeFromWishlistApiCallId = await this.apiCall({
        contentType: configJSON.productApiContentType,
        method: configJSON.DeleteMethodType,
        endPoint:
          configJSON.addToWishlistApiEndPoint + "/remove_catalogue/" + id,
      });
    }
  };

  getListRequest = async (token: any) => {
    this.setState({ isFetching: true });
    this.getProductApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.productAPiEndPoint,
    });
  };

  getRecommendedListRequest = async (token: any) => {
    this.getRecommendedApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.recommendedProductAPiEndPoint,
    });
  };

  getCategories = async () => {
    this.setState({ categoriesArray: [] });

    this.getCategoriesApiCallId = await this.apiCall({
      contentType: configJSON.categoryApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.categoryAPIEndPoint,
    });
  };

  getCartHasProduct = async () => {
    this.getCartProductId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.cartHasProductAPIEndPoint,
    });
  };

  getCartList = async () => {
    this.getCartListId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.getCartApiEndPoint,
    });
  };
  unsubscribeMessages = () => {
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
  };
  // Customizable Area Start
  updateWhiseList = (Data: any, id: any, flag: any) => {
    try {
      // console.log(" the id is ",id)
      if (flag == "newProducts") {
        let dataNew = Data.filter((item: any) => {
          // console.log(id,"data ",JSON.stringify(item));
          try {
            if (item.id == id) {
              item.attributes.wishlisted = !item?.attributes?.wishlisted;
            }
          } catch (error) {}
          return item;
        });
        this.setState({ arrayHolder: dataNew });
      } else {
        let dataNew = Data.filter((item: any) => {
          // console.log(id,"data ",JSON.stringify(item));
          try {
            if (item.id == id) {
              item.attributes.wishlisted = !item?.attributes?.wishlisted;
            }
          } catch (error) {}
          return item;
        });
        this.setState({ recommendedList: dataNew });
      }
    } catch (exc) {}
  };
  // Customizable Area End
}
