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
  // Customizable Area End
} from "react-native";
import { HeaderRight } from "../../studio-store-ecommerce-components/src/HeaderRight/HeaderRight";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST, {
  FONTS,
} from "../../studio-store-ecommerce-theme/src/AppFonts";
import {
  SELECTED_HEART,
  UN_SELECTED_HEART,
  SEARCH,
  reviewStar,
  NOT_FOUND_ICON,
  APP_LOGO,
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import LinearGradient from "react-native-linear-gradient";
import FocusAwareStatusBar from "../../studio-store-ecommerce-components/src/FocusAwareStatusBar/FocusAwareStatusBar";
import { Category } from "../../studio-store-ecommerce-components/src/homeComponents/Category/Category";
import commonStyles from "./CatalogueStyle";
import CustomErrorModal from "../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
import ApplicationLoader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");
import Swiper from "react-native-swiper";
export const configJSON = require("./config");
import FastImage from "react-native-fast-image";

// Customizable Area Start
// Customizable Area End

import CatalogueController, { Props } from "./CatalogueController";

export default class Catalogue extends CatalogueController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  headerTopView = () => {
    // Customizable Area Start
    return (
      <View>
        <LinearGradient
          colors={[
            themeJson.attributes.primary_color,
            themeJson.attributes.primary_color,
            themeJson.attributes.primary_color,
            themeJson.attributes.primary_color,
            themeJson.attributes.primary_color,
          ]}
          style={styles.headerContainer}
        >
          <View style={styles.locationContainer}>
            <View>
              <Image source={APP_LOGO} style={styles.brandLogo} />
              {/* <Text style={styles.titleText}>{themeJson.attributes.heading}</Text> */}
            </View>
            <HeaderRight
              showNotification={true}
              onPress={() => {
                this.props.navigation.navigate("Notifications");
              }}
              cartHasProductFlag={this.state.cartProduct?.has_cart_product}
              unsubscribeMessages={() => this.unsubscribeMessages()}
              handleCart={() => this.props.navigation.navigate("Shoppingcart")}
              {...this.props}
            />
          </View>
          <TouchableOpacity
            testID={"btn-top-home"}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <View style={styles.SectionStyle}>
              <Image source={SEARCH} style={styles.ImageStyle} />
              <Text style={styles.searchText}>
                {configJSON.SearchPlaceholder}
              </Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
    // Customizable Area End
  };

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
        style={commonStyles.productGridStyle}
      >
        <TouchableOpacity
          onPress={() => {
            this.onHeartPress(item, type);
          }}
          style={commonStyles.TouchableOpacityStyle}
        >
          {item.attributes?.wishlisted ? (
            <Image source={SELECTED_HEART} style={commonStyles.heartIcon} />
          ) : (
            <Image source={UN_SELECTED_HEART} style={commonStyles.heartIcon} />
          )}
        </TouchableOpacity>
        <View style={commonStyles.imageMainContainer}>
          {/* <Image source={{ uri: productImage }} style={commonStyles.BottalImage} /> */}
          <FastImage
            style={commonStyles.BottalImage}
            source={{
              uri: item?.attributes?.images
                ? item?.attributes?.images?.data[0].attributes.url &&
                  item.attributes?.images?.data[0].attributes.url
                : "",
            }}
            //resizeMode={'stretch'}
          />

          <Text numberOfLines={2} style={commonStyles.titleNameStyle}>
            {item.attributes.name}
          </Text>
          {item?.attributes?.on_sale ? (
            <View style={commonStyles.discountRow}>
              <Text style={commonStyles.price}>
                {themeJson.attributes.currency_type}{" "}
                {item.attributes.price_including_tax}
              </Text>
              <Text style={commonStyles.discountPrice}>
                {" "}
                {themeJson.attributes.currency_type}{" "}
                {item.attributes.actual_price_including_tax}
              </Text>
            </View>
          ) : (
            <Text style={[commonStyles.price, { marginLeft: scale(12) }]}>
              {themeJson.attributes.currency_type}{" "}
              {item.attributes.price_including_tax}
            </Text>
          )}
        </View>
        <View style={commonStyles.reviewRow}>
          <Text style={commonStyles.avgReview}>
            {(item.attributes.average_rating).toFixed(1)}
          </Text>
          <Image source={reviewStar} style={commonStyles.reviewStar} />
          {item.attributes.reviews && (
            <Text style={commonStyles.reviewCount}>
              | {item.attributes.reviews.length}
            </Text>
          )}
        </View>
        {item.attributes.on_sale && (
          <View style={commonStyles.labelSticker}>
            <Text style={commonStyles.stickerText}>
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
          <View style={commonStyles.container}>
            <View style={commonStyles.gridTitleContainer}>
              <Text style={commonStyles.titleTextStyle}>
                {configJSON.TopWear}
              </Text>
              <TouchableOpacity
                testID={"btn-home-view-all"}
                onPress={() => this.viewAll("New Products")}
              >
                <Text style={commonStyles.viewAllText}>{"View All"}</Text>
              </TouchableOpacity>
            </View>
            <View style={commonStyles.gridListContainer}>
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
            <View style={styles.wrapper}>{this.renderSwiperView(1)}</View>
          )}
          {this.state.recommendedList?.length > 0 && (
            <View style={styles.productGridStyle}>
              <View style={commonStyles.container}>
                <View style={commonStyles.gridTitleContainer}>
                  <Text style={commonStyles.titleTextStyle}>
                    {configJSON.Recommended}
                  </Text>
                  <TouchableOpacity
                    testID={"btn-home-view-recommended"}
                    onPress={() => this.viewAll("Recommended")}
                  >
                    <Text style={commonStyles.viewAllText}>{"View All"}</Text>
                  </TouchableOpacity>
                </View>
                <View style={commonStyles.gridListContainer}>
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
            <View style={styles.wrapper}>{this.renderSwiperView(2)}</View>
          )}
        </ScrollView>
      </View>
    );
    // Customizable Area End
  };

  renderSwiperView = (index: any) => {
    // Customizable Area Start
    return (
      <Swiper
        autoplay
        autoplayTimeout={6}
        style={styles.wrapper}
        key={index}
        showsButtons={false}
        paginationStyle={styles.pagination}
        activeDot={<View style={styles.activeDot} />}
        dot={<View style={styles.inActiveDot} />}
      >
        {this.state.bannerImages &&
          this.state.bannerImages.length > 0 &&
          this.state.bannerImages[index].attributes.images.data.map(
            (imageItem: any) => {
              return (
                <TouchableOpacity
                  onPress={() => this.onPressBanner(imageItem.attributes)}
                  style={styles.slide1}
                >
                  {/* <Image
                resizeMode={'stretch'}
                source={{ uri: imageItem.attributes.url }}
                style={styles.banner} /> */}
                  <FastImage
                    style={styles.banner}
                    source={{
                      uri: imageItem.attributes.url,
                    }}
                    resizeMode={"stretch"}
                  />
                </TouchableOpacity>
              );
            }
          )}
      </Swiper>
    );

    // Customizable Area End
  };

  renderEmptyDataView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image source={NOT_FOUND_ICON} style={styles.emptyAddressIcon} />
        <Text style={styles.noDataText}>No Data Found.</Text>
      </View>
    );
  };

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <ApplicationLoader isFetching={this.state.isFetching} />
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
          {this.headerTopView()}
          {!this.state.noDataFound && (
            <ScrollView
              keyboardShouldPersistTaps="always"
              style={styles.innerContainer}
            >
              {this.state.bannerImages[0] && (
                <View style={styles.wrapper}>{this.renderSwiperView(0)}</View>
              )}
              {this.renderHomeView()}
            </ScrollView>
          )}
          {this.state.noDataFound &&
            !this.state.isFetching &&
            this.renderEmptyDataView()}
        </View>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeJson.attributes.primary_color,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: COLOR_CONST.white,
  },
  wrapper: {
    height: scale(160),
  },
  brandLogo: {
    height: scale(60),
    width: scale(80),
    resizeMode: "contain",
  },
  pagination: {
    position: "absolute",
    bottom: verticalScale(7),
    left: 0,
    right: 0,
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  inActiveDot: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR_CONST.inActiveDotLightGrey,
    width: scale(4),
    height: scale(4),
    borderRadius: scale(2),
    marginHorizontal: scale(2.5),
  },

  activeDot: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR_CONST.coolGreyTwo,
    width: scale(4),
    height: scale(4),
    borderRadius: scale(2),
    marginHorizontal: scale(2.5),
  },
  slide1: {
    height: scale(107),
  },
  banner: {
    width: scale(375),
    height: scale(160),
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0,
  },
  topBox: {
    width: "50%",
    paddingVertical: 5,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  topText: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
  },
  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 15,
    minHeight: 260,
    position: "relative",
  },
  modalBox: {
    margin: 0,
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: -20,
  },
  closeIcon: {
    position: "absolute",
    right: 15,
    top: 15,
    fontWeight: "normal",
    zIndex: 999,
  },
  heading: {
    fontSize: 18,
    color: "#000",
    marginBottom: 15,
  },
  sortList: {
    paddingVertical: 8,
    alignItems: "center",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
  sortText: {
    fontSize: 16,
    color: "#696969",
  },
  sortIcon: {
    marginRight: 12,
  },
  flexBox: {
    display: "flex",
    flexDirection: "row",
  },
  productContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  productBox: {
    height: 250,
    borderBottomWidth: 1,
    flexDirection: "column",
    flex: 0.5,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  ImgContainer: {
    height: 150,
  },
  productName: {
    paddingVertical: 5,
    fontSize: 16,
  },
  price: {
    color: "#444",
    fontSize: 16,
    marginBottom: 10,
  },
  productImg: {
    width: "100%",
    height: "100%",
  },
  detailContent: {
    padding: 10,
  },
  rating: {
    color: "#000",
    paddingRight: 6,
  },
  starBox: {
    alignItems: "center",
  },
  headerContainer: {
    backgroundColor: themeJson.attributes.primary_color,
    alignContent: "flex-start",
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
    marginLeft: scale(22),
    alignItems: "center",
  },
  titleText: {
    color: COLOR_CONST.white,
    fontSize: scale(20),
    lineHeight: scale(23),
    fontFamily: FONTS.GTWalsheimProMedium,
  },
  SectionStyle: {
    marginTop: verticalScale(12),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.8,
    borderColor: COLOR_CONST.borderduckEggBlue,
    height: verticalScale(44),
    borderRadius: 4,
    marginHorizontal: scale(23),
    marginBottom: verticalScale(22),
  },
  searchText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginTop: verticalScale(5),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProRegular,
  },
  ImageStyle: {
    marginLeft: scale(16),
    marginRight: scale(14.1),
    height: scale(17.9),
    width: scale(17.9),
    resizeMode: "stretch",
    alignItems: "center",
  },
  locationTitleText: {
    color: COLOR_CONST.white,
    fontFamily: FONTS.GTWalsheimProMedium,
    fontSize: scale(11),
    lineHeight: scale(13),
  },

  locationNameText: {
    color: COLOR_CONST.white,
    fontFamily: FONTS.GTWalsheimProMedium,
    fontSize: scale(15),
    lineHeight: scale(18),
  },
  productGridStyle: {
    marginTop: verticalScale(10),
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  noDataText: {
    fontSize: scale(17),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProMedium,
    lineHeight: scale(19),
    textAlign: "center",
    opacity: 0.9,
    marginTop: verticalScale(38),
  },

  emptyAddressIcon: {
    width: scale(171.5),
    height: scale(186.7),
    alignSelf: "center",
  },
  // Customizable Area Start
  // Customizable Area End
});
