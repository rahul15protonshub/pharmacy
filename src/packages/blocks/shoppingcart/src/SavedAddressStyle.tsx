import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST, {
  FONTS,
} from "../../studio-store-ecommerce-theme/src/AppFonts";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");
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

  emptyView: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },

  upperEmptyContainer: {
    flex: 1,
    justifyContent: "center",
  },

  emptyBuilding: {
    width: scale(101.5),
    height: scale(133),
    marginTop: verticalScale(77),
    alignSelf: "center",
  },

  noAddressSaved: {
    fontSize: scale(17),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    lineHeight: scale(19),
    marginTop: verticalScale(52),
    textAlign: "center",
  },

  noAddressDetail: {
    fontSize: scale(15),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    lineHeight: scale(18),
    opacity: 0.5,
    width: scale(233),
    marginTop: verticalScale(8),
    textAlign: "center",
  },

  loginButton: {
    width: scale(335),
    height: scale(44),
    borderRadius: scale(5),
    marginVertical: verticalScale(15.1),
    alignSelf: "center",
  },

  loginText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProBold,
  },

  listContainer: {
    flex: 1,
  },

  cellContainer: {
    backgroundColor: COLOR_CONST.white,
    marginBottom: verticalScale(14),
  },

  upperContainer: {
    flexDirection: "row",
    marginTop: verticalScale(19),
    marginLeft: scale(18),
  },

  locationPin: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    backgroundColor: COLOR_CONST.charcoalGrey,
  },

  locationIcon: {
    width: scale(12.7),
    height: scale(17.9),
  },

  addressName: {
    fontSize: scale(15),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    lineHeight: scale(18),
    marginTop: verticalScale(2),
    opacity: 0.9,
    marginLeft: verticalScale(15),
  },

  addressText: {
    fontSize: scale(15),
    width: scale(233),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    lineHeight: scale(18),
    marginTop: verticalScale(5),
    opacity: 0.8,
    marginLeft: verticalScale(15),
  },

  horizontalLine: {
    width: scale(338),
    height: scale(1),
    backgroundColor: COLOR_CONST.charcoalGrey,
    alignSelf: "center",
    marginTop: verticalScale(16),
  },

  bottomView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(8),
  },

  verticalLine: {
    width: scale(1),
    height: scale(30),
    backgroundColor: COLOR_CONST.charcoalGrey,
    alignSelf: "center",
  },

  edit: {
    fontSize: scale(15),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: themeJson.attributes.primary_color,
    marginLeft: verticalScale(81),
  },

  delete: {
    fontSize: scale(15),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.pastelRed,
    marginRight: verticalScale(81),
  },

  addNewAddress: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    backgroundColor: COLOR_CONST.white,
    marginHorizontal: scale(10),
    paddingVertical: verticalScale(20),
    opacity: 0.9,
    textAlign: "center",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: COLOR_CONST.modalTransparentBg,
    justifyContent: "center",
    alignItems: "center",
  },

  popup: {
    width: scale(286),
    borderRadius: scale(8),
    backgroundColor: COLOR_CONST.white,
  },

  deleteAddress: {
    fontSize: scale(18),
    lineHeight: scale(20),
    opacity: 0.8,
    marginTop: verticalScale(31),
    fontFamily: FONTS.GTWalsheimProMedium,
    textAlign: "center",
  },

  newDefaultAddress: {
    fontSize: scale(15),
    lineHeight: scale(18),
    color: COLOR_CONST.charcoalGrey,
    marginTop: verticalScale(21),
    fontFamily: FONTS.GTWalsheimProMedium,
    textAlign: "center",
  },

  defaultAddress: {
    fontSize: scale(15),
    lineHeight: scale(18),
    color: COLOR_CONST.charcoalGrey,
    marginTop: verticalScale(5),
    fontFamily: FONTS.GTWalsheimProMedium,
    textAlign: "center",
  },

  areYouSure: {
    fontSize: scale(15),
    lineHeight: scale(18),
    opacity: 0.8,
    marginTop: verticalScale(23),
    width: scale(221),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: "center",
    alignSelf: "center",
  },

  bottomPopupView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(30),
    paddingTop: verticalScale(7.5),
    marginBottom: verticalScale(12.4),
    borderTopWidth: scale(0.5),
    borderTopColor: COLOR_CONST.lightGreyText,
  },

  bottomPopupView1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(18),
    paddingTop: verticalScale(7.5),
    marginBottom: verticalScale(12.4),
    borderTopWidth: scale(0.5),
    borderTopColor: COLOR_CONST.lightGreyText,
  },

  cancelText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    color: COLOR_CONST.charcoalGrey,
    marginLeft: scale(47.5),
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: "center",
  },

  yesDelete: {
    fontSize: scale(15),
    lineHeight: scale(18),
    opacity: 0.8,
    marginRight: scale(47.5),
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: "center",
  },

  tickStatus: {
    position: "absolute",
    top: scale(20),
    right: scale(20),
  },

  tickAddress: {
    width: scale(22),
    height: scale(22),
  },
  // Customizable Area End
});
