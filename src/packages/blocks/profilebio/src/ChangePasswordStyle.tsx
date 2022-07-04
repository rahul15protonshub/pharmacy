import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import { FONTS } from "../../studio-store-ecommerce-theme/src/AppFonts";

// Customizable Area Start
// Customizable Area End

export default StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1,
    backgroundColor: COLOR_CONST.white,
  },

  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLOR_CONST.white,
  },

  passwordChangedContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLOR_CONST.white,
  },

  backButton: {
    paddingVertical: verticalScale(20),
    paddingRight: scale(20),
  },

  headerTitleStyle: {
    fontSize: scale(15),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    lineHeight: scale(18),
  },

  backIcon: {
    width: scale(11.9),
    height: scale(21.7),
    marginLeft: scale(18),
  },

  formContainer: {
    flex: 1,
    backgroundColor: COLOR_CONST.white,
    paddingHorizontal: scale(25),
    paddingTop: verticalScale(31),
  },

  loginButton: {
    alignSelf: "center",
    width: scale(335),
    height: scale(44),
    borderRadius: scale(2210),
    opacity: 0.99,
    marginBottom: verticalScale(30.2),
  },

  loginText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProBold,
  },

  enterPasswordHeader: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginTop: verticalScale(30),
    alignSelf: "center",
    width: scale(233),
    textAlign: "center",
    opacity: 0.8,
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProRegular,
  },

  passwordMismatch: {
    fontSize: scale(15),
    lineHeight: scale(18),
    width: scale(233),
    alignSelf: "center",
    marginTop: verticalScale(14),
    textAlign: "center",
    color: COLOR_CONST.pastelRed,
    fontFamily: FONTS.GTWalsheimProRegular,
  },

  lockIcon: {
    width: scale(77.9),
    height: scale(121.7),
    alignSelf: "center",
    marginTop: verticalScale(66),
  },

  passwordChanged: {
    fontSize: scale(17),
    lineHeight: scale(19),
    alignSelf: "center",
    marginTop: verticalScale(37.3),
    textAlign: "center",
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProMedium,
  },

  youCan: {
    fontSize: scale(15),
    lineHeight: scale(18),
    width: scale(233),
    alignSelf: "center",
    opacity: 0.5,
    marginTop: verticalScale(8),
    textAlign: "center",
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProRegular,
  },

  hideIcon: {
    width: scale(25),
    height: scale(25),
    marginTop: verticalScale(18),
    position: "absolute",
    right: 0,
  },
  // Customizable Area End
});
