import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import {FilterProduct} from "../../src/FilterProduct.web";
import Filteroptions from "../../src/Filteroptions.web";
import FilteroptionsList from "../../src/FilteroptionsList.web";
import content from "../../../studio-store-ecommerce-components/src/content";
import ProductListCard from "../../../studio-store-ecommerce-components/src/ProductCard/productListCard";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn(),
    state: {
      params: {
        filterData: [],
        onPressFilter: jest.fn(),
      },
    },
  },
  id: "Filteritems",
};

const feature = loadFeature(
  "./__tests__/features/filteritems-scenario.web.feature"
);

const filterProducList=[
  {
      "id": "83",
      "type": "catalogue",
      "attributes": {
          "name": "Cough Syrup Himalaya",
          "description": "<p>Combats cough: Koflet is beneficial in both productive and dry cough. The mucolytic and expectorant properties reduce the viscosity of bronchial secretions and facilitate expectoration. Koflet&rsquo;s peripheral antitussive (cough suppressant) action reduces bronchial mucosal irritation and related bronchospasms. In addition, the anti-allergic, antimicrobial and immune-modifying properties provide relief from cough. The demulcent action of Koflet syrup soothes respiratory passages.</p>\r\n",
          "manufacture_date": null,
          "block_qty": null,
          "price": 80,
          "on_sale": false,
          "sale_price": null,
          "discount": null,
          "recommended": false,
          "sku": "COD0000083",
          "tax_amount": "4.0",
          "price_including_tax": "80.0",
          "expiry_date": null,
          "prescription": false,
          "brand": {
              "id": 3,
              "name": "Himalaya",
              "created_at": "2022-08-01T06:31:40.354Z",
              "updated_at": "2022-08-01T06:31:40.354Z"
          },
          "tags": [
              {
                  "id": 1,
                  "name": "Dummy",
                  "created_at": "2022-07-13T13:23:49.371Z",
                  "updated_at": "2022-07-13T13:23:49.371Z"
              }
          ],
          "reviews": [],
          "weight": "100",
          "weight_unit": "ml",
          "current_availibility": "in_stock",
          "default_variant": null,
          "stock_qty": 14,
          "actual_price_including_tax": 80,
          "cart_quantity": null,
          "subscription_quantity": null,
          "subscription_package": null,
          "subscription_period": null,
          "subscription_days_count": null,
          "preferred_delivery_slot": null,
          "wishlisted": false,
          "product_notified": false,
          "cart_items": {},
          "average_rating": 0,
          "images": {
              "data": [
                  {
                      "id": "119",
                      "type": "attachment",
                      "attributes": {
                          "attachable_type": "BxBlockCatalogue::Catalogue",
                          "attachable_id": 83,
                          "position": null,
                          "is_default": true,
                          "url": "https://internalsspharmacydemo-216579-ruby.b216579.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBak1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c6da75504aff250e8faecac15eee417ad772abf0/cropped_image.png",
                          "url_link": null,
                          "is_present?": false,
                          "url_id": null,
                          "url_type": null
                      }
                  }
              ]
          },
          "product_attributes": null,
          "availability": null,
          "deep_link": "https://ecommerceappwebsite-216579-ruby.b216579.prod.eastus.az.svc.builder.ai//share/share/dl?catalogue_id=83",
          "catalogue_variants": [],
          "variants_in_cart": [],
          "can_review": false,
          "similar_products": [],
          "category": [
              {
                  "data": {
                      "id": "6",
                      "type": "category",
                      "attributes": {
                          "id": 6,
                          "name": "Cold & Cough",
                          "created_at": "2022-07-14T12:54:51.723Z",
                          "updated_at": "2022-07-14T12:54:51.729Z",
                          "product_image": {
                              "id": 89,
                              "url": "https://internalsspharmacydemo-216579-ruby.b216579.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBYZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bb27c55496f650608f6e868ecbbd764b7cdf5d0e/cropped_image.png"
                          }
                      }
                  }
              }
          ],
          "catalogue_subscriptions": [],
          "is_subscription_available": false,
          "available_subscription": {},
          "available_slots": {
              "morning_slots": null,
              "evening_slots": null
          },
          "is_notify_product": false
      }
  },
  {
      "id": "79",
      "type": "catalogue",
      "attributes": {
          "name": "Nature's Way Completia Diabetic Multivitamin",
          "description": "<ul>\r\n\t<li>Complete multivitamin for people with diabetes.</li>\r\n\t<li>Formulated with high potency B-vitamins and antioxidant vitamins A, C, E, and selenium.*</li>\r\n\t<li>With special Diabetic Support Blend and Antioxidant Activity Support Blends featuring beneficial ingredients including alpha lipoic acid, cinnamon, and fenugreek.</li>\r\n\t<li>No iron added.</li>\r\n\t<li>No yeast-derived ingredients, dairy, or artificial colors.</li>\r\n</ul>\r\n",
          "manufacture_date": null,
          "block_qty": 3,
          "price": 1500,
          "on_sale": true,
          "sale_price": "1255.0",
          "discount": "16.33",
          "recommended": false,
          "sku": "COD0000079",
          "tax_amount": "188.25",
          "price_including_tax": "1255.0",
          "expiry_date": null,
          "prescription": false,
          "brand": {
              "id": 1,
              "name": "Dummy",
              "created_at": "2022-07-13T13:23:49.463Z",
              "updated_at": "2022-07-13T13:23:49.463Z"
          },
          "tags": [],
          "reviews": [],
          "weight": "80",
          "weight_unit": "tablets",
          "current_availibility": "in_stock",
          "default_variant": null,
          "stock_qty": 599,
          "actual_price_including_tax": 1500,
          "cart_quantity": null,
          "subscription_quantity": null,
          "subscription_package": null,
          "subscription_period": null,
          "subscription_days_count": null,
          "preferred_delivery_slot": null,
          "wishlisted": false,
          "product_notified": false,
          "cart_items": {},
          "average_rating": 0,
          "images": {
              "data": [
                  {
                      "id": "113",
                      "type": "attachment",
                      "attributes": {
                          "attachable_type": "BxBlockCatalogue::Catalogue",
                          "attachable_id": 79,
                          "position": null,
                          "is_default": true,
                          "url": "https://internalsspharmacydemo-216579-ruby.b216579.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaW9EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ceaf3feab605bdd3ba4d23e1ce5e27c7da784e68/cropped_image.png",
                          "url_link": null,
                          "is_present?": false,
                          "url_id": null,
                          "url_type": null
                      }
                  }
              ]
          },
          "product_attributes": null,
          "availability": null,
          "deep_link": "https://ecommerceappwebsite-216579-ruby.b216579.prod.eastus.az.svc.builder.ai//share/share/dl?catalogue_id=79",
          "catalogue_variants": [],
          "variants_in_cart": [],
          "can_review": false,
          "similar_products": [],
          "category": [
              {
                  "data": {
                      "id": "8",
                      "type": "category",
                      "attributes": {
                          "id": 8,
                          "name": "Diabetes care",
                          "created_at": "2022-07-14T12:55:37.725Z",
                          "updated_at": "2022-07-14T12:55:37.732Z",
                          "product_image": {
                              "id": 91,
                              "url": "https://internalsspharmacydemo-216579-ruby.b216579.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBZQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c9aafe8f6ca9a33ed042193a232ad6f43c2c4158/cropped_image.png"
                          }
                      }
                  }
              }
          ],
          "catalogue_subscriptions": [],
          "is_subscription_available": false,
          "available_subscription": {},
          "available_slots": {
              "morning_slots": null,
              "evening_slots": null
          },
          "is_notify_product": false
      }
  },
]
const product={
  "id": "44",
  "type": "catalogue",
  "attributes": {
      "name": "Control D 3 Reusable Face Shield",
      "description": "<p>Product highlights</p>\r\n\r\n<ul>\r\n\t<li>The face shield is reusable and can be sanitized</li>\r\n</ul>\r\n\r\n<ul>\r\n\t<li>Provides maximum splash protection</li>\r\n</ul>\r\n\r\n<ul>\r\n\t<li>The visor is easy to maintain&nbsp;</li>\r\n</ul>\r\n\r\n<ul>\r\n\t<li>The shield is optically clear with no distortion</li>\r\n</ul>\r\n\r\n<h2>Information about Control D 3 Reusable Face Shield</h2>\r\n\r\n<p><strong>Control D 3 Reusable Safety Safety Visor Face Shield</strong>&nbsp;is a large clear visor&nbsp;which provides maximum visibility making it durable and practical. Equipped with an elastic band and forehead sponge which is easy to adjust.&nbsp;<br />\r\n<br />\r\n<strong>Uses:</strong><br />\r\nA face shield is intended to protect the wearer&#39;s entire face from hazards.</p>\r\n",
      "manufacture_date": "2021-08-20T14:00:00.000Z",
      "block_qty": null,
      "price": 350,
      "on_sale": true,
      "sale_price": "322.0",
      "discount": "8.0",
      "recommended": false,
      "sku": "COD0000044",
      "tax_amount": "0.0",
      "price_including_tax": "322.0",
      "expiry_date": "2026-07-29T12:00:00.000Z",
      "prescription": false,
      "brand": {
          "id": 2,
          "name": "SWisse",
          "created_at": "2022-08-01T06:31:32.697Z",
          "updated_at": "2022-08-01T06:31:32.697Z"
      },
      "tags": [],
      "reviews": [],
      "weight": "1",
      "weight_unit": "pcs",
      "current_availibility": "in_stock",
      "default_variant": null,
      "stock_qty": 100,
      "actual_price_including_tax": 350,
      "cart_quantity": 2,
      "subscription_quantity": null,
      "subscription_package": null,
      "subscription_period": null,
      "subscription_days_count": null,
      "preferred_delivery_slot": null,
      "wishlisted": false,
      "product_notified": false,
      "cart_items": {},
      "average_rating": 0,
      "images": {
          "data": [
              {
                  "id": "75",
                  "type": "attachment",
                  "attributes": {
                      "attachable_type": "BxBlockCatalogue::Catalogue",
                      "attachable_id": 44,
                      "position": null,
                      "is_default": true,
                      "url": "https://internalsspharmacydemo-216579-ruby.b216579.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdDBDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c5d0f969f3401471315bb6bf9ae3a237c805f746/cropped_image.png",
                      "url_link": null,
                      "is_present?": false,
                      "url_id": null,
                      "url_type": null
                  }
              }
          ]
      },
      "product_attributes": null,
      "availability": null,
      "deep_link": "https://ecommerceappwebsite-216579-ruby.b216579.prod.eastus.az.svc.builder.ai//share/share/dl?catalogue_id=44",
      "catalogue_variants": [],
      "variants_in_cart": [],
      "can_review": false,
      "similar_products": [],
      "category": [
          {
              "data": {
                  "id": "9",
                  "type": "category",
                  "attributes": {
                      "id": 9,
                      "name": "Covid essential",
                      "created_at": "2022-07-14T12:55:58.499Z",
                      "updated_at": "2022-07-14T12:55:58.571Z",
                      "product_image": {
                          "id": 92,
                          "url": "https://internalsspharmacydemo-216579-ruby.b216579.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBZUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4f4de9c6e35610d8afc42f5d2d8ff8178761a99f/cropped_image.png"
                      }
                  }
              }
          }
      ],
      "catalogue_subscriptions": [],
      "is_subscription_available": false,
      "available_subscription": {},
      "available_slots": {
          "morning_slots": null,
          "evening_slots": null
      },
      "is_notify_product": false
  }
}
const e={
  target:{
    value:"test",
    checked:true
  },
  preventDefault():any{

  }
}

const brandList=[
  {
      "id": "1",
      "type": "brand",
      "attributes": {
          "id": 1,
          "name": "Dummy",
          "created_at": "2022-07-13T13:23:49.463Z",
          "updated_at": "2022-07-13T13:23:49.463Z"
      }
  },
  {
      "id": "2",
      "type": "brand",
      "attributes": {
          "id": 2,
          "name": "SWisse",
          "created_at": "2022-08-01T06:31:32.697Z",
          "updated_at": "2022-08-01T06:31:32.697Z"
      }
  }
]

const categoryList=[
  {
      "id": "9",
      "type": "category",
      "attributes": {
          "id": 9,
          "name": "Covid essential",
          "created_at": "2022-07-14T12:55:58.499Z",
          "updated_at": "2022-07-14T12:55:58.571Z",
          "product_image": {
              "id": 92,
              "url": "https://internalsspharmacydemo-216579-ruby.b216579.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBZUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4f4de9c6e35610d8afc42f5d2d8ff8178761a99f/cropped_image.png"
          },
          "sub_categories": [
              {
                  "id": 19,
                  "name": "Face Mask",
                  "created_at": "2022-08-18T07:43:35.935Z",
                  "updated_at": "2022-08-18T07:46:32.395Z",
                  "category_id": 9,
                  "disabled": false
              },
              {
                  "id": 20,
                  "name": "Face Shield ",
                  "created_at": "2022-08-18T07:46:32.399Z",
                  "updated_at": "2022-08-18T07:46:32.411Z",
                  "category_id": 9,
                  "disabled": false
              },
              {
                  "id": 21,
                  "name": "Hand Sanitizers ",
                  "created_at": "2022-08-18T07:52:03.488Z",
                  "updated_at": "2022-08-18T07:52:03.499Z",
                  "category_id": 9,
                  "disabled": false
              },
              {
                  "id": 22,
                  "name": "Thermometers",
                  "created_at": "2022-08-18T08:04:30.410Z",
                  "updated_at": "2022-08-18T08:04:30.426Z",
                  "category_id": 9,
                  "disabled": false
              },
              {
                  "id": 23,
                  "name": "Pulse Oximeters",
                  "created_at": "2022-08-18T08:04:30.427Z",
                  "updated_at": "2022-08-18T08:04:30.440Z",
                  "category_id": 9,
                  "disabled": false
              },
              {
                  "id": 24,
                  "name": "Covid Test Kits ",
                  "created_at": "2022-08-18T08:04:30.440Z",
                  "updated_at": "2022-08-18T08:04:30.452Z",
                  "category_id": 9,
                  "disabled": false
              },
              {
                  "id": 25,
                  "name": "Disinfectants ",
                  "created_at": "2022-08-18T08:04:30.452Z",
                  "updated_at": "2022-08-18T08:04:30.464Z",
                  "category_id": 9,
                  "disabled": false
              }
          ]
      }
  }
]

const tagsList=[
  {
    "id": "1",
    "type": "tag",
    "attributes": {
        "id": 1,
        "name": "Dummy",
        "created_at": "2022-07-13T13:23:49.371Z",
        "updated_at": "2022-07-13T13:23:49.371Z"
    }
}
]

const cartDetails=[
  {
      "id": "1063",
      "type": "cart",
      "attributes": {
          "id": 1063,
          "order_number": "OD00001046",
          "amount": null,
          "account_id": 427,
          "coupon_code_id": null,
          "delivery_address_id": null,
          "sub_total": "644.0",
          "total": "644.0",
          "status": "in_cart",
          "applied_discount": "0.0",
          "cancellation_reason": null,
          "order_date": null,
          "is_gift": false,
          "placed_at": null,
          "confirmed_at": null,
          "in_transit_at": null,
          "delivered_at": null,
          "cancelled_at": null,
          "refunded_at": null,
          "source": null,
          "shipment_id": null,
          "delivery_charges": null,
          "tracking_url": null,
          "schedule_time": null,
          "payment_failed_at": null,
          "payment_pending_at": null,
          "returned_at": null,
          "tax_charges": "0.0",
          "deliver_by": null,
          "tracking_number": null,
          "is_error": false,
          "delivery_error_message": null,
          "order_status_id": 9,
          "is_group": true,
          "is_availability_checked": false,
          "shipping_charge": "50.0",
          "shipping_discount": "50.0",
          "shipping_net_amt": "0.0",
          "shipping_total": "0.0",
          "total_tax": 0,
          "created_at": "2022-09-17T13:36:25.639Z",
          "updated_at": "2022-09-17T13:37:25.118Z",
          "delivery_addresses": [],
          "razorpay_order_id": null,
          "single_sub_discounted_price": 0,
          "sub_discounted_total_price": 0,
          "order_items": [
              {
                  "id": "2745",
                  "type": "order_item",
                  "attributes": {
                      "id": 2745,
                      "order_id": 1063,
                      "quantity": 2,
                      "unit_price": "322.0",
                      "total_price": "644.0",
                      "old_unit_price": null,
                      "status": "in_cart",
                      "catalogue_id": 44,
                      "catalogue_variant_id": null,
                      "order_status_id": 9,
                      "placed_at": null,
                      "confirmed_at": null,
                      "in_transit_at": null,
                      "delivered_at": null,
                      "cancelled_at": null,
                      "refunded_at": null,
                      "manage_placed_status": false,
                      "manage_cancelled_status": false,
                      "created_at": "2022-09-17T13:37:14.822Z",
                      "updated_at": "2022-09-17T13:37:25.086Z",
                      "subscription_quantity": null,
                      "subscription_package": null,
                      "subscription_period": null,
                      "subscription_discount": null,
                      "preferred_delivery_slot": null,
                      "subscription_discounted_price": null,
                      "total_price_after_sub_discount": null,
                      "subscription_days_count": null,
                      "order_statuses": {
                          "order_number": "OD00001046",
                          "placed_at": null,
                          "confirmed_at": null,
                          "in_transit_at": null,
                          "delivered_at": null,
                          "cancelled_at": null,
                          "refunded_at": null
                      },
                      "delivery_addresses": [],
                      "catalogue": {
                          "id": "44",
                          "type": "catalogue",
                          "attributes": {
                              "name": "Control D 3 Reusable Face Shield",
                              "description": "<p>Product highlights</p>\r\n\r\n<ul>\r\n\t<li>The face shield is reusable and can be sanitized</li>\r\n</ul>\r\n\r\n<ul>\r\n\t<li>Provides maximum splash protection</li>\r\n</ul>\r\n\r\n<ul>\r\n\t<li>The visor is easy to maintain&nbsp;</li>\r\n</ul>\r\n\r\n<ul>\r\n\t<li>The shield is optically clear with no distortion</li>\r\n</ul>\r\n\r\n<h2>Information about Control D 3 Reusable Face Shield</h2>\r\n\r\n<p><strong>Control D 3 Reusable Safety Safety Visor Face Shield</strong>&nbsp;is a large clear visor&nbsp;which provides maximum visibility making it durable and practical. Equipped with an elastic band and forehead sponge which is easy to adjust.&nbsp;<br />\r\n<br />\r\n<strong>Uses:</strong><br />\r\nA face shield is intended to protect the wearer&#39;s entire face from hazards.</p>\r\n",
                              "manufacture_date": "2021-08-20T14:00:00.000Z",
                              "block_qty": null,
                              "price": 350,
                              "on_sale": true,
                              "sale_price": "322.0",
                              "discount": "8.0",
                              "recommended": false,
                              "sku": "COD0000044",
                              "tax_amount": "0.0",
                              "price_including_tax": "322.0",
                              "expiry_date": "2026-07-29T12:00:00.000Z",
                              "prescription": false,
                              "brand": {
                                  "id": 2,
                                  "name": "SWisse",
                                  "created_at": "2022-08-01T06:31:32.697Z",
                                  "updated_at": "2022-08-01T06:31:32.697Z"
                              },
                              "tags": [],
                              "reviews": [],
                              "weight": "1",
                              "weight_unit": "pcs",
                              "current_availibility": "in_stock",
                              "default_variant": null,
                              "stock_qty": 100,
                              "actual_price_including_tax": 350,
                              "cart_quantity": null,
                              "subscription_quantity": null,
                              "subscription_package": null,
                              "subscription_period": null,
                              "subscription_days_count": null,
                              "preferred_delivery_slot": null,
                              "wishlisted": false,
                              "product_notified": false,
                              "cart_items": null,
                              "average_rating": 0,
                              "images": {
                                  "data": [
                                      {
                                          "id": "75",
                                          "type": "attachment",
                                          "attributes": {
                                              "attachable_type": "BxBlockCatalogue::Catalogue",
                                              "attachable_id": 44,
                                              "position": null,
                                              "is_default": true,
                                              "url": "https://internalsspharmacydemo-216579-ruby.b216579.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdDBDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c5d0f969f3401471315bb6bf9ae3a237c805f746/cropped_image.png",
                                              "url_link": null,
                                              "is_present?": false,
                                              "url_id": null,
                                              "url_type": null
                                          }
                                      }
                                  ]
                              },
                              "product_attributes": null,
                              "availability": null,
                              "deep_link": "https://ecommerceappwebsite-216579-ruby.b216579.prod.eastus.az.svc.builder.ai//share/share/dl?catalogue_id=44",
                              "catalogue_variants": [],
                              "variants_in_cart": [],
                              "can_review": false,
                              "similar_products": {
                                  "data": [
                                      {
                                          "id": "66",
                                          "type": "catalogue",
                                          "attributes": {
                                              "name": "Face Guard (Face Shield For Corona)-Covid-19",
                                              "description": "<p>&nbsp;</p>\r\n\r\n<p>Face Guard (Face Shield For Corona) Covid-19 Coronavirus Face Shield Mask/Visors Manufacturer India, Anand Plastics is manufacturing the face shield masks (Visors) for medical service providers like Doctors, Paramedical staff, Hospitals, Pharmaceutical Companies, Chemists, and other Government Institutions to help in combating coronavirus pandemic around the globe. The face shield mask&rsquo;s main component is transparent Lexan Polycarbonate Film grade 8010. COVID19 Coronaviruses are a large family of viruses that cause illness ranging from the common cold to more severe diseases. The novel coronavirus is a new strain earlier not recognised in humans</p>\r\n",
                                              "manufacture_date": "2022-06-10T17:00:00.000Z",
                                              "block_qty": null,
                                              "price": 276,
                                              "on_sale": false,
                                              "sale_price": null,
                                              "discount": null,
                                              "recommended": false,
                                              "sku": "COD0000066",
                                              "tax_amount": "0.0",
                                              "price_including_tax": "276.0",
                                              "expiry_date": "2024-08-09T18:00:00.000Z",
                                              "prescription": false,
                                              "brand": {
                                                  "id": 2,
                                                  "name": "SWisse",
                                                  "created_at": "2022-08-01T06:31:32.697Z",
                                                  "updated_at": "2022-08-01T06:31:32.697Z"
                                              },
                                              "tags": [],
                                              "reviews": [],
                                              "weight": "1",
                                              "weight_unit": "pcs",
                                              "current_availibility": "in_stock",
                                              "default_variant": null,
                                              "stock_qty": 120,
                                              "actual_price_including_tax": 276,
                                              "cart_quantity": null,
                                              "subscription_quantity": null,
                                              "subscription_package": null,
                                              "subscription_period": null,
                                              "subscription_days_count": null,
                                              "preferred_delivery_slot": null,
                                              "wishlisted": false,
                                              "product_notified": false,
                                              "cart_items": null,
                                              "average_rating": 0,
                                              "images": {
                                                  "data": [
                                                      {
                                                          "id": "100",
                                                          "type": "attachment",
                                                          "attributes": {
                                                              "attachable_type": "BxBlockCatalogue::Catalogue",
                                                              "attachable_id": 66,
                                                              "position": null,
                                                              "is_default": true,
                                                              "url": "https://internalsspharmacydemo-216579-ruby.b216579.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaFVEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2f5f6dc64a4c368fcfec91db1d16fa0095560e66/cropped_image.png",
                                                              "url_link": null,
                                                              "is_present?": false,
                                                              "url_id": null,
                                                              "url_type": null
                                                          }
                                                      }
                                                  ]
                                              },
                                              "product_attributes": null,
                                              "availability": null,
                                              "deep_link": "https://ecommerceappwebsite-216579-ruby.b216579.prod.eastus.az.svc.builder.ai//share/share/dl?catalogue_id=66",
                                              "catalogue_variants": [],
                                              "variants_in_cart": [],
                                              "can_review": false,
                                              "similar_products": [],
                                              "category": [
                                                  {
                                                      "data": {
                                                          "id": "9",
                                                          "type": "category",
                                                          "attributes": {
                                                              "id": 9,
                                                              "name": "Covid essential",
                                                              "created_at": "2022-07-14T12:55:58.499Z",
                                                              "updated_at": "2022-07-14T12:55:58.571Z",
                                                              "product_image": {
                                                                  "id": 92,
                                                                  "url": "https://internalsspharmacydemo-216579-ruby.b216579.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBZUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4f4de9c6e35610d8afc42f5d2d8ff8178761a99f/cropped_image.png"
                                                              }
                                                          }
                                                      }
                                                  }
                                              ],
                                              "catalogue_subscriptions": [],
                                              "is_subscription_available": false,
                                              "available_subscription": {},
                                              "available_slots": {
                                                  "morning_slots": null,
                                                  "evening_slots": null
                                              },
                                              "is_notify_product": null
                                          }
                                      },
                                      {
                                          "id": "50",
                                          "type": "catalogue",
                                          "attributes": {
                                              "name": "Lion Shield Face Shield for Teenager/Young Adult Champions",
                                              "description": "<p>Product highlights</p>\r\n\r\n<ul>\r\n\t<li>The face shield is reusable and can be sanitized</li>\r\n</ul>\r\n\r\n<ul>\r\n\t<li>Provides maximum splash protection</li>\r\n</ul>\r\n\r\n<ul>\r\n\t<li>The visor is easy to maintain</li>\r\n</ul>\r\n\r\n<ul>\r\n\t<li>The shield is optically clear with no distortion</li>\r\n</ul>\r\n\r\n<p><strong>Lion Shield Face Shield</strong>&nbsp;is light and durable frame designed for continuous wearing. It helps to cover eyes, nose and mouth. It aims to protect the wearer&#39;s entire&nbsp;face from&nbsp;hazards such as&nbsp;flying objects, road debris,&nbsp;chemical splashes&nbsp;(in&nbsp;laboratories&nbsp;or in the industry), and potentially&nbsp;infectious&nbsp;materials (in&nbsp;medical&nbsp;and laboratory environments).</p>\r\n",
                                              "manufacture_date": "2021-08-01T17:00:00.000Z",
                                              "block_qty": null,
                                              "price": 252,
                                              "on_sale": false,
                                              "sale_price": null,
                                              "discount": null,
                                              "recommended": false,
                                              "sku": "COD0000050",
                                              "tax_amount": "12.6",
                                              "price_including_tax": "252.0",
                                              "expiry_date": "2027-08-12T18:00:00.000Z",
                                              "prescription": false,
                                              "brand": {
                                                  "id": 2,
                                                  "name": "SWisse",
                                                  "created_at": "2022-08-01T06:31:32.697Z",
                                                  "updated_at": "2022-08-01T06:31:32.697Z"
                                              },
                                              "tags": [
                                                  {
                                                      "id": 1,
                                                      "name": "Dummy",
                                                      "created_at": "2022-07-13T13:23:49.371Z",
                                                      "updated_at": "2022-07-13T13:23:49.371Z"
                                                  }
                                              ],
                                              "reviews": [],
                                              "weight": "1",
                                              "weight_unit": "pcs",
                                              "current_availibility": "in_stock",
                                              "default_variant": null,
                                              "stock_qty": 150,
                                              "actual_price_including_tax": 252,
                                              "cart_quantity": null,
                                              "subscription_quantity": null,
                                              "subscription_package": null,
                                              "subscription_period": null,
                                              "subscription_days_count": null,
                                              "preferred_delivery_slot": null,
                                              "wishlisted": false,
                                              "product_notified": false,
                                              "cart_items": null,
                                              "average_rating": 0,
                                              "images": {
                                                  "data": [
                                                      {
                                                          "id": "84",
                                                          "type": "attachment",
                                                          "attributes": {
                                                              "attachable_type": "BxBlockCatalogue::Catalogue",
                                                              "attachable_id": 50,
                                                              "position": null,
                                                              "is_default": true,
                                                              "url": "https://internalsspharmacydemo-216579-ruby.b216579.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdThDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--039794a14c22ddff55ecaf4928a44eeb3f4d63fc/cropped_image.png",
                                                              "url_link": null,
                                                              "is_present?": false,
                                                              "url_id": null,
                                                              "url_type": null
                                                          }
                                                      }
                                                  ]
                                              },
                                              "product_attributes": null,
                                              "availability": null,
                                              "deep_link": "https://ecommerceappwebsite-216579-ruby.b216579.prod.eastus.az.svc.builder.ai//share/share/dl?catalogue_id=50",
                                              "catalogue_variants": [],
                                              "variants_in_cart": [],
                                              "can_review": false,
                                              "similar_products": [],
                                              "category": [
                                                  {
                                                      "data": {
                                                          "id": "9",
                                                          "type": "category",
                                                          "attributes": {
                                                              "id": 9,
                                                              "name": "Covid essential",
                                                              "created_at": "2022-07-14T12:55:58.499Z",
                                                              "updated_at": "2022-07-14T12:55:58.571Z",
                                                              "product_image": {
                                                                  "id": 92,
                                                                  "url": "https://internalsspharmacydemo-216579-ruby.b216579.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBZUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4f4de9c6e35610d8afc42f5d2d8ff8178761a99f/cropped_image.png"
                                                              }
                                                          }
                                                      }
                                                  }
                                              ],
                                              "catalogue_subscriptions": [],
                                              "is_subscription_available": false,
                                              "available_subscription": {},
                                              "available_slots": {
                                                  "morning_slots": null,
                                                  "evening_slots": null
                                              },
                                              "is_notify_product": null
                                          }
                                      }
                                  ]
                              },
                              "category": [
                                  {
                                      "data": {
                                          "id": "9",
                                          "type": "category",
                                          "attributes": {
                                              "id": 9,
                                              "name": "Covid essential",
                                              "created_at": "2022-07-14T12:55:58.499Z",
                                              "updated_at": "2022-07-14T12:55:58.571Z",
                                              "product_image": {
                                                  "id": 92,
                                                  "url": "https://internalsspharmacydemo-216579-ruby.b216579.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBZUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4f4de9c6e35610d8afc42f5d2d8ff8178761a99f/cropped_image.png"
                                              }
                                          }
                                      }
                                  }
                              ],
                              "catalogue_subscriptions": [],
                              "is_subscription_available": false,
                              "available_subscription": {},
                              "available_slots": {
                                  "morning_slots": null,
                                  "evening_slots": null
                              },
                              "is_notify_product": null
                          }
                      },
                      "catalogue_variant": null,
                      "product_name": "Control D 3 Reusable Face Shield",
                      "overall_order_status": "in_cart",
                      "product_price": 350,
                      "product_sale_price": "322.0",
                      "product_on_sale": true,
                      "product_discount": "8.0",
                      "product_variant_price": null,
                      "product_variant_sale_price": null,
                      "product_variant_on_sale": null,
                      "product_variant_discount": null,
                      "product_variant_is_deliverable": null,
                      "is_item_cancelled": false,
                      "is_review_present": false,
                      "review": null,
                      "delivery_address": null,
                      "order_date": null,
                      "order_number": "OD00001046",
                      "is_deliverable": true,
                      "product_images": null,
                      "item_history": []
                  }
              }
          ],
          "account": {
              "id": "427",
              "type": "account",
              "attributes": {
                  "activated": true,
                  "full_name": "Firoz",
                  "user_name": null,
                  "email": "firoz.khan@eiysys.in",
                  "full_phone_number": null,
                  "phone_number": null,
                  "type": "EmailAccount",
                  "created_at": "2022-09-01T10:18:41.416Z",
                  "updated_at": "2022-09-17T13:37:25.125Z",
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
                  "wishlist_quantity": 3
              }
          },
          "order_transaction": [],
          "coupon": null
      }
  }
]

const event={
  currentTarget:{
    textContent:"Hello"
  }
}
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to filteritems", ({ given, when, then }) => {
    let filterItemsBlock: ShallowWrapper;
    let instance: FilterProduct;

    given("I am a User loading filteritems", () => {
      filterItemsBlock = shallow(<FilterProduct {...screenProps} />);
      expect(filterItemsBlock).toBeTruthy();
      instance = filterItemsBlock.instance() as FilterProduct;
    });

    when("I navigate to the filteritems", () => {
      instance = filterItemsBlock.instance() as FilterProduct;
      expect(filterItemsBlock).toBeTruthy();

    })
    then("filteritems will load with out errors", () => {
      instance.setState(
        {
          txtInputValue: "",
          txtSavedValue: "A",
          enableField: false,
          token: "",
          data: "",
          productList:[],
          showSortByModal: false,
          isShowError: false,
          isSortByEnabled: false,
          filterSelection: [
            {
              isSelected: false,
            },
            {
              isSelected: false,
            },
            {
              isSelected: false,
            },
            {
              isSelected: false,
            },
          ],
          filterQueryParams: "",
          lastFilterQuery: "",
          noProductFound: false,
          customErrorModal: false,
          customErrorMessage: "",
          isFetching: false,
          screenName: "",
          cartProduct: null,
          cartLength: 0,
          filterData: { brand: [], color: [], tag: [], category: [], price: [] },
          filterProducList:filterProducList,
          sort_by: "",
          order_by: "",
          order_field: "",
          sortMenu: [
            { label: content.AllProduct, order_by: "", direction: "" },
            {
              label: content.LowtoHigh,
              order_by: "price_including_tax",
              direction: "asc",
            },
            {
              label: content.HightoLow,
              order_by: "price_including_tax",
              direction: "desc",
            },
            { label: content.ByPopularity, order_by: "sold", direction: "desc" },
            { label: content.ByNewest, order_by: "created_at", direction: "desc" },
            {
              label: content.Recommended,
              order_by: "recommended",
              direction: "desc",
            },
          ],
          dropdownOpen: false,
          value: "All Product",
          page: 1,
          per_page: 16,
          cartId: "",
          productToBeAdded: "",
          newest: localStorage.getItem("newest"),
          searchQuery: localStorage.getItem("searchQuery"),
          loading: false,
          loadMoreShow: "",
          prevUrl: "",
          Url: "",
          totalPage: 0,
          isProductAddtoCart:false,
          productsAddingToCart:[],
          productDescriptionLoader: false,
          deleteProduct:false,
          itemQuantity:1,
          currentImage: "",
          subscriptionqty: 1,
          isSubscribeClicked:false,
          cartDetails: null,
          productDetails:product

        }
      )
      instance.putItemToCart("1043","");
      instance.getIsCartCreated()
      instance.postCreateCart(product);
      instance.addToCart(product);
      instance.getProductDetails()
      instance.getProductList("")
      instance.removeSearchQuery()
      instance.loadMore()
      instance.nextPage()
      instance.previousPage()
      instance.getCurrentPage("1")
      instance.addSortBy("2")
      instance.increaseOrDecreaseCartQuantity(product,+1)
      instance.getCartHasProduct()
      instance.increaseOrDecreaseCartQuantity(product,-1)
      expect(filterItemsBlock).toBeTruthy();
    });

    then("filteritems will load filterData with out errors", async () => {
      // await instance.componentDidMount();
      // expect(filterItemsBlock).toBeTruthy();
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.getProductApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);

    });

    then("filteritems will load products without errors", () => {
      const msgErrorMessageRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgErrorMessageRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              Error: "Error",
            },
          ],
        }
      );
      instance.getProductApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });
    then("filteritems failed load products", () => {
      const msgErrorMessageRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgErrorMessageRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              Error: "Error",
            },
          ],
        }
      );
      instance.getProductApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("filteritems will filter data without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.applyFilterApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("filteritems will add to wishlist without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.addToWishlistApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("filteritems will remove from wishlist without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.removeFromWishlistApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("filteritems will get products with id without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.getCartProductId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("filteritems will add to cart without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.addToCartApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("filterItem will update product quantity without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.increaseOrDecreaseCartQuantityApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });
   
    then("filteritems will check has product without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.getCartHasProductAPICallID = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("filteritems put item into cart without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.putItemToCartApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });
    then("I can select the button with with out errors", () => {
    });

    then("I can leave the screen with out errors", () => {
      expect(filterItemsBlock).toBeTruthy();
    });
  });

  test("User navigates to filteroptions", ({ given, when, then }) => {
    let filterOptionBlock: ShallowWrapper;
    let instance: Filteroptions;

    given("I am a User loading filteroptions", () => {
      filterOptionBlock = shallow(<Filteroptions {...screenProps} />);
      expect(filterOptionBlock).toBeTruthy();
      instance = filterOptionBlock.instance() as Filteroptions;
    });

    when("I navigate to the filteroptions", () => {
      expect(filterOptionBlock).toBeTruthy();
      instance = filterOptionBlock.instance() as Filteroptions
    });

    then("filteroptions will load with out errors", async () => {
      instance.componentDidMount();
      
      instance.resizeWindow();
      instance.handleBackButtonClick();
      instance.getToken();
      instance.ytmbFilter();
    });

    then("filteroptions will get category without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.getCategoryApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("filteroptions will get brand without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.getBrandApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("filteroptions will apply all without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.applyAllApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("filteroptions will get tags without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.getTagsApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("I can select the button with with out errors", () => {
     
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(filterOptionBlock).toBeTruthy();
    });
  });

  test("User navigates to filteroptionslist", ({ given, when, then }) => {
    let filterOptionListBlock: ShallowWrapper;
    let instance: FilteroptionsList;

    given("I am a User loading filteroptionslist", () => {
      filterOptionListBlock = shallow(<FilteroptionsList {...screenProps} />);
      expect(filterOptionListBlock).toBeTruthy();
      instance = filterOptionListBlock.instance() as FilteroptionsList;
    });

    when("I navigate to the filteroptionslist", () => {
      expect(filterOptionListBlock).toBeTruthy();
      instance = filterOptionListBlock.instance() as FilteroptionsList
    });

    then("filteroptionslist will load with out errors", async () => {
      instance.componentDidMount();
      instance.setState({
        brandList:brandList,
        categoryList:categoryList,
        tagsList:tagsList
      })
      instance.resizeWindow();
      instance.getToken();
      instance.forBannertoggleCheckBox("1","category")
      instance.toggleCheckBox("1","category");
      instance.categoryChecked();
      instance.subCategoryChecked();
      instance.unCheckCheckBox("category","1")
      instance.getBrandList("");
      instance.getCategoryList("")
      instance.getTagList("")
      instance.getColorList("")
      instance.getPriceList("");
      instance.getListRequest("");
      instance.getSizeList();
      instance.getPriceRangeList();
      instance.onchange(e);
      instance.toggle("");
      instance.resizeWindow();
      instance.toggleDiscounted(e);
      instance.toggleOutofstock(e);

    });

    then("filteroptionslist will get product details without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.getProductApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });
    then("filteroptionslist will get category without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.getProductCategoryApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("filteroptionslist will get brand without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.getBrandProductApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("filteroptionslist will get tags without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.getTagProductApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("I can select the button with with out errors", () => {
     
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(filterOptionListBlock).toBeTruthy();
    });
  });

  test("User navigates to filterProduct", ({ given, when, then }) => {
    let filterProductBlock: ShallowWrapper;
    let filterProductCardBlock: ShallowWrapper;
    let instance: FilterProduct;

    given("I am a User loading filterProduct", () => {
      filterProductBlock = shallow(<FilterProduct {...screenProps} />);
      filterProductCardBlock = shallow(<ProductListCard {...screenProps} />);
      expect(filterProductBlock).toBeTruthy();
      instance = filterProductBlock.instance() as FilterProduct;
    });

    when("I navigate to the filterProduct", () => {
      expect(filterProductBlock).toBeTruthy();
      instance = filterProductBlock.instance() as FilterProduct
    });

    then("filterProduct will load with out errors", async () => {
      instance.componentDidMount();
        instance.setState(
          {
            cartDetails:cartDetails,
            cartLength:0,
            cartId:"1063",
            filterProducList:filterProducList,
          }
        )
        instance.removeFilter(filterProducList[0].attributes,"category","83");
        instance.putItemToCart("1043","");
        instance.getIsCartCreated();
        instance.postCreateCart(product);
        instance.addToCart(product);
        instance.getProductDetails();
        instance.getProductList("");
        instance.removeSearchQuery();
        instance.loadMore();
        instance.nextPage();
        instance.previousPage();
        instance.getCurrentPage("1");
        instance.addSortBy(product);
        instance.increaseOrDecreaseCartQuantity(product,1);
        instance.getCartHasProduct();
        instance.toggle(event)
      })

    then("filterProduct will get product without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.getProductApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("filterProduct will get filter product", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.applyFilterApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("filterProduct will add to wishlist without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.addToWishlistApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("filterProduct will remove from wishlist without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.removeFromWishlistApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("filterProduct will get products id without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.getCartProductId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("I can select the button with with out errors", () => {
     
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(filterProductBlock).toBeTruthy();
    });
  });
});
