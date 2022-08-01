import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Picker,
  Keyboard,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FocusAwareStatusBar from "../../studio-store-ecommerce-components/src/FocusAwareStatusBar/FocusAwareStatusBar";
import GreenButton from "../../studio-store-ecommerce-components/src/GreenButton/GreenButton";
import CustomErrorModal from "../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
import TopHeader from "../../studio-store-ecommerce-components/src/TopHeader/TopHeader";
import Scale from "../../../framework/src/utils/Scale";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import { BACK_ICON } from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";

import {
  checkboxSelected,
  checkboxUnSelected,
  notificationIcon,
} from "./assets";
import CheckoutController, { Props } from "./CheckoutController";
import styles from "./CheckoutStyle";

// Customizable Area Start
// Customizable Area End

export default class Checkout extends CheckoutController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
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
          headerTitle={"Check Out"}
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconName={BACK_ICON}
          headerRightIcons={[
            {
              src: notificationIcon,
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
        <CustomErrorModal
          isShowError={this.state.isShowError}
          showModal={this.state.customErrorModal}
          message={this.state.customErrorMessage}
          hideErrorModal={() => this.setState({ customErrorModal: false })}
        />
        <ScrollView>
          <View style={styles.formContainer}>
            <View style={styles.selectAddressRow}>
              <Text style={styles.billingAddress}>Billing Address</Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("SavedAddress", {
                    onSetAddress: (addressData: any) =>
                      this.onSetAddress(addressData, "billing"),
                    isFromCheckout: true,
                  })
                }
              >
                <Text style={styles.selectAddress}>Select Address</Text>
              </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView
              ref={(ref: any) => (this.scrollViewRef = ref)}
            >
              <View>
                <Text style={styles.inputText}>Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.name}
                  {...this.textInputNameProps}
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    this.refTextInput1.focus();
                  }}
                />
                <Text style={styles.inputText}>
                  Flat / House / Apartment No.
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.flat_no}
                  {...this.textInputFlatProps}
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  ref={(input) => {
                    this.refTextInput1 = input;
                  }}
                  onSubmitEditing={() => {
                    this.refTextInput2.focus();
                  }}
                />
                <Text style={styles.inputText}>Address Line 1</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.address}
                  {...this.textInputAddressLine1Props}
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  ref={(input) => {
                    this.refTextInput2 = input;
                  }}
                  onSubmitEditing={() => {
                    this.refTextInput3.focus();
                  }}
                />
                <Text style={styles.inputText}>Address Line 2</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.address_line_2}
                  {...this.textInputAddressLine2Props}
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  ref={(input) => {
                    this.refTextInput3 = input;
                  }}
                  onSubmitEditing={() => {
                    this.refTextInput4.focus();
                  }}
                />
                <Text style={styles.inputText}>City</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.city}
                  {...this.textInputCityProps}
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  ref={(input) => {
                    this.refTextInput4 = input;
                  }}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                />
                <Text style={styles.inputText}>State</Text>
                <Picker
                  style={styles.textInput}
                  selectedValue={this.state.textInputData.address_state_id}
                  {...this.selectInputStateProps}
                >
                  <Picker.Item label="Select" value="" />
                  {this.state.stateList.map((option: any, i) => (
                    <Picker.Item
                      key={i}
                      label={option.attributes.name}
                      value={option.attributes.id}
                    />
                  ))}
                </Picker>
                <Text style={styles.inputText}>Country</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.country}
                  {...this.textInputCountryProps}
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  ref={(input) => {
                    this.refTextInput6 = input;
                  }}
                  onSubmitEditing={() => {
                    this.refTextInput7.focus();
                  }}
                />
                <Text style={styles.inputText}>Pin Code</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.zip_code}
                  {...this.textInputPinCodeProps}
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  ref={(input) => {
                    this.refTextInput7 = input;
                  }}
                  onSubmitEditing={() => {
                    this.refTextInput8.focus();
                  }}
                />
                <Text style={styles.inputText}>Phone Number</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.phone_number}
                  keyboardType={"number-pad"}
                  {...this.textInputPhoneNoProps}
                  returnKeyType={"done"}
                  ref={(input) => {
                    this.refTextInput8 = input;
                  }}
                />
              </View>
            </KeyboardAwareScrollView>
            <TouchableOpacity
              onPress={() => this.enableMyBillingAddressSame()}
              style={styles.checkBoxContainer}
            >
              <Image
                source={
                  this.state.billingAndAddressSame
                    ? checkboxSelected
                    : checkboxUnSelected
                }
                style={styles.checkbox}
              />
              <Text style={styles.billingText}>
                My billing and shipping address are the same
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.setState({ saveAddress: !this.state.saveAddress })
              }
              style={styles.checkBoxContainer1}
            >
              <Image
                source={
                  this.state.saveAddress ? checkboxSelected : checkboxUnSelected
                }
                style={styles.checkbox}
              />
              <Text style={styles.billingText}>Save address</Text>
            </TouchableOpacity>
            {!this.state.billingAndAddressSame && (
              <>
                <View style={styles.selectAddressRow}>
                  <Text style={styles.billingAddress}>Shipping Address</Text>
                </View>
                <KeyboardAwareScrollView>
                  <View>
                    <Text style={styles.inputText}>Name</Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.name}
                      {...this.shippingtextInputNameProps}
                      blurOnSubmit={false}
                      returnKeyType={"next"}
                      onSubmitEditing={() => {
                        this.refTextInput9.focus();
                      }}
                    />
                    <Text style={styles.inputText}>
                      Flat / House / Apartment No.
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.flat_no}
                      {...this.shippingtextInputFlatProps}
                      blurOnSubmit={false}
                      returnKeyType={"next"}
                      ref={(input) => {
                        this.refTextInput9 = input;
                      }}
                      onSubmitEditing={() => {
                        this.refTextInput10.focus();
                      }}
                    />
                    <Text style={styles.inputText}>Address Line 1</Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.address}
                      {...this.shippingtextInputAddressLine1Props}
                      blurOnSubmit={false}
                      returnKeyType={"next"}
                      ref={(input) => {
                        this.refTextInput10 = input;
                      }}
                      onSubmitEditing={() => {
                        this.refTextInput11.focus();
                      }}
                    />
                    <Text style={styles.inputText}>Address Line 2</Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.address_line_2}
                      {...this.shippingtextInputAddressLine2Props}
                      blurOnSubmit={false}
                      returnKeyType={"next"}
                      ref={(input) => {
                        this.refTextInput11 = input;
                      }}
                      onSubmitEditing={() => {
                        this.refTextInput12.focus();
                      }}
                    />
                    <Text style={styles.inputText}>City</Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.city}
                      {...this.shippingtextInputCityProps}
                      blurOnSubmit={false}
                      returnKeyType={"next"}
                      ref={(input) => {
                        this.refTextInput12 = input;
                      }}
                      onSubmitEditing={() => {
                        Keyboard.dismiss();
                      }}
                    />
                    <Text style={styles.inputText}>State</Text>
                    <Picker
                      style={styles.textInput}
                      selectedValue={
                        this.state.shippingtextInputData.address_state_id
                      }
                      {...this.shippingSelectStateProps}
                    >
                      <Picker.Item label="Select" value="" />
                      {this.state.stateList.map((option: any, i) => (
                        <Picker.Item
                          key={i}
                          label={option.attributes.name}
                          value={option.attributes.id}
                        />
                      ))}
                    </Picker>
                    <Text style={styles.inputText}>Country</Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.country}
                      {...this.shippingtextInputCountryProps}
                      blurOnSubmit={false}
                      returnKeyType={"next"}
                      ref={(input) => {
                        this.refTextInput14 = input;
                      }}
                      onSubmitEditing={() => {
                        this.refTextInput15.focus();
                      }}
                    />
                    <Text style={styles.inputText}>Pin Code</Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.zip_code}
                      {...this.shippingtextInputPinCodeProps}
                      blurOnSubmit={false}
                      returnKeyType={"next"}
                      ref={(input) => {
                        this.refTextInput15 = input;
                      }}
                      onSubmitEditing={() => {
                        this.refTextInput16.focus();
                      }}
                    />
                    <Text style={styles.inputText}>Phone Number</Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.phone_number}
                      keyboardType={"number-pad"}
                      {...this.shippingtextInputPhoneNoProps}
                      returnKeyType={"done"}
                      ref={(input) => {
                        this.refTextInput16 = input;
                      }}
                    />
                  </View>
                </KeyboardAwareScrollView>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      shippingsaveAddress: !this.state.shippingsaveAddress,
                    })
                  }
                  style={styles.checkBoxContainer1}
                >
                  <Image
                    source={
                      this.state.shippingsaveAddress
                        ? checkboxSelected
                        : checkboxUnSelected
                    }
                    style={styles.checkbox}
                  />
                  <Text style={styles.billingText}>Save address</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
        <GreenButton
          title="Continue"
          customStyle={styles.loginButton}
          customTxtStyle={styles.loginText}
          onPress={() => this.validateInput()}
        />
      </SafeAreaView>
      // Customizable Area End
    );
  }
  // Customizable Area Start
  // Customizable Area End
}
