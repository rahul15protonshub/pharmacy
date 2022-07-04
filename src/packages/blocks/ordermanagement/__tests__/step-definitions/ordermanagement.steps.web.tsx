import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { any } from "prop-types";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import Ordermanagement from "../../src/Ordermanagement";
import { SingleOrders } from "../../src/SingleOrders.web"
import { NoOrderFound } from "../../src/NoOrder.web"
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn(),
  },
  id: "Ordermanagement",
  wishlist: [], 
  order: any, 
  history:any, 
  getOrders: jest.fn()
};

jest.useFakeTimers();

const feature = loadFeature(
  "./__tests__/features/ordermanagement-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to ordermanagement", ({ given, when, then }) => {
    let OrderWrapper: ShallowWrapper;
    let instance: SingleOrders;


    given("I am a User loading ordermanagement", () => {
      OrderWrapper = shallow(<SingleOrders {...screenProps} />);
      expect(OrderWrapper).toBeTruthy();

    });

    when("I navigate to the ordermanagement", () => {
      instance = OrderWrapper.instance() as SingleOrders;
    });

    then("ordermangement will mount and preload data", () => {
      // instance.componentDidMount();
    });

    then("I can leave the screen with out errors", () => {
      // instance.componentWillUnmount();
    });
  });

  test("User navigates to no order found", ({ given, when, then }) => {
    let NoOrderFoundWrapper: ShallowWrapper;
    let instance: NoOrderFound;


    given("I am a User loading no order found", () => {
      NoOrderFoundWrapper = shallow(<NoOrderFound loading={false} />);
      expect(NoOrderFoundWrapper).toBeTruthy();

    });

    when("I navigate to the no order found", () => {
      instance = NoOrderFoundWrapper.instance() as NoOrderFound;
    });

    then("no order found will mount and preload data", () => {
      NoOrderFoundWrapper = shallow(<NoOrderFound loading={true} />);
      instance = NoOrderFoundWrapper.instance() as NoOrderFound;
    });

    then("I can leave the screen with out errors", () => {

    });
  });

});
