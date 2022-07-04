import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import { ProductDetails } from "../../src/ProductDetails.web"
import { HomeDashboard } from "../../src/Dashboard.web";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";

const navigation = require("react-navigation");
const screenProps = {
  navigation: navigation,
  id: "Dashboard"
};
const feature = loadFeature("./__tests__/features/dashboard-scenario.web.feature");

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to dashboard", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: HomeDashboard;
    given("I am a User loading dashboard", () => {
      dashboardWrapper = shallow(<HomeDashboard {...screenProps} />);
      expect(dashboardWrapper).toBeTruthy();

    });

    when("I navigate to the dashboard", () => {
      instance = dashboardWrapper.instance() as HomeDashboard;
      expect(dashboardWrapper).toBeTruthy();

    });

    then("dashboard will load with out errors", () => {

      let bannerData = {
        "data": {
          "banners": {
            "data": [
              {
                "id": "4",
                "type": "banner",
                "attributes": {
                  "id": 4,
                  "banner_position": 1,
                  "created_at": "2021-06-16T10:11:18.723Z",
                  "updated_at": "2021-06-16T10:11:18.723Z",
                  "images": {
                    "data": [
                      {
                        "id": "46",
                        "type": "attachment",
                        "attributes": {
                          "attachable_type": "BxBlockBanner::Banner",
                          "attachable_id": 4,
                          "position": null,
                          "is_default": null,
                          "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdW9CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--24da865f33d772c00efe4f455c027bc442abc8e5/Banner%20image%201.jpg",
                          "url_link": "https://freemium87482-350702-react-native.b350702.dev.eastus.az.svc.builder.ai/Filteroptions?page=1&per_page=15&sort[order_by]=created_at&sort[direction]=desc&q[category_id][]=2&q[sub_category_id][]=2",
                          "is_present?": false,
                          "url_id": null,
                          "url_type": null
                        }
                      },
                      {
                        "id": "225",
                        "type": "attachment",
                        "attributes": {
                          "attachable_type": "BxBlockBanner::Banner",
                          "attachable_id": 4,
                          "position": null,
                          "is_default": null,
                          "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdXNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--34bde8cfd622466c056108c32035777366c3ad7f/Banner%20image%202.jpg",
                          "url_link": "",
                          "is_present?": false,
                          "url_id": null,
                          "url_type": null
                        }
                      }
                    ]
                  }
                }
              },
              {
                "id": "5",
                "type": "banner",
                "attributes": {
                  "id": 5,
                  "banner_position": 2,
                  "created_at": "2021-06-16T10:11:32.837Z",
                  "updated_at": "2021-06-16T10:11:32.837Z",
                  "images": {
                    "data": [
                      {
                        "id": "47",
                        "type": "attachment",
                        "attributes": {
                          "attachable_type": "BxBlockBanner::Banner",
                          "attachable_id": 5,
                          "position": null,
                          "is_default": null,
                          "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdXdCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--388d70beac8085856f2628b2f68bff2a005a1eff/Banner%20image%202.jpg",
                          "url_link": null,
                          "is_present?": false,
                          "url_id": null,
                          "url_type": null
                        }
                      },
                      {
                        "id": "49",
                        "type": "attachment",
                        "attributes": {
                          "attachable_type": "BxBlockBanner::Banner",
                          "attachable_id": 5,
                          "position": null,
                          "is_default": null,
                          "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdTBCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0712aa267de8c99d34e4c39c2d1fc950619e9d53/Banner%20image%203.jpg",
                          "url_link": null,
                          "is_present?": false,
                          "url_id": null,
                          "url_type": null
                        }
                      },
                      {
                        "id": "50",
                        "type": "attachment",
                        "attributes": {
                          "attachable_type": "BxBlockBanner::Banner",
                          "attachable_id": 5,
                          "position": null,
                          "is_default": null,
                          "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdTRCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ee5cfef1e59637f1937e440e785e43b88896fb23/Banner%20image%204.jpg",
                          "url_link": null,
                          "is_present?": false,
                          "url_id": null,
                          "url_type": null
                        }
                      }
                    ]
                  }
                }
              },
              {
                "id": "6",
                "type": "banner",
                "attributes": {
                  "id": 6,
                  "banner_position": 3,
                  "created_at": "2021-06-16T10:11:42.927Z",
                  "updated_at": "2021-06-16T10:11:42.927Z",
                  "images": {
                    "data": [
                      {
                        "id": "48",
                        "type": "attachment",
                        "attributes": {
                          "attachable_type": "BxBlockBanner::Banner",
                          "attachable_id": 6,
                          "position": null,
                          "is_default": null,
                          "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdWNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--147b6a26eac74ba04b2b082729bdb4316db787c2/Banner%20image%206.jpg",
                          "url_link": null,
                          "is_present?": false,
                          "url_id": null,
                          "url_type": null
                        }
                      },
                      {
                        "id": "220",
                        "type": "attachment",
                        "attributes": {
                          "attachable_type": "BxBlockBanner::Banner",
                          "attachable_id": 6,
                          "position": null,
                          "is_default": null,
                          "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdWtCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a4dd1cb4214e283ca7c24cd587372c9f202ed96f/Banner%20image%208.jpg",
                          "url_link": null,
                          "is_present?": false,
                          "url_id": null,
                          "url_type": null
                        }
                      },
                      {
                        "id": "219",
                        "type": "attachment",
                        "attributes": {
                          "attachable_type": "BxBlockBanner::Banner",
                          "attachable_id": 6,
                          "position": null,
                          "is_default": null,
                          "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdWdCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--63d51cfdcc5335ca92ebd8bbfdd2cadbb6c47fa7/Banner%20image%207.jpg",
                          "url_link": null,
                          "is_present?": false,
                          "url_id": null,
                          "url_type": null
                        }
                      }
                    ]
                  }
                }
              },
              {
                "id": "10",
                "type": "banner",
                "attributes": {
                  "id": 10,
                  "banner_position": 4,
                  "created_at": "2021-06-22T14:57:44.575Z",
                  "updated_at": "2021-06-22T14:57:44.575Z",
                  "images": {
                    "data": [
                      {
                        "id": "235",
                        "type": "attachment",
                        "attributes": {
                          "attachable_type": "BxBlockBanner::Banner",
                          "attachable_id": 10,
                          "position": null,
                          "is_default": null,
                          "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZzBDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f611748c024c7b451bd8ac34389844c2eeacba94/Banner_image_10%5B1%5D.jpg",
                          "url_link": null,
                          "is_present?": false,
                          "url_id": null,
                          "url_type": null
                        }
                      },
                      {
                        "id": "236",
                        "type": "attachment",
                        "attributes": {
                          "attachable_type": "BxBlockBanner::Banner",
                          "attachable_id": 10,
                          "position": null,
                          "is_default": null,
                          "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZzRDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3258a6a6d95eae7372777aadab7a73d3abfa896c/Banner%20image%203.jpg",
                          "url_link": null,
                          "is_present?": false,
                          "url_id": null,
                          "url_type": null
                        }
                      }
                    ]
                  }
                }
              },
              {
                "id": "11",
                "type": "banner",
                "attributes": {
                  "id": 11,
                  "banner_position": 5,
                  "created_at": "2021-06-22T14:57:54.933Z",
                  "updated_at": "2021-06-22T14:57:54.933Z",
                  "images": {
                    "data": [
                      {
                        "id": "237",
                        "type": "attachment",
                        "attributes": {
                          "attachable_type": "BxBlockBanner::Banner",
                          "attachable_id": 11,
                          "position": null,
                          "is_default": null,
                          "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZzhDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c56258d26adaabf6790914bb5c25b560507ce400/Banner%20image%2010.jpg",
                          "url_link": "https://freemium87482-350702-react-native.b350702.dev.eastus.az.svc.builder.ai/shop/64",
                          "is_present?": false,
                          "url_id": null,
                          "url_type": null
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }

      
      const apiMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), bannerData);
      apiMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiMsg.messageId);
      instance.GetBannersApiCallId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      
      expect(dashboardWrapper).toBeTruthy();

    });

    then("Dashboard will display messages", () => {
  
      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const apiMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data:[{id:1,type:"dashboard",attributes:{id:1,title:"Dashboard_title_1",value:1,created_at:"2021-03-08T17:10:08.139Z",updated_at:"2021-03-08T17:10:08.139Z"}},{id:2,type:"dashboard",attributes:{id:2,title:"Dashboard 5",value:5,created_at:"2021-03-08T17:10:36.867Z",updated_at:"2021-03-08T17:10:36.867Z"}}]})
      runEngine.sendMessage("Unit Test", apiMsg);

      expect(dashboardWrapper).toBeTruthy();


    });

    then("Dashboard will display notifcation if no messages", () => {
      const apiNoItemsMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiNoItemsMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data:[]})
      runEngine.sendMessage("Unit Test", apiNoItemsMsg);

      expect(dashboardWrapper).toBeTruthy();

    });

    then("Dashboard will display notifcation if API failure", () => {
      const apiNoItemsMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiNoItemsMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data:[]})
      runEngine.sendMessage("Unit Test", apiNoItemsMsg);

      const apiErrorResponceMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiErrorResponceMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {errors:"Error"})
      runEngine.sendMessage("Unit Test", apiErrorResponceMsg);

      const apiFailedErrorResponceMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      runEngine.sendMessage("Unit Test", apiFailedErrorResponceMsg);
      
      expect(dashboardWrapper).toBeTruthy();

    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(dashboardWrapper).toBeTruthy();

    });

  });

  test("User navigates to productDetails", ({ given, when, then }) => {
    let productDetailsWrapper: ShallowWrapper;
    let instance: ProductDetails;
    given("I am a User loading productDetails", () => {
      productDetailsWrapper = shallow(<ProductDetails {...screenProps} />);
      expect(productDetailsWrapper).toBeTruthy();

    });

    when("I navigate to the productDetails", () => {
      instance = productDetailsWrapper.instance() as ProductDetails;
      expect(productDetailsWrapper).toBeTruthy();

    });

    then("productDetails will load with out errors", () => {
      expect(productDetailsWrapper).toBeTruthy();

    });

    then("productDetails will display messages", () => {
  
      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      tokenMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), tokenMsg.messageId);
      runEngine.sendMessage("Unit Test", tokenMsg);

      const apiMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data:[{id:1,type:"dashboard",attributes:{id:1,title:"Dashboard_title_1",value:1,created_at:"2021-03-08T17:10:08.139Z",updated_at:"2021-03-08T17:10:08.139Z"}},{id:2,type:"dashboard",attributes:{id:2,title:"Dashboard 5",value:5,created_at:"2021-03-08T17:10:36.867Z",updated_at:"2021-03-08T17:10:36.867Z"}}]})
      apiMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiMsg.messageId);
      runEngine.sendMessage("Unit Test2", apiMsg);

      const apiProdutInfoMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiProdutInfoMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
      {
        "data": {
          "id": "46",
          "type": "catalogue",
          "attributes": {
            "name": "ABC 21",
            "description": "acer description",
            "manufacture_date": "0026-02-21T00:00:00.000Z",
            "block_qty": 1,
            "price": 16000,
            "on_sale": false,
            "sale_price": null,
            "discount": null,
            "recommended": false,
            "sku": "SKU37",
            "length": 12,
            "breadth": 13,
            "height": 14,
            "weight": "10.0",
            "brand": {
              "id": 1,
              "name": "Brand 1",
              "created_at": "2021-05-28T06:40:16.184Z",
              "updated_at": "2021-05-28T06:40:16.184Z"
            },
            "tags": [],
            "reviews": [
              {
                "id": "22",
                "type": "review",
                "attributes": {
                  "id": 22,
                  "catalogue_id": 46,
                  "rating": 5,
                  "comment": "wow \nwow\nwow\nwow\nwow",
                  "created_at": "2021-06-23T08:21:03.027Z",
                  "updated_at": "2021-06-23T08:21:43.891Z",
                  "account_id": 345,
                  "order_id": null,
                  "account": {
                    "activated": true,
                    "full_name": "mayuri",
                    "user_name": null,
                    "email": "ms48@yopmail.com",
                    "full_phone_number": "9669935418",
                    "phone_number": null,
                    "type": "EmailAccount",
                    "created_at": "2021-06-23T07:10:27.755Z",
                    "updated_at": "2021-06-23T09:36:31.338Z",
                    "device_id": null,
                    "provider": null,
                    "unique_auth_id": null,
                    "guest": null,
                    "uuid": null,
                    "is_notification_enabled": true,
                    "fcm_token": null,
                    "country_code": null,
                    "image_url": null,
                    "is_social_login": false,
                    "wishlist_quantity": 2
                  },
                  "review_date": "23 Jun 2021",
                  "review_datetime": "Wed, 23rd June 2021 - 01:51 PM",
                  "product_name": "ABC 21",
                  "user_name": "mayuri"
                }
              }
            ],
            "current_availibility": "in_stock",
            "default_variant": {
              "id": 92,
              "catalogue_id": 46,
              "catalogue_variant_color_id": 3,
              "catalogue_variant_size_id": 3,
              "price": "16000.0",
              "stock_qty": 3,
              "on_sale": false,
              "sale_price": null,
              "discount_price": null,
              "length": 12,
              "breadth": 13,
              "height": 14,
              "created_at": "2021-06-18T09:35:41.919Z",
              "updated_at": "2021-06-23T08:16:28.483Z",
              "block_qty": 2,
              "is_default": true,
              "sold": null,
              "current_availability": "in_stock",
              "remaining_stock": null
            },
            "stock_qty": 14,
            "cart_quantity": null,
            "wishlisted": false,
            "product_notified": false,
            "cart_items": {},
            "average_rating": 5,
            "images": {
              "data": [
                {
                  "id": "154",
                  "type": "attachment",
                  "attributes": {
                    "attachable_type": "BxBlockCatalogue::Catalogue",
                    "attachable_id": 46,
                    "position": null,
                    "is_default": true,
                    "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbmdCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e8fa5ddbb810fbd6af5e2af721e0758f606af8b7/ABC0.jpg",
                    "url_link": null,
                    "is_present?": false,
                    "url_id": null,
                    "url_type": null
                  }
                }
              ]
            },
            "product_attributes": [
              {
                "color": [
                  {
                    "id": 3,
                    "name": "Red",
                    "created_at": "2021-06-11T08:41:34.330Z",
                    "updated_at": "2021-06-23T11:02:11.213Z"
                  },
                  {
                    "id": 5,
                    "name": "Orange",
                    "created_at": "2021-06-18T09:02:33.631Z",
                    "updated_at": "2021-06-23T11:01:54.740Z"
                  },
                  {
                    "id": 6,
                    "name": "Grey",
                    "created_at": "2021-06-18T09:02:34.203Z",
                    "updated_at": "2021-06-23T11:02:34.880Z"
                  }
                ],
                "size": [
                  {
                    "id": 3,
                    "name": "S",
                    "created_at": "2021-06-11T08:41:34.341Z",
                    "updated_at": "2021-06-11T08:41:34.341Z"
                  },
                  {
                    "id": 2,
                    "name": "M",
                    "created_at": "2021-05-28T06:40:08.421Z",
                    "updated_at": "2021-05-28T06:40:08.421Z"
                  },
                  {
                    "id": 1,
                    "name": "L",
                    "created_at": "2021-05-28T06:40:00.139Z",
                    "updated_at": "2021-05-28T06:40:00.139Z"
                  }
                ]
              }
            ],
            "availability": [
              {
                "variant_name": "color",
                "variant_property_ids": [
                  3,
                  5,
                  6
                ]
              },
              {
                "variant_name": "size",
                "variant_property_ids": [
                  3,
                  2,
                  1
                ]
              }
            ],
            "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=46",
            "catalogue_variants": [
              {
                "id": "92",
                "type": "catalogue_variant",
                "attributes": {
                  "id": 92,
                  "catalogue_id": 46,
                  "price": "16000.0",
                  "stock_qty": 3,
                  "on_sale": false,
                  "sale_price": null,
                  "discount_price": null,
                  "length": 12,
                  "breadth": 13,
                  "height": 14,
                  "is_default": true,
                  "created_at": "2021-06-18T09:35:41.919Z",
                  "updated_at": "2021-06-23T08:16:28.483Z",
                  "product_variant_properties": [
                    {
                      "product_variant_id": 92,
                      "variant_property_id": 3,
                      "variant_name": "size",
                      "property_name": "S"
                    },
                    {
                      "product_variant_id": 92,
                      "variant_property_id": 3,
                      "variant_name": "color",
                      "property_name": "Red"
                    }
                  ],
                  "images": {
                    "data": [
                      {
                        "id": "153",
                        "type": "attachment",
                        "attributes": {
                          "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                          "attachable_id": 92,
                          "position": null,
                          "is_default": true,
                          "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBblFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--554237868760dbb0b627d271520b25be99545a7a/ABCred0.jpg",
                          "url_link": null,
                          "is_present?": false,
                          "url_id": null,
                          "url_type": null
                        }
                      }
                    ]
                  },
                  "cart_quantity": null,
                  "is_notify_product": false
                }
              },
              {
                "id": "93",
                "type": "catalogue_variant",
                "attributes": {
                  "id": 93,
                  "catalogue_id": 46,
                  "price": "15000.0",
                  "stock_qty": 5,
                  "on_sale": false,
                  "sale_price": null,
                  "discount_price": null,
                  "length": 12,
                  "breadth": 13,
                  "height": 14,
                  "is_default": false,
                  "created_at": "2021-06-18T09:35:42.649Z",
                  "updated_at": "2021-06-22T16:18:07.000Z",
                  "product_variant_properties": [
                    {
                      "product_variant_id": 93,
                      "variant_property_id": 2,
                      "variant_name": "size",
                      "property_name": "M"
                    },
                    {
                      "product_variant_id": 93,
                      "variant_property_id": 5,
                      "variant_name": "color",
                      "property_name": "Orange"
                    }
                  ],
                  "images": {
                    "data": [
                      {
                        "id": "155",
                        "type": "attachment",
                        "attributes": {
                          "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                          "attachable_id": 93,
                          "position": null,
                          "is_default": true,
                          "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbmNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3364df8d5bbc98c944751e738859b0eba61b704f/ABCwhite0.jpg",
                          "url_link": null,
                          "is_present?": false,
                          "url_id": null,
                          "url_type": null
                        }
                      }
                    ]
                  },
                  "cart_quantity": null,
                  "is_notify_product": false
                }
              },
              {
                "id": "94",
                "type": "catalogue_variant",
                "attributes": {
                  "id": 94,
                  "catalogue_id": 46,
                  "price": "14000.0",
                  "stock_qty": 6,
                  "on_sale": false,
                  "sale_price": null,
                  "discount_price": null,
                  "length": 12,
                  "breadth": 13,
                  "height": 14,
                  "is_default": false,
                  "created_at": "2021-06-18T09:35:43.230Z",
                  "updated_at": "2021-06-22T16:18:07.000Z",
                  "product_variant_properties": [
                    {
                      "product_variant_id": 94,
                      "variant_property_id": 1,
                      "variant_name": "size",
                      "property_name": "L"
                    },
                    {
                      "product_variant_id": 94,
                      "variant_property_id": 6,
                      "variant_name": "color",
                      "property_name": "Grey"
                    }
                  ],
                  "images": {
                    "data": [
                      {
                        "id": "156",
                        "type": "attachment",
                        "attributes": {
                          "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                          "attachable_id": 94,
                          "position": null,
                          "is_default": true,
                          "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbmtCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a1e95cc1d6d1589379c40d692350c9c3daefd8f7/ABCblack0.jpg",
                          "url_link": null,
                          "is_present?": false,
                          "url_id": null,
                          "url_type": null
                        }
                      }
                    ]
                  },
                  "cart_quantity": null,
                  "is_notify_product": false
                }
              }
            ],
            "variants_in_cart": [],
            "can_review": false,
            "similar_products": {
              "data": [
                {
                  "id": "48",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 23",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU39",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 98,
                      "catalogue_id": 48,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:35:45.606Z",
                      "updated_at": "2021-06-22T16:16:05.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "162",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 48,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb1FCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c81790f9fdc9841e69773c79c6181d264d8c08c3/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=48",
                    "catalogue_variants": [
                      {
                        "id": "98",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 98,
                          "catalogue_id": 48,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:35:45.606Z",
                          "updated_at": "2021-06-22T16:16:05.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 98,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 98,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "161",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 98,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0FCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--20dd22187c9892582454c7b5ed8124c2532307ba/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "99",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 99,
                          "catalogue_id": 48,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:46.295Z",
                          "updated_at": "2021-06-22T16:16:05.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 99,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 99,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "163",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 99,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb01CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--933348ef990dae6140bad12674c2b3e85e4a1c0e/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "100",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 100,
                          "catalogue_id": 48,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:46.890Z",
                          "updated_at": "2021-06-22T16:16:05.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 100,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 100,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "164",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 100,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb1VCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d0303cf89d245bf08042ecb65994cc9a94948651/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "42",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 17",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU851",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 80,
                      "catalogue_id": 42,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 2,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:38.732Z",
                      "updated_at": "2021-06-22T09:33:48.091Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "out_of_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 10,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "138",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 42,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--61ec412958a06e4f352031898e9a501454068761/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          6,
                          5
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          1,
                          2
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=42",
                    "catalogue_variants": [
                      {
                        "id": "80",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 80,
                          "catalogue_id": 42,
                          "price": "16000.0",
                          "stock_qty": 2,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:38.732Z",
                          "updated_at": "2021-06-22T09:33:48.091Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 80,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 80,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "137",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 80,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbDBCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f9700e009c03967dadc91e05567c9b7f12110eaf/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "82",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 82,
                          "catalogue_id": 42,
                          "price": "14000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:40.033Z",
                          "updated_at": "2021-06-18T09:45:27.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 82,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 82,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "140",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 82,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2f9efc4b555adb960701f63814a70d7e0799d18b/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "81",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 81,
                          "catalogue_id": 42,
                          "price": "15000.0",
                          "stock_qty": 3,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:39.421Z",
                          "updated_at": "2021-06-21T13:44:56.016Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 81,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 81,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "139",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 81,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbDhCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--627e0a0ccfb3bb889bfaa277764b111efeea8f30/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "40",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 15",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": -1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": true,
                    "sku": "SKU849",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [
                      {
                        "id": "23",
                        "type": "review",
                        "attributes": {
                          "id": 23,
                          "catalogue_id": 40,
                          "rating": 1,
                          "comment": "Awful",
                          "created_at": "2021-06-23T10:09:21.985Z",
                          "updated_at": "2021-06-23T10:09:31.913Z",
                          "account_id": 352,
                          "order_id": null,
                          "account": {
                            "activated": true,
                            "full_name": "mayuri r sharma",
                            "user_name": null,
                            "email": "ms50@yopmail.com",
                            "full_phone_number": "5678145756",
                            "phone_number": null,
                            "type": "EmailAccount",
                            "created_at": "2021-06-23T09:27:49.589Z",
                            "updated_at": "2021-06-23T10:08:03.905Z",
                            "device_id": null,
                            "provider": null,
                            "unique_auth_id": null,
                            "guest": null,
                            "uuid": null,
                            "is_notification_enabled": true,
                            "fcm_token": "fqFsExUMRHuwcbrGKnNYqy:APA91bEbwM41iJ8YjiOfGfxPe8IjnT9UBLxhtRTsQ2ixD6_kHwJPXV5vGkz_BrxLn8gLhyX1RudHPnDew1tIsnvWRxee4V-h4LgFekt7kN3eCAGLVOQSbWpFOEEXqME-wR3WDjpIP_r8",
                            "country_code": null,
                            "image_url": "https://minio.b67852.dev.centralindia.az.svc.builder.ai/sbucket/4dpdg7gp9njmxqo4kf3rwahs0l1r?response-content-disposition=inline%3B%20filename%3D%22profile_pic.jpeg%22%3B%20filename%2A%3DUTF-8%27%27profile_pic.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20210711%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20210711T040624Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=76cfe8e70ba88049e8c9ce2558e2707463106ac4c75c2db9f3dd4bb8262ad29c",
                            "is_social_login": false,
                            "wishlist_quantity": 2
                          },
                          "review_date": "23 Jun 2021",
                          "review_datetime": "Wed, 23rd June 2021 - 03:39 PM",
                          "product_name": "ABC 15",
                          "user_name": "mayuri r sharma"
                        }
                      }
                    ],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 74,
                      "catalogue_id": 40,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 9,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:35.343Z",
                      "updated_at": "2021-06-23T13:04:37.506Z",
                      "block_qty": 0,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 18,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 1,
                    "images": {
                      "data": [
                        {
                          "id": "130",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 40,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbFFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cf789b06ea26ce697df6f7fb8d751c4f75bc7b7c/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=40",
                    "catalogue_variants": [
                      {
                        "id": "74",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 74,
                          "catalogue_id": 40,
                          "price": "16000.0",
                          "stock_qty": 9,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:35.343Z",
                          "updated_at": "2021-06-23T13:04:37.506Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 74,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 74,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "129",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 74,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbEVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ab04af15c9eeed69290c495e2f23c85447c44c1/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "75",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 75,
                          "catalogue_id": 40,
                          "price": "15000.0",
                          "stock_qty": 3,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:35.956Z",
                          "updated_at": "2021-06-23T10:23:47.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 75,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 75,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "131",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 75,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbE1CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2d1186fc57c06532a6724dc9bdadf74cafa6849d/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "76",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 76,
                          "catalogue_id": 40,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:36.460Z",
                          "updated_at": "2021-06-23T10:23:47.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 76,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 76,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "132",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 76,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbFVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--00658a94aff99f850ccdf0e503732babae0d6404/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "47",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 22",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU38",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 95,
                      "catalogue_id": 47,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:35:43.756Z",
                      "updated_at": "2021-06-23T06:37:14.859Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "158",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 47,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbjRCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e8f8373ef1b55ee4bae63edf5f03f7570f2b70ff/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=47",
                    "catalogue_variants": [
                      {
                        "id": "95",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 95,
                          "catalogue_id": 47,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:35:43.756Z",
                          "updated_at": "2021-06-23T06:37:14.859Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 95,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 95,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "157",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 95,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbm9CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--eb708fa1a23439c473c7a889884282046eb106cc/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "96",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 96,
                          "catalogue_id": 47,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:44.431Z",
                          "updated_at": "2021-06-22T16:16:45.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 96,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 96,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "159",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 96,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbjBCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8eec6963d36a218b4519965a8e5aa171be53d63d/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "97",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 97,
                          "catalogue_id": 47,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:45.002Z",
                          "updated_at": "2021-06-22T16:16:45.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 97,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 97,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "160",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 97,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbjhCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6619582b48c3c618e4431c7808d1a885267cca3e/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "61",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 36",
                    "description": "",
                    "manufacture_date": null,
                    "block_qty": 0,
                    "price": 19,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": true,
                    "sku": "COD0000061",
                    "length": null,
                    "breadth": null,
                    "height": null,
                    "weight": "1.0",
                    "brand": {
                      "id": 3,
                      "name": "Brand 11",
                      "created_at": "2021-06-02T07:58:38.683Z",
                      "updated_at": "2021-06-02T07:58:38.683Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 137,
                      "catalogue_id": 61,
                      "catalogue_variant_color_id": 4,
                      "catalogue_variant_size_id": 2,
                      "price": "19.0",
                      "stock_qty": 1,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": null,
                      "breadth": null,
                      "height": null,
                      "created_at": "2021-06-18T09:48:45.128Z",
                      "updated_at": "2021-06-22T07:19:33.207Z",
                      "block_qty": 1,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "out_of_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 1,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "214",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 61,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBczhCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c793327ecb6eb1f7c4782c420f3a053cbac0472e/Food%20IMages%20(3).jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 4,
                            "name": "Maroon",
                            "created_at": "2021-06-16T12:18:27.009Z",
                            "updated_at": "2021-06-16T12:18:27.009Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          4
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          2
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=61",
                    "catalogue_variants": [
                      {
                        "id": "137",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 137,
                          "catalogue_id": 61,
                          "price": "19.0",
                          "stock_qty": 1,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": null,
                          "breadth": null,
                          "height": null,
                          "is_default": true,
                          "created_at": "2021-06-18T09:48:45.128Z",
                          "updated_at": "2021-06-22T07:19:33.207Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 137,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 137,
                              "variant_property_id": 4,
                              "variant_name": "color",
                              "property_name": "Maroon"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "213",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 137,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBczRCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--87cdc655e0ae74b50d58781975f87fe947af07ac/Food%20IMages%20(9).jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      },
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "57",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 32",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 13000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU48",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [
                      {
                        "id": "18",
                        "type": "review",
                        "attributes": {
                          "id": 18,
                          "catalogue_id": 57,
                          "rating": 4,
                          "comment": "Test\nTest\nTest",
                          "created_at": "2021-06-22T11:44:18.833Z",
                          "updated_at": "2021-06-22T11:45:14.812Z",
                          "account_id": 308,
                          "order_id": null,
                          "account": {
                            "activated": true,
                            "full_name": "mayuri",
                            "user_name": null,
                            "email": "ms44@yopmail.com",
                            "full_phone_number": "3692587412",
                            "phone_number": "92587412",
                            "type": "EmailAccount",
                            "created_at": "2021-06-22T11:27:21.129Z",
                            "updated_at": "2021-06-22T11:34:48.362Z",
                            "device_id": null,
                            "provider": null,
                            "unique_auth_id": null,
                            "guest": null,
                            "uuid": null,
                            "is_notification_enabled": true,
                            "fcm_token": "fhHv6uU5SneEe_1t-x7nff:APA91bH4Uh5XrGdP3kSd_6RC6jurl5wVRAaRsurSBHajOXrcNXvmyJVKtqAd6s5gsa_iG74qXTQtS-kQTjWE3VE0glkeHgbY08z2UPGL8WZ2JOilDVJ93RHrkzYy50TKsI-AsyWiRKHV",
                            "country_code": "36",
                            "image_url": "https://minio.b67852.dev.centralindia.az.svc.builder.ai/sbucket/yazum5otgnk4xpchqz94odyyp541?response-content-disposition=inline%3B%20filename%3D%22profile_pic.jpeg%22%3B%20filename%2A%3DUTF-8%27%27profile_pic.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20210711%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20210711T040624Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=6924d9d9f4615a975c9a1a8cd466c675d00d10ada66f611db469f083eee026ab",
                            "is_social_login": false,
                            "wishlist_quantity": 2
                          },
                          "review_date": "22 Jun 2021",
                          "review_datetime": "Tue, 22nd June 2021 - 05:14 PM",
                          "product_name": "ABC 32",
                          "user_name": "mayuri"
                        }
                      }
                    ],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 125,
                      "catalogue_id": 57,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "13000.0",
                      "stock_qty": 2,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:36:01.839Z",
                      "updated_at": "2021-06-22T16:07:49.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "out_of_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 13,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 4,
                    "images": {
                      "data": [
                        {
                          "id": "198",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 57,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcm9CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fb69d2e025f68bd331572d98b7abab536819c659/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          6,
                          5
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          1,
                          2
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=57",
                    "catalogue_variants": [
                      {
                        "id": "125",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 125,
                          "catalogue_id": 57,
                          "price": "13000.0",
                          "stock_qty": 2,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:36:01.839Z",
                          "updated_at": "2021-06-22T16:07:49.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 125,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 125,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "197",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 125,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcllCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a436dc089e81e6073cd861c31505144c147853ae/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "127",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 127,
                          "catalogue_id": 57,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:36:03.065Z",
                          "updated_at": "2021-06-22T16:07:49.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 127,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 127,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "200",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 127,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcnNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0337313db642fe099045765ab4fd706e8776ed26/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "126",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 126,
                          "catalogue_id": 57,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:36:02.501Z",
                          "updated_at": "2021-06-22T16:07:49.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 126,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 126,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "199",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 126,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcmtCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b7b34f8068a2cf9803694c6d790b1a00ae18e8ad/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "49",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 24",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU40",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 101,
                      "catalogue_id": 49,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:35:47.512Z",
                      "updated_at": "2021-06-22T16:20:17.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "166",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 49,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb29CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--efbdc865dacb60ffb190456a8d73b88ceafe26ca/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=49",
                    "catalogue_variants": [
                      {
                        "id": "101",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 101,
                          "catalogue_id": 49,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:35:47.512Z",
                          "updated_at": "2021-06-22T16:20:17.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 101,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 101,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "165",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 101,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb1lCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d5be3f2d77b3698ef23e4754ff06d52095264cbe/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "102",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 102,
                          "catalogue_id": 49,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:48.171Z",
                          "updated_at": "2021-06-22T16:20:17.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 102,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 102,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "167",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 102,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb2tCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--71bed19d8fd8d6f78639219cc33fa01b3e3bffcd/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "103",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 103,
                          "catalogue_id": 49,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:48.719Z",
                          "updated_at": "2021-06-22T16:20:17.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 103,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 103,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "168",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 103,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb3NCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2504b3713344e26c6f502876f0058578c266b8d9/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "58",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 33",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU49",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [
                      {
                        "id": "21",
                        "type": "review",
                        "attributes": {
                          "id": 21,
                          "catalogue_id": 58,
                          "rating": 5,
                          "comment": "What a nice product ",
                          "created_at": "2021-06-23T06:25:06.630Z",
                          "updated_at": "2021-06-23T06:26:51.645Z",
                          "account_id": 281,
                          "order_id": null,
                          "account": {
                            "activated": true,
                            "full_name": "mayuri",
                            "user_name": null,
                            "email": "ms41@yopmail.com",
                            "full_phone_number": "1234554340",
                            "phone_number": null,
                            "type": "EmailAccount",
                            "created_at": "2021-06-22T05:42:36.263Z",
                            "updated_at": "2021-06-23T05:52:09.000Z",
                            "device_id": null,
                            "provider": null,
                            "unique_auth_id": null,
                            "guest": null,
                            "uuid": null,
                            "is_notification_enabled": true,
                            "fcm_token": "foFxh94_T0WCcgzknEj8YG:APA91bHOmaP3SNb2kzZuwbWvgZwMoo9978Zgpeuh5nKFw2wNvsnmGby6vnKPMaKcGB36m_6MPEoHtkU0a_P1O_GCu_CmOYjIvzD9hkQN7iMlBtGZKb32yeMB5qi_j4qCwN3US1MsLm1Q",
                            "country_code": null,
                            "image_url": "https://minio.b67852.dev.centralindia.az.svc.builder.ai/sbucket/0jylkwcjivnwjhlqt65avbhgf73b?response-content-disposition=inline%3B%20filename%3D%22profile_pic.jpeg%22%3B%20filename%2A%3DUTF-8%27%27profile_pic.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20210711%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20210711T040624Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b13b6174ed6eeec50c8eef6b023edcfe25eb6839386d8c7aa7dd6be6c9491254",
                            "is_social_login": false,
                            "wishlist_quantity": 3
                          },
                          "review_date": "23 Jun 2021",
                          "review_datetime": "Wed, 23rd June 2021 - 11:55 AM",
                          "product_name": "ABC 33",
                          "user_name": "mayuri"
                        }
                      }
                    ],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 128,
                      "catalogue_id": 58,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 2,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:36:03.531Z",
                      "updated_at": "2021-06-22T16:07:46.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "out_of_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 13,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 5,
                    "images": {
                      "data": [
                        {
                          "id": "202",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 58,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc0FCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--255528f76a0bce4da6840767ff92212b77d24908/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          6,
                          5
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          1,
                          2
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=58",
                    "catalogue_variants": [
                      {
                        "id": "128",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 128,
                          "catalogue_id": 58,
                          "price": "16000.0",
                          "stock_qty": 2,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:36:03.531Z",
                          "updated_at": "2021-06-22T16:07:46.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 128,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 128,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "201",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 128,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcndCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9f5d0849e9deacc82efddef010bcb23be8d5789c/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "130",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 130,
                          "catalogue_id": 58,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:36:04.835Z",
                          "updated_at": "2021-06-23T06:25:51.296Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 130,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 130,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "204",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 130,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc0VCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--834f086ec232c73e32e549de21b6e27e7506834c/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "129",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 129,
                          "catalogue_id": 58,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:36:04.180Z",
                          "updated_at": "2021-06-23T12:42:19.120Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 129,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 129,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "203",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 129,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcjhCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cd8182c3baa606068411743960424dd31d3d7c85/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "53",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 28",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU44",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 113,
                      "catalogue_id": 53,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:35:54.708Z",
                      "updated_at": "2021-06-22T16:10:14.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "182",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 53,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcUlCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d8a57ebc0834a00d8c22e4ffc275e4b6cc056a25/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=53",
                    "catalogue_variants": [
                      {
                        "id": "113",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 113,
                          "catalogue_id": 53,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:35:54.708Z",
                          "updated_at": "2021-06-22T16:10:14.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 113,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 113,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "181",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 113,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcDRCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f4f9313e0e696c86c3bdbdcb69e4a2cabf3fd343/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "114",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 114,
                          "catalogue_id": 53,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:55.334Z",
                          "updated_at": "2021-06-22T16:10:15.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 114,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 114,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "183",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 114,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcUVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--940c2793df065e8dbc17842600b320ab52965f60/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "115",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 115,
                          "catalogue_id": 53,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:55.912Z",
                          "updated_at": "2021-06-22T16:10:15.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 115,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 115,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "184",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 115,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcU1CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bd8fa1a3f94234e0a235aac669dcab0f96a0e087/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "60",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 35",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 2,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": true,
                    "sku": "SKU51",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 134,
                      "catalogue_id": 60,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 3,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:36:07.296Z",
                      "updated_at": "2021-06-23T16:12:28.966Z",
                      "block_qty": 3,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "out_of_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 14,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "210",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 60,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc3dCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5feeb2f3ae23bfaf5484db00f64215d1a492836e/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          6,
                          5
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          1,
                          2
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=60",
                    "catalogue_variants": [
                      {
                        "id": "134",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 134,
                          "catalogue_id": 60,
                          "price": "16000.0",
                          "stock_qty": 3,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:36:07.296Z",
                          "updated_at": "2021-06-23T16:12:28.966Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 134,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 134,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "209",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 134,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2dCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b5c5bab1d1dd1f6df7ea7991a71a5613ea147234/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "136",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 136,
                          "catalogue_id": 60,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:36:08.588Z",
                          "updated_at": "2021-06-23T07:53:47.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 136,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 136,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "212",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 136,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBczBCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--05a6e2cb407d60703a9c71d24a8256d6fe91c557/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "135",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 135,
                          "catalogue_id": 60,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:36:08.027Z",
                          "updated_at": "2021-06-23T07:53:47.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 135,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 135,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "211",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 135,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc3NCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75e0e8b9b85d3ea06e07619245347facb0bce7ae/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "59",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 34",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 13000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU50",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 131,
                      "catalogue_id": 59,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "13000.0",
                      "stock_qty": 2,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:36:05.330Z",
                      "updated_at": "2021-06-23T16:12:28.980Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "out_of_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 13,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "206",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 59,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc1lCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--baabe45b53b0c7ad41535f8a4997de705c73484d/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          6,
                          5
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          1,
                          2
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=59",
                    "catalogue_variants": [
                      {
                        "id": "131",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 131,
                          "catalogue_id": 59,
                          "price": "13000.0",
                          "stock_qty": 2,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:36:05.330Z",
                          "updated_at": "2021-06-23T16:12:28.980Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 131,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 131,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "205",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 131,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc0lCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--57e18cf2bf0252373b81c21b8c875f3f6fee732c/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "133",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 133,
                          "catalogue_id": 59,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:36:06.626Z",
                          "updated_at": "2021-06-22T16:06:55.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 133,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 133,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "208",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 133,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2NCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bfbf0cda9198db023fb8206cf60b990b25fb243b/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "132",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 132,
                          "catalogue_id": 59,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:36:06.014Z",
                          "updated_at": "2021-06-22T16:06:55.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 132,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 132,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "207",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 132,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc1VCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--82938203738c769e80c8b45dca001e7f012fb3b1/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "32",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 7",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU841",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 50,
                      "catalogue_id": 32,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:21.323Z",
                      "updated_at": "2021-06-18T09:42:16.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "98",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 32,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaVFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cab489b5c604c4a653a35f8b5ddc497617ee2524/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=32",
                    "catalogue_variants": [
                      {
                        "id": "50",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 50,
                          "catalogue_id": 32,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:21.323Z",
                          "updated_at": "2021-06-18T09:42:16.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 50,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 50,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "97",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 50,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaUVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--18a2d548cee406b79e1875c91dd7a893497e24c6/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "51",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 51,
                          "catalogue_id": 32,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:22.216Z",
                          "updated_at": "2021-06-18T09:42:16.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 51,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 51,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "99",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 51,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaU1CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--dd620eaee85277387886f167ced813d4d61cc831/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "52",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 52,
                          "catalogue_id": 32,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:22.867Z",
                          "updated_at": "2021-06-18T09:42:16.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 52,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 52,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "100",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 52,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaVVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2f3602432af0c1f9b4344c7d918320cda87d61b1/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "45",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 20",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": true,
                    "sku": "SKU36",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 89,
                      "catalogue_id": 45,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:35:40.173Z",
                      "updated_at": "2021-06-23T07:53:58.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "150",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 45,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbklCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4b801d148457f7498dd3978395533f1a7306d033/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          },
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          },
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          5,
                          6,
                          3
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          2,
                          1,
                          3
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=45",
                    "catalogue_variants": [
                      {
                        "id": "90",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 90,
                          "catalogue_id": 45,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:40.818Z",
                          "updated_at": "2021-06-23T07:53:58.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 90,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 90,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "151",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 90,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbkVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8816d0fa36957a8f6aa598763809fd610e572edb/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "91",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 91,
                          "catalogue_id": 45,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:41.398Z",
                          "updated_at": "2021-06-23T07:53:58.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 91,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 91,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "152",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 91,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbk1CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ac2c2297568a0ef9c9fcc690165446f0bf5def2b/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "89",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 89,
                          "catalogue_id": 45,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:35:40.173Z",
                          "updated_at": "2021-06-23T07:53:58.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 89,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 89,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "149",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 89,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbTRCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--706ef1de28694bdaac7b07cd0deaaebbff0b9d44/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "29",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 4",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU838",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 41,
                      "catalogue_id": 29,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:16.012Z",
                      "updated_at": "2021-06-22T11:50:49.600Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "86",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 29,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaElCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--902228793d960e5989283efe11a5d25d392f1760/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=29",
                    "catalogue_variants": [
                      {
                        "id": "41",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 41,
                          "catalogue_id": 29,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:16.012Z",
                          "updated_at": "2021-06-22T11:50:49.600Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 41,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 41,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "85",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 41,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZzhCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0b0ca37d1a127c5a249372c51822028f9754ae18/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "42",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 42,
                          "catalogue_id": 29,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:16.802Z",
                          "updated_at": "2021-06-18T09:44:26.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 42,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 42,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "87",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 42,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaEVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--afbc3f9785c3cc1f98868641b5e3d7cc24afbc8d/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "43",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 43,
                          "catalogue_id": 29,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:17.455Z",
                          "updated_at": "2021-06-18T09:44:26.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 43,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 43,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "88",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 43,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaE1CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--df197a054b85bd95eb402f9d48f73dd8d6578213/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "54",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 29",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": "15500.0",
                    "recommended": false,
                    "sku": "SKU45",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 116,
                      "catalogue_id": 54,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 2,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": "15500.0",
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:35:56.562Z",
                      "updated_at": "2021-06-22T12:37:20.735Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "out_of_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 13,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "186",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 54,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWdCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8edf0619f137da777fa5afa99bd5f9bd198254e4/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=54",
                    "catalogue_variants": [
                      {
                        "id": "116",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 116,
                          "catalogue_id": 54,
                          "price": "16000.0",
                          "stock_qty": 2,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": "15500.0",
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:35:56.562Z",
                          "updated_at": "2021-06-22T12:37:20.735Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 116,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 116,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "185",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 116,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcVFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--330e9bdab2284a9a17f78ceaf6dbe7bd0a0d8bfb/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "117",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 117,
                          "catalogue_id": 54,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": "14500.0",
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:57.217Z",
                          "updated_at": "2021-06-18T09:35:57.217Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 117,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 117,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "187",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 117,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b5173123d1a8d985d69809c3b7f4241c302ff4d9/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "118",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 118,
                          "catalogue_id": 54,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": "13500.0",
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:57.793Z",
                          "updated_at": "2021-06-18T09:35:57.793Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 118,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 118,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "188",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 118,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWtCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d538d57172a061532899e1bd7722650b63e9f485/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      },
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      },
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      },
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "62",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 37",
                    "description": "",
                    "manufacture_date": null,
                    "block_qty": 1,
                    "price": 28.67,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "COD0000062",
                    "length": null,
                    "breadth": null,
                    "height": null,
                    "weight": "1.0",
                    "brand": null,
                    "tags": [],
                    "reviews": [
                      {
                        "id": "16",
                        "type": "review",
                        "attributes": {
                          "id": 16,
                          "catalogue_id": 62,
                          "rating": 3,
                          "comment": "Need to improve the quality.\nOtherwise a good product. ",
                          "created_at": "2021-06-21T10:26:28.681Z",
                          "updated_at": "2021-06-21T10:26:40.865Z",
                          "account_id": 242,
                          "order_id": null,
                          "account": {
                            "activated": true,
                            "full_name": "mayuri R sharma",
                            "user_name": null,
                            "email": "ms39@yopmail.com",
                            "full_phone_number": "7415267288",
                            "phone_number": null,
                            "type": "EmailAccount",
                            "created_at": "2021-06-21T09:38:31.651Z",
                            "updated_at": "2021-06-21T13:47:10.778Z",
                            "device_id": null,
                            "provider": null,
                            "unique_auth_id": null,
                            "guest": null,
                            "uuid": null,
                            "is_notification_enabled": true,
                            "fcm_token": "ffKY0ATCSs2fScPPIrEBTf:APA91bEIDTnXFrZwa5FvhD9mrKroW4BssjBW9YFyZ1eXm676makpo6lr0LmO47ZJZalS36AiqUPfhUDOVTesqNv4tXg5X9U2cuoXPD4W7ppxkh7b9SZ-a-ZZOARttRLScR0pcaGx2F-u",
                            "country_code": null,
                            "image_url": "https://minio.b67852.dev.centralindia.az.svc.builder.ai/sbucket/b1yawrurgvv72uht9d81fh04ct4p?response-content-disposition=inline%3B%20filename%3D%22profile_pic.jpeg%22%3B%20filename%2A%3DUTF-8%27%27profile_pic.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20210711%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20210711T040625Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=208a5746f0887d51eecf304bdf93d381d8eba0c4af0a3bbd21f0cee62eef4895",
                            "is_social_login": false,
                            "wishlist_quantity": 3
                          },
                          "review_date": "21 Jun 2021",
                          "review_datetime": "Mon, 21st June 2021 - 03:56 PM",
                          "product_name": "ABC 37",
                          "user_name": "mayuri R sharma"
                        }
                      }
                    ],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 138,
                      "catalogue_id": 62,
                      "catalogue_variant_color_id": 4,
                      "catalogue_variant_size_id": 3,
                      "price": "28.67",
                      "stock_qty": 79,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": null,
                      "breadth": null,
                      "height": null,
                      "created_at": "2021-06-18T09:49:51.147Z",
                      "updated_at": "2021-06-23T16:00:36.471Z",
                      "block_qty": 1,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 79,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 3,
                    "images": {
                      "data": [
                        {
                          "id": "216",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 62,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdEVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4ccb8a37d3aa82feb94f8b14487687e49bdadf5c/Food%20IMages%20(14).jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 4,
                            "name": "Maroon",
                            "created_at": "2021-06-16T12:18:27.009Z",
                            "updated_at": "2021-06-16T12:18:27.009Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          4
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=62",
                    "catalogue_variants": [
                      {
                        "id": "138",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 138,
                          "catalogue_id": 62,
                          "price": "28.67",
                          "stock_qty": 79,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": null,
                          "breadth": null,
                          "height": null,
                          "is_default": true,
                          "created_at": "2021-06-18T09:49:51.147Z",
                          "updated_at": "2021-06-23T16:00:36.471Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 138,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 138,
                              "variant_property_id": 4,
                              "variant_name": "color",
                              "property_name": "Maroon"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "215",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 138,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdEFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ce44049f95226acd34fc46a8e24eb741f1ebf0a1/Food%20IMages%20(12).jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "2",
                          "type": "category",
                          "attributes": {
                            "id": 2,
                            "name": "Category 2",
                            "created_at": "2021-05-28T06:41:45.023Z",
                            "updated_at": "2021-06-18T05:51:51.560Z",
                            "product_image": {
                              "id": 113,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBkZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--89d2be902cec1f1a8891397418ddd9bd969d5ae7/FoodIMages3.jpg"
                            }
                          }
                        }
                      },
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "33",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 8",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU842",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 53,
                      "catalogue_id": 33,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:23.377Z",
                      "updated_at": "2021-06-18T09:42:04.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "102",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 33,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaW9CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--45b9364ee7f3f905105e0bb366000e09d752b15d/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=33",
                    "catalogue_variants": [
                      {
                        "id": "53",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 53,
                          "catalogue_id": 33,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:23.377Z",
                          "updated_at": "2021-06-18T09:42:04.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 53,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 53,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "101",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 53,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaWNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b378b0a9c64beb52c96bb50f478cbb597380cb1c/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "54",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 54,
                          "catalogue_id": 33,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:24.006Z",
                          "updated_at": "2021-06-18T09:42:04.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 54,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 54,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "103",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 54,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaWtCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bd00f6f1f67c358935782cb7e576bdc71bd603db/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "55",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 55,
                          "catalogue_id": 33,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:24.535Z",
                          "updated_at": "2021-06-18T09:42:04.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 55,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 55,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "104",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 55,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaXNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--72e01d2c79c76b57374c51edd4df602bd5de3e9c/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "43",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 18",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU34",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 83,
                      "catalogue_id": 43,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 3,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:35:36.466Z",
                      "updated_at": "2021-06-23T10:11:47.398Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 12,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "142",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 43,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbVlCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a47d98324f931a2488a6402fe066c7e6fdd55259/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          6,
                          5
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          1,
                          2
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=43",
                    "catalogue_variants": [
                      {
                        "id": "83",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 83,
                          "catalogue_id": 43,
                          "price": "16000.0",
                          "stock_qty": 3,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:35:36.466Z",
                          "updated_at": "2021-06-23T10:11:47.398Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 83,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 83,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "141",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 83,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUlCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--72ff5e5820a2cea35c63e4069e7752b7bdb60fc9/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "85",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 85,
                          "catalogue_id": 43,
                          "price": "14000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:37.848Z",
                          "updated_at": "2021-06-23T10:11:47.450Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 85,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 85,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "144",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 85,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbWNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7ca1db3188bc86f0671d1affa546e457ea9fc914/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "84",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 84,
                          "catalogue_id": 43,
                          "price": "15000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:37.288Z",
                          "updated_at": "2021-06-23T10:11:47.425Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 84,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 84,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "143",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 84,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbVVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--35d40b0d13ba60c38e22a7fa032be61eb2e34630/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "38",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 13",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU847",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 68,
                      "catalogue_id": 38,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:31.871Z",
                      "updated_at": "2021-06-18T09:46:21.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "122",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 38,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa2dCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8ffab338f6f6d95dc8701e36f544d6872f7d4837/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=38",
                    "catalogue_variants": [
                      {
                        "id": "68",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 68,
                          "catalogue_id": 38,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:31.871Z",
                          "updated_at": "2021-06-18T09:46:21.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 68,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 68,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "121",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 68,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa1VCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--55addd6282aa3fa28a4a7f604a144da599a2402e/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "69",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 69,
                          "catalogue_id": 38,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:32.627Z",
                          "updated_at": "2021-06-18T09:46:21.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 69,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 69,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "123",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 69,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa2NCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7d4803c29af7399e1aa2c519398f64aaf74ece62/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "70",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 70,
                          "catalogue_id": 38,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:33.179Z",
                          "updated_at": "2021-06-18T09:46:21.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 70,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 70,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "124",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 70,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa2tCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cbff9b46c53715dff05f156659bb656ae5e46ebf/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "39",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 14",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU848",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 71,
                      "catalogue_id": 39,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:33.745Z",
                      "updated_at": "2021-06-18T09:46:09.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "126",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 39,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBazRCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4e0adee19afb9bd7be3a94cf568ff2806342a3a4/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=39",
                    "catalogue_variants": [
                      {
                        "id": "71",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 71,
                          "catalogue_id": 39,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:33.745Z",
                          "updated_at": "2021-06-18T09:46:09.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 71,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 71,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "125",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 71,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa3NCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0c20a4720047e0617cd2432fe2d7a693d1a6ec50/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "72",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 72,
                          "catalogue_id": 39,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:34.362Z",
                          "updated_at": "2021-06-18T09:46:09.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 72,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 72,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "127",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 72,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBazBCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--201ef642f42f6b024de29906bbfd4e3c5e3e322b/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "73",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 73,
                          "catalogue_id": 39,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:34.877Z",
                          "updated_at": "2021-06-18T09:46:09.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 73,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 73,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "128",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 73,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBazhCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bb00ede1700577196627c133f642a7ab1c1a4126/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "34",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 9",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU843",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 56,
                      "catalogue_id": 34,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:25.012Z",
                      "updated_at": "2021-06-18T09:41:46.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "106",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 34,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBakFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2116b06ce80e2bf8ea038edda4302da98caf69a4/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=34",
                    "catalogue_variants": [
                      {
                        "id": "56",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 56,
                          "catalogue_id": 34,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:25.012Z",
                          "updated_at": "2021-06-18T09:41:46.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 56,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 56,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "105",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 56,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaTBCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7e3dbe231bfabec0c3fa8bb70267c1a18b0034b9/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "57",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 57,
                          "catalogue_id": 34,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:25.629Z",
                          "updated_at": "2021-06-18T09:41:46.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 57,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 57,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "107",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 57,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaThCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f886c68df0048dc59b57ec731decdaf077ebc52f/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "58",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 58,
                          "catalogue_id": 34,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:26.214Z",
                          "updated_at": "2021-06-18T09:41:46.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 58,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 58,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "108",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 58,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBakVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bd1993bfbff138bc2ac5f144a2c9f0d018e19fff/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "41",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 16",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU850",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 77,
                      "catalogue_id": 41,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:37.018Z",
                      "updated_at": "2021-06-18T09:45:39.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "134",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 41,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbG9CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9146c6f817ab68a1d02324f1164483ca1225c9fd/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=41",
                    "catalogue_variants": [
                      {
                        "id": "77",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 77,
                          "catalogue_id": 41,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:37.018Z",
                          "updated_at": "2021-06-18T09:45:39.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 77,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 77,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "133",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 77,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbGNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9dcc3b52fa2d30e7e63861cbb0007af6f71ebd9e/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "78",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 78,
                          "catalogue_id": 41,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:37.678Z",
                          "updated_at": "2021-06-18T09:45:39.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 78,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 78,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "135",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 78,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbGtCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ff56000c5a2ed736888405b3fc6b81b53caf432e/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "79",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 79,
                          "catalogue_id": 41,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:38.231Z",
                          "updated_at": "2021-06-18T09:45:39.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 79,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 79,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "136",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 79,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbHNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b62d85b3aa1a1dac05ba06c1b387507e2324b01c/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "35",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 10",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU844",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 59,
                      "catalogue_id": 35,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:26.638Z",
                      "updated_at": "2021-06-18T09:41:32.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "110",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 35,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBallCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a9c651fc2a50d846321108074868e14e8db9a9b4/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=35",
                    "catalogue_variants": [
                      {
                        "id": "59",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 59,
                          "catalogue_id": 35,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:26.638Z",
                          "updated_at": "2021-06-18T09:41:32.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 59,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 59,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "109",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 59,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBak1CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--83b7ae3da2a32e8e03930374646dae4fe443d247/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "60",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 60,
                          "catalogue_id": 35,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:27.384Z",
                          "updated_at": "2021-06-18T09:41:32.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 60,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 60,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "111",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 60,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBalVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7270f2461b3ae5c86c9ee43146bc4ad3f846d02e/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "61",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 61,
                          "catalogue_id": 35,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:27.973Z",
                          "updated_at": "2021-06-18T09:41:32.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 61,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 61,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "112",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 61,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBamNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--74c9a856e2852645aaf052daa52cf3e6cce57f7a/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "36",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 11",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU845",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 62,
                      "catalogue_id": 36,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:28.510Z",
                      "updated_at": "2021-06-18T09:41:19.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "114",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 36,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBandCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8834358d26880463c11b2d39b0f1438d3fd638c1/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=36",
                    "catalogue_variants": [
                      {
                        "id": "62",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 62,
                          "catalogue_id": 36,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:28.510Z",
                          "updated_at": "2021-06-18T09:41:19.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 62,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 62,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "113",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 62,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBamtCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--813dbdb9847978807dddbc649be5ede32429750d/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "63",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 63,
                          "catalogue_id": 36,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:29.208Z",
                          "updated_at": "2021-06-18T09:41:19.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 63,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 63,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "115",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 63,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f3c4e431afa12a4054287811c52f4dc5cbe5797a/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "64",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 64,
                          "catalogue_id": 36,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:29.732Z",
                          "updated_at": "2021-06-18T09:41:19.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 64,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 64,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "116",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 64,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBajBCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--73e8e2e95d316b03836739ce97ad657a59533520/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "26",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 1",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU835",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 32,
                      "catalogue_id": 26,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:10.876Z",
                      "updated_at": "2021-06-18T09:43:53.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "74",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 26,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ0FCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8b71b0b4a7c1ac5d2e68e112c22910186936e7c3/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=26",
                    "catalogue_variants": [
                      {
                        "id": "32",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 32,
                          "catalogue_id": 26,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:10.876Z",
                          "updated_at": "2021-06-18T09:43:53.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 32,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 32,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "73",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 32,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZjA9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--29b7b339e52f85561d3f5ace51faa43e8f1c1bc6/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "33",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 33,
                          "catalogue_id": 26,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:11.716Z",
                          "updated_at": "2021-06-18T09:43:53.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 33,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 33,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "75",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 33,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZjg9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4f45adb1cee58b813ae9595b8727e00cfdba48c8/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "34",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 34,
                          "catalogue_id": 26,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:12.275Z",
                          "updated_at": "2021-06-18T09:43:53.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 34,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 34,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "76",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 34,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ0VCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3f854c04aedef5d0b30548ea0ceeb615f8df7402/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "51",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 26",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 13000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU42",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 107,
                      "catalogue_id": 51,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "13000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:35:51.097Z",
                      "updated_at": "2021-06-22T16:09:09.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "174",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 51,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcFlCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--82d744d79b545bff720e22f5799750916538715d/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=51",
                    "catalogue_variants": [
                      {
                        "id": "107",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 107,
                          "catalogue_id": 51,
                          "price": "13000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:35:51.097Z",
                          "updated_at": "2021-06-22T16:09:09.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 107,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 107,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "173",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 107,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcElCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6d63c3f25e1733cab3d9bbb8a3260d2cfe2287aa/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "108",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 108,
                          "catalogue_id": 51,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:51.856Z",
                          "updated_at": "2021-06-22T16:09:09.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 108,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 108,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "175",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 108,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcFVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7f4808988bc411bf5a04e8b4b9d0d04cc548f889/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "109",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 109,
                          "catalogue_id": 51,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:52.475Z",
                          "updated_at": "2021-06-22T16:09:09.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 109,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 109,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "176",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 109,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcGNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4844fc1e145b84347f0533fee974bd1dc69ed460/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "27",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 2",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU836",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 35,
                      "catalogue_id": 27,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:12.774Z",
                      "updated_at": "2021-06-18T09:44:09.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "78",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 27,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ1lCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8bed4c20c442992cc3d24b2ce126f05589e247ab/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=27",
                    "catalogue_variants": [
                      {
                        "id": "35",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 35,
                          "catalogue_id": 27,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:12.774Z",
                          "updated_at": "2021-06-18T09:44:09.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 35,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 35,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "77",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 35,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ01CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6002f5f51eb1920edf98995a2e4666428db2634a/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "36",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 36,
                          "catalogue_id": 27,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:13.386Z",
                          "updated_at": "2021-06-18T09:44:09.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 36,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 36,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "79",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 36,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ1VCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--228f4c6c00c5fa43806c5dc6337c182ff9eff326/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "37",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 37,
                          "catalogue_id": 27,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:13.913Z",
                          "updated_at": "2021-06-18T09:44:09.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 37,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 37,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "80",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 37,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ2NCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--337e7b5a1d4dc65e0c84f28a166c7d3dd626f9c4/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "25",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU834",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 29,
                      "catalogue_id": 25,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:02:33.039Z",
                      "updated_at": "2021-06-18T09:43:20.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "70",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 25,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZm89IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--55c3a9b28daea76cf4f5b581ce06e5cf1b4f1cab/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=25",
                    "catalogue_variants": [
                      {
                        "id": "29",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 29,
                          "catalogue_id": 25,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:02:33.039Z",
                          "updated_at": "2021-06-18T09:43:20.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 29,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 29,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "69",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 29,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZmM9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8ee212d390cdf339216ff7641d6eabeff78e77a5/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "30",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 30,
                          "catalogue_id": 25,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:02:33.867Z",
                          "updated_at": "2021-06-18T09:43:20.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 30,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 30,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "71",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 30,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZms9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--98b56ab0767c135906287d932275c15a0ede27e8/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "31",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 31,
                          "catalogue_id": 25,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:02:34.440Z",
                          "updated_at": "2021-06-18T09:43:20.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 31,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 31,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "72",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 31,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZnM9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--42908bad15ea2cb5cc3cad76520abd06d245b76c/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "55",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 30",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": "15500.0",
                    "recommended": false,
                    "sku": "SKU46",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 119,
                      "catalogue_id": 55,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 3,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": "15500.0",
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:35:58.295Z",
                      "updated_at": "2021-06-22T14:25:08.546Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 14,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "190",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 55,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcTRCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2ef0be57656b9e782016aab11c9391841d484557/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=55",
                    "catalogue_variants": [
                      {
                        "id": "119",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 119,
                          "catalogue_id": 55,
                          "price": "16000.0",
                          "stock_qty": 3,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": "15500.0",
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:35:58.295Z",
                          "updated_at": "2021-06-22T14:25:08.546Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 119,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 119,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "189",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 119,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcW9CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2f4f59f2090ea17d3480010067c971485b85c741/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "120",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 120,
                          "catalogue_id": 55,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": "14500.0",
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:58.933Z",
                          "updated_at": "2021-06-18T09:35:58.933Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 120,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 120,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "191",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 120,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcTBCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9e075c077519bee58aa5a9d67ee85a82cd926088/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "121",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 121,
                          "catalogue_id": 55,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": "13500.0",
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:59.502Z",
                          "updated_at": "2021-06-18T09:35:59.502Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 121,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 121,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "192",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 121,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcThCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--49b824d06ca20eae8e226fbccc9c7e56d909a300/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      },
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      },
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      },
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "52",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 27",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU43",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 110,
                      "catalogue_id": 52,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:35:53.028Z",
                      "updated_at": "2021-06-22T16:11:08.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "178",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 52,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcHdCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--52fbd56cdab32e27910c4760ebd6ca38c9887689/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=52",
                    "catalogue_variants": [
                      {
                        "id": "110",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 110,
                          "catalogue_id": 52,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:35:53.028Z",
                          "updated_at": "2021-06-22T16:11:08.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 110,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 110,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "177",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 110,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcGdCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--13c491f657cb0bc5f418ee212d532d5a898edc21/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "111",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 111,
                          "catalogue_id": 52,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:53.684Z",
                          "updated_at": "2021-06-22T16:11:08.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 111,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 111,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "179",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 111,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcHNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4747ce70f56a27f001b0ddb44a289f97aa85a679/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "112",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 112,
                          "catalogue_id": 52,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:54.205Z",
                          "updated_at": "2021-06-22T16:11:08.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 112,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 112,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "180",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 112,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcDBCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b1c977443ca5f8713be590307a718c321e7b7be5/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "44",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 19",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU35",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 86,
                      "catalogue_id": 44,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:35:38.427Z",
                      "updated_at": "2021-06-22T16:01:49.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "146",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 44,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbXdCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bd013c23bd455bf955bb9e7c432ce9b9b92354fc/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=44",
                    "catalogue_variants": [
                      {
                        "id": "86",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 86,
                          "catalogue_id": 44,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:35:38.427Z",
                          "updated_at": "2021-06-22T16:01:49.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 86,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 86,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "145",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 86,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbWdCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a591b344f759b19e6643a21a08235c6736e12aec/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "87",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 87,
                          "catalogue_id": 44,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:39.087Z",
                          "updated_at": "2021-06-22T16:01:49.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 87,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 87,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "147",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 87,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbXNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c936097781bef3cc51409e2e71e0ceb4651e7288/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "88",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 88,
                          "catalogue_id": 44,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:39.666Z",
                          "updated_at": "2021-06-22T16:01:50.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 88,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 88,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "148",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 88,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbTBCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2b4a8664916dfd4043c2816958fc32dbcc856090/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "50",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 25",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": "15500.0",
                    "recommended": false,
                    "sku": "SKU41",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 104,
                      "catalogue_id": 50,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 3,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": "15500.0",
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:35:49.216Z",
                      "updated_at": "2021-06-22T10:23:58.824Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 14,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "170",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 50,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcEFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--97d6fe2e1fb1a49ae2ecf43de4bfd5b9ab71e24f/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=50",
                    "catalogue_variants": [
                      {
                        "id": "104",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 104,
                          "catalogue_id": 50,
                          "price": "16000.0",
                          "stock_qty": 3,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": "15500.0",
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:35:49.216Z",
                          "updated_at": "2021-06-22T10:23:58.824Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 104,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 104,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "169",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 104,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb3dCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--708fbf49208a0b044dad16b89541b17908e4a87a/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "105",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 105,
                          "catalogue_id": 50,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": "14500.0",
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:50.033Z",
                          "updated_at": "2021-06-18T09:35:50.033Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 105,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 105,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "171",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 105,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbzhCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6eaf541fd5596baaa723331d2c7a578d865d0a08/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "106",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 106,
                          "catalogue_id": 50,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": "13500.0",
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:35:50.621Z",
                          "updated_at": "2021-06-18T09:35:50.621Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 106,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 106,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "172",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 106,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcEVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d84ca65f7ceecc7d30de42ed54a18336eefd6289/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      },
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      },
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      },
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "37",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 12",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU846",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 65,
                      "catalogue_id": 37,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:30.193Z",
                      "updated_at": "2021-06-18T09:41:03.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "118",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 37,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0lCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--67a9566a373f20dea14463f707d985ce65e2b941/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=37",
                    "catalogue_variants": [
                      {
                        "id": "65",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 65,
                          "catalogue_id": 37,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:30.193Z",
                          "updated_at": "2021-06-18T09:41:03.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 65,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 65,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "117",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 65,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBajhCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--11f3f44371744dfc74d8ee319f930a153592cb74/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "66",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 66,
                          "catalogue_id": 37,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:30.838Z",
                          "updated_at": "2021-06-18T09:41:03.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 66,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 66,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "119",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 66,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0VCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a8ae24e7b72a7286f6224912e71cb9533b1d4e11/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "67",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 67,
                          "catalogue_id": 37,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:31.403Z",
                          "updated_at": "2021-06-18T09:41:03.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 67,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 67,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "120",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 67,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa01CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2085485bff91ea4d24e68826c08b360905673ca1/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "30",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 5",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU839",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 44,
                      "catalogue_id": 30,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:17.947Z",
                      "updated_at": "2021-06-18T09:40:45.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "90",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 30,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaGdCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--52ed4741077b8f51705bb92e9e72bf640124e403/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=30",
                    "catalogue_variants": [
                      {
                        "id": "44",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 44,
                          "catalogue_id": 30,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:17.947Z",
                          "updated_at": "2021-06-18T09:40:45.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 44,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 44,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "89",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 44,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaFVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9fe9230b04974ba7cd6bbb1cb16eddecb344fb6d/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "45",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 45,
                          "catalogue_id": 30,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:18.590Z",
                          "updated_at": "2021-06-18T09:40:45.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 45,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 45,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "91",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 45,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaGNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--406e8c4a52bd6bcc191a2c234f0613151e3d1363/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "46",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 46,
                          "catalogue_id": 30,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:19.114Z",
                          "updated_at": "2021-06-18T09:40:45.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 46,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 46,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "92",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 46,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaGtCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--53206aedf7bea48eb78cb1e7d60d808627692c77/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "28",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 3",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU837",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 38,
                      "catalogue_id": 28,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:14.354Z",
                      "updated_at": "2021-06-18T09:52:14.000Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "82",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 28,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ3dCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c9c5ce1346023d66cee4bd4839717391a88a19b8/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=28",
                    "catalogue_variants": [
                      {
                        "id": "38",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 38,
                          "catalogue_id": 28,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:14.354Z",
                          "updated_at": "2021-06-18T09:52:14.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 38,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 38,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "81",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 38,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ2tCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0dc2722d0f1ae9e76a124d9e1f33773b1b0aca26/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "39",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 39,
                          "catalogue_id": 28,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:15.004Z",
                          "updated_at": "2021-06-18T09:52:14.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 39,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 39,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "83",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 39,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ3NCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b1aeb3b30f66faa3f9efe12d2fd9f7348cfb45ee/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "40",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 40,
                          "catalogue_id": 28,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:15.542Z",
                          "updated_at": "2021-06-18T09:52:14.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 40,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 40,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "84",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 40,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZzBCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--acf1e989abdef8924e163e4ad4eaaa73c89a4d65/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "31",
                  "type": "catalogue",
                  "attributes": {
                    "name": "ABC 6",
                    "description": "acer description",
                    "manufacture_date": "0026-02-21T00:00:00.000Z",
                    "block_qty": 1,
                    "price": 16000,
                    "on_sale": false,
                    "sale_price": null,
                    "discount": null,
                    "recommended": false,
                    "sku": "SKU840",
                    "length": 12,
                    "breadth": 13,
                    "height": 14,
                    "weight": "10.0",
                    "brand": {
                      "id": 1,
                      "name": "Brand 1",
                      "created_at": "2021-05-28T06:40:16.184Z",
                      "updated_at": "2021-05-28T06:40:16.184Z"
                    },
                    "tags": [],
                    "reviews": [],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 47,
                      "catalogue_id": 31,
                      "catalogue_variant_color_id": 3,
                      "catalogue_variant_size_id": 3,
                      "price": "16000.0",
                      "stock_qty": 4,
                      "on_sale": false,
                      "sale_price": null,
                      "discount_price": null,
                      "length": 12,
                      "breadth": 13,
                      "height": 14,
                      "created_at": "2021-06-18T09:08:19.687Z",
                      "updated_at": "2021-06-21T13:11:41.285Z",
                      "block_qty": 2,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 15,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 0,
                    "images": {
                      "data": [
                        {
                          "id": "94",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 31,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaDRCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b690441628ea3999f3985e9acba0a18dcd19065d/ABC0.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 3,
                            "name": "Red",
                            "created_at": "2021-06-11T08:41:34.330Z",
                            "updated_at": "2021-06-23T11:02:11.213Z"
                          },
                          {
                            "id": 5,
                            "name": "Orange",
                            "created_at": "2021-06-18T09:02:33.631Z",
                            "updated_at": "2021-06-23T11:01:54.740Z"
                          },
                          {
                            "id": 6,
                            "name": "Grey",
                            "created_at": "2021-06-18T09:02:34.203Z",
                            "updated_at": "2021-06-23T11:02:34.880Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 3,
                            "name": "S",
                            "created_at": "2021-06-11T08:41:34.341Z",
                            "updated_at": "2021-06-11T08:41:34.341Z"
                          },
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          3,
                          5,
                          6
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          3,
                          2,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=31",
                    "catalogue_variants": [
                      {
                        "id": "47",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 47,
                          "catalogue_id": 31,
                          "price": "16000.0",
                          "stock_qty": 4,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": true,
                          "created_at": "2021-06-18T09:08:19.687Z",
                          "updated_at": "2021-06-21T13:11:41.285Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 47,
                              "variant_property_id": 3,
                              "variant_name": "size",
                              "property_name": "S"
                            },
                            {
                              "product_variant_id": 47,
                              "variant_property_id": 3,
                              "variant_name": "color",
                              "property_name": "Red"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "93",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 47,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaHNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7d8dedbfc115185fcfe2d1b71ec0b808d031387a/ABCred0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "48",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 48,
                          "catalogue_id": 31,
                          "price": "15000.0",
                          "stock_qty": 5,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:20.313Z",
                          "updated_at": "2021-06-18T09:42:33.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 48,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 48,
                              "variant_property_id": 5,
                              "variant_name": "color",
                              "property_name": "Orange"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "95",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 48,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaDBCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a6b1d5568f3bb2bec216ef1cdd381d8234003a9f/ABCwhite0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "49",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 49,
                          "catalogue_id": 31,
                          "price": "14000.0",
                          "stock_qty": 6,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": 12,
                          "breadth": 13,
                          "height": 14,
                          "is_default": false,
                          "created_at": "2021-06-18T09:08:20.821Z",
                          "updated_at": "2021-06-21T13:11:41.310Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 49,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 49,
                              "variant_property_id": 6,
                              "variant_name": "color",
                              "property_name": "Grey"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "96",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 49,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaDhCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2f3d51de0afade2a5ac1a8eaf49009c6becffeeb/ABCblack0.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "5",
                  "type": "catalogue",
                  "attributes": {
                    "name": "Product 5",
                    "description": "",
                    "manufacture_date": null,
                    "block_qty": 6,
                    "price": 3500,
                    "on_sale": true,
                    "sale_price": "3200.0",
                    "discount": "8.57",
                    "recommended": true,
                    "sku": "COD0000005",
                    "length": null,
                    "breadth": null,
                    "height": null,
                    "weight": "1.0",
                    "brand": {
                      "id": 2,
                      "name": "Brand 2",
                      "created_at": "2021-05-28T06:40:25.984Z",
                      "updated_at": "2021-05-28T06:40:25.984Z"
                    },
                    "tags": [],
                    "reviews": [
                      {
                        "id": "24",
                        "type": "review",
                        "attributes": {
                          "id": 24,
                          "catalogue_id": 5,
                          "rating": 4,
                          "comment": "Hey",
                          "created_at": "2021-06-23T12:35:36.083Z",
                          "updated_at": "2021-06-23T12:35:53.141Z",
                          "account_id": 362,
                          "order_id": null,
                          "account": {
                            "activated": true,
                            "full_name": "mayuri sharma",
                            "user_name": null,
                            "email": "ms53@yopmail.com",
                            "full_phone_number": "75273601736",
                            "phone_number": null,
                            "type": "EmailAccount",
                            "created_at": "2021-06-23T12:03:55.563Z",
                            "updated_at": "2021-06-23T12:32:57.628Z",
                            "device_id": null,
                            "provider": null,
                            "unique_auth_id": null,
                            "guest": null,
                            "uuid": null,
                            "is_notification_enabled": true,
                            "fcm_token": "eWUy4GgZR3Wy2cA_aTxDA_:APA91bGj6ReRgcWaF6nbSNvREdrVWoIl6iTdIZl-EtgAtZnaCcXhLWn39Fdn0Obk7zKzF7hWRtZtXfMDazQccQ96zd_jfMAEQl6w-M9T--eekNhfIMIW00aU4yRFcrMcWrtYg56H3_LH",
                            "country_code": null,
                            "image_url": "https://minio.b67852.dev.centralindia.az.svc.builder.ai/sbucket/zzkrqu07rj51hg6vr1cmxh5a7ruk?response-content-disposition=inline%3B%20filename%3D%22profile_pic.jpeg%22%3B%20filename%2A%3DUTF-8%27%27profile_pic.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20210711%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20210711T040625Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7ade015f708a0df6a5e511c929b5f95fe8ea0a6b7606817978cbb1e41f77b45f",
                            "is_social_login": false,
                            "wishlist_quantity": 2
                          },
                          "review_date": "23 Jun 2021",
                          "review_datetime": "Wed, 23rd June 2021 - 06:05 PM",
                          "product_name": "Product 5",
                          "user_name": "mayuri sharma"
                        }
                      },
                      {
                        "id": "20",
                        "type": "review",
                        "attributes": {
                          "id": 20,
                          "catalogue_id": 5,
                          "rating": 1,
                          "comment": "Hey ",
                          "created_at": "2021-06-22T12:32:58.370Z",
                          "updated_at": "2021-06-23T10:10:05.043Z",
                          "account_id": 52,
                          "order_id": null,
                          "account": {
                            "activated": true,
                            "full_name": "mayuri sharma",
                            "user_name": null,
                            "email": "mayurisharma5996@gmail.com",
                            "full_phone_number": "",
                            "phone_number": null,
                            "type": "EmailAccount",
                            "created_at": "2021-06-02T06:43:20.040Z",
                            "updated_at": "2021-06-23T12:13:20.380Z",
                            "device_id": null,
                            "provider": "google",
                            "unique_auth_id": null,
                            "guest": null,
                            "uuid": null,
                            "is_notification_enabled": true,
                            "fcm_token": "eWUy4GgZR3Wy2cA_aTxDA_:APA91bGj6ReRgcWaF6nbSNvREdrVWoIl6iTdIZl-EtgAtZnaCcXhLWn39Fdn0Obk7zKzF7hWRtZtXfMDazQccQ96zd_jfMAEQl6w-M9T--eekNhfIMIW00aU4yRFcrMcWrtYg56H3_LH",
                            "country_code": null,
                            "image_url": "https://minio.b67852.dev.centralindia.az.svc.builder.ai/sbucket/5u5lmmvlex7xlqmurmp3jh6jbjph?response-content-disposition=inline%3B%20filename%3D%22AOh14GhcHe_qRFbFplXlJSugs3IQjoNwm1Rpk1mATFtj5w%253Ds96-c%22%3B%20filename%2A%3DUTF-8%27%27AOh14GhcHe_qRFbFplXlJSugs3IQjoNwm1Rpk1mATFtj5w%253Ds96-c&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20210711%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20210711T040626Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=d25caeac6b08b84159fe14f57ccd5cf5576798a7644d715bfc6043804adce4dd",
                            "is_social_login": true,
                            "wishlist_quantity": 0
                          },
                          "review_date": "22 Jun 2021",
                          "review_datetime": "Tue, 22nd June 2021 - 06:02 PM",
                          "product_name": "Product 5",
                          "user_name": "mayuri sharma"
                        }
                      },
                      {
                        "id": "19",
                        "type": "review",
                        "attributes": {
                          "id": 19,
                          "catalogue_id": 5,
                          "rating": 3,
                          "comment": "Testing ",
                          "created_at": "2021-06-22T12:24:08.344Z",
                          "updated_at": "2021-06-23T10:10:05.051Z",
                          "account_id": 52,
                          "order_id": null,
                          "account": {
                            "activated": true,
                            "full_name": "mayuri sharma",
                            "user_name": null,
                            "email": "mayurisharma5996@gmail.com",
                            "full_phone_number": "",
                            "phone_number": null,
                            "type": "EmailAccount",
                            "created_at": "2021-06-02T06:43:20.040Z",
                            "updated_at": "2021-06-23T12:13:20.380Z",
                            "device_id": null,
                            "provider": "google",
                            "unique_auth_id": null,
                            "guest": null,
                            "uuid": null,
                            "is_notification_enabled": true,
                            "fcm_token": "eWUy4GgZR3Wy2cA_aTxDA_:APA91bGj6ReRgcWaF6nbSNvREdrVWoIl6iTdIZl-EtgAtZnaCcXhLWn39Fdn0Obk7zKzF7hWRtZtXfMDazQccQ96zd_jfMAEQl6w-M9T--eekNhfIMIW00aU4yRFcrMcWrtYg56H3_LH",
                            "country_code": null,
                            "image_url": "https://minio.b67852.dev.centralindia.az.svc.builder.ai/sbucket/5u5lmmvlex7xlqmurmp3jh6jbjph?response-content-disposition=inline%3B%20filename%3D%22AOh14GhcHe_qRFbFplXlJSugs3IQjoNwm1Rpk1mATFtj5w%253Ds96-c%22%3B%20filename%2A%3DUTF-8%27%27AOh14GhcHe_qRFbFplXlJSugs3IQjoNwm1Rpk1mATFtj5w%253Ds96-c&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20210711%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20210711T040626Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=d25caeac6b08b84159fe14f57ccd5cf5576798a7644d715bfc6043804adce4dd",
                            "is_social_login": true,
                            "wishlist_quantity": 0
                          },
                          "review_date": "22 Jun 2021",
                          "review_datetime": "Tue, 22nd June 2021 - 05:54 PM",
                          "product_name": "Product 5",
                          "user_name": "mayuri sharma"
                        }
                      },
                      {
                        "id": "17",
                        "type": "review",
                        "attributes": {
                          "id": 17,
                          "catalogue_id": 5,
                          "rating": 4,
                          "comment": "Woowwwwwwww",
                          "created_at": "2021-06-21T13:05:38.131Z",
                          "updated_at": "2021-06-21T13:06:17.368Z",
                          "account_id": 267,
                          "order_id": null,
                          "account": {
                            "activated": true,
                            "full_name": "mayuri s",
                            "user_name": null,
                            "email": "ms40@yopmail.com",
                            "full_phone_number": "36912345679",
                            "phone_number": null,
                            "type": "EmailAccount",
                            "created_at": "2021-06-21T12:47:32.835Z",
                            "updated_at": "2021-06-21T12:56:17.671Z",
                            "device_id": null,
                            "provider": null,
                            "unique_auth_id": null,
                            "guest": null,
                            "uuid": null,
                            "is_notification_enabled": true,
                            "fcm_token": "cOghC3DNS4e6wFa1PLz5xk:APA91bF5jln06nqX-kg0bZgbunZVvwtJaFshYJzKE0QMPc-yqsJRbVp5Glxj3xRS1XRfTF-kVbzt7j6T77VOqHTc27md8QZGhRSpyLUGWbQ470EaN8EO0flVrU-F3Hv1NBIUXXKXX1YM",
                            "country_code": null,
                            "image_url": "https://minio.b67852.dev.centralindia.az.svc.builder.ai/sbucket/978ngxoxtf7ddy6r1i4j42mn3axn?response-content-disposition=inline%3B%20filename%3D%22profile_pic.jpeg%22%3B%20filename%2A%3DUTF-8%27%27profile_pic.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20210711%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20210711T040626Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=db3dbe82429eb28912c70fd2bb888aa09c59d26072340fe9ee521db61b2121aa",
                            "is_social_login": false,
                            "wishlist_quantity": 0
                          },
                          "review_date": "21 Jun 2021",
                          "review_datetime": "Mon, 21st June 2021 - 06:35 PM",
                          "product_name": "Product 5",
                          "user_name": "mayuri s"
                        }
                      },
                      {
                        "id": "11",
                        "type": "review",
                        "attributes": {
                          "id": 11,
                          "catalogue_id": 5,
                          "rating": 4,
                          "comment": "Wohoooo",
                          "created_at": "2021-06-15T10:50:24.295Z",
                          "updated_at": "2021-06-15T10:50:51.038Z",
                          "account_id": 133,
                          "order_id": null,
                          "account": {
                            "activated": true,
                            "full_name": "mayuri R sharma",
                            "user_name": null,
                            "email": "ms36@yopmail.com",
                            "full_phone_number": "7415267288",
                            "phone_number": null,
                            "type": "EmailAccount",
                            "created_at": "2021-06-15T10:36:43.158Z",
                            "updated_at": "2021-06-15T11:50:16.609Z",
                            "device_id": null,
                            "provider": null,
                            "unique_auth_id": null,
                            "guest": null,
                            "uuid": null,
                            "is_notification_enabled": true,
                            "fcm_token": null,
                            "country_code": null,
                            "image_url": "https://minio.b67852.dev.centralindia.az.svc.builder.ai/sbucket/8fyx5hknjulg1fw6klxa5lexg1gb?response-content-disposition=inline%3B%20filename%3D%22profile_pic.jpeg%22%3B%20filename%2A%3DUTF-8%27%27profile_pic.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20210711%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20210711T040626Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=2f9627a01bc5485020399b73baf72d2290947ac5780e4963a11d3dd1b3f2c8b2",
                            "is_social_login": false,
                            "wishlist_quantity": 0
                          },
                          "review_date": "15 Jun 2021",
                          "review_datetime": "Tue, 15th June 2021 - 04:20 PM",
                          "product_name": "Product 5",
                          "user_name": "mayuri R sharma"
                        }
                      },
                      {
                        "id": "10",
                        "type": "review",
                        "attributes": {
                          "id": 10,
                          "catalogue_id": 5,
                          "rating": 1,
                          "comment": "Ewwwww\nBad one\nDidn't like at all ",
                          "created_at": "2021-06-15T10:50:14.742Z",
                          "updated_at": "2021-06-15T10:50:51.043Z",
                          "account_id": 133,
                          "order_id": null,
                          "account": {
                            "activated": true,
                            "full_name": "mayuri R sharma",
                            "user_name": null,
                            "email": "ms36@yopmail.com",
                            "full_phone_number": "7415267288",
                            "phone_number": null,
                            "type": "EmailAccount",
                            "created_at": "2021-06-15T10:36:43.158Z",
                            "updated_at": "2021-06-15T11:50:16.609Z",
                            "device_id": null,
                            "provider": null,
                            "unique_auth_id": null,
                            "guest": null,
                            "uuid": null,
                            "is_notification_enabled": true,
                            "fcm_token": null,
                            "country_code": null,
                            "image_url": "https://minio.b67852.dev.centralindia.az.svc.builder.ai/sbucket/8fyx5hknjulg1fw6klxa5lexg1gb?response-content-disposition=inline%3B%20filename%3D%22profile_pic.jpeg%22%3B%20filename%2A%3DUTF-8%27%27profile_pic.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20210711%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20210711T040626Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=2f9627a01bc5485020399b73baf72d2290947ac5780e4963a11d3dd1b3f2c8b2",
                            "is_social_login": false,
                            "wishlist_quantity": 0
                          },
                          "review_date": "15 Jun 2021",
                          "review_datetime": "Tue, 15th June 2021 - 04:20 PM",
                          "product_name": "Product 5",
                          "user_name": "mayuri R sharma"
                        }
                      },
                      {
                        "id": "6",
                        "type": "review",
                        "attributes": {
                          "id": 6,
                          "catalogue_id": 5,
                          "rating": 3,
                          "comment": "Quite nice ",
                          "created_at": "2021-06-14T05:56:25.304Z",
                          "updated_at": "2021-06-14T05:56:38.491Z",
                          "account_id": 6,
                          "order_id": null,
                          "account": {
                            "activated": true,
                            "full_name": "Ma",
                            "user_name": null,
                            "email": "msd25@yopmail.com",
                            "full_phone_number": "1234567891",
                            "phone_number": null,
                            "type": "EmailAccount",
                            "created_at": "2021-05-28T11:28:27.354Z",
                            "updated_at": "2021-06-21T06:44:57.980Z",
                            "device_id": null,
                            "provider": null,
                            "unique_auth_id": null,
                            "guest": null,
                            "uuid": null,
                            "is_notification_enabled": true,
                            "fcm_token": "c1yiEuTCTJKlMA82tid1dL:APA91bFy48nS_9aydocvTJn94T9BmG_51ztK9oWHUwUio7PbMmges6GibXM6xh_clFIkZ90H4n4MQrT1QqWk7PIzzbmL5ZeNxneRzJ5yfIb2U4xze5FlMS8Xmd0ORUUYeNnUgBC_kuGD",
                            "country_code": null,
                            "image_url": "https://minio.b67852.dev.centralindia.az.svc.builder.ai/sbucket/pec2pxngbvxqtd874dsp79bfm8eb?response-content-disposition=inline%3B%20filename%3D%22profile_pic.jpeg%22%3B%20filename%2A%3DUTF-8%27%27profile_pic.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20210711%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20210711T040626Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=733ee61633ea753a9d820b99be1df4235678f40f4975011165cc24a6be6c67f2",
                            "is_social_login": false,
                            "wishlist_quantity": 1
                          },
                          "review_date": "14 Jun 2021",
                          "review_datetime": "Mon, 14th June 2021 - 11:26 AM",
                          "product_name": "Product 5",
                          "user_name": "Ma"
                        }
                      },
                      {
                        "id": "5",
                        "type": "review",
                        "attributes": {
                          "id": 5,
                          "catalogue_id": 5,
                          "rating": 3,
                          "comment": "Testing",
                          "created_at": "2021-06-02T06:16:58.869Z",
                          "updated_at": "2021-06-02T06:17:30.330Z",
                          "account_id": 48,
                          "order_id": null,
                          "account": {
                            "activated": true,
                            "full_name": "mayuri",
                            "user_name": null,
                            "email": "msd20@yopmail.com",
                            "full_phone_number": "9479838237",
                            "phone_number": null,
                            "type": "EmailAccount",
                            "created_at": "2021-06-02T06:01:29.683Z",
                            "updated_at": "2021-06-02T06:15:26.733Z",
                            "device_id": null,
                            "provider": null,
                            "unique_auth_id": null,
                            "guest": null,
                            "uuid": null,
                            "is_notification_enabled": true,
                            "fcm_token": null,
                            "country_code": null,
                            "image_url": "https://minio.b67852.dev.centralindia.az.svc.builder.ai/sbucket/flneaoa4vsvnltn4pj0z0ll2ryhy?response-content-disposition=inline%3B%20filename%3D%22profile_pic.jpeg%22%3B%20filename%2A%3DUTF-8%27%27profile_pic.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20210711%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20210711T040626Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=628a9b6a05eda390131517634e001196d9e964a296ec9612ec90fdd56beb08f1",
                            "is_social_login": true,
                            "wishlist_quantity": 0
                          },
                          "review_date": "02 Jun 2021",
                          "review_datetime": "Wed, 2nd June 2021 - 11:46 AM",
                          "product_name": "Product 5",
                          "user_name": "mayuri"
                        }
                      },
                      {
                        "id": "4",
                        "type": "review",
                        "attributes": {
                          "id": 4,
                          "catalogue_id": 5,
                          "rating": 2,
                          "comment": "Awful",
                          "created_at": "2021-06-02T05:04:56.765Z",
                          "updated_at": "2021-06-02T05:07:23.862Z",
                          "account_id": 38,
                          "order_id": null,
                          "account": {
                            "activated": true,
                            "full_name": "mayuri sharma",
                            "user_name": null,
                            "email": "msd19@yopmail.com",
                            "full_phone_number": "7415267288",
                            "phone_number": null,
                            "type": "EmailAccount",
                            "created_at": "2021-06-02T04:46:26.721Z",
                            "updated_at": "2021-06-02T05:03:14.801Z",
                            "device_id": null,
                            "provider": null,
                            "unique_auth_id": null,
                            "guest": null,
                            "uuid": null,
                            "is_notification_enabled": true,
                            "fcm_token": null,
                            "country_code": null,
                            "image_url": "https://minio.b67852.dev.centralindia.az.svc.builder.ai/sbucket/v8f5shd2q2lswnwo9mpxbmn09e6v?response-content-disposition=inline%3B%20filename%3D%22profile_pic.jpeg%22%3B%20filename%2A%3DUTF-8%27%27profile_pic.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20210711%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20210711T040626Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=e57895ffad07b6b6704eac240b3535125b114f0eb4e3fd7876b90ae2f637281f",
                            "is_social_login": false,
                            "wishlist_quantity": 0
                          },
                          "review_date": "02 Jun 2021",
                          "review_datetime": "Wed, 2nd June 2021 - 10:34 AM",
                          "product_name": "Product 5",
                          "user_name": "mayuri sharma"
                        }
                      },
                      {
                        "id": "3",
                        "type": "review",
                        "attributes": {
                          "id": 3,
                          "catalogue_id": 5,
                          "rating": 1,
                          "comment": "Worst one",
                          "created_at": "2021-06-02T05:04:47.167Z",
                          "updated_at": "2021-06-02T05:07:23.870Z",
                          "account_id": 38,
                          "order_id": null,
                          "account": {
                            "activated": true,
                            "full_name": "mayuri sharma",
                            "user_name": null,
                            "email": "msd19@yopmail.com",
                            "full_phone_number": "7415267288",
                            "phone_number": null,
                            "type": "EmailAccount",
                            "created_at": "2021-06-02T04:46:26.721Z",
                            "updated_at": "2021-06-02T05:03:14.801Z",
                            "device_id": null,
                            "provider": null,
                            "unique_auth_id": null,
                            "guest": null,
                            "uuid": null,
                            "is_notification_enabled": true,
                            "fcm_token": null,
                            "country_code": null,
                            "image_url": "https://minio.b67852.dev.centralindia.az.svc.builder.ai/sbucket/v8f5shd2q2lswnwo9mpxbmn09e6v?response-content-disposition=inline%3B%20filename%3D%22profile_pic.jpeg%22%3B%20filename%2A%3DUTF-8%27%27profile_pic.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20210711%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20210711T040626Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=e57895ffad07b6b6704eac240b3535125b114f0eb4e3fd7876b90ae2f637281f",
                            "is_social_login": false,
                            "wishlist_quantity": 0
                          },
                          "review_date": "02 Jun 2021",
                          "review_datetime": "Wed, 2nd June 2021 - 10:34 AM",
                          "product_name": "Product 5",
                          "user_name": "mayuri sharma"
                        }
                      },
                      {
                        "id": "2",
                        "type": "review",
                        "attributes": {
                          "id": 2,
                          "catalogue_id": 5,
                          "rating": 4,
                          "comment": "Really loved the product",
                          "created_at": "2021-06-02T04:59:53.725Z",
                          "updated_at": "2021-06-02T05:07:23.878Z",
                          "account_id": 38,
                          "order_id": null,
                          "account": {
                            "activated": true,
                            "full_name": "mayuri sharma",
                            "user_name": null,
                            "email": "msd19@yopmail.com",
                            "full_phone_number": "7415267288",
                            "phone_number": null,
                            "type": "EmailAccount",
                            "created_at": "2021-06-02T04:46:26.721Z",
                            "updated_at": "2021-06-02T05:03:14.801Z",
                            "device_id": null,
                            "provider": null,
                            "unique_auth_id": null,
                            "guest": null,
                            "uuid": null,
                            "is_notification_enabled": true,
                            "fcm_token": null,
                            "country_code": null,
                            "image_url": "https://minio.b67852.dev.centralindia.az.svc.builder.ai/sbucket/v8f5shd2q2lswnwo9mpxbmn09e6v?response-content-disposition=inline%3B%20filename%3D%22profile_pic.jpeg%22%3B%20filename%2A%3DUTF-8%27%27profile_pic.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20210711%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20210711T040626Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=e57895ffad07b6b6704eac240b3535125b114f0eb4e3fd7876b90ae2f637281f",
                            "is_social_login": false,
                            "wishlist_quantity": 0
                          },
                          "review_date": "02 Jun 2021",
                          "review_datetime": "Wed, 2nd June 2021 - 10:29 AM",
                          "product_name": "Product 5",
                          "user_name": "mayuri sharma"
                        }
                      }
                    ],
                    "current_availibility": "in_stock",
                    "default_variant": {
                      "id": 5,
                      "catalogue_id": 5,
                      "catalogue_variant_color_id": 1,
                      "catalogue_variant_size_id": 2,
                      "price": "3500.0",
                      "stock_qty": 95,
                      "on_sale": true,
                      "sale_price": "3200.0",
                      "discount_price": "8.57",
                      "length": null,
                      "breadth": null,
                      "height": null,
                      "created_at": "2021-05-28T06:53:39.826Z",
                      "updated_at": "2021-06-23T12:31:18.062Z",
                      "block_qty": 6,
                      "is_default": true,
                      "sold": null,
                      "current_availability": "in_stock",
                      "remaining_stock": null
                    },
                    "stock_qty": 95,
                    "cart_quantity": null,
                    "wishlisted": false,
                    "product_notified": false,
                    "cart_items": {},
                    "average_rating": 2.5,
                    "images": {
                      "data": [
                        {
                          "id": "18",
                          "type": "attachment",
                          "attributes": {
                            "attachable_type": "BxBlockCatalogue::Catalogue",
                            "attachable_id": 5,
                            "position": null,
                            "is_default": true,
                            "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBaZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--254ab18bbf690cb266ba2d07579829f978fd418e/FoodIMages1.jpg",
                            "url_link": null,
                            "is_present?": false,
                            "url_id": null,
                            "url_type": null
                          }
                        }
                      ]
                    },
                    "product_attributes": [
                      {
                        "color": [
                          {
                            "id": 1,
                            "name": "Black",
                            "created_at": "2021-05-28T06:39:46.647Z",
                            "updated_at": "2021-05-28T06:39:46.647Z"
                          },
                          {
                            "id": 2,
                            "name": "White",
                            "created_at": "2021-05-28T06:39:54.069Z",
                            "updated_at": "2021-05-28T06:39:54.069Z"
                          }
                        ],
                        "size": [
                          {
                            "id": 2,
                            "name": "M",
                            "created_at": "2021-05-28T06:40:08.421Z",
                            "updated_at": "2021-05-28T06:40:08.421Z"
                          },
                          {
                            "id": 1,
                            "name": "L",
                            "created_at": "2021-05-28T06:40:00.139Z",
                            "updated_at": "2021-05-28T06:40:00.139Z"
                          }
                        ]
                      }
                    ],
                    "availability": [
                      {
                        "variant_name": "color",
                        "variant_property_ids": [
                          1,
                          1,
                          2
                        ]
                      },
                      {
                        "variant_name": "size",
                        "variant_property_ids": [
                          2,
                          1,
                          1
                        ]
                      }
                    ],
                    "deep_link": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//share/share/dl?catalogue_id=5",
                    "catalogue_variants": [
                      {
                        "id": "5",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 5,
                          "catalogue_id": 5,
                          "price": "3500.0",
                          "stock_qty": 95,
                          "on_sale": true,
                          "sale_price": "3200.0",
                          "discount_price": "8.57",
                          "length": null,
                          "breadth": null,
                          "height": null,
                          "is_default": true,
                          "created_at": "2021-05-28T06:53:39.826Z",
                          "updated_at": "2021-06-23T12:31:18.062Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 5,
                              "variant_property_id": 2,
                              "variant_name": "size",
                              "property_name": "M"
                            },
                            {
                              "product_variant_id": 5,
                              "variant_property_id": 1,
                              "variant_name": "color",
                              "property_name": "Black"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "14",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 5,
                                  "position": null,
                                  "is_default": false,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBZUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b97f0f3b25d01624974ff3006bc10d8f5b12d404/FoodIMages2.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              },
                              {
                                "id": "15",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 5,
                                  "position": null,
                                  "is_default": false,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBZZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1de8f72064c01de5007439c92026fe47c49e31c5/FoodIMages3.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              },
                              {
                                "id": "16",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 5,
                                  "position": null,
                                  "is_default": false,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBZdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--300ce4bc129fa74b5cf5001dce1e742a7a909889/FoodIMages3.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              },
                              {
                                "id": "17",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 5,
                                  "position": null,
                                  "is_default": false,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBaQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c5148303fbc64edba1f1606d9eab8742c6c42f72/FoodIMages.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              },
                              {
                                "id": "44",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 5,
                                  "position": null,
                                  "is_default": false,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBYUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--074faafdeb367e9daecd2d4452dcbb8bf165288d/FoodIMages2.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              },
                              {
                                "id": "45",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 5,
                                  "position": null,
                                  "is_default": false,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBYZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--11df22551cfba208e8caeaa80ff9412ee81d08b7/FoodIMages3.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              },
                              {
                                "id": "12",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 5,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBYdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--374d55a28bb165e92e1472f83da7c66af4c56139/FoodIMages2.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              },
                              {
                                "id": "13",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 5,
                                  "position": null,
                                  "is_default": false,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBZQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7945ae44beab36a32cb4ba7f75205eadf12f3385/FoodIMages3.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "6",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 6,
                          "catalogue_id": 5,
                          "price": "3100.0",
                          "stock_qty": 0,
                          "on_sale": false,
                          "sale_price": null,
                          "discount_price": null,
                          "length": null,
                          "breadth": null,
                          "height": null,
                          "is_default": false,
                          "created_at": "2021-05-28T06:53:39.971Z",
                          "updated_at": "2021-06-17T06:31:45.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 6,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 6,
                              "variant_property_id": 1,
                              "variant_name": "color",
                              "property_name": "Black"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "19",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 6,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBYQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2409d66119f9cad9515f8ecc71ac86b07b356c47/FoodIMages3.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      },
                      {
                        "id": "7",
                        "type": "catalogue_variant",
                        "attributes": {
                          "id": 7,
                          "catalogue_id": 5,
                          "price": "2900.0",
                          "stock_qty": 0,
                          "on_sale": true,
                          "sale_price": "2750.0",
                          "discount_price": "5.17",
                          "length": null,
                          "breadth": null,
                          "height": null,
                          "is_default": false,
                          "created_at": "2021-05-28T06:53:39.989Z",
                          "updated_at": "2021-06-17T06:31:45.000Z",
                          "product_variant_properties": [
                            {
                              "product_variant_id": 7,
                              "variant_property_id": 1,
                              "variant_name": "size",
                              "property_name": "L"
                            },
                            {
                              "product_variant_id": 7,
                              "variant_property_id": 2,
                              "variant_name": "color",
                              "property_name": "White"
                            }
                          ],
                          "images": {
                            "data": [
                              {
                                "id": "20",
                                "type": "attachment",
                                "attributes": {
                                  "attachable_type": "BxBlockCatalogue::CatalogueVariant",
                                  "attachable_id": 7,
                                  "position": null,
                                  "is_default": true,
                                  "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBaUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d0cfe921feb47895aa129f35827cd5797661fb63/FoodIMages1.jpg",
                                  "url_link": null,
                                  "is_present?": false,
                                  "url_id": null,
                                  "url_type": null
                                }
                              }
                            ]
                          },
                          "cart_quantity": null,
                          "is_notify_product": false
                        }
                      }
                    ],
                    "variants_in_cart": [],
                    "can_review": false,
                    "similar_products": [],
                    "category": [
                      {
                        "data": {
                          "id": "1",
                          "type": "category",
                          "attributes": {
                            "id": 1,
                            "name": "Category 1",
                            "created_at": "2021-05-28T06:40:50.531Z",
                            "updated_at": "2021-06-18T05:51:51.575Z",
                            "product_image": {
                              "id": 110,
                              "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            },
            "category": [
              {
                "data": {
                  "id": "1",
                  "type": "category",
                  "attributes": {
                    "id": 1,
                    "name": "Category 1",
                    "created_at": "2021-05-28T06:40:50.531Z",
                    "updated_at": "2021-06-18T05:51:51.575Z",
                    "product_image": {
                      "id": 110,
                      "url": "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c75d32c87ea5dcde35c280af209c3bed07752c51/FoodIMages.jpg"
                    }
                  }
                }
              }
            ]
          }
        }
      }
      )
      instance.getProductDetailsApiCallId = apiProdutInfoMsg.messageId;
      apiProdutInfoMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiProdutInfoMsg.messageId);
      runEngine.sendMessage("Unit Test3", apiProdutInfoMsg);

      expect(productDetailsWrapper).toBeTruthy();


    });

    then("productDetails will display notifcation if no messages", () => {
      const apiNoItemsMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiNoItemsMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data:[]})
      runEngine.sendMessage("Unit Test", apiNoItemsMsg);
      expect(productDetailsWrapper).toBeTruthy();

    });

    then("productDetails will display notifcation if API failure", () => {
      const apiNoItemsMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiNoItemsMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data:[]})
      runEngine.sendMessage("Unit Test", apiNoItemsMsg);

      const apiErrorResponceMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiErrorResponceMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {errors:"Error"})
      runEngine.sendMessage("Unit Test", apiErrorResponceMsg);

      const apiFailedErrorResponceMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      runEngine.sendMessage("Unit Test", apiFailedErrorResponceMsg);
      
      expect(productDetailsWrapper).toBeTruthy();

    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(productDetailsWrapper).toBeTruthy();

    });
  });

});
