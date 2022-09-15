import React from "react";

import {
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import DropDownPicker from "react-native-dropdown-picker";
import {
  RADIO_SELECTED,
  RADIO_UNSELECTED,
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import SchedulingController, { Props } from "./SchedulingController";
import styles from "./SchedulingStyle";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

export const configJSON = require("./config");

// Customizable Area Start
// Customizable Area End

export default class Scheduling extends SchedulingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderSubscriptionModal = () => {
    if (!this.props.productData) {
      return;
    }
    const { productData, selectedProduct, selectedImage } = this.props;
    const { attributes } = productData;
    const on_sale = selectedProduct
      ? selectedProduct.attributes.on_sale
      : attributes.on_sale;
    const price = selectedProduct
      ? on_sale
        ? selectedProduct.attributes.actual_price_including_tax
        : selectedProduct.attributes?.price_including_tax
      : on_sale
      ? attributes.actual_price_including_tax
      : attributes?.price_including_tax;
    const sale_price = selectedProduct
      ? Number(selectedProduct.attributes.price_including_tax)
      : Number(attributes.price_including_tax);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          this.props.onCloseSubscriptionModal();
        }}
      >
        <View style={styles.cartModalContainer}>
          <View style={styles.cartContainer}>
            <View style={styles.selectRow}>
              <Text style={styles.selectQuantityText}>Select Quantity</Text>
              <View style={styles.tools1}>
                <TouchableOpacity style={styles.minusview}
                  onPress={() => this.props.onChangeSubscriptionQuantity(false)}
                >
                  <Text style={styles.minus}>-</Text>
                </TouchableOpacity>
                <View style={styles.countview}>
                <Text style={styles.count}>
                  {this.props.subscriptionQuantity}
                </Text>
                </View>
                <TouchableOpacity style={styles.plusview}
                  onPress={() => this.props.onChangeSubscriptionQuantity(true)}
                >
                  <Text style={styles.plus}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.selectSubscription}>
              Select Subscription Package
            </Text>
            <View style={styles.subscriptionRow}>
              {this.props.subscriptionPackageData.map((item: any) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.props.onSelectSubscriptionPackage(item)}
                    style={styles.packageRow}
                  >
                    <Image
                      source={
                        item.isSelected ? RADIO_SELECTED : RADIO_UNSELECTED
                      }
                      style={styles.radio}
                    />
                    <Text style={styles.dailyText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {this.props.invalidSubscriptionPackage && (
              <Text style={styles.emptyText}>
                Please select subscription package.
              </Text>
            )}
            <Text style={styles.selectSubscriptionPeriod}>
              Select Subscription Period
            </Text>
            <DropDownPicker
              items={this.props.subscriptionPeriodData}
              //@ts-ignore
              defaultValue={this.props.period}
              containerStyle={styles.pickerContainer}
              labelStyle={styles.labelStyle}
              style={{
                backgroundColor: "#fff",
                borderWidth: 0,
                borderBottomWidth: 1,
              }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item: any) =>
                this.props.onSelectSubscriptionPeriod(item)
              }
            />
            {this.props.invalidSubscriptionPeriod && (
              <Text style={styles.emptyText}>
                Please select subscription period.
              </Text>
            )}
            {this.props.subscriptionTimeSlotData.length > 0 && (
              <Text style={styles.selectSubscription}>
                {" "}
                Preferred Time Slot{" "}
              </Text>
            )}
            <View style={styles.subscriptionRow}>
              {this.props.subscriptionTimeSlotData.length > 0 &&
                this.props.slots.map((item: any) => {
                  if (item.availabity) {
                    return (
                      <TouchableOpacity
                        onPress={() => this.props.setSubSlots(item.id)}
                        style={styles.packageRow}
                      >
                        <Image
                          source={
                            item.id === this.props.selectedSlotId
                              ? RADIO_SELECTED
                              : RADIO_UNSELECTED
                          }
                          style={styles.radio}
                        />
                        <Text style={styles.dailyText}>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  }
                })}
            </View>
            {this.props.subscriptionTimeSlotData.length > 0 && (
              <DropDownPicker
                items={this.props.subscriptionTimeSlotData}
                //@ts-ignore
                defaultValue={this.props.selectedTimeSlot}
                containerStyle={styles.pickerContainer}
                labelStyle={styles.labelStyle}
                style={{
                  backgroundColor: "#fff",
                  borderWidth: 0,
                  borderBottomWidth: 1,
                }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item: any) =>
                  this.props.onSelectSubscriptionTimeSlot(item)
                }
              />
            )}
            {this.props.invalidateSubscriptionTimeSlot && (
              <Text style={styles.emptyText}>
                Please select delivery time slot.
              </Text>
            )}
            <View style={styles.totalPriceRow}>
              <Text style={styles.totalPrice}>Total Price</Text>
              <Text style={styles.priceValue}>
                {themeJson.attributes.currency_type}{" "}
                {on_sale
                  ? Number(
                      sale_price * this.props.subscriptionQuantity
                    ).toFixed(2)
                  : Number(price * this.props.subscriptionQuantity).toFixed(2)}
              </Text>
            </View>
            <View style={styles.cartButtonContainer}>
              <TouchableOpacity
                testID="cartButtonID"
                onPress={() => this.props.onPressSubscribeAddToCart()}
              >
                <LinearGradient
                  colors={[
                    'white',
                    'white',
                  ]}
                  style={styles.cartButtonCustom1}
                >
                  <Text style={[styles.AddcustomTxtStyle,{ color: themeJson.attributes.primary_color}]}>Add To Cart</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                testID="buyNowButtonID"
                onPress={() => this.props.onPressBuyNowSubscription()}
              >
                <LinearGradient
                  colors={[themeJson.attributes.primary_color,
                    themeJson.attributes.primary_color,]}
                  style={styles.cartButtonCustom}
                >
                  <Text style={styles.BUYcustomTxtStyle}>Buy Now</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => this.props.onCloseSubscriptionModal()}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.container}>
        {this.renderSubscriptionModal()}
      </SafeAreaView>
      // Customizable Area End
    );
  }
  // Customizable Area Start
  // Customizable Area End
}
