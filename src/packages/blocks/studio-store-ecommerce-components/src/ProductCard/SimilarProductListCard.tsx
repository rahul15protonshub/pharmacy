// @ts-nocheck
import React, { Fragment } from "react";
import { Button } from "reactstrap";
import { useMediaQuery } from 'react-responsive';
import ArrowCarousel from "../ArrowCarousel";
import ArrowAnimateCarousel from "../ArrowAnimateCarousel";
import { withRouter } from "react-router-dom";
import "./css/index.scoped.css";

export const configJSON = require("./config.js");

//@ts-ignore
import content from "../content"
let list: any = [];

const SimilarProductListCard: any = withRouter((props: any) => {

    /// to display products

    function getList() {
        let list: any = [];
        props.collection && props.collection.forEach((product: any, index: number) => {
            let catalogue_variant_in_stock: any, productOnSale: any, productSlaeprice: any, ProductPrice: any;
            if (product.attributes.default_variant) {
                catalogue_variant_in_stock =
                    product.attributes.stock_qty > 0
                        ? product.attributes.default_variant.stock_qty > 0
                            ? product.attributes.catalogue_variants.filter(
                                (variant: any, index: any) => {
                                    return (
                                        variant.id ==
                                        parseInt(product.attributes.default_variant.id)
                                    );
                                }
                            )[0]
                            : product.attributes.catalogue_variants.filter(
                                (variant: any, index: any) => {
                                    return variant.attributes.stock_qty > 0;
                                }
                            )[0]
                        : product.attributes.catalogue_variants[0];
            } else {
                catalogue_variant_in_stock = product;
            }
            productOnSale = catalogue_variant_in_stock ? catalogue_variant_in_stock.attributes.on_sale : catalogue_variant_in_stock.attributes.on_sale;
            ProductPrice = catalogue_variant_in_stock ? productOnSale ? catalogue_variant_in_stock.attributes?.actual_price_including_tax : catalogue_variant_in_stock.attributes?.price_including_tax : productOnSale ? catalogue_variant_in_stock?.attributes?.actual_price_including_tax : catalogue_variant_in_stock?.attributes?.price_including_tax;
            productSlaeprice = catalogue_variant_in_stock ? catalogue_variant_in_stock.attributes.price_including_tax : catalogue_variant_in_stock?.attributes.price_including_tax;
            let percentageValue =
                (
                    (
                        parseInt(catalogue_variant_in_stock.attributes.price) - parseInt(catalogue_variant_in_stock.attributes.sale_price)
                    ) /
                    parseInt(catalogue_variant_in_stock.attributes.price)
                ) * 100;

            list.push(
                <div className="slider-container" key={index}>
                    <div className="item-slider">
                        <div className="product product-slider-cpnt text-center">
                            <div style={{ position: 'relative', width: 'fit-content', margin: '0 auto' }}>
                                <img style={{ position: 'relative' }} alt={catalogue_variant_in_stock.attributes.name} src={product.attributes.images
                                    ? product.attributes.images.data[0].attributes.url
                                    : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"}
                                    className="px-3 img-fluid yt-td-product-img prodimage w3-ripple ml-auto mr-auto"
                                    onClick={() => {
                                        setTimeout(() => {
                                            props.history.push(`/shop/${product.id}`);
                                        }, 500);
                                    }}
                                />
                                {product.attributes.wishlisted ?
                                    (
                                        <svg className="addedtowishlis likebuttononimaget" onClick={() => props.deleteWishlist(product.id)} width="21" height="21" viewBox="0 0 24 24" fill="#fff" stroke="#8899A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                    ) : (
                                        <svg className=" addtowishlist likebuttononimage" onClick={() => props.createWishlist(product.id)} width="21" height="21" viewBox="0 0 24 24" fill="#fff" stroke="#8899A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
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
                                                                        props.history.push(`/shop/${product.id}`);
                                                                    }, 500);
                                                                }
                                                                else {
                                                                    props.addToCart(
                                                                        catalogue_variant_in_stock
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
                                                                    props.history.push(`/shop/${product.id}`);
                                                                }, 500);
                                                            } else {
                                                                props.addToCart(
                                                                    catalogue_variant_in_stock
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

            list = [...list];
        });

        return list;
    }

    if (
        props.collection &&
        Array.isArray(props.collection) &&
        props.collection.length > 0
    ) {
        list = getList();
    }
    const showCard = list.length > 0;
    const spacings = {
        sm: 28,
        md: 44,
        lg: 60,
        xl: 113
    }
    const isMobile = useMediaQuery({ query: '(min-width:0px)' });
    const isTab = useMediaQuery({ query: '(min-width:768px)' });
    const isLargeTab = useMediaQuery({ query: '(min-width:992px)' });
    const isLaptop = useMediaQuery({ query: '(min-width:1200px)' });
    let currentSpacing;
    if (isLaptop) {
        currentSpacing = 'xl'
    } else if (isLargeTab) {
        currentSpacing = 'lg'
    } else if (isTab) {
        currentSpacing = 'md'
    } else if (isMobile) {
        currentSpacing = 'sm'
    }

    const carouselProps: any = {
        outerSpacing: spacings[currentSpacing]
    }
    return props.collection &&
        Array.isArray(props.collection) &&
        props.collection.length > 0 &&
        showCard ? (
        <section className="product-slider">
            <div className="yt-component-wrapper yt-slider-component">
                {
                    <ArrowAnimateCarousel carouselProps={carouselProps}>
                        {list}
                    </ArrowAnimateCarousel>
                }
            </div>
        </section>
    ) : (
        <section className="hp-product-slider">
            <div className="yt-component-wrapper yt-slider-component mt-4">
                No Products Found.
            </div>
        </section>
    );
});

export default SimilarProductListCard;
