import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

export const configJSON = require("./config.js");

// Customizable Area Start
// Customizable Area End

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  dashboardData: any;
  errorMsg: string;
  loading: boolean;
  auth: string | null | undefined;
  snackBar: {
    show: boolean;
    message?: string;
    type?: "success" | "info" | "warning" | "error" | undefined;
  };
  showAlert: boolean;
  message?: string;
  type?: string;
  collectionCategory: any;
  newCollection: any;
  featuredProduct: any;
  isCartCreated: boolean;
  cartId: any;
  cartDetails: any;
  catalogue_id: any;
  catalogue_variant_id: any;
  productDetails: any;
  productToBeAdded: any;
  productInCart: any;
  itemQuantity: any;
  currentImage: any;
  default_variant: any;
  active_color: any;
  active_size: any;
  available_colors: any;
  available_sizes: any;
  product_rating: any;
  isReviewModalOpen: boolean;
  commentBox: any;
  reviews: any;
  reviewShown: any;
  reviewRatings: any;
  SingleProductReview: any;
  allSingleProductReview: any;
  banners: any;
  notifyModelOpen: any;
  productDescriptionLoader: boolean;
  dashboardLoader: boolean;
  invalidTokenMessageRecieved: boolean;
  selectedCategory: any;
  productsAddingToCart: number[];

  // dashboard products filtering
  dashboardFilteredProducts?: any[];
  dashboardFilteredProductsTotalPages: number;
  dashboardFilteredProductsActivePage: number;
  dashboardFilterCategoryIds?: number[];
  dashboardFilterSubCategoryIds?: number[];
  dashboardFilterSortBy?: string;
  dashboardFilterSortOrder?: string;
  dashboardFilterLoading: boolean;

  //subscribe
  isSubscribeClicked?: boolean;
  suscribeProductData?: any;
  selectedPackagePeriod?: any;
  selectedPackageName?: any;
  selectedSubscribePackage?: Array<any>;
  selectedTimeSlotType?: any;
  avaiableTimeSlotName?: Array<any>;
  TimeslotList?: Array<any>;
  SubscriptionRequestBody?: any;
  isSubscriptionUpdate?: any;
  subscriptionqty?: any;
  // Customizable Area Start

  //Dynamic Varaint's states
  selectedAttributes?: any;
  currentSelection?: any;
  selectedProduct?: any;
  productQuantity?: any;
  availableAttributes?: any;
  isProductAvailable?: boolean;
  updateCart?: boolean;
  isselectedImage?: null;

  //banners as per position
  bannerPosition1: any;
  bannerPosition2: any;
  bannerPosition3: any;
  bannerPosition4: any;
  bannerPosition5: any;

  //isCartHasproduct
  cartProduct?: any;
  isCategoryPrevButtonActive: boolean;
  isCategoryNextButtonActive: boolean;
  isNewCollectionPrevButtonActive: boolean;
  isrcmdCollectionPrevButtonActive: boolean;
  templateLoading: boolean;
  selectedTemplate: any;
  showProducts: boolean;
  deleteProduct: boolean;
  isReadMore:boolean,
  isProductAddtoCart:boolean
  // Customizable Area End
}
interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class DashboardController extends BlockComponent<Props, S, SS> {
  auth: string | null | undefined = window?.localStorage?.getItem("token");
  apiDashboardItemCallId: string = "";
  dashboardApiCallId: string = "";
  apiGetQueryStrinurl: string = "";
  GetAllNewCollectionApiCallId: string = "";
  GetCategoryListApiCallId: string = "";
  GetFeaturedProductApiCallId: string = "";
  GetFilteredProductsApiCallId: string = "";
  postPrescrion: string = "";
  GetIsCartCreatedApiCallId: string = "";
  getProductDetailsApiCallId: string = "";
  postCreateCartApiCallId: string = "";
  putItemToCartApiCallId: string = "";
  increaseOrDecreaseCartQuantityApiCallId: string = "";
  getAllWishlistApiCallId: string = "";
  postWishlistApiCallId: string = "";
  delWishlistApiCallId: string = "";
  putUpdateCartQuantityApiCallId: string = "";
  postReviewApiCallId: string = "";
  getProductReviewApiCallId: string = "";
  UpdateProductReviewApiCallId: string = "";
  GetBannersApiCallId: string = "";
  postNotifyMeApiCallId: string = "";
  subscriptionBuyNowAPICallID: string = "";
  getCartHasProductAPICallID: string = "";
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      // "updateTemplate",
      // Customizable Area Start
      // Customizable Area End
    ];
    let catalogue_id_from_url = window.location.pathname.split("/").pop();
    this.state = {
      isCategoryPrevButtonActive: false,
      isCategoryNextButtonActive: false,
      isNewCollectionPrevButtonActive: false,
      isrcmdCollectionPrevButtonActive: false,
      dashboardData: [],
      errorMsg: "",
      loading: false,
      auth: "",
      snackBar: {
        show: false,
      },

      selectedCategory: {},
      dashboardFilteredProducts: undefined,
      dashboardFilteredProductsActivePage: 1,
      dashboardFilteredProductsTotalPages: 1,
      dashboardFilterCategoryIds: [],
      dashboardFilterSubCategoryIds: [],
      dashboardFilterSortBy: "created_at",
      dashboardFilterSortOrder: "desc",
      dashboardFilterLoading: false,
      showAlert: false,
      productsAddingToCart: [],

      collectionCategory: [],
      newCollection: [],
      featuredProduct: [],
      isCartCreated: false,
      cartId: "",
      cartDetails: null,
      catalogue_id: catalogue_id_from_url,
      catalogue_variant_id: "",
      productDetails: null,
      productToBeAdded: "",
      productInCart: "",
      itemQuantity: 1,
      currentImage: "",
      default_variant: "",
      active_color: "",
      active_size: "",
      available_colors: "",
      available_sizes: "",
      product_rating: 0,
      isReviewModalOpen: false,
      commentBox: "",
      reviews: "",
      reviewShown: 2,
      reviewRatings: [],
      SingleProductReview: "",
      allSingleProductReview: "",
      banners: "",
      notifyModelOpen: false,
      productDescriptionLoader: false,
      dashboardLoader: false,
      invalidTokenMessageRecieved: false,

      isSubscribeClicked: false,
      selectedSubscribePackage: [],

      selectedAttributes: {},
      currentSelection: null,
      selectedProduct: null,
      productQuantity: 1,
      isProductAvailable: false,
      updateCart: false,

      bannerPosition1: "",
      bannerPosition2: "",
      bannerPosition3: "",
      bannerPosition4: "",
      bannerPosition5: "",

      subscriptionqty: 1,
      showProducts: true,

      templateLoading: true,
      selectedTemplate: localStorage.getItem("selectedTemplateName") || null,

      // Customizable Area Start
      deleteProduct: false,
      isReadMore:true,
      isProductAddtoCart:false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  handleScroll = () => {

    const position = document.documentElement.scrollHeight - document.documentElement.scrollTop
    const cHeight = document.documentElement.clientHeight
    if (position <= cHeight) {
      if (this.state.dashboardFilteredProductsTotalPages > this.state.dashboardFilteredProductsActivePage) {
        this.setDashboardFilters(this.state.dashboardFilteredProductsActivePage + 1)
      }
    }
  };
  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getBanners();
    this.getCategoryList();
    //this.getNewCollection();
    this.getFeaturedProduct();
    this.getIsCartCreated();
    this.getAllWishlist();
    this.getFilteredProducts();
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    const Apptemplate = JSON.parse(
      localStorage.getItem("appTemplateData") ?? "{}"
    );
    window.addEventListener('scroll', this.handleScroll, true);
    // Customizable Area End
  }
  async componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener('scroll', this.handleScroll);
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (this.parseExpireTokenResponse(responseJson, this.state, this.props)) {
        if (responseJson && !responseJson.errors && responseJson.data) {
          const apiRequestCallId = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage)
          );
          if (apiRequestCallId != null) {
            // get banners
            if (apiRequestCallId === this.GetBannersApiCallId) {
              this.setState({
                banners: responseJson?.data?.banners?.data,
              });
              this.handleBannersPositions();
            }

            // new collection
            /* if (apiRequestCallId === this.GetAllNewCollectionApiCallId) {
                this.setState({
                    newCollection: responseJson?.data?.catalogue?.data,
                })


            } */

            //  category list
            if (apiRequestCallId === this.GetCategoryListApiCallId) {
              this.setState({
                collectionCategory: responseJson?.data,
              });
            }

            // new collection & featured product list
            if (apiRequestCallId === this.GetFeaturedProductApiCallId) {
              this.setState({
                // new collection
                newCollection: responseJson?.data?.catalogue?.data,
                // recommendation collection
                featuredProduct: [
                  ...responseJson?.data?.recommended_products?.data,
                ],
                dashboardLoader: false,
              });
            }

            // add to cart
            //is cart created || checking
            if (apiRequestCallId === this.GetIsCartCreatedApiCallId) {
              {
                responseJson?.data &&
                  responseJson?.data?.length > 0 &&
                  (this.setState({
                    cartId: responseJson?.data[0]?.id,
                    cartDetails: responseJson?.data,
                  }),
                  localStorage.setItem(
                    "cart_length",
                    responseJson?.data[0]?.attributes?.order_items?.length
                  ));
              }
            }
            // if cart not created then creating cart
            if (apiRequestCallId === this.postCreateCartApiCallId) {
              if (responseJson?.data) {
                this.setState({
                  isProductAddtoCart:false
                })
                //@ts-ignore
                window.notify([
                  {
                    message: "Item added in cart successfully",
                    type: "success",
                  },
                ]);
                this.getIsCartCreated();
                this.getProductDetails();
                this.getNewCollection();
                this.getFeaturedProduct();
                const cart_length = parseInt(
                  localStorage.getItem("cart_length") ?? "0"
                );
                // @ts-ignore
                localStorage.setItem("cart_length", cart_length + 1);
                this.setState({
                  isSubscribeClicked: false,
                  productDescriptionLoader: false,
                  productsAddingToCart: [],
                });
              }
            }

            // add items to the cart
            if (apiRequestCallId === this.putItemToCartApiCallId) {
              this.setState({
                isProductAddtoCart:false
              })
              this.state.dashboardFilteredProducts?.forEach((product: any) => {
                const orderItem = responseJson.data.attributes.order_items.find(
                  (item: any) =>
                    parseInt(product.id) === item.attributes.catalogue_id
                );
                product.attributes.cart_quantity = orderItem
                  ? orderItem.attributes.quantity ?? 1
                  : null;
              });
              this.setState({
                isSubscribeClicked: false,
                cartDetails: [responseJson.data],
                cartId: responseJson.data.id,
                productsAddingToCart: [],
                dashboardFilteredProducts: this.state.dashboardFilteredProducts
                  ? [...this.state.dashboardFilteredProducts]
                  : [],
              });
              // @ts-ignore
              window.notify([
                {
                  message: "Item quantity updated in cart successfully",
                  type: "success",
                },
              ]);
              // @ts-ignore
              const cart_length = parseInt(
                localStorage.getItem("cart_length") || ""
              );
              // @ts-ignore
              localStorage.setItem("cart_length", cart_length + 1);
              // window.location.pathname.endsWith("/home-page") ? "" : this.state.catalogue_id && this.getProductDetails()
              this.getIsCartCreated();
              this.getNewCollection();
              this.getFeaturedProduct();
              this.getProductDetails();
            }

            //update cart quantity

            if (apiRequestCallId === this.putUpdateCartQuantityApiCallId) {
              this.setState({
                itemQuantity:
                  responseJson.data.attributes.order_items[0].attributes
                    .quantity,
                productDescriptionLoader: false,
              });
              this.getProductDetails();
              //@ts-ignore
              window.notify([
                { message: "Cart updated successfully ", type: "success" },
              ]);
            }

            //increase or decrease cart quantity

            if (
              apiRequestCallId === this.increaseOrDecreaseCartQuantityApiCallId
            ) {
              this.state.dashboardFilteredProducts?.forEach((product: any) => {
                const orderItem = responseJson.data.attributes.order_items.find(
                  (item: any) =>
                    parseInt(product.id) === item.attributes.catalogue_id
                );
                product.attributes.cart_quantity = orderItem
                  ? orderItem.attributes.quantity
                  : null;
              });
              this.setState({
                productDescriptionLoader: false,
                productsAddingToCart: [],
                dashboardFilteredProducts: this.state.dashboardFilteredProducts
                  ? [...this.state.dashboardFilteredProducts]
                  : [],
              });
              if (this.state.deleteProduct) {
                const cart_length = parseInt(
                  localStorage.getItem("cart_length") ?? "0"
                );
                localStorage.setItem(
                  "cart_length",
                  (cart_length - 1).toString()
                );
                this.getIsCartCreated();
                this.getNewCollection();
                this.getFeaturedProduct();
                this.getProductDetails();
                this.setState({
                  deleteProduct: false,
                });
              }

              //this.getFilteredProducts();
              this.getProductDetails()

              //@ts-ignore
              window.notify([
                { message: "Quantity changed successfully", type: "success" },
              ]);
            }

            //product details

            if (apiRequestCallId === this.getProductDetailsApiCallId) {
              let dat: any;
              let { cart_items, catalogue_variants } =
                responseJson.data.attributes;
              if (
                cart_items &&
                catalogue_variants &&
                catalogue_variants.length > 0
              ) {
                catalogue_variants.map((ele: any, ind: number) => {
                  // @ts-ignore
                  if (Object.keys(cart_items).includes(ele.id)) {
                    ele.attributes.catalogue_variant_properties &&
                      ele.attributes.catalogue_variant_properties.map(
                        (itema: any, ids: number) => {
                          dat = {
                            ...dat,
                            [itema.attributes.variant_name]: [
                              itema.attributes.property_name,
                            ],
                          };
                        }
                      );
                  }
                });
                this.setState({
                  available_sizes: dat,
                });
              }
              this.setState({
                availableAttributes:
                  responseJson?.data.attributes?.product_attributes,
                productDetails: responseJson?.data,
                productDescriptionLoader: false,
                itemQuantity: responseJson?.data.attributes?.cart_quantity || 1,
                currentImage: this.setCurrentImage(
                  responseJson?.data.attributes?.images?.data
                ),
              });
              if (
                responseJson?.data.attributes?.is_subscription_available &&
                responseJson?.data.attributes?.subscription_quantity
              ) {
                this.setState({
                  subscriptionqty:
                    responseJson?.data.attributes?.subscription_quantity,
                });
              }
              if (localStorage.getItem("catalogue_variant_id")) {
                this.setState({
                  catalogue_variant_id: localStorage.getItem(
                    "catalogue_variant_id"
                  ),
                });
                localStorage.removeItem("catalogue_variant_id");
              }
              this.getCartHasProduct();
              this.toSetDefaultVariant();
            }
            //getCartHasAProducts
            if (apiRequestCallId === this.getCartHasProductAPICallID) {
              if (responseJson.data) {
                this.setState({
                  cartProduct: responseJson.data,
                });
              }
            }

            //all wishlist
            if (apiRequestCallId === this.getAllWishlistApiCallId) {
              localStorage.setItem(
                "wishlist_len",
                responseJson?.data?.wishlist?.data?.attributes?.wishlist_items
                  ?.length
              );
              var wishlistupdateMessage = new Message(
                getName(MessageEnum.UpdateWishlist)
              );
              wishlistupdateMessage.addData(
                getName(MessageEnum.UpdateWishlistLen),
                responseJson?.data?.wishlist?.data?.attributes?.wishlist_items
                  ?.length
              );
              runEngine.sendMessage(
                wishlistupdateMessage.id,
                wishlistupdateMessage
              );
            }

            //create wishlist
            if (apiRequestCallId === this.postWishlistApiCallId) {
              // @ts-ignore
              window.notify([
                { message: responseJson?.message, type: "success" },
              ]);
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
                this.getNewCollection();
                this.getFeaturedProduct();
                this.getFilteredProducts();
              // console.log(window.location.pathname);
              if (window.location.pathname.startsWith("/shop/")) {
                window.scrollTo(0, 0);
                this.getProductDetails();
              }
              // window.location.pathname.endsWith("/home-page") ? "" : this.state.catalogue_id && this.getProductDetails()
            }

            //delete wishlist
            if (apiRequestCallId === this.delWishlistApiCallId) {
              // @ts-ignore
              window.notify([
                { message: responseJson?.message, type: "success" },
              ]);
              const wishlist_length = parseInt(
                localStorage.getItem("wishlist_len") || "0"
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
                this.getNewCollection();
                this.getFeaturedProduct();
                this.getFilteredProducts();
              if (window.location.pathname.startsWith("/shop/")) {
                window.scrollTo(0, 0);
                this.getProductDetails();
              }
              // window.location.pathname.endsWith("/home-page") ? "" : this.state.catalogue_id && this.getProductDetails()
            }

            // create review
            if (apiRequestCallId === this.postReviewApiCallId) {
              this.getAllProductReview();
              this.getProductDetails();
              // @ts-ignore
              window.notify([
                {
                  message: "you've successfully reviewed the product",
                  type: "success",
                },
              ]);
            }

            // get all reviews that user
            if (apiRequestCallId === this.getProductReviewApiCallId) {
              this.setState({
                allSingleProductReview: responseJson?.data,
              });
              this.productReviewDetails();
            }
            //notify me
            if (apiRequestCallId === this.postNotifyMeApiCallId) {
              this.handleNotifyProductOpen();
            }
          }
          // Customizable Area Start
          if (apiRequestCallId === this.GetFilteredProductsApiCallId) {
            if (this.state.dashboardFilteredProductsActivePage === 1) {
              this.setState(
                responseJson?.data
                  ? {
                      dashboardFilteredProducts: responseJson?.data,
                      dashboardFilteredProductsTotalPages:
                        responseJson?.meta?.pagination?.total_pages,
                    }
                  : {
                      dashboardFilteredProducts: [],
                      dashboardFilteredProductsTotalPages: 1,
                    }
              );
            } else {
              this.setState({
                dashboardFilteredProducts: [
                  ...(this.state.dashboardFilteredProducts ?? []),
                  ...responseJson?.data,
                ],
                dashboardFilteredProductsTotalPages:
                  responseJson?.meta?.pagination?.total_pages,
              });
            }

            this.setState({
              dashboardFilterLoading: false,
            });
          }
          // Customizable Area End
        }
        if (responseJson?.errors) {
          this.setState({
            isProductAddtoCart:false
          })
          const errors = responseJson?.errors[0]?.order;
          this.setState({
            dashboardLoader: false,
            productDescriptionLoader: false,
            loading: false,
          });
          // @ts-ignore
          window.notify([{ message: errors, type: "error" }]);

          // Customizable Area Start
          // Customizable Area End
        }
        // Customizable Area Start
        if (responseJson) {
          const apiRequestCallId = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage)
          );
          if (apiRequestCallId == this.getProductDetailsApiCallId) {
            //@ts-ignore
            window.notify([{ message: responseJson?.message, type: "error" }]);
          }
        }
      } else {
        this.setState({
          invalidTokenMessageRecieved: true,
        });
      }

      // Customizable Area End
    } else if ("updateTemplate" === message.id) {
      var templateName = message.getData("updateTemplateData");
      this.setState({
        selectedTemplate: templateName.templateName,
        templateLoading: false,
      });
    }
  }

  // get banners
  getBanners = (): boolean => {
    const headers = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };
    this.setState({
      dashboardLoader: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetBannersApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetUser
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // get new collection
  getNewCollection = (): boolean => {
    const headers = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetAllNewCollectionApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetNewCollection
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // get category list
  getCategoryList = (): boolean => {
    const headers = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetCategoryListApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetCategoryList
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  handleReadMore=()=>{
    this.setState({
      isReadMore:!this.state.isReadMore
    })
  }

  // get category list
  getFeaturedProduct = (): boolean => {
    const headers = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetFeaturedProductApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetFeaturedProduct
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  /// add to cart
  //is cart created || checking
  getIsCartCreated = (): boolean => {
    const headers = {
      "Content-Type": configJSON.getIsCartCreated,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetIsCartCreatedApiCallId = requestMessage.messageId;

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
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  /// create cart
  postCreateCart = (product: any): boolean => {
    const { productDetails } = this.state;
    this.setState({ productDescriptionLoader: true });
    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };
    let httpBody: any;
    if (product == "subscription") {
      httpBody = this.state.SubscriptionRequestBody;
    } else {
      if (product?.attributes?.catalogue_id) {
        httpBody = {
          catalogue_id: product?.attributes?.catalogue_id,
          catalogue_variant_id: parseInt(this.state.catalogue_variant_id),
          quantity: this.state.itemQuantity,
        };
      } else {
        httpBody = {
          catalogue_id: product.id,
          // "catalogue_variant_id": product.id,
          quantity: this.state.itemQuantity,
        };
      }
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postCreateCartApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetIsCartCreated
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

  putItemToCart = (cartId: any, type: string): boolean => {
    const product = this.state.productToBeAdded;
    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };
    let httpBody: any;
    if (type == "subscription") {
      console.log('first', this.state.SubscriptionRequestBody)
      httpBody = this.state.SubscriptionRequestBody;
    } else {
      if (product.catalogue_id && this.state.catalogue_variant_id) {
        httpBody = {
          catalogue_id: product.catalogue_id,
          catalogue_variant_id: parseInt(this.state.catalogue_variant_id),
          quantity: this.state.itemQuantity,
        };
        localStorage.setItem(
          "catalogue_variant_id",
          this.state.catalogue_variant_id
        );
      } else if (
        !this.state.isProductAvailable == false &&
        this.state.productDetails?.attributes?.cart_quantity == null
      ) {
        httpBody = {
          catalogue_id: product.id!=undefined?product.id:this.state.productDetails.id,
          quantity: this.state.itemQuantity,
        };
      } else {
        httpBody = {
          catalogue_id: product?.attributes?.hasOwnProperty(
            "is_subscription_available"
          )
            ? product.id
            : product?.attributes?.catalogue_id,
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
        configJSON.endPointApiPutUpdateCartQuantity +
          `${cartId}/update_item_quantity`
      );
    } else {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.endPointApiPutUpdateCartQuantity + `${cartId}/add_item`
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
      configJSON.putAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // get Product Details
  getProductDetails = (): boolean => {
    let catalogue_id_from_url = window.location.pathname.split("/").pop();
    if (catalogue_id_from_url != "home-page") {
      this.setState(
        {
          catalogue_id: catalogue_id_from_url,
          productDescriptionLoader: true,
        },
        () => {
          const headers = {
            "Content-Type": configJSON.dashboarContentType,
            token: localStorage.getItem("token"),
          };

          const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
          );

          this.getProductDetailsApiCallId = requestMessage.messageId;

          requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.endPointApiGetProductDetails +
              `${this.state.catalogue_id}`
          );
          requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(headers)
          );

          requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.dashboarApiMethodType
          );

          runEngine.sendMessage(requestMessage.id, requestMessage);
        }
      );
    }

    return true;
  };

  /// add to wishlist
  postWishlist = (catalogue_id: any): boolean => {
    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };
    const httpBody = {
      catalogue_id: catalogue_id,
      catalogue_variant_id: this.state.catalogue_variant_id,
    };

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

  //remove wishlist

  delWishlist = (catalogue_id: any): boolean => {
    const headers = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.delWishlistApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiDelWishlist + `${catalogue_id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.delAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  postPrescriptionFile = (order_items: any): boolean => {
    // Customizable Area End
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postPrescrion = requestMessage.messageId;

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
  };

  increaseOrDecreaseCartQuantity(product: any, increment: number) {
    this.setState({
      productsAddingToCart: [...this.state.productsAddingToCart, product.id],
    });
    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };
    setTimeout(() => {
      let httpBody: any;
      let endPointFullPath: string;
      let method: string;

      if (product.attributes.cart_quantity + increment > 0) {
        httpBody = {
          quantity: product.attributes.cart_quantity + increment,
          catalogue_id: product.id,
        };
        endPointFullPath =
          configJSON.endPointApiPutUpdateCartQuantity +
          `${this.state.cartId}/update_item_quantity`;
        method = configJSON.putAPiMethod;
      } else {
        this.setState({
          deleteProduct: true,
        });
        httpBody = {
          catalogue_id: product.id,
          catalogue_variant_id: "",
        };
        endPointFullPath =
          configJSON.endPointApiPutUpdateCartQuantity +
          `${this.state.cartId}/delete_item`;
        method = configJSON.delAPiMethod;
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

      runEngine.sendMessage(requestMessage.id, requestMessage);
    }, 500);

    return true;
  }
  // update cart quantity
  putUpdateCartQuantity = (product_id: any, product_variant: any): boolean => {
    this.setState({
      productDescriptionLoader: true,
    });
    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };
    setTimeout(() => {
      let httpBody: any;
      httpBody = {
        quantity: this.state.itemQuantity,
        catalogue_id: product_id,
        catalogue_variant_id: product_variant,
      };
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
  };

  // create review

  postReview = (): boolean => {
    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };
    const httpBody = {
      comment: this.state.commentBox,
      rating: this.state.product_rating,
      catalogue_id: this.state.catalogue_id && this.state.catalogue_id,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postReviewApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiPostReview
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

  // get product review that user posted
  getAllProductReview = (): boolean => {
    const headers = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getProductReviewApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiPostReview
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // update review
  putUpdateReview = (): boolean => {
    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };

    const httpBody = {
      rating: 4,
      comment: "updated review",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.UpdateProductReviewApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiUpdateProductReview + `${this.state.catalogue_id}`
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
    return true;
  };

  ///get all wishlist
  getAllWishlist = (): boolean => {
    const headers = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAllWishlistApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiPostWishlist
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //  cart function
  addToCart = (product: any) => {
    this.setState({
      isProductAddtoCart:true
    })
    setTimeout(() => {
      this.setState({
        productToBeAdded: product,
      });
      this.state.cartId != ""
        ? this.putItemToCart(this.state.cartId,"")
        : this.postCreateCart(product);
    }, 500);
  };

  /// post notify me

  postNotifyMe = (variant_id: any): boolean => {
    // console.log("fgnmdf", variant_id);
    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postNotifyMeApiCallId = requestMessage.messageId;
    if (!this.state.catalogue_variant_id) {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.endPointApiGetProductDetails + `${variant_id}/notify_product`
      );
    } else {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.endPointApiPostNotifyMe + `${variant_id}/notify_product`
      );
    }
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //toSetDefaultVariant
  toSetDefaultVariant = () => {
    const product = this.state.productDetails && this.state.productDetails;
    const { catalogue_variant_id } = this.state;
    if (product?.attributes?.cart_items && product?.attributes?.cart_items) {
      this.setState({
        itemQuantity: product?.attributes?.cart_quantity
          ? product?.attributes?.cart_quantity
          : 1,
      });
    }
    const { catalogue_variants } = product?.attributes;
    if (catalogue_variants.length > 0) {
      if (catalogue_variant_id !== "") {
        catalogue_variants.map((varient: any, index: any) => {
          if (varient.id == this.state.catalogue_variant_id) {
            const { images } = varient.attributes;
            let isVarientImage = images.data.length > 0;
            let selectedAttributes = {};
            varient.attributes.catalogue_variant_properties.map(
              (property: any) => {
                let data = {
                  ...property,
                  variant_property_id: property.attributes.variant_property_id,
                  name: property.attributes.property_name,
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
                selectedProduct: varient,
                currentImage: isVarientImage
                  ? images.data[0].attributes.url
                  : product?.attributes.images.data[0].attributes.url,
              },
              () => {
                this.setAvailbleAttributesForSelected();
              }
            );
          }
        });
      } else {
        let defaultVarient =
          catalogue_variants[0].attributes.catalogue_variant_properties.reduce(
            (acc: any, data: any) => {
              acc[data.attributes.variant_name] = {
                name: data.attributes.property_name,
                variant_property_id: data.attributes.variant_property_id,
              };
              return acc;
            },
            {}
          );
        this.setState(
          ({ selectedAttributes }) => ({
            selectedAttributes:
              Object.keys(selectedAttributes).length === 0
                ? defaultVarient
                : selectedAttributes,
          }),
          () => {
            this.setAvailbleAttributesForSelected();
          }
        );
      }
      this.setSelectedProduct();
    }

    let catalogue_variant_in_stock: any;
    if (product.attributes.default_variant) {
      catalogue_variant_in_stock =
        product.attributes.stock_qty > 0
          ? product.attributes.default_variant.stock_qty > 0
            ? product.attributes.catalogue_variants.filter(
                (variant: any, index: any) => {
                  return (
                    variant.id ==
                    parseInt(product.attributes.default_variant.id)
                  );
                }
              )[0]
            : product.attributes.catalogue_variants.filter(
                (variant: any, index: any) => {
                  return variant.attributes.stock_qty > 0;
                }
              )[0]
          : product.attributes.catalogue_variants[0];
    } else {
      catalogue_variant_in_stock = product;
    }

    var review1: any = 0;
    var review2: any = 0;
    var review3: any = 0;
    var review4: any = 0;
    var review5: any = 0;
    const productAvailable =
      this.state.productDetails &&
      this.state.productDetails.attributes.catalogue_variants.filter(
        (item: any) => {
          return item.id == catalogue_variant_in_stock.id;
        }
      )[0];
    if (product.attributes.default_variant) {
      this.setState({
        default_variant:
          this.state.productDetails.attributes.stock_qty > 0
            ? productAvailable
            : this.state.productDetails.attributes.catalogue_variants[0],
      });
    } else {
      this.setState({
        default_variant: this.state.productDetails,
        isProductAvailable: true,
      });
    }
    this.setState({
      reviews: this.state.productDetails.attributes.reviews,
    });
    /// to show updated cart quantity
    this.state.default_variant &&
      this.state.default_variant.attributes.stock_qty >= 1 &&
      Object.keys(this.state.productDetails.attributes.cart_items).length !==
        0 &&
      Object.keys(this.state.productDetails.attributes.cart_items).map(
        (keyName: any, keyIndex: any) => {
          parseInt(keyName) == this.state.default_variant.id
            ? this.setState({
                itemQuantity:
                  this.state.productDetails.attributes.cart_items[keyName],
              })
            : "";
        }
      );

    let avalaibleVaraintlist: any = [];
    if (product.attributes.default_variant) {
      product.attributes.availability.map((ele: any, index: number) => {
        ele.variant_attributes.map((item: any, index2: number) => {
          avalaibleVaraintlist.push({
            name: item.variant_property_name,
            value: item.variant_name,
          });
        });
      });
    }

    this.state.reviews.map((review: any, inx: any) => {
      if (review.attributes.rating == 1) {
        return (review1 += 1);
      }
      if (review.attributes.rating == 2) {
        return (review2 += 1);
      }
      if (review.attributes.rating == 3) {
        return (review3 += 1);
      }
      if (review.attributes.rating == 4) {
        return (review4 += 1);
      }
      if (review.attributes.rating == 5) {
        return (review5 += 1);
      }
    });
    const selectedProduct =
      this.state.productDetails?.attributes.catalogue_variants.find(
        (cat: any) => cat.id == this.state?.catalogue_variant_id
      );
    let isVariantProduct =
      this.state.productDetails?.attributes.catalogue_variants.length > 0;
    this.setState({
      reviewRatings: [review1, review2, review3, review4, review5],
      itemQuantity:
        selectedProduct && selectedProduct.attributes.cart_quantity
          ? selectedProduct.attributes.cart_quantity
          : isVariantProduct
          ? 1
          : product?.attributes?.cart_quantity
          ? product?.attributes?.cart_quantity
          : 1,
    });
  };

  // imageSlider
  imageSlider = (imageUrl: any) => {
    this.setState({
      currentImage: imageUrl,
    });
  };

  //REview
  handleCloseReview = () => {
    this.setState({
      isReviewModalOpen: true,
    });
  };

  //handle close notify product
  handleNotifyProductClose = () => {
    const { productDetails, selectedProduct } = this.state;
    if (selectedProduct) {
      selectedProduct.attributes.is_notify_product = true;
    } else {
      productDetails.attributes.is_notify_product = true;
    }
    this.setState({
      notifyModelOpen: false,
      selectedProduct,
      productDetails,
    });
  };
  handleNotifyProductOpen = () => {
    this.setState({
      notifyModelOpen: true,
    });
  };

  // product review details

  productReviewDetails = () => {
    setTimeout(() => {
      this.setState({
        SingleProductReview: this.state.allSingleProductReview.filter(
          (product: any) => {
            return product.attributes.catalogue_id == this.state.catalogue_id;
          }
        )[0],
      });
    }, 300);
  };

  //handle comment
  handleComment = (e: any) => {
    this.setState({
      commentBox: e.target.value,
    });
  };

  //SUBSCRIPTION functions
  toggleSubscribe = () => {
    this.setState({
      isSubscribeClicked: !this.state.isSubscribeClicked,
    });
  };
  addToCartWithSubscription = (data: any) => {
    this.setState({
      isProductAddtoCart:true
    })
    this.setState(
      ({ SubscriptionRequestBody }) => ({
        isSubscriptionUpdate: this.state.productDetails.attributes
          ?.subscription_package
          ? true
          : false,
        SubscriptionRequestBody: {
          ...SubscriptionRequestBody,
          catalogue_id: Number(data.catalogue_id),
          preferred_delivery_slot:data.preferred_delivery_slot,
          subscription_discount: data.subscription_discount,
          subscription_quantity: data.subscription_quantity?data.subscription_quantity:this.state.subscriptionqty,
          subscription_package: data.subscription_package?data.subscription_package:this.state.selectedPackageName,
          subscription_period: data.subscription_period?data.subscription_period:this.state.selectedPackagePeriod,
        },
      }),
      () => {
        this.state.cartId != ""
          ? this.putItemToCart(this.state.cartId, "subscription")
          : this.postCreateCart("subscription");
      }
    );
  };
  subscriptionPackages = (subscriptioninfo: any, subscriptionType: any) => {
    let data: any = [];
    if (subscriptioninfo.length > 0) {
      subscriptioninfo.map((ele: any, index: number) => {
        data.push({
          type: subscriptionType,
          value: ele,
        });
      });
    } else {
      data.push({
        type: subscriptionType,
        value: subscriptioninfo,
      });
    }
    this.setState({
      selectedSubscribePackage: data,
      selectedPackageName: subscriptionType,
    });
  };

  updateSubscriptionQty = (data: any, type: any) => {
    if (type == "Add") {
      if (this.state.subscriptionqty + 1 > data) {
        //@ts-ignore
        window.notify([
          {
            message: `You can not add more than ${data} quantity of this product`,
            type: "warning",
          },
        ]);
      } else {
        this.setState({
          subscriptionqty: this.state.subscriptionqty + 1,
        });
      }
    } else {
      if (this.state.subscriptionqty - 1 < 1) {
        //@ts-ignore
        window.notify([
          { message: `You can not set less than 1 quantity`, type: "warning" },
        ]);
      } else {
        this.setState({
          subscriptionqty: this.state.subscriptionqty - 1,
        });
      }
    }
  };

  //Handle Varaints functions
  checkSelectedVaraintsAvatavilbe = () => {
    let { catalogue_variants } = this.state.productDetails.attributes;
    let variantIndex;

    //searching for variants
    catalogue_variants.length > 0 &&
      catalogue_variants.forEach((vitem: any, vidx: any) => {
        var variantColor = undefined;
        var variantSize = undefined;
        vitem.attributes.catalogue_variant_properties.length > 0 &&
          vitem.attributes.catalogue_variant_properties.forEach(
            (item: any, idx: any) => {
              if (item.attributes.variant_name == "Color") {
                variantColor = item.attributes.property_name;
              }
              if (item.attributes.variant_name == "Size") {
                variantSize = item.attributes.property_name;
              }
            }
          );
        var found = true;
        vitem?.attributes?.catalogue_variant_properties.length > 0 &&
          vitem?.attributes?.catalogue_variant_properties.forEach(
            (item: any, idx: number) => {
              if (item.attributes.variant_name == "Size") {
                variantSize = item.attributes.property_name;
              }
              if (
                !(
                  Object.keys(this.state.available_sizes).includes(
                    item.attributes.variant_name
                  ) &&
                  this.state.available_sizes[
                    item.attributes.variant_name
                  ]?.includes(item.attributes.property_name)
                )
              ) {
                found = false;
              }
            }
          );

        if (found) {
          variantIndex = vitem.id;
        }
      });
    // console.log("variantIndex", variantIndex);
    if (this.state.available_sizes != "") {
      if (variantIndex) {
        this.setState({
          catalogue_variant_id: variantIndex,
        });
      } else {
        //@ts-ignore
        window.notify([
          { type: "error", message: "Selected Combination Not Avaiable" },
        ]);
      }
    }
  };

  onClickVarinats = (ele: any, item: any) => {
    let oldVariants: any = this.state.available_sizes;
    let isKey = oldVariants && Object.keys(oldVariants);
    if (isKey && isKey.includes(ele)) {
      if (
        oldVariants?.[ele]?.length > 0 &&
        !oldVariants?.[ele]?.includes(item.name)
      ) {
        oldVariants?.[ele].pop();
        oldVariants?.[ele].push(item.name);
      } else {
        oldVariants?.[ele].push(item.name);
      }
    } else {
      oldVariants = {
        ...oldVariants,
        [ele]: [item.name],
      };
    }
    this.setState({
      available_sizes: oldVariants,
    });
  };
  // Customizable Area Start
  /** Handle Varaints functions Start */
  onPressTool = (item: any, attribute: any) => {
    if (this.state.selectedAttributes[attribute]) {
      let selectedAttributes = this.state.selectedAttributes;
      let lastSelectedVariantPropertyID =
        selectedAttributes[attribute].variant_property_id;
      delete selectedAttributes[attribute];
      this.setState({ selectedAttributes: selectedAttributes }, () => {
        // console.log('@@@ Item selected Removed ===========', item, this.state.selectedAttributes, lastSelectedVariantPropertyID, item.variant_property_id)
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
              // console.log('@@@ Item selected ===========', item, this.state.selectedAttributes)
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
          // console.log('@@@ Item selected ===========', item, this.state.selectedAttributes)
          this.setSelectedProduct();
        }
      );
    }
  };
  setSelectedProduct = () => {
    const { selectedAttributes } = this.state;
    let productData = this.state.productDetails;
    const { catalogue_variants } = productData.attributes;
    let isSelectedFound = false;
    catalogue_variants.map((item: any, index: number) => {
      // console.log('@@@ Item ===============', item.attributes);
      let varientPropertyIds: any = [];
      let selectedVarientPropertyIds: any = [];
      const { catalogue_variant_properties } = item.attributes;
      catalogue_variant_properties.map((variantProperty: any) => {
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

      // console.log('@@@ Item Selected Attributes ===============', selectedAttributes);
      // console.log('@@@ Item varientPropertyIds ===============', varientPropertyIds);
      // console.log('@@@ Item selectedVarientPropertyIds ===============', selectedVarientPropertyIds);
      // console.log("selectedProduct", item);
      // console.log("currentImage", item.attributes.images.data?.length > 0 ?
      //     item.attributes.images.data[0].attributes.url
      //     : "");
      // console.log("productImages", item.attributes.images.data);
      // console.log("@@@catalogue_variant_id", item.id)

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
              currentImage:
                item.attributes?.images?.data?.length > 0
                  ? item.attributes?.images?.data?.length > 1
                    ? this.setCurrentImage(item.attributes?.images.data)
                    : item.attributes?.images?.data[0].attributes.url
                  : this.state.productDetails?.attributes?.images?.data
                      ?.length > 1
                  ? this.setCurrentImage(
                      this.state.productDetails?.attributes?.images?.data
                    )
                  : this.state.productDetails?.attributes?.images?.data[0]
                      .attributes.url,
              productQuantity: this.state.itemQuantity
                ? this.state.itemQuantity
                : 1,
              catalogue_variant_id: item.id,
              dashboardData:
                item.attributes?.images?.data?.length > 0
                  ? item.attributes?.images?.data
                  : "",
              isProductAvailable: true,
            },
            () => {
              this.setAvailbleAttributesForSelected();
              this.setState({
                itemQuantity: this.state.selectedProduct.attributes
                  .cart_quantity
                  ? this.state.selectedProduct.attributes.cart_quantity
                  : 1,
              });
            }
          );
        } else {
          // console.log("I am in else case", item, this.state.selectedProduct);

          this.setState({
            itemQuantity: 1,
            isProductAvailable: false,
            isselectedImage: null,
            // item.attributes.images.data.length > 0 ?
            // && item.attributes.is_default == true ?
            // item.attributes.images.data[0].attributes.url
            currentImage:
              this.state.productDetails.attributes.images.data.length > 1
                ? this.setCurrentImage(
                    this.state.productDetails.attributes.images.data
                  )
                : this.state.productDetails.attributes.images.data[0]
                    ?.attributes?.url,
            selectedProduct: null,
            dashboardData:
              item.attributes.images.data?.length > 0
                ? item.attributes.images.data
                : "",
            message: "Selected combination does not exist",
          });
        }
      } else {
        this.setState({ selectedProduct: undefined });
      }
    });
  };
  setAvailbleAttributesForSelected = () => {
    const { selectedAttributes, currentSelection, selectedProduct } =
      this.state;
    let productData: any = this.state.productDetails;
    const {
      availabity,
      catalogue_variants,
      product_attributes,
      variants_in_cart,
      cart_quantity,
    } = productData.attributes;
    let availableAttributes: any = {};
    if (catalogue_variants) {
      catalogue_variants.map((item: any, index: number) => {
        const { catalogue_variant_properties } = item.attributes;
        let attributeFound = false;
        let selectedVarientPropertyIds = [];
        let varientPropertyIds: any = [];
        catalogue_variant_properties.map((variantProperty: any) => {
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
          catalogue_variant_properties.map((variantProperty: any) => {
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
          // console.log('@@@ Available Attributes ===========', availableAttributes);
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
        availableAttributes[attribute].map((item: any) => {
          availablePropertIds.push(item.variant_property_id);
        });
      }
      // console.log(
      //   "@@@ Item Check =============",
      //   selectedVarientPropertyIds,
      //   availablePropertIds
      // );
      return (
        JSON.stringify(selectedVarientPropertyIds.sort()) ===
        JSON.stringify(availablePropertIds.sort())
      );
    }
    return true;
  };

  getProductAttributes = () => {
    const { selectedAttributes, productDetails } = this.state;
    let productAttributes = productDetails?.attributes?.product_attributes,
      filteredAttributes;
    if (!productAttributes) {
      return null;
    }
    //Filtering attributes | checking the length
    filteredAttributes = Object.keys(productAttributes).reduce(
      (acc: any, key) => {
        if (productAttributes[key].length) {
          acc[key] = productAttributes[key];
        }
        return acc;
      },
      {}
    );
    return filteredAttributes;
  };

  isProductAttrDisabled = (item: any) => {
    const { selectedAttributes, productDetails } = this.state,
      catalogue_variants = productDetails?.attributes?.catalogue_variants;
    let isDisabled = false;
    if (selectedAttributes && Object.keys(selectedAttributes).length) {
      isDisabled = !catalogue_variants.some((varient: any) => {
        return Object.values(selectedAttributes).every((selectedVal: any) => {
          let isSelectedVariantAvailable =
            varient.attributes.catalogue_variant_properties.some(
              (properties: any) =>
                properties.attributes.variant_property_id ===
                selectedVal.variant_property_id
            );
          let currentVariantAvailable =
            varient.attributes.catalogue_variant_properties.some(
              (properties: any) =>
                properties.attributes.variant_property_id ===
                item.variant_property_id
            );
          return isSelectedVariantAvailable && currentVariantAvailable;
        });
      });
    } else {
      if (!catalogue_variants && !catalogue_variants.length) {
        return false;
      }
      isDisabled = !catalogue_variants.some((varient: any) =>
        varient.attributes.catalogue_variant_properties.some(
          (properties: any) =>
            properties.attributes.variant_property_id ===
            item.variant_property_id
        )
      );
    }
    return isDisabled;
  };

  onPressBuyNow = () => {
    let productData: any = this.state.productDetails;
    if (productData.attributes.catalogue_variants.length > 0) {
      if (this.state.catalogue_variant_id) {
        const dat = {
          cat_id: this.state.catalogue_id,
          sub_id: this.state.catalogue_variant_id,
          quantity: this.state.itemQuantity,
        };
        //@ts-ignore
        localStorage.setItem("buyNow", JSON.stringify(dat));
      } else {
        this.setState({ message: "Please select a variant" });
      }
    } else {
      const dat = {
        cat_id: this.state.catalogue_id,
        quantity: this.state.itemQuantity,
      };
      //@ts-ignore
      localStorage.setItem("buyNow", JSON.stringify(dat));
    }
  };
  getCartHasProduct = () => {
    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getCartHasProductAPICallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.cartHasProductAPIEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };
  /** Handle Varaints functions End */

  handleBannersPositions = () => {
    if (this.state.banners && this.state.banners.length > 0) {
      this.state.banners.map((ele: any, index: number) => {
        if (ele.attributes?.banner_position == 2) {
          this.setState({
            bannerPosition2: ele,
          });
        }
        if (ele.attributes?.banner_position == 3) {
          this.setState({
            bannerPosition3: ele,
          });
        }
        if (ele.attributes?.banner_position == 4) {
          this.setState({
            bannerPosition4: ele,
          });
        }
        if (ele.attributes?.banner_position == 5) {
          this.setState({
            bannerPosition5: ele,
          });
        }
      });
    }
  };
  setCurrentImage = (data: any) => {
    let imga: any;
    data?.map((ele: any, index: number) => {
      if (ele?.attributes?.is_default) {
        imga = ele?.attributes?.url;
      }
    });
    if (!imga && data) {
      return data[0]?.attributes?.url;
    }
    return imga;
  };

  isItemAddedToCart = (
    catalogue_variant_id: number,
    isSubscriptionProduct: boolean = false
  ) => {
    const { cartDetails, catalogue_id } = this.state;
    let quantityKey = isSubscriptionProduct
      ? "subscription_quantity"
      : "quantity";
    return (
      cartDetails &&
      cartDetails[0].attributes.order_items.some(
        (item: any) =>
          item.attributes.catalogue_id == catalogue_id &&
          item.attributes[quantityKey] > 0 &&
          (item.attributes.catalogue_variant_id == catalogue_variant_id ||
            typeof catalogue_variant_id === "undefined")
      )
    );
  };

  initializeSubscribeFormState = () => {
    const { productDetails } = this.state;
    this?.setState(
      {
        isSubscribeClicked: true,
        suscribeProductData: productDetails,
        selectedPackageName: productDetails?.attributes?.subscription_package,
        selectedPackagePeriod: productDetails?.attributes?.subscription_period,
        selectedTimeSlotType:
          typeof productDetails?.attributes?.preferred_delivery_slot ===
          "string"
            ? productDetails?.attributes?.preferred_delivery_slot?.includes(
                "pm"
              )
              ? "evening_slot"
              : "morning_slot"
            : "",
        subscriptionqty: productDetails?.attributes?.subscription_quantity || 1,
      },
      () => {
        const {
          selectedPackageName,
          suscribeProductData,
          selectedPackagePeriod,
          selectedTimeSlotType,
        } = this.state;
        if (selectedPackageName) {
          this?.subscriptionPackages(
            suscribeProductData.attributes.available_subscription[
              selectedPackageName
            ],
            selectedPackageName
          );
        }
        if (selectedPackagePeriod) {
          this.state.suscribeProductData.attributes.catalogue_subscriptions &&
            this.state.suscribeProductData.attributes.catalogue_subscriptions
              .length > 0 &&
            this.state.suscribeProductData.attributes.catalogue_subscriptions.map(
              (ele: any, index: number) => {
                if (
                  ele.attributes.subscription_package ==
                    this.state.selectedPackageName &&
                  ele.attributes.subscription_period.split(" ")[0] ==
                    selectedPackagePeriod
                ) {
                  let mr = JSON.parse(ele.attributes.morning_slot).filter(
                      (item: any) => item
                    ),
                    en = JSON.parse(ele.attributes.evening_slot).filter(
                      (item2: any) => item2
                    );
                  let isMrng =
                      ele.attributes.morning_slot && mr.length > 0 && "Morning",
                    isEven =
                      ele.attributes.evening_slot && en.length > 0 && "Evening";
                  const valueList = [];
                  if (isMrng) {
                    valueList.push({
                      value: isMrng,
                      type: "morning_slot",
                      timeSlot: mr,
                      discount: ele.attributes.discount,
                    });
                  }
                  if (isEven) {
                    valueList.push({
                      value: isEven,
                      type: "evening_slot",
                      timeSlot: en,
                      discount: ele.attributes.discount,
                    });
                  }
                  let slotData: any = valueList.find(
                    (ele: any, index: number) => {
                      return ele.type == selectedTimeSlotType;
                    }
                  );
                  let data = {
                    catalogue_id: Number(this.state.suscribeProductData.id),
                    subscription_quantity: this.state.subscriptionqty,
                    subscription_package: this.state.selectedPackageName,
                    subscription_period: this.state.selectedPackagePeriod,
                    preferred_delivery_slot:
                      productDetails?.attributes?.preferred_delivery_slot,
                    subscription_discount: slotData.discount,
                  };
                  let TimeslotList: any = {
                    slotName: slotData.timeSlot,
                    discount: slotData.discount,
                  };
                  this.setState({
                    avaiableTimeSlotName: valueList,
                    TimeslotList: TimeslotList,
                    SubscriptionRequestBody: data,
                  });
                }
              }
            );
        }
      }
    );
  };
  toggeProduct = () => {
    this.setState(({ showProducts }) => ({
      showProducts: !showProducts,
    }));
  };

  getFilteredProducts = (): boolean => {
    const headers = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };

    this.setState({
      dashboardFilterLoading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetFilteredProductsApiCallId = requestMessage.messageId;

    let filteredUrl = `${configJSON.endPointApiGetFilteredProducts}?page=${this.state.dashboardFilteredProductsActivePage}&per_page=16`;

    if (
      this.state.dashboardFilterCategoryIds &&
      this.state.dashboardFilterCategoryIds.length > 0
    ) {
      filteredUrl += `&q[category_id][]=${this.state.dashboardFilterCategoryIds.join(
        ","
      )}`;
    }

    if (
      this.state.dashboardFilterSubCategoryIds &&
      this.state.dashboardFilterSubCategoryIds.length > 0
    ) {
      filteredUrl += `&q[sub_category_id][]=${this.state.dashboardFilterSubCategoryIds.join(
        ","
      )}`;
    }

    if (this.state.dashboardFilterSortBy) {
      filteredUrl += `&sort[order_by]=${this.state.dashboardFilterSortBy}`;
    }

    if (this.state.dashboardFilterSortOrder) {
      filteredUrl += `&sort[direction]=${this.state.dashboardFilterSortOrder}`;
    }

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      filteredUrl
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  setDashboardFilters(
    pageNumber?: number,
    categoryIds?: number[],
    subCategoryIds?: number[],
    sortBy?: string,
    sortOrder?: string
  ) {
    this.setState(
      {
        dashboardFilteredProductsActivePage: pageNumber
          ? pageNumber
          : this.state.dashboardFilteredProductsActivePage,
        dashboardFilterCategoryIds: categoryIds
          ? categoryIds
          : this.state.dashboardFilterCategoryIds,
        dashboardFilterSubCategoryIds: subCategoryIds
          ? subCategoryIds
          : this.state.dashboardFilterSubCategoryIds,
        dashboardFilterSortBy: sortBy
          ? sortBy
          : this.state.dashboardFilterSortBy,
        dashboardFilterSortOrder: sortOrder
          ? sortOrder
          : this.state.dashboardFilterSortOrder,
      },
      () => {
        this.getFilteredProducts();
      }
    );
  }
  setSelectedCategory(category: any) {
    this.setState(({ showProducts }) => ({
      showProducts: !showProducts,
    }));
    this.setState({ selectedCategory: category }, () => {
      this.setDashboardFilters(1, [category.category_id], [category.id]);
    });
  }

  clearSelectedCategory() {
    this.setState({ selectedCategory: null }, () => {
      this.setDashboardFilters(1, [], []);
    })
  }
  // Customizable Area End
}
