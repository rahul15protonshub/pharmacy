import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Modal,
  SafeAreaView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import SubscriptionOrderListController, {
  Props,
} from "./SubscriptionOrderListController";
import styles from "./SubscriptionOrderListStyle";
import TopHeader from "../../../blocks/studio-store-ecommerce-components/src/TopHeader/TopHeader";
import {
  TICK_ICON,
  DOT_ICON,
  DELIVERED,
  BACK_ICON,
  PENDING,
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";

import ApplicationLoader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
import FocusAwareStatusBar from "../../../blocks/studio-store-ecommerce-components/src/FocusAwareStatusBar/FocusAwareStatusBar";
import { capitalize } from "../../../framework/src/utils/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import scale from "../../../framework/src/utils/Scale";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";

// Customizable Area Start
// Customizable Area End

const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

export default class SubscriptionOrderList extends SubscriptionOrderListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderSubscriptionCell = (item: any, index: any) => {
    const orderData = this.props.navigation.state.params.orderData;
    let productImage = "";

    if (orderData.attributes.product_images.data?.length > 0) {
      orderData.attributes.product_images.data.map((item: any) => {
        if (item.attributes.is_default) {
          productImage = item.attributes.url;
        }
      });
      if (productImage === "") {
        productImage =
          orderData.attributes.product_images.data[0].attributes.url;
      }
    } else {
      orderData.attributes.catalogue.attributes?.images.data.map(
        (item: any) => {
          if (item.attributes.is_default) {
            productImage = item.attributes.url;
          }
        }
      );
      if (productImage === "") {
        productImage =
          orderData.attributes.catalogue.attributes?.images.data[0].attributes
            .url;
      }
    }
    console.log(
      "@@@ Order =============",
      productImage,
      orderData.attributes.product_images
    );

    return (
      <View style={styles.statusView}>
        <View style={styles.tickView}>
          <Image
            source={
              item.attributes.status === "delivered" ? TICK_ICON : DOT_ICON
            }
            style={styles.tickIcon}
          />
          <View style={styles.orderStatusVerticalLine} />
        </View>
        <View style={styles.rightInfo}>
          <View style={styles.rowContent}>
            <View style={styles.statusRow}>
              <Text style={styles.statusHeading}>
                {item.attributes.delivery_date.split(",")[1]}
              </Text>
              {item.attributes.status === "delivered" ? (
                <Image source={DELIVERED} style={styles.deliveredIcon} />
              ) : (
                <Image source={PENDING} style={styles.pendingIcon} />
              )}
            </View>
            <View style={styles.placedRow}>
              <View style={styles.greenDot} />
              <Text style={styles.statusText}>
                {" "}
                {item.attributes.status.charAt(0).toUpperCase() +
                  item.attributes.status.slice(1)}
              </Text>
            </View>
          </View>
          <View style={styles.orderProduct}>
            <View style={styles.productImageRow}>
              <Image source={{ uri: productImage }} style={styles.orderImage} />
              <View>
                <Text style={styles.orderProductName}>
                  {orderData.attributes.product_name}
                </Text>
              </View>
            </View>
            <Text style={styles.orderQty}>
              Quantity :{" "}
              {orderData.attributes.subscription_package
                ? orderData.attributes.subscription_quantity
                : orderData.attributes.quantity}
            </Text>
          </View>
          <Text style={styles.package}>
            {orderData.attributes.preferred_delivery_slot
              ? this.getSlotString(
                  orderData.attributes.preferred_delivery_slot
                ) + ` ${orderData.attributes.preferred_delivery_slot} | `
              : ""}
            <Text style={styles.period}>
              {orderData.attributes.subscription_package
                .charAt(0)
                .toUpperCase() +
                orderData.attributes.subscription_package.slice(1)}{" "}
              for {orderData.attributes.subscription_period} Month
            </Text>
          </Text>
          <View style={styles.statusBottom}>
            <Text style={styles.orderQty}>
              Your order is {item.attributes.status}
            </Text>
            {item.attributes.status === "pending" && (
              <TouchableOpacity
                onPress={() => this.onPressCancelDelivery(item.attributes.id)}
              >
                <Text style={styles.orderCancel}>Cancel order</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  renderSubscriptionList = () => {
    return (
      <View style={styles.reviewListContainer}>
        <FlatList
          data={this.state.subscriptionOrders}
          extraData={this.state}
          renderItem={({ item, index }) =>
            this.renderSubscriptionCell(item, index)
          }
          onEndReached={() => this.onEndReached()}
          onMomentumScrollBegin={() => this._onMomentumScrollBegin()}
          onEndReachedThreshold={0.01}
        />
      </View>
    );
  };

  // Footer loader for Pagination
  _renderSearchResultsFooter = () => {
    return this.state.pageLoader ? (
      <View style={styles.activityIndicator}>
        <ActivityIndicator
          size="large"
          color={themeJson.attributes.primary_color}
        />
      </View>
    ) : null;
  };

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor={COLOR_CONST.white}
          isFocused={true}
        />
        <TopHeader
          headerTitle={"Subscription Order List"}
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconName={BACK_ICON}
          headerLeftIconStyle={styles.headerLeftIcon}
          navigation={this.props.navigation}
          headerTitleViewStyle={styles.headerTitleView}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        {this.renderSubscriptionList()}
        {this._renderSearchResultsFooter()}
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
