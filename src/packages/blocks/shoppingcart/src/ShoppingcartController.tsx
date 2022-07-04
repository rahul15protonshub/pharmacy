import { BackHandler } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
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
  showCouponCodeModal: boolean;
  showGuestModal: boolean;
  token: string;
  codeValue: string;
  cart_Value: string;
  isShowError: boolean;
  showAlertModal: boolean;
  message: any;
  isFetching: boolean;
  cartList: any;
  cartData: any;
  quantity: string;
  catalogue_variant_id: string;
  catalogue_id: string;
  cart_id: any;
  emptyCart: boolean;
  isCouponApplied: boolean;
  isValidCoupon: boolean;
  isGuestUser: boolean;
  couponCodeErrorMsg: any;
  selectedCatalogueId: any;
  selectedVariantId: any;
  selectedItem: any;
  selectedQuantity: any;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ShoppingcartController extends BlockComponent<
  Props,
  S,
  SS
> {
  apiApplyCouponCallId: any;
  getCartListApiCallId: any;
  updateQtyApiCallId: any;
  emptyCartApiCallId: any;
  removeCartItemApiCallId: any;
  removeCouponApiCallId: any;
  getCartProductId: any;
  addToWishlistApiCallId: any;
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
      showCouponCodeModal: false,
      showGuestModal: false,
      token: "",
      codeValue: "",
      isCouponApplied: false,
      isValidCoupon: false,
      cart_Value: "",
      isShowError: false,
      isFetching: false,
      message: null,
      showAlertModal: false,
      cartList: null,
      cartData: null,
      quantity: "1",
      catalogue_id: "",
      catalogue_variant_id: "",
      couponCodeErrorMsg: "",
      cart_id: null,
      emptyCart: false,
      isGuestUser: false,
      selectedCatalogueId: "",
      selectedVariantId: "",
      selectedItem: null,
      selectedQuantity: null,
      // Customizable Area Start
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      this.getProfileData();
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
    super.componentWillUnmount();
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // Customizable Area Start
    // Customizable Area End
  }

  getProfileData = async () => {
    const token = await StorageProvider.get("Userdata");
    const isGuestUser = await StorageProvider.get("GUEST_USER");

    this.setState({ token: token, isGuestUser: isGuestUser }, () => {
      this.getToken();
    });
  };

  getToken = async () => {
    const token = await StorageProvider.get("Userdata");
    this.setState({ token: token }, () => this.getCartList(token));
    this.getCartHasProduct();
  };

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

      // Customizable Area Start

      let resultSesseion = OnManageNavigation(
        responseJson,
        errorReponse,
        this.props.navigation
      );
      if (resultSesseion) {
        this.setState({ isFetching: false });
        ChangeStackNow(this.props.navigation);
      }

      if (apiRequestCallId === this.emptyCartApiCallId) {
        this.setState({
          emptyCart: true,
          isFetching: false,
        });
      }
      if (apiRequestCallId === this.apiApplyCouponCallId) {
        if (responseJson.data) {
          this.setState({
            showCouponCodeModal: false,
            isCouponApplied: true,
            isValidCoupon: true,
            cartData: responseJson?.data?.coupon?.data,
            message: responseJson.message,
            showAlertModal: responseJson.message ? true : false,
            isFetching: false,
          });
        } else if (responseJson.message) {
          this.setState({
            isShowError: true,
            couponCodeErrorMsg: responseJson.message,
            isCouponApplied: true,
            message: responseJson.message,
            isFetching: false,
            isValidCoupon: false,
          });
          this.parseApiErrorResponse(responseJson);
        }
      }
      if (apiRequestCallId === this.removeCouponApiCallId) {
        if (responseJson.errors) {
          this.setState({
            isFetching: false,
            isValidCoupon: false,
            isCouponApplied: false,
          });
          this.parseApiErrorResponse(responseJson);
        } else {
          this.setState(
            {
              isShowError: false,
              isFetching: false,
              isCouponApplied: false,
              isValidCoupon: false,
            },
            () => {
              this.getCartList(this.state.token);
            }
          );
        }
      }
      if (apiRequestCallId === this.getCartProductId) {
        if (responseJson?.data) {
          this.setState({
            isFetching: false,
            cart_id: responseJson.data.order_id,
            emptyCart: !responseJson.data.has_cart_product,
          });
        } else if (responseJson && responseJson.errors) {
          let errorMessage = this.parseApiCatchErrorResponse(
            responseJson.errors
          );
          this.setState({
            isFetching: false,
            couponCodeErrorMsg: errorMessage,
          });
          return;
        }
      }
      if (apiRequestCallId === this.addToWishlistApiCallId) {
        if (responseJson?.data) {
          this.setState(
            {
              isFetching: false,
              message: "Moved to wishlist successfully.",
              isShowError: false,
              showAlertModal: true,
            },
            () => {
              setTimeout(() => {
                this.removeCartItem(
                  this.state.selectedItem,
                  0,
                  this.state.selectedCatalogueId,
                  this.state.selectedVariantId
                );
              }, 1000);
            }
          );
        } else if (responseJson && responseJson.errors) {
          let errorMessage = this.parseApiCatchErrorResponse(
            responseJson.errors
          );
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorMessage,
          });
          return;
        } else if (responseJson && responseJson.message) {
          let errorMessage = responseJson.message;
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorMessage,
          });
          return;
        }
      }
      if (responseJson?.data) {
        if (apiRequestCallId === this.getCartListApiCallId) {
          this.setState({
            cartList: responseJson.data[0].attributes.order_items,
            cartData: responseJson.data[0],
            isFetching: false,
            emptyCart:
              responseJson.data[0].attributes.order_items.length == 0
                ? true
                : false,
            isCouponApplied:
              responseJson.data[0].attributes.coupon_code_id != null &&
              responseJson.data[0].attributes.applied_discount
                ? true
                : false,
            isValidCoupon:
              responseJson.data[0].attributes.coupon_code_id != null &&
              responseJson.data[0].attributes.applied_discount
                ? true
                : false,
          });
        } else if (apiRequestCallId === this.updateQtyApiCallId) {
          this.setState({
            message: "Update quantity successfully",
            showAlertModal: true,
            isShowError: false,
          });
          this.getCartList(this.state.token);
        } else if (apiRequestCallId === this.removeCartItemApiCallId) {
          this.getCartList(this.state.token);
        }
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.getCartListApiCallId) {
          this.setState({ isFetching: false, emptyCart: true });
        }
        if (apiRequestCallId === this.apiApplyCouponCallId) {
          let errorMessage = this.parseApiCatchErrorResponse(
            responseJson.errors
          );
          this.setState({
            isFetching: false,
            isValidCoupon: false,
            isCouponApplied: true,
            couponCodeErrorMsg: errorMessage,
          });
          return;
        }
        if (apiRequestCallId === this.updateQtyApiCallId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: this.parseApiErrorResponse(responseJson),
          });
          return;
        }
      } else if (errorReponse) {
        this.setState({
          isFetching: false,
        });
      }
    }
    // Customizable Area End
  }

  codeTextInputProps = {
    onChangeText: (text: string) => {
      this.setState(
        {
          codeValue: text,
        },
        () => {
          if (this.state.isCouponApplied) {
            this.removeCoupon();
          }
        }
      );
    },
    secureTextEntry: false,
  };

  applyCoupon = async () => {
    if (this.state.codeValue.trim() === "") {
      // Customizable Area Start
      this.setState({
        isShowError: true,
        message: "Field can not be empty",
        showAlertModal: true,
      });
      // Customizable Area End
    } else {
      this.setState({
        isFetching: true,
      });

      const httpBody = {
        code: this.state.codeValue,
        cart_value: this.state.cartData.attributes.sub_total,
      };
      this.apiApplyCouponCallId = await this.apiCall({
        contentType: configJSON.ApiContentType,
        method: configJSON.apiMethodTypePost,
        endPoint:
          configJSON.ApplyCouponApiEndPoint +
          this.state.cart_id +
          "/apply_coupon",
        body: httpBody,
      });
    }
  };

  removeCoupon = async () => {
    this.setState({
      isFetching: true,
    });

    this.removeCouponApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypeDel,
      endPoint: configJSON.removeCouponEndPoint + this.state.cart_id,
    });
  };

  getCartList = async (token: any) => {
    this.setState({
      isFetching: true,
    });
    this.getCartListApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.cartListAPiEndPoint,
    });
  };

  onUpdateCartValue = async (
    item: any,
    qty: number,
    catalogue_id: any,
    catalogue_variant_id: any
  ) => {
    let isFromSubscription = item.attributes.subscription_package !== null;
    if (isFromSubscription) {
      let httpBody: any = {
        catalogue_id: Number(catalogue_id),
        subscription_quantity: qty,
        subscription_package: item.attributes.subscription_package,
        subscription_period: item.attributes.subscription_period,
        preferred_delivery_slot: item.attributes.preferred_delivery_slot,
        subscription_discount: item.attributes.subscription_discount,
      };
      this.setState({ isFetching: true });
      if (qty > 0) {
        this.updateQtyApiCallId = await this.apiCall({
          contentType: configJSON.ApiContentType,
          method: configJSON.apiMethodTypePut,
          endPoint:
            configJSON.updateQtyEndPoint +
            this.state.cart_id +
            "/update_item_quantity",
          body: httpBody,
        });
      } else {
        if (this.state.cartList.length > 1) {
          this.removeCartItemApiCallId = await this.apiCall({
            contentType: configJSON.ApiContentType,
            method: configJSON.apiMethodTypeDel,
            endPoint:
              configJSON.emptyCartEndPoint +
              this.state.cart_id +
              "/delete_item",
            body: httpBody,
          });
        } else {
          this.emptyCart();
        }
      }
    } else {
      if (qty > 0) {
        this.setState(
          {
            quantity: String(qty),
            catalogue_id: catalogue_id,
            catalogue_variant_id: catalogue_variant_id,
          },
          () => this.updateQty()
        );
      } else {
        if (this.state.cartList.length > 1) {
          this.removeCartItem(item, qty, catalogue_id, catalogue_variant_id);
        } else {
          this.emptyCart();
        }
      }
    }
  };

  removeCartItem = async (
    item: any,
    qty: any,
    catalogue_id: number,
    catalogue_variant_id: number
  ) => {
    let isFromSubscription = item.attributes.subscription_package !== null;
    let httpBody: any = null;
    this.setState({ isFetching: true });
    if (isFromSubscription) {
      httpBody = {
        catalogue_id: Number(catalogue_id),
        subscription_quantity: qty,
        subscription_package: item.attributes.subscription_package,
        subscription_period: item.attributes.subscription_period,
        preferred_delivery_slot: item.attributes.preferred_delivery_slot,
        subscription_discount: item.attributes.subscription_discount,
      };
    } else {
      httpBody = {
        catalogue_id: catalogue_id,
        catalogue_variant_id: catalogue_variant_id,
      };
    }

    this.removeCartItemApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypeDel,
      endPoint:
        configJSON.emptyCartEndPoint + this.state.cart_id + "/delete_item",
      body: httpBody,
    });
  };
  emptyCart = async () => {
    this.setState({
      isFetching: true,
    });

    this.emptyCartApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypeDel,
      endPoint:
        configJSON.emptyCartEndPoint + this.state.cart_id + "/empty_cart",
    });
  };
  updateQty = async () => {
    this.setState({
      isFetching: true,
    });

    const httpBody = {
      quantity: this.state.quantity,
      catalogue_id: this.state.catalogue_id,
      catalogue_variant_id: this.state.catalogue_variant_id,
    };

    this.updateQtyApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypePut,
      endPoint:
        configJSON.updateQtyEndPoint +
        this.state.cart_id +
        "/update_item_quantity",
      body: httpBody,
    });
  };

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

  getCartHasProduct = async () => {
    this.setState({ isFetching: true });
    this.getCartProductId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.cartHasProductAPIEndPoint,
    });
  };

  onPressProduct = (item: any) => {
    this.props.navigation.navigate("ProductDescription", {
      productData: item.attributes.catalogue,
      catalogue_variant_id: item.attributes.catalogue_variant_id,
    });
  };

  handleGuest = () => {
    this.setState({ showGuestModal: false }, () => {
      this.props.navigation.replace("Auth");
    });
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

  addToWishlist = async (item: any, id: any, variantID: any) => {
    this.setState({
      selectedItem: item,
      selectedCatalogueId: id,
      selectedVariantId: variantID,
      isFetching: true,
    });
    const httpBody = {
      catalogue_id: id,
    };
    this.addToWishlistApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.ApiMethodPostType,
      endPoint: configJSON.addToWishlistApiEndPoint,
      body: httpBody,
    });
  };

  // Customizable Area Start
  // Customizable Area End
}
