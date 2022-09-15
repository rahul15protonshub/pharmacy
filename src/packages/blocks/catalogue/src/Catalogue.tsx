import React from "react";
import {
  View,
  ScrollView,
  FlatList,
  Image,
  Text,
  SafeAreaView,
  // Customizable Area Start
  NativeScrollEvent
  // Customizable Area End
} from "react-native";
import {
  NOT_FOUND_ICON
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import FocusAwareStatusBar from "../../studio-store-ecommerce-components/src/FocusAwareStatusBar/FocusAwareStatusBar";
import CustomErrorModal from "../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
import ApplicationLoader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");
export const configJSON = require("./config");
// Customizable Area Start
import styles from "./CatalogueStyle";
import TopHeader from "./components/TopHeader";
import Carousel from "./components/Carousel";
import OurProductsButton from "./components/OurProductsButton";
import SortSelector from "./components/SortSelector";
import ProductBox from "./components/ProductBox";
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
              data-testid="scrollviewscroll" 
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
                <OurProductsButton   data-testid="opencategories"  onButtonPress={() => this.props.navigation.navigate("Categoriessubcategories")} />
                <SortSelector onChange={(sortBy, sortOrder) => this.setCatalogueFilters(1, undefined, undefined, sortBy, sortOrder)} />
              </View>
              <View style={styles.catalogueTitleRow}>
                <Text style={styles.catalogueTitle}>New Arrivals</Text>
              </View>
              <View style={styles.productsRow}>
                {
                  this.state.catalogueFilteredProducts && (
                    <FlatList
                      columnWrapperStyle={{ justifyContent: 'space-between' }}
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
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}
