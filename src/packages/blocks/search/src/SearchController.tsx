import { BackHandler } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider";
import DeviceInfo from "react-native-device-info";
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
  showKeyBoard: boolean;
  token: string;
  searchData: string;
  categoryList: any;
  searchList: any;
  recentList: any;
  productSearchList: any;
  categorySearchList: any;
  subCategorySearchList: any;
  searchComplete: boolean;
  resultsCount: number;
  showAlertModal: boolean;
  isShowError: boolean;
  message: any;
  recentSubCategoryList: any;
  recentCategoryList: any;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SearchController extends BlockComponent<Props, S, SS> {
  searchProductId: any;
  recentSearchApiId: any;
  _unsubscribe: any;
  getCategoryListId: any;
  saveSearchId: any;
  // Customizable Area Start
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
      showKeyBoard: false,
      token: "",
      searchData: "",
      categoryList: [],
      searchList: [],
      recentList: [],
      productSearchList: [],
      categorySearchList: [],
      subCategorySearchList: [],
      searchComplete: false,
      resultsCount: 0,
      showAlertModal: false,
      isShowError: false,
      message: "",
      recentSubCategoryList: null,
      recentCategoryList: null,
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
      this.getSearchData();
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
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      let resultSesseion = OnManageNavigation(
        responseJson,
        errorReponse,
        this.props.navigation
      );
      if (resultSesseion) {
        // this.setState({isFetching:false});
        ChangeStackNow(this.props.navigation);
      }

      if (errorReponse) {
        if (this.recentSearchApiId === apiRequestCallId) {
          this.getRecentSearchListFailureCallBack(errorReponse);
        }
        if (this.searchProductId === apiRequestCallId) {
          this.setState({ searchComplete: true });
        }
        if (this.getCategoryListId === apiRequestCallId) {
          this.getCategoryListFailureCallBack(errorReponse);
        }
      }
      // Customizable Area Start
      // Customizable Area End

      if (responseJson) {
        if (this.searchProductId === apiRequestCallId) {
          if (responseJson.products.data.length === 0) {
            this.setState({
              searchList: [],
              productSearchList: [],
              categorySearchList: [],
              subCategorySearchList: [],
              searchComplete: true,
            });
          } else {
            let searchResponse = responseJson.products.data;
            let localProductSearchList = searchResponse.filter(
              (item: any) => item.attributes.type === "Catalogue"
            );
           let localCategorySearchList = searchResponse.filter(
              (item: any) => item.attributes.type === "Category"
            );
            let localSubCategorySearchList = searchResponse.filter(
              (item: any) => item.attributes.type === "SubCategory"
            );
            this.setState({
              searchList: responseJson.products.data,
              resultsCount: responseJson.products.data.length,
              searchComplete: true,
              productSearchList: localProductSearchList,
              categorySearchList: localCategorySearchList,
              subCategorySearchList: localSubCategorySearchList,
            });
          }
        }
        if (this.recentSearchApiId === apiRequestCallId) {
          if (responseJson.search) {
            this.getRecentSearchListSuccessCallBack(responseJson);
          } else if (responseJson.message) {
          }
        }
        if (this.getCategoryListId === apiRequestCallId) {
          this.getCategoryListSuccessCallBack(responseJson);
        }
      }
    }
    // Customizable Area Start
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

  onSearchProduct = async () => {
    this.setState({ searchComplete: false });

    this.searchProductId = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.searchAPiMethod,
      endPoint:
        configJSON.searchAPiEndPoint +
        this.state.searchData +
        "&uuid=" +
        DeviceInfo.getUniqueId(),
    });
  };

  getSearchData = async () => {
    this.setState({
      searchData: "",
      searchList: [],
      categoryList: [],
      recentList: [],
      searchComplete: false,
    });
    this.recentSearchApiId = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: configJSON.recentSearchAPiEndPoint,
    });
    this.getCategoryListId = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: configJSON.categoriesAPiEndPoint,
    });
  };

  saveSearch = async (url: string) => {
    this.saveSearchId = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: configJSON.cataloguesAPiEndPoint + url,
    });
  };

  getRecentSearchListSuccessCallBack = (res: any) => {
    this.setState({
      recentList: res.search,
    });
  };

  getRecentSearchListFailureCallBack = (error: any) => {
    if (error) {
      setTimeout(() => {
        this.setState({
          showAlertModal: true,
          isShowError: true,
          message: error,
        });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({
          showAlertModal: true,
          isShowError: true,
          message: "Network Error!",
        });
      }, 0);
    }
  };

  getCategoryListSuccessCallBack = (res: any) => {
    this.setState({ categoryList: res.data });
  };

  getCategoryListFailureCallBack = (error: any) => {
    if (error) {
      setTimeout(() => {
        this.setState({
          showAlertModal: true,
          isShowError: true,
          message: `${error}`,
        });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({
          showAlertModal: true,
          isShowError: true,
          message: "Network Error!",
        });
      }, 0);
    }
  };

  onPressSearchData = (item: any) => {
    if (item?.attributes?.type === "Catalogue") {
      let name = item?.attributes?.name;
      const url = `&q[name]=${name}&q[id][]=${item?.attributes?.id}`;
      this.saveSearch(url);
      this.props.navigation.navigate("ProductDescription", {
        productData: item,
      });
    } else {
      let url = "";
      let name = item?.attributes?.name;
      if (item?.attributes?.type === "SubCategory") {
        url = `&q[name]=${name}&q[sub_category_id][]=${item?.attributes?.id}`;
        this.props.navigation.navigate("Filteritems", {
          categoryData: item,
          subCategoryData: item,
          isFromExplore: true,
          screenName: item.attributes.name,
          isFromSearch: true,
          isFromSubcategory: true,
        });
      } else {
        url = `&q[name]=${name}&q[category_id][]=${item?.attributes?.id}`;
        this.props.navigation.navigate("Filteritems", {
          categoryData: item,
          isFromExplore: true,
          screenName: item?.attributes?.name,
          isFromSearch: true,
          isFromSubcategory: false,
        });
      }
      this.saveSearch(url);
    }
  };

  onPressRecentSeacrhData = (item: any) => {
    if (item.class_name === "Catalogue") {
      let name = item.name;
      item.id = item.class_id;
      const url = `&q[name]=${name}`;
      this.props.navigation.navigate("ProductDescription", {
        productData: item,
      });
    } else {
      if (item.class_name === "SubCategory") {
        this.props.navigation.navigate("Filteritems", {
          categoryData: item,
          subCategoryData: item,
          isFromExplore: true,
          screenName: item.name,
          isFromRecentSearch: true,
          isFromSubcategory: true,
        });
      } else {
        this.props.navigation.navigate("Filteritems", {
          categoryData: item,
          isFromExplore: true,
          screenName: item.name,
          isFromRecentSearch: true,
          isFromSubcategory: false,
        });
      }
    }
  };

  onPressCategory = (item: any) => {
    this.props.navigation.navigate("Filteritems", {
      categoryData: item,
      isFromExplore: true,
      screenName: item.name,
      isFromSearch: true,
      isFromCategory: true,
    });
  };

  // Customizable Area Start
  // Customizable Area End
}
