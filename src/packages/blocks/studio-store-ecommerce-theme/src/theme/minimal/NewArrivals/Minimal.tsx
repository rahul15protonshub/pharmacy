import * as React from 'react';
import { Container } from 'reactstrap';
import ProductCard from '../../../../../studio-store-ecommerce-components/src/ProductCard/ProductCard';
import { MinimalHeading } from '../../../../../studio-store-ecommerce-components/src/SectionHeading';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Carousel from '../../../../../studio-store-ecommerce-components/src/ArrowCarousel';

interface MinimalProps extends RouteComponentProps {
    collection: any[],
    addToCart: Function,
    createWishlist: Function,
    deleteWishlist: Function,
    onViewMore: Function,
}

export const Minimal: any = withRouter((props: MinimalProps) => {
    const { collection, onViewMore, addToCart, createWishlist, deleteWishlist } = props
    const slicedProducts = [...collection];
    return (
        <section className='ds-mb-40 ds-mb-md-80'>
            <Container className='carousel-responsive-container'>
                <MinimalHeading
                    name="New Arrivals"
                    className='px-3 px-lg-0 ds-mb-md-40 mb-2'
                    link={onViewMore}
                />
                {
                    slicedProducts.length > 0 ?
                        <Carousel
                            carouselProps={
                                {
                                    breakPoints: [
                                        {
                                            width: 0,
                                            itemsToShow: 1.9,
                                            itemsToScroll: 1
                                        },
                                        {
                                            width: 768,
                                            itemsToShow: 3.9,
                                            itemsToScroll: 1
                                        },
                                        {
                                            width: 1000,
                                            itemsToShow: 5,
                                            itemsToScroll: 1
                                        }
                                    ]
                                }
                            }
                        >
                            {
                                slicedProducts.map((product: any, index: number) => {
                                    let catalogue_variant_in_stock: any = product,
                                        productOnSale: any,
                                        productSaleprice: any,
                                        ProductPrice: any,
                                        isStockAvailable: boolean,
                                        isItemAddedToCart: any;
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

                                    return (
                                        <ProductCard
                                            product={product}
                                            catalogue_variant_in_stock={catalogue_variant_in_stock}
                                            productOnSale={productOnSale}
                                            deleteWishlist={deleteWishlist}
                                            createWishlist={createWishlist}
                                            addToCart={addToCart}
                                            ProductPrice={ProductPrice}
                                            productSlaeprice={productSaleprice}
                                        />
                                    )
                                })

                            }
                        </Carousel> : <p className="px-3 px-lg-0">No Products Found.</p>
                }
            </Container>
        </section>
    );
})