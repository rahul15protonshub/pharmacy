import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import ForgotPassword from "../../src/ForgotPassword"
import NewPassword from "../../src/NewPassword"

const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "ForgotPassword"
  }

const feature = loadFeature('./__tests__/features/forgotpassword-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to forgotpassword', ({ given, when, then }) => {
        let forgotPassword:ShallowWrapper;
        let instance:ForgotPassword; 

        given('I am a User loading forgotpassword', () => {
            forgotPassword = shallow(<ForgotPassword {...screenProps}/>)
        });

        when('I navigate to the forgotpassword', () => {
             instance = forgotPassword.instance() as ForgotPassword
             instance.setState({ showTimer: true, isOTPSent:true,emailInput:'test',otpInput:'gg' });
        });

        then('forgotpassword will load with out errors', () => {
            expect(forgotPassword).toBeTruthy()

        });
        then("forgotpassword will get validation without errors", () => {
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
            instance.validationAPICallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("forgotpassword will requestEmailOtpCallId without errors", () => {
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
            instance.requestEmailOtpCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("forgotpassword will apiGuestLoginCallId without errors", () => {
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
                success: true,
              }
            );
            instance.apiGuestLoginCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("forgotpassword will verifyOtpApiCallId without errors", () => {
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
            instance.verifyOtpApiCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          
          
        then("I can change text without error", () => {
            let textInputComponent = forgotPassword.findWhere((node) => node.prop('testID') === 'otpimage');
            textInputComponent.simulate('onFocus', '123456789');

            
        });
        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(forgotPassword).toBeTruthy()

        });
       
    });

    test('User navigates to newpassword', ({ given, when, then }) => {
        let newPassword:ShallowWrapper;
        let instance:NewPassword; 

        given('I am a User loading newpassword', () => {
            newPassword = shallow(<NewPassword {...screenProps}/>)
        });

        when('I navigate to the newpassword', () => {
             instance = newPassword.instance() as NewPassword
             instance.setState({enablePasswordField:false})
        });

        then('newpassword will load with out errors', () => {
            expect(newPassword).toBeTruthy()
        });
        then("newpassword will get validation without errors", () => {
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
          instance.validationAPICallId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
        then("newpassword will resetPasswordApiCallIdwithout errors", () => {
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
          instance.resetPasswordApiCallId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(newPassword).toBeTruthy()
        });
    });

});
