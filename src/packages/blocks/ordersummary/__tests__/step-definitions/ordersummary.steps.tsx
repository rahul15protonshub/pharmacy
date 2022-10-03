import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Ordersummary from "../../src/Ordersummary";
import {Alert,FlatList} from 'react-native';
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    addListener: (params:string,callback:any)=>{
      callback()
    },
    replace: jest.fn(),
    state:{
      params:{checkoutData:{address:{id:1}}},
      buyNowCartID:23
    }
  },
  id: "Ordersummary",
};

const feature = loadFeature(
  "./__tests__/features/ordersummary-scenario.feature"
);

const mockOrderItem = {
  id: "34",
  type: "order",
  data:{attributes: {
    id: 34,
    order_number: "OD00000034",
    amount: null,
    account_id: 3,
    coupon_code_id: 1,
    applied_discount: 1,
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
          product_images: [
            {
              url: "",
            },
          ],
        },
      },
    ],}},
  attributes: {
    id: 34,
    order_number: "OD00000034",
    amount: null,
    account_id: 3,
    coupon_code_id: 1,
    applied_discount: 1,
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
          product_images: [
            {
              url: "",
            },
          ],
        },
      },
    ],
  },
};
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(Alert, 'alert');
  });
  afterEach(()=>{
    jest.runAllTimers()
  });
  test("User navigates to ordersummary", ({ given, when, then }) => {
    let ordersummaryBlock: ShallowWrapper;
    let instance: Ordersummary;

    given("I am a User loading ordersummary", () => {
      ordersummaryBlock = shallow(<Ordersummary {...screenProps} />);
    });

    when("I navigate to the ordersummary", () => {
      instance = ordersummaryBlock.instance() as Ordersummary;
      const flatList = ordersummaryBlock.find(FlatList).first();
      flatList.prop("renderItem")({item: mockOrderItem, index: 0, separators: {highlight: jest.fn(), unhighlight: jest.fn(), updateProps: jest.fn()}});

    });

    then("ordersummary will load with out errors", () => {
      expect(ordersummaryBlock).toBeTruthy();

    });

    then("ordersummary init values without errors", () => {
      instance = ordersummaryBlock.instance() as Ordersummary;
      instance.componentDidMount();
      instance.getToken();
      expect(ordersummaryBlock).toBeTruthy();

    });

    then("ordersummary will load cart list without errors", () => {
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
          data: [mockOrderItem],
          message:'success'
        }
      );
      instance.getCartListApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("ordersummary failed to load cart list", () => {
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
        getName(MessageEnum.RestAPIResponceErrorMessage),
        {
          errors: [{}],
        }
      );
      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataErrorRestAPI.messageId
      );
      instance.getCartListApiCallId = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("ordersummary will load user profile without errors", () => {
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
      instance.getUserProfileApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("ordersummary will load user profile with errors", () => {
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
      instance.getUserProfileApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("ordersummary will load user profile with errors res", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
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
    then("ordersummary failed to load user profile", () => {
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
      instance.getUserProfileApiCallId = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("ordersummary will load cart product id without errors", () => {
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
      instance.getCartProductId = msgLoadDataAPI.messageId;
      instance.getShippingChargeCalculation()
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("ordersummary failed to load cart product id", () => {
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
        getName(MessageEnum.RestAPIResponceErrorMessage),
        {
          errors: [{}],

        }
      );

      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataErrorRestAPI.messageId
      );
      instance.getCartProductId = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("ordersummary will load place order without errors", async() => {
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
      instance.placeOrderId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
      await instance.placeOrder()
    });

    then("ordersummary failed to place order", () => {
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
      instance.placeOrderId = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("ordersummary will create stripe payment id without errors", async() => {
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
      instance.createStripePaymentId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
     await instance.saveAddress()
     await instance.requestPayment()
    });

    then("ordersummary failed to create stripe payment id", () => {
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
      instance.createStripePaymentId = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("ordersummary will load with mocked data", () => {
      instance = ordersummaryBlock.instance() as Ordersummary;
      instance.setState({
        cartList: mockOrderItem.attributes.order_items,
        cartData: mockOrderItem,
        isFetching: false,
        emptyCart: false,
      });
      expect(ordersummaryBlock).toBeTruthy();

    });

    then("I can enter text with out errors", () => {
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = ordersummaryBlock.findWhere(
        (node) => node.prop("testID") === "buttonPaymentCOD"
      );
      buttonComponent.simulate("press");

      // INR Paymenst only need to simuilate theme block.
      
      // buttonComponent = ordersummaryBlock.findWhere(
      //   (node) => node.prop("testID") === "buttonPaymentRazor"
      // );
      // buttonComponent.simulate("press");


    });

    then("Show guest modal without errors", () => {
      instance.setState({
        showGuestModal: true,
      });


      let buttonComponent = ordersummaryBlock.findWhere(
        (node) => node.prop("testID") === "buttonGuestStart"
      );
      buttonComponent.simulate("press");



      buttonComponent = ordersummaryBlock.findWhere(
        (node) => node.prop("testID") === "buttonGuestCancel"
      );
      buttonComponent.simulate("press");


    });

    then("I can leave the screen with out errors", () => {
      instance.handleBackButtonClick()
      instance.componentWillUnmount();
      expect(ordersummaryBlock).toBeTruthy();

    });

    then("ordersummary createOrderId without error", () => {
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
      instance.createOrderId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("ordersummary verifyRazorPayId without error", async() => {
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
          data: [{
            order:{placeat:'',placed_at:''}
          }],
          message:'success'
        }
      );
      instance.verifyRazorPayId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
      await instance.getRazorpayOrderId()
    });
    then("ordersummary releaseBlockQuantityApiCallId without error", () => {
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
      instance.releaseBlockQuantityApiCallId = msgLoadDataAPI.messageId;
      instance.releaseBlockQuantitySuccessCallBack()
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("ordersummary releaseShippingChargeCalculationApiCallID without error", () => {
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
      instance.releaseShippingChargeCalculationApiCallID = msgLoadDataAPI.messageId;

      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
      instance.releaseShippingChargeCalculationSuccessCallBack
    });
    then("ordersummary shippingChargeCalculationApiCallID without error", () => {
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
          data: mockOrderItem,
        }
      );
      instance.shippingChargeCalculationApiCallID = msgLoadDataAPI.messageId;
      instance.getShippingChargeCalculationSuccessCallBack(mockOrderItem)
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
  
    then("ordersummary save address without error", () => {
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
      instance.saveAddressId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
      instance.checkProductAvailability()
    });
    then("ordersummary save address with error", () => {
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
      instance.saveAddressId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("ordersummary check zipcode without error", () => {
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
      instance.checkZipcodeId = msgLoadDataAPI.messageId;
      instance.onConfirmingOrder()
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("ordersummary check availablity without error", () => {
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
      instance.checkAvailabilityId = msgLoadDataAPI.messageId;
      instance.checkZipcodeAvailability()
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("ordersummary check availablity with error", () => {
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
      instance.checkAvailabilityId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("ordersummary releaseblock without error", () => {
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
      instance.releaseBlockId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("ordersummary releaseblock with error", () => {
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
      instance.releaseBlockId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    then("ordersummary confirmStripePaymentID without error", () => {
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
      instance.confirmStripePaymentID = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });
    //rahul
  });
});
