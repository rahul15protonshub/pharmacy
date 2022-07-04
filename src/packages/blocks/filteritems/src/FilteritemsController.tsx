import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider";
import { BackHandler } from "react-native";
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
  isFilterApplied: boolean;
  // Customizable Area Start
  page: any;
  totalPage: any;
  per_page: any;
  onEndReachedCalledDuringMomentum: boolean;
  removeFromWishListId: any;
  addFromWishListId: any;
  selectedCatalogeId: any;
  updateQuantity: any;

  // Customizable Area End
}

interface SS {
  id: any;
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
  getCartListId: any;
  // Customizable Area Start
  _unsubscribe: any;
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
      page: 1,
      totalPage: 1,
      per_page: 10,

      onEndReachedCalledDuringMomentum: true,
      removeFromWishListId: "",
      addFromWishListId: "",
      selectedCatalogeId: "",
      updateQuantity: "",
      isFilterApplied: false,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
      this.setState({ productList: [], page: 1, totalPage: 1 });
      this.getProductList();
      this.getCartHasProduct();
      this.getCartList();
    });
    const { state } = this.props.navigation;
    state.params && state.params.screenName
      ? this.setState({ screenName: state.params.screenName })
      : null;
  }

  async componentWillUnmount() {
    super.componentWillUnmount();
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    this._unsubscribe.remove();
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
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

  async receive(from: string, message: Message) {
    // Customizable Area Start
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

      let resultSession = OnManageNavigation(
        responseJson,
        errorReponse,
        this.props.navigation
      );
      if (resultSession) {
        this.setState({ isFetching: false });
        ChangeStackNow(this.props.navigation);
      }

      if (responseJson && responseJson?.data) {
        if (apiRequestCallId === this.getProductApiCallId) {
          console.log("@@@ Get All Products ===========", responseJson.data);
          if (responseJson?.meta?.pagination?.total_pages) {
            this.setState({
              totalPage: responseJson?.meta?.pagination?.total_pages,
            });
          } else {
            this.setState({ totalPage: 1 });
          }
          const { productType } = this.props.navigation.state.params;

          if (productType === "Recommended") {
            this.setState({
              productList: this.state.productList.concat(responseJson.data),
              noProductFound: responseJson.data.length === 0 ? true : false,
              isFetching: false,
            });
          } else {
            this.setState({
              productList: this.state.productList.concat(responseJson.data),
              noProductFound: false,
              isFetching: false,
            });
          }
        } else if (apiRequestCallId === this.applyFilterApiCallId) {
          if (responseJson?.data.length > 0) {
            this.setState({
              productList: this.state.productList.concat(responseJson.data),
              noProductFound: false,
              isFetching: false,
              totalPage: responseJson?.meta?.pagination?.total_pages,
            });
          } else {
            this.setState({
              productList: this.state.productList.concat(responseJson.data),
              noProductFound: true,
              isFetching: false,
              totalPage: responseJson?.meta?.pagination?.total_pages,
            });
          }
        } else if (apiRequestCallId === this.addToWishlistApiCallId) {
          this.setState(
            {
              customErrorModal: true,
              isFetching: false,
              isShowError: false,
              customErrorMessage: responseJson.message,
            },
            () => {
              this.updateProductListAfterAddInWishList();
            }
          );
        } else if (apiRequestCallId === this.removeFromWishlistApiCallId) {
          this.setState(
            {
              customErrorModal: true,
              isFetching: false,
              isShowError: true,
              customErrorMessage: responseJson.message,
            },
            () => {
              this.updateProductListAfterRemoveFromWishList();
            }
          );
        } else if (apiRequestCallId === this.getCartProductId) {
          let array = responseJson?.data;
          this.setState({ cartProduct: array, isFetching: false });
        } else if (apiRequestCallId === this.addToCartApiCallId) {
          this.getCartHasProduct();
          this.setState({ isFetching: false });
        } else if (apiRequestCallId === this.getCartListId) {
          let array = responseJson?.data;
          this.setState({ cartLength: array.length, isFetching: false });
        }
      } else if (responseJson?.message) {
        if (apiRequestCallId === this.getProductApiCallId) {
          this.setState({ noProductFound: true, isFetching: false });
        } else if (apiRequestCallId === this.applyFilterApiCallId) {
          this.setState({ noProductFound: true, isFetching: false });
        } else if (apiRequestCallId === this.addToWishlistApiCallId) {
          this.setState(
            {
              customErrorModal: true,
              isFetching: false,
              isShowError: false,
              customErrorMessage: responseJson.message,
            },
            () => {
              this.getProductList();
            }
          );
        } else if (apiRequestCallId === this.removeFromWishlistApiCallId) {
          this.setState(
            {
              customErrorModal: true,
              isFetching: false,
              isShowError: false,
              customErrorMessage: responseJson.message,
            },
            () => {
              this.getProductList();
            }
          );
        } else if (apiRequestCallId === this.getCartProductId) {
          this.setState({ isFetching: false });
        } else if (apiRequestCallId === this.addToCartApiCallId) {
          this.setState({ isFetching: false });
        } else if (apiRequestCallId === this.getCartListId) {
          this.setState({ isFetching: false });
        }
      } else if (responseJson?.errors) {
        if (apiRequestCallId === this.getProductApiCallId) {
          this.setState({ noProductFound: true, isFetching: false });
        } else if (apiRequestCallId === this.applyFilterApiCallId) {
          this.setState({ noProductFound: true, isFetching: false });
        } else if (apiRequestCallId === this.addToWishlistApiCallId) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            customErrorMessage: responseJson.errors,
          });
        } else if (apiRequestCallId === this.removeFromWishlistApiCallId) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            customErrorMessage: responseJson.errors,
          });
        } else if (apiRequestCallId === this.getCartProductId) {
          this.setState({ isFetching: false });
        } else if (apiRequestCallId === this.addToCartApiCallId) {
          this.setState({ isFetching: false });
        } else if (apiRequestCallId === this.getCartListId) {
          this.setState({ isFetching: false });
        }
      } else if (errorReponse) {
        if (apiRequestCallId === this.getProductApiCallId) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            customErrorMessage: errorReponse,
          });
        } else if (apiRequestCallId === this.applyFilterApiCallId) {
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            customErrorMessage: errorReponse,
          });
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
        } else if (apiRequestCallId === this.getCartProductId) {
          this.setState({ isFetching: false });
        } else if (apiRequestCallId === this.addToCartApiCallId) {
          this.setState({ isFetching: false });
        } else if (apiRequestCallId === this.getCartListId) {
          this.setState({ isFetching: false });
        }
      }
    }

    // Customizable Area End
  }

  getProductList = async () => {
    const token = await StorageProvider.get("Userdata");
    this.setState({ token: token });
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.isFromExplore
    ) {
      this.getFilterDataList();
    } else if (this.state.filterQueryParams.trim().length > 0) {
      this.getFilterDataList();
    } else {
      this.getListRequest();
    }
  };

  getFilterDataList = () => {
    let filterQueryParams = this.state.filterQueryParams;
    let categoryID = "";
    let sub_category_id: "";
    let catalogue_id = "";
    let name = "";
    if (
      this.props.navigation.state.params.isFromCategory &&
      this.props.navigation.state.params.isFromSubcategory
    ) {
      categoryID = this.props.navigation.state.params.subCategoryData.id;
      if (!filterQueryParams.includes("sub_category_id")) {
        filterQueryParams =
          filterQueryParams + `&q[sub_category_id][]=${categoryID}`;
      } else {
        filterQueryParams = filterQueryParams;
      }
    } else if (this.props.navigation.state.params.isFromCategory) {
      categoryID = this.props.navigation.state.params.categoryData.id;
      filterQueryParams = filterQueryParams + `&q[category_id][]=${categoryID}`;
    } else if (this.props.navigation.state.params.isFromSearch) {
      if (
        this.props.navigation.state.params.categoryData?.attributes?.type ===
        "Category"
      ) {
        categoryID =
          this.props.navigation.state.params.categoryData.attributes.id;
        name = this.props.navigation.state.params.categoryData.attributes.name;
        filterQueryParams =
          filterQueryParams + `&q[name]=${name}&q[category_id][]=${categoryID}`;
      } else if (
        this.props.navigation.state.params.categoryData?.attributes?.type ===
        "SubCategory"
      ) {
        sub_category_id =
          this.props.navigation.state.params.categoryData.attributes.id;
        name = this.props.navigation.state.params.categoryData.attributes.name;
        filterQueryParams =
          filterQueryParams +
          `&q[name]=${name}&q[sub_category_id][]=${sub_category_id}`;
      } else if (
        this.props.navigation.state.params.categoryData?.attributes?.type ===
        "Catalogue"
      ) {
        name = this.props.navigation.state.params.categoryData.attributes.name;
        filterQueryParams = filterQueryParams + `&q[name]=${name}`;
      } else {
        categoryID =
          this.props.navigation.state.params.categoryData.attributes
            .category_id;
        sub_category_id =
          this.props.navigation.state.params.categoryData.attributes
            .sub_category_id;
        catalogue_id =
          this.props.navigation.state.params.categoryData.attributes.id;
        filterQueryParams =
          filterQueryParams +
          `&q[category_id][]=${categoryID}&q[sub_category_id][]=${sub_category_id}`;
      }
    } else if (this.props.navigation.state.params.isFromRecentSearch) {
      if (
        this.props.navigation.state.params.categoryData.class_name ===
        "SubCategory"
      ) {
        sub_category_id =
          this.props.navigation.state.params.categoryData.class_id;
        name = this.props.navigation.state.params.categoryData.name;
        filterQueryParams =
          filterQueryParams +
          `&q[name]=${name}&q[sub_category_id][]=${sub_category_id}`;
      } else if (
        this.props.navigation.state.params.categoryData.class_name ===
        "Category"
      ) {
        categoryID = this.props.navigation.state.params.categoryData.class_id;
        name = this.props.navigation.state.params.categoryData.name;
        filterQueryParams =
          filterQueryParams + `&q[name]=${name}&q[category_id][]=${categoryID}`;
      } else {
        name = this.props.navigation.state.params.categoryData.name;
        filterQueryParams = filterQueryParams + `&q[name]=${name}`;
      }
    } else {
      name = this.props.navigation.state.params.productType.toLowerCase();
      filterQueryParams = filterQueryParams;
    }
    this.setState(
      {
        isSortByEnabled: true,
        filterQueryParams: filterQueryParams,
        isFilterApplied: true,
        page: 1,
        totalPage: 1,
      },
      () => {
        this.applyFilters(filterQueryParams);
      }
    );
  };

  onPressFilter = (filterQueryParams: any) => {
    let categoryID = "";
    this.clearSortBy();
    this.setState({ screenName: "Filter Products", productList: [] }, () => {
      if (this.props.navigation.state.params.categoryData) {
        if (
          this.props.navigation.state.params.isFromCategory &&
          this.props.navigation.state.params.isFromSubcategory
        ) {
          categoryID = this.props.navigation.state.params.subCategoryData.id;
          if (!filterQueryParams.includes("sub_category_id")) {
            filterQueryParams =
              filterQueryParams + `&q[sub_category_id][]=${categoryID}`;
          } else {
            filterQueryParams = filterQueryParams;
          }
        } else if (this.props.navigation.state.params.isFromCategory) {
          categoryID = this.props.navigation.state.params.categoryData.id;
          filterQueryParams =
            filterQueryParams + `&q[category_id][]=${categoryID}`;
        }
      }
      if (this.props.navigation.state.params.productType) {
        let productType = this.props.navigation.state.params.productType;
        filterQueryParams =
          filterQueryParams + `&sort[order_field]=${productType.toLowerCase()}`;
      }
      let updatedFilterParams = filterQueryParams;
      this.setState(
        {
          filterQueryParams: updatedFilterParams,
          lastFilterQuery: updatedFilterParams,
          isFilterApplied: true,
          page: 1,
          totalPage: 1,
        },
        () => {
          this.applyFilters(updatedFilterParams);
        }
      );
    });
  };
  clearSortBy = () => {
    let localFilterSelection = this.state.filterSelection;
    let filterIndex = localFilterSelection.findIndex(
      (item: any) => item.isSelected === true
    );
    if (filterIndex >= 0) {
      localFilterSelection[filterIndex].isSelected = false;
    }
    this.setState({ filterSelection: localFilterSelection });
  };

  navigateToFilter = () => {
    let filterData =
      this.props.navigation.state.params &&
      this.props.navigation.state.params.filterData
        ? this.props.navigation.state.params.filterData
        : [];
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.isFromExplore
    ) {
      const category_id = this.props.navigation.state.params.isFromSubcategory
        ? this.props.navigation.state.params.subCategoryData.id
        : this.props.navigation.state.params.categoryData.id;
      this.props.navigation.navigate("Filteroptions", {
        onPressFilter: (filterQueryParams: any) =>
          this.onPressFilter(filterQueryParams),
        filterQueryParams: this.state.filterQueryParams,
        filterData: filterData,
        isFromExplore: this.props.navigation.state.params.isFromExplore,
        categoryID: category_id,
        isFromSubcategory: this.props.navigation.state.params.isFromSubcategory,
        subCategoryData: this.props.navigation.state.params.subCategoryData,
        categoryData: this.props.navigation.state.params.categoryData,
      });
    } else {
      this.props.navigation.navigate("Filteroptions", {
        onPressFilter: (filterQueryParams: any) =>
          this.onPressFilter(filterQueryParams),
        filterData: filterData,
      });
    }
  };

  onSelectFilter = (itemIndex: number) => {
    let localFilterSelection = this.state.filterSelection;
    let filterIndex = localFilterSelection.findIndex(
      (item: any) => item.isSelected === true
    );
    localFilterSelection[itemIndex].isSelected =
      !localFilterSelection[itemIndex].isSelected;
    if (filterIndex >= 0) {
      localFilterSelection[filterIndex].isSelected = false;
    }
    this.setState({ filterSelection: localFilterSelection }, () => {
      this.setState({ showSortByModal: false }, () => {
        this.onApplySortByFilter();
      });
    });
  };

  removedRedundantSortFilterParams = () => {
    let localFilterParams = this.state.filterQueryParams;
    if (
      localFilterParams.includes(
        "sort[order_by]=price_including_tax&sort[direction]=asc"
      )
    ) {
      localFilterParams = localFilterParams.replace(
        "sort[order_by]=price_including_tax&sort[direction]=asc",
        ""
      );
    }
    if (
      localFilterParams.includes(
        "sort[order_by]=price_including_tax&sort[direction]=desc"
      )
    ) {
      localFilterParams = localFilterParams.replace(
        "sort[order_by]=price_including_tax&sort[direction]=desc",
        ""
      );
    }
    if (
      localFilterParams.includes(
        "sort[order_by]=created_at&sort[direction]=desc"
      )
    ) {
      localFilterParams = localFilterParams.replace(
        "sort[order_by]=created_at&sort[direction]=desc",
        ""
      );
    }
    if (
      localFilterParams.includes("sort[order_by]=sold&sort[direction]=desc")
    ) {
      localFilterParams = localFilterParams.replace(
        "sort[order_by]=sold&sort[direction]=desc",
        ""
      );
    }
    return localFilterParams;
  };

  onApplySortByFilter = () => {
    const { state } = this.props.navigation;
    let filterIndex = this.state.filterSelection.findIndex(
      (item: any) => item.isSelected === true
    );
    let filterQueryParams = "";
    let categoryID = 1;
    let categoryData = state.params ? state.params.categoryData : null;
    let isFromRecentSearch = state.params
      ? state.params.isFromRecentSearch
      : null;
    let isFromSearch = state.params ? state.params.isFromSearch : null;
    let isFromFilter = state.params ? state.params.isFromFilter : null;
    if (filterIndex !== -1) {
      this.setState({ productList: [] }, () => {
        filterQueryParams = this.getSoryByFilterParams(filterIndex);
        let updatedFilterQueryParams = this.removedRedundantSortFilterParams();
        filterQueryParams = filterQueryParams + `&${updatedFilterQueryParams}`;
        filterQueryParams = filterQueryParams.replace(/&+/g, "&");
        if (categoryData) {
          if (!isFromRecentSearch && !isFromSearch) {
            if (
              this.props.navigation.state.params.isFromCategory &&
              this.props.navigation.state.params.isFromSubcategory
            ) {
              categoryID =
                this.props.navigation.state.params.subCategoryData.id;
              if (this.state.filterQueryParams.includes("sub_category_id")) {
                filterQueryParams = filterQueryParams;
              } else {
                filterQueryParams =
                  filterQueryParams + `&q[sub_category_id][]=${categoryID}`;
              }
            } else if (this.props.navigation.state.params.isFromCategory) {
              categoryID = this.props.navigation.state.params.categoryData.id;
              if (this.state.filterQueryParams.includes("sub_category_id")) {
                filterQueryParams = filterQueryParams;
              } else {
                filterQueryParams =
                  filterQueryParams + `&q[category_id][]=${categoryID}`;
              }
            }
          } else if (isFromSearch) {
            if (this.props.navigation.state.params.isFromSubcategory) {
              categoryID =
                this.props.navigation.state.params.subCategoryData.id;
              if (this.state.filterQueryParams.includes("sub_category_id")) {
                filterQueryParams = filterQueryParams;
              } else {
                filterQueryParams =
                  filterQueryParams + `&q[sub_category_id][]=${categoryID}`;
              }
            } else {
              categoryID = this.props.navigation.state.params.categoryData.id;
              if (this.state.filterQueryParams.includes("sub_category_id")) {
                filterQueryParams = filterQueryParams;
              } else {
                filterQueryParams =
                  filterQueryParams + `&q[category_id][]=${categoryID}`;
              }
            }
          } else {
            if (this.props.navigation.state.params.isFromSubcategory) {
              categoryID =
                this.props.navigation.state.params.subCategoryData.class_id;
              if (this.state.filterQueryParams.includes("sub_category_id")) {
                filterQueryParams = filterQueryParams;
              } else {
                filterQueryParams =
                  filterQueryParams + `&q[sub_category_id][]=${categoryID}`;
              }
            } else {
              categoryID =
                this.props.navigation.state.params.categoryData.class_id;
              if (this.state.filterQueryParams.includes("sub_category_id")) {
                filterQueryParams = filterQueryParams;
              } else {
                filterQueryParams =
                  filterQueryParams + `&q[category_id][]=${categoryID}`;
              }
            }
          }
        } else {
          if (this.state.filterQueryParams !== "" && isFromFilter) {
            filterQueryParams =
              filterQueryParams + `&${this.state.lastFilterQuery}`;
          }

          if (this.props.navigation.state.params.productType) {
            let productType = this.props.navigation.state.params.productType;
            filterQueryParams =
              filterQueryParams +
              `&sort[order_field]=${productType.toLowerCase()}`;
          }
        }
        this.setState(
          {
            isSortByEnabled: true,
            filterQueryParams: filterQueryParams,
            isFilterApplied: true,
            page: 1,
            totalPage: 1,
          },
          () => {
            this.applyFilters(filterQueryParams);
          }
        );
      });
    } else {
    }
  };
  getSoryByFilterParams = (itemIndex: number) => {
    let filterQueryParams = "";
    switch (itemIndex) {
      case 0:
        filterQueryParams =
          "sort[order_by]=price_including_tax&sort[direction]=asc";
        break;
      case 1:
        filterQueryParams =
          "sort[order_by]=price_including_tax&sort[direction]=desc";
        break;
      case 2:
        filterQueryParams = "sort[order_by]=created_at&sort[direction]=desc";
        break;
      case 3:
        filterQueryParams = "sort[order_by]=sold&sort[direction]=desc";
        break;
      default:
        break;
    }
    return filterQueryParams;
  };

  addToWishlist = async (id: any) => {
    this.setState({ isFetching: true, addFromWishListId: id });

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
    this.setState({ isFetching: true });
    this.setState({ isFetching: true, removeFromWishListId: id });
    this.removeFromWishlistApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.DeleteMethodType,
      endPoint: configJSON.addToWishlistApiEndPoint + "/remove_catalogue/" + id,
    });
  };

  onHeartPress = (item: any) => {
    item.attributes?.wishlisted
      ? this.removeFromWishlist(item.id)
      : this.addToWishlist(item.id);
  };

  getListRequest = async () => {
    this.setState({ isFetching: true });
    const { productType } = this.props.navigation.state.params;
    let productParam =
      productType.toLowerCase() === "recommended"
        ? "recommended"
        : "created_at";
    let finalUrl = productType
      ? `${configJSON.cataloguesAPiEndPoint}sort[order_by]=${productParam}&sort[direction]=desc&page=${this.state.page}&per_page=${this.state.per_page}`
      : configJSON.productAPiEndPoint;
    this.getProductApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: finalUrl,
    });
  };

  applyFilters = async (url: string) => {
    this.setState({ isFetching: true });
    this.applyFilterApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint:
        configJSON.cataloguesAPiEndPoint +
        url +
        `&page=${this.state.page}&per_page=${this.state.per_page}`,
    });
  };

  addToCart = async (item: any) => {
    const data = this.state.cartProduct;
    const httpBody = {
      catalogue_id: item.item.id,
      catalogue_variant_id: item.item.attributes.catalogue_variants[0].id,
      quantity: 1,
    };

    this.setState({ isFetching: true });
    if (data.has_cart_product) {
      this.addToCartApiCallId = await this.apiCall({
        contentType: configJSON.productApiContentType,
        method: configJSON.apiMethodTypePut,
        endPoint: configJSON.addToCartApiEndPoint + data.order_id + "/add_item",
        body: httpBody,
      });
    } else {
      this.addToCartApiCallId = await this.apiCall({
        contentType: configJSON.productApiContentType,
        method: configJSON.apiMethodTypePost,
        endPoint: configJSON.addToCartApiEndPoint,
        body: httpBody,
      });
    }
  };
  //Pagination in productListing Api
  _onMomentumScrollBegin = () =>
    this.setState({ onEndReachedCalledDuringMomentum: false });

  loadMoreItems = () => {
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({ onEndReachedCalledDuringMomentum: true }, () => {
        this.setState({ page: this.state.page + 1 }, () => {
          if (this.state.page <= this.state.totalPage) {
            if (this.state.isFilterApplied) {
              this.applyFilters(this.state.filterQueryParams);
            } else {
              this.getListRequest();
            }
          }
        });
      });
    } else {
    }
  };

  getCartHasProduct = async () => {
    this.setState({ isFetching: true });
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

  updateProductListAfterRemoveFromWishList = () => {
    let UpdatedArray = this.state.productList.map((item: any) => {
      if (item.id == this.state.removeFromWishListId) {
        let itemsUpdate = Object.assign({}, item.attributes, {
          wishlisted: false,
        });

        return Object.assign({}, item, {
          attributes: itemsUpdate,
        });
      }
      return item;
    });
    this.setState({ productList: UpdatedArray });
  };

  updateProductListAfterAddInWishList = () => {
    let UpdatedArray = this.state.productList.map((item: any) => {
      if (item.id == this.state.addFromWishListId) {
        let itemsUpdate = Object.assign({}, item.attributes, {
          wishlisted: true,
        });

        return Object.assign({}, item, {
          attributes: itemsUpdate,
        });
      }
      return item;
    });
    this.setState({ productList: UpdatedArray });
  };
}
