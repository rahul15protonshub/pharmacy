import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, TouchableHighlight, ActivityIndicator } from "react-native";
import scale from "../../../../framework/src/utils/Scale";
import FastImage from 'react-native-fast-image';
const themeJson = require("../../../studio-store-ecommerce-theme/src/theme.json");
import { FONTS } from "../../../studio-store-ecommerce-theme/src/AppFonts";
import { GR_ALERT_CIRCLE, GR_HEART_BLUE, GR_HEART_WHITE } from "../../../studio-store-ecommerce-theme/src/AppAssets/appassets";

interface ProductBoxProps {
    product: any;
    currency: string;
    addToCartLoading: boolean;
    addToWishlistLoading: boolean;
    onProductPress: () => void;
    onAddToCartPress: () => void;
    onAddToWishlistPress: () => void;
    onQuantityIncrease: () => void;
    onQuantityDecrease: () => void;
}

interface QuantitySelectorProps {
    product: any;
    loading: boolean;
    onQuantityIncrease: () => void;
    onQuantityDecrease: () => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ product, loading, onQuantityDecrease, onQuantityIncrease }) => {

    return (
        <View style={componentStyles.quantitySelectorWrapper}>
            <TouchableOpacity style={[componentStyles.quantityMinusPlus, loading ? { opacity: 0.5 } : {}]}
                disabled={loading} onPress={() => {
                    onQuantityDecrease()
                }}>
                <Text style={componentStyles.quantityMinusPlusText}>-</Text>
            </TouchableOpacity>
            {
                loading ? <ActivityIndicator size="small" color={themeJson.attributes.primary_color} /> :
                    <Text style={componentStyles.quantityText}>{product.attributes.cart_quantity}</Text>
            }
            <TouchableOpacity style={[
                componentStyles.quantityMinusPlus,
                loading || product.attributes.cart_quantity === product.attributes.stock_qty ? { opacity: 0.5 } : {}
            ]}
                disabled={loading || product.attributes.cart_quantity === product.attributes.stock_qty}
                onPress={() => {
                    if (product.attributes.cart_quantity < product.attributes.stock_qty) {
                        onQuantityIncrease()
                    }
                }}>
                <Text style={componentStyles.quantityMinusPlusText}>+</Text>
            </TouchableOpacity>
        </View>
    )

}

const ProductBox: React.FC<ProductBoxProps> = ({
    product, onAddToCartPress, onAddToWishlistPress, onProductPress, addToCartLoading,
    onQuantityDecrease, onQuantityIncrease, addToWishlistLoading, currency
}) => {

    let productDefaultWeight = `${product.attributes.weight ?? ""} ${product.attributes.weight_unit ?? ""}`;
    let productDefaultPrice = product.attributes.on_sale ? product.attributes.price_including_tax : product.attributes.actual_price_including_tax
    if (product.attributes.default_variant) {
        const defaultVariantDetails = product.attributes.catalogue_variants.find((v: any) => (
            parseInt(v.id) === product.attributes.default_variant.id
        ))
        if (defaultVariantDetails) {
            productDefaultPrice = defaultVariantDetails.attributes.on_sale ? defaultVariantDetails.attributes.price_including_tax : defaultVariantDetails.attributes.actual_price_including_tax
            const weightDetails = defaultVariantDetails.attributes.catalogue_variant_properties.find((p: any) => (
                p.attributes.variant_name.trim().toLowerCase() === "weight" || p.attributes.variant_name.trim().toLowerCase() === "size"
            ))
            if (weightDetails) {
                productDefaultWeight = weightDetails.attributes.property_name
            }
        }
    }

    return (
        <View style={componentStyles.componentWrapper}>
            <TouchableOpacity disabled={addToWishlistLoading} style={componentStyles.heartIconWrapper} onPress={onAddToWishlistPress} >
                {
                    addToWishlistLoading ? <ActivityIndicator size="small" color={themeJson.attributes.primary_color} /> :
                        product.attributes.wishlisted ? <Image source={GR_HEART_BLUE} style={componentStyles.heartIcon} /> :
                            <Image source={GR_HEART_WHITE} style={componentStyles.heartIcon} />
                }
            </TouchableOpacity>
            <TouchableOpacity style={componentStyles.productInfoWrapper} onPress={onProductPress}>
                <FastImage source={{ uri: product.attributes.images?.data[0].attributes.url }}
                    style={componentStyles.productImage}
                />
                <Text style={componentStyles.productTitleText} numberOfLines={1}>{product.attributes.name}</Text>
                <Text style={componentStyles.price}>{currency} {Number(productDefaultPrice.toString()).toFixed(2)}</Text>
                <Text style={componentStyles.weight}>{productDefaultWeight}</Text>
            </TouchableOpacity>
            {
                product.attributes.cart_quantity ? (
                    <QuantitySelector product={product} loading={addToCartLoading}
                        onQuantityDecrease={onQuantityDecrease}
                        onQuantityIncrease={onQuantityIncrease}
                    />
                ) : (
                    <TouchableOpacity style={componentStyles.addToCartButtonWrapper} onPress={onAddToCartPress}
                        disabled={addToCartLoading}>
                        {
                            addToCartLoading ? <ActivityIndicator size="small" color={themeJson.attributes.primary_color} /> :
                                <Text style={componentStyles.addToCartButtonText}>Add to cart</Text>
                        }

                    </TouchableOpacity>
                )
            }
        </View>
    )
}

const componentStyles = StyleSheet.create({
    rubikFont: {
        fontFamily: FONTS.GTWalsheimProRegular,
        fontSize: scale(14),
        lineHeight: scale(24),
    },
    componentWrapper: {
        borderRadius: scale(5),
        borderColor: themeJson.attributes.mid_grey,
        overflow: "hidden",
        borderWidth: scale(1),
        marginBottom: scale(16),
        backgroundColor: "white",
        width: scale(163),
    },
    productInfoWrapper: {
        alignItems: "center",
        padding: scale(8),
    },
    productImage: {
        width: scale(145),
        height: scale(145),
        borderRadius: scale(5),
        marginBottom: scale(4)
    },
    productTitleText: {
        fontFamily: FONTS.GTWalsheimProRegular,
        fontSize: scale(12),
        lineHeight: scale(20),
        marginBottom: scale(4),
    },
    price: {
        fontFamily: FONTS.GTWalsheimProRegular,
        fontSize: scale(14),
        lineHeight: scale(24),
        color: themeJson.attributes.secondary_color,
    },
    weight: {
        fontFamily: FONTS.GTWalsheimProRegular,
        fontSize: scale(14),
        lineHeight: scale(24),
        color: themeJson.attributes.dark_grey,
    },
    heartIconWrapper: {
        position: "absolute",
        top: scale(15),
        right: scale(15),
        zIndex: 10,
        padding: scale(5),
    },
    heartIcon: {
        width: scale(20),
        height: scale(18),
    },
    addToCartButtonWrapper: {
        padding: scale(8),
        alignItems: "center",
        justifyContent: "center",
        borderTopColor: themeJson.attributes.light_grey,
        borderTopWidth: scale(1),
    },
    quantitySelectorWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopColor: themeJson.attributes.light_grey,
        borderTopWidth: scale(1),
        backgroundColor: themeJson.attributes.secondary_color_light,
    },
    quantityMinusPlus: {
        backgroundColor: themeJson.attributes.secondary_color,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scale(8),
        paddingHorizontal: scale(14),
    },
    quantityMinusPlusText: {
        color: "white",
        fontFamily: FONTS.GTWalsheimProBold,
        fontSize: scale(18),
        lineHeight: scale(24)
    },
    quantityText: {
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(16),
    },
    addToCartButtonText: {
        fontFamily: FONTS.GTWalsheimProLight,
        fontSize: scale(14),
        lineHeight: scale(24)
    },
});

export default ProductBox