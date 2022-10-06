import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

// Customizable Area Start
// Customizable Area End

import FocusAwareStatusBar from "../../studio-store-ecommerce-components/src/FocusAwareStatusBar/FocusAwareStatusBar";
import WishListController, { Props } from "./WishListController";
import scale from "../../../framework/src/utils/Scale";
import styles from "./WishListStyle";
import {
  CART_BLACK_ICON,
  NOT_FOUND_ICON,
  shapeHeart,
  shapeHeartActive
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import GreenButton from "../../studio-store-ecommerce-components/src/GreenButton/GreenButton";
import TopHeader from "../../studio-store-ecommerce-components/src/TopHeader/TopHeader";
import CustomErrorModal from "../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
import ApplicationLoader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");
const staticString = require("./../../studio-store-ecommerce-translations/en.json");

export const configJSON = require("./config");

// Customizable Area Start
import R from "../../studio-store-ecommerce-components/src/R";
import Scale, { verticalScale } from "../../../framework/src/utils/Scale";
// Customizable Area End

export default class WishList extends WishListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  renderEmptyDataView = () => {
    return (
      // Customizable Area Start
      <View style={styles.emtpyAddressContainer}>
        <View style={styles.cartempty}>
          <Image source={NOT_FOUND_ICON} style={styles.emptyAddressIcon} />
          <Text style={styles.noAnyOrder}>{staticString.emptyWishlist}</Text>
          <Text style={styles.youhave}>
            {staticString.emptyWishlistSubText}
          </Text>
        </View>
        <GreenButton
          title={configJSON.buttonTitle}
          customStyle={styles.loginButton}
          customTxtStyle={styles.loginText}
          onPress={() => this.props.navigation.navigate("Catalogue")}
        />
      </View>
      // Customizable Area End
    );
  };

  renderListItem = (item: any) => {
    const data = item.item.data.attributes?.id?.data?.attributes;
    const product =item.item.data.attributes?.id?.data
    
    let productDefaultWeight1 = `${product.attributes.weight ?? ""} ${product.attributes.weight_unit ?? ""}`;
    let productDefaultPrice = product.attributes.on_sale ? product.attributes.price_including_tax : product.attributes.actual_price_including_tax
    let productDefaultNonDiscountedPrice = product.attributes.on_sale ? product.attributes.actual_price_including_tax : null
    let productDefaultCartQuantity = product.attributes.cart_quantity
    let productDefaultStockQuantity = product.attributes.stock_qty
    let productDefaultImage=product.attributes.images?.data[0].attributes.url

    if (product.attributes.default_variant) {
      const defaultVariantDetails = product?.attributes?.catalogue_variants?.find((v: any) => (
          parseInt(v.id) === product.attributes.default_variant.id
      ))

    if (defaultVariantDetails) {
          productDefaultPrice = defaultVariantDetails.attributes.on_sale ? defaultVariantDetails.attributes.sale_price : defaultVariantDetails.attributes.price
          productDefaultNonDiscountedPrice = defaultVariantDetails.attributes.on_sale ? defaultVariantDetails.attributes.price : null
          const weightDetails = defaultVariantDetails?.attributes?.variant_property?.data.find((p: any) => (
              p.attributes.catalogue_id ==defaultVariantDetails.attributes.catalogue_id
          ))
          if (weightDetails) {
            productDefaultWeight1 = weightDetails.attributes.property_name
          }
      }
      productDefaultImage=defaultVariantDetails.attributes.images?.data[0].attributes.url
      // productDefaultCartQuantity = defaultVariantDetails.attributes.cart_quantity
      productDefaultStockQuantity = defaultVariantDetails.attributes.stock_qty
  }
    const id = item.item.data?.attributes?.id?.data?.id;
    if (!id) {
      return;
    }
     const isInCart = data?.cart_quantity > 0 ? true : false;
    return (
      // Customizable Area Start
      <TouchableOpacity
        key={item?.item?.data?.attributes?.id}
        onPress={() =>
          this.props.navigation.navigate("ProductDescription", {
            productData: item.item.data.attributes.id.data,
          })
        }
        style={styles.productGridStyle}
      >
        <TouchableOpacity
          onPress={() => this.onHeartPress(id)}
          style={styles.touchableOpacityStyle}
        >
          {true ? (
            <Image source={shapeHeartActive} style={styles.heartIcon} />
          ) : (
            <Image source={shapeHeart} style={styles.heartIcon} />
          )}
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={{ uri: productDefaultImage }} style={styles.BottalImage} />
          <Text numberOfLines={1} style={styles.titleNameStyle}>
            {data.name}
          </Text>
          {data?.on_sale ? (
            <View style={styles.discountRow}>
              <Text style={styles.price}>
                {themeJson.attributes.currency_type} {productDefaultPrice}
              </Text>
              <Text style={styles.discountPrice}>
                {" "}
                {themeJson.attributes.currency_type}{" "}
                {productDefaultNonDiscountedPrice}
              </Text>
            </View>
          ) : (
            <Text style={[styles.price, {}]}>
              {themeJson.attributes.currency_type} {productDefaultPrice}
            </Text>
          )}
           <Text style={styles.weight}>{productDefaultWeight1}</Text>
        </View>
       {data.stock_qty? <TouchableOpacity onPress={() => this.onAddtocartPress(item.item.data)} style={styles.addtocartitem}>
          <View >
            <Text style={styles.addtocarttext}> {!isInCart
              ? "Add to cart"
              : "Go to cart"}</Text>
          </View>

        </TouchableOpacity>:
        <View  style={styles.addtocartitem}>
        <View >
          <Text style={[styles.addtocarttext,{opacity:0.5}]}> {"Out of Stock"}</Text>
        </View>
      </View>
        }
      </TouchableOpacity>
      // Customizable Area End
    );
  };
  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.mainContainer}>
        <ApplicationLoader isFetching={this.state.isFetching} />
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor={COLOR_CONST.white}
          isFocused={true}
        />
        <CustomErrorModal
          isShowError={this.state.isShowError}
          showModal={this.state.customErrorModal}
          message={this.state.customErrorMessage}
          hideErrorModal={() => this.setState({ customErrorModal: false })}
        />
        <TopHeader
          headerTitle={"Wishlist"}
          headerLeftIconName={R.contactUsImage.backIcon}
          headerLeftIconStyle={{
            resizeMode: "contain",
            width: Scale(12),
            height: verticalScale(20),
          }}
          headerRightIcons={[
            {
              src: CART_BLACK_ICON,
              onPress: () => {
                this.props.navigation.navigate("Shoppingcart");
              },
              cartHasProductFlag: this.state.cartProduct,
              cartquantity: this.state.addedItem,
              style: { resizeMode: "contain", marginLeft: scale(30) },
            },
          ]}
          onPressLeft={() => {
            this.props.navigation.goBack();
          }}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{ elevation: 2 }}
        />
        {!this.state.noProductFound ? (
          <View
            style={
              this.state.productList.length === 1
                ? styles.listContainerOne
                : styles.listContainer
            }
          >
            <FlatList
            testID="renderproductlist"
              numColumns={2}
              extraData={this.state}
              data={this.state.productList}
              //@ts-ignore
              renderItem={this.renderListItem}
              onEndReachedThreshold={0.01}
            />
          </View>
        ) : (
          this.renderEmptyDataView()
        )}
      </SafeAreaView>
      // Customizable Area End
    );
  }

  // Customizable Area Start
  // Customizable Area End
}
