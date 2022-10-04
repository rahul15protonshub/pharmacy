import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Scheduling from "../../src/Scheduling"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Scheduling",
    productData: {
        attributes: {
            on_sale: false,
            actual_price_including_tax: 0,
            price_including_tax: 0,
        }
    },
    selectedProduct: '',
    selectedImage: '',
    subscriptionQuantity: '',
    subscriptionPackageData: [],
    invalidSubscriptionPackage: '',
    subscriptionPeriodData: '',
    invalidSubscriptionPeriod: '',
    subscriptionTimeSlotData: '',
    invalidateSubscriptionTimeSlot: '',
    period: '',
    selectedSlotId: '',
    slots: '',
    setSubSlots: '',
    selectedTimeSlot: '',
    onChangeSubscriptionQuantity: () => {},
    onCloseSubscriptionModal: () => {},
    onSelectSubscriptionPackage: () => {},
    onPressSubscribeAddToCart: () => {},
    onPressBuyNowSubscription: () => {},
    onSelectSubscriptionTimeSlot: () => {},
    onSelectSubscriptionPeriod: () => {},
  }

const feature = loadFeature('./__tests__/features/Scheduling-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Scheduling', ({ given, when, then }) => {
        let schedulingWrapper:ShallowWrapper;
        let schedulingInstance:Scheduling; 

        given('I am a User loading Scheduling', () => {
            schedulingWrapper = shallow(<Scheduling {...screenProps}/>)
        });

        when('I navigate to the Scheduling', () => {
            schedulingInstance = schedulingWrapper.instance() as Scheduling
            schedulingInstance.renderSubscriptionModal()
        });

        then('Scheduling will load with out errors', () => {
            
            let formComponent = schedulingWrapper.findWhere((node) => node.prop("testID") === "changequantity");
              formComponent.simulate("press");

              formComponent = schedulingWrapper.findWhere((node) => node.prop("testID") === "changequantitydes");
              formComponent.simulate("press");
            expect(schedulingWrapper).toBeTruthy()
        });

        then('I can select the add to cart button with out errors', () => {
            let buttonComponent = schedulingWrapper.findWhere((node) => node.prop('testID') === 'cartButtonID');
            buttonComponent.simulate('press')
        });
        
        then('I can select the buy now button with out errors', () => {
            let buttonComponent = schedulingWrapper.findWhere((node) => node.prop('testID') === 'buyNowButtonID');
            buttonComponent.simulate('press')
        });

        then('I can leave the screen with out errors', () => {
            schedulingInstance.componentWillUnmount()
            expect(schedulingWrapper).toBeTruthy()
        });
    });


});
