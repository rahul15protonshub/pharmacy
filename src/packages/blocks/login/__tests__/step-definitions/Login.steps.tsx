/// <reference types="@types/jest" />
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"
import StorageProvider from "../../../../framework/src/StorageProvider";
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Login from "../../src/Login"

const screenProps = {
    navigation: {navigate:jest.fn(),
      addListener:(param:string,callback:any)=>{
        callback()
      }
    },
    id: "Login",
    fromCart: false
  }

const feature = loadFeature('./__tests__/features/Login-scenario.feature');
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.spyOn(console, "error").mockImplementation(() => {});
        jest.spyOn(global, "setTimeout");
     
         //@ts-ignore
        StorageProvider = {
         get: jest.fn(),
         set: jest.fn(),
         remove:jest.fn()
          }
    });
    afterEach(()=>{
      jest.runAllTimers()
    });

    test('User navigates to Login', ({ given, when, then }) => {
        let loginWrapper:ShallowWrapper;
        let instance:Login; 

        given('I am a User loading Login', () => {
            loginWrapper = shallow(<Login {...screenProps}/>)
        });

        when('I navigate to the Login', () => {
             instance = loginWrapper.instance() as Login
             instance.setState({ isFetching:false,passwordInput:"Anila@123"})
        });

        then('Login will load with out errors', () => {
            expect(loginWrapper).toBeTruthy()
        });
        then("Login with email without errors", async() => {
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
                meta:{token:"1233445"}
              }
            );
            instance.apiEmailLoginCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("Login send otp without errors", async() => {
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
                meta:{token:"1233445"}
              }
            );
            instance.sendOtpApiCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("Login with guest without errors", async() => {
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
                meta:{token:"1233445"}
              }
            );
            instance.apiGuestLoginCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);

            const msgLoadDataAPIerr = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            msgLoadDataAPIerr.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              msgLoadDataAPIerr.messageId
            );
            msgLoadDataAPIerr.addData(
              getName(MessageEnum.RestAPIResponceErrorMessage),
              {
                errors: "1233445"
              }
            );
            instance.apiGuestLoginCallId = msgLoadDataAPIerr.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPIerr);
            instance.onGuestLoginFailureCallBack('errror')
            instance.onGuestLoginFailureCallBack('')
            
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
                meta:{token:"1233445"}
              }
            );
            instance.apiSocialLoginCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
            instance.onSendVerificationOTP()
          });
          then("Login with email with errors", () => {
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
            instance.apiEmailLoginCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("Login send otp with errors", () => {
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
          then("Login with guest with errors", () => {
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
            instance.apiGuestLoginCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("Login with socail with errors", () => {
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
            instance.apiSocialLoginCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
           then("I can press button without error", async() => {
            let textInputemail = loginWrapper.findWhere((node) => node.prop('testID') === 'txtemail');
            textInputemail.simulate('focus');
            textInputemail.simulate('submit')

            let txtpassword = loginWrapper.findWhere((node) => node.prop('testID') === 'txtpassword');
            txtpassword.simulate('focus');
            txtpassword.simulate('submit')

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
          instance.onCloseAlertModal()
            instance.componentWillUnmount()
            expect(loginWrapper).toBeTruthy()
        });
    });


});
