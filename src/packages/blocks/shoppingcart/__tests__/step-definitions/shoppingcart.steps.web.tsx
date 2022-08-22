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
import ShoppingCartWeb from "../../src/ShoppingCart.web";
import CheckoutWeb from "../../src/Checkout.web";


const navigation = {
  state: { params: {} },
  dispatch: jest.fn(),
  goBack: jest.fn(),
  dismiss: jest.fn(),
  navigate: jest.fn(),
  openDrawer: jest.fn(),
  closeDrawer: jest.fn(),
  toggleDrawer: jest.fn(),
  getParam: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  isFocused: jest.fn()
}

const screenProps = {
    navigation: navigation,
    id: "ShoppingCartWeb"
  }

  const feature = loadFeature('./__tests__/features/shoppingcart-web-scenario.feature');
  
  defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to shoppingcart', ({ given, when, then }) => {
      let shoppingcartWrapper:ShallowWrapper;
      let instance:ShoppingCartWeb; 

      given('I am a User loading shoppingcart', () => {
          shoppingcartWrapper = shallow(<ShoppingCartWeb {...screenProps}/>)
      });

      when('I navigate to the shoppingcart', () => {
           instance = shoppingcartWrapper.instance() as ShoppingCartWeb
      });

      then('shoppingcart will load with out errors', () => {
          expect(shoppingcartWrapper).toBeTruthy()
          instance = shoppingcartWrapper.instance() as ShoppingCartWeb

          const msgToken = new Message(
             getName(MessageEnum.SessionResponseMessage)
           );
           msgToken.addData(
             getName(MessageEnum.SessionResponseToken),
             "TOKEN"
           );
           runEngine.sendMessage("Unit Test", msgToken);
     
           const msgValidationAPI = new Message(
             getName(MessageEnum.RestAPIResponceMessage)
           );
           msgValidationAPI.addData(
             getName(MessageEnum.RestAPIResponceDataMessage),
             msgValidationAPI.messageId
           );
         
           msgValidationAPI.addData(
             getName(MessageEnum.RestAPIResponceSuccessMessage),
             {
               data: {}
             }
           );
     
           instance.GetCartApiCallId = msgValidationAPI.messageId;
           runEngine.sendMessage("Unit Test", msgValidationAPI);
     
           
           const msgError = new Message(
             getName(MessageEnum.RestAPIResponceErrorMessage)
           );
           msgError.addData(
             getName(MessageEnum.RestAPIResponceDataMessage),
             msgValidationAPI.messageId
           );
           msgError.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
             data: []
           });
           instance.GetCartApiCallId = msgValidationAPI.messageId;
           runEngine.sendMessage("Unit Test", msgValidationAPI);
      });

      then('I can leave the screen with out errors', () => {
          instance.componentWillUnmount()
          expect(shoppingcartWrapper).toBeTruthy()
      });
  });

  })