import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ProductCard from './SimpleCard';
import SectionHeading from '../../../../../studio-store-ecommerce-components/src/SectionHeading';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Carousel from '../../../../../studio-store-ecommerce-components/src/ArrowAnimateCarousel';
import './assets/css/index.scoped.css';


interface UltraProps extends RouteComponentProps {
    collection: any[],
    addToCart: Function,
    createWishlist: Function,
    deleteWishlist: Function,
    onViewMore: Function,
}

export const Ultra: any = withRouter((props: UltraProps) => {
    const renderItem = (product: any) => {
        let catalogue_variant_in_stock: any = product,
            productOnSale: any,
            productSaleprice: any,
            ProductPrice: any,
            countryCode: any = JSON.parse(localStorage.getItem('countryCode') ?? "{}")?.countryCode;
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
        ProductPrice = (catalogue_variant_in_stock && productOnSale) ?
            catalogue_variant_in_stock.attributes?.actual_price_including_tax :
            catalogue_variant_in_stock.attributes?.price_including_tax
        productSaleprice = catalogue_variant_in_stock ? catalogue_variant_in_stock.attributes.price_including_tax : catalogue_variant_in_stock?.attributes.price_including_tax;
        return (
            <>
                <h6 className='f-s-sm f-md mb-0 text-truncate'>
                    {product.attributes.name}
                </h6>
                <span className='f-s-xs f-sm'>
                    {countryCode} {ProductPrice}
                </span>
            </>
        )
    }
    const { collection, onViewMore } = props
    const slicedProducts = collection.slice(0, 3);
    return (
        <section className='simple-product-layout ds-mb-40 ds-mb-md-80 ds-mb-lg-104'>
            <Container className='simple-product-layout__container carousel-responsive-container'>
                <SectionHeading
                    className='px-3 px-lg-0 mb-2 mb-md-40'
                    name="new arrivals"
                    underline
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
                                            itemsToShow: 1.6,
                                            itemsToScroll: 1
                                        },
                                        {
                                            width: 1000,
                                            itemsToShow: 3,
                                            itemsToScroll: 1
                                        }
                                    ],
                                    showArrows: false
                                }
                            }
                        >
                            {
                                slicedProducts.map((product: any, index: number) => {
                                    let productImage: any = product.attributes.images
                                        ? product.attributes.images.data[0].attributes.url
                                        : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
                                    return (
                                        <ProductCard
                                            image={productImage}
                                            content={renderItem(product)}
                                            onClick={() => props.history.push(`/shop/${product.id}`)}
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