export const mockCart = {
  data: [
    {
      id: "300",
      type: "cart",
      attributes: {
        id: 300,
        order_number: "OD00000293",
        amount: null,
        account_id: 85,
        coupon_code_id: null,
        sub_total: "16030.0",
        total: "17953.6",
        status: "in_cart",
        applied_discount: "0.0",
        shipping_total: "0.0",
        created_at: "2021-07-20T07:45:40.260Z",
        updated_at: "2021-07-20T07:45:55.867Z",
        delivery_addresses: [],
        razorpay_order_id: null,
        order_items: [
          {
            id: "577",
            type: "order_item",
            attributes: {
              id: 577,
              order_id: 300,
              quantity: 1,
              unit_price: "16000.0",
              total_price: "16000.0",
              old_unit_price: null,
              status: "in_cart",
              catalogue_id: 47,
              catalogue_variant_id: 95,
              order_status_id: 9,
              placed_at: null,
              confirmed_at: null,
              in_transit_at: null,
              delivered_at: null,
              cancelled_at: null,
              refunded_at: null,
              manage_placed_status: false,
              manage_cancelled_status: false,
              created_at: "2021-07-20T07:45:55.851Z",
              updated_at: "2021-07-20T07:45:55.874Z",
              delivery_addresses: [],
              catalogue: {
                id: "47",
                type: "catalogue",
                attributes: {
                  name: "ABC 22",
                  images: {
                    data: [
                      {
                        id: "158",
                        type: "attachment",
                        attributes: {
                          url:
                            "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbjRCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e01cc85bc18ab230bd8284f1f205736099323874/ABC0.jpg",
                        },
                      },
                    ],
                  },
                },
              },
              catalogue_variant: {
                id: "95",
                type: "catalogue_variant",
                attributes: {
                  id: 95,
                  catalogue_id: 47,
                  price: "16000.0",
                  stock_qty: 4,
                  on_sale: false,
                  sale_price: null,
                  discount_price: null,
                  length: 12.0,
                  breadth: 13.0,
                  height: 14.0,
                  is_default: true,
                  created_at: "2021-06-18T09:35:43.756Z",
                  updated_at: "2021-06-23T06:37:14.859Z",
                  product_variant_properties: [
                    {
                      product_variant_id: 95,
                      variant_property_id: 3,
                      variant_name: "size",
                      property_name: "S",
                    },
                    {
                      product_variant_id: 95,
                      variant_property_id: 3,
                      variant_name: "color",
                      property_name: "Red",
                    },
                  ],
                  images: {
                    data: [
                      {
                        id: "157",
                        type: "attachment",
                        attributes: {
                          attachable_type: "BxBlockCatalogue::CatalogueVariant",
                          attachable_id: 95,
                          position: null,
                          is_default: true,
                          url:
                            "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbm9CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6adb5767598ee19217f3e72790390a3b29fa8e9b/ABCred0.jpg",
                          url_link: null,
                          "is_present?": false,
                          url_id: null,
                          url_type: null,
                        },
                      },
                    ],
                  },
                  cart_quantity: null,
                  is_notify_product: null,
                },
              },
              product_name: "ABC 22",
              overall_order_status: "in_cart",
              product_price: 16000.0,
              product_sale_price: null,
              product_on_sale: false,
              product_discount: null,
              product_variant_price: "16000.0",
              product_variant_sale_price: null,
              product_variant_on_sale: false,
              product_variant_discount: null,
              product_variant_is_deliverable: true,
              is_item_cancelled: false,
              is_review_present: false,
              review: null,
              delivery_address: null,
              order_date: null,
              order_number: "OD00000292",
              is_deliverable: true,
              product_images: null,
              item_history: [],
            },
          },
          {
            id: "576",
            type: "order_item",
            attributes: {
              id: 576,
              order_id: 300,
              quantity: 1,
              unit_price: "30.0",
              total_price: "30.0",
              old_unit_price: null,
              status: "in_cart",
              catalogue_id: 3,
              catalogue_variant_id: 3,
              order_status_id: 9,
              placed_at: null,
              confirmed_at: null,
              in_transit_at: null,
              delivered_at: null,
              cancelled_at: null,
              refunded_at: null,
              manage_placed_status: false,
              manage_cancelled_status: false,
              created_at: "2021-07-20T07:45:40.269Z",
              updated_at: "2021-07-20T07:45:40.291Z",
              delivery_addresses: [],
              catalogue: {
                id: "3",
                type: "catalogue",
                attributes: {
                  name: "Product 3",
                  description: "",
                  manufacture_date: null,
                  block_qty: 1,
                  price: 30.0,
                  on_sale: false,
                  sale_price: null,
                  discount: null,
                  recommended: false,
                  sku: "COD0000003",
                  length: null,
                  breadth: null,
                  height: null,
                  weight: "1.0",
                  brand: {
                    id: 1,
                    name: "Brand 1",
                    created_at: "2021-05-28T06:40:16.184Z",
                    updated_at: "2021-05-28T06:40:16.184Z",
                  },
                  tags: [
                    {
                      id: 2,
                      name: "Tag 2",
                      created_at: "2021-05-28T06:39:39.886Z",
                      updated_at: "2021-05-28T06:39:39.886Z",
                    },
                  ],
                  reviews: [],
                  current_availibility: "in_stock",
                  default_variant: {
                    id: 3,
                    catalogue_id: 3,
                    catalogue_variant_color_id: 2,
                    catalogue_variant_size_id: 2,
                    price: "30.0",
                    stock_qty: 107,
                    on_sale: false,
                    sale_price: null,
                    discount_price: null,
                    length: null,
                    breadth: null,
                    height: null,
                    created_at: "2021-05-28T06:48:19.657Z",
                    updated_at: "2021-06-23T12:32:45.671Z",
                    block_qty: 1,
                    is_default: true,
                    sold: null,
                    current_availability: "in_stock",
                    remaining_stock: null,
                  },
                  stock_qty: 107,
                  cart_quantity: null,
                  wishlisted: false,
                  product_notified: false,
                  cart_items: null,
                  average_rating: 0,
                  images: {
                    data: [
                      {
                        id: "9",
                        type: "attachment",
                        attributes: {
                          attachable_type: "BxBlockCatalogue::Catalogue",
                          attachable_id: 3,
                          position: null,
                          is_default: true,
                          url:
                            "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBWdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--794cbed342c27dc1a8da58e07190b1316d2c7d90/FoodIMages2.jpg",
                          url_link: null,
                          "is_present?": false,
                          url_id: null,
                          url_type: null,
                        },
                      },
                    ],
                  },
                  catalogue_variants: [
                    {
                      id: "3",
                      type: "catalogue_variant",
                      attributes: {
                        id: 3,
                        catalogue_id: 3,
                        price: "30.0",
                        stock_qty: 107,
                        on_sale: false,
                        sale_price: null,
                        discount_price: null,
                        length: null,
                        breadth: null,
                        height: null,
                        is_default: true,
                        created_at: "2021-05-28T06:48:19.657Z",
                        updated_at: "2021-06-23T12:32:45.671Z",
                        product_variant_properties: [
                          {
                            product_variant_id: 3,
                            variant_property_id: 2,
                            variant_name: "size",
                            property_name: "M",
                          },
                          {
                            product_variant_id: 3,
                            variant_property_id: 2,
                            variant_name: "color",
                            property_name: "White",
                          },
                        ],
                        images: {
                          data: [
                            {
                              id: "8",
                              type: "attachment",
                              attributes: {
                                attachable_type:
                                  "BxBlockCatalogue::CatalogueVariant",
                                attachable_id: 3,
                                position: null,
                                is_default: true,
                                url:
                                  "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBWZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--dbe5d835d3049e8513ae23726e1f75f3107a89b0/FoodIMages1.jpg",
                                url_link: null,
                                "is_present?": false,
                                url_id: null,
                                url_type: null,
                              },
                            },
                          ],
                        },
                        cart_quantity: null,
                        is_notify_product: null,
                      },
                    },
                  ],
                  variants_in_cart: [],
                  category: [
                    {
                      data: {
                        id: "2",
                        type: "category",
                        attributes: {
                          id: 2,
                          name: "Category 2",
                          created_at: "2021-05-28T06:41:45.023Z",
                          updated_at: "2021-06-18T05:51:51.560Z",
                          product_image: {
                            id: 113,
                            url:
                              "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBkZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--aa4fbb34e249195f7f4562d4d50f502e0c064c4c/FoodIMages3.jpg",
                          },
                        },
                      },
                    },
                  ],
                },
              },
              catalogue_variant: {
                id: "3",
                type: "catalogue_variant",
                attributes: {
                  id: 3,
                  catalogue_id: 3,
                  price: "30.0",
                  stock_qty: 107,
                  on_sale: false,
                  sale_price: null,
                  discount_price: null,
                  length: null,
                  breadth: null,
                  height: null,
                  is_default: true,
                  created_at: "2021-05-28T06:48:19.657Z",
                  updated_at: "2021-06-23T12:32:45.671Z",
                  product_variant_properties: [
                    {
                      product_variant_id: 3,
                      variant_property_id: 2,
                      variant_name: "size",
                      property_name: "M",
                    },
                    {
                      product_variant_id: 3,
                      variant_property_id: 2,
                      variant_name: "color",
                      property_name: "White",
                    },
                  ],
                  images: {
                    data: [
                      {
                        id: "8",
                        type: "attachment",
                        attributes: {
                          attachable_type: "BxBlockCatalogue::CatalogueVariant",
                          attachable_id: 3,
                          position: null,
                          is_default: true,
                          url:
                            "https://test-67852-ruby.b67852.dev.centralindia.az.svc.builder.ai//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBWZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--dbe5d835d3049e8513ae23726e1f75f3107a89b0/FoodIMages1.jpg",
                          url_link: null,
                          "is_present?": false,
                          url_id: null,
                          url_type: null,
                        },
                      },
                    ],
                  },
                  cart_quantity: null,
                  is_notify_product: null,
                },
              },
              product_name: "Product 3",
              overall_order_status: "in_cart",
              product_price: 30.0,
              product_sale_price: null,
              product_on_sale: false,
              product_discount: null,
              product_variant_price: "30.0",
              product_variant_sale_price: null,
              product_variant_on_sale: false,
              product_variant_discount: null,
              product_variant_is_deliverable: true,
              is_item_cancelled: false,
              is_review_present: false,
              review: null,
              delivery_address: null,
              order_date: null,
              order_number: "OD00000292",
              is_deliverable: true,
              product_images: null,
              item_history: [],
            },
          },
        ],
        account: {
          id: "85",
          type: "account",
          attributes: {
            activated: true,
            full_name: "alex wang",
            user_name: null,
            email: "alex.wang@builder.ai",
            full_phone_number: "",
            phone_number: null,
            type: "EmailAccount",
            created_at: "2021-06-09T01:54:59.837Z",
            updated_at: "2021-06-20T08:29:43.698Z",
            device_id: null,
            provider: null,
            unique_auth_id: null,
            guest: null,
            uuid: null,
            is_notification_enabled: true,
            fcm_token:
              "cnBHyVjvMkxbgMs6X8psdq:APA91bHWYTtt10-yonGlTkUlpd0Yv-xCh6Ydnb7Lfz64Nj-IPkn0g1ZRhXCZfkaJuegIQMaY-pjrbdmAnP5GkJytne5FZoEEmUqUUpQnQdlUh3r7q5Vt2bCeyEIl54jybI-3B4Jm4qr-",
            country_code: null,
            image_url: null,
            is_social_login: false,
            wishlist_quantity: 0,
          },
        },
        order_transaction: [],
        coupon: null,
      },
    },
  ],
};
