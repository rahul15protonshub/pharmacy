import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Profilebio from "../../src/Profilebio"
import EditProfile from "../../src/EditProfile"
import ChangePassword from "../../src/ChangePassword"

const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Profilebio"
  }

const feature = loadFeature('./__tests__/features/profilebio-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to profilebio', ({ given, when, then }) => {
        let profilebioWrapper:ShallowWrapper;
        let editProfileWrapper:ShallowWrapper;
        let changePasswordWrapper:ShallowWrapper;
        let instance:Profilebio; 
        let instanceEditProfile:EditProfile;

        given('I am a User loading profilebio', () => {
            profilebioWrapper = shallow(<Profilebio {...screenProps}/>)
            editProfileWrapper = shallow(<EditProfile {...screenProps}/>)
            changePasswordWrapper = shallow(<ChangePassword {...screenProps}/>)
        });

        when('I navigate to the profilebio', () => {
             instance = profilebioWrapper.instance() as Profilebio
             instanceEditProfile = editProfileWrapper.instance() as EditProfile

             let buttonComponent = editProfileWrapper.findWhere((node) => node.prop('testID') === 'btnSaveProfile');
             buttonComponent.simulate('press')

             buttonComponent = editProfileWrapper.findWhere((node) => node.prop('testID') === 'btnOnPressCameraUploadImage');
             buttonComponent.simulate('press')

             let textInputComponent = changePasswordWrapper.findWhere((node) => node.prop('testID') === 'txtPasswordInput');
             textInputComponent.simulate('changeText', 'pAssword!23');

             textInputComponent = changePasswordWrapper.findWhere((node) => node.prop('testID') === 'txtNewPassword');
             textInputComponent.simulate('changeText', 'pAssword!23');

             textInputComponent = changePasswordWrapper.findWhere((node) => node.prop('testID') === 'txtConfirmNewPassword');
             textInputComponent.simulate('changeText', 'pAssword!23');

             
             buttonComponent = changePasswordWrapper.findWhere((node) => node.prop('testID') === 'btnChangePassword');
             buttonComponent.simulate('press')
             
        });

        then('profilebio will load with out errors', () => {
            expect(profilebioWrapper).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(profilebioWrapper).toBeTruthy()
        });
    });


});
