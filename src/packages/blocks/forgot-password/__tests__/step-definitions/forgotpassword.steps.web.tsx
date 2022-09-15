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
            expect(forgotPassword).toBeTruthy()

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
        });

        then('newpassword will load with out errors', () => {
            expect(newPassword).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(newPassword).toBeTruthy()
        });
    });

});
