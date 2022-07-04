import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import HelpCenter from "../../src/HelpCenter"
import HelpCenterData from "../../src/HelpCenterData"

const navigation = {
    state: { params: {} },
    dispatch: jest.fn(),
    goBack: jest.fn(),
    dismiss: jest.fn(),
    navigate: jest.fn(),
    openDrawer: jest.fn(),
    closeDrawer: jest.fn(),
    toggleDrawer: jest.fn(),
    getParam: jest.fn(),
    setParams: jest.fn(),
    addListener: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    isFocused: jest.fn()
  }

const screenProps = {
    navigation: navigation,
    id: "HelpCenter"
  }

const feature = loadFeature('./__tests__/features/HelpCenter-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to HelpCenter', ({ given, when, then }) => {
        let helpCenter:ShallowWrapper;
        let instance:HelpCenter; 

        given('I am a User loading HelpCenter', () => {
            helpCenter = shallow(<HelpCenter {...screenProps}/>)
        });

        when('I navigate to the HelpCenter', () => {
             instance = helpCenter.instance() as HelpCenter
        });

        then('HelpCenter will load with out errors', () => {
          
              const restAPISucessMessage = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              restAPISucessMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                restAPISucessMessage
              );
              restAPISucessMessage.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {"data":[{"id":"1","type":"help_center","attributes":{"help_center_type":"Terms & Conditions","title":"","description":"<meta name='viewport' content='width=device-width, initial-scale=1'><p>Terms &amp; Conditions</p>"}},{"id":"2","type":"help_center","attributes":{"help_center_type":"Privacy Policy","title":"","description":"<meta name='viewport' content='width=device-width, initial-scale=1'><p>Privacy Policy</p>"}},{"id":"6","type":"help_center","attributes":{"help_center_type":"About Us","title":"","description":"<meta name='viewport' content='width=device-width, initial-scale=1'><p>Build that idea</p><p>Turn any idea into tailor-made software, without writing any code or speaking to a developer or agency. Get guaranteed costs and decide your timeline, up front.</p><p><br></p><p><a href=\"https://www.builder.ai/builder-studio\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 0); background-color: transparent;\">More about Builder Studio</a></p><p><img src=\"https://assets-global.website-files.com/5d779dddc494dd2921fdd1b2/5f0dbe14c01e2e0bc4bfd28d_Line.svg\"></p><p><img src=\"https://assets-global.website-files.com/5d779dddc494dd2921fdd1b2/604f5714b2f79b0b0a44b1a6_Builder-Care.png\" width=\"192\"></p><p>Keep it fresh</p><p>Software has the horrible habit of going out of date (like milk). Sleep peacefully at night knowing that we’ll be making sure you get upgrades before anything breaks.</p><p><br></p><p><a href=\"https://www.builder.ai/builder-care\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 0); background-color: transparent;\">More about Builder Care</a></p><p><img src=\"https://assets-global.website-files.com/5d779dddc494dd2921fdd1b2/5f0dbe14c01e2e0bc4bfd28d_Line.svg\"></p><p><img src=\"https://assets-global.website-files.com/5d779dddc494dd2921fdd1b2/602bd8c1c406c817e38068ee_Builder%20Cloud.png\" width=\"192\"></p><p>Scale like a boss</p><p>Combine all the best cloud providers into one platform, without any of the risks of overspending. You get exactly the right capacity – at the best possible price.</p>"}},{"id":"7","type":"help_center","attributes":{"help_center_type":"Testing","title":"","description":"<meta name='viewport' content='width=device-width, initial-scale=1'><p>Just a demo page</p>"}}]}
              );
        
              restAPISucessMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                restAPISucessMessage.messageId
              );

            
              runEngine.sendMessage("Unit Test", restAPISucessMessage);

              const restAPISucessWiithErrorMessage = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              restAPISucessWiithErrorMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                restAPISucessWiithErrorMessage
              );
              restAPISucessWiithErrorMessage.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                  error: "Hi",
                }
              );
        
              restAPISucessWiithErrorMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                restAPISucessWiithErrorMessage.messageId
              );
              
              runEngine.sendMessage("Unit Test", restAPISucessWiithErrorMessage);

              const restAPISErrorMessage = new Message(
                getName(MessageEnum.RestAPIResponceErrorMessage)
              );
              restAPISErrorMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                restAPISErrorMessage
              );
           
              restAPISErrorMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                restAPISErrorMessage.messageId
              );
              
              runEngine.sendMessage("Unit Test", restAPISErrorMessage);

            expect(helpCenter).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(helpCenter).toBeTruthy()
        });
    });

    test('User navigates to HelpCenterData', ({ given, when, then }) => {
        let helpCenterData:ShallowWrapper;
        let instance:HelpCenterData; 

        given('I am a User loading HelpCenterData', () => {
            helpCenterData = shallow(<HelpCenterData {...screenProps}/>)
        });

        when('I navigate to the HelpCenterData', () => {
             instance = helpCenterData.instance() as HelpCenterData
        });

        then('HelpCenterData will load with out errors', () => {

            const restAPIFaqSucessMessage = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              restAPIFaqSucessMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                restAPIFaqSucessMessage
              );
              restAPIFaqSucessMessage.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "success":true,"message":" ","data":{"faqs":[{"id":1,"title":"FAQs","content":"<meta name='viewport' content='width=device-width, initial-scale=1'><p>Test</p>","created_at":"2021-05-28T06:39:13.234Z","updated_at":"2021-05-28T06:39:13.234Z"},{"id":4,"title":"test","content":"<meta name='viewport' content='width=device-width, initial-scale=1'><p>testing</p>","created_at":"2021-06-23T15:13:26.640Z","updated_at":"2021-06-23T15:14:17.878Z"}]},"meta":[],"errors":[]
                }
              );
        
              restAPIFaqSucessMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                restAPIFaqSucessMessage.messageId
              );

              instance.getFaqApiCallId = restAPIFaqSucessMessage.messageId;
              runEngine.sendMessage("Unit Test", restAPIFaqSucessMessage);

              const restAPISucessWiithErrorMessage = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              restAPISucessWiithErrorMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                restAPISucessWiithErrorMessage
              );
              restAPISucessWiithErrorMessage.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                  error: "Hi",
                }
              );
        
              restAPISucessWiithErrorMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                restAPISucessWiithErrorMessage.messageId
              );
              
              runEngine.sendMessage("Unit Test", restAPISucessWiithErrorMessage);

              const restAPISErrorMessage = new Message(
                getName(MessageEnum.RestAPIResponceErrorMessage)
              );
              restAPISErrorMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                restAPISErrorMessage
              );
           
              restAPISErrorMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                restAPISErrorMessage.messageId
              );
              
              runEngine.sendMessage("Unit Test", restAPISErrorMessage);

            expect(helpCenterData).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(helpCenterData).toBeTruthy()
        });
    });


    test('User navigates to HelpCenter and press backbutton', ({ given, when, then }) => {
        let helpCenter:ShallowWrapper;
        let instance:HelpCenter; 
        given('I am a User loading HelpCenter', () => {
            helpCenter = shallow(<HelpCenter {...screenProps}/>)
        });

        when('I navigate to the HelpCenter and press backbutton', () => {
            instance = helpCenter.instance() as HelpCenter
            instance.handleBackButtonClick();
        });

        then('The App will go back a screen', () => {
            expect(helpCenter).toBeTruthy()
        });

    });


});
