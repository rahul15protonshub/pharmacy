import { StyleSheet, Dimensions } from "react-native";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST, {
  FONTS,
} from "../../studio-store-ecommerce-theme/src/AppFonts";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");
import R from "../../studio-store-ecommerce-components/src/R";
const { width } = Dimensions.get("window");

// Customizable Area Start
// Customizable Area End

export default StyleSheet.create({
  // Customizable Area Start

  container: {
    flex: 1,
    backgroundColor: COLOR_CONST.white,
  },

  cartModalContainer: {
    flex: 1,
    backgroundColor: COLOR_CONST.modalTransparentBg,
    justifyContent: "flex-end",
  },

  cartContainer: {
    backgroundColor: COLOR_CONST.white,
  },

  selectRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
  },

  selectQuantityText: {
    fontSize: scale(14),
    marginLeft: scale(19),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
  },

  selectSubscription: {
    fontSize: scale(13),
    lineHeight: scale(19),
    marginLeft: scale(19),
    marginTop: verticalScale(24),
    fontFamily: FONTS.GTWalsheimProBold,
    color: COLOR_CONST.charcoalGrey,
  },

  selectSubscriptionPeriod: {
    fontSize: scale(13),
    lineHeight: scale(19),
    marginLeft: scale(19),
    marginTop: verticalScale(32),
    fontFamily: FONTS.GTWalsheimProBold,
    color: COLOR_CONST.charcoalGrey,
  },

  subscriptionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(15),
    marginLeft: scale(21),
  },

  packageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: scale(40),
  },

  radio: {
    width: scale(21),
    height: scale(21),
  },

  dailyText: {
    fontSize: scale(14),
    lineHeight: scale(19),
    marginLeft: scale(10),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
  },

  pickerContainer: {
    height: scale(40),
    marginHorizontal: scale(21),
    borderWidth: 0,
  },

  labelStyle: {
    fontSize: scale(14),
    lineHeight: scale(19),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProRegular,
  },

  totalPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(29),
    marginLeft: scale(19),
  },

  totalPrice: {
    fontSize: scale(15),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
  },

  priceValue: {
    fontSize: scale(24),
    lineHeight: scale(28),
    letterSpacing: scale(0.92),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: themeJson.attributes.primary_color,
    marginLeft: scale(12),
  },

  cancelText: {
    fontSize: scale(15),
    lineHeight: scale(19),
    letterSpacing: scale(0.92),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.black,
    textAlign: "center",
    marginTop: scale(9),
    marginBottom: verticalScale(13.2),
  },

  tools1: {
    borderWidth: scale(1),
    borderColor: COLOR_CONST.borderduckEggBlue,
    backgroundColor: COLOR_CONST.white,
    marginRight: scale(26),
    flexDirection: "row",
    alignItems: "center",
    height: scale(30),
  },

  minus: {
    fontSize: scale(15),
    marginLeft: scale(8),
    marginRight: scale(15.4),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.5,
  },

  count: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
  },

  plus: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginLeft: scale(15.4),
    marginRight: scale(8),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.5,
  },

  emptyText: {
    fontSize: scale(12),
    lineHeight: scale(14),
    marginLeft: scale(21),
    marginTop: verticalScale(10),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.pastelRed,
  },

  cartButtonContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: verticalScale(21),
    marginBottom: verticalScale(7),
    marginHorizontal: scale(11),
  },

  cartButtonCustom: {
    width: scale(161),
    height: scale(44),
    borderRadius: scale(21),
    backgroundColor: themeJson.attributes.primary_color,
    opacity: 0.99,
    alignItems: "center",
    justifyContent: "center",
  },

  AddcustomTxtStyle: {
    color: COLOR_CONST.white,
    alignSelf: "center",
    fontFamily: FONTS.GTWalsheimProBold,
    fontSize: scale(14),
    lineHeight: scale(16),
    letterSpacing: 0.4,
  },

  BUYcustomTxtStyle: {
    color: COLOR_CONST.white,
    alignSelf: "center",
    fontFamily: FONTS.GTWalsheimProBold,
    fontSize: scale(14),
    lineHeight: scale(16),
    letterSpacing: 0.4,
  },

  // Customizable Area End
});
