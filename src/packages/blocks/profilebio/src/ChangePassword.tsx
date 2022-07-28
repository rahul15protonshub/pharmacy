import React from "react";
// Customizable Area Start
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GreenButton from "../../studio-store-ecommerce-components/src/GreenButton/GreenButton";
import { SimpleTextInput } from "../../studio-store-ecommerce-components/src/SimpleTextInput/SimpleTextInput";
import TopHeader from "../../studio-store-ecommerce-components/src/TopHeader/TopHeader";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import {
  backIcon,
  changePasswordIcon,
  imgPasswordHideIcon,
  imgPasswordShowIcon,
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import ChangePasswordController, { Props } from "./ChangePasswordController";
import styles from "./ChangePasswordStyle";
import ApplicationLoader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

// Customizable Area Start
// Customizable Area End

export default class ChangePassword extends ChangePasswordController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderPasswordForm = () => {
    return (
      // Customizable Area Start
      <View style={styles.innerContainer}>
        <KeyboardAwareScrollView>
          <Text
            style={[
              styles.enterPasswordHeader,
              {
                color:
                  this.state.textInputErrorData.currentPassError ||
                    this.state.textInputErrorData.newPassError ||
                    this.state.textInputErrorData.newPass1Error
                    ? COLOR_CONST.pastelRed
                    : COLOR_CONST.charcoalGrey,
              },
            ]}
          >
            Enter a passsword with alphabets A-z, number and a symbol
          </Text>
          <Text style={styles.passwordMismatch}>
            {this.state.showMissmatchError ? "Password Missmatch !" : ""}
          </Text>
          <View style={styles.formContainer}>
            <View>
              <SimpleTextInput
                testID="txtPasswordInput"
                title={"Enter Current Password"}
                onFocus={() =>
                  this.setState((prevState) => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      currentPassFocus: true,
                    },
                  }))
                }
                onBlur={() =>
                  this.setState((prevState) => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      currentPassFocus: false,
                    },
                  }))
                }
                secureTextEntry={this.state.currentPasswordHide}
                onChangeText={(text: string) =>
                  this.onChangeTextInput("currentPass", text)
                }
                focusData={this.state.textInputFocusData.currentPassFocus}
                errorData={this.state.textInputErrorData.currentPassError}
              />
              <TouchableOpacity
                style={styles.hideIcon}
                onPress={() =>
                  this.setState({
                    currentPasswordHide: !this.state.currentPasswordHide,
                  })
                }
              >
                <Image
                  source={
                    this.state.currentPasswordHide
                      ? imgPasswordShowIcon
                      : imgPasswordHideIcon
                  }
                />
              </TouchableOpacity>
            </View>
            <View>
              <SimpleTextInput
                testID="txtNewPassword"
                title={"Enter New Password"}
                onFocus={() =>
                  this.setState((prevState) => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      newPassFocus: true,
                    },
                  }))
                }
                onBlur={() =>
                  this.setState((prevState) => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      newPassFocus: false,
                    },
                  }))
                }
                secureTextEntry={this.state.newPasswordHide}
                onChangeText={(text: string) =>
                  this.onChangeTextInput("newPass", text)
                }
                focusData={this.state.textInputFocusData.newPassFocus}
                errorData={this.state.textInputErrorData.newPassError}
                showEyeButton={true}
              />
              <TouchableOpacity
                style={styles.hideIcon}
                onPress={() =>
                  this.setState({
                    newPasswordHide: !this.state.newPasswordHide,
                  })
                }
              >
                <Image
                  source={
                    this.state.newPasswordHide
                      ? imgPasswordShowIcon
                      : imgPasswordHideIcon
                  }
                />
              </TouchableOpacity>
            </View>
            <View>
              <SimpleTextInput
                testID="txtConfirmNewPassword"
                title={"Re-enter New Password"}
                onFocus={() =>
                  this.setState((prevState) => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      newPass1Focus: true,
                    },
                  }))
                }
                onBlur={() =>
                  this.setState((prevState) => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      newPass1Focus: false,
                    },
                  }))
                }
                secureTextEntry={this.state.confirmPasswordHide}
                onChangeText={(text: string) =>
                  this.onChangeTextInput("newPass1", text)
                }
                focusData={this.state.textInputFocusData.newPass1Focus}
                errorData={this.state.textInputErrorData.newPass1Error}
              />
              <TouchableOpacity
                style={styles.hideIcon}
                onPress={() =>
                  this.setState({
                    confirmPasswordHide: !this.state.confirmPasswordHide,
                  })
                }
              >
                <Image
                  source={
                    this.state.confirmPasswordHide
                      ? imgPasswordShowIcon
                      : imgPasswordHideIcon
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <GreenButton
          testID="btnChangePassword"
          title="Change Password"
          disabled={
            this.state.textInputData.currentPass.trim() === "" ||
            this.state.textInputData.newPass.trim() === "" ||
            this.state.textInputData.newPass1.trim() === ""
          }
          customStyle={[
            styles.loginButton,
            {
              opacity:
                this.state.textInputData.currentPass.trim() === "" ||
                  this.state.textInputData.newPass.trim() === "" ||
                  this.state.textInputData.newPass1.trim() === ""
                  ? 0.5
                  : 1,
            },
          ]}
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
      </View>
      // Customizable Area End
    );
  };

  renderPasswordSuccessfullyChangedView = () => {
    return (
      // Customizable Area Start
      <View style={styles.passwordChangedContainer}>
        <View>
          <Image source={changePasswordIcon} style={styles.lockIcon} />
          <Text style={styles.passwordChanged}>
            Password changed successfully !
          </Text>
          <Text style={styles.youCan}>
            You can now go back and continue browsing products
          </Text>
          <Text style={styles.youCan}>Enjoy Shopping !</Text>
        </View>
        <GreenButton
          title="GO TO PROFILE"
          customStyle={[styles.loginButton]}
          customTxtStyle={styles.loginText}
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
      // Customizable Area End
    );
  };

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.innerContainer}>
        <TopHeader
          headerTitle={"Change Password"}
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconName={backIcon}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        {!this.state.showPasswordChangedSuccessfully &&
          this.renderPasswordForm()}
        {this.state.showPasswordChangedSuccessfully &&
          this.renderPasswordSuccessfullyChangedView()}
      </SafeAreaView>
      // Customizable Area End
    );
  }
  // Customizable Area Start
  // Customizable Area End
}
