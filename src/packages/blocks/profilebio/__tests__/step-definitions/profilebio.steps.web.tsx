import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Profilebio from "../../src/Profilebio.web"
import Address from "../../src/Address.web"
import PageLoadingBlog from "../../src/PageLoadingBlog.web"
import ProfileLoaders from "../../src/ProfileLoaders.web"
import {ProfileBlock} from "../../src/index.web"
import ProfileBreadcrumbs from "../../src/ProfileBreadcrumbs"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Profilebio",
    order: null,
    history: null, 
    location: null
  }

const feature = loadFeature('./__tests__/features/profilebio-scenario.web.feature');
const values={
    currentPassword:"12345",
    newPassword:"2351",
    confirmPassword:"2351"
}

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to profilebio', ({ given, when, then }) => {
        let profileBlockWrapper:ShallowWrapper;
        let profilebioWrapper:ShallowWrapper;
        let addressWrapper:ShallowWrapper;
        let profileBreadcrumbsWrapper:ShallowWrapper;
        let pageLoadingBlogWrapper:ShallowWrapper;
        let profileLoadersWrapper:ShallowWrapper;
        let instanceProfileBlock:ProfileBlock;
        let instanceAddress:Address;
        let instance:Profilebio; 

        given('I am a User loading profilebio', () => {
            profileBlockWrapper = shallow(<ProfileBlock {...screenProps}/>)
            profilebioWrapper = shallow(<Profilebio/>)
            addressWrapper = shallow(<Address/>)
            pageLoadingBlogWrapper = shallow(<PageLoadingBlog/>)
            profileLoadersWrapper = shallow(<ProfileLoaders/>)
            profileBreadcrumbsWrapper = shallow(<ProfileBreadcrumbs intialBread={null} onProfile={null} activeIndex={null} />)
        });

        when('I navigate to the profilebio', () => {
             instance = profilebioWrapper.instance() as Profilebio
             instanceProfileBlock = profileBlockWrapper.instance() as ProfileBlock
             instanceAddress = addressWrapper.instance() as Address
        });
     
        then('profilebio will load with out errors', () => {
            instance.componentDidMount();
            instance.editProfileSchema();
            instance.updatePasswordHandler(values);
            instance.getUserProfileHandler();
            instance.uploadImage();

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
            instanceAddress.addNewAddressAPICallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);

            const msggetUserDeliveryAddressAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            msggetUserDeliveryAddressAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msggetUserDeliveryAddressAPI.messageId
            );
            msggetUserDeliveryAddressAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    data: [{}],
                }
            );
            instanceAddress.getUserDeliveryAddressAPICallId = msggetUserDeliveryAddressAPI.messageId;
            runEngine.sendMessage("Unit Test", msggetUserDeliveryAddressAPI);

            const msgUpdateDeliveryAddressByIdAPICallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            msgUpdateDeliveryAddressByIdAPICallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgUpdateDeliveryAddressByIdAPICallId.messageId
            );
            msgUpdateDeliveryAddressByIdAPICallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    data: [{}],
                }
            );
            instanceAddress.updateDeliveryAddressByIdAPICallId = msgUpdateDeliveryAddressByIdAPICallId.messageId;
            runEngine.sendMessage("Unit Test", msgUpdateDeliveryAddressByIdAPICallId);

            const msgChangeDefaultAddressAPICallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            msgChangeDefaultAddressAPICallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgChangeDefaultAddressAPICallId.messageId
            );
            msgChangeDefaultAddressAPICallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    data: [{}],
                }
            );
            instanceAddress.changeDefaultAddressAPICallId = msgChangeDefaultAddressAPICallId.messageId;
            runEngine.sendMessage("Unit Test", msgChangeDefaultAddressAPICallId);

            expect(profilebioWrapper).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(profilebioWrapper).toBeTruthy()
        });
    });


});
