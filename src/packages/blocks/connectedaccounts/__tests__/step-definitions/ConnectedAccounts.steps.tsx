/// <reference types="@types/jest" />

import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ConnectedAccounts from "../../src/ConnectedAccounts"
import StorageProvider from "../../../../framework/src/StorageProvider";
const getConnectedAccountsResponse = require('./getConnectedAccountsResponse.json')

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
  push: jest.fn(),
  replace: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  isFocused: jest.fn(),
  addListener:(param:string,callback:any)=>{
    callback()
  },
}

const screenProps = {
  navigation,
  id: "ConnectedAccounts"
}

const feature = loadFeature('./__tests__/features/ConnectedAccounts-scenario.feature');

defineFeature(feature, (test) => {

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'android' } }))
    

    //@ts-ignore
    StorageProvider = {get: jest.fn()}

    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to ConnectedAccounts', ({ given, when, then, and }) => {
    let connectedAccountsWrapper: ShallowWrapper;
    let instance: ConnectedAccounts;

    given('I am a User loading ConnectedAccounts', () => {
      connectedAccountsWrapper = shallow(<ConnectedAccounts {...screenProps} />)
    });

    when('I navigate to the ConnectedAccounts', () => {
      instance = connectedAccountsWrapper.instance() as ConnectedAccounts
      instance.setupGoogleConfiguration = jest.fn()
      instance.componentDidMount()
    });

    then('ConnectedAccounts will load with out errors', async () => {
      instance.setState({ userDetails: { full_name: "Test User" } })
      instance.renderConnectedAccounts()
      instance.renderFacebookConnectAccountView()
      instance.renderFacebookConnectedAccountView(
        getConnectedAccountsResponse.data.social_accounts.data[0].attributes
      )
      instance.renderGoogleConnectAccountView()
      instance.renderGoogleConnectedAccountView(
        getConnectedAccountsResponse.data.social_accounts.data[1].attributes
      )
      await instance.apiCall({ contentType: "", method: "", endPoint: "", body: "" })

      const msgError = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgError.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgError.messageId
      );
      msgError.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: ["ERROR"]
      });

      instance.getConnectedSocialMediaDataApiCallId = msgError.messageId;
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
        getConnectedAccountsResponse
      );

      instance.getConnectedSocialMediaDataApiCallId = msgDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgDataAPI);

      instance.addSocialMediaAccountDetailsSuccessCallBack();
      instance.getSocialMediaAccountDetailsFailureCallBack("Error");
      instance.initUser("TOKEN");

      let buttonHideModalComponent = connectedAccountsWrapper.findWhere((node) => node.prop('testID') === 'btnHideDisconnectModal');
      buttonHideModalComponent.simulate('press');
      
      instance.renderSocialConnectView(0)
      let buttonCancelModalComponent = connectedAccountsWrapper.findWhere((node) => node.prop('testID') === 'btnCancelDisconnectModal');
      buttonCancelModalComponent.simulate('press');

      let buttonRemoveSocialMediaAccountDetails = connectedAccountsWrapper.findWhere((node) => node.prop('testID') === 'btnRemoveSocialMediaAccountDetails');
      buttonRemoveSocialMediaAccountDetails.simulate('press');

    });

    and('I can connect a social account', () => {
      instance.setState({ socialAccountList: getConnectedAccountsResponse.data.social_accounts.data })
      instance.renderSocialConnectView(0)
      instance.renderSocialConnectView(1)
      const msgDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgDataAPI.messageId
      );
      msgDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        getConnectedAccountsResponse
      );

      instance.addSocialMediaAccountApiCallId = msgDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgDataAPI);

      const msgError = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgError.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgError.messageId
      );
      msgError.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: ["ERROR"]
      });
      msgError.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
        errors: ["ERROR"]
      });
      
      instance.addSocialMediaAccountApiCallId = msgError.messageId;
      runEngine.sendMessage("Unit Test", msgError);

      const msgError1 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgError1.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgError1.messageId
      );
      
      msgError1.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
        errors: ["ERROR"]
      });
      
      instance.addSocialMediaAccountApiCallId = msgError1.messageId;
      runEngine.sendMessage("Unit Test", msgError1);
    });

    and('I can deactivate a social account', () => {
      const msgDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgDataAPI.messageId
      );
      msgDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        getConnectedAccountsResponse
      );

      instance.removeSocialMediaAccountApiCallId = msgDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgDataAPI);

      const msgError = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgError.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgError.messageId
      );
      msgError.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: ["ERROR"]
      });

      instance.removeSocialMediaAccountApiCallId = msgError.messageId;
      runEngine.sendMessage("Unit Test", msgError);

      instance._signOut()
    });

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(connectedAccountsWrapper).toBeTruthy()
    });
  });

  test('User navigates to ConnectedAccounts and press backbutton', ({ given, when, then }) => {
    let connectedAccountsWrapper: ShallowWrapper;
    let instance: ConnectedAccounts;

    given('I am a User loading ConnectedAccounts', () => {
      connectedAccountsWrapper = shallow(<ConnectedAccounts {...screenProps} />)
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
