import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import ConnectedAccounts from "../../src/ConnectedAccounts"
import { inputCSS } from "react-select/src/components/Input"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "ConnectedAccounts"
  }

const feature = loadFeature('./__tests__/features/ConnectedAccounts-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to ConnectedAccounts', ({ given, when, then }) => {
        let connectedAccountsWrapper:ShallowWrapper;
        let instance:ConnectedAccounts; 

        given('I am a User loading ConnectedAccounts', () => {
            connectedAccountsWrapper = shallow(<ConnectedAccounts {...screenProps}/>)
        });

        when('I navigate to the ConnectedAccounts', () => {
             instance = connectedAccountsWrapper.instance() as ConnectedAccounts
        });

        then('ConnectedAccounts will load with out errors', () => {
            expect(connectedAccountsWrapper).toBeTruthy()

            const msgError = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              msgError.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgError.messageId
              );
              msgError.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
                errors: ["ERROR"]
              });

              instance.removeSocialMediaAccountApiCallId = msgError.messageId;
              runEngine.sendMessage("Unit Test", msgError);

              const msgDataAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              msgDataAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgDataAPI.messageId
              );
              msgDataAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                  data: [{}],
                }
              );
              
              
              instance.removeSocialMediaAccountApiCallId = msgDataAPI.messageId;
              runEngine.sendMessage("Unit Test", msgDataAPI);


              instance.addSocialMediaAccountDetailsSuccessCallBack();
              instance.getSocialMediaAccountDetailsFailureCallBack("Error");
              instance.initUser("TOKEN");
              
              let buttonHideModalComponent = connectedAccountsWrapper.findWhere((node) => node.prop('testID') === 'btnHideDisconnectModal');
              buttonHideModalComponent.simulate('press');

              let buttonCancelModalComponent = connectedAccountsWrapper.findWhere((node) => node.prop('testID') === 'btnCancelDisconnectModal');
              buttonCancelModalComponent.simulate('press');

              let buttonRemoveSocialMediaAccountDetails = connectedAccountsWrapper.findWhere((node) => node.prop('testID') === 'btnRemoveSocialMediaAccountDetails');
              buttonRemoveSocialMediaAccountDetails.simulate('press');   

        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(connectedAccountsWrapper).toBeTruthy()
        });
    });

    test('User navigates to ConnectedAccounts and press backbutton', ({ given, when, then }) => {
        let connectedAccountsWrapper:ShallowWrapper;
        let instance:ConnectedAccounts; 

        given('I am a User loading ConnectedAccounts', () => {
            connectedAccountsWrapper = shallow(<ConnectedAccounts {...screenProps}/>)
        });

        when('I navigate to the ConnectedAccounts and press backbutton', () => {
             instance = connectedAccountsWrapper.instance() as ConnectedAccounts
             instance.handleBackButtonClick();
        });

        then('The App will go back in navigation', () => {
            expect(connectedAccountsWrapper).toBeTruthy()
        });

    });

});
