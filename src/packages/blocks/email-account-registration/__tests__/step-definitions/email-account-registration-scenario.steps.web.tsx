import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import {EmailRegistartion} from "../../src/EmailRegistartion.web"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "EmailRegistartion",
    history: null,
    isPopup: true,
    isOpenPopUp: true
  }

const feature = loadFeature('./__tests__/features/email-account-registration-scenario.web.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Email Log In', ({ given, when, then }) => {
        let webAccountLogInWrapper:ShallowWrapper;
        let instance:EmailRegistartion; 

        given('I am a User attempting to Log In with a Email', () => {
            webAccountLogInWrapper = shallow(<EmailRegistartion {...screenProps}/>)
            expect(webAccountLogInWrapper).toBeTruthy()   

        });

        when('I navigate to the Log In Screen', () => {
             instance = webAccountLogInWrapper.instance() as EmailRegistartion
        });
        
        then('Log In Screen will load with out errors', () => {
        

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
                  meta:["ABC"]
                }
              );
        
              instance.registartionEmailCallId = msgRegistrationAPI.messageId;
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
        
              instance.sendOTPAPICallId = msgValidationAPI.messageId;
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

              const msgError = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              msgError.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgError.messageId
              );
              msgError.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
                data: []
              });
              instance.registartionEmailCallId = msgError.messageId;
              runEngine.sendMessage("Unit Test", msgError);

            const apiNoItemsMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
            apiNoItemsMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data:[]})
            runEngine.sendMessage("Unit Test", apiNoItemsMsg);

            //Test Routing
            instance.routeHelpCenter("About");
            instance.routeHelpCenter("fbout");
            instance.routeHelpCenter(undefined);

            //Test SignUp
            instance.signupUser(null);
            instance.registartionEmail(null)
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount();
            expect(webAccountLogInWrapper).toBeTruthy();

        });
    });
});
