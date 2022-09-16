/// <reference types="@types/jest" />
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import OTPInputAuth from "../../src/OTPInputAuth"

const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "OTPInputAuth"
  }

const feature = loadFeature('./__tests__/features/otp-input-confirmation-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to OTPInputAuth', ({ given, when, then }) => {
        let otpInputAuth:ShallowWrapper;
        let instance:OTPInputAuth; 

        given('I am a User loading OTPInputAuth', () => {
            otpInputAuth = shallow(<OTPInputAuth {...screenProps}/>)
        });

        when('I navigate to the OTPInputAuth', () => {
             instance = otpInputAuth.instance() as OTPInputAuth
             instance.loadScreen();
             expect(otpInputAuth).toBeTruthy()
        });

        then('OTPInputAuth will load with out errors', () => {
            expect(otpInputAuth).toBeTruthy()
        });
        then("OTPInputAuth verifyOtpApiCallId without errors", () => {
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
          then("OTPInputAuth verifyOtpApiCallId with errors", () => {
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
            instance.verifyOtpApiCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("OTPInputAuth sendOtpApiCallId without errors", () => {
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
          then("OTPInputAuth sendOtpApiCallId with errors", () => {
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
            instance.sendOtpApiCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
         then("OTPInputAuth  signupApiCallId without errors", () => {
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
            instance. signupApiCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("OTPInputAuth  signupApiCallId with errors", () => {
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
            instance. signupApiCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });


        then('I can leave the screen with out errors', () => {
            instance.handleBackButtonClick
            instance.componentWillUnmount()
            expect(otpInputAuth).toBeTruthy()
        });
    });

});
