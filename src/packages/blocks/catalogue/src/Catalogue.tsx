import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
  SafeAreaView,
  // Customizable Area Start
  NativeScrollEvent
  // Customizable Area End
} from "react-native";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import {
  SELECTED_HEART,
  UN_SELECTED_HEART,
  reviewStar,
  NOT_FOUND_ICON
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import FocusAwareStatusBar from "../../studio-store-ecommerce-components/src/FocusAwareStatusBar/FocusAwareStatusBar";
import { Category } from "../../studio-store-ecommerce-components/src/homeComponents/Category/Category";
import CustomErrorModal from "../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
import ApplicationLoader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");
export const configJSON = require("./config");
import FastImage from "react-native-fast-image";

// Customizable Area Start
import styles from "./CatalogueStyle";
import TopHeader from "./components/TopHeader";
import Carousel from "./components/Carousel";
import OurProductsButton from "./components/OurProductsButton";
import SortSelector from "./components/SortSelector";
import ProductBox from "./components/ProductBox";
import Footer from "./components/Footer";
// Customizable Area End

import CatalogueController, { Props, sortMenu } from "./CatalogueController";


export default class Catalogue extends CatalogueController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  renderListItem = (item: any, type: string) => {
    // Customizable Area Start
    let productImage = "";
    if (
      item.attributes?.images?.data &&
      item.attributes?.images?.data.length > 0
    ) {
      item.attributes?.images.data.map((variant: any) => {
        if (variant.attributes.is_default) {
          productImage = variant.attributes.url;
        }
      });
      if (productImage === "") {
        productImage = item?.attributes?.images?.data[0].attributes.url;
      }
    }
    return (
      <TouchableOpacity
        key={item?.id}
        onPress={() =>
          this.props.navigation.push("ProductDescription", {
            productData: item,
          })
        }
        style={styles.productGridStyle}
      >
        <TouchableOpacity
          onPress={() => {
            this.onHeartPress(item, type);
          }}
          style={styles.TouchableOpacityStyle}
        >
          {item.attributes?.wishlisted ? (
            <Image source={SELECTED_HEART} style={styles.heartIcon} />
          ) : (
            <Image source={UN_SELECTED_HEART} style={styles.heartIcon} />
          )}
        </TouchableOpacity>
        <View style={styles.imageMainContainer}>
          {/* <Image source={{ uri: productImage }} style={styles.BottalImage} /> */}
          <FastImage
            style={styles.BottalImage}
            source={{
              uri: item?.attributes?.images
                ? item?.attributes?.images?.data[0].attributes.url &&
                item.attributes?.images?.data[0].attributes.url
                : "",
            }}
          //resizeMode={'stretch'}
          />

          <Text numberOfLines={2} style={styles.titleNameStyle}>
            {item.attributes.name}
          </Text>
          {item?.attributes?.on_sale ? (
            <View style={styles.discountRow}>
              <Text style={styles.price}>
                {themeJson.attributes.currency_type}{" "}
                {item.attributes.price_including_tax}
              </Text>
              <Text style={styles.discountPrice}>
                {" "}
                {themeJson.attributes.currency_type}{" "}
                {item.attributes.actual_price_including_tax}
              </Text>
            </View>
          ) : (
            <Text style={[styles.price, { marginLeft: scale(12) }]}>
              {themeJson.attributes.currency_type}{" "}
              {item.attributes.price_including_tax}
            </Text>
          )}
        </View>
        <View style={styles.reviewRow}>
          <Text style={styles.avgReview}>
            {item.attributes.average_rating}
          </Text>
          <Image source={reviewStar} style={styles.reviewStar} />
          {item.attributes.reviews && (
            <Text style={styles.reviewCount}>
              | {item.attributes.reviews.length}
            </Text>
          )}
        </View>
        {item.attributes.on_sale && (
          <View style={styles.labelSticker}>
            <Text style={styles.stickerText}>
              Save {Number(item.attributes.discount).toFixed(1)}%
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
    // Customizable Area End
  };

  renderHomeView = () => {
    // Customizable Area Start
    return (
      <View style={styles.innerContainer}>
        <ScrollView>
          {this.state.categoriesArray.length > 0 ? (
            <Category
              categoryList={
                this.state.categoriesArray.length > 4
                  ? this.state.categoriesArray.slice(0, 3)
                  : this.state.categoriesArray
              }
              viewAll={() => {
                this.props.navigation.navigate("Categoriessubcategories");
              }}
              onPressProductListing={(item: any) =>
                this.props.navigation.navigate("Filteritems", {
                  categoryData: item,
                  isFromExplore: true,
                  screenName: item.attributes.name,
                  isFromCategory: true,
                })
              }
              {...this.props}
            />
          ) : null}
          <View style={styles.container}>
            <View style={styles.gridTitleContainer}>
              <Text style={styles.titleTextStyle}>
                {configJSON.TopWear}
              </Text>
              <TouchableOpacity
                testID={"btn-home-view-all"}
                onPress={() => this.viewAll("New Products")}
              >
                <Text style={styles.viewAllText}>{"View All"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.gridListContainer}>
              <FlatList
                horizontal
                extraData={this.state.arrayHolder}
                keyExtractor={(item: any, index: any) =>
                  index.toString() + item?.attributes?.wishlisted
                }
                showsHorizontalScrollIndicator={false}
                data={this.state.arrayHolder}
                renderItem={({ item, index }) =>
                  this.renderListItem(item, "newProducts")
                }
              />
            </View>
          </View>
          {this.state.bannerImages[1] && (
            <View style={styles.wrapper}>
              <Carousel index={1} bannerImages={this.state.bannerImages} onPressBanner={this.onPressBanner} />
            </View>
          )}
          {this.state.recommendedList?.length > 0 && (
            <View style={{ marginTop: verticalScale(10) }}>
              <View style={styles.container}>
                <View style={styles.gridTitleContainer}>
                  <Text style={styles.titleTextStyle}>
                    {configJSON.Recommended}
                  </Text>
                  <TouchableOpacity
                    testID={"btn-home-view-recommended"}
                    onPress={() => this.viewAll("Recommended")}
                  >
                    <Text style={styles.viewAllText}>{"View All"}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.gridListContainer}>
                  <FlatList
                    horizontal
                    keyExtractor={(item: any, index: any) =>
                      index.toString() + item?.attributes?.wishlisted
                    }
                    extraData={this.state.recommendedList}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.recommendedList}
                    renderItem={({ item, index }) =>
                      this.renderListItem(item, "recommended")
                    }
                  />
                </View>
              </View>
            </View>
          )}
          {this.state.bannerImages[2] && (
            <View style={styles.wrapper}>
              <Carousel index={2} bannerImages={this.state.bannerImages} onPressBanner={this.onPressBanner} />
            </View>
          )}
        </ScrollView>
      </View>
    );
    // Customizable Area End
  };

  handleScroll = (e: NativeScrollEvent) => {
    if (!this.state.catalogueFilterLoading && e.layoutMeasurement.height + e.contentOffset.y >= e.contentSize.height - 500 && 
      this.state.catalogueFilteredProductsTotalPages > this.state.catalogueFilteredProductsActivePage) {
        this.setCatalogueFilters(this.state.catalogueFilteredProductsActivePage + 1)
    }
  }

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.flexy}>
        <View style={styles.innerContainer}>
          <ApplicationLoader isFetching={this.state.isFetching || this.state.catalogueFilterLoading} />
          <FocusAwareStatusBar
            barStyle="light-content"
            backgroundColor={themeJson.attributes.primary_color}
            isFocused={true}
          />
          <CustomErrorModal
            showModal={this.state.customErrorModal}
            isShowError={this.state.isShowError}
            message={this.state.customErrorMessage}
            hideErrorModal={() => this.setState({ customErrorModal: false })}
          />
          <TopHeader
            onSearchPress={() => this.props.navigation.push("Search")}
            onCartPress={() => this.props.navigation.push("Shoppingcart")}
            onMenuPress={() => this.props.navigation.push("Profilebio")}
            onLogoPress={() => this.props.navigation.push("Home")}
            cartCount={this.state.cartLength}
            logoSrc={this.state.brandSettings?.commonLogoSrc}
          />

          {!this.state.noDataFound && (
            <ScrollView
              keyboardShouldPersistTaps="always"
              style={styles.innerContainer}
              onScroll={e => this.handleScroll(e.nativeEvent)}
              scrollEnabled={!this.state.catalogueFilterLoading}
            >
              {this.state.bannerImages[0] && (
                <View style={styles.swiperWrapper}>
                  <Carousel index={0} bannerImages={this.state.bannerImages} onPressBanner={this.onPressBanner} />
                </View>
              )}
              <View style={styles.ourProductsAndFilterButtonRow}>
                <OurProductsButton onButtonPress={() => this.props.navigation.push("Categoriessubcategories")} />
                <SortSelector onChange={(sortBy, sortOrder) => this.setCatalogueFilters(1, undefined, undefined, sortBy, sortOrder)} />
              </View>
              <View style={styles.catalogueTitleRow}>
                <Text style={styles.catalogueTitle}>New Arrivals</Text>
              </View>
              <View style={styles.productsRow}>
                {
                  this.state.catalogueFilteredProducts && (
                    <FlatList
                      columnWrapperStyle={{justifyContent: 'space-between'}}
                      numColumns={2}
                      data={this.state.catalogueFilteredProducts}
                      renderItem={({ item }) => (
                        <ProductBox product={item}
                          onProductPress={() =>
                            this.props.navigation.push("ProductDescription", { productData: item })
                          }
                          onAddToCartPress={() => this.addToCart(item)}
                          onAddToWishlistPress={() => this.onHeartPress(item, "wishlist")}
                          onQuantityDecrease={() => this.increaseOrDecreaseCartQuantity(item, -1)}
                          onQuantityIncrease={() => this.increaseOrDecreaseCartQuantity(item, 1)}
                          addToCartLoading={this.state.productsAddingToCart.includes(item.id)}
                          addToWishlistLoading={this.state.productWishlisting === item.id}
                          currency={this.state.brandSettings?.ExtraFields.currency_type}
                        />
                      )}
                      keyExtractor={item => item.id}
                      ListEmptyComponent={(
                        <View style={styles.emptyContainer}>
                        <Image source={NOT_FOUND_ICON} style={styles.emptyAddressIcon} />
                        <Text style={styles.noDataText}>No Data Found.</Text>
                      </View>
                      )}
                      
                    />
                  )
                }
                
              </View>
              <Footer brandSettings={this.state.brandSettings} navigation={this.props.navigation} />
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}
