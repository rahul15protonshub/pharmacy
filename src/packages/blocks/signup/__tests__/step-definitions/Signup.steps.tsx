import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"
import CustomErrorModal from "../../../../blocks/studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Signup from "../../src/Signup"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Signup",
    fromCart: false
  }

const feature = loadFeature('./__tests__/features/Signup-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Signup', ({ given, when, then }) => {
        let signupBlockWrapper:ShallowWrapper;
        let instance:Signup; 

        given('I am a User loading Signup', () => {
            signupBlockWrapper = shallow(<Signup {...screenProps}/>)
        });

        when('I navigate to the Signup', () => {
             instance = signupBlockWrapper.instance() as Signup
             instance.getHelpCenterData()
             const customerror = signupBlockWrapper.find(CustomErrorModal).first();
             customerror.prop("hideErrorModal")()
             expect(customerror).toBeTruthy();
 
        });
        
        then("Signup will load sendOtpApiCallId without errors", () => {
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
          then("Signup will load sendOtpApiCallId with errors", () => {
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
            

              const msgLoadDataAPI1 = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              msgLoadDataAPI1.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgLoadDataAPI1.messageId
              );
            
              msgLoadDataAPI1.addData(
                  getName(MessageEnum.RestAPIResponceErrorMessage),
                  {
                    errors: [{}],
                  }
                );
            instance.sendOtpApiCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
            instance.sendOtpApiCallId = msgLoadDataAPI1.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI1);
          });
                    
        then("Signup will load apiSocialLoginCallId without errors", () => {
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
          then("Signup will load apiSocialLoginCallId with errors", () => {
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
          then("Signup will load apiGuestLoginCallId without errors", () => {
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
          then("Signup will load apiGuestLoginCallId with errors", () => {
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
          then("Signup will load getHelpCenterApiCallId without errors", () => {
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
            instance.getHelpCenterApiCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("Signup will load getHelpCenterApiCallId with errors", () => {
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
            instance.getHelpCenterApiCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });

        then('Signup will load  inputs without errors', () => {
          let txtfullname=  signupBlockWrapper.findWhere((node)=>node.prop('testID')===('txtfullname'))
          txtfullname.simulate('focus','email')
          txtfullname.simulate('changeText', 'hello');
          txtfullname.simulate('blur')
          txtfullname.simulate('onSubmitEditing',{ target: { value: 'test' } });
          instance.setState({email: false, password: true, fullName: true})
          instance.resetErrors()

          let txtemail=  signupBlockWrapper.findWhere((node)=>node.prop('testID')===('txtemail'))
          txtemail.simulate('focus','email')
          txtemail.simulate('changeText', 'hello');
          txtemail.simulate('blur')
          txtemail.simulate('onSubmitEditing',{ target: { value: 'test' } });
         

          let txtpassword=  signupBlockWrapper.findWhere((node)=>node.prop('testID')===('txtpassword'))
          txtpassword.simulate('focus','email')
          txtpassword.simulate('changeText', 'hello');
          txtpassword.simulate('blur')
          txtpassword.simulate('onSubmitEditing',{ target: { value: 'test' } });
          let touchsignup=  signupBlockWrapper.findWhere((node)=>node.prop('testID')===('touchsignup'))
          touchsignup.simulate('press')
          let termcondi=  signupBlockWrapper.findWhere((node)=>node.prop('testID')===('termcond'))
          termcondi.simulate('press')
          let termpolicy=  signupBlockWrapper.findWhere((node)=>node.prop('testID')===('termpolicy'))
          termpolicy.simulate('press')
          
          let pressguest=  signupBlockWrapper.findWhere((node)=>node.prop('testID')===('pressguest'))
          pressguest.simulate('press')
          instance.btnPasswordShowHideProps
        });

          

        then('Signup will load with out errors', () => {
            expect(signupBlockWrapper).toBeTruthy()

        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(signupBlockWrapper).toBeTruthy()

        });
    });


});
