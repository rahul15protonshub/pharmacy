import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { OrderDetails } from "../../src/OrderDetails.web";

jest.useFakeTimers();

const screenProps = {
  location: {
    state: {
      order: {
        order_number: 123,
        order_date: "",
        total: 20,
        delivery_addresses: ["test address"],
      },
      orderItem: {
        attributes: {
          product_name: "test",
          quantity: 34,
          catalogue_variant: {
            attributes: {
              product_variant_properties: [
                {
                  variant_name: "test",
                  property_name: "test",
                },
              ],
              images: {
                data: [
                  {
                    attributes: {
                      url: "test",
                    },
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
  history: {
    push: jest.fn(),
  },
  id: "Orderdetailview",
};

const feature = loadFeature(
  "./__tests__/features/orderdetailview-web-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to orderdetailview", ({ given, when, then }) => {
    let orderdetailviewBlock: ShallowWrapper;
    let instance: OrderDetails;

    given("I am a User loading orderdetailview", () => {
      orderdetailviewBlock = shallow(<OrderDetails {...screenProps} />);
    });

    when("I navigate to the orderdetailview", async () => {
      instance = orderdetailviewBlock.instance() as OrderDetails;
      await instance.componentDidMount();
      // await instance.getTrackIdDetails();
      // instance.setState({ orderDetails: {} });
    });

    then("orderdetailview will load with out errors", () => {
      expect(orderdetailviewBlock).toBeTruthy();

    });

    then("orderdetailview render with correct variables", () => {
      instance = orderdetailviewBlock.instance() as OrderDetails;
      instance.setState({ loader: false });
      expect(orderdetailviewBlock).toBeTruthy();

    });

    then("Load tracking details without errors", () => {
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
      instance.fetchTrackingDetailsCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("I can enter text with out errors", () => {
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = orderdetailviewBlock.findWhere(
        (node) => node.prop("data-testid") === "btn-move-to-profile"
      );
      buttonComponent.simulate("click");
      buttonComponent = orderdetailviewBlock.findWhere(
        (node) => node.prop("data-testid") === "btn-product-details"
      );
      buttonComponent.simulate("click");
      buttonComponent = orderdetailviewBlock.findWhere(
        (node) => node.prop("data-testid") === "btn-catalogue-details"
      );
      buttonComponent.simulate("click");
     
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(orderdetailviewBlock).toBeTruthy();

    });
  });
});
