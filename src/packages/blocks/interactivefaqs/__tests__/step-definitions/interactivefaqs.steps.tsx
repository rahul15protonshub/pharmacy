import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"
export const configJSON = require("../../config.json");
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Interactivefaqs from "../../src/Interactivefaqs"
import { FlatList } from "react-native";
import CustomErrorModal from "../../../../blocks/studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate:jest.fn(),
        addListener:(param:string,callback:any)=>{
        callback()
        }
    },
    id: "Interactivefaqs"
  }

  const faqdata=  {
    "faqs": [
        {
            "id": 10,
            "title": "FAQ 4",
            "content": "<html><head>This is a head</head><body>Hello. I am a body</body></html>",
            "created_at": "2020-10-13T09:37:02.001Z",
            "updated_at": "2020-10-13T09:37:02.001Z"
        }
    ]
}
const feature = loadFeature('./__tests__/features/interactivefaqs-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to interactivefaqs', ({ given, when, then }) => {
        let interactiveFaqsWrapper:ShallowWrapper;
        let instance:Interactivefaqs; 

        given('I am a User loading interactivefaqs', () => {
            interactiveFaqsWrapper = shallow(<Interactivefaqs {...screenProps}/>)
            expect(interactiveFaqsWrapper).toBeTruthy()   

            instance = interactiveFaqsWrapper.instance()as Interactivefaqs;

            instance.apiCall({
                contentType: "",
                method: "GET",
                endPoint: "TEST"
            });

            const getFaqAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getFaqAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), getFaqAPI.messageId);
            getFaqAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
            {
                "data": {
                    "faqs": [
                        {
                            "id": 10,
                            "title": "FAQ 4",
                            "content": "<html><head>This is a head</head><body>Hello. I am a body</body></html>",
                            "created_at": "2020-10-13T09:37:02.001Z",
                            "updated_at": "2020-10-13T09:37:02.001Z"
                        }
                    ]
                }
            });
            instance.getFAQDataApiCallId = getFaqAPI.messageId;
            runEngine.sendMessage("Unit Test", getFaqAPI);

            const getFaqAPIFail = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getFaqAPIFail.addData(getName(MessageEnum.RestAPIResponceDataMessage), getFaqAPI.messageId);
            getFaqAPIFail.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
            {
                "errors":  ["Error"]
            });
            instance.getFAQDataApiCallId = getFaqAPIFail.messageId;
            runEngine.sendMessage("Unit Test", getFaqAPIFail)
            

            const flatList = interactiveFaqsWrapper.find(FlatList).first();
            flatList.prop("renderItem")({item: faqdata.faqs[0], index: 0, separators: {highlight: jest.fn(), unhighlight: jest.fn(), updateProps: jest.fn()}});
           
            const getFaqAPIerr = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getFaqAPIerr.addData(getName(MessageEnum.RestAPIResponceDataMessage), getFaqAPIerr.messageId);
            getFaqAPIerr.addData(getName(MessageEnum.RestAPIResponceErrorMessage), 
            {
                errors:'error'
            });
            instance.getFAQDataApiCallId = getFaqAPIerr.messageId;
            runEngine.sendMessage("Unit Test", getFaqAPIerr);

            

        });

        when('I navigate to the interactivefaqs', () => {
             instance = interactiveFaqsWrapper.instance() as Interactivefaqs

             const customerror = interactiveFaqsWrapper.find(CustomErrorModal).first();
             customerror.prop("hideErrorModal")()
             expect(customerror).toBeTruthy();

        });

        then('interactivefaqs will load with out errors', () => {
            expect(interactiveFaqsWrapper).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.handleBackButtonClick
            instance.componentWillUnmount()
            expect(interactiveFaqsWrapper).toBeTruthy()
        });
    });

});
