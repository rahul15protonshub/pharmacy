import React from "react";

import {
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  Modal,
  Platform,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import ProfilebioController, { Props } from "./ProfilebioController";
import TopHeader from "../../studio-store-ecommerce-components/src/TopHeader/TopHeader";
import styles from "./ProfilebioStyle";
import Scale from "../../../framework/src/utils/Scale";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";

import {
  cameraIcon,
  wishListIcon,
  NotificationOffIcon,
  NotificationOnIcon,
  NotificationProfileIcon,
  connectedIcon,
  crossIcon,
  galleryIcon,
  logoutIcon,
  savedIcon,
  cameraIcons,
  myOrdersIcon,
  PASSWORD,
  CONTACT_ICON,
  CART_BLACK_ICON,
  FAQ_ICON,
  HELP_ICON,
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import ApplicationLoader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
import FocusAwareStatusBar from "../../studio-store-ecommerce-components/src/FocusAwareStatusBar/FocusAwareStatusBar";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

// Customizable Area Start
// Customizable Area End

export default class Profilebio extends ProfilebioController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  renderHeaderView = () => {
    const { userData } = this.state;
    return (
      // Customizable Area Start
      <View style={styles.headerContainer}>
        <View style={styles.leftRow}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => userData && this.onPressCameraUploadImage()}
            style={styles.carmeraButton}
          >
            <Image
              source={
                userData
                  ? userData.attributes.image_url
                    ? { uri: userData.attributes.image_url }
                    : cameraIcon
                  : this.state.isFetching
                    ? ""
                    : cameraIcon
              }
              style={
                userData
                  ? userData.attributes.image_url
                    ? styles.profileIcon
                    : styles.cameraIcon1
                  : styles.cameraIcon1
              }
            />
          </TouchableOpacity>
          <View style={styles.propfileData}>
            <Text numberOfLines={1} style={styles.profileName}>
              {userData
                ? userData.attributes.full_name
                : this.state.isFetching
                  ? ""
                  : "Guest User"}
            </Text>
            <Text numberOfLines={1} style={styles.profileEmail}>
              {userData
                ? userData.attributes.email
                  ? userData.attributes.email
                  : userData.attributes.phone_number
                : this.state.isFetching
                  ? ""
                  : "example@gmail.com"}
            </Text>
          </View>
        </View>
        {userData && (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("EditProfile")}
            style={styles.editButton}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      // Customizable Area End
    );
  };
  renderListItems = () => {
    let showConnectedAccounts = true;
    if (Platform.OS === "ios") {
      if (
        !themeJson.attributes.isFacebookLogin &&
        !themeJson.attributes.isGoogleLogin &&
        !themeJson.attributes.isAppleLogin
      ) {
        showConnectedAccounts = false;
      }
    } else {
      if (
        !themeJson.attributes.isFacebookLogin &&
        !themeJson.attributes.isGoogleLogin
      ) {
        showConnectedAccounts = false;
      }
    }
    return (
      // Customizable Area Start
      <View style={styles.listContainer}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("WishList")}
          style={styles.rowItemContainer}
        >
          <Image source={wishListIcon} style={styles.leftIcon} />
          <Text style={styles.wishList}>Wishlist</Text>
          {this.state.wishList > 0 && (
            <View style={styles.countContainer}>
              <Text style={styles.countText}>{this.state.wishList}</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          onPress={() =>
            this.state.userData
              ? this.props.navigation.navigate("Ordermanagement", {
                isFromPlaced: false,
              })
              : this.setState({ showGuestModal: true })
          }
          style={styles.rowItemContainer}
        >
          <Image source={myOrdersIcon} style={styles.leftIcon} />
          <Text style={styles.wishList}>My Orders</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          onPress={() =>
            this.state.userData
              ? this.props.navigation.navigate("SavedAddress")
              : this.setState({ showGuestModal: true })
          }
          style={styles.rowItemContainer}
        >
          <Image source={savedIcon} style={styles.leftIcon} />
          <Text style={styles.wishList}>Saved Addresses</Text>
        </TouchableOpacity>
        {showConnectedAccounts && <View style={styles.horizontalLine} />}
        {showConnectedAccounts && (
          <TouchableOpacity
            onPress={() =>
              this.state.userData
                ? this.props.navigation.navigate("ConnectedAccounts")
                : this.setState({ showGuestModal: true })
            }
            style={styles.rowItemContainer}
          >
            <Image source={connectedIcon} style={styles.leftIcon} />
            <Text style={styles.wishList}>Connected Accounts</Text>
          </TouchableOpacity>
        )}
        {!this.state.isSocialLoginUser && (
          <>
            <View style={styles.horizontalLine} />
            <TouchableOpacity
              onPress={() =>
                this.state.userData
                  ? this.props.navigation.navigate("ChangePassword")
                  : this.setState({ showGuestModal: true })
              }
              style={styles.rowItemContainer}
            >
              <Image source={PASSWORD} style={styles.leftIcon} />
              <Text style={styles.wishList}>Change Password</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      // Customizable Area End
    );
  };
  renderListBottomView = () => {
    return (
      // Customizable Area Start
      <View style={styles.bottomListContainer}>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Contactus")}
          style={styles.rowItemContainer}
        >
          <Image source={CONTACT_ICON} style={styles.leftIcon} />
          <Text style={styles.wishList}>Contact Us</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("HelpCenter")}
          style={styles.rowItemContainer}
        >
          <Image source={HELP_ICON} style={styles.leftIcon} />
          <Text style={styles.wishList}>Help Center</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Interactivefaqs")}
          style={styles.rowItemContainer}
        >
          <Image source={FAQ_ICON} style={styles.leftIcon} />
          <Text style={styles.wishList}>FAQs</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity style={styles.rowItemContainer}>
          <Image
            source={NotificationProfileIcon}
            style={styles.notificationIcon}
          />
          <Text style={styles.wishList}>Notifications</Text>
          <TouchableOpacity
            onPress={() =>
              this.state.userData
                ? this.toggleSwitch()
                : this.setState({ showGuestModal: true })
            }
          >
            <Image
              source={
                this.state.isNotificationOn
                  ? NotificationOnIcon
                  : NotificationOffIcon
              }
              style={styles.notifIcon}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          onPress={() =>
            this.state.userData
              ? this.setState({ showLogoutModal: true })
              : this.onPressLoginButton()
          }
          style={styles.rowItemContainer}
        >
          <Image source={logoutIcon} style={styles.logoutIcon} />
          <Text style={styles.wishList}>
            {this.state.userData ? "Logout" : "Log In"}
          </Text>
        </TouchableOpacity>
      </View>
      // Customizable Area End
    );
  };

  renderImagePickerModal = () => {
    return (
      // Customizable Area Start
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showPickerModal}
        onRequestClose={() => {
          this.setState({ showPickerModal: false });
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.transparentBg} />
          <View style={styles.bottomView}>
            <TouchableOpacity
              onPress={() => this.setState({ showPickerModal: false })}
            >
              <Image source={crossIcon} style={styles.crossIcon} />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => this.onPressCamera()}
                style={styles.leftButton}
              >
                <Image source={cameraIcons} style={styles.cameraIcon} />
                <Text
                  style={styles.takePictureText}
                >{`TAKE PICTURE\nFROM CAMERA`}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onPressPickImage()}
                style={styles.rightButton}
              >
                <Image source={galleryIcon} style={styles.cameraIcon} />
                <Text
                  style={styles.takePictureText}
                >{`ADD FROM\nGALLERY`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      // Customizable Area End
    );
  };

  renderGuestModal = () => {
    return (
      // Customizable Area Start
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showGuestModal}
        onRequestClose={() => {
          this.setState({ showGuestModal: false });
        }}
      >
        <TouchableOpacity
        testID="modalguest"
          activeOpacity={1}
          onPress={() => { }}
          style={styles.modalContainer}
        >
          <View style={styles.popup}>
            <Text style={styles.deleteAddress}>
              Please Sign Up/Log In first
            </Text>
            <Text style={styles.areYouSure}>
              You need an account to perform this action.
            </Text>
            <View style={styles.bottomPopupView}>
              <TouchableOpacity
              testID="modalguestclose"
                style={{ flex: 1, alignItems: "center" }}
                onPress={() => this.setState({ showGuestModal: false })}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity
               testID="modalguestlogin"
                style={{ flex: 1, alignItems: "center" }}
                onPress={() =>
                  this.setState({ showGuestModal: false }, () =>
                    this.props.navigation.replace("Auth")
                  )
                }
              >
                <Text style={styles.yesDelete}>SIGN UP/LOG IN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      // Customizable Area End
    );
  };

  renderLogoutModal = () => {
    return (
      // Customizable Area Start
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showLogoutModal}
        onRequestClose={() => {
          this.setState({ showLogoutModal: false });
        }}
      >
        <TouchableOpacity
        testID="modalpress"
          activeOpacity={1}
          onPress={() => { }}
          style={styles.modalContainer}
        >
          <View style={styles.popup}>
            <Text style={styles.deleteAddress}>Logout</Text>
            <Text
              style={styles.areYouSure}
            >{`Are you sure you want to logout from ${themeJson.attributes.heading} App?`}</Text>
            <View style={styles.bottomPopupView}>
              <TouchableOpacity
              testID="modalclosepress"
                style={{ flex: 1, alignItems: "center" }}
                onPress={() => this.setState({ showLogoutModal: false })}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity
               testID="modallogoutpress"
                style={{ flex: 1, alignItems: "center" }}
                onPress={() => this.onPressLogout()}
              >
                <Text style={styles.yesDelete}>Logout</Text>
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
          headerTitle={"Profile"}
          headerRightIcons={[
            {
              src: CART_BLACK_ICON,
              onPress: () => {
                this.props.navigation.navigate("Shoppingcart");
              },
              cartHasProductFlag: this.state.cartHasProduct,
              cartquantity: this.state.cartcount,
              style: { resizeMode: "contain", marginLeft: Scale(30) },
            },
          ]}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{ elevation: 0 }}
        />
        <ScrollView>
          {!this.state.isFetching && this.renderHeaderView()}
          {!this.state.isFetching && this.renderListItems()}
          {!this.state.isFetching && this.renderListBottomView()}
          {!this.state.isFetching && this.renderLogoutModal()}
          {!this.state.isFetching && this.renderGuestModal()}
          {!this.state.isFetching && this.renderImagePickerModal()}
        </ScrollView>
        <ApplicationLoader isFetching={this.state.isFetching} />
        <CustomErrorModal
          showModal={this.state.showAlertModal}
          message={this.state.message}
          isShowError={this.state.isShowError}
          hideErrorModal={() => this.setState({ showAlertModal: false })}
        />
      </SafeAreaView>
      // Customizable Area Start
    );
  }
  // Customizable Area Start
  // Customizable Area End
}
