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
import StorageProvider from "../../../../framework/src/StorageProvider";
import TopHeader from "../../../../blocks/studio-store-ecommerce-components/src/TopHeader/TopHeader";
import CustomErrorModal from "../../../../blocks/studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
      replace:jest.fn(),
      goBack:jest.fn(),
      navigate:jest.fn(),
      addListener:(params:string,callback:any)=>{
        callback()
      }
    },
    id: "Profilebio"
  }

  const product_details ={data:
    { id :   "96",
      type  :   "catalogue",
      attributes:{
        name: 'ABC 38',
        description: '',
        manufacture_date: null,
        block_qty: 0,
        price: 37.7,
        on_sale: false,
        sale_price: null,
        discount: null,
        recommended: true,
        sku: 'COD0000063',
        length: null,
        breadth: null,
        height: null,
        weight: '1.0',
        brand: [],
        tags: [],
        reviews: [],
        current_availibility: 'in_stock',
        default_variant: [],
        stock_qty: 76,
        cart_quantity: [{test:''}],
        wishlisted: false,
        product_notified: false,
        cart_items: {},
        average_rating: 0,
        images: [],
        product_attributes: [],
        availability: [],
        deep_link: '',
        catalogue_variants: [],
        variants_in_cart: [],
        can_review: false,
        similar_products: [],
        category: []
      }
    }
    }

const feature = loadFeature('./__tests__/features/profilebio-scenario.feature');
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

    test('User navigates to profilebio', ({ given, when, then }) => {
        let profilebioWrapper:ShallowWrapper;
        let changePasswordWrapper:ShallowWrapper;
        let instance:Profilebio; 
        let instanceChangePassword:ChangePassword;

        given('I am a User loading profilebio', () => {
            profilebioWrapper = shallow(<Profilebio {...screenProps}/>)
            changePasswordWrapper = shallow(<ChangePassword {...screenProps}/>)
        });

        when('I navigate to the profilebio', () => {
             instance = profilebioWrapper.instance() as Profilebio
             instanceChangePassword = changePasswordWrapper.instance() as ChangePassword
             instanceChangePassword.componentDidMount()
             instanceChangePassword.getToken()
             instance.getUserProfile()

             let textInputComponent = changePasswordWrapper.findWhere((node) => node.prop('testID') === 'txtPasswordInput');
             textInputComponent.simulate('focus')
             textInputComponent.simulate('changeText', 'pAssword!23');
             textInputComponent.simulate('blur')

             textInputComponent = changePasswordWrapper.findWhere((node) => node.prop('testID') === 'txtNewPassword');
             textInputComponent.simulate('focus')
             textInputComponent.simulate('changeText', 'pAssword!23');
             textInputComponent.simulate('blur')

             textInputComponent = changePasswordWrapper.findWhere((node) => node.prop('testID') === 'txtConfirmNewPassword');
             textInputComponent.simulate('focus')
             textInputComponent.simulate('changeText', 'pAssword!23');
             textInputComponent.simulate('blur')


        });
        
        then("Changepassword changePasswordApiCallId api without errors", () => {
          const topHeader = changePasswordWrapper.find(TopHeader).first();
          topHeader.prop("onPressLeft")
          expect(topHeader).toBeTruthy();
          const customerror = changePasswordWrapper.find(CustomErrorModal).first();
          customerror.prop("hideErrorModal")()
          expect(customerror).toBeTruthy();

          const topHeaderbio = profilebioWrapper.find(TopHeader).first();
          topHeaderbio.prop("onPressLeft")
          expect(topHeaderbio).toBeTruthy();
          const bio = profilebioWrapper.find(CustomErrorModal).first();
          bio.prop("hideErrorModal")()
          expect(bio).toBeTruthy();

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
              message:'success'
            }
          );
          instanceChangePassword.changePasswordApiCallId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          instanceChangePassword.changePassword()
        });
        then("Changepassword changePasswordApiCallId api with errors", () => {
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
              errors:[{}]
            }
          );
          msgLoadDataAPI.addData(
            getName(MessageEnum.RestAPIResponceErrorMessage),
            {
              errors:[{}]
            }
          );
          instanceChangePassword.changePasswordApiCallId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          instanceChangePassword.profileDataFailureCallBack('error')
          instanceChangePassword.profileDataFailureCallBack('')
        });

        then("Profile bio get userprofile api without errors", () => {
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
          instance.getUserProfileApiCallId = msgLoadDataAPI.messageId;
          instance.getUserProfileSuccessCallBack(product_details)
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
        then("Profile bio get userprofile api with errors", () => {
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
              errors:[{}]
            }
          );
          instance.getUserProfileApiCallId = msgLoadDataAPI.messageId;
          instance.getUserProfileFailureCallBack({error:'hello'});
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });


        then("Profile bio get cartHasProductAPICallID api without errors", () => {
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
          instance.cartHasProductAPICallID = msgLoadDataAPI.messageId;
          instance.getUserProfileSuccessCallBack(product_details)
          instance.refreshCart()
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });

        then("Profile bio get updateProfileApiCallId api without errors", () => {
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
          instance.updateProfileApiCallId = msgLoadDataAPI.messageId;
          instance.updateProfileDataSuccessCallBack(product_details)
          instance.updateProfileData()
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
         
        then("Profile bio get updateProfileNotificationDataSuccessCallBack api without errors", () => {
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
          instance.updateProfileNotificationApiCallId = msgLoadDataAPI.messageId;
          instance.updateProfileNotificationDataSuccessCallBack(product_details)
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });


        then("Profile bio get cartHasProductAPICallID api with errors", () => {
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
              errors: [{}],
            }
          );
          instance.cartHasProductAPICallID = msgLoadDataAPI.messageId;
          instance.getUserProfileSuccessCallBack(product_details)
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });

        then("Profile bio get updateProfileApiCallId api with errors", () => {
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
              errors: [{}],
            }
          );
          instance.updateProfileApiCallId = msgLoadDataAPI.messageId;
          instance.updateProfileDataFailureCallBack(product_details)
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
         
        then("Profile bio get updateProfileNotificationDataSuccessCallBack api with errors", () => {
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
              errors: [{}],
            }
          );
          instance.updateProfileNotificationApiCallId = msgLoadDataAPI.messageId;
          instance.updateProfileNotificationDataFailureCallBack(product_details)
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
        
        then('profilebio will load with out errors', () => {
          instance.setState({isFetching:false,showLogoutModal:true})
          let buttonComponent = profilebioWrapper.findWhere((node) => node.prop('testID') === 'modalpress');
          buttonComponent.simulate('press')

          buttonComponent = profilebioWrapper.findWhere((node) => node.prop('testID') === 'modalclosepress');
          buttonComponent.simulate('press')
          buttonComponent = profilebioWrapper.findWhere((node) => node.prop('testID') === 'modallogoutpress');
          buttonComponent.simulate('press')
                  
            expect(profilebioWrapper).toBeTruthy()
        });
        then('profilebio will load guest without errors', () => {
          instance.setState({isFetching:false,showLogoutModal:false,showGuestModal:true})
          let buttonComponent = profilebioWrapper.findWhere((node) => node.prop('testID') === 'modalguest');
          buttonComponent.simulate('press')

          buttonComponent = profilebioWrapper.findWhere((node) => node.prop('testID') === 'modalguestclose');
          buttonComponent.simulate('press')

          buttonComponent = profilebioWrapper.findWhere((node) => node.prop('testID') === 'modalguestlogin');
          buttonComponent.simulate('press')
         
          expect(profilebioWrapper).toBeTruthy()
        });
        then('I can leave the screen with out errors', () => {
          instance.handleBackButtonClick
            instance.componentWillUnmount()
            instanceChangePassword.componentWillUnmount()
            expect(profilebioWrapper).toBeTruthy()
            expect(changePasswordWrapper).toBeTruthy()

        });
    });

    test('User navigates to editprofiles', ({ given, when, then }) => {
        let editProfileWrapper:ShallowWrapper;
        let instanceEditProfile:EditProfile;
       

        given('I am a User loading editprofile', () => {
            editProfileWrapper = shallow(<EditProfile {...screenProps}/>)
        });

        when('I navigate to the editprofile', () => {
             instanceEditProfile = editProfileWrapper.instance() as EditProfile
             instanceEditProfile.componentDidMount()
             instanceEditProfile.getToken()
             instanceEditProfile.getUserProfile()
             let buttonComponent = editProfileWrapper.findWhere((node) => node.prop('testID') === 'btnSaveProfile');
             buttonComponent.simulate('press')
             buttonComponent = editProfileWrapper.findWhere((node) => node.prop('testID') === 'btnOnPressCameraUploadImage');
             buttonComponent.simulate('press')
        });

        then("Edit profile get userprofile api without errors", () => {
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
            instanceEditProfile.getUserProfileApiCallId = msgLoadDataAPI.messageId;
            instanceEditProfile.getUserProfileSuccessCallBack(product_details)
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("Edit profile get userprofile api with errors", () => {
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
                errors:[{}]
              }
            );
            msgLoadDataAPI.addData(
              getName(MessageEnum.RestAPIResponceErrorMessage),
              {
                errors:[{}]
              }
            );
            
            instanceEditProfile.getUserProfileApiCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
            
        then("Edit profile get updateProfileApiCallId api without errors", () => {
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
          instanceEditProfile.updateProfileApiCallId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
        then("Edit profile get updateProfileApiCallId api with errors", () => {
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
              errors:[{}]
            }
          );
          msgLoadDataAPI.addData(
            getName(MessageEnum.RestAPIResponceErrorMessage),
            {
              errors:[{}]
            }
          );
          
          instanceEditProfile.updateProfileApiCallId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
        then('editprofile will load with out errors', () => {
            // expect(profilebioWrapper).toBeTruthy()
        });


        then('I can leave the screen with out errors', () => {
            instanceEditProfile.componentWillUnmount()
            expect(editProfileWrapper).toBeTruthy()
        });
    });




});
