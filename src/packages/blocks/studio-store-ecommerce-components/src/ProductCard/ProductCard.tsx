import * as React from 'react';
import { Fragment } from 'react';
import { Button } from 'reactstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
// @ts-ignore
import content from "../content.js"
import './css/index.scoped.css';

interface ProductCardProps extends RouteComponentProps {
    product: any,
    catalogue_variant_in_stock: any,
    productOnSale: boolean,
    deleteWishlist: Function,
    createWishlist: Function,
    addToCart: Function,
    ProductPrice: number,
    productSlaeprice: number
}

const ProductCard: any = withRouter((props: ProductCardProps) => {
    const {
        product,
        catalogue_variant_in_stock,
        history,
        productOnSale,
        deleteWishlist,
        createWishlist,
        addToCart,
        ProductPrice,
        productSlaeprice
    } = props
    return (
        <div className="slider-container">
            <div className="item-slider">
                <div className="product product-slider-cpnt text-center">
                    <div style={{ position: 'relative', width: 'fit-content', margin: '0 16px' }}>
                        <img style={{ position: 'relative',padding : '0',borderRadius : '5px' }} alt={catalogue_variant_in_stock.attributes.name} src={product.attributes.images
                            ? product.attributes.images.data[0].attributes.url
                            : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"}
                            className="img-fluid yt-td-product-img prodimage w3-ripple ml-auto mr-auto"
                            onClick={() => {
                                setTimeout(() => {
                                    history.push(`/shop/${product.id}`);
                                }, 500);
                            }}
                        />
                        {product.attributes.wishlisted ?
                            (
                                <svg className="addedtowishlist" onClick={() => deleteWishlist(product.id)} width="21" height="21" viewBox="0 0 24 24" fill="#fff" stroke="#8899A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            ) : (
                                <svg className=" addtowishlist" onClick={() => createWishlist(product.id)} width="21" height="21" viewBox="0 0 24 24" fill="#fff" stroke="#8899A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            )
                        }
                    </div>

                    {/* </Link> */}
                    <div className="product-details ">
                        <div className="product-title ellises sdfsdf" title={product.attributes.name}>
                            {product.attributes.name}
                        </div>
                        <div className="price-wrap">
                            {productOnSale && (
                                <>
                                    <span className="price1 product-sale-price">
                                        {/* @ts-ignore  */}
                                        {JSON.parse(localStorage.getItem('countryCode') ?? "{}")?.countryCode} {parseFloat(productSlaeprice).toFixed(2)}
                                    </span>
                                    <span className="price2 product-reg-price2">
                                        {/* @ts-ignore  */}
                                        {JSON.parse(localStorage.getItem('countryCode') ?? "{}")?.countryCode} {parseFloat(ProductPrice).toFixed(2)}
                                    </span>
                                </>
                            )}
                            {!productOnSale && (
                                <span className="price1 product-sale-price">
                                    {/* @ts-ignore  */}
                                    {JSON.parse(localStorage.getItem('countryCode') ?? "{}")?.countryCode} {parseFloat(ProductPrice).toFixed(2)}
                                </span>
                            )}
                        </div>


                        {product.attributes.stock_qty > 0 && Object.keys(catalogue_variant_in_stock).length !== 0 &&
                            catalogue_variant_in_stock.attributes.stock_qty >= 1
                            ?
                            (
                                <Fragment>
                                    {(Object.keys(product.attributes.cart_items).length !== 0 || product.attributes.cart_quantity >= 1)
                                        ?
                                        ((Object.keys(product.attributes.cart_items).filter((keyName: any, keyIndex: any) => {
                                            return (parseInt(keyName) == catalogue_variant_in_stock.id);
                                        }
                                        )[0] || product.attributes.cart_quantity >= 1)
                                            ?
                                            (
                                                <Button
                                                    color="secondary button-cart"
                                                    onClick={() => {
                                                        localStorage.removeItem("buyNow")
                                                        //@ts-ignore
                                                        props?.history.push("/cart")
                                                    }}
                                                >
                                                    {content.goToCart}
                                                </Button>
                                            )
                                            :
                                            (
                                                <Button
                                                    color="secondary button-cart"
                                                    onClick={() => {
                                                        if (
                                                            (product.attributes.catalogue_variants && product.attributes.catalogue_variants.length > 0) || product.attributes.is_subscription_available) {
                                                            setTimeout(() => {
                                                                history.push(`/shop/${product.id}`);
                                                            }, 500);
                                                        }
                                                        else {
                                                            addToCart(
                                                                catalogue_variant_in_stock
                                                                // .attributes
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {content.addToCart}
                                                </Button>
                                            )
                                        )
                                        :
                                        (
                                            <Button
                                                color="secondary button-cart"
                                                onClick={() => {
                                                    if (
                                                        (product.attributes.catalogue_variants && product.attributes.catalogue_variants.length > 0) || product.attributes.is_subscription_available) {
                                                        setTimeout(() => {
                                                            history.push(`/shop/${product.id}`);
                                                        }, 500);
                                                    } else {
                                                        addToCart(
                                                            catalogue_variant_in_stock
                                                            // .attributes
                                                        );
                                                    }
                                                }}
                                            >
                                                {content.addToCart}
                                            </Button>
                                        )
                                    }
                                </Fragment>
                            )
                            : (
                                <Button disabled color="secondary button-cart">
                                    {content.outOfStock}
                                </Button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
})

export default ProductCard;