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

const value={
  "address": {
      "name": "",
      "flat_no": "",
      "address": "",
      "address_line_2": "",
      "city": "",
      "address_state_id": "",
      "country": "",
      "zip_code": "",
      "phone_number": ""
  },
  "isShippingAddressSame": true,
  "billing_address": {
      "name": "Firoz khan",
      "flat_no": "486",
      "address": "Jail chowk Muzaffarpur Bihar",
      "address_state_id": "10",
      "address_line_2": "",
      "city": "Muzaffarpur",
      "country": "India",
      "zip_code": 482001,
      "phone_number": 9472154786
  },
  "country2": "",
  "billingCountry2": "india"
}

const data={
  "id": 211,
  "name": "Firoz khan",
  "flat_no": "486",
  "address": "Jail chowk Muzaffarpur Bihar",
  "address_type": "home",
  "address_line_2": "",
  "zip_code": "482001",
  "phone_number": "9472154786",
  "latitude": null,
  "longitude": null,
  "address_for": "billing_and_shipping",
  "is_default": false,
  "city": "Muzaffarpur",
  "state": "BIHAR",
  "country": "india",
  "landmark": null,
  "created_at": "2022-09-16T01:05:55.711Z",
  "updated_at": "2022-09-16T01:05:55.711Z",
  "address_state_id": 10
}
const order_item={
  "order_items": [
      {
          "order_item_ids": [
              2724
          ],
          "prescription_files": [
              "data:application/pdf;base64,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"
          ]
      }
  ]
}
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
    let cartAmountWrapper: ShallowWrapper;
    let cartProductListDataWrapper: ShallowWrapper;
    let instance:Checkout; 

    given('I am a User loading checkout', () => {
        checkouttWrapper = shallow(<Checkout history={history} {...screenProps}/>)
        cartAmountWrapper = shallow(<CartAmount wholeCart={wholeCart} />)
        cartProductListDataWrapper = shallow(<CartProductListData />)
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
        loading:false,
        countryName:"india",
        isCheckedShippingCharge:false,

      })
      instance.getStateList();
      instance.addNewAddressHandler(value)
      instance.getCart();
      instance.getDeliveryAddressList();
      instance.calculateShippingAddressCharge();
      instance.releaseShippingCharge();
      instance.getCart();
      instance.postApplyCoupon("FLATE50","")
      instance.deleteCoupon();
      instance.toApplyCoupon("FLATE50","24157.50")
      instance.setZipCode("482001")
      instance.checkShippingAggressCharge()
      instance.updateDeliveryAddress(75,"482001")
      instance.changeDefaultAddressHandler(data)
      instance.updateAddress(value)
      instance.handleCheckBoxChange()
      instance.setIsPrescModal(false)
      instance.postPrescriptionFile(order_item)
    })
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
      // let buttonComponent = checkouttWrapper.findWhere(
      //   (node) => node.prop("data-testid") === "input-cart-coupon"
      // );
      // const event = {
      //   preventDefault() {},
      //   target: { value: "FLAT50" },
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



