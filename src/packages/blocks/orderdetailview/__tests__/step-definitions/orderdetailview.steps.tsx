import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Orderdetailview from "../../src/Orderdetailview";
import SubscriptionOrderList from "../../src/SubscriptionOrderList";
import CustomErrorModal from "../../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
import TopHeader from "../../../studio-store-ecommerce-components/src/TopHeader/TopHeader";
const orders = require("./orders.json");
const subscriptioniitem = require("./subscriptionitem.json");
jest.useFakeTimers();

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn(),
    state: {
      params: {
        orderData: orders.data.order.data[0].attributes.order_items[5],
        mainOrderData: {},
      },
    },
  },

  id: "Orderdetailview",
};


const feature = loadFeature(
  "./__tests__/features/orderdetailview-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to orderdetailview", ({ given, when, then }) => {
    let orderdetailviewBlock: ShallowWrapper;
    let instance: Orderdetailview;

    given("I am a User loading orderdetailview", () => {
      orderdetailviewBlock = shallow(<Orderdetailview {...screenProps} />);
    });

    when("I navigate to the orderdetailview", async () => {
      instance = orderdetailviewBlock.instance() as Orderdetailview;
      await instance.componentDidMount();
      await instance.getTrackIdDetails();
      instance.renderOrderShippingAddressView()
      instance.setState({ orderDetails: {} });
      instance.renderCompleteOrderStatusView()
    });

    then("orderdetailview will load with out errors", () => {
      expect(orderdetailviewBlock).toBeTruthy();

    });

    then("Load logistics and tracking data without errors", () => {
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
          data: {
            tracking: {},
          },
        }
      );
      instance.getLogisiticTrackIdDetailsCallID = msgLoadDataAPI.messageId;
      instance.onCancelDelivery("");
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Load track id details without errors", () => {
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
      instance.getTrackIdDetailsCallID = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Create cart without errors", () => {
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
      instance.createCartAPICallID = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Submit order review without errors", () => {
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
      instance.submitOrderReviewCallID = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Load cart that has products without errors", () => {
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
      instance.cartHasProductAPICallID = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Cancel order without errors", () => {
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
      instance.cancelOrderAPICallID = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Get subscription orders without errors", () => {
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
      instance.getSubscrptionOrdersAPICallID = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Extend delivery without errors", () => {
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
      instance.extendDeliveryAPICallID = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Failed to Load logistics and tracking data", () => {
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
      instance.getLogisiticTrackIdDetailsCallID =
        msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("Failed to Load track id details", () => {
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
      instance.getTrackIdDetailsCallID = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("Failed to Create cart", () => {
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
      instance.createCartAPICallID = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("Failed to Submit order review", () => {
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
      instance.submitOrderReviewCallID = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("Failed to Load cart that has products", () => {
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

    then("Failed to Cancel order", () => {
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
      instance.cancelOrderAPICallID = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("Failed to Get subscription orders", () => {
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
      instance.getSubscrptionOrdersAPICallID =
        msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("Failed to Extend delivery", () => {
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
      instance.extendDeliveryAPICallID = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = orderdetailviewBlock.findWhere(
        (node) => node.prop("testID") === "ratingInput"
      );
      textInputComponent.simulate("changeText", "test rating");

    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = orderdetailviewBlock.findWhere(
        (node) => node.prop("testID") === "buttonRatingContainer"
      );
      buttonComponent.simulate("press");
      buttonComponent = orderdetailviewBlock.findWhere(
        (node) => node.prop("testID") === "buttonRatingCancel"
      );
      buttonComponent.simulate("press");
      buttonComponent = orderdetailviewBlock.findWhere(
        (node) => node.prop("testID") === "buttonRatingSubmit"
      );
      buttonComponent.simulate("press");
      buttonComponent = orderdetailviewBlock.findWhere(
        (node) => node.prop("testID") === "buttonCancelOrderModalContent"
      );
      buttonComponent.simulate("press");
      buttonComponent = orderdetailviewBlock.findWhere(
        (node) => node.prop("testID") === "buttonCancelOrder"
      );
      buttonComponent.simulate("press");
      buttonComponent = orderdetailviewBlock.findWhere(
        (node) => node.prop("testID") === "buttonConfirmOrder"
      );
      buttonComponent.simulate("press");

    });

    then("Render view with different states with out errors", () => {
      instance.setState({ isFetching: false });
      expect(orderdetailviewBlock).toBeTruthy();

    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(orderdetailviewBlock).toBeTruthy();

    });
  });
  //subscription test
  test("User navigates to subscriptionorderlist", ({ given, when, then }) => {
    let SubscriptionOrderListblock: ShallowWrapper;
    let instance: SubscriptionOrderList;

    given("I am a User loading subscriptionorderlist", () => {
      SubscriptionOrderListblock = shallow(<SubscriptionOrderList {...screenProps} />);
    });

    when("I navigate to the subscriptionorderlist", async () => {
      instance = SubscriptionOrderListblock.instance() as SubscriptionOrderList;
      await instance.componentDidMount();
      instance.setState({subscriptionOrders:subscriptioniitem.data})
      instance.renderSubscriptionList()
      SubscriptionOrderListblock.find(CustomErrorModal).first().prop('hideErrorModal')()
      SubscriptionOrderListblock.find(TopHeader).first().prop('onPressLeft')
      
    });

    then("subscriptionorderlist will load with out errors", () => {
      expect(SubscriptionOrderListblock).toBeTruthy();

    });

    then("Load subscription data without errors", () => {
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
          data: {
            tracking: {},
          },
        }
      );
      instance.getSubscrptionOrdersAPICallID = msgLoadDataAPI.messageId;
      instance.onCancelDelivery("");
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Extend deleviry without errors", () => {
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
      instance.extendDeliveryAPICallID = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(SubscriptionOrderListblock).toBeTruthy();

    });
  });
});
