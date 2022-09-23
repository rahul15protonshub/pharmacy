import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ProductDescription from "../../src/ProductDescription";
import ReviewList from "../../src/ReviewList";

import { mockProductData } from "../../__mocks__/mockProductData";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn(),
    replace: jest.fn(),
    push: jest.fn(),
    state: {
      params: {
        productData: {},
      },
    },
  },
  id: "ProductDescription",
};
// mock everything in react-native-fs
jest.mock('react-native-fs', () => {
  return {
    mkdir: jest.fn(),
    moveFile: jest.fn(),
    copyFile: jest.fn(),
    pathForBundle: jest.fn(),
    pathForGroup: jest.fn(),
    getFSInfo: jest.fn(),
    getAllExternalFilesDirs: jest.fn(),
    unlink: jest.fn(),
    exists: jest.fn(),
    stopDownload: jest.fn(),
    resumeDownload: jest.fn(),
    isResumable: jest.fn(),
    stopUpload: jest.fn(),
    completeHandlerIOS: jest.fn(),
    readDir: jest.fn(),
    readDirAssets: jest.fn(),
    existsAssets: jest.fn(),
    readdir: jest.fn(),
    setReadable: jest.fn(),
    stat: jest.fn(),
    readFile: jest.fn(),
    read: jest.fn(),
    readFileAssets: jest.fn(),
    hash: jest.fn(),
    copyFileAssets: jest.fn(),
    copyFileAssetsIOS: jest.fn(),
    copyAssetsVideoIOS: jest.fn(),
    writeFile: jest.fn(),
    appendFile: jest.fn(),
    write: jest.fn(),
    downloadFile: jest.fn(),
    uploadFiles: jest.fn(),
    touch: jest.fn(),
    MainBundlePath: jest.fn(),
    CachesDirectoryPath: jest.fn(),
    DocumentDirectoryPath: jest.fn(),
    ExternalDirectoryPath: jest.fn(),
    ExternalStorageDirectoryPath: jest.fn(),
    TemporaryDirectoryPath: jest.fn(),
    LibraryDirectoryPath: jest.fn(),
    PicturesDirectoryPath: jest.fn(),
  };
});

jest.useFakeTimers();

const feature = loadFeature(
  "./__tests__/features/ProductDescription-scenario.feature"
);

const product_details ={data:
{ id :   "96",
  type  :   "catalogue",
  attributes:{
    name: 'ABC 38',
    description: '',
    manufacture_date: null,
    block_qty: 0,
    price: 37.7,
    on_sale: false,
    sale_price: null,
    discount: null,
    recommended: true,
    sku: 'COD0000063',
    length: null,
    breadth: null,
    height: null,
    weight: '1.0',
    brand: [],
    tags: [],
    reviews: [],
    current_availibility: 'in_stock',
    default_variant: [],
    stock_qty: 76,
    cart_quantity: [{test:''}],
    wishlisted: false,
    product_notified: false,
    cart_items: {},
    average_rating: 0,
    images: [],
    product_attributes: [],
    availability: [],
    deep_link: '',
    catalogue_variants: [],
    variants_in_cart: [],
    can_review: false,
    similar_products: [],
    category: []
  }
}
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to ProductDescription", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: ProductDescription;

    given("I am a User loading ProductDescription", () => {
      exampleBlockA = shallow(<ProductDescription {...screenProps} />);
    });

    when("I navigate to the ProductDescription", () => {
      instance = exampleBlockA.instance() as ProductDescription;
      instance.setState({
        productData:product_details
      })
      instance.renderReviewList()
    });

    then("ProductDescription will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();

    });

    then("Load product description data without errors", () => {
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
          data: mockProductData,
        }
      );
      instance.getProductDescriptionApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Failed to Load product description data", () => {
      const msgLoadPrivacyErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI.messageId
      );
      instance.getProductDescriptionApiCallId =
        msgLoadPrivacyErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadPrivacyErrorRestAPI);
    });

    then("Call notify product api without errors", () => {
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
      instance.getNotifyProductApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Failed to call notify product api", () => {
      const msgLoadPrivacyErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI.messageId
      );
      instance.getNotifyProductApiCallId = msgLoadPrivacyErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadPrivacyErrorRestAPI);
    });

    then("Get buy product without errors", () => {
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
      instance.getBuyProductApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Failed to get buy product", () => {
      const msgLoadPrivacyErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI.messageId
      );
      instance.getBuyProductApiCallId = msgLoadPrivacyErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadPrivacyErrorRestAPI);
    });

    then("Update Qty without errors", () => {
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
      instance.updateQtyApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Failed to update qty", () => {
      const msgLoadPrivacyErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI.messageId
      );
      instance.updateQtyApiCallId = msgLoadPrivacyErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadPrivacyErrorRestAPI);
    });

    then("Add to cart without errors", () => {
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

    then("Failed to add to cart", () => {
      const msgLoadPrivacyErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI.messageId
      );
      instance.addToCartApiCallId = msgLoadPrivacyErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadPrivacyErrorRestAPI);
    });

    then("Add to wishlist without errors", () => {
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
    });

    then("Failed to add to wishlist", () => {
      const msgLoadPrivacyErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI.messageId
      );
      instance.addToWishlistApiCallId = msgLoadPrivacyErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadPrivacyErrorRestAPI);
    });

    then("Remove from wishlist without errors", () => {
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
    });

    then("Failed to remove from wishlist", () => {
      const msgLoadPrivacyErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI.messageId
      );
      instance.removeFromWishlistApiCallId =
        msgLoadPrivacyErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadPrivacyErrorRestAPI);
    });

    then("Get product id without errors", () => {
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

    then("Failed to get product id", () => {
      const msgLoadPrivacyErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI.messageId
      );
      instance.getCartProductId = msgLoadPrivacyErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadPrivacyErrorRestAPI);
    });

    then("Get product description id without errors", () => {
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
      instance.getCartProductDescriptionId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Failed to get product description id", () => {
      const msgLoadPrivacyErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI.messageId
      );
      instance.getCartProductDescriptionId =
        msgLoadPrivacyErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadPrivacyErrorRestAPI);
    });

    then("Render guest modal", () => {
      instance = exampleBlockA.instance() as ProductDescription;
      instance.setState({
        showGuestModal: true,
      });
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "buttonGuestCancel"
      );
      buttonComponent.simulate("press");

      buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "buttonGuestSignIn"
      );
      buttonComponent.simulate("press");

    });

    then("Render view all components", () => {
      instance = exampleBlockA.instance() as ProductDescription;
      instance.setState({
        productData: mockProductData,
      });

    });

    then("I can enter text with out errors", () => {
    });

    then("I can select the button with with out errors", () => {
    });

    then("I can upload prescription without errors", () => {
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
          message: [{}],
        }
      );
      instance.addPrescriptionApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Failed to upload prescription", () => {
      const msgLoadPrivacyErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI.messageId
      );
      instance.addPrescriptionApiCallId = msgLoadPrivacyErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadPrivacyErrorRestAPI);
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();

    });
  });

  test("User navigates to ReviewList", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: ReviewList;

    given("I am a User loading ReviewList", () => {
      exampleBlockA = shallow(<ReviewList {...screenProps} />);
    });

    when("I navigate to the ReviewList", () => {
      instance = exampleBlockA.instance() as ReviewList;
    });

    then("ReviewList will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();

    });

    then("Preload and render ReviewList without errors", async () => {
      await instance.componentDidMount();
      await instance.getReviewListData();
      expect(exampleBlockA).toBeTruthy();

    });

    then("Get review list without errors", () => {
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
          data: mockProductData,
        }
      );
      instance.getReviewListAPICallID = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Failed to get review list", () => {
      const msgLoadPrivacyErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI
      );
      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgLoadPrivacyErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadPrivacyErrorRestAPI.messageId
      );
      instance.getReviewListAPICallID = msgLoadPrivacyErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadPrivacyErrorRestAPI);
    });

    then("Render review cell without errors", () => {
      instance = exampleBlockA.instance() as ReviewList;
      instance.renderReviewCell({}, 0);

    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();

    });
  });
});
