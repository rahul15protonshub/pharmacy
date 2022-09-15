import React from "react";
// Customizable Area Start
import {
  SafeAreaView,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";

import * as Animatable from "react-native-animatable";
// Customizable Area End
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import FocusAwareStatusBar from "../../studio-store-ecommerce-components/src/FocusAwareStatusBar/FocusAwareStatusBar";
import TopHeader from "../../studio-store-ecommerce-components/src/TopHeader/TopHeader";
import COLOR_CONST, {
  FONTS,
} from "../../studio-store-ecommerce-theme/src/AppFonts";
import Scale, { verticalScale } from "../../../framework/src/utils/Scale";
import {
  CART_EMPTY_ICON,
  NOTIFICATIONS_ICON,
  COUPON_TICK,
  BACK_ICON,
  RX,
  CART_HEART,
  CART_BIN
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";

import styles from "./ShopingCartStyle";
import ShoppingcartController, { Props } from "./ShoppingcartController";
import ApplicationLoader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");
import FastImage from "react-native-fast-image";
const staticString = require("./../../studio-store-ecommerce-translations/en.json");
import Prescriptionuploads from '../../../components/src/precriptionuploads'
import { scaleRatio } from "../../../framework/src/Utilities";
const mobH = Dimensions.get('window').height;
const mobW = Dimensions.get('window').width;
export default class Shoppingcart extends ShoppingcartController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderEmptyDataView = () => {
    return (
      // Customizable Area Start
      <View style={styles.emtpyAddressContainer}>
        <View style={styles.cartempty}>
          <Image source={CART_EMPTY_ICON} style={styles.emptyAddressIcon} />
          <Text style={styles.noAnyOrder}>{staticString.emptyCart}</Text>
          <Text style={styles.youhave}>{staticString.emptyCartSubText}</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Catalogue")}
        >
          <View
            style={styles.loginButton}
          >
            <Text style={styles.loginText}>Browse product</Text>
          </View>
        </TouchableOpacity>
      </View>
      // Customizable Area End
    );
  };

  getSlotString = (slot: any) => {
    if (slot.includes("AM") || slot.includes("am")) {
      return "Morning";
    }
    return "Evening";
  };
  renderVariaentRow = (item: any, index: number) => {
    return (
      <View style={{
        width: '50%',
        marginRight: 10,
        marginTop: 18,
      }}>
        <Text style={styles.productleftLabel}>{item.attributes.variant_name}</Text>
        <Text style={styles.productleftValue}>{item.attributes.property_name}</Text>
      </View>
    )
  }
  renderMyOrderCell = (item: any, index: number) => {
    // Customizable Area Start
    let isProductVarient = item.attributes.catalogue_variant !== null;
    let isFromSubscription = item.attributes.subscription_package !== null;
    let productImage = "";
    if (isProductVarient) {
      item.attributes.catalogue_variant.attributes?.images.data.map(
        (variant: any) => {
          if (variant.attributes.is_default) {
            productImage = variant.attributes.url;
          }
        }
      );
      if (productImage === "") {
        productImage =
          item.attributes.catalogue_variant.attributes?.images?.data[0]
            ?.attributes?.url;
      }
    } else {
      item.attributes.catalogue.attributes.images?.data.map((variant: any) => {
        if (variant.attributes.is_default) {
          productImage = variant.attributes.url;
        }
      });
      if (productImage === "") {
        productImage =
          item.attributes.catalogue.attributes.images?.data[0]?.attributes?.url;
      }
    }
    let itemQuantity = item.attributes.quantity
      ? item.attributes.quantity
      : item.attributes.subscription_quantity;

    let prescription = item.attributes.catalogue.attributes.prescription;
    return (
      <View style={{}
      } key={item.id}>
        <TouchableOpacity
          onPress={() => this.onPressProduct(item)}
          style={styles.rowContainer}
        >
         {
            isFromSubscription ? (
              <View style={styles.subscription_discount_badge}>
                <Text style={styles.subscription_discount_badge_text}>
                  SUBSCRIPTION {item.attributes.subscription_discount}%
                </Text>
              </View>
            ) : null
          }
          <View style={styles.row}>

            <FastImage
              style={styles.productImage}
              source={{
                uri: productImage,
              }}
            //resizeMode={'stretch'}
            />

            <View style={styles.productleftContainer}>
              <Text style={styles.productleftText}>{item.attributes.catalogue.attributes.name}</Text>


              {/* <View style={styles.productleftContainer1}> */}

              {
                isProductVarient && (
                  <FlatList
                    data={item.attributes.catalogue_variant.attributes
                      .catalogue_variant_properties}
                    numColumns={2}
                    extraData={this.state}
                    renderItem={({ item, index }) => this.renderVariaentRow(item, index)}
                  />
                )
              }


              <Text style={[styles.productleftLabel, { marginTop: verticalScale(20) }]}>Price</Text>
              <Text style={styles.productleftamount}>{themeJson.attributes.currency_type}{" "}
                {item.attributes.unit_price}</Text>
              {
                prescription &&
                <View style={[styles.outDesctription]}>
                  <Image
                    source={RX}
                    style={styles.descrioptionTick}
                  />
                  <Text style={styles.prescription}>Prescription needed</Text>
                </View>
              }
              <View style={styles.tools}>
                <TouchableOpacity
                  style={styles.minusContainer}
                  onPress={() =>
                    this.onUpdateCartValue(
                      item,
                      Number(itemQuantity) - 1,
                      item.attributes.catalogue_id,
                      item.attributes.catalogue_variant_id
                    )
                  }
                >
                  <Text style={styles.minus}>-</Text>
                </TouchableOpacity>
                <View
                  style={styles.countContainer}
                >
                  <Text style={styles.count}>{itemQuantity}</Text>
                </View>
                <TouchableOpacity
                  style={styles.plusContainer}
                  onPress={() =>
                    this.onUpdateCartValue(
                      item,
                      Number(itemQuantity) + 1,
                      item.attributes.catalogue_id,
                      item.attributes.catalogue_variant_id
                    )
                  }
                >
                  <Text style={styles.plus}>+</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
          <View style={styles.itemview} ></View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={() =>
                this.addToWishlist(
                  item,
                  item.attributes.catalogue_id,
                  item.attributes.catalogue_variant_id
                )
              }
              style={styles.removeButton}
            >
              <FastImage
                style={styles.rmIconsHeart}
                source={CART_HEART}
              />
              <Text style={styles.moveWishlistText}>Move to Wishlist</Text>
            </TouchableOpacity>
            <View style={{ width: 1, height: verticalScale(28), backgroundColor: COLOR_CONST.newlightcolor, marginHorizontal: Scale(16), }}>

            </View>

            <TouchableOpacity
              onPress={() =>
                this.removeCartItem(
                  item,
                  Number(itemQuantity),
                  item.attributes.catalogue_id,
                  item.attributes.catalogue_variant_id
                )
              }
              style={styles.removeButton}
            >
              <FastImage
                style={styles.rmIcons}
                source={CART_BIN}
              />
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>

          </View>

        </TouchableOpacity>
      </View>
    );
    // Customizable Area End
  };
  renderMyOrderList = () => {
    return (
      // Customizable Area Start
      <View style={styles.listContainer}>
        {
          this.state.cartList != null
          && <View style={styles.list_devider} />
        }
        <FlatList
          data={this.state.cartList}
          contentContainerStyle={{ paddingBottom: verticalScale(30) }}
          extraData={this.state}
          renderItem={({ item, index }) => this.renderMyOrderCell(item, index)}
        />
      </View>
      // Customizable Area End
    );
  };
  renderBottomDetails = () => {
    if (this.state.cartList) {
      return (
        // Customizable Area Start
        <View style={{ marginBottom: Scale(30) }}>
          <View style={styles.bottomDetails}>
            <Text style={styles.OrderSummery}>Order summary</Text>
            <View style={styles.headerCart}>
              <Text style={styles.yourCart}>Product</Text>
              <Text style={styles.amountText}>Amount</Text>
            </View>



            {this.state.cartList.map((item: any) => {
              console.log('myitem',item)
              return (
                <View style={styles.tax}>
                  <View>
                    <Text style={styles.product_name}>{item.attributes.catalogue.attributes.name}</Text>
                    {
                      item.attributes.subscription_package ? (
                        <>
                          <Text style={styles.product_subscription_details}>
                          {
                            ["9am to 12pm", "6am to 9am"].includes(item.attributes.preferred_delivery_slot)
                            ? `Morning (${item.attributes.preferred_delivery_slot
                              .replace(' to ', ' - ').replace(/am/g, 'AM').replace(/pm/g, 'PM')})`
                            : `Evening (${item.attributes.preferred_delivery_slot.replace(' to ', ' - ')
                            .replace(' to ', ' - ').replace(/am/g, 'AM').replace(/pm/g, 'PM')})`
                          }
                          </Text>
                          <Text style={styles.product_subscription_details}>
                            {`Duration: ${item.attributes.subscription_package} (${item.attributes.subscription_period
                            } ${item.attributes.subscription_period > 1 ? "Months" : "Month"})`}
                          </Text>
                        </>
                      ) : null
                    }
                  </View>
                  <Text style={[styles.product_middle_name]}>x{item.attributes.quantity}</Text>
                  <Text style={styles.price}>
                    {themeJson.attributes.currency_type}{" "}
                    {item.attributes.total_price}
                  </Text>
                </View>
              );
            })}

            <View style={styles.devider} />
            <View style={[styles.tax, { marginTop: verticalScale(25) }]}>
              <Text style={styles.product_name}>Sub Total (Inclusive Tax) </Text>
              <Text style={styles.price}>
                {themeJson.attributes.currency_type}{" "}
                {this.state.cartData.attributes.sub_total}
              </Text>
            </View>
            <View style={styles.devider} />

            <View>
              {/* <View style={styles.tax}>
                <Text style={styles.product_name}>Taxes</Text>
                <Text style={styles.price}>{'+ '}
                  {themeJson.attributes.currency_type}{" "}
                  {this.state.cartData.attributes.total_tax || 0.0}
                </Text>
              </View> */}
                {
                this.state.cartData.attributes.sub_discounted_total_price ? (
                  <View style={styles.tax}>
                    <Text style={styles.product_name}>Subscription Discount</Text>
                    <Text style={styles.price}>{'- '}
                      {themeJson.attributes.currency_type}{" "}
                      {(this.state.cartData.attributes.sub_discounted_total_price) || 0.0}
                    </Text>
                  </View>
                ) : null
              }
              <View style={styles.tax}>
                <Text style={styles.product_name}>Delivery Charges</Text>
                <Text style={styles.price}>{'+ '}
                  {themeJson.attributes.currency_type}{" "}
                  {this.state.cartData.attributes.shipping_total || 0.0}
                </Text>
              </View>
            </View>
            <View style={styles.devider} />
            {/* ===========================input feilds============================== */}
            <View style={styles.inputContainerCupan}>
              <TextInput
                style={styles.input_cupan}
                placeholder="Enter your promotion code"
                autoCapitalize="characters"
                placeholderTextColor="#8b8f95"
                value={this.state.codeValue}
                {...this.codeTextInputProps}
                editable={(!this.state.isValidCoupon) ? true : false}
              />
              <TouchableOpacity disabled={this.state.isValidCoupon} style={styles.input_cupan_btn} onPress={() => {
                this.applyCoupon();
              }}>
                <Text style={styles.cupon_btn_txt}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.isValidCoupon &&
              <View style={styles.removeCupanContainer}>
                <Text style={styles.rmTxt}>Great ! Coupon Code Applied</Text>
                <TouchableOpacity activeOpacity={0} onPress={() => this.removeCoupon()}>
                  <Text style={styles.rmTxt}>Remove Coupon</Text>
                </TouchableOpacity>
              </View>
            }
            {this.state.isValidCoupon &&
              <>
                <View style={[styles.tax, { marginHorizontal: mobW * 0.05, marginTop: verticalScale(24) }]}>
                  <Text style={styles.discountTxt}>Discount</Text>
                  <View style={styles.discountRightTxt}>
                    <TouchableOpacity onPress={() => this.removeCoupon()}>
                      <FastImage
                        style={[styles.rmIcons, { marginRight: Scale(10) }]}
                        source={CART_BIN}
                      />
                    </TouchableOpacity>
                    <Text style={[styles.totaltxt, { textAlign: 'right' }]}>- {themeJson.attributes.currency_type}{" "}
                      {this.state.cartData?.attributes?.applied_discount}</Text>
                  </View>
                </View>
                <View style={styles.devider} />
              </>
            }

            {/*============ total amount============= */}
            <View style={[styles.tax, { marginHorizontal: mobW * 0.05, marginTop: verticalScale(25) }]}>
              <Text style={styles.totaltxt}>Total</Text>
              <Text style={[styles.totaltxt, { textAlign: 'right' }]}>+ {themeJson.attributes.currency_type}{" "}
                {this.state.cartData.attributes.total}</Text>
            </View>

          </View>
        </View>
        // Customizable Area End
      );
    }
  };

  renderCouponCodeModal = () => {
    return (
      // Customizable Area Start
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showCouponCodeModal}
        onRequestClose={() => {
          this.setState({
            showCouponCodeModal: false,
            isCouponApplied: false,
            isValidCoupon: false,
          });
        }}
      >
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"always"}
          contentContainerStyle={{ flex: 1 }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (this.state.isCouponApplied && this.state.isValidCoupon) {
                this.setState({ showCouponCodeModal: false });
                return;
              }
              this.setState({
                showCouponCodeModal: false,
                isCouponApplied: false,
                isValidCoupon: false,
              });
            }}
            style={styles.modalContainer}
          >
            <TouchableOpacity activeOpacity={1} style={styles.popup}>
              <Text style={styles.enterCouponText}>Enter Coupon Code</Text>
              {this.state.isCouponApplied &&
                this.state.isValidCoupon === false && (
                  <Text style={styles.oopsText}>
                    {this.state.couponCodeErrorMsg}
                  </Text>
                )}
              {this.state.isCouponApplied && this.state.isValidCoupon && (
                <Text style={styles.validText}>
                  Great ! Coupon Code Applied
                </Text>
              )}
              <TextInput
                style={[
                  styles.couponInput,
                  {
                    marginTop:
                      this.state.isCouponApplied && !this.state.isValidCoupon
                        ? verticalScale(16)
                        : verticalScale(41),
                  },
                ]}
                placeholder="Enter your coupon code"
                autoCapitalize="characters"
                placeholderTextColor="#8b8f95"
                value={this.state.codeValue}
                {...this.codeTextInputProps}
              />
              {!this.state.isValidCoupon ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      this.applyCoupon();
                    }}
                    style={{
                      opacity: this.state.codeValue.trim() === "" ? 0.5 : 1,
                    }}
                    disabled={this.state.codeValue.trim() === ""}
                  >
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={[
                        themeJson.attributes.common_button_color,
                        themeJson.attributes.common_button_color,
                        themeJson.attributes.common_button_color,
                      ]}
                      style={styles.continueShoppingButton}
                    >
                      <Text style={styles.applyText}>{"APPLY COUPON"}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        showCouponCodeModal: false,
                        isCouponApplied: false,
                        isValidCoupon: false,
                      })
                    }
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  onPress={() => this.setState({ showCouponCodeModal: false })}
                >
                  <Animatable.Image
                    animation="bounceIn"
                    source={COUPON_TICK}
                    style={styles.couponTick}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </Modal>
      // Customizable Area End
    );
  };

  renderGuestModal = () => {
    return (
      // Customizable Area Start
      <Modal
        animationType="slide"
        transparent={this.state.showGuestModal}
        visible={this.state.showGuestModal}
        onRequestClose={() => {
          this.setState({ showGuestModal: false });
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => { }}
          style={styles.modalContainer1}
        >
          <View style={styles.popup1}>
            <Text style={styles.deleteAddress1}>
              Please Sign Up/Log In first
            </Text>
            <Text style={styles.areYouSure1}>
              You need an account to perform this action.
            </Text>
            <View style={styles.bottomPopupView1}>
              <TouchableOpacity
                style={{ flex: 1, alignItems: "center" }}
                onPress={() => this.setState({ showGuestModal: false })}
              >
                <Text style={styles.cancelText1}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine1} />
              <TouchableOpacity
                style={{ flex: 1, alignItems: "center" }}
                onPress={() => {
                  this.handleGuest();
                }}
              >
                <Text style={styles.yesDelete1}>SIGN UP/LOG IN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      // Customizable Area End
    );
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
          headerTitle={"Cart"}
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconName={BACK_ICON}
          headerRightIcons={[
            {
              src: NOTIFICATIONS_ICON,
              onPress: () => {
                this.props.navigation.navigate("Notifications");
              },
              style: { marginLeft: Scale(40) },
            },
          ]}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        {/* \\\\\\\\\\\\\\\\\order summery\\\\\\\\\ */}



        {!this.state.emptyCart ? (
          <>
            <View style={{ marginTop: verticalScale(2), flex: 1, justifyContent: "space-between" }}>
              <ScrollView keyboardShouldPersistTaps={"always"}>
                {this.renderMyOrderList()}
                {this.renderBottomDetails()}

                {this.state.showCouponCodeModal && this.renderCouponCodeModal()}
              </ScrollView>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() =>
                  this.state.isGuestUser
                    ? this.setState({ showGuestModal: true })
                    :
                    this.state.prescriptionNeed
                      ? this.setState({ prescriptionModal: true })
                      : this.props.navigation.push("Checkout", {
                        isFromCheckout: true,
                        isFromBuyNow: false,
                        buyNowCartID: null,
                      })
                }
              >

                <Text style={styles.loginText}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          this.renderEmptyDataView()
        )}
        {this.renderGuestModal()}
        <ApplicationLoader isFetching={this.state.isFetching} />
        <CustomErrorModal
          showModal={this.state.showAlertModal}
          message={this.state.message}
          isShowError={this.state.isShowError}
          hideErrorModal={() => this.setState({ showAlertModal: false })}
        />
        {this.state.prescriptionModal &&
          <Prescriptionuploads
            navigation={this.props.navigation}
            showmodal={this.state.prescriptionModal}
            hideErrorModal={() =>
              this.setState({ prescriptionModal: false })
            }
            uploadprescription={(productdata: any) =>
              this.uploadproduct(productdata)
            }
            productData={this.state.productDataArr}
          />}
      </SafeAreaView>
      // Customizable Area End
    );
  }
  // Customizable Area Start
  // Customizable Area End
}
