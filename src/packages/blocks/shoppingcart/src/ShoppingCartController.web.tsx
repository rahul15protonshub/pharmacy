import React from "react";
import { AsyncStorage } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  cart: any;
  wholeCart: any;
  cartId: any;
  catalogue_id: any;
  couponSuccess: any;
  isRealeasedShippingCharge: boolean;
  loading: boolean;
  buyNow: any;
  buyNowQuantity: any;
  alreadyInWishlist: boolean;
  removeCartItemData?: any;
  subscriptionReqBody?: any;

  removeItemHaveSubscription?: any;
  isFirst: boolean;

  // Customizable Area Start
  couponCodeError: any;
  // Customizable Area End
}
interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
// Customizable Area End

export default class DashboardController extends BlockComponent<Props, S, SS> {
  auth: string | null | undefined = localStorage.getItem("token");
  GetCartApiCallId: string = "";
  releaseShippingAddressChargeCallId: string = "";
  putUpdateCartQuantityApiCallId: string = "";
  delCartItemApiCallId: string = "";
  postWishlistApiCallId: string = "";
  postApplyCouponApiCallId: string = "";
  delCouponApiCallId: string = "";
  postBuyNowApiCallId: string = "";
  // Customizable Area Start
  postPrescription:string="";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      cart: [],
      wholeCart: "",
      cartId: "",
      catalogue_id: "",
      couponSuccess: "",
      isRealeasedShippingCharge: false,
      loading: false,
      buyNow: JSON.parse(localStorage.getItem("buyNow") || "{}"),
      buyNowQuantity: 1,
      alreadyInWishlist: false,
      isFirst: true,
      // Customizable Area Start
      couponCodeError: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    Object.keys(this.state.buyNow).length > 0
      ? (this.postBuyNow(this.state.buyNow.cat_id, this.state.buyNow.sub_id),
        this.setState({
          subscriptionReqBody: this.state.buyNow.subscriptionReqBodyData,
        }))
      : this.getCart();
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      if (this.parseExpireTokenResponse(responseJson, this.state, this.props)) {
        if (responseJson) {
          const apiRequestCallId = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage)
          );
          if (apiRequestCallId != null) {
            if (apiRequestCallId === this.releaseShippingAddressChargeCallId) {
              this.setState(
                {
                  isFirst: false,
                },
                () => {
                  Object.keys(this.state.buyNow).length > 0
                    ? this.postBuyNow(
                        this.state.buyNow.cat_id,
                        this.state.buyNow.sub_id
                      )
                    : this.getCart();
                }
              );
            }
            // get cart
            if (apiRequestCallId === this.GetCartApiCallId) {
              if (responseJson && responseJson.data) {
                //console.log(responseJson.data[0], "here iscart")
                this.setState(
                  {
                    cart: responseJson.data[0]?.attributes?.order_items,
                    cartId: responseJson.data[0]?.id,
                    wholeCart: responseJson.data[0]?.attributes,
                    loading: false,
                  },
                  () => {
                    if (!this.state.isFirst) {
                      this.releaseShippingCharge();
                    }
                  }
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

            //update cart quantity

            if (apiRequestCallId === this.putUpdateCartQuantityApiCallId) {
              if (responseJson.data.id) {
                {
                  Object.keys(
                    JSON.parse(localStorage.getItem("buyNow") || "{}")
                  ).length == 0 && this.getCart();
                }
                // @ts-ignore
                // window.notify([
                //   { message: "Cart updated successfully ", type: "success" },
                // ]);
              } else {
                this.parseApiErrorResponse(responseJson);
              }
              //console.log(responseJson, "UpdateCartQuantity");
            }

            // delete cart item

            if (apiRequestCallId === this.delCartItemApiCallId) {
              //console.log(responseJson, "deleted cart");

              this.getCart();

              // @ts-ignore
              const cart_length = parseInt(localStorage.getItem("cart_length"));
              // @ts-ignore

              localStorage.setItem("cart_length", cart_length - 1);
            }

            /// add to wishlist

            if (apiRequestCallId === this.postWishlistApiCallId) {
              if (
                responseJson &&
                responseJson.data &&
                responseJson.message ==
                  "The item has been added to the wishlist"
              ) {
                this.setState({
                  ...this.state,
                  alreadyInWishlist: false,
                });
                //@ts-ignore
                // window.notify([
                //   { type: "success", message: responseJson.message },
                // ]);
                // @ts-ignore
                const wishlist_length = parseInt(
                  localStorage.getItem("wishlist_len") ?? "0"
                );
                // @ts-ignore
                localStorage.setItem("wishlist_len", wishlist_length + 1);
                var wishlistupdateMessage = new Message(
                  getName(MessageEnum.UpdateWishlist)
                );
                wishlistupdateMessage.addData(
                  getName(MessageEnum.UpdateWishlistLen),
                  wishlist_length + 1
                );
                runEngine.sendMessage(
                  wishlistupdateMessage.id,
                  wishlistupdateMessage
                );
                this.deleteCartItem(
                  this.state.removeCartItemData?.myCatId,
                  this.state.removeCartItemData?.myVarId
                );
              }
              if (
                responseJson.message ==
                "Could not add, maybe already present in wishlist"
              ) {
                this.setState({
                  alreadyInWishlist: true,
                });
                //@ts-ignore
                // window.notify([
                //   { type: "success", message: responseJson.message },
                // ]);
              }
            }

            //apply coupon
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
                window.notify([
                  { message: responseJson.errors[0], type: "error" },
                ]);
              } else {
                // @ts-ignore
                window.notify([
                  { message: responseJson.message, type: "warning" },
                ]);
              }
            }

            //post buynow
            if (apiRequestCallId === this.postBuyNowApiCallId) {
              //console.log(responseJson.data, "postbuy")
              if (responseJson && responseJson.data) {
                this.setState(
                  {
                    cart: responseJson.data.attributes.order_items,
                    cartId: responseJson.data.id,
                    wholeCart: responseJson.data.attributes,
                    loading: false,
                  },
                  this.releaseShippingCharge
                );
                localStorage.setItem(
                  "cart_length",
                  responseJson.data.attributes.order_items.length
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

            // delete coupon
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
          }
        }
        if (
          responseJson &&
          responseJson.errors &&
          responseJson.errors.length > 0
        ) {
          const errors = responseJson.errors[0].order;
          // @ts-ignore
          window.notify([{ message: errors, type: "error" }]);
        }
      }
    }
    // Customizable Area End
  }

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
  // get cart items
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
    // Customizable Area End
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
    // Customizable Area End
  };

  // delete cart item
  deleteCartItem = (product_id: any, product_variant: any): boolean => {
    // Customizable Area Start
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),
    };
    let httpBody: any;
    if (product_variant) {
      httpBody = {
        catalogue_variant_id: product_variant,
        catalogue_id: product_id,
      };
    }
    if (this.state.removeItemHaveSubscription) {
      httpBody = this.state.removeItemHaveSubscription;
    } else {
      httpBody = {
        catalogue_variant_id: product_variant,
        catalogue_id: product_id,
      };
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.delCartItemApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiPutUpdateCartQuantity +
        `${this.state.cartId}/delete_item`
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
      configJSON.delAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
    // Customizable Area End
  };

  /// add to wishlist
  postWishlist = (catalogue_id: any): boolean => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),
    };

    let httpBody: any;
    if (this.state.removeCartItemData?.myVarId) {
      httpBody = {
        catalogue_id: catalogue_id,
        catalogue_variant_id: this.state.removeCartItemData?.myVarId,
      };
    } else {
      httpBody = {
        catalogue_id: catalogue_id,
      };
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postWishlistApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiPostWishlist
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
 //upload prescripton file start//
 postPrescriptionFile = (order_items: any): boolean => {
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
  // Customizable Area End
};

//upload prescripton file end//

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
      configJSON.delAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  //buy now post
  postBuyNow = (catalogue_id: any, catalogue_variant_id: any): boolean => {
    console.log('catalogue_id', catalogue_id,"catalogue_variant_id",catalogue_variant_id)
    // Customizable Area Start
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),
    };
    let httpBody: any;
    //@ts-ignore
    if (this.props?.location?.state?.subscriptionReqBodyData) {
      //@ts-ignore
      httpBody = this.props?.location?.state?.subscriptionReqBodyData;
    }
    if (this.state.subscriptionReqBody) {
      httpBody = this.state.subscriptionReqBody;
    } else {
      httpBody = {
        catalogue_id: catalogue_id,
        catalogue_variant_id: catalogue_variant_id,
        quantity: this.state.buyNow.quantity,
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
    // Customizable Area End
  };

  // to set item quantity
  toSetdefaultVariant = (index: any, catalogue_id: any) => {
    // Customizable Area Start
    this.setState({
      catalogue_id: catalogue_id,
    });
    // @ts-ignore
    this.props?.history.push(`/shop/${catalogue_id}`);

    const default_variant =
      this.state.cart[index].attributes.catalogue_variant_id;

    // Customizable Area End
  };

  //item to move to wishlist
  moveToWishlist = async (catalogue_id: any, variant_id: any) => {
    // Customizable Area Start
    const dat = {
      myCatId: catalogue_id,
      myVarId: variant_id,
    };
    await this.setState({
      removeCartItemData: dat,
    });
    this.getCart();
    setTimeout(() => {
      this.postWishlist(catalogue_id);
    }, 600);
    // Customizable Area End
  };

  // to apply coupon
  toApplyCoupon = (code: any, amount: any) => {
    // Customizable Area Start
    if (code !== undefined) {
      this.state.cartId && this.postApplyCoupon(code, amount);

      this.setState({ couponCodeError: false });
    } else {
      this.setState({ couponCodeError: true });
    }
    // Customizable Area End
  };
  // Customizable Area Start
  isRemovingSubscriptionItem = (data: any) => {
    let da: any = {
      catalogue_id: data?.catalogue_id,
      subscription_quantity: 0,
      subscription_package: data?.subscription_package,
      subscription_period: data?.subscription_period,
      preferred_delivery_slot: data?.preferred_delivery_slot,
      subscription_discount: data?.subscription_discount,
    };
    this.setState({
      removeItemHaveSubscription: da,
    });
    setTimeout(() => {
      this.deleteCartItem(data.id, "");
    });
  };

  //show default Cart Item Image
  setDefaultImage = (data: any) => {
    let currentImage: any;
    if (
      data?.catalogue_variant?.attributes?.images &&
      data?.catalogue_variant?.attributes?.images?.data.length > 0
    ) {
      if (data?.catalogue_variant?.attributes?.images.length == 1) {
        currentImage =
          data?.catalogue_variant?.attributes?.images?.data[0]?.attributes?.url;
      } else {
        data?.catalogue_variant?.attributes?.images.data.map(
          (ele: any, index: number) => {
            if (ele?.attributes?.is_default) {
              currentImage = ele?.attributes?.url;
            }
          }
        );
      }
    } else {
      if (data?.catalogue?.attributes?.images?.data?.length > 0) {
        data?.catalogue?.attributes?.images?.data?.map(
          (ele: any, index: number) => {
            if (ele?.attributes?.is_default) {
              currentImage = ele?.attributes?.url;
            }
          }
        );
      } else {
        currentImage =
          data?.catalogue?.attributes?.images?.data[0]?.attributes?.url;
      }
    }
    return currentImage;
  };

  changeCouponCode = (code: any) => {
    this.setState({ couponCodeError: code });
  };

  // Customizable Area End
}
