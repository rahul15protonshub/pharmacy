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
                meta:{token:'1233445'}
              }
            );
            instance.requestEmailOtpCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("forgotpassword will requestEmailOtpCallId with errors", () => {
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
            instance.requestEmailOtpCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });

          then("forgotpassword will apiGuestLoginCallId with errors", () => {
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
          then("forgotpassword will verifyOtpApiCallId with errors", () => {
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

            let textInputContactname = forgotPassword.findWhere((node) => node.prop('testID') === 'txtforgotnum');
          textInputContactname.simulate('focus')
          textInputContactname.simulate('changeText', 'testtt');
          textInputContactname.simulate('blur')
       
      
          let textInputContactemail = forgotPassword.findWhere((node) => node.prop('testID') === 'txtforgotemail');
          textInputContactemail.simulate('focus')
          textInputContactemail.simulate('changeText', 'testtt');
          textInputContactemail.simulate('blur')

            
        });
        then('I can leave the screen with out errors', () => {
          instance.handleBackButtonClick;
            instance.componentWillUnmount()
            instance.onCloseAlertModal()
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
              meta:{message:''}
            }
          );
          instance.resetPasswordApiCallId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
        then("newpassword will resetPasswordApiCallId with errors", () => {
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
          instance.resetPasswordApiCallId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });

        then("newpassword will changetext with out errors", () => {
          let textInputContactname = newPassword.findWhere((node) => node.prop('testID') === 'txtconfrmpassword');
          textInputContactname.simulate('focus')
          textInputContactname.simulate('changeText', 'testtt');
          textInputContactname.simulate('blur')
       
      
          let textInputContactemail = newPassword.findWhere((node) => node.prop('testID') === 'txtnewpassword');
          textInputContactemail.simulate('focus')
          textInputContactemail.simulate('changeText', 'testtt');
          textInputContactemail.simulate('blur')

        })

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(newPassword).toBeTruthy()
        });
    });

});
