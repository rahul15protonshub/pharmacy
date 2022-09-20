import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import LoginScreen from "../../src/LoginScreen.web"
import { EmailAccountLoginBlock } from '../../src/EmailAccountLogin.web';
const navigation = require("react-navigation")

const screenProps = {
  navigation: navigation,
  id: "EmailAccountLoginBlock",
  history: null,
  location: null
}

const feature = loadFeature('./__tests__/features/email-account-login-scenario.web.feature');

const e={
  target:{
    value:"test",
    checked:true
  },
  preventDefault():any{

  }
}

const value={
  userEmail:"teas@gmail.com",
  password:"12345"
}


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
    then('Log In Screen will load data with out errors', () => {
      instance.componentDidMount();
      instance.verifyGuestToken();
      instance.routeToAll("homepage");
      instance.showPassword(e);
      instance.setShowSpinner(false);
      instance.verifyEmailBeforeRegistartion("","");
      instance.guestLogin();
      instance.signinUser(value);
      instance.routeHelpCenter("about")
      instance.userSkipOTPVerificationRegistartion();
      instance.getCountryCode();
    })
    then('Log In Screen will load with out errors', () => {
      instance
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
      // instance.guestLoginApiCallId = msgRegistrationAPI.messageId;
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

    then('Log In Screen verify email with out errors', () => {
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
      instance.verfiySocialLoginApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then('Log In Screen guest login with out errors', () => {
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
      instance.guestLoginApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then('Log In Screen login with out errors', () => {
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
      instance.loginAPICallID = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then('Log In Screen user skip login with out errors', () => {
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
      instance.userSkipRegistartionOTPVerfiyAPICallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });
    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount();
      expect(webAccountLogInWrapper).toBeTruthy();

    });
  });

  test('user navigates to login screen',({given,when,then})=>{
    let webLogInScreenWrapper: ShallowWrapper;
    let instance: LoginScreen;

    given('I am a User attempting to Logscreen',()=>{
      webLogInScreenWrapper = shallow(<LoginScreen {...screenProps} />)
      expect(webLogInScreenWrapper).toBeTruthy()
    })
    
    when('I navigate to the Log In Screen',()=>{
      instance = webLogInScreenWrapper.instance() as LoginScreen
    })

    then('Log In Screen will load data with out errors',()=>{
      instance.componentDidMount();
      instance.setState({
        isOpenPopUp:true
      })
      instance.UNSAFE_componentWillReceiveProps("");
      expect(webLogInScreenWrapper).toBeTruthy()
    })
    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount();
      expect(webLogInScreenWrapper).toBeTruthy();

    });
  })
});
