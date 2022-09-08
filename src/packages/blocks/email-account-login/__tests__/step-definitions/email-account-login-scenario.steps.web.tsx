import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { EmailAccountLoginBlock } from '../../src/EmailAccountLogin.web';
const navigation = require("react-navigation")

const screenProps = {
  navigation: navigation,
  id: "EmailAccountLoginBlock",
  history: null,
  location: null
}

const feature = loadFeature('./__tests__/features/email-account-login-scenario.web.feature');

defineFeature(feature, (test) => {


  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to Email Log In', ({ given, when, then }) => {
    let webAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given('I am a User attempting to Log In with a Email', () => {
      webAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps} />)
      expect(webAccountLogInWrapper).toBeTruthy()

    });

    when('I navigate to the Log In Screen', () => {
      instance = webAccountLogInWrapper.instance() as EmailAccountLoginBlock
    });

    then('Log In Screen will load with out errors', () => {
      const apiNoItemsMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiNoItemsMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: [] })

      const msgRegistrationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgRegistrationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgRegistrationAPI.messageId
      );

      msgRegistrationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
          meta: ["ABC"]
        }
      );

      instance.loginAPICallID = msgRegistrationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgRegistrationAPI);

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

      runEngine.sendMessage("Unit Test", msgValidationAPI);


      const msgValidationErroAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationErroAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationErroAPI.messageId
      );

      msgValidationErroAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: ["Error"],
        }
      );

      runEngine.sendMessage("Unit Test", msgValidationErroAPI);


      //Test Routing
      instance.routeHelpCenter("About");
      instance.routeHelpCenter("fbout");
      instance.routeHelpCenter(undefined);

      //Test LogIn
      instance.signinUser(null);
      // instance.guestLogin();

      runEngine.sendMessage("Unit Test", apiNoItemsMsg);
    });

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount();
      expect(webAccountLogInWrapper).toBeTruthy();

    });
  });
});
