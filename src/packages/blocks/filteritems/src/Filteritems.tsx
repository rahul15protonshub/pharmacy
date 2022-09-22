import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  StatusBar,
  SafeAreaView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import FilteritemsController, { Props } from "./FilteritemsController";
import styles from "./FilterStyle";
import {
  NOTIFICATIONS_ICON,
  NEW_ICON,
  NOT_FOUND_ICON,
  TICK_CORRECT_ICON,
  POPULARITY_ICON,
  FILTER_ICON,
  SORT_ICON,
  DOLLAR_DOWN,
  CROSS_ICON1,
  CART_BLACK_ICON,
  BACK_ICON,
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import GreenButton from "../../../blocks/studio-store-ecommerce-components/src/GreenButton/GreenButton";
import TopHeader from "../../../blocks/studio-store-ecommerce-components/src/TopHeader/TopHeader";
import CustomErrorModal from "../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
import ApplicationLoader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader";
export const configJSON = require("./config");
const staticString = require("./../../studio-store-ecommerce-translations/en.json");
// Customizable Area Start
import ProductBox from "../../../blocks/catalogue/src/components/ProductBox";
// Customizable Area End

export default class Filteritems extends FilteritemsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderEmptyDataView = () => {
    // Customizable Area Start
    return (
      <View style={styles.emtpyAddressContainer}>
        <View style={styles.cartempty}>
          <Image source={NOT_FOUND_ICON} style={styles.emptyAddressIcon} />
          <Text style={styles.noAnyOrder}>{staticString.emptyProduct}</Text>
          <Text style={styles.youhave}>{staticString.emptyProductSubText}</Text>
        </View>
        <GreenButton
          title={configJSON.buttonTitle}
          customStyle={styles.loginButton}
          customTxtStyle={styles.loginText}
          onPress={() => this.props.navigation.navigate("Catalogue")}
        />
      </View>
    );
    // Customizable Area End
  };

  renderSortByModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showSortByModal}
        onRequestClose={() => {
          this.setState({ showSortByModal: false });
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.sortByContiner}>
            <View style={styles.sortRow}>
              <Text style={styles.sortByText}>Sort by</Text>
              <TouchableOpacity
                testID={"buttonSortBy"}
                onPress={() =>
                  this.setState({ showSortByModal: false }, () =>
                    this.setState({ showSortByModal: false })
                  )
                }
              >
                <Image source={CROSS_ICON1} style={styles.crossIcon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              testID={"buttonSortPriceLowToHigh"}
              onPress={() => this.onSelectFilter(0)}
              style={styles.filterRow}
            >
              <View style={styles.innerRow}>
                <Image source={DOLLAR_DOWN} style={styles.popularityIcon} />
                <Text style={styles.filterText}>Price, Low to High</Text>
              </View>
              {this.state.filterSelection[0].isSelected && (
                <Image source={TICK_CORRECT_ICON} style={styles.tickCorrect} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              testID={"buttonSortPriceHighToLow"}
              onPress={() => this.onSelectFilter(1)}
              style={styles.filterRow}
            >
              <View style={styles.innerRow}>
                <Image source={DOLLAR_DOWN} style={styles.popularityIcon} />
                <Text style={styles.filterText}>Price, High to Low</Text>
              </View>
              {this.state.filterSelection[1].isSelected && (
                <Image source={TICK_CORRECT_ICON} style={styles.tickCorrect} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              testID={"buttonSortNewestProducts"}
              onPress={() => this.onSelectFilter(2)}
              style={styles.filterRow}
            >
              <View style={styles.innerRow}>
                <Image source={NEW_ICON} style={styles.dollarDown} />
                <Text style={styles.filterText}>Newest Products</Text>
              </View>
              {this.state.filterSelection[2].isSelected && (
                <Image source={TICK_CORRECT_ICON} style={styles.tickCorrect} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              testID={"buttonSortPopularity"}
              onPress={() => this.onSelectFilter(3)}
              style={styles.filterRow}
            >
              <View style={styles.innerRow}>
                <Image source={POPULARITY_ICON} style={styles.dollarDown} />
                <Text style={styles.filterText}>Popularity</Text>
              </View>
              {this.state.filterSelection[3].isSelected && (
                <Image source={TICK_CORRECT_ICON} style={styles.tickCorrect} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      //Merge Engine DefaultContainer
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        <TopHeader
          headerTitle={this.state.screenName}
          headerRightIcons={[
            { 
              src: NOTIFICATIONS_ICON,
              onPress: () => {
                this.props.navigation.navigate("Notifications");
              },
              style: { resizeMode: "contain" },
            },
            {
              src: CART_BLACK_ICON,
              onPress: () => {
                this.props.navigation.navigate("Shoppingcart");
              },
              cartHasProductFlag: this.state.cartProduct?.has_cart_product,
              cartquantity: this.state.cartProduct?.total_cart_item,
              style: { resizeMode: "contain" },
            },
          ]}
          headerLeftIconName={BACK_ICON}
          onPressLeft={() => {
            this.props.navigation.goBack();
          }}
          navigation={this.props.navigation}
          headerLeftIconStyle={{}}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        <ApplicationLoader isFetching={this.state.isFetching} />
        <CustomErrorModal
          isShowError={this.state.isShowError}
          showModal={this.state.customErrorModal}
          message={this.state.customErrorMessage}
          hideErrorModal={() => this.setState({ customErrorModal: false })}
        />
        <View style={styles.sortHeader}>
          <TouchableOpacity
            testID={"buttonSort"}
            style={styles.buttonSort}
            onPress={() => this.setState({ showSortByModal: true })}
          >
            <Image source={SORT_ICON} style={styles.buttonSortImage} />
            <Text style={styles.TitleSort}>Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSort}
            testID={"buttonFilter"}
            onPress={() => {
              this.navigateToFilter();
            }}
          >
            <Image source={FILTER_ICON} style={styles.buttonSortImage} />
            <Text style={styles.TitleSort}>Filter</Text>
          </TouchableOpacity>
        </View>
        {this.renderSortByModal()}
        {!this.state.noProductFound ? (
          <View style={styles.listContainerOne}>
            <FlatList
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              numColumns={2}
              extraData={this.state.productList}
              data={this.state.productList}
              keyExtractor={(item: any, index: any) => {
                return index.toString();
              }}
              renderItem={({ item }) => (
                <ProductBox product={item}
                  onProductPress={() =>
                    this.props.navigation.push("ProductDescription", { productData: item })
                  }
                  onAddToCartPress={() => this.addToCart(item)}
                  onAddToWishlistPress={() => this.onHeartPress(item)}
                  onQuantityDecrease={() => this.increaseOrDecreaseCartQuantity(item, -1)}
                  onQuantityIncrease={() => this.increaseOrDecreaseCartQuantity(item, 1)}
                  addToCartLoading={this.state.productsAddingToCart.includes(item.id)}
                  addToWishlistLoading={this.state.productWishlisting === item.id}
                  currency={'INR'}
                />
              )

              }
              onEndReached={(number) => {
                this.setState(
                  { onEndReachedCalledDuringMomentum: false },
                  () => {
                    this.loadMoreItems();
                  }
                );
              }}
              onMomentumScrollBegin={() => {
                this._onMomentumScrollBegin();
              }}
              onEndReachedThreshold={0.5}
            />
          </View>
        ) : (
          this.renderEmptyDataView()
        )}
      </SafeAreaView>
      //Merge Engine End DefaultContainer
    );
  }
  // Customizable Area Start
  // Customizable Area End
}
