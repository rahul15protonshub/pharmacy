import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Login from "../../src/Login"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Login",
    fromCart: false
  }

const feature = loadFeature('./__tests__/features/Login-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Login', ({ given, when, then }) => {
        let loginWrapper:ShallowWrapper;
        let instance:Login; 

        given('I am a User loading Login', () => {
            loginWrapper = shallow(<Login {...screenProps}/>)
        });

        when('I navigate to the Login', () => {
             instance = loginWrapper.instance() as Login
             instance.setState({ isFetching:false})
        });

        then('Login will load with out errors', () => {
            expect(loginWrapper).toBeTruthy()
        });
        then("Login with email without errors", () => {
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
            instance.apiEmailLoginCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("Login send otp without errors", () => {
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
            instance.sendOtpApiCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("Login with guest without errors", () => {
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
            instance.apiGuestLoginCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("Login with socail without errors", () => {
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
            instance.apiSocialLoginCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
           then("I can press button without error", () => {
            let textInputComponent = loginWrapper.findWhere((node) => node.prop('testID') === 'loginguestbutton');
            textInputComponent.simulate('press');

            textInputComponent = loginWrapper.findWhere((node) => node.prop('testID') === 'loginbutton');
            textInputComponent.simulate('press');
            textInputComponent = loginWrapper.findWhere((node) => node.prop('testID') === 'showhidebutton');
            textInputComponent.simulate('press');
            textInputComponent = loginWrapper.findWhere((node) => node.prop('testID') === 'forgotbutton');
            textInputComponent.simulate('press');
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(loginWrapper).toBeTruthy()
        });
    });


});
