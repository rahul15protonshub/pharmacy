import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Search from "../../src/Search"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Search"
  }

const feature = loadFeature('./__tests__/features/search-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to search', ({ given, when, then }) => {
        let searchBlock:ShallowWrapper;
        let instance:Search; 

        given('I am a User loading search', () => {
            searchBlock = shallow(<Search {...screenProps}/>)
        });

        when('I navigate to the search', () => {
             instance = searchBlock.instance() as Search
             instance.componentDidMount()
             instance.getSearchData()
        });

        then('search will load with out errors', () => {
            expect(searchBlock).toBeTruthy()

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

            runEngine.sendMessage("Unit Test", msgDataAPI);

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

            instance.recentSearchApiId = msgError.messageId;
            instance.searchProductId = msgError.messageId;
            instance.getCategoryListId = msgError.messageId;
            runEngine.sendMessage("Unit Test", msgError);

        });

        then("Search searchProductId without error", () => {
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
              data: [{
                
              }],
            }
          );
          instance.searchProductId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });

        then("Search recentSearchApiId without error", () => {
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
              data: [{
                
              }],
            }
          );
          instance.recentSearchApiId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
        then("Search getCategoryListId without error", () => {
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
              data: [{
                
              }],
            }
          );
          instance.getCategoryListId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
        then("Search saveSearchId without error", () => {
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
              data: [{
                
              }],
            }
          );
          instance.saveSearchId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
        
        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(searchBlock).toBeTruthy()
        });
    });


});
