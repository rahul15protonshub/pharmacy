// @ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import isEmpty from "lodash/isEmpty";
import { runEngine } from "../../../framework/src/RunEngine";
export const configJSON = require("./config");
//@ts-ignore
import content from "../../studio-store-ecommerce-components/src/content";
// Customizable Area End
// Customizable Area Start
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  token: string;
  data: any;
  productList: any;
  isSortByEnabled: boolean;
  showSortByModal: boolean;
  filterSelection: any;
  filterQueryParams: string;
  lastFilterQuery: string;
  noProductFound: boolean;
  customErrorModal: boolean;
  customErrorMessage: any;
  isFetching: boolean;
  screenName: string;
  cartProduct: any;
  cartLength: number;
  isShowError: boolean;
  filterData: any;
  filterProducList: any;
  sortMenu: Array<any>;
  dropdownOpen: boolean;
  sort_by: string;
  order_by: string;
  value: string;
  order_field: string;
  page: any;
  per_page: any;
  cartId: any;
  productToBeAdded: any;
  searchQuery: any;
  newest: any;
  loading: boolean;
  loadMoreShow: any;
  prevUrl: string;
  Url: string;
  qParams: string;
  loading: boolean;
  // Customizable Area Start
  productDetails?:any;
  // presentFetchUrl: string;
  totalPage: number;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class FilteritemsController extends BlockComponent<
  Props,
  S,
  SS
> {
  getProductApiCallId: any;
  applyFilterApiCallId: any;
  addToWishlistApiCallId: any;
  removeFromWishlistApiCallId: any;
  getCartProductId: any;
  addToCartApiCallId: any;
  GetIsCartCreatedApiCallId: string = "";
  postCreateCartApiCallId: string = "";
  // Customizable Area Start
  increaseOrDecreaseCartQuantityApiCallId: string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.FilterCheckedMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      token: "",
      data: "",
      productList: [],
      showSortByModal: false,
      isShowError: false,
      isSortByEnabled: false,
      filterSelection: [
        {
          isSelected: false,
        },
        {
          isSelected: false,
        },
        {
          isSelected: false,
        },
        {
          isSelected: false,
        },
      ],
      filterQueryParams: "",
      lastFilterQuery: "",
      noProductFound: false,
      customErrorModal: false,
      customErrorMessage: "",
      isFetching: false,
      screenName: "",
      cartProduct: null,
      cartLength: 0,
      filterData: { brand: [], color: [], tag: [], category: [], price: [] },
      filterProducList: [],
      sort_by: "",
      order_by: "",
      order_field: "",
      sortMenu: [
        { label: content.AllProduct, order_by: "", direction: "" },
        {
          label: content.LowtoHigh,
          order_by: "price_including_tax",
          direction: "asc",
        },
        {
          label: content.HightoLow,
          order_by: "price_including_tax",
          direction: "desc",
        },
        { label: content.ByPopularity, order_by: "sold", direction: "desc" },
        { label: content.ByNewest, order_by: "created_at", direction: "desc" },
        {
          label: content.Recommended,
          order_by: "recommended",
          direction: "desc",
        },
      ],
      dropdownOpen: false,
      value: "All Product",
      page: 1,
      per_page: 16,
      cartId: "",
      productToBeAdded: "",
      newest: localStorage.getItem("newest"),
      searchQuery: localStorage.getItem("searchQuery"),
      loading: false,
      loadMoreShow: "",
      prevUrl: "",
      Url: "",
      qParams: new URLSearchParams(window.location.search),
      totalPage: 1,
      // Customizable Area Start
      // presentFetchUrl: ""
      // Customizable Area End
    };
    // Customizable Area Start
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  removeFilter = (data, type, itemId) => {
    const urlSearch = new URLSearchParams(window.location.search);
    if (type == "category") {
      Object.keys(JSON.parse(localStorage.getItem("subCategory") || "{}"))
        .length != 0 &&
        (JSON.parse(localStorage.getItem("subCategory")).cat_id == itemId
          ? localStorage.removeItem("subCategory")
          : "");
      const removeFav = this.state.filterData.category.filter((item) => {
        return item.attributes.name !== data.name;
      });
      let filterSubCategoryArray = [];
      let filterCategoryArray = [];
      removeFav.map((item) => {
        filterCategoryArray?.push(item?.attributes?.id);
        item?.attributes?.sub_categories?.map((sub) => {
          if (sub?.checked) {
            filterSubCategoryArray.push(sub?.id);
          }
        });
      });
      urlSearch.delete("q[category_id][]");
      urlSearch.delete("q[sub_category_id][]");
      !!filterCategoryArray.join(",")?.length &&
        urlSearch.append("q[category_id][]", filterCategoryArray.join(","));
      !!filterSubCategoryArray.join(",")?.length &&
        urlSearch.append(
          "q[sub_category_id][]",
          filterSubCategoryArray.join(",")
        );
      this.setState(
        {
          filterData: { ...this.state.filterData, category: removeFav },
        },
        () => {
          // this.getProductList()
          this.props?.history?.replace(
            `/Filteroptions?${decodeURIComponent(urlSearch.toString())}`
          );
        }
      );
      localStorage.removeItem("category");
      const requestCheckMessage = new Message(
        getName(MessageEnum.removeFilter)
      );
      requestCheckMessage.addData(getName(MessageEnum.removeFilterData), {
        type: "category",
        id: itemId,
      });

      runEngine.sendMessage(requestCheckMessage.id, requestCheckMessage);
    }

    if (type == "brand") {
      const removeBrand = this.state.filterData.brand.filter((item) => {
        return item.attributes.name !== data.name;
      });
      this.setState(
        {
          filterData: { ...this.state.filterData, brand: removeBrand },
        },
        () => {
          urlSearch.delete("q[brand_id][]");
          if (this.state.filterData.brand?.length > 0) {
            urlSearch.append("q[brand_id][]", this.state.filterData.brand.map(b => b.id).join(","));
          }
          this.props?.history?.replace(
            `/Filteroptions?${decodeURIComponent(urlSearch.toString())}`
          );
        }
      );

      const requestCheckMessage = new Message(
        getName(MessageEnum.removeFilter)
      );
      requestCheckMessage.addData(getName(MessageEnum.removeFilterData), {
        type: "brand",
        id: itemId,
      });
      runEngine.sendMessage(requestCheckMessage.id, requestCheckMessage);
    }

    if (type == "tag") {
      const removeFav = this.state.filterData.tag.filter((item) => {
        return item.attributes.name !== data.name;
      });
      this.setState(
        {
          filterData: { ...this.state.filterData, tag: removeFav },
        },
        () => {
          this.getProductList()
        }
      );

      const requestCheckMessage = new Message(
        getName(MessageEnum.removeFilter)
      );
      requestCheckMessage.addData(getName(MessageEnum.removeFilterData), {
        type: "tag",
        id: itemId,
      });
      runEngine.sendMessage(requestCheckMessage.id, requestCheckMessage);
    }
  };

  async componentDidMount() {
    // Object.keys(JSON.parse(localStorage.getItem("subCategory") || '{}')).length == 0 &&
    this.getIsCartCreated();
    this.getProductList();
    window.addEventListener("scroll", this.handleScroll, true);
    let prevUrl = window.location.search;
    this.setState({ prevUrl }, () => {
      this.unListen = this.props.history?.listen((location, action) => {
        this.state.prevUrl !== location.search &&
          this.clearAllFilters(location);

        let lastFour = location.search.substring(location.search.length - 4);
        this.setState({ prevUrl: location.search });
        if (lastFour === "desc" || lastFour === "true") {
          this.setState({ page: 1 });
        }
      });
    });
  }

  async componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener("scroll", this.handleScroll);
    this.unListen();
  }

  clearAllFilters = (location) => {
    if (
      location.search === "?&page=1&per_page=16&sort[order_by]=sold&sort[direction]=desc" ||
      location.search === "?&page=1&per_page=16&sort[order_by]=created_at&sort[direction]=desc&[newArrivals]=true"
    ) {
      window.location = `/Filteroptions${location.search}`;
      localStorage.removeItem("searchQuery");
      localStorage.removeItem("category");
      localStorage.removeItem("subCategory");
      this.setState({
        searchQuery: "",
        filterProducList: [],
        page: 1,
      });
    }
  };

  handleScroll = () => {
    const position = document.documentElement.scrollHeight - document.documentElement.scrollTop
    const cHeight = document.documentElement.clientHeight
    if (position <= cHeight + 100) {
      if (!this.state.loading && this.state.totalPage > this.state.page) {
        this.setState({ page: this.state.page + 1 }, this.getProductList);
      }
    }
  };

  componentWillReceiveProps(nextProps: any) {
    const fs = this.state.filterProducList;
    this.setState({
      searchQuery: localStorage.getItem("searchQuery"),
      newest: localStorage.getItem("newest"),
      // filterProducList: fs == []
    });
    if (fs?.length > 0) {
    } else {
      this.setState({
        filterProducList: [],
      });
    }
    if (this.props.location.search != nextProps.location.search) {
      this.getProductList();
    }
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    this.setState({
      searchQuery: localStorage.getItem("searchQuery"),
      newest: localStorage.getItem("newest"),
    });

    if (getName(MessageEnum.FilterCheckedMessage) === message.id) {
      const FilterData = message.getData(
        getName(MessageEnum.FilterCheckedMessageData)
      );
      this.setState(
        { filterData: FilterData, page: 1, filterProducList: [] },
        () => {
          // this.getProductList()
        }
      );
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (this.parseExpireTokenResponse(responseJson, this.state, this.props)) {
        if (responseJson) {
          if (apiRequestCallId === this.getProductApiCallId) {
            let array = responseJson.data;
            this.setState({
              productList: responseJson.data.catalogue.data,
              noProductFound: false,
              isFetching: false,
            });
            // this.setState({productList:array})
          }

          if (apiRequestCallId === this.getProductCategoryApiCallId) {
            let productData = responseJson.data;
            if (
              Object.keys(
                JSON.parse(localStorage.getItem("subCategory") || "{}")
              ).length != 0
            ) {
              this.setState({
                filterProducList: [],
              });
            }
            if (productData) {
              this.setState({
                loading: false,
                filterProducList: this.state.page === 1 ? productData : [...this.state?.filterProducList, ...productData],
                totalPage: responseJson.meta.pagination.total_pages
              });
            }
          }

          //create wishlist
          if (apiRequestCallId === this.postWishlistApiCallId) {
            if(responseJson.message !==  "The item has been added to the wishlist"){
              window.notify([{ message: responseJson.message, type: "error" }]);
            }

            this.state.filterProducList.forEach(item => {
              if (item.wishlistLoading) {
                item.wishlistLoading = false;
              }
            })

            this.setState({filterProducList: [...this.state.filterProducList]});
            const wishlist_count = responseJson?.data?.wishlist?.data?.attributes?.wishlist_count || 0;
            
            localStorage.setItem("wishlist_len", wishlist_count);
            var wishlistupdateMessage = new Message(
              getName(MessageEnum.UpdateWishlist)
            );
            wishlistupdateMessage.addData(
              getName(MessageEnum.UpdateWishlistLen),
              wishlist_count
            );
            runEngine.sendMessage(
              wishlistupdateMessage.id,
              wishlistupdateMessage
            );
            // this.getProductList();
            window.location.pathname.endsWith("/Filteroptions")
              ? ""
              : this.state.catalogue_id && this.getProductList();
          }

          //delete wishlist
          if (apiRequestCallId === this.delWishlistApiCallId) {
            this.state.filterProducList.forEach(item => {
              if (item.wishlistLoading) {
                item.wishlistLoading = false;
              }
            })
            this.setState({filterProducList: [...this.state.filterProducList]});
            
            const wishlist_count = responseJson?.data?.wishlist?.data?.attributes?.wishlist_count || 0;
            
            localStorage.setItem("wishlist_len", wishlist_count);
            var wishlistupdateMessage = new Message(
              getName(MessageEnum.UpdateWishlist)
            );
            wishlistupdateMessage.addData(
              getName(MessageEnum.UpdateWishlistLen),
              wishlist_count
            );
            runEngine.sendMessage(
              wishlistupdateMessage.id,
              wishlistupdateMessage
            );
            window.location.pathname.endsWith("/Filteroptions")
              ? ""
              : this.state.catalogue_id && this.getProductList();
          }

          //product details
          if (apiRequestCallId === this.getProductDetailsApiCallId) {
            this.setState({
              productDetails: responseJson.data,
              itemQuantity: 1,
            });
            this.toSetDefaultVariant();
          }

          // add items to the cart
          if (apiRequestCallId === this.putItemToCartApiCallId) {
            if (!responseJson.errors) {
              this.state.filterProducList?.forEach((product: any) => {
                product.addToCartLoading = false;
                if (product.attributes.default_variant) {
                  const orderItem = responseJson.data.attributes.order_items.find((item: any) => (
                    parseInt(product.id) === item.attributes.catalogue_id && product.attributes.default_variant.id === item.attributes.catalogue_variant_id
                  ));
                  const defaultVariantDetails = product.attributes.catalogue_variants.find((v: any) => (
                      parseInt(v.id) === product.attributes.default_variant.id
                  ))

                  if (!defaultVariantDetails.attributes.cart_quantity) {
                    defaultVariantDetails.attributes.cart_quantity = orderItem ? orderItem.attributes.quantity ?? 1 : null;
                  }
                }
                else {
                  const orderItem = responseJson.data.attributes.order_items.find((item: any) => (
                    parseInt(product.id) === item.attributes.catalogue_id
                  ));
                  if (!product.attributes.cart_quantity) {
                    product.attributes.cart_quantity = orderItem ? orderItem.attributes.quantity ?? 1 : null;
                  }
                }
              })

              this.setState({
                cartId: responseJson.data.id,
                filterProducList: [...this.state.filterProducList],
              })

              localStorage.setItem("cart_length", responseJson.data.attributes.order_items.length);
            }
            if (responseJson?.errors) {
              this.state.filterProducList?.forEach((product: any) => {
                product.addToCartLoading = false;
              })
              this.setState({
                filterProducList: [...this.state.filterProducList],
              })
              window.notify([
                { message: responseJson.errors[0].order, type: "error" },
              ]);
            }
          }

          if (apiRequestCallId === this.increaseOrDecreaseCartQuantityApiCallId) {

            if (!responseJson.errors) {
              this.state.filterProducList?.forEach((product: any) => {
                product.addToCartLoading = false;
                if (product.attributes.default_variant) {
                  const orderItem = responseJson.data.attributes.order_items.find((item: any) => (
                    parseInt(product.id) === item.attributes.catalogue_id && product.attributes.default_variant.id === item.attributes.catalogue_variant_id
                  ));
                  const defaultVariantDetails = product.attributes.catalogue_variants.find((v: any) => (
                      parseInt(v.id) === product.attributes.default_variant.id
                  ))
                  defaultVariantDetails.attributes.cart_quantity = orderItem ? orderItem.attributes.quantity : null;
                  
                }
                else {
                  const orderItem = responseJson.data.attributes.order_items.find((item: any) => (
                    parseInt(product.id) === item.attributes.catalogue_id
                  ));
                  product.attributes.cart_quantity = orderItem ? orderItem.attributes.quantity : null;
                }
              })
              
              this.setState({
                filterProducList: this.state.filterProducList ? [...this.state.filterProducList] : [],
              });
          
              localStorage.setItem("cart_length", responseJson.data.attributes.order_items.length);
            }

          }

          // add to cart
          //is cart created || checking
          if (apiRequestCallId === this.GetIsCartCreatedApiCallId) {
            responseJson?.data &&
              responseJson?.data?.length > 0 &&
              this.setState({
                cartId: responseJson?.data[0]?.id,
              });
          }

          /// creating cart
          if (apiRequestCallId === this.postCreateCartApiCallId) {
            if (responseJson?.data) {
              product.addToCartLoading = false;
              this.state.filterProducList?.forEach((product: any) => {

                if (product.attributes.default_variant) {
                  const orderItem = responseJson.data.attributes.order_items.find((item: any) => (
                    parseInt(product.id) === item.attributes.catalogue_id && product.attributes.default_variant.id === item.attributes.catalogue_variant_id
                  ));
                  const defaultVariantDetails = product.attributes.catalogue_variants.find((v: any) => (
                      parseInt(v.id) === product.attributes.default_variant.id
                  ))
                  defaultVariantDetails.attributes.cart_quantity = orderItem ? orderItem.attributes.quantity : null;
                }
                else {
                  const orderItem = responseJson.data.attributes.order_items.find((item: any) => parseInt(product.id) === item.attributes.catalogue_id);
                  if (!product.attributes.cart_quantity) {
                    product.attributes.cart_quantity = orderItem ? orderItem.attributes.quantity ?? 1 : null;
                  }
                }
              })
              
              localStorage.setItem("cart_length", responseJson.data.attributes.order_items.length);

              this.setState({
                cartId: responseJson.data.id,
                filterProducList: [...this.state.filterProducList],
              })
            }
            if (responseJson?.errors) {
              this.state.filterProducList?.forEach((product: any) => {
                product.addToCartLoading = false;
              })
              this.setState({
                filterProducList: [...this.state.filterProducList],
              })
              window.notify([
                { message: responseJson.errors[0].order, type: "error" },
              ]);
            }
          }

          if (responseJson?.errors) {
            var errorReponse = message.getData(
              getName(MessageEnum.RestAPIResponceErrorMessage)
            );
  
            const errors = responseJson?.errors;
            this.parseApiCatchErrorResponse(errorReponse);
            errors;
          }

          if (responseJson?.message) {
            if (responseJson?.message === "No product found") {
              this.setState({
                loading: false,
                filterProducList: []
              })
            }
          }
        }
        
      } else {
        this.setState({
          invalidTokenMessageRecieved: true,
        });
      }
    }
  }

  // add to wishlist
  postWishlist = (catalogue_id: any): boolean => {
    const filterProducList = [...this.state.filterProducList];
    const index = filterProducList.findIndex((item) => {
      return item.id == catalogue_id;
    });
    let temp = filterProducList[index];
    temp = {
      ...temp,
      attributes: {
        ...temp.attributes,
        wishlisted: !temp.attributes.wishlisted,
      },
      wishlistLoading: true
    };
    filterProducList[index] = temp;
    this.setState(
      {
        filterProducList: [...filterProducList],
      },
      () => {
        const header = {
          "Content-Type": configJSON.productApiContentType,
          token: localStorage.getItem("token"),
        };

        const httpBody = {
          catalogue_id: catalogue_id,
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
          configJSON.apiMethodTypePost
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
      }
    );
    return true;
  };

  //remove wishlist
  delWishlist = (catalogue_id: any): boolean => {
    const filterProducList = [...this.state.filterProducList];
    const index = filterProducList.findIndex((item) => {
      return item.id == catalogue_id;
    });
    let temp = filterProducList[index];
    temp = {
      ...temp,
      attributes: {
        ...temp.attributes,
        wishlisted: !temp.attributes.wishlisted,
      },
      wishlistLoading: true
    };
    filterProducList[index] = temp;
    this.setState(
      {
        filterProducList: [...filterProducList],
      },
      () => {
        const headers = {
          "Content-Type": configJSON.productApiContentType,
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
          configJSON.DeleteMethodType
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);
      }
    );

    return true;
  };

  // add items into the cart
  putItemToCart = (product: any): boolean => {
    
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: localStorage.getItem("token"),
    };

    const httpBody = {
      catalogue_id: product?.attributes?.catalogue_id ?? product.id,
      catalogue_variant_id: product?.attributes?.default_variant?.id,
      quantity: 1,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.putItemToCartApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addToCartApiEndPoint + `${this.state.cartId}/add_item`
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

  increaseOrDecreaseCartQuantity = (product: any, increment: number, variantId?: number) => {

    product.addToCartLoading = true;
    
    this.setState({
      productToBeAdded: product,
      filterProducList: this.state?.filterProducList ? [...this.state.filterProducList] : [],
    }, () => {
      const header = {
        "Content-Type": configJSON.productApiContentType,
        token: localStorage.getItem("token"),
      };

      let httpBody: any;
      let endPointFullPath: string;
      let method: string;

      if (variantId) {

        const defaultVariantDetails = product.attributes.catalogue_variants.find((v: any) => (
          parseInt(v.id) === variantId
        ))

        if (defaultVariantDetails.attributes.cart_quantity + increment > 0) {
          httpBody = {
            quantity: defaultVariantDetails.attributes.cart_quantity + increment,
            catalogue_id: product.id,
            catalogue_variant_id: variantId,
          };
          endPointFullPath = configJSON.addToCartApiEndPoint +
            `${this.state.cartId}/update_item_quantity`
          method = configJSON.putAPiMethod;
        }
        else {
          httpBody = {
            catalogue_id: product.id,
            catalogue_variant_id: variantId,
          }
          endPointFullPath = configJSON.addToCartApiEndPoint +
            `${this.state.cartId}/delete_item`
          method = configJSON.DeleteMethodType;
        }

      } else if (product.attributes.cart_quantity + increment > 0) {
        httpBody = {
          quantity: product.attributes.cart_quantity + increment,
          catalogue_id: product.id,
          catalogue_variant_id: variantId,
        };
        endPointFullPath = configJSON.addToCartApiEndPoint +
          `${this.state.cartId}/update_item_quantity`
        method = configJSON.putAPiMethod;
      }
      else {
        httpBody = {
          catalogue_id: product.id,
          catalogue_variant_id: variantId,
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

      runEngine.sendMessage(requestMessage.id, requestMessage);

    });
    return true;
  };

  // add to cart
  //is cart created || checking
  getIsCartCreated = (): boolean => {
    const headers = {
      "Content-Type": configJSON.productApiContentType,
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
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //post create cart

  postCreateCart = (product: any): boolean => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: localStorage.getItem("token"),
    };

    const httpBody = {
      catalogue_id: product?.attributes?.catalogue_id ?? product.id,
      catalogue_variant_id: product?.attributes?.default_variant?.id,
      quantity: 1,
    };

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

  //  cart function
  addToCart = (product: any) => {

    product.addToCartLoading = true;

    this.setState({
      productToBeAdded: product,
      filterProducList: [...this.state.filterProducList],
    }, () => {
      this.state.cartId ? this.putItemToCart(product) : this.postCreateCart(product);
    });
  };

  // get Product Details
  getProductDetails = (): boolean => {
    let catalogue_id_from_url = window.location.pathname.split("/").pop();
    this.setState({
      catalogue_id: catalogue_id_from_url,
    });
    setTimeout(() => {
      const headers = {
        "Content-Type": configJSON.productApiContentType,
        token: localStorage.getItem("token"),
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.getProductDetailsApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.endPointApiGetProductDetails + `${this.state.catalogue_id}`
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(headers)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.apiMethodTypeGet
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
    }, 500);
    return true;
  };

  //toSetDefaultVariant
  toSetDefaultVariant = () => {
    const product = this.state.productDetails && this.state.productDetails;

    let catalogue_variant_in_stock =
      product.attributes.stock_qty > 0
        ? product.attributes.default_variant.stock_qty > 0
          ? product.attributes.catalogue_variants.filter(
            (variant: any, index: any) => {
              return (
                variant.id == parseInt(product.attributes.default_variant.id)
              );
            }
          )[0]
          : product.attributes.catalogue_variants.filter(
            (variant: any, index: any) => {
              return variant.attributes.stock_qty > 0;
            }
          )[0]
        : product.attributes.catalogue_variants[0];

    const productAvailable =
      this.state.productDetails &&
      this.state.productDetails.attributes.catalogue_variants.filter(
        (item: any) => {
          return item.id == catalogue_variant_in_stock.id;
        }
      )[0];

    this.setState({
      default_variant:
        this.state.productDetails.attributes.stock_qty > 0
          ? productAvailable
          : this.state.productDetails,
    });

    this.state.productDetails.attributes.stock_qty > 0
      ? this.setState({
        default_variant: productAvailable,
        currentImage:
          this.state.default_variant &&
          this.state.default_variant.attributes.images.data[0].attributes.url,
        active_color:
          this.state.default_variant &&
          this.state.default_variant.attributes.product_variant_properties[1]
            .property_name,
        active_size:
          this.state.default_variant &&
          this.state.default_variant.attributes.product_variant_properties[0]
            .property_name,
      })
      : this.setState({
        default_variant: this.state.productDetails,
        currentImage: this.state.productDetails.attributes.images.data[0].url,
        catalogue_variant_id: this.state.productDetails.attributes.id,
      });
    const pushed_sizes: any = [];
    const colorFilter =
      this.state.productDetails.attributes.catalogue_variants.filter(
        (item_available: any) => {
          return (
            item_available.attributes.product_variant_properties[1]
              .property_name == this.state.active_color
          );
        }
      );
    colorFilter.forEach((item: any) => {
      return pushed_sizes.push(
        item.attributes.product_variant_properties[0].property_name
      );
    });
    this.setState({
      available_sizes: pushed_sizes,
    });
  };

  getProductList = () => {
    this.setState({
      loading: true,
    }, () => {
      const header = {
        "Content-Type": configJSON.productApiContentType,
        token: localStorage.getItem("token"),
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      let urlSearch = new URLSearchParams(window.location.search);
      let url = configJSON.sortingFilteringAPiEndPoint;

      url += `?&page=${this.state.page}&per_page=${this.state.per_page}`;

      if (
        !localStorage.getItem("searchQuery") &&
        urlSearch.get("q[name]") != null
      ) {
        urlSearch.delete("q[name]");
        this.props?.history?.push(
          `/Filteroptions?${decodeURIComponent(urlSearch.toString())}`
        );
      }

      const cat_id = urlSearch.get("q[category_id][]");
      const sub_cat_id = urlSearch.get("q[sub_category_id][]");
      const brand_id = urlSearch.get("q[brand_id][]");
      const tag_id = urlSearch.get("q[tag_id][]");
      const color_id = urlSearch.get("q[color][]");
      const size_id = urlSearch.get("q[size][]");
      const min_price = urlSearch.get("q[price][from]");
      const max_price = urlSearch.get("q[price][to]");
      const discount = urlSearch.get("discounted_items");
      const order_by = urlSearch.get("sort[order_by]");
      const sort_by = urlSearch.get("sort[direction]");
      const search = urlSearch.get("q[name]");
      const kg_id = urlSearch.get("q[kg][]");
      const materail_id = urlSearch.get("q[material][]");

      if (search != null) {
        url += "&q[name]=" + search;
      }
      if (localStorage.getItem("newest")) {
        urlSearch.delete("[newArrivals]");
        localStorage.getItem("newest") == "By Newest"
          ? this.setState({
            value: localStorage.getItem("newest"),
            order_by: "created_at",
            sort_by: "desc",
          })
          : this.setState({
            value: localStorage.getItem("newest"),
            order_by: "recommended",
            sort_by: "desc",
          });
      }

      if (cat_id != null) {
        url +=
          url.indexOf("?") > -1
            ? "&q[category_id][]=" + cat_id
            : "?q[category_id][]=" + cat_id;
      }
      if (sub_cat_id != null) {
        url +=
          url.indexOf("?") > -1
            ? "&q[sub_category_id][]=" + sub_cat_id
            : "?q[sub_category_id][]=" + sub_cat_id;
      }
      if (brand_id != null) {
        url +=
          url.indexOf("?") > -1
            ? "&q[brand_id][]=" + brand_id
            : "?q[brand_id][]=" + brand_id;
      }
      if (tag_id != null) {
        url +=
          url.indexOf("?") > -1
            ? "&q[tag_id][]=" + tag_id
            : "?q[tag_id][]=" + tag_id;
      }

      if (color_id != null) {
        url +=
          url.indexOf("?") > -1
            ? "&q[color][]=" + color_id
            : "?q[color][]=" + color_id;
      }
      if (size_id != null) {
        url +=
          url.indexOf("?") > -1
            ? "&q[size][]=" + size_id
            : "?q[size][]=" + size_id;
      }

      if (materail_id != null) {
        url +=
          url.indexOf("?") > -1
            ? "&q[material][]=" + materail_id
            : "?q[material][]=" + materail_id;
      }
      if (kg_id != null) {
        url +=
          url.indexOf("?") > -1 ? "&q[kg][]=" + kg_id : "?q[kg][]=" + kg_id;
      }

      if (min_price != null || max_price != null) {
        url +=
          url.indexOf("?") > -1
            ? "&q[price][from]=" + min_price + "&" + "q[price][to]=" + max_price
            : "";
      }
      if (discount != null) {
        url += url.indexOf("?") > -1 ? "&discounted_items=" + discount : "";
      }

      if (order_by != null || sort_by != null) {
        const neworderby = this.state.sortMenu.filter((e, index) => {
          return e.order_by == order_by && e.direction == sort_by;
        })[0].label;

        this.setState({
          order_by: order_by,
          sort_by: sort_by,
          value: neworderby,
        });
      }

      if (sort_by != null && order_by != null) {
        url +=
          url.indexOf("?") > -1
            ? "&sort[order_by]=" + order_by + "&sort[direction]=" + sort_by
            : "?sort[order_by]=" + order_by + "&sort[direction]=" + sort_by;
      }

      this.getProductCategoryApiCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        url
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.apiMethodTypeGet
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
    })
  }

  // remove search
  removeSearchQuery = () => {
    localStorage.removeItem("searchQuery");
    this.setState({
      searchQuery: "",
      filterProducList: [],
    }, () => {
      this.getProductList();
    });
  };

  addSortBy = (order) => {
    this.setState({
      page: 1,
      order_by: this.state.sortMenu[order].order_by,
      sort_by: this.state.sortMenu[order].direction,
    }, () => {
      const urlSearch = new URLSearchParams(window.location.search);
      urlSearch.delete("sort[order_by]");
      urlSearch.delete("sort[direction]");
      localStorage.removeItem("newest");
      if (this.state.order_by) {
        urlSearch.append("sort[order_by]", this.state.order_by);
      }
      if (this.state.sort_by) {
        urlSearch.append("sort[direction]", this.state.sort_by);
      }
      console.log(`/Filteroptions?${decodeURIComponent(urlSearch.toString())}`)
      this.props?.history?.replace(
        `/Filteroptions?${decodeURIComponent(urlSearch.toString())}`
      );
    })
  };

  // Customizable Area Start
  increaseOrDecreaseCartQuantity(product: any, increment: number) {
    console.log('product :>> ', product);
    this.setState({
      productsAddingToCart: [...this.state.productsAddingToCart, product.id],
    });
    const header = {
      "Content-Type": configJSON.productApiContentType,
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
          configJSON.endPointApiPutUpdateCartQuantity +`${this.state.cartId}/update_item_quantity`;
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
          configJSON.endPointApiPutUpdateCartQuantity + `${this.state.cartId}/delete_item`;
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

      runEngine.sendMessage(requestMessage.id, requestMessage);
    }, 100);

    return true;
  }
  
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
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };
  // Customizable Area End
}
