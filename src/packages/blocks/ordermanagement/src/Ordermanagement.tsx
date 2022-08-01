/****************************
ORDER DETAIL SCREEN
*****************************/
import React from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import TopHeader from "../../../blocks/studio-store-ecommerce-components/src/TopHeader/TopHeader";
import FocusAwareStatusBar from "../../../blocks/studio-store-ecommerce-components/src/FocusAwareStatusBar/FocusAwareStatusBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./OrdermanagementStyle";
import Scale from "../../../framework/src/utils/Scale";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import {
  EMPTY_MY_ORDERS,
  BACK_ICON,
  CART_BLACK_ICON,
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import FastImage from "react-native-fast-image";
import GreenButton from "../../../blocks/studio-store-ecommerce-components/src/GreenButton/GreenButton";
import ApplicationLoader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");
const staticString = require("./../../studio-store-ecommerce-translations/en.json");

import OrdermanagementController, { Props } from "./OrdermanagementController";
// Customizable Area Start
// Customizable Area End

export default class Ordermanagement extends OrdermanagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderEmptyAddressView = () => {
    // Customizable Area Start
    return (
      <View style={styles.emtpyAddressContainer}>
        <View style={styles.iconContainer}>
          <Image source={EMPTY_MY_ORDERS} style={styles.emptyAddressIcon} />
          <Text style={styles.noAnyOrder}>{staticString.emptyOrder}</Text>
          <Text style={styles.youhave}>{staticString.emptyOrderSubText}</Text>
        </View>
        <GreenButton
          title="BROWSE PRODUCTS"
          customStyle={styles.loginButton}
          customTxtStyle={styles.loginText}
          onPress={() => this.props.navigation.navigate("Catalogue")}
        />
      </View>
    );
    // Customizable Area End
  };

  renderProductItemListCell = (item: any, index: any, orderItem: any) => {
    // Customizable Area Start
    if (item) {
      let isProductVarient = false;
      if (item.catalogue_variant) {
        isProductVarient = true;
      }
      let product_varient_images = item.catalogue_variant;
      let productImage = "";

      if (
        product_varient_images &&
        product_varient_images?.attributes?.images.data?.length > 0
      ) {
        product_varient_images.attributes?.images.data.map((variant: any) => {
          if (variant.attributes.is_default) {
            productImage = variant.attributes.url;
          }
        });
        if (productImage === "") {
          productImage =
            product_varient_images?.attributes?.images?.data[0]?.attributes
              ?.url;
        }
      } else {
        item.product_images.data.map((variant: any) => {
          if (variant.attributes.is_default) {
            productImage = variant.attributes.url;
          }
        });
        if (productImage === "") {
          productImage = item.product_images.data[0].attributes.url;
        }
      }
      return (
        <View style={styles.rowContainer}>
          {orderItem.logistics_ship_rocket_enabled
            ? (orderItem.ship_rocket_status === "delivered" ||
              orderItem.ship_rocket_status === "returned") &&
            !orderItem.is_review_present &&
            !orderItem.order_cancelled && (
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    isInvalidReview: false,
                    selectedOrderData: orderItem,
                    showSubmitReviewModal: true,
                  })
                }
              >
                <Text style={styles.writeReview}>Write a Review</Text>
              </TouchableOpacity>
            )
            : (item.status === "delivered" || item.status === "returned") &&
            !item.is_review_present &&
            !item.order_cancelled && (
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    isInvalidReview: false,
                    selectedOrderData: item,
                    showSubmitReviewModal: true,
                  })
                }
              >
                <Text style={styles.writeReview}>Write a Review</Text>
              </TouchableOpacity>
            )}
          {item.subscription_package && (
            <View style={styles.labelSticker}>
              <Text style={styles.stickerText}>
                SUBSCRIPTION
                {Number(item.subscription_discount) > 0
                  ? ` (${item.subscription_discount}%)`
                  : ""}
              </Text>
            </View>
          )}
          <View style={styles.row}>
            {/* <Image source={{ uri: productImage ? productImage : '' }} style={styles.productImage} /> */}
            <FastImage
              style={styles.productImage}
              source={{
                uri: productImage,
              }}
            //resizeMode={'stretch'}
            />

            <View style={styles.middleInfo}>
              <Text style={styles.productName}>{item.product_name}</Text>
              {isProductVarient && (
                <View style={styles.changeRow}>
                  <Text style={styles.periodText}>
                    {this.getVarientString(
                      item.catalogue_variant.attributes
                        .catalogue_variant_properties
                    )}
                  </Text>
                </View>
              )}
              <View style={styles.dateRow}>
                <Text style={styles.orderText}>Ordered on</Text>
                <Text style={styles.date}>{orderItem.order_date}</Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.priceValue}>
                  {themeJson.attributes.currency_type} {item.unit_price}
                </Text>
                {!item.subscription_package && (
                  <View style={styles.placedRow}>
                    <View style={styles.greenDot} />
                    <Text style={styles.placedText}>
                      {orderItem.logistics_ship_rocket_enabled
                        ? orderItem.ship_rocket_status === "new"
                          ? "confirmed"
                          : orderItem.ship_rocket_status
                        : item.overall_order_status}
                    </Text>
                  </View>
                )}
              </View>
              {item.subscription_package && (
                <View style={styles.placedRow}>
                  <Text style={styles.package}>
                    {item.preferred_delivery_slot
                      ? this.getSlotString(item.preferred_delivery_slot) +
                      ` ${item.preferred_delivery_slot} | `
                      : ""}
                  </Text>
                  <Text style={styles.period}>
                    {item.subscription_package.charAt(0).toUpperCase() +
                      item.subscription_package.slice(1)}{" "}
                    for {item.subscription_period} Month
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.rightInfo}>
              <Text style={styles.quantity}>
                Quantity :{" "}
                {item.subscription_package
                  ? item.subscription_quantity
                  : item.quantity}
              </Text>
            </View>
          </View>
          {item.subscription_package && (
            <Text style={styles.subscriptionPriceValue}>
              Subscription Amount: {themeJson.attributes.currency_type}{" "}
              {item.total_price}
            </Text>
          )}
          <View style={styles.line} />
        </View>
      );
    }
    // Customizable Area End
  };

  showBottomButton = (orderItem: any) => {
    // Customizable Area Start
    switch (orderItem.status) {
      case "returned":
        return null;
      case "refunded":
        return null;
      case "delivered":
        return null;
      case "cancelled":
        return (
          <TouchableOpacity disabled={true} style={styles.cancelContainer}>
            <Text style={styles.cancelOrder}>Cancelled</Text>
          </TouchableOpacity>
        );
      default:
        return (
          <TouchableOpacity
            onPress={() =>
              this.setState({
                cancelData: orderItem,
                showCancelOrderModal: true,
              })
            }
            style={styles.cancelContainer}
          >
            <Text style={styles.cancelOrder}>Cancel Order</Text>
          </TouchableOpacity>
        );
    }
    // Customizable Area End
  };

  renderMyOrderCell = (orderItem: any) => {
    // Customizable Area Start
    return (
      <View style={styles.cellContainer}>
        <View style={styles.orderRow}>
          <Text style={styles.orderNumber}>
            Order Number : {orderItem.attributes.order_number}
          </Text>
        </View>
        {orderItem.attributes.order_items.map((item: any, index: any) => {
          return (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Orderdetailview", {
                  orderData: item,
                  mainOrderData: orderItem,
                })
              }
              style={styles.insideContainer}
            >
              {this.renderProductItemListCell(
                item.attributes,
                index,
                orderItem.attributes
              )}
            </TouchableOpacity>
          );
        })}
        <View style={styles.totalAmountContainer}>
          <Text style={styles.totalAmountText}>
            Total Amount: {themeJson.attributes.currency_type}{" "}
            {orderItem.attributes.total}
          </Text>
        </View>
        {this.showBottomButton(orderItem.attributes)}
      </View>
    );
    // Customizable Area End
  };

  renderMyOrderList = () => {
    // Customizable Area Start
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={this.state.myOrderList}
          extraData={this.state}
          renderItem={({ item }) => this.renderMyOrderCell(item)}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.01}
          onEndReached={() => this.onEndReached()}
          onMomentumScrollBegin={() => this._onMomentumScrollBegin()}
        />
      </View>
    );
    // Customizable Area End
  };

  renderCancelOrderModal = () => {
    // Customizable Area Start
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showCancelOrderModal}
        onRequestClose={() => {
          this.setState({ showCancelOrderModal: false });
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => { }}
          style={styles.modalContainer}
        >
          <View style={styles.popup}>
            <Text style={styles.deleteAddress}>Cancel Order</Text>
            <Text style={styles.areYouSure}>
              Are you sure you want to cancel order ?
            </Text>
            <View style={styles.bottomPopupView}>
              <TouchableOpacity
                testID={"buttonCancelReview"}
                style={styles.btnBottomPopup}
                onPress={() => this.setState({ showCancelOrderModal: false })}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity
                testID={"buttonSubmitReview"}
                disabled={this.state.isCancleLoading}
                style={styles.btnBottomPopup}
                onPress={() => this.cancelOrder()}
              >
                <Text style={styles.yesDelete}>Yes, Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
    // Customizable Area End
  };

  renderSubmitReviewModal = () => {
    // Customizable Area Start
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showSubmitReviewModal}
        onRequestClose={() => {
          this.setState({ showSubmitReviewModal: false });
        }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.modalContainerContent}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => { }}
            style={styles.modalContainer}
          >
            <View style={styles.reviewPopup}>
              <Text style={styles.deleteAddress}>Rate and Review</Text>
              <Text style={styles.areYouSure}>Rate our Product</Text>
              <View style={styles.starContainer}>
                {this.state.ratingList.map((item: any) => {
                  return (
                    <TouchableOpacity
                      key="ratingList"
                      onPress={() => this.onPressStar(item)}
                    >
                      <Image
                        source={
                          item.isSelected
                            ? item.selectedStar
                            : item.unSelectedStar
                        }
                        style={styles.star}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
              <TextInput
                testID={"ratingInput"}
                style={styles.ratingInput}
                multiline={true}
                textAlignVertical={"top"}
                secureTextEntry={false}
                value={this.state.reviewText}
                placeholder="Write detailed review for product .."
                placeholderTextColor={COLOR_CONST.charcoalGrey}
                underlineColorAndroid="transparent"
                returnKeyType={"done"}
                onChangeText={(text) =>
                  this.setState({ reviewText: text, isInvalidReview: false })
                }
              />
              {this.state.isInvalidReview && (
                <Text style={styles.emptyText}>Review cannot be empty.</Text>
              )}
              <View style={styles.bottomPopupViewReview}>
                <TouchableOpacity
                  style={styles.btnBottomPopup}
                  onPress={() =>
                    this.setState({ showSubmitReviewModal: false })
                  }
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <View style={styles.verticalLine} />
                <TouchableOpacity
                  testID={"btnCancelOrder"}
                  style={styles.btnBottomPopup}
                  onPress={() => this.submitOrderReview()}
                >
                  <Text style={styles.yesDelete}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </Modal>
    );
    // Customizable Area End
  };

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.container}>
        <TopHeader
          headerTitle={"My Order"}
          onPressLeft={() => this.handleBackButtonClick()}
          headerLeftIconName={BACK_ICON}
          headerLeftIconStyle={styles.headerLeftIcon}
          headerRightIcons={[
            {
              src: CART_BLACK_ICON,
              onPress: () => {
                this.props.navigation.navigate("Shoppingcart");
              },
              cartHasProductFlag: this.state.cartHasProduct,
              cartquantity: this.state.cartcount,
              style: { resizeMode: "contain", marginLeft: Scale(35) },
            },
          ]}
          navigation={this.props.navigation}
          headerTitleViewStyle={styles.headerTitleView}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor={COLOR_CONST.white}
          isFocused={true}
        />
        {!this.state.noProductFound && this.renderMyOrderList()}
        {this.state.noProductFound && this.renderEmptyAddressView()}
        {this.renderCancelOrderModal()}
        {this.renderSubmitReviewModal()}
        <ApplicationLoader isFetching={this.state.isFetching} />
        <CustomErrorModal
          showModal={this.state.showAlertModal}
          message={this.state.message}
          isShowError={this.state.isShowError}
          hideErrorModal={() => this.setState({ showAlertModal: false })}
        />
      </SafeAreaView>
      // Customizable Area End
    );
  }
  // Customizable Area Start
  // Customizable Area End
}
