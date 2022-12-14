/// <reference types="@types/jest" />
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper,mount } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Catalogue from "../../src/Catalogue";
import ProductBox from "../../src/components/ProductBox";
import TopHeader from "../../src/components/TopHeader";
import CustomErrorModal from "../../../../blocks/studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
import OurProductsButton from "../../src/components/OurProductsButton";
import SortSelector from "../../src/components/SortSelector";
import { FlatList, ScrollView,Linking, } from "react-native";
import StorageProvider from "../../../../framework/src/StorageProvider";

import Carousel from "../../src/components/Carousel";
const bannerImages = require("./bannerImages.json")

const catalogueFilteredProducts = require("./product.json")

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    addListener:(param:string,callback:any)=>{
      callback()
    },
  },
  id: "Catalogue",
};

const feature = loadFeature("./__tests__/features/catalogue-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(console, "error").mockImplementation(() => {});
    //@ts-ignore
    StorageProvider = {
      get: jest.fn(),
      set: jest.fn(),
    }
    // jest.mock('react-native/Libraries/Linking/Linking', () => ({
    //   openURL: jest.fn().mockResolvedValue(null),
    //   addEventListener: jest.fn(),
    //   removeEventListener: jest.fn(),
    //   getInitialURL:() => new Promise((resolve, reject) => {resolve('')})
    // }));
    
  });

  
  test("User navigates to Catalogue", ({ given, when, then }) => {
    let catalogueBlock: ShallowWrapper;
    let instance: Catalogue;

    given("I am a User loading Catalogue", () => {
      catalogueBlock = shallow(<Catalogue {...screenProps} />);
      expect(catalogueBlock).toBeTruthy();
      instance = catalogueBlock.instance() as Catalogue;
    });

    when("I navigate to the Catalogue", async() => {
      instance = catalogueBlock.instance() as Catalogue;
     await instance.componentDidMount()
      instance.setupNotification()
      instance.getToken()
      instance.setDeepLink()
      instance.onRegister('353456')
      instance.onNotification('454354543')
      let noti={title:'hello'}
      instance.onNotification(noti)
      instance.setState({catalogueFilterCategoryIds:catalogueFilteredProducts,catalogueFilterSubCategoryIds:catalogueFilteredProducts})
      
     
    });

    then("Catalogue will load with out errors", () => {
      expect(catalogueBlock).toBeTruthy();
    });
    then(`Catalogue load TopHeader without errors`, () => {
      const topHeader = catalogueBlock.find(TopHeader).first();
      topHeader.prop("onCartPress")()
      topHeader.prop("onSearchPress")()
      topHeader.prop("onMenuPress")()
      topHeader.prop("onLogoPress")()
      expect(topHeader).toBeTruthy();

      const customerror = catalogueBlock.find(CustomErrorModal).first();
      customerror.prop("hideErrorModal")()
      expect(customerror).toBeTruthy();
     });
    then("Catalogue will pre-load data without errors", async () => {
      instance = catalogueBlock.instance() as Catalogue;
      instance.componentDidMount();
      instance.getToken();
      instance.setState({
        brandSettings:null,
        bannerImages:[],
        categoriesArray:[],
        catalogueFilteredProducts,
        catalogueFilteredProductsTotalPages: 2,
        catalogueFilteredProductsActivePage: 1,
        catalogueFilterSortBy: "created_at",
        catalogueFilterSortOrder: "desc",
        noDataFound: false,
        cartLength: 3,

    })

      expect(catalogueBlock).toBeTruthy();
    });

    then("Catalogue load products data without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: catalogueFilteredProducts,
        }
      );
      instance.getProductApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
      const flatList = catalogueBlock.find(FlatList).first();
      flatList.prop("renderItem")({item: catalogueFilteredProducts[0], index: 0, separators: {highlight: jest.fn(), unhighlight: jest.fn(), updateProps: jest.fn()}});


    });
    then(`Catalogue load SortSelector without errors`, () => {
      catalogueBlock.find(SortSelector).first().prop("onChange")?.("created_at", "desc")
  });

    then("Catalogue load recommended data without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.getRecommendedApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("Catalogue banner load without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: bannerImages,
        }
      );
      instance.getBannerImagesAPICallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
      instance.onPressBanner(bannerImages[0])
          instance.onPressBanner(bannerImages[1])
        const component = shallow(<Carousel bannerImages={bannerImages} index={0} onPressBanner={jest.fn()} />)
        expect(component).toBeTruthy();

    });


    then("Catalogue load categories data without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.getCategoriesApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
      catalogueBlock.find(OurProductsButton).first().invoke("onButtonPress")()
    });

    then("Catalogue load cart product data without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.getCartProductId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Catalogue load cart list data without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.getCartListId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Catalogue add to wishlist without errors", () => {
      instance.onHeartPress(catalogueFilteredProducts[2], "newProducts")
      instance.setState({productWishlisting: catalogueFilteredProducts[2].id})
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.addToWishlistApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
      instance.updateWhiseList(catalogueFilteredProducts, "93", "newProducts")
      instance.updateWhiseList(catalogueFilteredProducts, "93", "xyz")

    });

    then("Catalogue remove from wishlist without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.removeFromWishlistApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
      instance.removeFromWishlist((catalogueFilteredProducts))
    });

    then("Catalogue add to cart without errors", () => {
      instance.setState({catalogue_variant_id: 16})
        instance.addToCart(catalogueFilteredProducts[0])
        instance.setState({cartId: "123"})
        instance.addToCart(catalogueFilteredProducts[0])

      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.addToCartApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Catalogue send device token without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.sendDeviceTokenApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Catalogue notification without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.notificationMessageId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Catalogue remove from whishlist without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.removeFromNewProductWishlistApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("Catalogue add to whishlist without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.addToWishNewlistApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
      instance.updateWhiseList(catalogueFilteredProducts, "93", "newProducts")
      instance.updateWhiseList(catalogueFilteredProducts, "93", "xyz")

    });
    then("Catalogue update to whishlist without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.UpdateWishlistTempId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("Catalogue get filter product without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: catalogueFilteredProducts,
        }
      );
      instance.getFilteredProductsApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);

      const sv = catalogueBlock.find(ScrollView).first()
      instance.setState({
        catalogueFilterLoading: false,
        catalogueFilteredProductsActivePage: 1,
        catalogueFilteredProductsTotalPages: 2
      })
      instance.handleScroll({
        layoutMeasurement: {height: 2000, width: 0},
        contentOffset: {y: 1000, x: 0},
        contentSize: {height: 1000, width: 0},
        contentInset: {top: 0, left: 0, bottom: 0, right: 0},
        zoomScale: 1
      })
      expect(sv).toBeTruthy()

    });
    then("Catalogue add cart without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.postCreateCartApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("Catalogue add more item to cart without errors", () => {
      instance.increaseOrDecreaseCartQuantity(catalogueFilteredProducts[0], 1)
      instance.increaseOrDecreaseCartQuantity(catalogueFilteredProducts[0], -1)

      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.increaseOrDecreaseCartQuantityApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("Catalogue get brandsetting without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
          message:'success',
          brand_setting:'done'
        }
      );
      instance.getBrandSettingsCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("Catalogue get brandsetting with message", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message:'success',
          brand_setting:'done'
        }
      );
      instance.getBrandSettingsCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("Catalogue update item to cart without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.putItemToCartApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
      instance.postCreateCart('subscription',2)
      instance.postCreateCart('subscri',2)
    });

    then("I can add item to wishlist", () => {

    });

    then("I can navigate to subcategories", () => {
      let formComponent = catalogueBlock.findWhere(
        (node) => node.prop("data-testid") === "opencategories"
      );
      formComponent.simulate("press");
      instance.setState({catalogueFilterLoading:true})
      formComponent = catalogueBlock.findWhere(
        (node) => node.prop("testID") === "onscroll"
      );
      formComponent.simulate("onscroll");
      
      

    });
    then("I can select the detail button", () => {

    });

    then("Catalogue load ProductBox without errors", () => {
      instance.setState({catalogueFilteredProducts:catalogueFilteredProducts,})
      const component = mount(<ProductBox
        addToCartLoading={false}
        onAddToCartPress={jest.fn()}
        product={catalogueFilteredProducts[0]}
        onProductPress={jest.fn()}
        addToWishlistLoading={false}
        onAddToWishlistPress={jest.fn()}
        onQuantityDecrease={jest.fn()}
        onQuantityIncrease={jest.fn()}
        currency="INR"
      />);
      component.prop("onProductPress")();
      component.prop("onAddToCartPress")();
      component.prop("onQuantityDecrease")();
      component.prop("onQuantityIncrease")();
      component.prop("onAddToWishlistPress")();
      
      expect(component).toBeTruthy();
      instance.addToWishlist(2,'pro')
      instance.setState({isSubscriptionUpdate:true})
      instance.putItemToCart(1,catalogueFilteredProducts[0],'subscription',2)
      instance.putItemToCart(1,catalogueFilteredProducts[0],'subscrip',2)
    });


    then("I can leave the screen with out errors", () => {
      instance.handleBackButtonClick()
      instance.componentWillUnmount();
      expect(catalogueBlock).toBeTruthy();
    });
  });
});
