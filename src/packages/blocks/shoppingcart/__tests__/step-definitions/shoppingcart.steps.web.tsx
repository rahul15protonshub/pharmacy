import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { any } from "prop-types";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import ShoppingCartWeb from "../../src/ShoppingCart.web";
import {CartAmount,CartProductListData,CartProduct,CartBreadCrumbs} from "../../src/ShoppingCart.web";;
import CheckoutWeb, { Checkout } from "../../src/Checkout.web";
import EditAddress from "../../src/EditAddress"
import SavedAddress from "../../src/SavedAddress"


const navigation = {
  state: { params: {} },
  dispatch: jest.fn(),
  goBack: jest.fn(),
  dismiss: jest.fn(),
  navigate: jest.fn(),
  openDrawer: jest.fn(),
  closeDrawer: jest.fn(),
  toggleDrawer: jest.fn(),
  getParam: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  isFocused: jest.fn()
}

const shoppingCartProps = {
  navigation: navigation,
  id: "ShoppingCartWeb",
  history: {
    push: () => { },
  }
}
const screenProps = {
    navigation: navigation,
    id: "ShoppingCartWeb",
  }

const history={
    "length": 7,
    "action": "PUSH",
    "location": {
        "pathname": "/cart",
        "search": "",
        "hash": "",
        "key": "tpgby4"
    }
}

const feature = loadFeature('./__tests__/features/shoppingcart-web-scenario.feature');

const cart=[
  {
    "id": "2599",
    "type": "order_item",
    "attributes": {
        "id": 2599,
        "order_id": 1043,
        "quantity": null,
        "unit_price": "3456.0",
        "total_price": "259200.0",
        "old_unit_price": null,
        "status": "in_cart",
        "catalogue_id": 96,
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
        "created_at": "2022-09-10T04:03:46.855Z",
        "updated_at": "2022-09-10T04:45:35.008Z",
        "subscription_quantity": 3,
        "subscription_package": "weekly",
        "subscription_period": "6",
        "subscription_discount": "20.0",
        "preferred_delivery_slot": "9am to 12pm",
        "subscription_discounted_price": 2764.8,
        "total_price_after_sub_discount": 207360,
        "subscription_days_count": 75,
        "order_statuses": {
            "order_number": "OD00001028",
            "placed_at": null,
            "confirmed_at": null,
            "in_transit_at": null,
            "delivered_at": null,
            "cancelled_at": null,
            "refunded_at": null
        },
        "delivery_addresses": [],
        "catalogue": {
            "id": "96",
            "type": "catalogue",
            "attributes": {
                "name": "Omron NE C28 Compressor Nebulizer ",
                "description": "<p>Desighne to efficiently deliver medication to the bronchial lung passages Handsome carrying case included with accessory compartment. Compact Design: Compact sporty design and powerful delivery makes NE-C28 the product of choice for those who demand affordability and performance..</p>\r\n",
                "manufacture_date": null,
                "block_qty": 3,
                "price": 3456,
                "on_sale": false,
                "sale_price": null,
                "discount": null,
                "recommended": false,
                "sku": "COD0000096",
                "tax_amount": "345.6",
                "price_including_tax": "3456.0",
                "expiry_date": null,
                "prescription": true,
                "brand": {
                    "id": 25,
                    "name": "Omron Dalian Co., Ltd.",
                    "created_at": "2022-08-31T12:57:57.520Z",
                    "updated_at": "2022-08-31T12:57:57.520Z"
                },
                "tags": [],
                "reviews": [],
                "weight": "1",
                "weight_unit": "kg",
                "current_availibility": "in_stock",
                "default_variant": null,
                "stock_qty": 155,
                "actual_price_including_tax": 3456,
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
                            "id": "132",
                            "type": "attachment",
                            "attributes": {
                                "attachable_type": "BxBlockCatalogue::Catalogue",
                                "attachable_id": 96,
                                "position": null,
                                "is_default": true,
                                "url": "https://internalsspharmacydemo-216579-ruby.b216579.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0lEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bbaf33a7a42b432f63ae72273b88a68cdbb091f5/cropped_image.png",
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
                "deep_link": "https://ecommerceappwebsite-216579-ruby.b216579.prod.eastus.az.svc.builder.ai//share/share/dl?catalogue_id=96",
                "catalogue_variants": [],
                "variants_in_cart": [],
                "can_review": false,
                "similar_products": {
                    "data": []
                },
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
                "catalogue_subscriptions": [
                    {
                        "id": "2",
                        "type": "catalogue_subscription",
                        "attributes": {
                            "id": 2,
                            "catalogue_id": 96,
                            "subscription_package": "weekly",
                            "subscription_period": "6 month",
                            "discount": "20.0",
                            "morning_slot": "[\"\", \"9am to 12pm\"]",
                            "evening_slot": "[\"\", \"3pm to 6pm\"]",
                            "subscription_number": null
                        }
                    }
                ],
                "is_subscription_available": true,
                "available_subscription": {
                    "weekly": [
                        "6"
                    ]
                },
                "available_slots": {
                    "morning_slots": [
                        "",
                        "9am to 12pm"
                    ],
                    "evening_slots": [
                        "",
                        "3pm to 6pm"
                    ]
                },
                "is_notify_product": null
            }
        },
        "catalogue_variant": null,
        "product_name": "Omron NE C28 Compressor Nebulizer ",
        "overall_order_status": "in_cart",
        "product_price": 3456,
        "product_sale_price": null,
        "product_on_sale": false,
        "product_discount": null,
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
        "order_number": "OD00001028",
        "is_deliverable": true,
        "product_images": null,
        "item_history": []
    }
}
]
const wholeCart={
  "id": 1043,
  "order_number": "OD00001028",
  "amount": null,
  "account_id": 427,
  "coupon_code_id": null,
  "delivery_address_id": null,
  "sub_total": "259200.0",
  "total": "207360.0",
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
  "total_tax": 25920,
  "created_at": "2022-09-10T04:03:46.815Z",
  "updated_at": "2022-09-15T11:37:37.410Z",
  "delivery_addresses": [],
  "razorpay_order_id": null,
  "single_sub_discounted_price": 2764.8,
  "sub_discounted_total_price": 51840,
  "order_items": [
      {
          "id": "2599",
          "type": "order_item",
          "attributes": {
              "id": 2599,
              "order_id": 1043,
              "quantity": null,
              "unit_price": "3456.0",
              "total_price": "259200.0",
              "old_unit_price": null,
              "status": "in_cart",
              "catalogue_id": 96,
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
              "created_at": "2022-09-10T04:03:46.855Z",
              "updated_at": "2022-09-10T04:45:35.008Z",
              "subscription_quantity": 3,
              "subscription_package": "weekly",
              "subscription_period": "6",
              "subscription_discount": "20.0",
              "preferred_delivery_slot": "9am to 12pm",
              "subscription_discounted_price": 2764.8,
              "total_price_after_sub_discount": 207360,
              "subscription_days_count": 75,
              "order_statuses": {
                  "order_number": "OD00001028",
                  "placed_at": null,
                  "confirmed_at": null,
                  "in_transit_at": null,
                  "delivered_at": null,
                  "cancelled_at": null,
                  "refunded_at": null
              },
              "delivery_addresses": [],
              "catalogue": {
                  "id": "96",
                  "type": "catalogue",
                  "attributes": {
                      "name": "Omron NE C28 Compressor Nebulizer ",
                      "description": "<p>Desighne to efficiently deliver medication to the bronchial lung passages Handsome carrying case included with accessory compartment. Compact Design: Compact sporty design and powerful delivery makes NE-C28 the product of choice for those who demand affordability and performance..</p>\r\n",
                      "manufacture_date": null,
                      "block_qty": 3,
                      "price": 3456,
                      "on_sale": false,
                      "sale_price": null,
                      "discount": null,
                      "recommended": false,
                      "sku": "COD0000096",
                      "tax_amount": "345.6",
                      "price_including_tax": "3456.0",
                      "expiry_date": null,
                      "prescription": true,
                      "brand": {
                          "id": 25,
                          "name": "Omron Dalian Co., Ltd.",
                          "created_at": "2022-08-31T12:57:57.520Z",
                          "updated_at": "2022-08-31T12:57:57.520Z"
                      },
                      "tags": [],
                      "reviews": [],
                      "weight": "1",
                      "weight_unit": "kg",
                      "current_availibility": "in_stock",
                      "default_variant": null,
                      "stock_qty": 155,
                      "actual_price_including_tax": 3456,
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
                                  "id": "132",
                                  "type": "attachment",
                                  "attributes": {
                                      "attachable_type": "BxBlockCatalogue::Catalogue",
                                      "attachable_id": 96,
                                      "position": null,
                                      "is_default": true,
                                      "url": "https://internalsspharmacydemo-216579-ruby.b216579.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0lEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bbaf33a7a42b432f63ae72273b88a68cdbb091f5/cropped_image.png",
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
                      "deep_link": "https://ecommerceappwebsite-216579-ruby.b216579.prod.eastus.az.svc.builder.ai//share/share/dl?catalogue_id=96",
                      "catalogue_variants": [],
                      "variants_in_cart": [],
                      "can_review": false,
                      "similar_products": {
                          "data": []
                      },
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
                      "catalogue_subscriptions": [
                          {
                              "id": "2",
                              "type": "catalogue_subscription",
                              "attributes": {
                                  "id": 2,
                                  "catalogue_id": 96,
                                  "subscription_package": "weekly",
                                  "subscription_period": "6 month",
                                  "discount": "20.0",
                                  "morning_slot": "[\"\", \"9am to 12pm\"]",
                                  "evening_slot": "[\"\", \"3pm to 6pm\"]",
                                  "subscription_number": null
                              }
                          }
                      ],
                      "is_subscription_available": true,
                      "available_subscription": {
                          "weekly": [
                              "6"
                          ]
                      },
                      "available_slots": {
                          "morning_slots": [
                              "",
                              "9am to 12pm"
                          ],
                          "evening_slots": [
                              "",
                              "3pm to 6pm"
                          ]
                      },
                      "is_notify_product": null
                  }
              },
              "catalogue_variant": null,
              "product_name": "Omron NE C28 Compressor Nebulizer ",
              "overall_order_status": "in_cart",
              "product_price": 3456,
              "product_sale_price": null,
              "product_on_sale": false,
              "product_discount": null,
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
              "order_number": "OD00001028",
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
          "updated_at": "2022-09-15T11:37:37.423Z",
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
const attributes={
  "id": 1043,
  "order_number": "OD00001028",
  "amount": null,
  "account_id": 427,
  "coupon_code_id": null,
  "delivery_address_id": null,
  "sub_total": "259200.0",
  "total": "207360.0",
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
  "total_tax": 25920,
  "created_at": "2022-09-10T04:03:46.815Z",
  "updated_at": "2022-09-15T11:37:37.410Z",
  "delivery_addresses": [],
  "razorpay_order_id": null,
  "single_sub_discounted_price": 2764.8,
  "sub_discounted_total_price": 51840,
  "order_items": [
      {
          "id": "2599",
          "type": "order_item",
          "attributes": {
              "id": 2599,
              "order_id": 1043,
              "quantity": null,
              "unit_price": "3456.0",
              "total_price": "259200.0",
              "old_unit_price": null,
              "status": "in_cart",
              "catalogue_id": 96,
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
              "created_at": "2022-09-10T04:03:46.855Z",
              "updated_at": "2022-09-10T04:45:35.008Z",
              "subscription_quantity": 3,
              "subscription_package": "weekly",
              "subscription_period": "6",
              "subscription_discount": "20.0",
              "preferred_delivery_slot": "9am to 12pm",
              "subscription_discounted_price": 2764.8,
              "total_price_after_sub_discount": 207360,
              "subscription_days_count": 75,
              "order_statuses": {
                  "order_number": "OD00001028",
                  "placed_at": null,
                  "confirmed_at": null,
                  "in_transit_at": null,
                  "delivered_at": null,
                  "cancelled_at": null,
                  "refunded_at": null
              },
              "delivery_addresses": [],
              "catalogue": {
                  "id": "96",
                  "type": "catalogue",
                  "attributes": {
                      "name": "Omron NE C28 Compressor Nebulizer ",
                      "description": "<p>Desighne to efficiently deliver medication to the bronchial lung passages Handsome carrying case included with accessory compartment. Compact Design: Compact sporty design and powerful delivery makes NE-C28 the product of choice for those who demand affordability and performance..</p>\r\n",
                      "manufacture_date": null,
                      "block_qty": 3,
                      "price": 3456,
                      "on_sale": false,
                      "sale_price": null,
                      "discount": null,
                      "recommended": false,
                      "sku": "COD0000096",
                      "tax_amount": "345.6",
                      "price_including_tax": "3456.0",
                      "expiry_date": null,
                      "prescription": true,
                      "brand": {
                          "id": 25,
                          "name": "Omron Dalian Co., Ltd.",
                          "created_at": "2022-08-31T12:57:57.520Z",
                          "updated_at": "2022-08-31T12:57:57.520Z"
                      },
                      "tags": [],
                      "reviews": [],
                      "weight": "1",
                      "weight_unit": "kg",
                      "current_availibility": "in_stock",
                      "default_variant": null,
                      "stock_qty": 155,
                      "actual_price_including_tax": 3456,
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
                                  "id": "132",
                                  "type": "attachment",
                                  "attributes": {
                                      "attachable_type": "BxBlockCatalogue::Catalogue",
                                      "attachable_id": 96,
                                      "position": null,
                                      "is_default": true,
                                      "url": "https://internalsspharmacydemo-216579-ruby.b216579.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0lEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bbaf33a7a42b432f63ae72273b88a68cdbb091f5/cropped_image.png",
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
                      "deep_link": "https://ecommerceappwebsite-216579-ruby.b216579.prod.eastus.az.svc.builder.ai//share/share/dl?catalogue_id=96",
                      "catalogue_variants": [],
                      "variants_in_cart": [],
                      "can_review": false,
                      "similar_products": {
                          "data": []
                      },
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
                      "catalogue_subscriptions": [
                          {
                              "id": "2",
                              "type": "catalogue_subscription",
                              "attributes": {
                                  "id": 2,
                                  "catalogue_id": 96,
                                  "subscription_package": "weekly",
                                  "subscription_period": "6 month",
                                  "discount": "20.0",
                                  "morning_slot": "[\"\", \"9am to 12pm\"]",
                                  "evening_slot": "[\"\", \"3pm to 6pm\"]",
                                  "subscription_number": null
                              }
                          }
                      ],
                      "is_subscription_available": true,
                      "available_subscription": {
                          "weekly": [
                              "6"
                          ]
                      },
                      "available_slots": {
                          "morning_slots": [
                              "",
                              "9am to 12pm"
                          ],
                          "evening_slots": [
                              "",
                              "3pm to 6pm"
                          ]
                      },
                      "is_notify_product": null
                  }
              },
              "catalogue_variant": null,
              "product_name": "Omron NE C28 Compressor Nebulizer ",
              "overall_order_status": "in_cart",
              "product_price": 3456,
              "product_sale_price": null,
              "product_on_sale": false,
              "product_discount": null,
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
              "order_number": "OD00001028",
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
          "updated_at": "2022-09-15T11:37:37.423Z",
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

// const value=
  defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to shoppingcart', ({ given, when, then }) => {
      let shoppingcartWrapper:ShallowWrapper;
      let cartAmountWrapper: ShallowWrapper;
      let cartBreadCrumbsWrapper: ShallowWrapper;
      let cartProductListDataWrapper: ShallowWrapper;
      let cartProductWrapper: ShallowWrapper;
      let instance:ShoppingCartWeb; 

      given('I am a User loading shoppingcart', () => {
          shoppingcartWrapper = shallow(<ShoppingCartWeb {...shoppingCartProps}/>)
          cartAmountWrapper = shallow(<CartAmount wholeCart={wholeCart} />)
          cartBreadCrumbsWrapper = shallow(<CartBreadCrumbs />)
          cartProductListDataWrapper = shallow(<CartProductListData />)
          cartProductWrapper = shallow(<CartProduct />)
    
      });

      when('I navigate to the shoppingcart', () => {
           instance = shoppingcartWrapper.instance() as ShoppingCartWeb
      });
      then('shoppingcart will load with out errors',()=>{
        instance.componentDidMount();
        instance.setState({
          cart:cart,
          cartId:"1043",
          wholeCart:wholeCart,
          loading:false
        })
        instance.getCart();
        instance.putUpdateCartQuantity("75","","1","");
        instance.postApplyCoupon("FLATE50","")
        instance.deleteCartItem("75","");
        instance.deleteCoupon();
        instance.moveToWishlist("75","");
        instance.postWishlist("75")
        instance.toSetdefaultVariant("0","75");
        instance.toApplyCoupon("FLATE50","24157.50")
        instance.isRemovingSubscriptionItem(attributes);
        instance.setDefaultImage(attributes);
        instance.changeCouponCode("FLATE50");
        instance.postBuyNow("75","");
      })
      then('shoppingcart will load shoppingcart data with out errors', () => {
          expect(shoppingcartWrapper).toBeTruthy()
          instance = shoppingcartWrapper.instance() as ShoppingCartWeb

          const msgToken = new Message(
             getName(MessageEnum.SessionResponseMessage)
           );
           msgToken.addData(
             getName(MessageEnum.SessionResponseToken),
             "TOKEN"
           );
           runEngine.sendMessage("Unit Test", msgToken);
     
           const msgValidationAPI = new Message(
             getName(MessageEnum.RestAPIResponceMessage)
           );
           msgValidationAPI.addData(
             getName(MessageEnum.RestAPIResponceDataMessage),
             msgValidationAPI.messageId
           );
         
           msgValidationAPI.addData(
             getName(MessageEnum.RestAPIResponceSuccessMessage),
             {
               data: {}
             }
           );
     
           instance.GetCartApiCallId = msgValidationAPI.messageId;
           runEngine.sendMessage("Unit Test", msgValidationAPI);
     
           
           const msgError = new Message(
             getName(MessageEnum.RestAPIResponceErrorMessage)
           );
           msgError.addData(
             getName(MessageEnum.RestAPIResponceDataMessage),
             msgValidationAPI.messageId
           );
           msgError.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
             data: []
           });
           instance.GetCartApiCallId = msgValidationAPI.messageId;
           runEngine.sendMessage("Unit Test", msgValidationAPI);
      });
      then("shoppingcart failed to load carts", () => {
        const msgLoadDataErrorRestAPI = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        msgLoadDataErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgLoadDataErrorRestAPI
        );
        msgLoadDataErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          {
            errors: [{}],
          }
        );
        msgLoadDataErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgLoadDataErrorRestAPI.messageId
        );
        instance.GetCartApiCallId = msgLoadDataErrorRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
      });
      then('shoppingcart will refresh shipping address without errors', () => {
        expect(shoppingcartWrapper).toBeTruthy()
      });

      then('shoppingcart failed to refresh shipping address', () => {
        expect(shoppingcartWrapper).toBeTruthy()
      });
      
      then("shoppingcart will update cart quantity without errors", () => {
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
        instance.putUpdateCartQuantityApiCallId = msgSuccessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
      });
  
      then("shoppingcart failed to update cart quantity", () => {
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
        instance.putUpdateCartQuantityApiCallId = msgErrorMessageRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
      });
     
      then("shoppingcart will delete cart item without errors", () => {
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
        instance.delCartItemApiCallId = msgSuccessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
      });
  
      then("shoppingcart failed to delete cart cart item", () => {
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
        instance.delCartItemApiCallId = msgErrorMessageRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
      });

      then("shoppingcart will post wishlist without errors", () => {
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
        instance.postWishlistApiCallId = msgSuccessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
      });

      then("shoppingcart failed to post wishlist", () => {
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
        instance.postWishlistApiCallId = msgErrorMessageRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
      });

      then("shoppingcart will post apply coupon without errors", () => {
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
        instance.postApplyCouponApiCallId = msgSuccessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
      });

      then("shoppingcart failed to post apply coupon", () => {
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
        instance.postApplyCouponApiCallId = msgErrorMessageRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
      });

      then("shoppingcart will delete coupon without errors", () => {
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
        instance.delCouponApiCallId = msgSuccessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
      });

      then("shoppingcart failed to delete coupon", () => {
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
        instance.delCouponApiCallId = msgErrorMessageRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
      });

      then("shoppingcart will post buy now without errors", () => {
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
        instance.postBuyNowApiCallId = msgSuccessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
      });

      then("shoppingcart failed to buy now", () => {
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
        instance.postBuyNowApiCallId = msgErrorMessageRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
      });

      then("I can select the button with out errors", () => {
        // let buttonComponent = shoppingcartWrapper.findWhere(
        //   (node) => node.prop("data-testid") === "input-cart-coupon"
        // );
        // jest.spyOn(instance, 'changeCouponCode')
        // expect(instance.changeCouponCode).toHaveBeenCalledTimes(1)
        // const event = {
        //   preventDefault() {},
        //   target: { value: "hello@aol.com" },
        // };
        // buttonComponent.simulate("change", event);
      });

      then('I can leave the screen with out errors', () => {
          instance.componentWillUnmount()
          expect(shoppingcartWrapper).toBeTruthy()
      });
  });

  test('User navigates to checkout', ({ given, when, then }) => {
    let checkouttWrapper:ShallowWrapper;
    let instance:Checkout; 

    given('I am a User loading checkout', () => {
        checkouttWrapper = shallow(<Checkout history={history} {...screenProps}/>)
    });

    when('I navigate to the checkout', () => {
         instance = checkouttWrapper.instance() as Checkout
    });

    then('checkout will load data with out errors',()=>{
      instance.componentDidMount();
      instance.setState({
        cart:cart,
        cartId:"1043",
        wholeCart:wholeCart,
        loading:false
      })
      instance.getStateList();
      // instance.addNewAddressHandler(value)
      instance.getCart();
      // instance.getDeliveryAddressList();
      // instance.calculateShippingAddressCharge();
      // instance.releaseShippingCharge();
      instance.getCart();
      instance.postApplyCoupon("FLATE50","")
      instance.deleteCoupon();
      instance.toApplyCoupon("FLATE50","24157.50")
      // instance.setZipCode("482001")
      // instance.checkShippingAggressCharge()
      // instance.updateDeliveryAddress(75,"482001")
      // instance.changeDefaultAddressHandler()
      // instance.updateAddress()
      instance.handleCheckBoxChange()
      // instance.onHandleBack()
      instance.setIsPrescModal(false)
      // instance.postPrescriptionFile()
    })
    // then('checkout will load checkout data with out errors',()=>{
      
    // })
    then('checkout will add new address without errors', () => {
      expect(checkouttWrapper).toBeTruthy()
      instance = checkouttWrapper.instance() as Checkout;

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
      instance.addNewAddressAPICallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then('checkout failed to add new address', () => {
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
      instance.addNewAddressAPICallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
      });

    then('checkout will get user delivery address without errors', () => {
        const msgToken = new Message(
           getName(MessageEnum.SessionResponseMessage)
         );
         msgToken.addData(
           getName(MessageEnum.SessionResponseToken),
           "TOKEN"
         );
         runEngine.sendMessage("Unit Test", msgToken);
   
         const msgValidationAPI = new Message(
           getName(MessageEnum.RestAPIResponceMessage)
         );
         msgValidationAPI.addData(
           getName(MessageEnum.RestAPIResponceDataMessage),
           msgValidationAPI.messageId
         );
       
         msgValidationAPI.addData(
           getName(MessageEnum.RestAPIResponceSuccessMessage),
           {
             data: {}
           }
         );
   
         instance.getUserDeliveryAddressAPICallId = msgValidationAPI.messageId;
         runEngine.sendMessage("Unit Test", msgValidationAPI);
   
         
         const msgError = new Message(
           getName(MessageEnum.RestAPIResponceErrorMessage)
         );
         msgError.addData(
           getName(MessageEnum.RestAPIResponceDataMessage),
           msgValidationAPI.messageId
         );
         msgError.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
           data: []
         });
         instance.getUserDeliveryAddressAPICallId = msgValidationAPI.messageId;
         runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("checkout failed to get user delivery address", () => {
      const msgLoadDataErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataErrorRestAPI
      );
      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );
      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataErrorRestAPI.messageId
      );
      instance.getUserDeliveryAddressAPICallId = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("checkout will update delivery address without errors", () => {
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
      instance.updateDeliveryAddressAPiCallID = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to update delivery address", () => {
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
      instance.updateDeliveryAddressAPiCallID = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will delete delivery address without errors", () => {
      // const msgSuccessRestAPI = new Message(
      //   getName(MessageEnum.RestAPIResponceMessage)
      // );
      // msgSuccessRestAPI.addData(
      //   getName(MessageEnum.RestAPIResponceDataMessage),
      //   msgSuccessRestAPI.messageId
      // );
      // msgSuccessRestAPI.addData(
      //   getName(MessageEnum.RestAPIResponceSuccessMessage),
      //   {
      //     data: {},
      //   }
      // );
      // instance.delCartItemApiCallId = msgSuccessRestAPI.messageId;
      // runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to delete delivery address", () => {
      // const msgErrorMessageRestAPI = new Message(
      //   getName(MessageEnum.RestAPIResponceMessage)
      // );
      // msgErrorMessageRestAPI.addData(
      //   getName(MessageEnum.RestAPIResponceSuccessMessage),
      //   {
      //     errors: [
      //       {
      //         Error: "Error",
      //       },
      //     ],
      //   }
      // );
      // instance.delCartItemApiCallId = msgErrorMessageRestAPI.messageId;
      // runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will calculate shipping address charge without errors", () => {
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
      instance.calculateShippingAddressChargeCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to calculate shipping address charge", () => {
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
      instance.calculateShippingAddressChargeCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will release shipping address charge without errors", () => {
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
      instance.releaseShippingAddressChargeCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to release shipping address charge", () => {
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
      instance.releaseShippingAddressChargeCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    
    then("checkout will get cart without errors", () => {
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
      instance.GetCartApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to get cart", () => {
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
      instance.GetCartApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will put update cart quantity", () => {
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
      instance.putUpdateCartQuantityApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to put update cart quantity", () => {
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
      instance.putUpdateCartQuantityApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });    

    then("checkout will delete cart item", () => {
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
      instance.delCartItemApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to delete cart item", () => {
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
      instance.delCartItemApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will post wishlist", () => {
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
      instance.postWishlistApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to post wishlist", () => {
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
      instance.postWishlistApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will post apply coupon", () => {
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
      instance.postApplyCouponApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to post apply coupon", () => {
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
      instance.postApplyCouponApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will delete coupon", () => {
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
      instance.delCouponApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to delete coupon", () => {
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
      instance.delCouponApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will buy now without errors", () => {
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
      instance.postBuyNowApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to buy now", () => {
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
      instance.postBuyNowApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will update delivery address without errors", () => {
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
      instance.updateDeliveryAddressAPiCallID = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to update delivery address", () => {
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
      instance.updateDeliveryAddressAPiCallID = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });
    
    then("Show select address modal without errors", () => {
     
    });
    then("I can select the button with out errors", () => {
      // let buttonComponent = shoppingcartWrapper.findWhere(
      //   (node) => node.prop("data-testid") === "input-cart-coupon"
      // );
      // jest.spyOn(instance, 'changeCouponCode')
      // expect(instance.changeCouponCode).toHaveBeenCalledTimes(1)
      // const event = {
      //   preventDefault() {},
      //   target: { value: "hello@aol.com" },
      // };
      // buttonComponent.simulate("change", event);
    });

    then('I can leave the screen with out errors', () => {
        instance.componentWillUnmount()
        expect(checkouttWrapper).toBeTruthy()
    });
});

test('User navigates to editaddress', ({ given, when, then }) => {
  let editAddressWrapper:ShallowWrapper;
  let instance:EditAddress; 

  given('I am a User loading editaddress', () => {
      editAddressWrapper = shallow(<EditAddress {...screenProps}/>)
  });

  when('I navigate to the editaddress', () => {
       instance = editAddressWrapper.instance() as EditAddress
  });

  then('editaddress will load with out errors', () => {
      expect(editAddressWrapper).toBeTruthy()
      instance = editAddressWrapper.instance() as EditAddress;
  });

  then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(editAddressWrapper).toBeTruthy()
  });
});

test('User navigates to saved address', ({ given, when, then }) => {
let savedAddressWrapper:ShallowWrapper;
let instance:SavedAddress; 

given('I am a User loading saved address', () => {
  savedAddressWrapper = shallow(<SavedAddress {...screenProps}/>)
});

when('I navigate to the saved address', () => {
     instance = savedAddressWrapper.instance() as SavedAddress
});

then('saved address will without errors', () => {
    expect(savedAddressWrapper).toBeTruthy()
});

then('I can leave the screen with out errors', () => {
    instance.componentWillUnmount()
    expect(savedAddressWrapper).toBeTruthy()
});
});

  })



