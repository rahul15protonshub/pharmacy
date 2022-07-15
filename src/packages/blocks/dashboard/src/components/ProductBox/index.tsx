import React, { useState } from 'react'
//@ts-ignore
import content from "../../../../studio-store-ecommerce-components/src/content.js";
import CircularProgress from "@material-ui/core/CircularProgress";

interface ProductBoxProps {
    product: any,
    addToCartLoading: boolean,
    onProductDeleteFromWishlist: (productId: number) => void
    onProductAddToWishlist: (productId: number) => void
    onProductAddToCart: (product: any) => void
    onProductIncreaseCartQuantity: (product: any) => void
    onProductDecreaseCartQuantity: (product: any) => void
}

const ProductBox: React.FC<ProductBoxProps> = ({
    product, onProductDeleteFromWishlist, onProductAddToWishlist, onProductAddToCart,
    addToCartLoading, onProductIncreaseCartQuantity, onProductDecreaseCartQuantity
}) => {

    return (
        <div className='product_card_single'>
            <div>
                <div className='card_image'>
                    <img className='card_img' src={product.attributes.images?.data[0].attributes.url
                        || "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
                    } alt="Card image cap" />

                    <svg className={`likebuttononimage${product.attributes.wishlisted ? ' active' : ''}`} width="21" height="21" viewBox="0 0 24 24" fill="#fff" stroke="#8899a4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" onClick={() => {
                        product.attributes.wishlisted
                            ? onProductDeleteFromWishlist(product.id)
                            : onProductAddToWishlist(product.id)
                    }}></path></svg>
                </div>
                <div>
                    <div className='product_name'>{product.attributes.name}</div>
                    <div className='product_price'>{JSON.parse(localStorage.getItem('countryCode') ?? "{}")?.countryCode} {product.attributes.price_including_tax}</div>
                    <div className='product_quantity'>{product.attributes.weight} KG</div>

                </div>
            </div>
            <div>
                {
                    product.attributes.cart_quantity ? (
                        <div className='product_add_cart_count'>
                            <button className='cart_decrease' disabled={addToCartLoading} onClick={() => 
                                {
                                    onProductDecreaseCartQuantity(product)
                                }}>
                                -
                            </button>
                            <div className='cart_count'>{
                                addToCartLoading ? <CircularProgress size={25} /> : product.attributes.cart_quantity
                            }</div>
                            <button className='cart_increase' disabled={addToCartLoading || product.attributes.cart_quantity === product.attributes.stock_qty} onClick={() => {
                                if (product.attributes.cart_quantity < product.attributes.stock_qty) {
                                    onProductIncreaseCartQuantity(product)
                                }
                            }}>
                                +
                            </button>
                        </div>
                    ) : (
                        <button className='product_add_cart' onClick={() => {
                            onProductAddToCart(product)
                        }}>{addToCartLoading ? <CircularProgress size={25} /> : content.addToCart}</button>
                    )
                }
            </div>
        </div>
    )
}

export default ProductBox