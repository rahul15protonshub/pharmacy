import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Search from "../../src/Search"
import StorageProvider from "../../../../framework/src/StorageProvider";
const screenProps = {
    navigation: {
      navigate:jest.fn(),
      addListener:(params:string,callback:any)=>{
        callback()
      }
    },
    id: "Search"
  }

const feature = loadFeature('./__tests__/features/search-scenario.feature');
jest.useFakeTimers()
jest.spyOn(global, 'setTimeout');
defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
         //@ts-ignore
        StorageProvider = {
          get: jest.fn(),
          set: jest.fn(),
        }
    });
    afterEach(()=>{
      jest.runAllTimers()
    })

    test('User navigates to search', ({ given, when, then }) => {
        let searchBlock:ShallowWrapper;
        let instance:Search; 

        given('I am a User loading search', () => {
            searchBlock = shallow(<Search {...screenProps}/>)
        });

        when('I navigate to the search', async() => {
             instance = searchBlock.instance() as Search
             instance.componentDidMount()
             instance.getSearchData()
             await instance.onSearchProduct()
             await instance.saveSearch('http')

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
              data: [{
              }],
               message:'success',
              search:true,
             
            });

            instance.recentSearchApiId = msgError.messageId;
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
              products:{data:[
                {attributes:{type:'Catalogue'}},
                {attributes:{type:'Category'}},
                {attributes:{type:'SubCategory'}},
              ]}
            }
          );
          instance.searchProductId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          const data={products:{data:[
            {attributes:{type:'Catalogue'}},
            {attributes:{type:'Category'}},
            {attributes:{type:'SubCategory'}},
          ]}}
          instance.onPressSearchData(data)
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

        then("Search apiRequestCallId without error", () => {
         
        });
        then("Search apiRequestCallId with error", () => {
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
              errors: [{
                       }],
             
            }
          );
          msgLoadDataAPI.addData(
            getName(MessageEnum.RestAPIResponceErrorMessage),
            {
              errors: [{
                       }],
             
            }
          );
          instance.recentSearchApiId = msgLoadDataAPI.messageId;
          instance.searchProductId = msgLoadDataAPI.messageId;
          instance.getCategoryListId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          instance.getCategoryListFailureCallBack('error')
          instance.getCategoryListFailureCallBack('')
        });
        
        then('I can leave the screen with out errors', () => {
          instance.handleBackButtonClick
            instance.componentWillUnmount()
            expect(searchBlock).toBeTruthy()
        });
    });


});
