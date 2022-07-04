import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Container } from 'reactstrap';
import ProductCard from './DetailedCard';
import SectionHeading from '../../../../../studio-store-ecommerce-components/src/SectionHeading';
import './assets/css/index.scoped.css';

interface BoldProps extends RouteComponentProps {
    collection: any[],
    addToCart: Function,
    createWishlist: Function,
    deleteWishlist: Function,
    onViewMore: Function,
}

export const Bold: any = withRouter((props: BoldProps) => {
    const { collection, onViewMore, addToCart, history } = props
    const slicedProducts = collection.slice(0, 3);
    return (
        <section className='detailed-product-layout ds-mb-40 ds-mb-md-80'>
            <Container className='detailed-product-layout__container'>
                <SectionHeading
                    name="new arrivals"
                    className='mb-4 mb-md-40'
                    link={onViewMore}
                />
                {
                    slicedProducts.length > 0 ?
                        slicedProducts.map((product: any, index: number) => {
                            let oddIndex = index > 0 && index % 2 !== 0,
                                catalogue_variant_in_stock: any = product,
                                productOnSale: any,
                                productSaleprice: any,
                                ProductPrice: any,
                                countryCode: any = JSON.parse(localStorage.getItem('countryCode') ?? "{}")?.countryCode,
                                isStockAvailable: boolean,
                                isItemAddedToCart: any,
                                isVarientOrSubscriptionProduct: boolean,
                                productImage: any = product.attributes.images
                                    ? product.attributes.images.data[0].attributes.url
                                    : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";

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
                            }
                            productOnSale = catalogue_variant_in_stock.attributes.on_sale;
                            ProductPrice = catalogue_variant_in_stock ? productOnSale ? catalogue_variant_in_stock.attributes?.actual_price_including_tax : catalogue_variant_in_stock.attributes?.price_including_tax : productOnSale ? catalogue_variant_in_stock?.attributes?.actual_price_including_tax : catalogue_variant_in_stock?.attributes?.price_including_tax;
                            productSaleprice = catalogue_variant_in_stock ? catalogue_variant_in_stock.attributes.price_including_tax : catalogue_variant_in_stock?.attributes.price_including_tax;
                            isStockAvailable = (
                                product.attributes.stock_qty > 0 &&
                                Object.keys(catalogue_variant_in_stock).length !== 0 &&
                                catalogue_variant_in_stock.attributes.stock_qty >= 1
                            );
                            isItemAddedToCart = (
                                isStockAvailable &&
                                (

                                    Object.keys(product.attributes.cart_items).filter((keyName: any, keyIndex: any) => {
                                        return (parseInt(keyName) == catalogue_variant_in_stock.id);
                                    })[0] ||
                                    product.attributes.cart_quantity >= 1

                                )
                            )
                            isVarientOrSubscriptionProduct = (
                                (
                                    product.attributes.catalogue_variants &&
                                    product.attributes.catalogue_variants.length > 0
                                )
                                ||
                                product.attributes.is_subscription_available
                            )
                            return (
                                <ProductCard
                                    image={productImage}
                                    className={oddIndex ? "flex-md-row-reverse" : ""}
                                    productName={product.attributes.name}
                                    price={`${countryCode} ${ProductPrice}`}
                                    desc={product?.attributes?.description}
                                    stockAvailable={isStockAvailable}
                                    isItemAddedToCart={isItemAddedToCart}
                                    addItemToCart={() => addToCart(catalogue_variant_in_stock)}
                                    isVarientOrSubscriptionProduct={isVarientOrSubscriptionProduct}
                                    goToCart={() => history.push('/cart')}
                                    goToProductDetails={() => history.push(`/shop/${product.id}`)}
                                />
                            )
                        }) : <p>No Products Found.</p>

                }
            </Container>
        </section>
    );
})