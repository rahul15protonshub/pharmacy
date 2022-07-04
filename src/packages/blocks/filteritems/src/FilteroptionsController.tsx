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
  enableField: boolean;
  outOfStock: boolean;
  pricerange: boolean;
  brand: boolean;
  category: boolean;
  tag: boolean;
  checkedStock: boolean;
  checkedDiscounted: boolean;
  checkedBrand: any;
  rangeLow: any;
  rangeHigh: any;
  rangeMin: any;
  rangeMax: any;
  value: any;
  token: string;
  data: any;
  checkedCategory: boolean;
  checkedTag: boolean;
  brandsFilterList: any;
  BrandList: any;
  selectedItems: any;
  selectedCategory: any;
  scrollEnabled: boolean;
  priceMin: any;
  priceMax: any;
  price: any;
  searchedCategoryFilterList: any;
  categoryFilterList: any;
  searchText: string;
  brandsText: string;
  tagsText: string;
  catHolder: any;
  customErrorModal: boolean;
  customErrorMessage: String;
  isFetching: boolean;
  subCategory: boolean;
  tags: boolean;
  discount: boolean;
  tagsList: any;
  searchedTagsFilterList: any;
  searchedBrandsFilterList: any;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class FilteroptionsController extends BlockComponent<
  Props,
  S,
  SS
> {
  _rangeSlider: any;
  getCategoryApiCallId: any;
  getBrandApiCallId: any;
  applyAllApiCallId: any;
  getTagsApiCallId: any;

  _unsubscribe: any;

  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      enableField: false,
      outOfStock: false,
      pricerange: true,
      brand: false,
      category: false,
      tag: false,
      checkedStock: false,
      checkedDiscounted: false,
      rangeLow: 0,
      rangeHigh: 2000,
      rangeMin: 0,
      rangeMax: 2000,
      value: 10,
      token: "",
      data: [],
      checkedBrand: null,
      checkedCategory: false,
      checkedTag: false,
      brandsFilterList: [],
      BrandList: [],
      selectedItems: [],
      selectedCategory: [],
      scrollEnabled: false,
      priceMin: 0,
      priceMax: 0,
      price: [],
      searchedCategoryFilterList: [],
      categoryFilterList: [],
      searchText: "",
      brandsText: "",
      tagsText: "",
      catHolder: [],
      customErrorModal: false,
      customErrorMessage: "",
      isFetching: false,
      subCategory: false,
      tags: false,
      discount: false,
      tagsList: null,
      searchedTagsFilterList: [],
      searchedBrandsFilterList: [],
      // Customizable Area Start
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }
  async componentDidMount() {
    super.componentDidMount();
    // console.log(
    //   "this.props.navigation.state.params",
    //   this.props.navigation.state.params
    // );
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      this.getToken();
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
    const token = await StorageProvider.get("Userdata");
    const { params } = this.props.navigation.state;
    this.setState({ token: token });
    let filterData = params ? params.filterData : [];
    // console.log("@@@ In filteroptions params=============", params);
    if (filterData.length === 0) {
      //*> When Filter Data is empty
      if (params && params.isFromExplore) {
        if (params && params.isFromSubcategory) {
          let subCategories = params.categoryData.attributes.sub_categories;
          subCategories = subCategories.map((item: any) => {
            item.active = false;
            return item;
          });
          this.getBrandList();
          this.getTagsList();
          this.setState({
            searchedCategoryFilterList: subCategories,
            categoryFilterList: subCategories,
            subCategory: true,
          });
        } else {
          // console.log("inside else");
          this.getListRequest();
          this.getBrandList();
          this.getTagsList();
        }
      } else {
        this.getListRequest();
        this.getBrandList();
        this.getTagsList();
      }
    } else {
      const {
        filterBrands,
        filterTags,
        filterCategories,
        filterSubCategories,
        filterLowRange,
        filterHighRange,
        filterMax,
        filterMin,
        discount,
      } = filterData;
      this.setState({ rangeLow: filterLowRange, rangeHigh: filterHighRange });
      if (
        this.props.navigation.state.params &&
        this.props.navigation.state.params.isFromExplore
      ) {
        if (params && params.isFromSubcategory) {
          this.setState({
            //*> When Filter Data is not empty
            categoryFilterList: filterSubCategories,
            brandsFilterList: filterBrands,
            tagsList: filterTags,
            searchedTagsFilterList: filterTags,
            searchedBrandsFilterList: filterBrands,
            searchedCategoryFilterList: filterSubCategories,
            rangeLow: filterLowRange,
            rangeHigh: filterHighRange,
            rangeMax: filterMax,
            rangeMin: filterMin,
            subCategory: true,
            discount: discount,
          });
        } else {
          this.setState({
            //*> When Filter Data is not empty
            categoryFilterList: filterSubCategories,
            brandsFilterList: filterBrands,
            tagsList: filterTags,
            searchedTagsFilterList: filterTags,
            searchedBrandsFilterList: filterBrands,
            searchedCategoryFilterList: filterSubCategories,
            rangeLow: filterLowRange,
            rangeHigh: filterHighRange,
            rangeMax: filterMax,
            rangeMin: filterMin,
            subCategory: false,
            discount: discount,
          });
        }
      } else {
        this.setState({
          //*> When Filter Data is not empty
          categoryFilterList: filterCategories,
          brandsFilterList: filterBrands,
          tagsList: filterTags,
          searchedTagsFilterList: filterTags,
          searchedBrandsFilterList: filterBrands,
          searchedCategoryFilterList: filterCategories,
          rangeLow: filterLowRange,
          rangeHigh: filterHighRange,
          rangeMax: filterMax,
          rangeMin: filterMin,
          discount: discount,
        });
      }
    }
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

      let resultSesseion = OnManageNavigation(
        responseJson,
        errorReponse,
        this.props.navigation
      );
      if (resultSesseion) {
        this.setState({ isFetching: false });
        ChangeStackNow(this.props.navigation);
      }

      if (responseJson && responseJson?.data) {
        if (apiRequestCallId === this.getTagsApiCallId) {
          this.setState({
            tagsList: responseJson.data,
            searchedTagsFilterList: responseJson.data,
            isFetching: false,
          });
        } else if (apiRequestCallId === this.applyAllApiCallId) {
          this.setState({
            data: responseJson?.data,
          });
          if (this.state.data.length > 0) {
            this.props.navigation.navigate("Filteritems", {
              data: this.state.data,
            });
            this.props.navigation.state.params.onPressFilter(
              responseJson?.data
            );
          } else {
            alert("Data not found!!!");
          }
        } else if (apiRequestCallId === this.getBrandApiCallId) {
          this.setState({
            brandsFilterList: responseJson?.data.brand.data,
            searchedBrandsFilterList: responseJson?.data.brand.data,
            BrandList: responseJson?.data.brand.data,
            rangeMax: responseJson?.data.maximum_price,
            rangeHigh: responseJson?.data.maximum_price,
            rangeMin: responseJson?.data.minimum_price,
            rangeLow: responseJson?.data.minimum_price,
          });
        } else if (apiRequestCallId === this.getCategoryApiCallId) {
          this.setState({
            searchedCategoryFilterList: responseJson?.data,
            categoryFilterList: responseJson?.data,
            isFetching: false,
          });
        }
        // Customizable Area Start
        // Customizable Area End
      }
      if (responseJson.error) {
        this.setState({ isFetching: false });
      }
      if (errorReponse) {
        this.setState({ isFetching: false });
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
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

  onCheckPressBrand(data: any) {
    let localFilterBrands = this.state.brandsFilterList;
    let selectedIndex = localFilterBrands.findIndex(
      (item: any) => item.id === data.item.id
    );
    localFilterBrands[selectedIndex].active = !data.item.active;
    this.setState({ brandsFilterList: localFilterBrands });
  }

  onCheckPressTags(data: any) {
    let localFilterTags = this.state.tagsList;
    let selectedIndex = localFilterTags.findIndex(
      (item: any) => item.id === data.item.id
    );
    localFilterTags[selectedIndex].active = !data.item.active;
    this.setState({ tagsList: localFilterTags });
  }

  onCheckPressCategory(data: any) {
    let localFilterCategories = this.state.categoryFilterList;
    let selectedIndex = localFilterCategories.findIndex(
      (item: any) => item.id === data.item.id
    );
    localFilterCategories[selectedIndex].active = !data.item.active;
    this.setState({ categoryFilterList: localFilterCategories }, () => {});
  }

  handleInputChange = (value: string) => {
    this.setState({ searchText: value }, () => {
      this.searchFilterFunction(value);
    });
  };

  searchFilterFunction = (text: string) => {
    let detail = this.state.categoryFilterList;
    const { params } = this.props.navigation.state;
    const newData = detail.filter(function (item: any) {
      let itemData = "";
      if (params && params.isFromSubcategory) {
        itemData = item.name.toLowerCase();
      } else {
        itemData = item.attributes.name.toLowerCase();
      }
      const textData = text.toLowerCase();
      return itemData.toString().indexOf(textData) > -1;
    });
    this.setState({ searchedCategoryFilterList: newData });
  };

  handleInputChangeTags = (value: string) => {
    this.setState({ tagsText: value }, () => {
      this.searchFilterFunctionTags(value);
    });
  };

  searchFilterFunctionTags = (text: string) => {
    let detail = this.state.tagsList;
    const newData = detail.filter(function (item: any) {
      let itemData = item.attributes.name.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.toString().indexOf(textData) > -1;
    });
    this.setState({ searchedTagsFilterList: newData });
  };

  handleInputChangeBrands = (value: string) => {
    this.setState({ brandsText: value }, () => {
      this.searchFilterFunctionBrands(value);
    });
  };

  searchFilterFunctionBrands = (text: string) => {
    let detail = this.state.brandsFilterList;
    const newData = detail.filter(function (item: any) {
      let itemData = item.attributes.name.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.toString().indexOf(textData) > -1;
    });
    this.setState({ searchedBrandsFilterList: newData });
  };

  _onPressChange(value: string) {
    if (value === "price") {
      this.setState({ pricerange: true });
      this.setState({ brand: false });
      this.setState({ tags: false });
      this.setState({ category: false });
    } else if (value === "brand") {
      this.setState({ pricerange: false });
      this.setState({ brand: true });
      this.setState({ category: false });
      this.setState({ tags: false });
    } else if (value === "tags") {
      this.setState({ pricerange: false });
      this.setState({ brand: false });
      this.setState({ tags: true });
      this.setState({ category: false });
    } else {
      this.setState({ pricerange: false });
      this.setState({ category: true });
      this.setState({ brand: false });
      this.setState({ tags: false });
    }
  }

  onPressApplyFilter = () => {
    const {
      filterBrands,
      filterTags,
      filterCategories,
      filterSubCategories,
      filterDiscountedItems,
      filterLowRange,
      filterHighRange,
    } = this.props.navigation.state.params.filterData;
    let filterData = {
      filterBrands: this.state.brandsFilterList,
      filterTags: this.state.tagsList,
      filterLowRange: this.state.rangeLow,
      filterHighRange: this.state.rangeHigh,
      filterMax: this.state.rangeMax,
      filterMin: this.state.rangeMin,
      filterSubCategories: [],
      filterCategories: [],
      discount: this.state.discount,
    };
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.isFromExplore
    ) {
      // console.log("inside filterSubCategories");
      filterData.filterSubCategories = this.state.categoryFilterList;
    } else {
      filterData.filterCategories = this.state.categoryFilterList;
    }
    let localBrands = this.state.brandsFilterList;
    let localTags = this.state.tagsList;
    let localCategories = this.state.categoryFilterList;
    let queryParams: any = [];
    localBrands.map((item: any) => {
      if (item.active) {
        queryParams.push(`q[brand_id][]=${item.id}`);
      }
    });
    localTags?.map((item: any) => {
      if (item.active) {
        queryParams.push(`q[tag_id][]=${item.id}`);
      }
    });
    if (this.props.navigation.state.params.isFromExplore) {
      localCategories.map((item: any) => {
        if (item.active) {
          // console.log;
          queryParams.push(`q[sub_category_id][]=${item.id}`);
        }
      });
    } else {
      localCategories.map((item: any) => {
        if (item.active) {
          queryParams.push(`q[category_id][]=${item.id}`);
        }
      });
    }
    // console.log("localCategories", queryParams);
    queryParams.push("q[price][from]=" + `${this.state.rangeLow}`);
    queryParams.push("q[price][to]=" + `${this.state.rangeHigh}`);
    this.state.discount &&
      queryParams.push(`discounted_items=${this.state.discount}`);
    let finalQueryParams = queryParams.join("&");
    this.props.navigation.navigate("Filteritems", {
      isFromFilter: true,
      filterData: filterData,
    });
    this.props.navigation.state.params.onPressFilter(finalQueryParams);
  };

  changeColor = (item: string) => {
    switch (item) {
      case "price":
        if (this.state.pricerange) {
          return "#fff";
        }
        break;

      case "brand":
        if (this.state.brand) {
          return "#fff";
        }
        break;
      case "tags":
        if (this.state.brand) {
          return "#fff";
        }
        break;

      case "category":
        if (this.state.category) {
          return "#fff";
        }
        break;
    }
  };

  getListRequest = async () => {
    this.setState({ isFetching: true });
    const id = this.props.navigation.state.params?.categoryID;
    this.getCategoryApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: `${configJSON.categoryAPIEndPoint}${
        id ? id + "/get_sub_categories" : ""
      }`,
    });
  };

  getBrandList = async () => {
    this.getBrandApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.brandAPiEndPoint,
    });
  };

  getTagsList = async () => {
    this.getTagsApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.tagsAPiEndPoint,
    });
  };

  clearFilterData = () => {
    this.setState({ discount: false });
    this.props.navigation.setParams({ filterData: [] });
    this.getToken();
  };

  onCheckDiscoutTrue = () => {
    this.setState({ discount: !this.state.discount });
  };

  // Customizable Area Start
  // Customizable Area End
}
