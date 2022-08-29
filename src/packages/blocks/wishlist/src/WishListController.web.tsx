import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import axios from "axios";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  history: any;
  productList: any;
  getWishList: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  showModal: boolean;
  removeProduct: any;

  loading?: boolean;
  cartId: any;
  productToBeAdded: any;

  isItemAddedToCart?: boolean;
  getAddedProductID?: any;
  removeData?: any;
  isCartCreated?: boolean;
  isVaraintId?: any;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
// Customizable Area End

export default class WishListController extends BlockComponent<Props, S, SS> {
  deleteItemAPICallId: string = "";
  addToWishListAPICallId: string = "";
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  GetIsCartCreatedApiCallId: string = "";
  postCreateCartApiCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  putItemToCartApiCallId: string = "";
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onHandleConfirm = this.onHandleConfirm.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      showModal: false,
      removeProduct: [],
      productToBeAdded: "",
      cartId: "",
      isVaraintId: "",
      // Customizable Area Start
      // Customizable Area End
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    // Customizable Area Start
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    this.getIsCartCreated();
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Received", message);
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorMesssage = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (this.parseExpireTokenResponse(responseJson, this.state, this.props)) {
        if (apiRequestCallId === this.deleteItemAPICallId) {
          if (responseJson && responseJson.data) {
            this.setState({
              loading: false,
            });
            // @ts-ignore
            const wishlist_length = parseInt(
              localStorage.getItem("wishlist_len") || "1"
            );
            // @ts-ignore
            localStorage.setItem("wishlist_len", wishlist_length - 1);
            var wishlistupdateMessage = new Message(
              getName(MessageEnum.UpdateWishlist)
            );
            wishlistupdateMessage.addData(
              getName(MessageEnum.UpdateWishlistLen),
              wishlist_length - 1
            );
            runEngine.sendMessage(
              wishlistupdateMessage.id,
              wishlistupdateMessage
            );
            // @ts-ignore
            // window.notify([
            //   {
            //     message:
            //       responseJson.message ||
            //       "The item has been removed from the wishlist",
            //     type: "success",
            //   },
            // ]);
            this.props.getWishList();
          }
        }
        // Add Wish list
        if (apiRequestCallId === this.addToWishListAPICallId) {
          if (responseJson) {
            // @ts-ignore
            // window.notify([
            //   {
            //     message:
            //       responseJson.message ||
            //       "The item has been added to the wishlist",
            //     type: "success",
            //   },
            // ]);
          }
        }

        //is cart created || checking
        if (apiRequestCallId === this.GetIsCartCreatedApiCallId) {
          if (responseJson?.data && responseJson?.data?.length > 0) {
            this.setState({
              cartId: responseJson?.data[0]?.id,
              isCartCreated: true,
            }),
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
              removeData:
                responseJson.errors[0]?.message == "No order record found." &&
                "",
              isCartCreated: false,
            });
          }
        }
        // if cart not created then creating cart
        if (apiRequestCallId === this.postCreateCartApiCallId) {
          if (responseJson && responseJson.data) {
            this.setState({
              removeData:
                responseJson.data?.attributes?.order_items[0]?.attributes
                  ?.catalogue_id,
            });
            //@ts-ignore
            // window.notify([
            //   { message: "Item added in cart successfully", type: "success" },
            // ]);
            // setTimeout(() => {
            //   this.removeProductFromWishList();
            // }, 200);

            this.getIsCartCreated();
            this.props.getWishList();
            // @ts-ignore
            const cart_length = parseInt(
              localStorage.getItem("cart_length") || "1"
            );
            // @ts-ignore
            localStorage.setItem("cart_length", cart_length + 1);
          }
        }
        // add items to the cart
        if (apiRequestCallId === this.putItemToCartApiCallId) {
          if (responseJson && responseJson.data) {
            this.setState({
              loading: false,
              isItemAddedToCart: true,
              removeData:
                responseJson.data?.attributes?.order_items[0]?.attributes
                  ?.catalogue_id,
            });

            // setTimeout(() => {
            //   this.removeProductFromWishList();
            // }, 900);
            // @ts-ignore
            // window.notify([
            //   { message: "Item added in cart successfully", type: "success" },
            // ]);
            // @ts-ignore
            this.props.getWishList();
            const cart_length = parseInt(
              localStorage.getItem("cart_length") || "1"
            );
            // @ts-ignore
            const wishlist_len = parseInt(
              localStorage.getItem("wishlist_len") || "1"
            );
            // @ts-ignore
            localStorage.setItem("cart_length", cart_length + 1);
            // @ts-ignore
            // localStorage.setItem("wishlist_len", wishlist_len - 1);
            // var wishlistupdateMessage = new Message(
            //   getName(MessageEnum.UpdateWishlist)
            // );
            // wishlistupdateMessage.addData(
            //   getName(MessageEnum.UpdateWishlistLen),
            //   wishlist_len - 1
            // );
            // runEngine.sendMessage(wishlistupdateMessage.id, wishlistupdateMessage);
          }
          if (
            responseJson &&
            responseJson.errors &&
            responseJson.errors.length > 0
          ) {
            this.setState({
              loading: false,
              isItemAddedToCart: false,
            });
            // @ts-ignore
            window.notify([
              {
                message:
                  responseJson.errors[0].order ||
                  responseJson.errors[0].order[0] ||
                  responseJson.errors[0] ||
                  "Something Went Wrong !",
                type: "error",
              },
            ]);
          }
        }
      }
    }
    // Customizable Area End
  }

  addToWishlist(product: any) {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.addToWishListAPICallId = requestMessage.id;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      configJSON.getWishlistApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  removeFromWishlist(product: any) {
    this.setState({ removeProduct: product, showModal: true });
  }

  removeProductFromWishList() {
    const { removeProduct } = this.state;
    this.setState({
      loading: true,
    });
    let productID =
      this.state.isItemAddedToCart && this.state.getAddedProductID;
    if (removeProduct?.data?.attributes?.id?.data?.id) {
      productID = removeProduct?.data?.attributes?.id?.data?.id;
    }
    if (this.state.removeData && this.state.isCartCreated == false) {
      productID = this.state.removeData;
    }
    if (this.state.removeData) {
      productID = this.state.removeData;
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deleteItemAPICallId = requestMessage.messageId;
    if (this.state.isVaraintId) {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.deleteItemAPiEndPoint +
          "/" +
          productID +
          `?catalogue_variant_id=${this.state.isVaraintId}`
      );
    } else {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.deleteItemAPiEndPoint + "/" + productID
      );
    }
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      token: token,
    };
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.DeleteMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  //  cart function
  addToCart = (product: any) => {
    setTimeout(() => {
      this.setState({
        productToBeAdded: product,
      });
      this.state.cartId != ""
        ? this.putItemToCart(this.state.cartId)
        : this.postCreateCart(product);
    }, 900);
  };

  toggleModal() {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  }

  onHandleConfirm() {
    setTimeout(() => {
      this.removeProductFromWishList();
    }, 900);
    this.setState({ showModal: false });
  }

  //is cart created || checking
  getIsCartCreated = (): boolean => {
    const headers = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetIsCartCreatedApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCartApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  /// create cart
  postCreateCart = (product: any): boolean => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("token"),
    };

    let httpBody: any;
    if (product?.attributes.catalogue_id) {
      httpBody = {
        catalogue_id: product?.attributes.catalogue_id,
        catalogue_variant_id: product.id,
        quantity: 1,
      };
    } else {
      httpBody = {
        catalogue_id: product.id,
        // catalogue_variant_id: product.id,
        quantity: 1,
      };
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
      configJSON.PostMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };
  /// add items into the cart
  putItemToCart = (cartId: any) => {
    this.setState({
      loading: true,
      getAddedProductID: this.state.productToBeAdded?.attributes?.catalogue_id
        ? this.state.productToBeAdded?.attributes?.catalogue_id
        : this.state.productToBeAdded?.id,
    });
    const product = this.state.productToBeAdded;
    const catlogue_variant =
      product?.attributes?.catalogue_variants?.length > 0
        ? product?.attributes?.catalogue_variants?.length
        : "";
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("token"),
    };
    let httpBody: any;
    if (product?.attributes?.catalogue_id) {
      httpBody = {
        catalogue_id: product?.attributes?.catalogue_id
          ? product?.attributes?.catalogue_id
          : product?.id,
        catalogue_variant_id: product.id,
        quantity: 1,
      };
    } else {
      httpBody = {
        catalogue_id: product?.id,
        quantity: 1,
      };
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.putItemToCartApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCartApiEndPoint + `/${cartId}/add_item`
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
      configJSON.PutMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Customizable Area Start
  setImage = (data: any) => {
    let imga: any;
    data?.map((ele: any, index: number) => {
      if (ele?.attributes?.is_default) {
        imga = ele?.attributes?.url;
      }
    });
    return imga;
  };
  // Customizable Area End
}
