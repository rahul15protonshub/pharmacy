import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { WishList } from "../../src/WishList.web";
import { NoWishList } from "../../src/NoWishList.web";

jest.useFakeTimers();

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Wishlist",
  productList: [
    {
      data: {
        attributes: {
          id: {
            data: {
              id: "1",
              attributes: {
                stock_qty: 1,
                catalogue_variants: [
                  {
                    id: 1,
                    attributes: {
                      on_sale: true,
                      price: 10,
                      stock_qty: 1,
                      discount_price: 5,
                    },
                  },
                ],
                default_variant: {
                  stock_qty: 0,
                  id: 1,
                },
                name: "test",
                average_rating: 4.8,
                reviews: [],
                cart_items: [],
                product_variants: [
                  {
                    is_master: true,
                    id: "1",
                    images: [],
                    on_sale: true,
                    sale_price: 5,
                    actual_price: 5,
                    stock_qty: 1,
                    current_availability: "in_stock",
                    is_in_cart: true,
                  },
                ],
              },
            },
          },
        },
      },
    },
  ],
  getWishList: () => {},
  history: {},
};

const noWishListProps = {
  history: {
    push: jest.fn(),
  },
  loading: false,
};

const feature = loadFeature(
  "./__tests__/features/Wishlist-web-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Wishlist", ({ given, when, then }) => {
    let wishlistWrapper: ShallowWrapper;
    let instance: WishList;

    given("I am a User loading Wishlist", () => {
      wishlistWrapper = shallow(<WishList {...screenProps} />);
    });

    when("I navigate to the Wishlist", () => {
      instance = wishlistWrapper.instance() as WishList;
    });

    then("Wishlist will load with out errors", () => {
      expect(wishlistWrapper).toBeTruthy();
    });

    then("Add to wishlist without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.addToWishListAPICallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("Failed to add wishlist", () => {
      const msgErrorMessageRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgErrorMessageRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              Error: "Error",
            },
          ],
        }
      );
      instance.addToWishListAPICallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("Delete item without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.deleteItemAPICallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("Failed to delete item", () => {
      const msgErrorMessageRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgErrorMessageRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              Error: "Error",
            },
          ],
        }
      );
      instance.deleteItemAPICallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("Get is cart created without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.GetIsCartCreatedApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("Failed to get is cart created", () => {
      const msgErrorMessageRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgErrorMessageRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              Error: "Error",
            },
          ],
        }
      );
      instance.GetIsCartCreatedApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("Post create cart without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.postCreateCartApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("Failed to post create cart", () => {
      const msgErrorMessageRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgErrorMessageRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              Error: "Error",
            },
          ],
        }
      );
      instance.postCreateCartApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("Put item to the cart without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.putItemToCartApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("Failed to put item to the cart", () => {
      const msgErrorMessageRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgErrorMessageRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              Error: "Error",
            },
          ],
        }
      );
      instance.putItemToCartApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("I can select the button with out errors", () => {
      let buttonComponent = wishlistWrapper.findWhere(
        (node) => node.prop("data-testid") === "button-favorite-product-set"
      );
      buttonComponent.simulate("click");

      buttonComponent = wishlistWrapper.findWhere(
        (node) => node.prop("data-testid") === "button-product-details"
      );
      buttonComponent.simulate("click");

      buttonComponent = wishlistWrapper.findWhere(
        (node) => node.prop("data-testid") === "button-product-details"
      );
      buttonComponent.simulate("click");

      buttonComponent = wishlistWrapper.findWhere(
        (node) => node.prop("data-testid") === "button-add-catalogue-variant"
      );
      buttonComponent.simulate("click");
    });

    then("Set proper states and render successfully", () => {
      instance.setState({ showModal: true });
      let buttonComponent = wishlistWrapper.findWhere(
        (node) => node.prop("data-testid") === "button-favorite-product-set"
      );
      buttonComponent.simulate("click");
      expect(wishlistWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(wishlistWrapper).toBeTruthy();
    });
  });

  test("User navigates to NoWishList", ({ given, when, then }) => {
    let noWishlistWrapper: ShallowWrapper;
    let instance: NoWishList;

    given("I am a User loading NoWishList", () => {
      noWishlistWrapper = shallow(<NoWishList {...noWishListProps} />);
    });

    when("I navigate to the NoWishList", () => {
      instance = noWishlistWrapper.instance() as NoWishList;
    });

    then("NoWishList will load with out errors", () => {
      expect(noWishlistWrapper).toBeTruthy();
    });

    then("I can select the button with out errors", () => {
      let buttonComponent = noWishlistWrapper.findWhere(
        (node) => node.prop("data-testid") === "button-browse-products"
      );
      buttonComponent.simulate("click");
    });

    then("I can leave the screen with out errors", () => {
      expect(noWishlistWrapper).toBeTruthy();
    });
  });
});
