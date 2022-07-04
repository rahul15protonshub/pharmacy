import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Filteritems from "../../src/Filteritems";
import Filteroptions from "../../src/Filteroptions";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn(),
    state: {
      params: {
        filterData: [],
        onPressFilter: jest.fn(),
      },
    },
  },
  id: "Filteritems",
};

const feature = loadFeature(
  "./__tests__/features/filteritems-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to filteritems", ({ given, when, then }) => {
    let filterItemsBlock: ShallowWrapper;
    let instance: Filteritems;

    given("I am a User loading filteritems", () => {
      filterItemsBlock = shallow(<Filteritems {...screenProps} />);
      expect(filterItemsBlock).toBeTruthy();
      instance = filterItemsBlock.instance() as Filteritems;
    });

    when("I navigate to the filteritems", () => {
      instance = filterItemsBlock.instance() as Filteritems;
    });

    then("filteritems will load with out errors", async () => {
      await instance.componentDidMount();
      instance.getProductList();
      instance.getCartHasProduct();
      instance.getCartList();
      expect(filterItemsBlock).toBeTruthy();

    });

    then("filteritems will load products without errors", () => {
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
      instance.getProductApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("filteritems will filter data without errors", () => {
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
      instance.applyFilterApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("filteritems will add to wishlist without errors", () => {
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
      instance.getProductApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("filteritems will remove from wishlist without errors", () => {
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

    then("filteritems will get products with id without errors", () => {
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

    then("filteritems will add to cart without errors", () => {
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

    then("filteritems will get cart list without errors", () => {
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

    then("I can select the button with with out errors", () => {
      let buttonComponent = filterItemsBlock.findWhere(
        (node) => node.prop("testID") === "buttonSort"
      );
      buttonComponent.simulate("press");

      buttonComponent = filterItemsBlock.findWhere(
        (node) => node.prop("testID") === "buttonFilter"
      );
      buttonComponent.simulate("press");

      buttonComponent = filterItemsBlock.findWhere(
        (node) => node.prop("testID") === "buttonSortBy"
      );
      buttonComponent.simulate("press");

      buttonComponent = filterItemsBlock.findWhere(
        (node) => node.prop("testID") === "buttonSortPriceLowToHigh"
      );
      buttonComponent.simulate("press");

      buttonComponent = filterItemsBlock.findWhere(
        (node) => node.prop("testID") === "buttonSortPriceHighToLow"
      );
      buttonComponent.simulate("press");
      buttonComponent = filterItemsBlock.findWhere(
        (node) => node.prop("testID") === "buttonSortNewestProducts"
      );
      buttonComponent.simulate("press");
      buttonComponent = filterItemsBlock.findWhere(
        (node) => node.prop("testID") === "buttonSortPopularity"
      );
      buttonComponent.simulate("press");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(filterItemsBlock).toBeTruthy();

    });
  });

  test("User navigates to filteroptions", ({ given, when, then }) => {
    let filterItemsBlock: ShallowWrapper;
    let instance: Filteroptions;

    given("I am a User loading filteroptions", () => {
      filterItemsBlock = shallow(<Filteroptions {...screenProps} />);
      expect(filterItemsBlock).toBeTruthy();
      instance = filterItemsBlock.instance() as Filteroptions;
    });

    when("I navigate to the filteroptions", () => {
      instance = filterItemsBlock.instance() as Filteroptions;
    });

    then("filteroptions will load with out errors", async () => {
      await instance.componentDidMount();
      await instance.getToken();
      expect(filterItemsBlock).toBeTruthy();

    });

    then("filteroptions will get category without errors", () => {
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
      instance.getCategoryApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("filteroptions will get brand without errors", () => {
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
      instance.getBrandApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("filteroptions will apply all without errors", () => {
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
      instance.applyAllApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("filteroptions will get tags without errors", () => {
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
      instance.getTagsApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = filterItemsBlock.findWhere(
        (node) => node.prop("testID") === "buttonPriceRange"
      );
      buttonComponent.simulate("press");

      buttonComponent = filterItemsBlock.findWhere(
        (node) => node.prop("testID") === "buttonBrand"
      );
      buttonComponent.simulate("press");

      buttonComponent = filterItemsBlock.findWhere(
        (node) => node.prop("testID") === "buttonTags"
      );
      buttonComponent.simulate("press");

      buttonComponent = filterItemsBlock.findWhere(
        (node) => node.prop("testID") === "buttonCategory"
      );
      buttonComponent.simulate("press");

      buttonComponent = filterItemsBlock.findWhere(
        (node) => node.prop("testID") === "buttonCancel"
      );
      buttonComponent.simulate("press");

      buttonComponent = filterItemsBlock.findWhere(
        (node) => node.prop("testID") === "buttonApplyFilter"
      );
      buttonComponent.simulate("press");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(filterItemsBlock).toBeTruthy();

    });
  });
});
