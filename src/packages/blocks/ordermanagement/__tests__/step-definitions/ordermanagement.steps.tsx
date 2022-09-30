/// <reference types="@types/jest" />

import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import Ordermanagement from "../../src/Ordermanagement";
import TopHeader from "../../../studio-store-ecommerce-components/src/TopHeader/TopHeader";
import CustomErrorModal from "../../../../blocks/studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
    state: {
      params: {
        isFromPlaced: true
      }
    }
  },
  id: "Ordermanagement",
};

const orders = require("./orders.json");

jest.useFakeTimers();

const feature = loadFeature(
  "./__tests__/features/ordermanagement-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to ordermanagement", ({ given, when, then }) => {
    let OrderWrapper: ShallowWrapper;
    let instance: Ordermanagement;

    given("I am a User loading ordermanagement", () => {
      OrderWrapper = shallow(<Ordermanagement {...screenProps} />);
      expect(OrderWrapper).toBeTruthy();

    });

    when("I navigate to the ordermanagement", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      const topHeader = OrderWrapper.find(TopHeader).first();
      topHeader.prop("onPressLeft")()
      expect(topHeader).toBeTruthy();

      const customerror = OrderWrapper.find(CustomErrorModal).first();
      customerror.prop("hideErrorModal")()
      expect(customerror).toBeTruthy();
    });

    then("ordermangement will mount and preload data", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      instance.componentDidMount();
      instance.getMyOrderListData();
      instance.apiCall({ contentType: "", method: "", endPoint: "", body: {} })
    });

    then("ordermangement will load order list without errors", () => {
      const getOrdersAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getOrdersAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getOrdersAPI.messageId
      );
      getOrdersAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: {
          order: {
            data: orders.data.order.data[0].attributes.order_items,
          },
        },
      });
      instance.getMyOrdersListAPICallID = getOrdersAPI.messageId;
      runEngine.sendMessage("Unit Test", getOrdersAPI);
    });

    then("ordermanagement will load with out errors", () => {
      
      expect(OrderWrapper).toBeTruthy();

    });

    then("ordermangement failed to load order list", () => {
      const msgLoadDataErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataErrorRestAPI
      );
      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataErrorRestAPI.messageId
      );
      instance.getMyOrdersListAPICallID = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then('ordermanagement will create cart', () => {
      const cartApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      cartApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        cartApi.messageId
      );
      cartApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: { },
      });
      instance.cartHasProductAPICallID = cartApi.messageId;
      runEngine.sendMessage("Unit Test", cartApi);
    });

    then('ordermanagement will failed create cart', () => {
      const msgLoadDataErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataErrorRestAPI
      );
      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataErrorRestAPI.messageId
      );
      instance.cartHasProductAPICallID = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then('ordermanagement will load cart', () => {
      const cartApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      cartApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        cartApi.messageId
      );
      cartApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: {},
      });
      instance.cartHasProductAPICallID = cartApi.messageId;
      runEngine.sendMessage("Unit Test", cartApi);
    });

    then('ordermanagement will failed load cart', () => {
      const msgLoadDataErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataErrorRestAPI
      );
      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataErrorRestAPI.messageId
      );
      instance.cartHasProductAPICallID = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("ordermanagement will render empty address view", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      instance.setState({ noProductFound: true });
      expect(OrderWrapper).toBeTruthy();

    });

    then("ordermanagement will render order cell", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      instance.setState({myOrderList: orders.data.order.data[0].attributes.order_items});
      instance.renderMyOrderList()
      instance.renderMyOrderCell(orders.data.order.data[0])
      expect(OrderWrapper).toBeTruthy();

    });

    then("I can leave the screen with out errors", () => {
      instance.handleBackButtonClick()
      screenProps.navigation.state.params.isFromPlaced = false
      OrderWrapper.setProps({...screenProps});
      instance.handleBackButtonClick()
      instance.componentWillUnmount();
      expect(OrderWrapper).toBeTruthy();

    });
  });

  test("User cancel an order", ({ given, when, then }) => {
    let OrderWrapper: ShallowWrapper;
    let instance: Ordermanagement;

    given("I am a User attempting to cancel an order", () => {
      OrderWrapper = shallow(<Ordermanagement {...screenProps} />);
      expect(OrderWrapper).toBeTruthy();

    });
    when("I click on cancel order", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      instance.setState({
        // activeOrderId: 1,
        // activeItemId: 1,
        showCancelOrderModal: true,
        // isCancelVisible: !instance.state.isCancelVisible
      });
      expect(OrderWrapper).toBeTruthy();

    });
    then("I click on yes", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      let btnCancelOrder = OrderWrapper.findWhere(
        (node) => node.prop("testID") === "btnCancelOrder"
      );
      btnCancelOrder.simulate("press");

      const cancelApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      cancelApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        cancelApi.messageId
      );
      cancelApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: {},
      });
      instance.cancelOrderAPICallID = cancelApi.messageId;
      runEngine.sendMessage("Unit Test", cancelApi);

      expect(OrderWrapper).toBeTruthy();

    });
    then("Rest Api will return success response", () => {
      const cancelOrderSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      cancelOrderSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        cancelOrderSucessRestAPI.messageId
      );
      cancelOrderSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Order cancelled successfully",
        }
      );
      instance.cancelOrderAPICallID = cancelOrderSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", cancelOrderSucessRestAPI);
    });
    then("ordermangement failed to cancel order", () => {
      const msgCancelOrderErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgCancelOrderErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgCancelOrderErrorRestAPI
      );
      msgCancelOrderErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgCancelOrderErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgCancelOrderErrorRestAPI.messageId
      );
      instance.cancelOrderAPICallID = msgCancelOrderErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgCancelOrderErrorRestAPI);
    });
  });

  test("User submit order review", ({ given, when, then }) => {
    let OrderWrapper: ShallowWrapper;
    let instance: Ordermanagement;

    given("I am a User attempting to submit order review", () => {
      OrderWrapper = shallow(<Ordermanagement {...screenProps} />);
      expect(OrderWrapper).toBeTruthy();

    });

    when("Show submit review modal", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      instance.setState({
        showSubmitReviewModal: true,
      });
      expect(OrderWrapper).toBeTruthy();

    });

    then("Change rating input value", () => {
      let ratingInput = OrderWrapper.findWhere(
        (node) => node.prop("testID") === "ratingInput"
      );
      ratingInput.simulate("change", "test rate");

    });

    then("I click on submit review", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      let btnSubmitReview = OrderWrapper.findWhere(
        (node) => node.prop("testID") === "buttonSubmitReview"
      );
      btnSubmitReview.simulate("press");

    });

    then("I click on cancel review", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      let btnSubmitReview = OrderWrapper.findWhere(
        (node) => node.prop("testID") === "buttonCancelReview"
      );
      btnSubmitReview.simulate("press");

    });

    then("Rest Api will return success response", () => {
      const submitReviewSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      submitReviewSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        submitReviewSucessRestAPI.messageId
      );
      submitReviewSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.submitOrderReviewAPICallID = submitReviewSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", submitReviewSucessRestAPI);
    });

    then("ordermangement failed to submit order review", () => {
      const msgCancelOrderErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgCancelOrderErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgCancelOrderErrorRestAPI
      );
      msgCancelOrderErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgCancelOrderErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgCancelOrderErrorRestAPI.messageId
      );
      instance.submitOrderReviewAPICallID =
        msgCancelOrderErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgCancelOrderErrorRestAPI);
    });
  });
});
