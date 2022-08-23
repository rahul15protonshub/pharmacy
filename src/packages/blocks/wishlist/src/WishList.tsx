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
  UN_SELECTED_HEART,
  reviewStar,
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
    const id = item.item.data?.attributes?.id?.data?.id;
    if (!id) {
      return;
    }
    let productImage = "";
    if (data?.images?.data && data?.images?.data.length > 0) {
      data?.images.data.map((variant: any) => {
        if (variant.attributes.is_default) {
          productImage = variant.attributes.url;
        }
      });
      if (productImage === "") {
        productImage = data?.images?.data[0].attributes.url;
      }
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
          <Image source={{ uri: productImage }} style={styles.BottalImage} />
          <Text numberOfLines={1} style={styles.titleNameStyle}>
            {data.name}
          </Text>
          {data?.on_sale ? (
            <View style={styles.discountRow}>
              <Text style={styles.price}>
                {themeJson.attributes.currency_type} {data?.price_including_tax}
              </Text>
              <Text style={styles.discountPrice}>
                {" "}
                {themeJson.attributes.currency_type}{" "}
                {data?.actual_price_including_tax}
              </Text>
            </View>
          ) : (
            <Text style={[styles.price, {}]}>
              {themeJson.attributes.currency_type} {data.price_including_tax}
            </Text>
          )}
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
        {/* <View style={styles.reviewRow}>
          <Text style={styles.avgReview}>{data.average_rating}</Text>
          <Image source={reviewStar} style={styles.reviewStar} />
          {data.reviews && (
            <Text style={styles.reviewCount}>| {data.reviews.length}</Text>
          )}
        </View> */}
        {/* {data.on_sale && (
          <View style={styles.labelSticker}>
            <Text style={styles.stickerText}>
              Save {Number(data.discount).toFixed(1)}%
            </Text>
          </View>
        )} */}
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
