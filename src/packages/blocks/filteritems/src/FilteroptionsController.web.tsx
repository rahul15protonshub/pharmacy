// @ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider";
// Customizable Area Start
// Customizable Area End
export const configJSON = require("./config");
//@ts-ignore
import content from "../../studio-store-ecommerce-components/src/content";

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
  catHolder: any;
  customErrorModal: boolean;
  customErrorMessage: String;
  isFetching: boolean;
  subCategory: boolean;
  tags: boolean;
  tagsList: any;
  filterBrand: Array<any>;
  YtMbFilter?: boolean;
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
      catHolder: [],
      customErrorModal: false,
      customErrorMessage: "",
      isFetching: false,
      subCategory: false,
      tags: false,
      tagsList: null,
      filterBrand: [],
      YtMbFilter: false,
      screenSize: "",
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
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    window.addEventListener("resize", this.resizeWindow);
    // Customizable Area Start
    // Customizable Area End
  }
  async componentWillUnmount() {
    window.removeEventListener("resize", this.resizeWindow, false);
    // Customizable Area Start
    // Customizable Area End
  }
  resizeWindow = () => {
    this.setState({ screebSize: window.innerWidth });
  };

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  getToken = async () => {
    const token = await StorageProvider.get("Userdata");
    const { params } = this.props.navigation.state;
    this.setState({ token: token });
    let filterData = params ? params.filterData : [];
    if (filterData.length === 0) {
      //*> When Filter Data is empty
      if (params && params.isFromExplore) {
        if (params && params.isFromSubcategory) {
          this.getBrandList(token);
          this.setState({
            searchedCategoryFilterList:
              params.categoryData.attributes.sub_categories,
            categoryFilterList: params.categoryData.attributes.sub_categories,
            subCategory: true,
          });
        } else {
          this.getListRequest(token);
          this.getBrandList(token);
          this.getTagsList(token);
        }
      } else {
        this.getListRequest(token);
        this.getBrandList(token);
        this.getTagsList(token);
      }
    } else {
      const {
        filterBrands,
        filterCategories,
        filterSubCategories,
        filterLowRange,
        filterHighRange,
        filterMax,
        filterMin,
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
            searchedCategoryFilterList: filterSubCategories,
            rangeLow: filterLowRange,
            rangeHigh: filterHighRange,
            rangeMax: filterMax,
            rangeMin: filterMin,
            subCategory: true,
          });
        } else {
          this.setState({
            //*> When Filter Data is not empty
            categoryFilterList: filterSubCategories,
            brandsFilterList: filterBrands,
            searchedCategoryFilterList: filterSubCategories,
            rangeLow: filterLowRange,
            rangeHigh: filterHighRange,
            rangeMax: filterMax,
            rangeMin: filterMin,
            subCategory: false,
          });
        }
      } else {
        this.setState({
          //*> When Filter Data is not empty
          categoryFilterList: filterCategories,
          brandsFilterList: filterBrands,
          searchedCategoryFilterList: filterCategories,
          rangeLow: filterLowRange,
          rangeHigh: filterHighRange,
          rangeMax: filterMax,
          rangeMin: filterMin,
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
      if (this.parseExpireTokenResponse(responseJson, this.state, this.props)) {
        if (responseJson && responseJson.data) {
          if (apiRequestCallId === this.getTagsApiCallId) {
            this.setState({
              tagsList: responseJson.data,
              isFetching: false,
            });
          }
        }
        if (responseJson?.error) {
          this.setState({ isFetching: false });
        }
        if (errorReponse) {
          this.setState({ isFetching: false });
          this.parseApiCatchErrorResponse(errorReponse);
        }
      } else {
        this.setState({
          invalidTokenMessageRecieved: true,
        });
      }
    }
    // Customizable Area End
  }

  ytmbFilter = () => {
    this.setState({
      YtMbFilter: !this.state.YtMbFilter,
    });
  };

  // Customizable Area Start
  // Customizable Area End
}
