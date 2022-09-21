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
import ProductRating from "../../src/ProductRating.web";
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

const reviewData={ orderId:"1", orderItemId:"45", reviewId:"1", reviewText:"good", reviewRating:"4" }

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
      instance.componentDidMount();
      instance.sendLoginFailMessage();
      // instance.getOrders();
      instance.routeToProfile("profile");
      instance.openProductRatingModal();
      // instance.setProductAndOpenPM()
      // instance.openCancelOrderModal()
      // instance.confirmCancelOrder();
      instance.toggleCancelModal();
      // instance.routeToOrderDetails();
      // instance.writeReview();
      // instance.getAllNotificationsList();
      // instance.setCurrentImage()
    });

    
    then("ordermangement will order data with out errors", () => {
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
      instance.getOrdersCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });
    then("I can leave the screen with out errors", () => {
      // instance.componentWillUnmount();
    });
  });

  test("User navigates to product rating", ({ given, when, then }) => {
    let productRating: ShallowWrapper;
    let instance: ProductRating;


    given("I am a User loading product rating", () => {
      productRating = shallow(<ProductRating reviewData={reviewData} toggle={undefined} isOpen={false} onSuccess={undefined} {...screenProps} />);
      expect(productRating).toBeTruthy();

    });

    when("I navigate to the product rating", () => {
      instance = productRating.instance() as ProductRating;
    });

    then("product rating will mount and preload data", () => {
      instance.componentDidMount();
      instance.setRating(4)
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(productRating).toBeTruthy();

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
