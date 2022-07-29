import { StyleSheet, Platform } from "react-native";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

// Customizable Area Start
// Customizable Area End

export default StyleSheet.create({
  // Customizable Area Start
  containerMobile: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#F7F8FA",
  },
  containerWeb: {
    padding: 16,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650,
  },
  submitButton: {
    width: 312,
    height: 44,
    marginTop: 29,
    marginBottom: 26,
    backgroundColor: themeJson.attributes.common_button_color,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(5),
  },
  submitText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 1,
    opacity: 0.9,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: themeJson.attributes.primary_color,
  },

  brandName: {
    fontSize: scale(21),
    lineHeight: scale(24),
    marginTop: verticalScale(40),
    width: scale(323),
    height: scale(24),
    marginLeft: scale(20),
    color: COLOR_CONST.white,
    fontWeight: "bold",
  },
  brandLogo: {
    height: scale(60),
    width: scale(120),
    resizeMode: "contain",
    marginTop: scale(30),
  },
  getStartedText: {
    fontSize: scale(12),
    lineHeight: scale(14),
    marginTop: verticalScale(12),
    width: scale(323),
    height: scale(44),
    marginLeft: scale(20),
    color: COLOR_CONST.white,
  },

  homeoIcon: {
    width: scale(137.6),
    height: scale(50.9),
    marginTop: verticalScale(15.8),
    marginLeft: scale(26.9),
  },

  forgotPasswordContainer: {
    width: scale(274),
    height: scale(38),
    zIndex: 8888,
    borderRadius: scale(18),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    top: Platform.OS === "ios" ? verticalScale(131) : verticalScale(132),
    shadowColor: COLOR_CONST.black,
    shadowOffset: { width: 4, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 0.1,
    elevation: 2,
  },

  forgotTextHeader: {
    fontSize: scale(16),
    lineHeight: scale(16),
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.9,
    alignSelf: "center",
    textAlign: "center",
  },

  resetText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginTop: verticalScale(46),
    color: themeJson.attributes.primary_color,
    width: scale(274),
    alignSelf: "center",
    textAlign: "center",
  },

  enterYourText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginTop: verticalScale(46),
    color: COLOR_CONST.charcoalGrey,
    width: scale(274),
    alignSelf: "center",
    textAlign: "center",
  },

  box1: {
    flex: 1,
    marginTop: verticalScale(45),
    backgroundColor: "#eaf0fb",
  },

  segmentButtonHolder: {
    width: scale(274),
    height: scale(38),
    borderRadius: scale(20),
    shadowColor: COLOR_CONST.black,
    shadowOffset: { width: 4, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },

  tabStyle: {
    backgroundColor: "#ffffff",
    borderColor: "#fff",
    borderRadius: scale(20),
    width: scale(145),
    height: scale(38),
  },

  activeTabStyle: {
    backgroundColor: themeJson.attributes.primary_color,
    borderColor: themeJson.attributes.primary_color,
    borderRadius: scale(20),
  },

  activetabTextStyle: {
    fontSize: scale(15),
    color: "#ffffff",
  },
  imgPasswordShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
  innerTopContainer: {
    marginTop: verticalScale(58),
    backgroundColor: "#fff",
    borderTopRightRadius: scale(10),
    borderTopLeftRadius: scale(10),
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    shadowColor: COLOR_CONST.black,
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    zIndex: 1000,
  },

  fieldContainer: {
    marginTop: scale(50),
    alignItems: "center",
  },
  newPasswordInput: {
    width: scale(256),
    height: scale(40),
    fontSize: scale(15),
    color: themeJson.attributes.primary_color,
    lineHeight: scale(18),
    marginLeft: scale(18.3),
  },
  input: {
    width: scale(256),
    height: scale(40),
    fontSize: scale(15),
    color: themeJson.attributes.primary_color,
    lineHeight: scale(18),
  },

  input1: {
    width: scale(222.8),
    height: scale(40),
    fontSize: scale(15),
    color: themeJson.attributes.primary_color,
    lineHeight: scale(18),
    marginLeft: scale(18.3),
  },

  loginButton: {
    width: scale(312),
    height: scale(44),
    marginTop: verticalScale(29),
    marginBottom: verticalScale(57),
    backgroundColor: themeJson.attributes.primary_color,
  },

  loginText: {
    fontSize: scale(14),
    lineHeight: scale(16),
    letterSpacing: scale(0.4),
    opacity: 0.9,
  },

  forgotText: {
    fontSize: scale(13),
    lineHeight: scale(15),
    textAlign: "center",
    marginTop: verticalScale(24),
    marginBottom: verticalScale(21),
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.7,
  },

  continueText: {
    fontSize: scale(11),
    lineHeight: scale(13),
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.59,
    textAlign: "center",
    marginTop: verticalScale(21),
  },

  signUpVia: {
    fontSize: scale(11),
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.59,
    textAlign: "center",
  },

  topContainer: {
    flex: 1,
    backgroundColor: themeJson.attributes.primary_color,
  },

  bottomContainer: {
    marginTop: -2,
    backgroundColor: COLOR_CONST.charcoalGrey,
  },

  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    width: scale(110),
    height: scale(37.8),
    borderRadius: scale(19.8),
    backgroundColor: themeJson.attributes.primary_color,
  },

  socialButtonContainer: {
    marginTop: verticalScale(13.8),
    marginHorizontal: scale(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  fStyle: {
    width: scale(5.7),
    height: scale(13.1),
    marginLeft: scale(14),
    marginRight: verticalScale(12),
  },

  gStyle: {
    width: scale(15.7),
    height: scale(10.1),
    marginLeft: scale(14),
    marginRight: scale(8.2),
  },

  aStyle: {
    width: scale(13.5),
    height: scale(16.5),
    marginLeft: scale(26),
    marginRight: scale(16.5),
  },

  fbText: {
    fontSize: scale(14.4),
    lineHeight: scale(17),
    color: COLOR_CONST.white,
  },

  skipText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginTop: verticalScale(33),
    color: COLOR_CONST.charcoalGrey,
    textAlign: "center",
    marginBottom: verticalScale(61),
  },

  errorSectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.8,
    borderColor: COLOR_CONST.pastelRed,
    width: scale(312),
    height: scale(40),
    borderRadius: scale(20),
  },

  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.8,
    borderColor: COLOR_CONST.whiteThree,
    width: scale(312),
    height: scale(40),
    borderRadius: scale(5),
  },

  SectionStyle1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.8,
    borderColor: themeJson.attributes.primary_color,
    width: scale(312),
    height: scale(40),
    borderRadius: scale(5),
  },
  newSectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.8,
    borderColor: COLOR_CONST.white,
    width: scale(312),
    height: scale(40),
    borderRadius: scale(20),
  },

  ImageStyleEmail: {
    width: scale(22.7),
    height: scale(14.3),
    marginLeft: scale(15),
    resizeMode: "stretch",
    alignItems: "center",
  },

  ImageStylekey: {
    width: scale(23.9),
    height: scale(11.7),
    marginLeft: scale(15),
    resizeMode: "stretch",
    alignItems: "center",
  },

  eye: {
    marginRight: scale(16.8),
  },

  ImageStyleEye: {
    width: scale(16.5),
    height: scale(11.3),
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },

  bottomView: {
    alignSelf: "flex-end",
    width: scale(375),
    height: scale(70),
    backgroundColor: COLOR_CONST.white,
    shadowColor: COLOR_CONST.black,
    shadowOffset: { width: 4, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    justifyContent: "center",
  },

  alertText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    color: COLOR_CONST.pastelRed,
    width: scale(295),
    marginLeft: scale(20),
  },
  alertSuccessText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    color: themeJson.attributes.primary_color,
    width: scale(295),
    marginLeft: scale(20),
  },

  crossIcon: {
    width: scale(14.6),
    height: scale(14.6),
    position: "absolute",
    bottom: verticalScale(17.6),
    right: scale(17.4),
  },

  counterContainer: {
    marginBottom: verticalScale(15),
  },

  digitContainer: {
    width: scale(25),
  },

  digitStyle: {
    fontSize: scale(20),
    lineHeight: scale(23),
    color: COLOR_CONST.pastelRed,
  },

  resendText: {
    fontSize: scale(20),
    lineHeight: scale(23),
    color: COLOR_CONST.pastelRed,
    textDecorationLine: "underline",
    marginBottom: verticalScale(15),
  },
  // Customizable Area End
});
