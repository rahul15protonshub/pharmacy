import React, { useState } from "react";
//@ts-ignore
import content from "../../../../studio-store-ecommerce-components/src/content";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

interface ProductBoxProps {
  product: any;
  isProductAddtoCart: boolean;
  addToCartLoading: boolean;
  wishlistLoading: boolean;
  onProductDeleteFromWishlist: (productId: number) => void;
  onProductAddToWishlist: (productId: number) => void;
  onProductAddToCart: (product: any) => void;
  onProductIncreaseCartQuantity: (product: any) => void;
  onProductDecreaseCartQuantity: (product: any) => void;
}

const ProductBox: React.FC<ProductBoxProps> = ({
  product,
  onProductDeleteFromWishlist,
  onProductAddToWishlist,
  onProductAddToCart,
  addToCartLoading,
  onProductIncreaseCartQuantity,
  onProductDecreaseCartQuantity,
  wishlistLoading,
  isProductAddtoCart,
}) => {
  let productDefaultWeight = (
    <>
      {product.attributes.weight ?? ""} {product.attributes.weight_unit ?? ""}
    </>
  );
  let productDefaultPrice = product.attributes.on_sale
    ? product.attributes.price_including_tax
    : product.attributes.actual_price_including_tax;
  let productDefaultNonDiscountedPrice = product.attributes.on_sale
    ? product.attributes.actual_price_including_tax
    : null;
  let productDefaultCartQuantity = product.attributes.cart_quantity;
  let productDefaultStockQuantity = product.attributes.stock_qty;

  if (product.attributes.default_variant) {
    const defaultVariantDetails = product.attributes.catalogue_variants.find(
      (v: any) => parseInt(v.id) === product.attributes.default_variant.id
    );
    if (defaultVariantDetails) {
      productDefaultPrice = defaultVariantDetails.attributes.on_sale
        ? defaultVariantDetails.attributes.price_including_tax
        : defaultVariantDetails.attributes.actual_price_including_tax;
      productDefaultNonDiscountedPrice = defaultVariantDetails.attributes
        .on_sale
        ? defaultVariantDetails.attributes.actual_price_including_tax
        : null;
      const weightDetails =
        defaultVariantDetails.attributes.catalogue_variant_properties.find(
          (p: any) =>
            p.attributes.variant_name.trim().toLowerCase() === "weight"
        );
      if (weightDetails) {
        productDefaultWeight = <>{weightDetails.attributes.property_name}</>;
      }
      productDefaultCartQuantity =
        defaultVariantDetails.attributes.cart_quantity;
      productDefaultStockQuantity = defaultVariantDetails.attributes.stock_qty;
    }
  }
  // return (
  //   <div className="product_card_single">
  //     <div>
  //       <div className="card_image">
  //         <Link to={`/shop/${product.id}`}>
  //           <img
  //             className="card_img"
  //             src={
  //               product.attributes.images?.data[0].attributes.url ||
  //               "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
  //             }
  //             alt="Card image cap"
  //           />
  //         </Link>

  //         <svg
  //           className={`likebuttononimage${
  //             product.attributes.wishlisted ? " active" : ""
  //           }`}
  //           width="21"
  //           height="21"
  //           viewBox="0 0 24 24"
  //           fill="#fff"
  //           stroke="#8899a4"
  //           strokeWidth="2"
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //         >
  //           <path
  //             d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  //             onClick={() => {
  //               product.attributes.wishlisted
  //                 ? onProductDeleteFromWishlist(product.id)
  //                 : onProductAddToWishlist(product.id);
  //             }}
  //           ></path>
  //         </svg>
  //       </div>
  //       <div>
  //         <div className="product_name">{product.attributes.name}</div>
  //         <div className="product_price">
  //           {
  //             JSON.parse(localStorage.getItem("countryCode") ?? "{}")
  //               ?.countryCode
  //           }{" "}
  //           {product.attributes.price_including_tax}
  //         </div>
  //         <div className="product_quantity">{product.attributes.weight}</div>
  //       </div>
  //     </div>
  //     <div>
  //       {product.attributes.cart_quantity ? (
  //         <div className="product_add_cart_count">
  //           <button
  //             className="cart_decrease"
  //             disabled={addToCartLoading}
  //             onClick={() => {
  //               onProductDecreaseCartQuantity(product);
  //             }}
  //           >
  //             -
  //           </button>
  //           <div className="cart_count">
  //             {addToCartLoading ? (
  //               <CircularProgress size={25} />
  //             ) : (
  //               product.attributes.cart_quantity
  //             )}
  //           </div>
  //           <button
  //             className="cart_increase"
  //             disabled={
  //               addToCartLoading ||
  //               product.attributes.cart_quantity ===
  //                 product.attributes.stock_qty
  //             }
  //             onClick={() => {
  //               if (
  //                 product.attributes.cart_quantity <
  //                 product.attributes.stock_qty
  //               ) {
  //                 onProductIncreaseCartQuantity(product);
  //               }
  //             }}
  //           >
  //             +
  //           </button>
  //         </div>
  //       ) : (
  //         <button
  //           className="product_add_cart"
  //           onClick={() => {
  //             onProductAddToCart(product);
  //           }}
  //         >
  //           {addToCartLoading ? (
  //             <CircularProgress size={25} />
  //           ) : (
  //             content.addToCart
  //           )}
  //         </button>
  //       )}
  //     </div>
  //   </div>
  // );
  return (
    <div className="product_card_single">
      <Link to={`/shop/${product.id}`} className="d-flex flex-fill flex-column">
        <div className="d-flex flex-fill flex-column">
          <div className="card_image">
            <img
              className="card_img"
              src={
                product.attributes.images?.data[0].attributes.url ||
                "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
              }
              alt="Card image cap"
            />

            <button
              className="product_wishlist_button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                product.attributes.wishlisted
                  ? onProductDeleteFromWishlist(product.id)
                  : onProductAddToWishlist(product.id);
              }}
            >
              {wishlistLoading ? (
                <CircularProgress size={21} />
              ) : (
                <svg
                  className={`likebuttononimage${
                    product.attributes.wishlisted ? " active" : ""
                  }`}
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="#fff"
                  stroke="#8899a4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              )}
            </button>
          </div>
          <div className="d-flex flex-column flex-fill" style={{width:"210px"}}>
            <div className="product_name">{product.attributes.name}</div>
            <div className="product_price">
              <div>
                <span>
                  {
                    JSON.parse(localStorage.getItem("countryCode") ?? "{}")
                      ?.countryCode
                  }{" "}
                  {Number(productDefaultPrice.toString()).toFixed(2)}
                </span>
                {productDefaultNonDiscountedPrice && (
                  <span className="product_non_discounted_price">
                    {
                      JSON.parse(localStorage.getItem("countryCode") ?? "{}")
                        ?.countryCode
                    }{" "}
                    {Number(
                      productDefaultNonDiscountedPrice.toString()
                    ).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <div className="product_quantity">{productDefaultWeight}</div>
          </div>
        </div>
      </Link>
      <div>
        {product.attributes.stock_qty>0?(
<>
{productDefaultCartQuantity ? (
          <div className="product_add_cart_count">
            <button
              className="cart_decrease"
              disabled={addToCartLoading}
              onClick={() => {
                onProductDecreaseCartQuantity(product);
              }}
            >
              -
            </button>
            <div className="cart_count flex-fill">
              {productDefaultCartQuantity}
            </div>
            <button
              className="cart_increase"
              disabled={
                addToCartLoading ||
                productDefaultCartQuantity >= productDefaultStockQuantity
              }
              onClick={() => {
                if (productDefaultCartQuantity < productDefaultStockQuantity) {
                  onProductIncreaseCartQuantity(product);
                }
              }}
            >
              +
            </button>
          </div>
        ) : (
          <button
            disabled={isProductAddtoCart}
            className="product_add_cart"
            onClick={() => {
              onProductAddToCart(product);
            }}
          >
            {content.addToCart}
          </button>
        )}
</>
        ):(
            <button
            disabled={true}
            className="product_add_cart"
          >
            Out of Stock
          </button> 
        )}
        
      </div>
    </div>
  );
};

export default ProductBox;
