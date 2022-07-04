import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { Scheduling } from "../../src/Scheduling.web"
const navigation = require("react-navigation")

const screenProps: any = {
    // Customizable Area Start
    navigation: navigation,
    id: 'Scheduling',
    productDetails: '',
    isSubscribeClicked: true,
    productSlaeprice: '',
    productOnSale: '',
    ProductPrice: '',
    isSubscribed: false,
    //functions list
    toggleSubscribe: () => { },
    addToCartWithSubscription: () => { }
}

const feature = loadFeature('./__tests__/features/Scheduling-scenario.web.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Scheduling', ({ given, when, then }) => {
        let schedulingWrapper: ShallowWrapper;
        let schedulingInstance: Scheduling;

        given('I am a User loading Scheduling', () => {
            schedulingWrapper = shallow(<Scheduling {...screenProps} />)
        });

        when('I navigate to the Scheduling', () => {
            schedulingInstance = schedulingWrapper.instance() as Scheduling
        });

        then('Scheduling will load with out errors', () => {
            expect(schedulingWrapper).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            schedulingInstance.componentWillUnmount()
            expect(schedulingWrapper).toBeTruthy()
        });
    });


});
