import { Share, BackHandler, AppState, Alert } from "react-native";

import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider";
import * as IMG_CONST from "../../studio-store-ecommerce-theme/src/ImageConstants";
import {
  ChangeStackNow,
  OnManageNavigation,
} from "../../studio-store-ecommerce-components/src/UtilNavigation/UtilNavigation";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  arrayHolder: any;
  token: string;
  productData: any;
  selectedProduct: any;
  currentSelection: any;
  selectedImage: any;
  similarProducts: any;
  showNotifiyModal: boolean;
  showNotifyButton: boolean;
  catalogue_variant_id: string;
  catalogue_id: string;
  quantity: any;
  productQuantity: any;
  cart_id: string;
  isShowError: boolean;
  showAlertModal: boolean;
  message: any;
  isFetching: boolean;
  selectedAttributes: any;
  cartProduct: any;
  availableAttributes: any;
  customErrorModal: boolean;
  ratingList: any;
  isGuestUser: boolean;
  updateCart: boolean;
  isProductAvailable: boolean;
  showGuestModal: boolean;
  appState: any;
  isVariantProduct: any;
  subscriptionQuantity: any;
  subscriptionPackage: any;
  subscriptionPeriod: any;
  subscriptionDiscount: any;
  subscriptionPackageData: any;
  subscriptionPeriodData: any;
  subscriptionTimeSlotData: any;
  productSubscriptions: any;
  invalidSubscriptionPackage: any;
  invalidSubscriptionPeriod: any;
  invalidateSubscriptionTimeSlot: any;
  isDailySelected: any;
  isWeeklySelected: any;
  isMonthySelected: any;
  period: any;
  selectedSlotId: any;
  selectedTimeSlot: any;
  slots: any;
  showAddCartModal: boolean;
  isSubscriptionAvailable: boolean;
  subscriptionCartHasProduct: boolean;
  isFromSubscription: boolean;
  // Customizable Area Start
  showProductDescriptionModal: boolean;
  prescriptionModal: boolean;
  buyNowDoneCartID: any
  productDataArr: any;
  productsAddingToCart: any[];
  productWishlisting: number | null;
  itemQuantity: any;
  similarproductList: any
  cart: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}
export default class ProductDescriptionController extends BlockComponent<
  Props,
  S,
  SS
> {
  getProductDescriptionApiCallId: any;
  getBuyProductApiCallId: any;
  getNotifyProductApiCallId: any;
  updateQtyApiCallId: any;
  addToCartApiCallId: any;
  addToWishlistApiCallId: any;
  removeFromWishlistApiCallId: any;
  getCartProductId: any;
  getCartProductDescriptionId: any;
  _unsubscribe: any;
  // Customizable Area Start
  LikeFlag: any;
  LikeFlagId: any;
  addPrescriptionApiCallId: any
  putItemToCartApiCallId: any
  increaseOrDecreaseCartQuantityApiCallId: any
  getCartId: any;
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
      arrayHolder: [],
      token: "",
      productData: null,
      selectedProduct: null,
      currentSelection: null,
      selectedImage: "",
      similarProducts: null,
      showNotifiyModal: false,
      showNotifyButton: true,
      catalogue_id: "",
      catalogue_variant_id: "",
      quantity: 1,
      productQuantity: 1,
      cart_id: "",
      isShowError: false,
      isFetching: false,
      message: null,
      showAlertModal: false,
      selectedAttributes: {},
      cartProduct: null,
      availableAttributes: null,
      customErrorModal: false,
      ratingList: [1, 1, 1, 1, 1],
      isGuestUser: false,
      updateCart: false,
      isProductAvailable: false,
      showGuestModal: false,
      appState: AppState.currentState,
      isVariantProduct: false,
      subscriptionQuantity: 1,
      subscriptionPackage: "",
      subscriptionPeriod: 1,
      subscriptionDiscount: 0,
      subscriptionPackageData: [],
      subscriptionPeriodData: [],
      subscriptionTimeSlotData: [],
      productSubscriptions: [],
      invalidSubscriptionPackage: false,
      invalidSubscriptionPeriod: false,
      invalidateSubscriptionTimeSlot: false,
      isDailySelected: false,
      isWeeklySelected: false,
      isMonthySelected: false,
      period: "",
      selectedSlotId: null,
      selectedTimeSlot: null,
      slots: [
        { id: 0, name: "Morning", availabity: true },
        { id: 1, name: "Evening", availabity: true },
      ],
      showAddCartModal: false,
      isSubscriptionAvailable: false,
      subscriptionCartHasProduct: false,
      isFromSubscription: false,
      showProductDescriptionModal: false,
      // Customizable Area Start
      prescriptionModal: false,
      buyNowDoneCartID: '',
      productDataArr: [],
      productsAddingToCart: [],
      productWishlisting: null,
      itemQuantity: 1,
      similarproductList: [],
      cart: null,
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      this.setState({ isFetching: true, selectedAttributes: {} }, () => {
        this.getToken();
      });
    });
    const isGuestUser = await StorageProvider?.get("GUEST_USER");
    this.setState({ isGuestUser: isGuestUser || false });
    AppState.addEventListener("change", this._handleAppStateChange);
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // Customizable Area Start
    // Customizable Area End
  }

  _handleAppStateChange = (nextAppState: any) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.getToken();
    }
    this.setState({ appState: nextAppState });
  };

  handleBackButtonClick = () => {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.isFromDeepLink
    ) {
      this.props.navigation.replace("MainNavigator");
      return true;
    } else {
      this.props.navigation.goBack();
      return true;
    }
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

  getToken = async () => {
    const token = await StorageProvider?.get("Userdata");
    this.setState({ token: token });
    this.getProductDescriptionRequest(token);
    this.getCartHasProduct(0);
    this.getCart();
  };

  uploadproduct = async (productdata: any) => {
    var finalData = []
    if (productdata.length > 0) {
      for (let i = 0; i < productdata.length; i++) {
        let getselectedData = {
          "order_item_ids": productdata[i].selectedItems,
          "prescription_files": productdata[i].browsefile
        }
        finalData.push(getselectedData);
      }
      const httpBody = {
        order_items: finalData,
      };
      this.setState({ isFetching: true })
      this.addPrescriptionApiCallId = await this.apiCall({
        contentType: configJSON.productApiContentType,
        method: configJSON.apiMethodTypePut,
        endPoint:
          configJSON.getAddprescriptionAPIEndPoint,
        body: httpBody,
      });
    }
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

      let resultResseion = OnManageNavigation(
        responseJson,
        errorReponse,
        this.props.navigation
      );
      if (resultResseion) {
        this.setState({ isFetching: false });
        ChangeStackNow(this.props.navigation);
      }

      if (responseJson && responseJson?.data) {
        if (apiRequestCallId === this.getProductDescriptionApiCallId) {
          this.getProductDescriptionSuccessCallBack(responseJson);
          this.setState({ isFetching: false });
        } else if (apiRequestCallId === this.getCartProductDescriptionId) {
          this.getCartProductDescriptionSuccessCallBack(responseJson);
        } else if (apiRequestCallId === this.getBuyProductApiCallId) {
          let dataPrescription = [{ 'id': responseJson?.data?.attributes?.order_items[0]?.id, 'name': this.state.productData?.attributes?.name }]
          this.setState(
            {
              productDataArr: dataPrescription,
              isFetching: false,
            },
            () =>
              setTimeout(() => {
                if (this.state.productData?.attributes?.prescription) {
                  this.setState({ prescriptionModal: true, buyNowDoneCartID: responseJson.data.id });
                } else {
                  this.props.navigation.push("Checkout", {
                    isFromBuyNow: true,
                    buyNowCartID: responseJson.data.id,
                  });
                }
              }, 0)
          );
        } else if (apiRequestCallId === this.getNotifyProductApiCallId) {
          this.setState(
            {
              showNotifiyModal: true,
              showNotifyButton: false,
              selectedAttributes: {},
            },
            () => {
              this.getToken();
            }
          );
        } else if (apiRequestCallId === this.addToWishlistApiCallId) {
          this.setState({
            isFetching: false,
            isShowError: false,
            customErrorModal: true,
            message: "Product added to wishlist.",
            productWishlisting: null,
          });
          // this.getProductDescriptionRequest(this.state.token);
          this.updateMyWhishList();
        } else if (apiRequestCallId === this.removeFromWishlistApiCallId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            customErrorModal: true,
            message: "Product removed from wishlist.",
            productWishlisting: null,
          });
          // this.getProductDescriptionRequest(this.state.token);
          this.updateMyWhishList();
        } else if (apiRequestCallId === this.getCartProductId) {
          if (responseJson?.data.order_id) {
            this.getCartProduct(responseJson?.data.order_id);
            this.setState({
              cartProduct: responseJson?.data,
              cart_id: responseJson?.data.order_id,
            });
          }
          this.setState({ isFetching: false, cartProduct: responseJson?.data });
        }
        else if (apiRequestCallId === this.getCartId) {
          if (responseJson?.data) {
            this.setState({
              cart: responseJson?.data[0],
              cart_id: responseJson?.data[0].id,
            });
          }
          this.setState({ isFetching: false });
        } else if (apiRequestCallId === this.addToCartApiCallId) {
          let message = "Product added to cart successfully.";
          if (this.state.isFromSubscription) {
            message = "Product subscribed successfully.";
          }
          this.setState(
            {
              isFetching: false,
              isShowError: false,
              showAlertModal: true,
              message: message,
              isFromSubscription: false,
              productsAddingToCart: [],
            },
            () => {
              this.getToken();
            }
          );
        } else if (apiRequestCallId === this.putItemToCartApiCallId) {
          this.getCartHasProduct(1);
          this.state.similarproductList?.forEach((product: any) => {
            const orderItem = responseJson.data.attributes.order_items.find((item: any) => parseInt(product.id) === item.attributes.catalogue_id);
            if (!product.attributes.cart_quantity) {
              product.attributes.cart_quantity = orderItem ? orderItem.attributes.quantity ?? 1 : null;
            }
          })
          this.setState({
            productsAddingToCart: [],
            similarproductList: this.state.similarproductList ? [...this.state.similarproductList] : [],
          });
          // @ts-ignore
          // @ts-ignore
          await StorageProvider.set("cart_length", responseJson.data.attributes.order_items.length.toString());


        }
        else if (apiRequestCallId === this.increaseOrDecreaseCartQuantityApiCallId) {
          this.getCartHasProduct(1)
          this.state.similarproductList?.forEach((product: any) => {
            const orderItem = responseJson.data.attributes.order_items.find((item: any) => parseInt(product.id) === item.attributes.catalogue_id);
            product.attributes.cart_quantity = orderItem ? orderItem.attributes.quantity : null;
          })
          this.setState({
            productsAddingToCart: [],
            similarproductList: this.state.similarproductList ? [...this.state.similarproductList] : [],
          });

          // @ts-ignore

          // await StorageProvider.set("cart_length", responseJson.data.attributes.order_items.length.toString());
          //this.getFilteredProducts();
          //@ts-ignore
        } else if (apiRequestCallId === this.updateQtyApiCallId) {
          let message = "Updated product quantity successfully.";

          if (this.state.isFromSubscription) {
            message = "Product subscribed successfully.";
          }

          this.setState(
            {
              isFetching: false,
              isShowError: false,
              showAlertModal: true,
              message: message,
              isFromSubscription: false,
            },
            () => {
              this.getToken();
            }
          );
        }
        // Customizable Area Start
        // Customizable Area End
      } else {
        if (
          apiRequestCallId === this.updateQtyApiCallId &&
          responseJson?.success == true
        ) {
          let message = "Updated product quantity successfully.";

          if (this.state.isFromSubscription) {
            message = "Product subscribed successfully.";
          }

          this.setState(
            {
              isFetching: false,
              isShowError: false,
              showAlertModal: true,
              message: message,
              isFromSubscription: false,
            },
            () => {
              this.getToken();
            }
          );
        }
      }

      if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.addToCartApiCallId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            customErrorModal: true,
            message: this.parseApiErrorResponse(responseJson),
            productsAddingToCart: [],
          });
        } else if (apiRequestCallId === this.putItemToCartApiCallId) {
          this.setState({
            productsAddingToCart: [],
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            customErrorModal: true,
            message: this.parseApiErrorResponse(responseJson),
          });
        }
        else if (apiRequestCallId === this.increaseOrDecreaseCartQuantityApiCallId) {
          this.setState({
            productsAddingToCart: [],
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            customErrorModal: true,
            message: this.parseApiErrorResponse(responseJson),
          });
        }
        else if (apiRequestCallId === this.getCartProductDescriptionId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: this.parseApiErrorResponse(responseJson),
          });
        } else if (apiRequestCallId === this.getBuyProductApiCallId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: this.parseApiErrorResponse(responseJson),
          });
        } else if (apiRequestCallId === this.getNotifyProductApiCallId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: responseJson.errors,
          });
        } else if (apiRequestCallId === this.addToWishlistApiCallId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: responseJson.errors,
            productWishlisting: null,
          });
        } else if (apiRequestCallId === this.removeFromWishlistApiCallId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: responseJson.errors,
            productWishlisting: null,
          });
        } else if (apiRequestCallId === this.getCartId) {
          this.setState({ cart: null });
        } else if (apiRequestCallId === this.getCartProductId) {
          this.setState({ cartProduct: null });
        } else if (apiRequestCallId === this.updateQtyApiCallId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: this.parseApiErrorResponse(responseJson),
          });
        }
        // Customizable Area Start
        else if (apiRequestCallId === this.addPrescriptionApiCallId) {
          let errorMessage = this.parseApiErrorResponse(
            responseJson.errors[0].message
          );
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorMessage,
          });
          return;
        }
        // Customizable Area End
      }
      if (responseJson?.message) {
        if (apiRequestCallId === this.addToCartApiCallId) {
          this.setState({
            isFetching: false,
            isShowError: false,
            showAlertModal: true,
            message: responseJson?.message,
            productsAddingToCart: [],
          });
        }
        else if (apiRequestCallId === this.putItemToCartApiCallId) {
          this.setState({
            productsAddingToCart: [],
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: responseJson?.message,
          });
        } else if (apiRequestCallId === this.increaseOrDecreaseCartQuantityApiCallId) {
          this.setState({
            productsAddingToCart: [],
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: responseJson?.message,
          });
        } else if (apiRequestCallId === this.getCartProductDescriptionId) {
        } else if (apiRequestCallId === this.getNotifyProductApiCallId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: responseJson?.message,
          });
        } else if (apiRequestCallId === this.addToWishlistApiCallId) {
          this.setState({
            isShowError: false,
            showAlertModal: true,
            isFetching: false,
            message: responseJson?.message,
            productWishlisting: null,
          });
        } else if (apiRequestCallId === this.removeFromWishlistApiCallId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: responseJson?.message,
            productWishlisting: null,
          });
        } else if (apiRequestCallId === this.getCartProductId) {
          this.setState({ cartProduct: null });
        }
       else if (apiRequestCallId === this.updateQtyApiCallId) {
          this.setState({
            isShowError: false,
            showAlertModal: true,
            isFetching: false,
            message: responseJson?.message,
          });
        }
        // Customizable Area Start
        else if (apiRequestCallId === this.addPrescriptionApiCallId) {
          this.setState({
            prescriptionModal: false,
            isFetching: false,
          });
          this.props.navigation.push("Checkout", {
            isFromBuyNow: true,
            buyNowCartID: this.state.buyNowDoneCartID,
          });
        }
        // Customizable Area End
      }
      if (errorReponse) {
        this.setState({
          isFetching: false,
        });
        if (apiRequestCallId === this.addToCartApiCallId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorReponse,
            productsAddingToCart: [],
          });
        }
        else if (apiRequestCallId === this.putItemToCartApiCallId) {
          this.setState({
            productsAddingToCart: [],
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorReponse,
          });
        } else if (apiRequestCallId === this.increaseOrDecreaseCartQuantityApiCallId) {
          this.setState({
            productsAddingToCart: [],
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: responseJson?.message,
          });
        } else if (apiRequestCallId === this.getCartProductDescriptionId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorReponse,
          });
        } else if (apiRequestCallId === this.getNotifyProductApiCallId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorReponse,
          });
        } else if (apiRequestCallId === this.addToWishlistApiCallId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorReponse,
            productWishlisting: null,
          });
        } else if (apiRequestCallId === this.removeFromWishlistApiCallId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorReponse,
            productWishlisting: null,
          });
        } else if (apiRequestCallId === this.getCartProductId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorReponse,
            cartProduct: null,
          });
        }
        else if (apiRequestCallId === this.getCartId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorReponse,
            cart: null,
          });
        }
        // Customizable Area Start
        // Customizable Area End
      }
    }
    // Customizable Area Start
    // Customizable Area End
  }

  getProductDescriptionRequest = async (token: any) => {
    let arr = this.props.navigation.getParam("productData");
    if (this.props.navigation.state.params.isFromSP && arr) {
      arr.id = arr?.product?.id;
    }
    this.getProductDescriptionApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.productDescriptionAPiEndPoint + "/" + arr?.id,
    });
  };

  getProductDescriptionSuccessCallBack = (responseJson: any) => {
    let catalogueVariantId = "";
    if (responseJson?.data?.attributes?.catalogue_variants?.length > 0) {
      let count = 0;
      responseJson?.data?.attributes?.catalogue_variants?.map(
        (varient: any) => {
          if (varient.attributes.stock_qty > 0 && count === 0) {
            catalogueVariantId = varient.id;
            count = count + 1;
          }
        }
      );
    }
    const selectedProduct =
      responseJson?.data?.attributes?.catalogue_variants?.find(
        (cat: any) =>
          cat.id == this.props.navigation.state.params?.catalogue_variant_id
      );
      const isFromCart = this.props.navigation.state.params?.catalogue_variant_id;
      const productData = responseJson?.data?.attributes;
      let isProductAvailable = false;
      let isVariantProduct = productData?.catalogue_variants?.length > 0;
  
      let defaultSelectedAttributes: any = {}
      if (isVariantProduct) {
        if (isFromCart) {
          isProductAvailable = true;
        }
        else if (productData.default_variant) {
          const defaultVariantObject = productData?.catalogue_variants?.find((v: any)=> Number(v.id) == productData.default_variant.id);
          if (defaultVariantObject) { 
            defaultVariantObject?.attributes?.catalogue_variant_properties?.forEach((cvp: any) => {
              defaultSelectedAttributes[cvp.attributes.variant_name] = {
                name: cvp?.attributes?.property_name,
                variant_property_id: cvp?.attributes?.variant_property_id,
              };
            })
          }
        }
      } else {
        isProductAvailable = true;
      }
    this.setState(
      {
        isFetching: false,
        productData: responseJson?.data,
        similarproductList: responseJson?.data?.attributes?.similar_products?.data,
        selectedProduct: selectedProduct || null,
        catalogue_id: responseJson?.data?.id,
        showNotifyButton: responseJson?.data?.attributes?.product_notified,
        isProductAvailable: isProductAvailable,
        quantity:
          selectedProduct && selectedProduct?.attributes?.cart_quantity
            ? selectedProduct?.attributes?.cart_quantity
            : isVariantProduct
              ? 1
              : productData?.cart_quantity
                ? productData?.cart_quantity
                : 1,
        updateCart: selectedProduct
          ? responseJson?.data?.attributes?.variants_in_cart.includes(
            selectedProduct?.attributes?.id
          )
            ? true
            : false
          : productData?.cart_quantity
            ? true
            : false,
        availableAttributes: responseJson?.data?.attributes?.product_attributes,
        catalogue_variant_id:
          this.props.navigation.state.params?.catalogue_variant_id ||
          catalogueVariantId,
        isVariantProduct:
          responseJson?.data?.attributes?.catalogue_variants?.length > 0,
        isSubscriptionAvailable:
          responseJson?.data?.attributes?.is_subscription_available,
        subscriptionQuantity: responseJson?.data?.attributes?.subscription_quantity
          ? responseJson?.data?.attributes?.subscription_quantity
          : 1,
        subscriptionCartHasProduct: responseJson?.data?.attributes?.subscription_quantity
          ? true
          : false,
          selectedAttributes: defaultSelectedAttributes
      },
      () => {
        if (isFromCart) {
          this.setDefaultVarient();
        }
        // this.setDefaultVarient();
        this.setSubscriptionData();
        this.setSelectedProduct();
      }
    );
  };

  updateMyWhishList = () => {
    try {
      if (this.LikeFlag == "description") {
        let temp = { ...this.state.productData };

        temp.attributes.wishlisted =
          !this.state.productData?.attributes?.wishlisted;
        this.setState({ productData: temp });
      } else if (this.LikeFlag == "similarProducts") {
        let temp = { ...this.state.productData };
        let TempData = temp.attributes.similar_products.data.filter(
          (item: any) => {
            if (item.id == this.LikeFlagId) {
              item.attributes.wishlisted = !item.attributes.wishlisted;
            }
            return item;
          }
        );
        temp.attributes.similar_products.data = TempData;
        this.setState({ productData: temp, similarproductList: temp?.attributes?.similar_products?.data });
      }
    } catch (exc) {

    }
  };
  getCartProductDescriptionSuccessCallBack = (responseJson: any) => {
    let catalogueVariantId = "";
    if (responseJson?.data.attributes?.catalogue_variants?.length > 0) {
      let count = 0;
      responseJson?.data?.attributes?.catalogue_variants?.map(
        (varient: any) => {
          if (varient?.attributes.stock_qty > 0 && count === 0) {
            catalogueVariantId = varient.id;
            count = count + 1;
          }
        }
      );
    }
    const selectedProduct =
      responseJson?.data.attributes.catalogue_variants.find(
        (cat: any) =>
          cat.id == this.props.navigation.state.params?.catalogue_variant_id
      );
    const productData = responseJson?.data.attributes;
    const isFromCart = this.props.navigation.state.params?.catalogue_variant_id;
    let isProductAvailable = false;
    if (responseJson?.data.attributes.catalogue_variants.length > 0) {
      if (isFromCart) {
        isProductAvailable = true;
      }
    } else {
      isProductAvailable = true;
    }
    let isVariantProduct =
      responseJson?.data.attributes.catalogue_variants.length > 0;
    this.setState(
      {
        isFetching: false,
        productData: responseJson?.data,
        selectedProduct: selectedProduct || null,
        quantity:
          selectedProduct && selectedProduct.attributes.cart_quantity
            ? selectedProduct.attributes.cart_quantity
            : isVariantProduct
              ? 1
              : productData.cart_quantity
                ? productData.cart_quantity
                : 1,
        updateCart: selectedProduct
          ? responseJson?.data.attributes.variants_in_cart.includes(
            selectedProduct.attributes.id
          )
            ? true
            : false
          : productData.cart_quantity
            ? true
            : false,
        availableAttributes: responseJson?.data.attributes?.product_attributes,
        showNotifyButton: responseJson?.data.attributes.product_notified,
        catalogue_variant_id:
          this.props.navigation.state.params?.catalogue_variant_id ||
          catalogueVariantId,
        isProductAvailable: isProductAvailable,
        isVariantProduct:
          responseJson?.data.attributes.catalogue_variants.length > 0,
        isSubscriptionAvailable:
          responseJson?.data.attributes.is_subscription_available,
        subscriptionQuantity: responseJson?.data.attributes
          .subscription_quantity
          ? responseJson?.data.attributes.subscription_quantity
          : 1,
        subscriptionCartHasProduct: responseJson?.data.attributes
          .subscription_quantity
          ? true
          : false,
      },
      () => {
        if (isFromCart) {
          this.setDefaultVarient();
        }
        this.setSubscriptionData();
        this.setSelectedProduct();
      }
    );
  };

  setDefaultVarient = () => {
    const { attributes } = this.state.productData;
    const { catalogue_variants } = attributes;
    if (catalogue_variants?.length > 0) {
      catalogue_variants?.map((varient: any, index: any) => {
        if (varient.id == this.state?.catalogue_variant_id) {
          const { images } = varient?.attributes;
          let isVarientImage = images?.data?.length > 0;
          let selectedAttributes = {};
          varient?.attributes?.catalogue_variant_properties?.map(
            (property: any) => {
              let data = {
                ...property,
                variant_property_id: property?.attributes.variant_property_id,
                name: property?.attributes.property_name,
              };
              selectedAttributes = {
                ...selectedAttributes,
                [property.attributes.variant_name]: data,
              };
            }
          );
          this.setState(
            {
              selectedAttributes: selectedAttributes,
              selectedImage: isVarientImage
                ? images.data[0].attributes.url
                : attributes.images.data[0].attributes.url,
              selectedProduct: varient,
            },
            () => {
              this.setAvailbleAttributesForSelected();
            }
          );
        }
      });
    }
  };

  onPressTool = (item: any, attribute: any) => {
    if (this.state.selectedAttributes[attribute]) {
      let selectedAttributes = this.state.selectedAttributes;
      let lastSelectedVariantPropertyID =
        selectedAttributes[attribute].variant_property_id;
      delete selectedAttributes[attribute];
      this.setState({ selectedAttributes: selectedAttributes }, () => {
        if (lastSelectedVariantPropertyID !== item.variant_property_id) {
          this.setState(
            {
              selectedAttributes: {
                ...this.state.selectedAttributes,
                [attribute]: item,
              },
              currentSelection: attribute,
            },
            () => {
              this.setSelectedProduct();
            }
          );
        } else {
          this.setSelectedProduct();
        }
      });
    } else {
      this.setState(
        {
          selectedAttributes: {
            ...this.state.selectedAttributes,
            [attribute]: item,
          },
          currentSelection: attribute,
        },
        () => {
          this.setSelectedProduct();
        }
      );
    }
  };

  notifyProduct = async () => {
    let catalogueVariantId = this.state.catalogue_variant_id;
    if (!this.state.isVariantProduct) {
      catalogueVariantId = this.state.catalogue_id;
      this.getNotifyProductApiCallId = await this.apiCall({
        contentType: configJSON.productApiContentType,
        method: configJSON.apiMethodTypePost,
        endPoint:
          configJSON.catalogueNotifyAPiEndPoint +
          catalogueVariantId +
          "/notify_product",
      });
    } else {
      if (catalogueVariantId === "") {
        catalogueVariantId =
          this.state.productData.attributes.catalogue_variants[0].id;
      }
      this.getNotifyProductApiCallId = await this.apiCall({
        contentType: configJSON.productApiContentType,
        method: configJSON.apiMethodTypePost,
        endPoint:
          configJSON.productNotifyAPiEndPoint +
          catalogueVariantId +
          "/notify_product",
      });
    }
  };

  updateQty = async (isFromVariant: any) => {
    let httpBody: any = {
      quantity: this.state.quantity,
      catalogue_id: Number(this.state.catalogue_id),
    };
    if (isFromVariant) {
      httpBody.catalogue_variant_id = this.state.catalogue_variant_id;
    }

    this.updateQtyApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypePut,
      endPoint:
        configJSON.updateQtyEndPoint +
        this.state.cart_id +
        "/update_item_quantity",
      body: httpBody,
    });
  };

  onUpdateCartValue = (value: boolean) => {
    if (value) {
      var qty = Number(this.state.quantity) + 1;
      this.setState({
        quantity: String(qty),
      });
    } else {
      var qty =
        this.state.quantity == "1" ? 1 : Number(this.state.quantity) - 1;
      this.setState({
        quantity: String(qty),
      });
    }
  };

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    const token = (await StorageProvider?.get("Userdata")) || "";

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
  addToCart = async () => {
    const { productData, selectedProduct, quantity } = this.state;
    const { cart_quantity } = productData.attributes;
    const isUpdate = selectedProduct
      ? selectedProduct?.attributes?.cart_quantity !== Number(quantity) &&
      selectedProduct?.attributes?.cart_quantity > 0
      : cart_quantity !== Number(quantity) && cart_quantity > 0;
    const isInCart = selectedProduct
      ? selectedProduct?.attributes?.cart_quantity > 0
      : cart_quantity > 0;
    if (isInCart && !isUpdate) {
      this.props.navigation.navigate("Shoppingcart");
      return;
    }
    if (productData.attributes.catalogue_variants.length > 0) {
      if (this.state.catalogue_variant_id) {
        const httpBody = {
          catalogue_id: this.state.catalogue_id,
          catalogue_variant_id: this.state.catalogue_variant_id,
          quantity: this.state.quantity,
        };

        this.setState({ isFetching: true });
        if (
          this.state.cartProduct?.has_cart_product &&
          this.state.cartProduct.order_id !== null
        ) {
          if (this.state.updateCart) {
            this.updateQty(true);
          } else {
            this.addToCartApiCallId = await this.apiCall({
              contentType: configJSON.productApiContentType,
              method: configJSON.apiMethodTypePut,
              endPoint:
                configJSON.addToCartApiEndPoint +
                this.state.cartProduct.order_id +
                "/add_item",
              body: httpBody,
            });
          }
        } else {
          this.addToCartApiCallId = await this.apiCall({
            contentType: configJSON.productApiContentType,
            method: configJSON.apiMethodTypePost,
            endPoint: configJSON.addToCartApiEndPoint,
            body: httpBody,
          });
        }
      } else {
        this.setState({
          showAlertModal: true,
          isShowError: true,
          message: "Please select a variant",
        });
      }
    } else {
      const httpBody = {
        catalogue_id: this.state.catalogue_id,
        quantity: this.state.quantity,
      };

      this.setState({ isFetching: true });
      if (
        this.state.cartProduct?.has_cart_product &&
        this.state.cartProduct.order_id !== null
      ) {
        if (this.state.updateCart) {
          this.updateQty(false);
        } else {
          this.addToCartApiCallId = await this.apiCall({
            contentType: configJSON.productApiContentType,
            method: configJSON.apiMethodTypePut,
            endPoint:
              configJSON.addToCartApiEndPoint +
              this.state.cartProduct.order_id +
              "/add_item",
            body: httpBody,
          });
        }
      } else {
        this.addToCartApiCallId = await this.apiCall({
          contentType: configJSON.productApiContentType,
          method: configJSON.apiMethodTypePost,
          endPoint: configJSON.addToCartApiEndPoint,
          body: httpBody,
        });
      }
    }
  };

  onPressBuyNow = async () => {
    const { productData } = this.state;
    if (this.state.isGuestUser) {
      this.setState({ showGuestModal: true });
      return;
    }
    if (productData.attributes.catalogue_variants.length > 0) {
      if (this.state.catalogue_variant_id) {
        const httpBody = {
          catalogue_id: this.state.catalogue_id,
          catalogue_variant_id: this.state.catalogue_variant_id,
          quantity: this.state.quantity,
        };
        this.setState({ isFetching: true });
        this.getBuyProductApiCallId = await this.apiCall({
          contentType: configJSON.productApiContentType,
          method: configJSON.apiMethodTypePost,
          endPoint: configJSON.buyNowAPiEndPoint,
          body: httpBody,
        });
      } else {
        this.setState({
          showAlertModal: true,
          isShowError: true,
          message: "Please select a variant",
        });
      }
    } else {
      const httpBody = {
        catalogue_id: this.state.catalogue_id,
        quantity: this.state.quantity,
      };
      this.setState({ isFetching: true });
      this.getBuyProductApiCallId = await this.apiCall({
        contentType: configJSON.productApiContentType,
        method: configJSON.apiMethodTypePost,
        endPoint: configJSON.buyNowAPiEndPoint,
        body: httpBody,
      });
    }
  };

  addToWishlist = async (id: any) => {
    const httpBody = {
      catalogue_id: id,
    };
    this.addToWishlistApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypePost,
      endPoint: configJSON.addToWishlistApiEndPoint,
      body: httpBody,
    });
  };

  removeFromWishlist = async (id: any) => {
    this.removeFromWishlistApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.DeleteMethodType,
      endPoint: configJSON.addToWishlistApiEndPoint + "/remove_catalogue/" + id,
    });
  };

  onHeartPress = (item: any, pageName: string) => {
    this.LikeFlag = pageName;
    this.setState({ productWishlisting: item.id })
    if (pageName === "description") {
      this.setState({ isFetching: true });
      item.attributes?.wishlisted
        ? this.removeFromWishlist(item.id)
        : this.addToWishlist(item.id);
      this.LikeFlagId = item.id;
    } else if (pageName == "similarProducts") {
      this.LikeFlagId = item.id;
      item.attributes?.wishlisted
        ? this.removeFromWishlist(item.id)
        : this.addToWishlist(item.id);
    }
  };

  addToCartPress = async (item: any) => {

    const isInCart = item?.attributes?.cart_quantity > 0 ? true : false
    if (isInCart) {
      this.props.navigation.navigate("Shoppingcart");
      return;
    }
    if (item?.attributes?.catalogue_variants?.length > 0) {

      const httpBody = {
        catalogue_id: item.id,
        catalogue_variant_id: item.attributes.catalogue_variants[0].id,
        quantity: 1,
      };
      this.addToCartApiCallId = await this.apiCall({
        contentType: configJSON.productApiContentType,
        method: configJSON.apiMethodTypePost,
        endPoint: configJSON.addToCartApiEndPoint,
        body: httpBody,
      });
    } else {
      const httpBody = {
        catalogue_id: item.id,
        quantity: 1,
      };
      this.addToCartApiCallId = await this.apiCall({
        contentType: configJSON.productApiContentType,
        method: configJSON.apiMethodTypePost,
        endPoint: configJSON.addToCartApiEndPoint,
        body: httpBody,
      });
    }
  };

  getCartHasProduct = async (num: number) => {
    if (num <= 0) {
      this.setState({ isFetching: true });
    }
    this.getCartProductId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.cartHasProductAPIEndPoint,
    });
  };
  getCart = async () => {
    this.setState({ isFetching: true });
    this.getCartId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.getCartApiEndPoint,
    });
  };

  getCartProduct = async (cart_id: any) => {
    let arr = this.props.navigation.getParam("productData");
    this.setState({ isFetching: true });
    this.getCartProductDescriptionId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: `${configJSON.cartQuantity}${arr.id}?cart_id=${cart_id}`,
    });
  };

  getStarImage = (index: number, ratingValue: any) => {
    if (index < ratingValue) {
      let diffValue = ratingValue - index;
      if (diffValue < 1) {
        if (diffValue < 0.5) {
          return IMG_CONST.LOWER_SELECTED_STAR;
        } else if (diffValue === 0.5) {
          return IMG_CONST.HALF_SELECTED_STAR;
        } else {
          return IMG_CONST.UPPER_SELECTED_STAR;
        }
      }
      return IMG_CONST.SELECTED_STAR;
    } else {
      return IMG_CONST.UNSELECTED_STAR;
    }
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message: this.state.productData.attributes?.deep_link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(String(error));
    }
  };

  setAvailbleAttributesForSelected = () => {
    const {
      productData,
      selectedAttributes,
      selectedProduct,
    } = this.state;
    const {
      catalogue_variants,
      variants_in_cart,
      cart_quantity,
    } = productData.attributes;
    let availableAttributes: any = {};
    if (catalogue_variants) {
      catalogue_variants?.map((item: any, index: number) => {
        const { catalogue_variant_properties } = item.attributes;
        let attributeFound = false;
        let selectedVarientPropertyIds = [];
        let varientPropertyIds: any = [];
        catalogue_variant_properties?.map((variantProperty: any) => {
          varientPropertyIds.push(
            variantProperty.attributes.variant_property_id
          );
        });

        for (const attribute in selectedAttributes) {
          selectedVarientPropertyIds.push(
            selectedAttributes[attribute].variant_property_id
          );
        }

        attributeFound = selectedVarientPropertyIds.every((val) =>
          varientPropertyIds.includes(val)
        );
        if (attributeFound) {
          catalogue_variant_properties?.map((variantProperty: any) => {
            let varientPropertyArray = availableAttributes[
              variantProperty.attributes.variant_name
            ]
              ? availableAttributes[variantProperty.attributes.variant_name]
              : [];
            varientPropertyArray.findIndex(
              (item: any) =>
                item.variant_property_id ===
                variantProperty.attributes.variant_property_id
            ) === -1 &&
              varientPropertyArray.push({
                name: variantProperty.attributes.property_name,
                variant_property_id:
                  variantProperty.attributes.variant_property_id,
                catalogue_variant_id:
                  variantProperty.attributes.catalogue_variant_id,
              });
            availableAttributes = {
              ...availableAttributes,
              [variantProperty.attributes.variant_name]: varientPropertyArray,
            };
          });
        }
      });
      if (Object.keys(availableAttributes).length === 0) {
        return;
      }
      this.setState(
        {
          availableAttributes: availableAttributes,
          updateCart: selectedProduct
            ? variants_in_cart.includes(
              this.state.selectedProduct.attributes.id
            )
              ? true
              : false
            : cart_quantity
              ? true
              : false,
        },
        () => {
        }
      );
    }
  };

  checkSelectedInAvailable = () => {
    const { selectedAttributes, availableAttributes } = this.state;
    let selectedVarientPropertyIds = [];
    let availablePropertIds: any = [];
    for (const attribute in selectedAttributes) {
      selectedVarientPropertyIds.push(
        selectedAttributes[attribute].variant_property_id
      );
    }
    if (availableAttributes) {
      for (const attribute in availableAttributes) {
        availableAttributes[attribute]?.map((item: any) => {
          availablePropertIds.push(item.variant_property_id);
        });
      }
      return (
        JSON.stringify(selectedVarientPropertyIds.sort()) ===
        JSON.stringify(availablePropertIds.sort())
      );
    }
    return true;
  };

  setSelectedProduct = () => {
    const { productData, selectedAttributes } = this.state;
    const { catalogue_variants } = productData?.attributes;
    let isSelectedFound = false;
    catalogue_variants?.map((item: any, index: number) => {
      let varientPropertyIds: any = [];
      let selectedVarientPropertyIds: any = [];
      const { catalogue_variant_properties } = item.attributes;
      catalogue_variant_properties?.map((variantProperty: any) => {
        if (selectedAttributes[variantProperty.attributes.variant_name]) {
          selectedVarientPropertyIds.push(
            selectedAttributes[variantProperty.attributes.variant_name]
              .variant_property_id
          );
        } else {
          selectedVarientPropertyIds.push(1);
        }

        if (
          selectedAttributes[variantProperty.attributes.variant_name] &&
          selectedAttributes[variantProperty.attributes.variant_name]
            .variant_property_id ===
          variantProperty.attributes.variant_property_id
        ) {
          varientPropertyIds.push(
            variantProperty.attributes.variant_property_id
          );
        } else {
          varientPropertyIds.push(0);
        }
      });

      if (isSelectedFound) {
        return;
      }

      if (varientPropertyIds.length === selectedVarientPropertyIds.length) {
        if (
          JSON.stringify(selectedVarientPropertyIds.sort()) ===
          JSON.stringify(varientPropertyIds.sort()) &&
          Object.keys(selectedAttributes).length === varientPropertyIds.length
        ) {
          isSelectedFound = true;
          this.setState(
            {
              selectedProduct: item,
              selectedImage:
                item.attributes.images.data?.length > 0
                  ? item.attributes.images.data[0].attributes.url
                  : "",
              productQuantity:
                this.state.quantity > 1 ? this.state.quantity : 1,
              catalogue_variant_id: item.id,
              showAlertModal: false,
              isProductAvailable: true,
            },
            () => {
              this.setAvailbleAttributesForSelected();
              this.setState({
                quantity: this.state.selectedProduct?.attributes?.cart_quantity
                  ? this.state.selectedProduct?.attributes?.cart_quantity
                  : 1,
              });
            }
          );
        } else {
          this.setState({
            isShowError: true,
            showAlertModal: false,
            isProductAvailable: false,
            selectedImage: null,
            selectedProduct: null,
            message: "Selected combination does not exist",
          });
        }
      } else {
        this.setState({ selectedProduct: undefined });
      }
    });
  };

  onChangeSubscriptionQuantity = (isFromAdd: any) => {
    if (isFromAdd) {
      this.setState({
        subscriptionQuantity: this.state.subscriptionQuantity + 1,
      });
    } else {
      if (this.state.subscriptionQuantity === 1) {
        return;
      } else {
        this.setState({
          subscriptionQuantity: this.state.subscriptionQuantity - 1,
        });
      }
    }
  };

  getSubscriptionPackage = () => {
    let localSubscriptionPackageData = this.state.subscriptionPackageData;
    let defaultSelectedIndex = localSubscriptionPackageData.findIndex(
      (packageItem: any) => packageItem.isSelected === true
    );
    return localSubscriptionPackageData[defaultSelectedIndex].name;
  };

  getSubscriptionPeriod = () => {
    return Number(this.state.period);
  };

  getSubcriptionSlot = () => {
    return this.state.selectedTimeSlot;
  };

  onPressSubscribeAddToCart = async () => {
    if (this.state.subscriptionPackage.trim().length === 0) {
      this.setState({ invalidSubscriptionPackage: true });
      return;
    } else if (this.state.period.trim().length === 0) {
      this.setState({ invalidSubscriptionPeriod: true });
      return;
    } else if (
      !this.state.selectedTimeSlot &&
      this.state.invalidateSubscriptionTimeSlot
    ) {
      return;
    }
    const { attributes } = this.state.productData;
    this.setState(
      { showAddCartModal: false, isFromSubscription: true },
      async () => {
        let subscriptionPackage = this.getSubscriptionPackage();
        let subscriptionPeriod = this.getSubscriptionPeriod();
        let subscriptionSlot = this.getSubcriptionSlot();
        let httpBody: any = {
          catalogue_id: Number(this.state.catalogue_id),
          subscription_quantity: this.state.subscriptionQuantity,
          subscription_package: subscriptionPackage,
          subscription_period: subscriptionPeriod,
          preferred_delivery_slot: subscriptionSlot,
          subscription_discount: this.state.subscriptionDiscount,
        };
        this.setState({ isFetching: true });
        if (
          this.state.cartProduct?.has_cart_product &&
          this.state.cartProduct.order_id !== null
        ) {
          if (this.state.subscriptionQuantity > 1) {
            this.updateQtyApiCallId = await this.apiCall({
              contentType: configJSON.productApiContentType,
              method: configJSON.apiMethodTypePut,
              endPoint:
                configJSON.updateQtyEndPoint +
                this.state.cart_id +
                "/update_item_quantity",
              body: httpBody,
            });
          } else {
            if (attributes.subscription_quantity) {
              this.updateQtyApiCallId = await this.apiCall({
                contentType: configJSON.productApiContentType,
                method: configJSON.apiMethodTypePut,
                endPoint:
                  configJSON.updateQtyEndPoint +
                  this.state.cart_id +
                  "/update_item_quantity",
                body: httpBody,
              });
            } else {
              this.addToCartApiCallId = await this.apiCall({
                contentType: configJSON.productApiContentType,
                method: configJSON.apiMethodTypePut,
                endPoint:
                  configJSON.addToCartApiEndPoint +
                  this.state.cartProduct.order_id +
                  "/add_item",
                body: httpBody,
              });
            }
          }
        } else {
          this.addToCartApiCallId = await this.apiCall({
            contentType: configJSON.productApiContentType,
            method: configJSON.apiMethodTypePost,
            endPoint: configJSON.addToCartApiEndPoint,
            body: httpBody,
          });
        }
      }
    );
  };

  onPressBuyNowSubscription = async () => {
    if (this.state.subscriptionPackage.trim().length === 0) {
      this.setState({ invalidSubscriptionPackage: true });
      return;
    } else if (this.state.period.trim().length === 0) {
      this.setState({ invalidSubscriptionPeriod: true });
      return;
    } else if (
      !this.state.selectedTimeSlot &&
      this.state.invalidateSubscriptionTimeSlot
    ) {
      return;
    }
    this.setState(
      { showAddCartModal: false, isFromSubscription: true },
      async () => {
        let subscriptionPackage = this.getSubscriptionPackage();
        let subscriptionPeriod = this.getSubscriptionPeriod();
        let subscriptionSlot = this.getSubcriptionSlot();
        let httpBody: any = {
          catalogue_id: Number(this.state.catalogue_id),
          subscription_quantity: this.state.subscriptionQuantity,
          subscription_package: subscriptionPackage,
          subscription_period: subscriptionPeriod,
          preferred_delivery_slot: subscriptionSlot,
          subscription_discount: this.state.subscriptionDiscount,
        };
        this.setState({ isFetching: true });
        this.getBuyProductApiCallId = await this.apiCall({
          contentType: configJSON.productApiContentType,
          method: configJSON.apiMethodTypePost,
          endPoint: configJSON.buyNowAPiEndPoint,
          body: httpBody,
        });
      }
    );
  };

  setSubscriptionData = () => {
    this.setState({
      invalidSubscriptionPackage: false,
      invalidSubscriptionPeriod: false,
    });
    const {
      available_subscription,
      subscription_package,
      subscription_period,
      is_subscription_available,

    } = this.state.productData.attributes;

    if (!is_subscription_available) {
      return;
    }
    if (available_subscription) {
      let localSubscriptionPeriodData: any = [];
      let localSubscriptionPackageData: any = [];
      let indexValue = 0;
      let packageKeys = Object.keys(available_subscription);
      if (subscription_package) {
        indexValue = packageKeys.findIndex(
          (item) => item.toLowerCase() === subscription_package.toLowerCase()
        );
      }
      packageKeys?.map((item, index) => {
        localSubscriptionPackageData.push({
          id: index,
          name: item.charAt(0).toUpperCase() + item.slice(1),
          isSelected: false,
        });
      });
      available_subscription[packageKeys[indexValue]]?.map((item: any) => {
        localSubscriptionPeriodData.push({
          label: `${item} Month`,
          value: item,
        });
      });
      this.setState(
        {
          subscriptionPackageData: localSubscriptionPackageData,
          subscriptionPeriodData: localSubscriptionPeriodData,
          productSubscriptions: available_subscription,
        },
        () => {
          if (subscription_package) {
            localSubscriptionPackageData = this.state.subscriptionPackageData;
            let selectedIndex = localSubscriptionPackageData.findIndex(
              (packageItem: any) => packageItem.name === subscription_package
            );
            let defaultSelectedIndex = localSubscriptionPackageData.findIndex(
              (packageItem: any) => packageItem.isSelected === true
            );
            if (defaultSelectedIndex !== -1) {
              localSubscriptionPackageData[defaultSelectedIndex].isSelected =
                false;
            }
            localSubscriptionPackageData[selectedIndex].isSelected = true;
            this.setState({
              subscriptionPackage:
                localSubscriptionPackageData[selectedIndex].name,
              subscriptionPackageData: localSubscriptionPackageData,
            });
          } else {
            this.setState({
              subscriptionPackage: "",
              subscriptionTimeSlotData: [],
              selectedTimeSlot: null,
            });
          }
          if (subscription_period) {
            let subscriptionPeriod = subscription_period.split(" ");
            this.setState({ period: subscriptionPeriod[0] }, () => {
              this.setSubSlots(0);
            });
          } else {
            this.setState({ period: "" });
          }
        }
      );
    }
  };

  onSelectSubscriptionPackage = (item: any) => {
    let localSubscriptionPackageData = this.state.subscriptionPackageData;
    let selectedIndex = localSubscriptionPackageData.findIndex(
      (packageItem: any) => packageItem.id === item.id
    );
    let defaultSelectedIndex = localSubscriptionPackageData.findIndex(
      (packageItem: any) => packageItem.isSelected === true
    );
    if (defaultSelectedIndex !== -1) {
      localSubscriptionPackageData[defaultSelectedIndex].isSelected = false;
    }
    localSubscriptionPackageData[selectedIndex].isSelected = true;

    let localSubscriptionPeriodData: any = [];
    let localProductSubscriptions = this.state.productSubscriptions;
    localProductSubscriptions[
      localSubscriptionPackageData[selectedIndex].name.toLowerCase()
    ]?.map((item: any) => {
      localSubscriptionPeriodData.push({
        label: `${item} month`,
        value: item,
      });
    });
    this.setState(
      {
        period: localSubscriptionPeriodData[0].value,
        invalidSubscriptionPackage: false,
        subscriptionPackage: localSubscriptionPackageData[selectedIndex].name,
        subscriptionPackageData: localSubscriptionPackageData,
        subscriptionPeriodData: localSubscriptionPeriodData,
        selectedSlotId: 0,
      },
      () => {
        this.setSubSlots(0);
      }
    );
  };

  onSelectSubscriptionPeriod = (item: any) => {
    this.setState(
      { invalidSubscriptionPeriod: false, period: item.value },
      () => this.setSubSlots(0)
    );
  };

  setSubSlots = (slotId: any) => {
    const { subscriptionPackage, productData, period } = this.state;
    const { catalogue_subscriptions } = productData.attributes;
    let id = slotId;
    let localSubscriptionSlots: any = [],
      morningSlotsData: any = [],
      eveningSlotsData: any = [];
    let localSlots = this.state.slots;

    if (subscriptionPackage && period) {
      catalogue_subscriptions?.map((sub: any) => {
        if (
          sub.attributes.subscription_package ===
          subscriptionPackage.toLowerCase() &&
          sub.attributes.subscription_period === period + " month"
        ) {
          const morningSlot = sub.attributes.morning_slot
            ? JSON.parse(sub.attributes.morning_slot)
            : null;
          const eveningSlot = sub.attributes.evening_slot
            ? JSON.parse(sub.attributes.evening_slot)
            : null;
          this.setState({ subscriptionDiscount: sub.attributes.discount });
          morningSlot?.map((item: any) => {
            if (item !== "") {
              morningSlotsData.push({ label: item, value: item });
            }
          });
          eveningSlot?.map((item: any) => {
            if (item !== "") {
              eveningSlotsData.push({ label: item, value: item });
            }
          });

          if (morningSlotsData.length > 0) {
            localSlots?.map((item: any) => {
              if (item.id === 0) {
                item.availabity = true;
              }
            });
          } else {
            localSlots?.map((item: any) => {
              if (item.id === 0) {
                item.availabity = false;
              }
            });
          }

          if (eveningSlotsData.length > 0) {
            localSlots?.map((item: any) => {
              if (item.id === 1) {
                item.availabity = true;
              }
            });
          } else {
            localSlots?.map((item: any) => {
              if (item.id === 1) {
                item.availabity = false;
              }
            });
          }

          if (id === 0) {
            localSubscriptionSlots = morningSlotsData;
            if (!(morningSlotsData.length > 0)) {
              id = 1;
            }
          }

          if (id === 1) {
            localSubscriptionSlots = eveningSlotsData;
          }
        }
      });
    }

    this.setState(
      {
        subscriptionTimeSlotData: localSubscriptionSlots,
        selectedSlotId: id,
        selectedTimeSlot:
          localSubscriptionSlots.length > 0
            ? localSubscriptionSlots[0].value
            : null,
        invalidateSubscriptionTimeSlot: false,
        slots: localSlots,
      },
      () => {
      }
    );
  };

  onSelectSubscriptionTimeSlot = (item: any) => {
    this.setState({
      invalidateSubscriptionTimeSlot: false,
      selectedTimeSlot: item.value,
    });
  };

  onPressSubscriptionButton = () => {
    if (this.state.isGuestUser) {
      this.setState({ showGuestModal: true });
      return;
    } else {
      this.setState({ showAddCartModal: true });
    }
  };
  // Customizable Area Start
  addToCartsimilar = (product: any) => {
    this.setState({
      productsAddingToCart: [...this.state.productsAddingToCart, product.id],
    });
    if (this.state.cart_id) {
      this.putItemToCart(this.state.cart_id, product, "")
    }
    else {
      this.addToCartPress(product);
    }
  };

  putItemToCart = async (cartId: any, product: any, type: string) => {
    let httpBody: any;
    if (product.catalogue_id && product?.attributes.catalogue_variants[0].id) {
      httpBody = {
        catalogue_id: product.catalogue_id,
        catalogue_variant_id: parseInt(product?.attributes.catalogue_variants[0].id),
        quantity: this.state.itemQuantity,
      };
      await StorageProvider.set(
        "catalogue_variant_id",
        product?.attributes.catalogue_variants[0].id
      );
    } else {
      httpBody = {
        catalogue_id: product.id,
        quantity: this.state.itemQuantity,
      };
    }

    this.putItemToCartApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypePut,
      endPoint: configJSON.addToCartApiEndPoint +
        `${cartId}/add_item`,
      body: httpBody,
    });
  };

  increaseOrDecreaseCartQuantity = async (product: any, increment: number) => {
    this.setState({
      productsAddingToCart: [...this.state.productsAddingToCart, product.id]
    });
    let httpBody: any;
    let endPointFullPath: string;
    let method: string;

    if (product.attributes.cart_quantity + increment > 0) {
      httpBody = {
        quantity: product.attributes.cart_quantity + increment,
        catalogue_id: product.id,
      };
      endPointFullPath = configJSON.addToCartApiEndPoint +
        `${this.state.cart_id}/update_item_quantity`
      this.increaseOrDecreaseCartQuantityApiCallId = await this.apiCall({
        contentType: configJSON.productApiContentType,
        method: configJSON.apiMethodTypePut,
        endPoint: endPointFullPath,
        body: httpBody,
      });
    }
    else {
      httpBody = {
        catalogue_id: product.id,
        catalogue_variant_id: ""
      }
      endPointFullPath = configJSON.addToCartApiEndPoint +
        `${this.state.cart_id}/delete_item`
      this.increaseOrDecreaseCartQuantityApiCallId = await this.apiCall({
        contentType: configJSON.productApiContentType,
        method: configJSON.DeleteMethodType,
        endPoint: endPointFullPath,
        body: httpBody,
      });
    }


  }
  // Customizable Area End
}
