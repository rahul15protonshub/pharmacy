import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import {ForgotPasswordOTP} from "../../src/ForgotPassword.web"
import {NewPassword} from "../../src/NewPassword.web"

const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "ForgotPasswordOTP",
    history: null
  }

const feature = loadFeature('./__tests__/features/forgotpassword-scenario.web.feature');

const e_email={
    target:{
      value:"test",
      checked:true
    },
    preventDefault():any{
  
    }
  }
  const token = "abx"
  const data={
    token,
      data: {
        password:"12345",
        password_confirmation:"12345",
      },
  }
  const e_otp={
    target:{
      value:"test",
      checked:true
    },
    preventDefault():any{
  
    }
  }
defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to forgotpassword', ({ given, when, then }) => {
        let forgotPassword:ShallowWrapper;
        let instance:ForgotPasswordOTP; 

        given('I am a User loading forgotpassword', () => {
            forgotPassword = shallow(<ForgotPasswordOTP {...screenProps}/>)
        });

        when('I navigate to the forgotpassword', () => {
             instance = forgotPassword.instance() as ForgotPasswordOTP
        });

        then('forgotpassword will load with out errors', () => {
            instance.componentDidMount();
            instance.secondsToTime("1000");
            instance.startTimer();
            instance.countDown();
            instance.isValidEmail("test@gmail.com");
            instance.isValidOTP("214563")
            instance.SendOtpBtn(e_email)
            instance.emailConfirm();
            instance.handleOTP(e_otp)
            instance.handleEmail(e_email)
            instance.verifyOTP();
            instance.guestUserHandler()
            expect(forgotPassword).toBeTruthy()
        });
       
        then('user login as a guest user with out errors',()=>{
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
        })

        then('user reset otp with out errors',()=>{
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
              instance.resetOTPApiCallId = msgSuccessRestAPI.messageId;
              runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
        })

        then('user confirm email with out errors',()=>{
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
              instance.confirmEmailAPiCallID = msgSuccessRestAPI.messageId;
              runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
        })
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
        });

        then('newpassword will load with out errors', () => {
            instance.componentDidMount();
            instance.setNewPass("12345");
            instance.showPassword(e_email);
            instance.showConfirmPassword(e_email);
            instance.handleResetPassword(data)
            expect(newPassword).toBeTruthy()
        });

        then('reset password with out errors',()=>{
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
              instance.resetPasswordAPICallId = msgSuccessRestAPI.messageId;
              runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
              instance.setState({
                showSpinner:false,
                invalidPass:""
              })
        })
        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(newPassword).toBeTruthy()
        });
    });

});
