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
//@ts-ignore
import content from "../../studio-store-ecommerce-components/src/content";
export const sortMenu = [
  { label: content.LowtoHigh, order_by: "price_including_tax", direction: "asc" },
  { label: content.HightoLow, order_by: "price_including_tax", direction: "desc" },
  { label: content.ByPopularity, order_by: "sold", direction: "desc" },
  { label: content.ByNewest, order_by: "created_at", direction: "desc" },
  { label: content.Recommended, order_by: "recommended", direction: "desc" }
];
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
  catalogueFilteredProducts?: any[];
  catalogueFilteredProductsTotalPages: number;
  catalogueFilteredProductsActivePage: number;
  catalogueFilterCategoryIds?: number[],
  catalogueFilterSubCategoryIds?: number[],
  catalogueFilterSortBy?: string,
  catalogueFilterSortOrder?: string
  catalogueFilterLoading: boolean;
  selectedCategory: any;
  productsAddingToCart: any[];
  SubscriptionRequestBody?: any;
  isSubscriptionUpdate?: any;
  isCartCreated: boolean;
  cartId: any;
  cartDetails: any;
  catalogue_id: any;
  catalogue_variant_id: any;
  productDetails: any;
  productInCart: any;
  itemQuantity: any;
  productQuantity: number,
  isProductAvailable: boolean,
  updateCart: boolean,
  isSubscribeClicked: boolean
  productWishlisting: number | null;
  brandSettings: any;
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
  getFilteredProductsApiCallId: any;
  postCreateCartApiCallId: string = "";
  putItemToCartApiCallId: string = "";
  increaseOrDecreaseCartQuantityApiCallId: string = "";
  getBrandSettingsCallId: any;
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
      catalogueFilteredProducts: undefined,
      catalogueFilteredProductsActivePage: 1,
      catalogueFilteredProductsTotalPages: 1,
      catalogueFilterCategoryIds: [],
      catalogueFilterSubCategoryIds: [],
      catalogueFilterSortBy: "created_at",
      catalogueFilterSortOrder: "desc",
      catalogueFilterLoading: false,
      selectedCategory: {},
      productsAddingToCart: [],
      SubscriptionRequestBody: null,
      isSubscriptionUpdate: null,
      isCartCreated: false,
      cartDetails: "",
      cartId: null,
      catalogue_id: "",
      catalogue_variant_id: "",
      productDetails: "",
      productInCart: "",
      itemQuantity: 1,
      productWishlisting: null,

      productQuantity: 1,
      isProductAvailable: false,
      updateCart: false,
      isSubscribeClicked: false,
      brandSettings: null,

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
    this.getBrandSettings();
    this.getCartList();
    // this.getListRequest(token);

    this.getRecommendedListRequest(token);
    this.getCartHasProduct();
    this.getBannerImages();
    this.getCategories();
    this.getFilteredProducts();

    // Customizable Area End
  };

  apiCall = async (data: any) => {
    // Customizable Area Start
    const { contentType, method, endPoint, body } = data;
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

      console.log(apiRequestCallId, responseJson)

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
          this.state.catalogueFilteredProducts?.forEach((product: any) => {
            const wishlistItem = responseJson.data.wishlist.data.attributes.wishlist_items.find((item: any) => parseInt(product.id) === parseInt(item.data.attributes.id.data.id));
            product.attributes.wishlisted = Boolean(wishlistItem);
          })

          this.setState({
            productWishlisting: null,
            catalogueFilteredProducts: this.state.catalogueFilteredProducts ? [...this.state.catalogueFilteredProducts] : [],

          });
          this.updateWhiseList(
            [...this.state.arrayHolder],
            this.UpdateWishlistTempId,
            "newProducts"
          );
        } else if (apiRequestCallId === this.addToWishlistApiCallId) {
          this.state.catalogueFilteredProducts?.forEach((product: any) => {
            const wishlistItem = responseJson.data.wishlist.data.attributes.wishlist_items.find((item: any) => parseInt(product.id) === parseInt(item.data.attributes.id.data.id));
            product.attributes.wishlisted = Boolean(wishlistItem);
          })

          this.setState({
            productWishlisting: null,
            catalogueFilteredProducts: this.state.catalogueFilteredProducts ? [...this.state.catalogueFilteredProducts] : [],

          });
          this.updateWhiseList(
            [...this.state.recommendedList],
            this.UpdateWishlistTempId,
            "Recommended"
          );
          // this.getListRequest(this.state.token);
          // this.getRecommendedListRequest(this.state.token);
        } else if (apiRequestCallId === this.removeFromNewProductWishlistApiCallId) {
          const wishlistItem = this.state.catalogueFilteredProducts?.find((item: any) => this.state.productWishlisting === item.id);
          if (wishlistItem) {
            wishlistItem.attributes.wishlisted = false;
          }

          this.setState({
            productWishlisting: null,
            catalogueFilteredProducts: this.state.catalogueFilteredProducts ? [...this.state.catalogueFilteredProducts] : [],

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
          console.log("removeFromWishlistApiCallId", responseJson);
          const wishlistItem = this.state.catalogueFilteredProducts?.find((item: any) => this.state.productWishlisting === item.id);
          if (wishlistItem) {
            wishlistItem.attributes.wishlisted = false;
          }

          this.setState({
            productWishlisting: null,
            catalogueFilteredProducts: this.state.catalogueFilteredProducts ? [...this.state.catalogueFilteredProducts] : [],

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
        } else if (apiRequestCallId === this.getFilteredProductsApiCallId) {
          if (this.state.catalogueFilteredProductsActivePage === 1) {
            this.setState(responseJson?.data ? {
              catalogueFilteredProducts: responseJson?.data,
              catalogueFilteredProductsTotalPages: responseJson?.meta?.pagination?.total_pages
            } : {
              catalogueFilteredProducts: [],
              catalogueFilteredProductsTotalPages: 1
            })
          }
          else {
            this.setState({
              catalogueFilteredProducts: [...this.state.catalogueFilteredProducts ?? [], ...responseJson?.data],
              catalogueFilteredProductsTotalPages: responseJson?.meta?.pagination?.total_pages,
            });
          }
          this.setState({
            catalogueFilterLoading: false,
          })

        } else if (apiRequestCallId === this.increaseOrDecreaseCartQuantityApiCallId) {

          console.log("increase response", responseJson)
          this.state.catalogueFilteredProducts?.forEach((product: any) => {
            const orderItem = responseJson.data.attributes.order_items.find((item: any) => parseInt(product.id) === item.attributes.catalogue_id);
            product.attributes.cart_quantity = orderItem ? orderItem.attributes.quantity : null;
          })
          this.setState({
            productsAddingToCart: [],
            catalogueFilteredProducts: this.state.catalogueFilteredProducts ? [...this.state.catalogueFilteredProducts] : [],
            cartLength: responseJson.data.attributes.order_items.length
          });

          // @ts-ignore

          await StorageProvider.set("cart_length", responseJson.data.attributes.order_items.length.toString());
          //this.getFilteredProducts();
          //@ts-ignore
        } else if (apiRequestCallId === this.putItemToCartApiCallId) {
          console.log("put item to cart response", responseJson)
          this.state.catalogueFilteredProducts?.forEach((product: any) => {
            const orderItem = responseJson.data.attributes.order_items.find((item: any) => parseInt(product.id) === item.attributes.catalogue_id);
            if (!product.attributes.cart_quantity) {
              product.attributes.cart_quantity = orderItem ? orderItem.attributes.quantity ?? 1 : null;
            }
          })
          this.setState({
            isSubscribeClicked: false,
            productsAddingToCart: [],
            catalogueFilteredProducts: this.state.catalogueFilteredProducts ? [...this.state.catalogueFilteredProducts] : [],
            cartLength: responseJson.data.attributes.order_items.length
          });
          // @ts-ignore
          // @ts-ignore
          await StorageProvider.set("cart_length", responseJson.data.attributes.order_items.length.toString());

          // console.log(window.location.pathname.endsWith("/home-page") ? "" : this.state.catalogue_id && this.getProductDetails())
          // window.location.pathname.endsWith("/home-page") ? "" : this.state.catalogue_id && this.getProductDetails()

        } else if (apiRequestCallId === this.postCreateCartApiCallId) {

          console.log("create cart response", responseJson)

          this.state.catalogueFilteredProducts?.forEach((product: any) => {
            const orderItem = responseJson.data.attributes.order_items.find((item: any) => parseInt(product.id) === item.attributes.catalogue_id);
            if (!product.attributes.cart_quantity) {
              product.attributes.cart_quantity = orderItem ? orderItem.attributes.quantity ?? 1 : null;
            }
          })
          this.setState({
            cartId: responseJson.data.id,
            isSubscribeClicked: false,
            productsAddingToCart: [],
            catalogueFilteredProducts: this.state.catalogueFilteredProducts ? [...this.state.catalogueFilteredProducts] : [],
            cartLength: responseJson.data.attributes.order_items.length
          });

          await StorageProvider.set("cart_length", responseJson.data.attributes.order_items.length.toString());

        }


      } else if (responseJson && (responseJson.message || responseJson.brand_setting)) {
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
        // Customizable Area Start
      } else if (apiRequestCallId === this.getBrandSettingsCallId) {
        this.setState({
          isFetching: false,
          brandSettings: responseJson.brand_setting,
        });
      }
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
        if (apiRequestCallId === this.postCreateCartApiCallId) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            productsAddingToCart: [],
            customErrorMessage: this.parseApiErrorResponse(responseJson),
          });
        }
        if (apiRequestCallId === this.putItemToCartApiCallId) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            productsAddingToCart: [],
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

    this.setState({ productWishlisting: item.id })
    item.attributes.wishlisted
      ? this.removeFromWishlist(item.id, source)
      : this.addToWishlist(item.id, source);
  };

  addToWishlist = async (id: any, source: any) => {
    this.UpdateWishlistTempId = id;
    if (source == "newProducts") {
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
      this.removeFromNewProductWishlistApiCallId = await this.apiCall({
        contentType: configJSON.productApiContentType,
        method: configJSON.DeleteMethodType,
        endPoint:
          configJSON.addToWishlistApiEndPoint + "/remove_catalogue/" + id,
      });
    } else {
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
  getBrandSettings = async () => {
    this.getBrandSettingsCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.brandSettingsAPIEndPoint,
    });
  };
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

  getFilteredProducts = async () => {

    this.setState({
      catalogueFilterLoading: true
    })

    let filteredUrl = `${configJSON.endPointApiGetFilteredProducts}?page=${this.state.catalogueFilteredProductsActivePage}&per_page=16`;

    if (this.state.catalogueFilterCategoryIds && this.state.catalogueFilterCategoryIds.length > 0) {
      filteredUrl += `&q[category_id][]=${this.state.catalogueFilterCategoryIds.join(',')}`
    }

    if (this.state.catalogueFilterSubCategoryIds && this.state.catalogueFilterSubCategoryIds.length > 0) {
      filteredUrl += `&q[sub_category_id][]=${this.state.catalogueFilterSubCategoryIds.join(',')}`
    }

    if (this.state.catalogueFilterSortBy) {
      filteredUrl += `&sort[order_by]=${this.state.catalogueFilterSortBy}`
    }

    if (this.state.catalogueFilterSortOrder) {
      filteredUrl += `&sort[direction]=${this.state.catalogueFilterSortOrder}`
    }

    this.getFilteredProductsApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: filteredUrl,
    });



  };

  putItemToCart = async (cartId: any, product: any, type: string) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.token,
    };
    let httpBody: any;
    if (type == "subscription") {
      httpBody = this.state.SubscriptionRequestBody;
    } else {
      if (product.catalogue_id && this.state.catalogue_variant_id) {
        httpBody = {
          catalogue_id: product.catalogue_id,
          catalogue_variant_id: parseInt(this.state.catalogue_variant_id),
          quantity: this.state.itemQuantity,
        };
        await StorageProvider.set(
          "catalogue_variant_id",
          this.state.catalogue_variant_id
        );
      } else if (
        !this.state.isProductAvailable == false &&
        this.state.productDetails?.attributes?.cart_quantity == null
      ) {
        httpBody = {
          catalogue_id: this.state.productDetails.id,
          quantity: this.state.itemQuantity,
        };
      } else {
        httpBody = {
          catalogue_id: product.id,
          quantity: this.state.itemQuantity,
        };
      }
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.putItemToCartApiCallId = requestMessage.messageId;
    if (this.state.isSubscriptionUpdate && type == "subscription") {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.addToCartApiEndPoint +
        `${cartId}/update_item_quantity`
      );
    } else {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.addToCartApiEndPoint + `${cartId}/add_item`
      );
    }
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
      configJSON.apiMethodTypePut
    );

    console.log("putItemToCart product", product);
    console.log("putItemToCart requestMessage", requestMessage);

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  postCreateCart = async (product: any) => {
    const { productDetails } = this.state;
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.token,
    };
    let httpBody: any;
    if (product == "subscription") {
      httpBody = this.state.SubscriptionRequestBody;
    } else {
      if (product?.catalogue_id) {
        httpBody = {
          catalogue_id: product.catalogue_id,
          catalogue_variant_id: parseInt(this.state.catalogue_variant_id),
          quantity: this.state.itemQuantity ?? 1,
        };
      } else {
        httpBody = {
          catalogue_id: productDetails?.id ?? product.id,
          // "catalogue_variant_id": product.id,
          quantity: this.state.itemQuantity ?? 1,
        };
      }
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postCreateCartApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCartApiEndPoint
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
      configJSON.apiMethodTypePost
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  addToCart = (product: any) => {
    this.setState({
      productsAddingToCart: [...this.state.productsAddingToCart, product.id],
    });
    if (this.state.cartId) {
      this.putItemToCart(this.state.cartId, product, "")
    }
    else {
      this.postCreateCart(product);
    }
  };

  increaseOrDecreaseCartQuantity = async (product: any, increment: number) => {
    this.setState({
      productsAddingToCart: [...this.state.productsAddingToCart, product.id]
    });
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.token,
    };

    let httpBody: any;
    let endPointFullPath: string;
    let method: string;

    if (product.attributes.cart_quantity + increment > 0) {
      httpBody = {
        quantity: product.attributes.cart_quantity + increment,
        catalogue_id: product.id,
      };
      endPointFullPath = configJSON.addToCartApiEndPoint +
        `${this.state.cartId}/update_item_quantity`
      method = configJSON.apiMethodTypePut;
    }
    else {
      httpBody = {
        catalogue_id: product.id,
        catalogue_variant_id: ""
      }
      endPointFullPath = configJSON.addToCartApiEndPoint +
        `${this.state.cartId}/delete_item`
      method = configJSON.DeleteMethodType;
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.increaseOrDecreaseCartQuantityApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPointFullPath
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
      method
    );

    console.log("increaseOrDecreaseCartQuantity requestMessage", requestMessage);

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  setCatalogueFilters(pageNumber?: number, categoryIds?: number[], subCategoryIds?: number[], sortBy?: string, sortOrder?: string) {
    this.setState({
      catalogueFilterLoading: true,
      catalogueFilteredProductsActivePage: pageNumber ? pageNumber : this.state.catalogueFilteredProductsActivePage,
      catalogueFilterCategoryIds: categoryIds ? categoryIds : this.state.catalogueFilterCategoryIds,
      catalogueFilterSubCategoryIds: subCategoryIds ? subCategoryIds : this.state.catalogueFilterSubCategoryIds,
      catalogueFilterSortBy: sortBy ? sortBy : this.state.catalogueFilterSortBy,
      catalogueFilterSortOrder: sortOrder ? sortOrder : this.state.catalogueFilterSortOrder,
    }, () => {
      this.getFilteredProducts();
    })
  }

  setSelectedCategory(category: any) {
    this.setState({ selectedCategory: category }, () => {
      this.setCatalogueFilters(1, [category.category_id], [category.id]);
    })
  }
  // Customizable Area End
}
