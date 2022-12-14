export const mockProductData = {
  id: "63",
  type: "catalogue",
  attributes: {
    name: "ABC 38",
    description: "",
    manufacture_date: null,
    block_qty: 0,
    price: 37.7,
    on_sale: false,
    sale_price: null,
    discount: null,
    recommended: true,
    sku: "COD0000063",
    length: null,
    breadth: null,
    height: null,
    weight: "1.0",
    brand: {
      id: 4,
      name: "Brand 1 & Brand 3",
      created_at: "2021-06-02T07:58:52.723Z",
      updated_at: "2021-06-02T07:58:52.723Z",
    },
    tags: [
      {
        id: 4,
        name: "tag 11",
        created_at: "2021-06-02T07:58:23.736Z",
        updated_at: "2021-06-02T07:58:23.736Z",
      },
    ],
    reviews: [],
    current_availibility: "in_stock",
    default_variant: {
      id: 139,
      catalogue_id: 63,
      catalogue_variant_color_id: 4,
      catalogue_variant_size_id: 2,
      price: "37.7",
      stock_qty: 76,
      on_sale: false,
      sale_price: null,
      discount_price: null,
      length: null,
      breadth: null,
      height: null,
      created_at: "2021-06-18T09:51:32.392Z",
      updated_at: "2021-06-18T10:48:14.634Z",
      block_qty: 0,
      is_default: true,
      sold: null,
      current_availability: "in_stock",
      remaining_stock: null,
    },
    stock_qty: 76,
    cart_quantity: null,
    wishlisted: false,
    product_notified: false,
    cart_items: {},
    average_rating: 0,
    images: {
      data: [
        {
          id: "218",
          type: "attachment",
          attributes: {
            attachable_type: "BxBlockCatalogue::Catalogue",
            attachable_id: 63,
            position: null,
            is_default: true,
            url: "",
            url_link: null,
            "is_present?": false,
            url_id: null,
            url_type: null,
          },
        },
      ],
    },
    product_attributes: [
      {
        color: [
          {
            id: 4,
            name: "Maroon",
            created_at: "2021-06-16T12:18:27.009Z",
            updated_at: "2021-06-16T12:18:27.009Z",
          },
        ],
        size: [
          {
            id: 2,
            name: "M",
            created_at: "2021-05-28T06:40:08.421Z",
            updated_at: "2021-05-28T06:40:08.421Z",
          },
        ],
      },
    ],
    availability: [
      {
        variant_name: "color",
        variant_property_ids: [4],
      },
      {
        variant_name: "size",
        variant_property_ids: [2],
      },
    ],
    deep_link: "",
    catalogue_variants: [
      {
        id: "139",
        type: "catalogue_variant",
        attributes: {
          id: 139,
          catalogue_id: 63,
          price: "37.7",
          stock_qty: 76,
          on_sale: false,
          sale_price: null,
          discount_price: null,
          length: null,
          breadth: null,
          height: null,
          is_default: true,
          created_at: "2021-06-18T09:51:32.392Z",
          updated_at: "2021-06-18T10:48:14.634Z",
          product_variant_properties: [
            {
              product_variant_id: 139,
              variant_property_id: 2,
              variant_name: "size",
              property_name: "M",
            },
            {
              product_variant_id: 139,
              variant_property_id: 4,
              variant_name: "color",
              property_name: "Maroon",
            },
          ],
          images: {
            data: [
              {
                id: "217",
                type: "attachment",
                attributes: {
                  attachable_type: "BxBlockCatalogue::CatalogueVariant",
                  attachable_id: 139,
                  position: null,
                  is_default: true,
                  url: "",
                  url_link: null,
                  "is_present?": false,
                  url_id: null,
                  url_type: null,
                },
              },
            ],
          },
          cart_quantity: null,
          is_notify_product: false,
        },
      },
    ],
    variants_in_cart: [],
    can_review: false,
    similar_products: {
      data: [],
    },
    category: [
      {
        data: {
          id: "1",
          type: "category",
          attributes: {
            id: 1,
            name: "Category 1",
            created_at: "2021-05-28T06:40:50.531Z",
            updated_at: "2021-06-18T05:51:51.575Z",
            product_image: {
              id: 110,
              url: "",
            },
          },
        },
      },
      {
        data: {
          id: "1",
          type: "category",
          attributes: {
            id: 1,
            name: "Category 1",
            created_at: "2021-05-28T06:40:50.531Z",
            updated_at: "2021-06-18T05:51:51.575Z",
            product_image: {
              id: 110,
              url: "",
            },
          },
        },
      },
    ],
  },
};
