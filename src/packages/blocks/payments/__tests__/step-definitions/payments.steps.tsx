import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Payments from "../../src/Payments";
import Hyperpay from "../../src/Hyperpay";
import {FloatingTitleTextInputField} from "../../src/FloatingTitleTextInputField"
import OrderConfirm from "../../src/OrderConfirm";
import {StripePayments} from "../../src/Stripe.web";
import StorageProvider from "../../../../framework/src/StorageProvider";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Payments",
};
const hyperpayScreenProps = {
  navigation: navigation,
  id: "Hyperpay",
  addressData: null,
  cartDetails: null
};
const floatingTitleTextInputFieldProps = {
  navigation: navigation,
  id: "Payments",
  isFieldActive: false,
  value:"test",
  title:'hello'

}
const checkout_detail={body:{id:123}}
const feature = loadFeature("./__tests__/features/payments-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
     //@ts-ignore
     StorageProvider = {
      get: jest.fn(),
      set: jest.fn(),
    }
  });
  test("User navigates to Hyperpay", ({ given, when, then }) => {
    let hyperpayTrackingDetails: ShallowWrapper;
    let hyperpayInst: Hyperpay;

    let orderConfirm: ShallowWrapper;
    let orderConfirmInst: OrderConfirm;

    let stripe:ShallowWrapper; 
    let stripeInst: StripePayments;

    let floatingTitleTextInputField:ShallowWrapper;
    let floatingTitleTextInputFieldInst: FloatingTitleTextInputField;

    given("I am a User loading Hyperpay", () => {
      hyperpayTrackingDetails = shallow(<Hyperpay {...hyperpayScreenProps} />);
      floatingTitleTextInputField = shallow(<FloatingTitleTextInputField {...floatingTitleTextInputFieldProps} />);
      orderConfirm = shallow(<OrderConfirm {...hyperpayScreenProps} />);
      stripe = shallow(<StripePayments {...hyperpayScreenProps} />)
    });

    when("I navigate to the Hyperpay", () => {
      hyperpayInst = hyperpayTrackingDetails.instance() as Hyperpay;
      floatingTitleTextInputFieldInst = floatingTitleTextInputField .instance() as FloatingTitleTextInputField;
      orderConfirmInst = orderConfirm.instance() as OrderConfirm;
      stripeInst = stripe.instance() as StripePayments;
      floatingTitleTextInputFieldInst._returnAnimatedTitleStyles('cardNumber')
    });
    then("Hyperpay will load with out errors", () => {
      expect(hyperpayTrackingDetails).toBeTruthy();
      expect(orderConfirmInst).toBeTruthy();
      expect(stripeInst).toBeTruthy();
    });
    
    then("Hyperpay will apiHyperpayStatusCallId without errors", () => {
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
      hyperpayInst.apiHyperpayStatusCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("Hyperpay will apiHyperpayStatusCallId with errors", () => {
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
          errors:{status:404}
        }
      );
      hyperpayInst.apiHyperpayStatusCallId = msgLoadDataAPI.messageId;
      hyperpayInst.setState({checkout_detail:checkout_detail})
      hyperpayInst.hyperPayNativeCall()
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("I can enter text with out errors", () => {
      let textInputComponent = hyperpayTrackingDetails.findWhere(
        (node) => node.prop("testID") === "textinputCVV"
      );
      textInputComponent.simulate("changeText", "textinputCVV");

      textInputComponent = hyperpayTrackingDetails.findWhere(
        (node) => node.prop("testID") === "textinputCardHolderName"
      );
      textInputComponent.simulate("changeText", "textinputCardHolderName");
      textInputComponent = hyperpayTrackingDetails.findWhere(
        (node) => node.prop("testID") === "textinputExpiry"
      );
      textInputComponent.simulate("changeText", "textinputExpiry");
      textInputComponent = hyperpayTrackingDetails.findWhere(
        (node) => node.prop("testID") === "textinputCardNumber"
      );
      textInputComponent.simulate("changeText", "textinputCardNumber");
      // textInputComponent = hyperpayTrackingDetails.findWhere(
      //   (node) => node.prop("testID") === "otherTextInput"
      // );
      // textInputComponent.simulate('focus')
      // textInputComponent.simulate("changeText", "");
      

      const sessionResponseMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );

      sessionResponseMessage.addData(
        getName(MessageEnum.SessionResponseToken),
        {"token": ""}
      );
      runEngine.sendMessage("Unit Test", sessionResponseMessage);
     
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

      stripeInst.createStripeAPICallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);

      const msgRestAPIErrorAPI = new Message(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      runEngine.sendMessage("Unit Test", msgRestAPIErrorAPI);
      
      const msgErrorDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgErrorDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgErrorDataAPI.messageId
      );
      msgErrorDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );
      stripeInst.checkAvailabilityId = msgErrorDataAPI.messageId;
      hyperpayInst.chekoutApiCallId = msgErrorDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorDataAPI);

      const msgErrorDataStripAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgErrorDataStripAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgErrorDataStripAPI.messageId
      );
      msgErrorDataStripAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );
      stripeInst.createStripeAPICallId = msgErrorDataStripAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorDataStripAPI);

       stripeInst.onConfirmingOrder();
    });

    then("I can select the submit button with with out errors", () => {
      let btnProceed = hyperpayTrackingDetails.findWhere(
        (node) => node.prop("testID") === "btnProceed"
      );
      btnProceed.simulate("press", "btnProceed");
      hyperpayInst.getCheckoutId("");
    });
    then("I can leave the screen with out errors", () => {
      hyperpayInst.componentWillUnmount();
      expect(hyperpayTrackingDetails).toBeTruthy();
    });
  });
  test("User navigates to payments", ({ given, when, then }) => {
    let PayementWrapper: ShallowWrapper;
    let instance: Payments;

    given("I am a User loading payments", () => {
      PayementWrapper = shallow(<Payments {...screenProps} />);
      expect(PayementWrapper).toBeTruthy();
      instance = PayementWrapper.instance() as Payments;
   
      instance.componentDidMount()
     

      const getOrdersAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getOrdersAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getOrdersAPI.messageId
      );
      getOrdersAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: [
          {
            id: "34",
            type: "order",
            attributes: {
              id: 34,
              order_number: "OD00000034",
              amount: null,
              account_id: 3,
              coupon_code_id: 1,
              delivery_address_id: null,
              sub_total: "19.99",
              total: "82.59",
              order_items: [
                {
                  id: "33",
                  type: "order_item",
                  attributes: {
                    id: 33,
                    order_id: 34,
                    quantity: 1,
                    unit_price: "19.99",
                    total_price: "19.99",
                    old_unit_price: null,
                    status: "in_cart",
                    catalogue_id: 24,
                    catalogue_variant_id: 24,
                  },
                },
              ],
            },
          },
        ],
      });
      instance.getOrdersAPICallId = getOrdersAPI.messageId;
      runEngine.sendMessage("Unit Test", getOrdersAPI);
    });

    when("I navigate to the payments", () => {
      instance = PayementWrapper.instance() as Payments;
      instance.componentDidMount()
      instance.getToken()
    });

    then("payments will load with out errors", () => {
      expect(PayementWrapper).toBeTruthy();
    });

    then("I can enter text with out errors", () => {


      let textInputName = PayementWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputName"
      );
      textInputName.simulate("changeText", "Test");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(PayementWrapper).toBeTruthy();
    });
  });

  test("User trying to make payment", ({ given, when, then }) => {
    let PayementWrapper: ShallowWrapper;
    let instance: Payments;

    given("I am a User loading payments", () => {
      PayementWrapper = shallow(<Payments {...screenProps} />);
    });

    when("I click on pay with razor pay", () => {
      instance = PayementWrapper.instance() as Payments;
      let btnRazorPay = PayementWrapper.findWhere(
        (node) => node.prop("testID") === "RazorPay"
      );
      btnRazorPay.simulate("press");
      instance.setState({ razorPayModal: true, name: "Test", Order_Id: "1" });
    });
    then("payment will getIdApiCallId without errors", () => {
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
      instance.getIdApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("payment will getIdApiCallId with errors", () => {
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
          errors:{status:404}
        }
      );
      instance.getIdApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("payment will getUserProfileApiCallId without errors", () => {
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
          message:'success'
        }
      );
      instance.getUserProfileApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("payment will getUserProfileApiCallId with errors", () => {
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
          errors: [{}],
         
        }
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        {
          errors: [{}],
         
        }
      );
      instance.getUserProfileApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("payment will getsavePurchaseCallId without errors", () => {
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
          message:'success'
        }
      );
      instance.getsavePurchaseCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("payment will getsavePurchaseCallId with errors", () => {
      
    });

    then("Payment should success", () => {
      expect(instance.checkout()).toBe(true);
      expect(instance.savePurchase("test", "test", "tets")).toBe(true);
      expect(PayementWrapper).toBeTruthy();
    });
  });
});
