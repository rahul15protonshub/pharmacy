import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"
import TopHeader from "../../../studio-store-ecommerce-components/src/TopHeader/TopHeader"
import GreenButton from "../../../studio-store-ecommerce-components/src/GreenButton/GreenButton"
import CustomErrorModal from "../../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal"
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import WishList from "../../src/WishList"
import { FlatList, ScrollView,Linking, } from "react-native";
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
      navigate:jest.fn(),
      goBack:jest.fn()
    },
    id: "Wishlist"
  }

  const wishdata={data:{
    id:"303",
    type: "wishlist",
    attributes:{wishlist_count  :  1,
      wishlist_items:[{data:{
        id: "861",
        type: "wishlist_item",
        attributes:{
          id: {data:{attributes:{
            actual_price_including_tax: 120,
            price : 120,
            price_including_tax : "100.0",
            sale_price  :   "100.0",
            weight: "12",
            weight_unit: "gm",
            wishlisted:true,
            catalogue_variants:[{id: "13",  type : "catalogue_variant",
            attributes:{
              catalogue_id   :  92,
              created_at  : "2022-09-15T12:29:21.536Z",
              discount_price  :  "6.25",
               id : 13
            }}],
            default_variant:{
              block_qty:8,
              breadth: null,
              catalogue_id: 92,
              created_at: "2022-09-15T12:29:21.536Z",
              current_availability: "in_stock",
              discount_price: "6.25",
              height: null,
              id: 13,
              is_default: true,
              length: null,
              on_sale: true,
              price: "400.0",
              price_including_tax: "375.0",
              remaining_stock: null,
              sale_price: "375.0",
              sold: null,
              stock_qty: 150,
              tax_amount: "18.75",
              tax_id: 2,
              updated_at: "2022-09-30T12:09:55.289Z",
              variant_property_id: null
            }
          }}},

        }
      }}]

  }
}}

const feature = loadFeature('./__tests__/features/Wishlist-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Wishlist', ({ given, when, then }) => {
        let wishlistWrapper:ShallowWrapper;
        let instance:WishList; 

        given('I am a User loading Wishlist', () => {
            wishlistWrapper = shallow(<WishList {...screenProps}/>)
        });

        when('I navigate to the Wishlist', () => {
             instance = wishlistWrapper.instance() as WishList
             instance.setState({ token: "" });
             instance.getListRequest();
             instance.getCartHasProduct();
             instance.getCartList();
             instance.onHeartPress(0);
             instance.addToCart(0);

             const msgErrorMessageRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
             msgErrorMessageRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
             {
                 "errors": [
                     {
                         "Error": "Error"
                     }
                 ]
             });
             runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);

             const msgSuccessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
             msgSuccessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
             {
                 "data": {
                    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
             });
             
             runEngine.sendMessage("Unit Test", msgSuccessRestAPI);

             const msgErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
             msgErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceErrorMessage), 
             {
                "errors": [
                    {
                        "Error": "Error"
                    }
                ]
            });
             runEngine.sendMessage("Unit Test", msgErrorRestAPI);

        });

        then("wishlist render nodata without error",()=>{
          wishlistWrapper.find(TopHeader).first().prop('onPressLeft')()
          wishlistWrapper.find(CustomErrorModal).first().prop('hideErrorModal')()
          
          instance.setState({noProductFound:true})
          wishlistWrapper.find(GreenButton).first().prop('onPress')()
        })

        then("wishlist getWishlistApiCallId without error", () => {
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
                data: wishdata.data,
                message:'success'
              }
            );
            instance.getWishlistApiCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
            instance.setState({noProductFound:false,
              productList:wishdata.data
            })
            const flatList = wishlistWrapper.find(FlatList).first();
            flatList.prop("renderItem")({item: wishdata.data.attributes.wishlist_items[0], index: 0, separators: {highlight: jest.fn(), unhighlight: jest.fn(), updateProps: jest.fn()}});
      

          });
          then("wishlist removeFromWishlistApiCallId without error", () => {
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
            instance.removeFromWishlistApiCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("wishlist addToCartApiCallId without error", () => {
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
            instance.addToCartApiCallId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
         
          then("wishlist getCartListId without error", () => {
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
            instance.getCartListId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });
          then("wishlist getCartProductId without error", () => {
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
            instance.getCartProductId = msgLoadDataAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLoadDataAPI);
          });

        then('Wishlist will load with out errors', () => {
            expect(wishlistWrapper).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(wishlistWrapper).toBeTruthy()
        });
    });


});
