import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './ProductGridStyle';
import * as IMG_CONST from '../../../../../blocks/studio-store-ecommerce-theme/src/ImageConstants';
import { reviewStar } from '../../../../../blocks/studio-store-ecommerce-theme/src/AppAssets/appassets';

import * as Strings from '../../../../../blocks/studio-store-ecommerce-theme/src/StringConstants';
import Scale, { verticalScale } from '../../../../../framework/src/utils/Scale';
const themeJson = require('../../../../../blocks/studio-store-ecommerce-theme/src/theme.json');

export const ProductGrid = (props: any) => {
    const [add_to_cart, setRememberPin] = useState(props.data);
    const [RefreshFlatList, setRefreshFlatList] = useState(false);
    const [wishlist_item, setwishlist_item] = useState(props.data);

    const onHeartPress = (data: any) => {
        //if(!data.is_wishlisted)
        props.onAddToWishlist(data);
        // else
        //     props.onRemoveFromWishlist(data);
        data.wishlist_item = !data.wishlist_item;
        const index = wishlist_item.findIndex((x: any) => x.id == data.id);
        wishlist_item[index] = data;
        setwishlist_item(wishlist_item);
        setRefreshFlatList(!RefreshFlatList);
    };
    const onCartPress = (data: any) => {
        data.add_to_cart = !data.add_to_cart;
        const index = add_to_cart.findIndex((x: any) => x.id == data.id);
        add_to_cart[index] = data;
        setRememberPin(add_to_cart);
        setRefreshFlatList(!RefreshFlatList);
    };

    const onChangeCartValue = (value: number, item: any, isAdd: boolean) => {
        if (isAdd) {
            if (item.cart_quantity) {
                props.updateQuantiyInCart(value, item)
            } else {
                props.onAddToCart(value, item)
            }
        } else {
            if (value === 0)
                props.onRemoveFromCart(value, item)
            else
                props.updateQuantiyInCart(value, item)
        }
    }
    const renderListItem = (item: any) => {
        // console.log('item of similar products-----------', item)
        let productImage = '';
        if (item.attributes?.images?.data && item.attributes?.images?.data.length > 0) {
            item.attributes?.images.data.map((variant: any) => {
                if (variant.attributes.is_default) {
                    productImage = variant.attributes.url;
                }
            });
            if (productImage === '') {
                productImage = item?.attributes?.images?.data[0].attributes.url
            }
        }

        const isInCart = item?.attributes?.cart_quantity > 0 ? true : false;
        return (
            <TouchableOpacity onPress={() => props.onPress(item)} style={styles.productGridStyle}>
                <TouchableOpacity onPress={() => props.onHeartPress(item)} style={styles.TouchableOpacityStyle}>
                    {item.attributes?.wishlisted ? (
                        <Image source={IMG_CONST.SELECTED_HEART} style={styles.heartIcon} />
                    ) : (
                        <Image source={IMG_CONST.UN_SELECTED_HEART} style={styles.heartIcon} />
                    )}
                </TouchableOpacity>
                <View style={styles.imageMainContainer}>
                    <Image source={{ uri: productImage }} style={styles.BottalImage} />
                    <Text numberOfLines={1} style={styles.titleNameStyle}>{item?.attributes?.name}</Text>
                    {item.attributes?.on_sale ? (<View style={styles.discountRow}>
                        <Text style={styles.price}>{themeJson.attributes.currency_type} {item?.attributes?.price_including_tax}</Text>
                        <Text style={styles.discountPrice}> {themeJson.attributes.currency_type} {item?.attributes?.actual_price_including_tax}</Text>
                    </View>) : (<Text style={[styles.price, {}]}>{themeJson.attributes.currency_type} {item?.attributes?.price_including_tax}</Text>)}
                </View>
                <TouchableOpacity onPress={() => props.onAddtocartPress(item)} style={styles.addtocartitem}>
                    <View >
                        <Text style={styles.addtocarttext}> {!isInCart
                            ? "Add to cart"
                            : "Go to cart"}</Text>
                    </View>

                </TouchableOpacity>
                {/* <View style={styles.reviewRow}>
                    <Text style={styles.avgReview}>{item.attributes.average_rating}</Text>
                    <Image source={reviewStar} style={styles.reviewStar} />
                    {item.attributes.reviews && <Text style={styles.reviewCount}>| {item.attributes.reviews.length}</Text>}
                </View> */}
                {/* {item.attributes.on_sale && <View style={styles.labelSticker}>
                    <Text style={styles.stickerText}>Save {Number(item.attributes.discount).toFixed(1)}%</Text>
                </View>} */}
                {/* <View style={styles.cartView}>
                        <Text style={styles.cartText}>Add to cart</Text>
                    </View> */}
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.gridTitleContainer}>
                <Text style={styles.titleTextStyle}>{props.name}</Text>
                {/* <TouchableOpacity onPress={props.onPressProductListing}>
                    <Text style={styles.viewAllText}>{Strings.View_All}</Text>
                </TouchableOpacity> */}
            </View>
            <View style={styles.gridListContainer}>
                <FlatList
                    horizontal
                    extraData={RefreshFlatList}
                    showsHorizontalScrollIndicator={false}
                    data={props.data}
                    renderItem={({ item, index }: any) => renderListItem(item)}
                />
            </View>
        </SafeAreaView>
    );
};
