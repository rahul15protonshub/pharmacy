import React from "react";

import {
  // Customizable Area Start
  ScrollView,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Picker,
  Keyboard,
  // Customizable Area End
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GreenButton from "../../studio-store-ecommerce-components/src/GreenButton/GreenButton";
import TopHeader from "../../studio-store-ecommerce-components/src/TopHeader/TopHeader";
import { backIcon } from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import EditAddressController, { Props } from "./EditAddressController";
import styles from "./EditAddressStyle";
import ApplicationLoader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

// Customizable Area Start
// Customizable Area End

export default class EditAddress extends EditAddressController {
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
        <TopHeader
          headerTitle={
            this.props.navigation.getParam("isFromEdit")
              ? "Edit Address"
              : "Add New Address"
          }
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconName={backIcon}
          headerRightIcons={[]}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        <ScrollView>
          <View style={styles.formContainer}>
            <KeyboardAwareScrollView>
              <View>
                <Text
                  style={[
                    styles.inputText,
                    {
                      color: this.state.textInputErrorData.nameError
                        ? COLOR_CONST.pastelRed
                        : COLOR_CONST.charcoalGrey,
                    },
                  ]}
                >
                  Name
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      borderBottomColor: this.state.textInputFocusData.nameFocus
                        ? themeJson.attributes.primary_color
                        : COLOR_CONST.lightGreyText,
                    },
                  ]}
                  value={this.state.textInputData.name}
                  {...this.textInputNameProps}
                  onFocus={() =>
                    this.setState((prevState) => ({
                      textInputFocusData: {
                        ...prevState.textInputFocusData,
                        nameFocus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState((prevState) => ({
                      textInputFocusData: {
                        ...prevState.textInputFocusData,
                        nameFocus: false,
                      },
                    }))
                  }
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    this.refTextInput1.focus();
                  }}
                />
                <Text
                  style={[
                    styles.inputText,
                    {
                      color: this.state.textInputErrorData.flatNoError
                        ? COLOR_CONST.pastelRed
                        : COLOR_CONST.charcoalGrey,
                    },
                  ]}
                >
                  Flat / House / Apartment No.
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      borderBottomColor: this.state.textInputFocusData
                        .flatNoFocus
                        ? themeJson.attributes.primary_color
                        : COLOR_CONST.lightGreyText,
                    },
                  ]}
                  ref={(input) => {
                    this.refTextInput1 = input;
                  }}
                  value={this.state.textInputData.flat_no}
                  {...this.textInputFlatProps}
                  onFocus={() =>
                    this.setState((prevState) => ({
                      textInputFocusData: {
                        ...prevState.textInputFocusData,
                        flatNoFocus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState((prevState) => ({
                      textInputFocusData: {
                        ...prevState.textInputFocusData,
                        flatNoFocus: false,
                      },
                    }))
                  }
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    this.refTextInput2.focus();
                  }}
                />
                <Text
                  style={[
                    styles.inputText,
                    {
                      color: this.state.textInputErrorData.addressLine1Error
                        ? COLOR_CONST.pastelRed
                        : COLOR_CONST.charcoalGrey,
                    },
                  ]}
                >
                  Address Line 1
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      borderBottomColor: this.state.textInputFocusData
                        .addressLine1Focus
                        ? themeJson.attributes.primary_color
                        : COLOR_CONST.lightGreyText,
                    },
                  ]}
                  ref={(input) => {
                    this.refTextInput2 = input;
                  }}
                  value={this.state.textInputData.address}
                  {...this.textInputAddressLine1Props}
                  onFocus={() =>
                    this.setState((prevState) => ({
                      textInputFocusData: {
                        ...prevState.textInputFocusData,
                        addressLine1Focus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState((prevState) => ({
                      textInputFocusData: {
                        ...prevState.textInputFocusData,
                        addressLine1Focus: false,
                      },
                    }))
                  }
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    this.refTextInput3.focus();
                  }}
                />
                <Text
                  style={[
                    styles.inputText,
                    {
                      color: this.state.textInputErrorData.addressLine2Error
                        ? COLOR_CONST.pastelRed
                        : COLOR_CONST.charcoalGrey,
                    },
                  ]}
                >
                  Address Line 2
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      borderBottomColor: this.state.textInputFocusData
                        .addressLine2Focus
                        ? themeJson.attributes.primary_color
                        : COLOR_CONST.lightGreyText,
                    },
                  ]}
                  ref={(input) => {
                    this.refTextInput3 = input;
                  }}
                  value={this.state.textInputData.address_line_2}
                  {...this.textInputAddressLine2Props}
                  onFocus={() =>
                    this.setState((prevState) => ({
                      textInputFocusData: {
                        ...prevState.textInputFocusData,
                        addressLine2Focus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState((prevState) => ({
                      textInputFocusData: {
                        ...prevState.textInputFocusData,
                        addressLine2Focus: false,
                      },
                    }))
                  }
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    this.refTextInput4.focus();
                  }}
                />
                <Text
                  style={[
                    styles.inputText,
                    {
                      color: this.state.textInputErrorData.cityError
                        ? COLOR_CONST.pastelRed
                        : COLOR_CONST.charcoalGrey,
                    },
                  ]}
                >
                  City
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      borderBottomColor: this.state.textInputFocusData.cityFocus
                        ? themeJson.attributes.primary_color
                        : COLOR_CONST.lightGreyText,
                    },
                  ]}
                  value={this.state.textInputData.city}
                  {...this.textInputCityProps}
                  onFocus={() =>
                    this.setState((prevState) => ({
                      textInputFocusData: {
                        ...prevState.textInputFocusData,
                        cityFocus: true,
                      },
                    }))
                  }
                  ref={(input) => {
                    this.refTextInput4 = input;
                  }}
                  onBlur={() =>
                    this.setState((prevState) => ({
                      textInputFocusData: {
                        ...prevState.textInputFocusData,
                        cityFocus: false,
                      },
                    }))
                  }
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                />
                <Text
                  style={[
                    styles.inputText,
                    {
                      color: this.state.textInputErrorData.stateError
                        ? COLOR_CONST.pastelRed
                        : COLOR_CONST.charcoalGrey,
                    },
                  ]}
                >
                  State
                </Text>
                <Picker
                  style={styles.textInput}
                  selectedValue={this.state.textInputData.address_state_id}
                  {...this.selectStateProps}
                >
                  <Picker.Item label="Select" value="" />
                  {this.state.stateList.map((option: any, i: number) => (
                    <Picker.Item
                      key={i}
                      label={option.attributes.name}
                      value={option.attributes.id}
                    />
                  ))}
                </Picker>
                <Text
                  style={[
                    styles.inputText,
                    {
                      color: this.state.textInputErrorData.countryError
                        ? COLOR_CONST.pastelRed
                        : COLOR_CONST.charcoalGrey,
                    },
                  ]}
                >
                  Country
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      borderBottomColor: this.state.textInputFocusData
                        .countryFocus
                        ? themeJson.attributes.primary_color
                        : COLOR_CONST.lightGreyText,
                    },
                  ]}
                  ref={(input) => {
                    this.refTextInput6 = input;
                  }}
                  value={this.state.textInputData.country}
                  {...this.textInputCountryProps}
                  onFocus={() =>
                    this.setState((prevState) => ({
                      textInputFocusData: {
                        ...prevState.textInputFocusData,
                        countryFocus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState((prevState) => ({
                      textInputFocusData: {
                        ...prevState.textInputFocusData,
                        countryFocus: false,
                      },
                    }))
                  }
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    this.refTextInput7.focus();
                  }}
                />
                <Text
                  style={[
                    styles.inputText,
                    {
                      color: this.state.textInputErrorData.pinCodeError
                        ? COLOR_CONST.pastelRed
                        : COLOR_CONST.charcoalGrey,
                    },
                  ]}
                >
                  Pin Code
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      borderBottomColor: this.state.textInputFocusData
                        .pinCodeFocus
                        ? themeJson.attributes.primary_color
                        : COLOR_CONST.lightGreyText,
                    },
                  ]}
                  ref={(input) => {
                    this.refTextInput7 = input;
                  }}
                  value={this.state.textInputData.zip_code}
                  {...this.textInputPinCodeProps}
                  onFocus={() =>
                    this.setState((prevState) => ({
                      textInputFocusData: {
                        ...prevState.textInputFocusData,
                        pinCodeFocus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState((prevState) => ({
                      textInputFocusData: {
                        ...prevState.textInputFocusData,
                        pinCodeFocus: false,
                      },
                    }))
                  }
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    this.refTextInput8.focus();
                  }}
                />
                <Text
                  style={[
                    styles.inputText,
                    {
                      color: this.state.textInputErrorData.phoneNoError
                        ? COLOR_CONST.pastelRed
                        : COLOR_CONST.charcoalGrey,
                    },
                  ]}
                >
                  Phone Number
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      borderBottomColor: this.state.textInputFocusData
                        .phoneNoFocus
                        ? themeJson.attributes.primary_color
                        : COLOR_CONST.lightGreyText,
                    },
                  ]}
                  ref={(input) => {
                    this.refTextInput8 = input;
                  }}
                  value={this.state.textInputData.phone_number}
                  {...this.textInputPhoneNoProps}
                  onFocus={() =>
                    this.setState((prevState) => ({
                      textInputFocusData: {
                        ...prevState.textInputFocusData,
                        phoneNoFocus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState((prevState) => ({
                      textInputFocusData: {
                        ...prevState.textInputFocusData,
                        phoneNoFocus: false,
                      },
                    }))
                  }
                  returnKeyType={"done"}
                  keyboardType={"number-pad"}
                />
              </View>
            </KeyboardAwareScrollView>
          </View>
        </ScrollView>
        <GreenButton
          title="SAVE ADDRESS"
          customStyle={styles.loginButton}
          customTxtStyle={styles.loginText}
          onPress={() => this.validateInput()}
        />
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
