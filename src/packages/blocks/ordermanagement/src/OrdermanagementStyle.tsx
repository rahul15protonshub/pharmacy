import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST, {
  FONTS,
} from "../../studio-store-ecommerce-theme/src/AppFonts";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_CONST.white,
  },

  backButton: {
    paddingVertical: verticalScale(20),
    paddingRight: scale(25.6),
  },

  headerLeftIcon: {
    resizeMode: "contain",
    width: scale(12),
    height: verticalScale(20),
  },

  headerTitleView: {
    paddingLeft: "4%",
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

  cartIcon: {
    width: scale(20.2),
    height: scale(17.9),
    marginRight: scale(25.6),
  },

  emtpyAddressContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },

  iconContainer: {
    flex: 1,
    justifyContent: "center",
  },

  emptyAddressIcon: {
    width: scale(124.1),
    height: scale(155.8),
    alignSelf: "center",
  },

  noAnyOrder: {
    fontSize: scale(17),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    lineHeight: scale(19),
    marginTop: verticalScale(34),
    opacity: 0.9,
    alignSelf: "center",
  },

  youhave: {
    fontSize: scale(15),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    width: scale(233),
    lineHeight: scale(18),
    textAlign: "center",
    marginTop: verticalScale(8),
    opacity: 0.5,
  },

  loginButton: {
    alignSelf: "center",
    width: scale(335),
    height: scale(42),
    borderRadius: scale(20),
    opacity: 0.99,
    marginBottom: verticalScale(30.2),
  },

  loginText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.white,
  },

  listContainer: {
    flex: 1,
  },

  cellContainer: {},

  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(19),
    marginBottom: verticalScale(8.2),
  },

  orderNumber: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    marginLeft: scale(11),
  },

  totalAmountContainer: {
    backgroundColor: COLOR_CONST.white,
  },

  totalAmountText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.9,
    marginTop: verticalScale(7),
    marginLeft: scale(100),
  },

  writeReview: {
    fontSize: scale(14),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    marginRight: scale(11),
    marginTop: verticalScale(10),
    alignSelf: "flex-end",
  },

  rowContainer: {
    backgroundColor: COLOR_CONST.white,
    borderRadius: scale(4),
    width: scale(353),
    alignSelf: "center",
  },

  insideContainer: {},

  row: {
    flexDirection: "row",
  },

  productImage: {
    width: scale(65),
    height: scale(65),
    marginLeft: scale(9),
    marginTop: verticalScale(16),
  },

  middleInfo: {
    marginLeft: scale(11),
    marginTop: verticalScale(15),
    width: scale(180),
  },

  productName: {
    fontSize: scale(17),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    width: scale(170),
    marginLeft: scale(11),
  },

  changeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: scale(11),
    width: scale(180),
  },

  periodText: {
    fontSize: scale(10),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: themeJson.attributes.primary_color,
  },

  dateRow: {
    flexDirection: "row",
  },

  orderText: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.4,
    marginTop: verticalScale(6),
    marginLeft: scale(11),
  },

  date: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.89,
    marginTop: verticalScale(6),
    marginLeft: scale(4),
  },

  statusRow: {
    width: scale(250),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  priceValue: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.9,
    marginTop: verticalScale(7),
    marginLeft: scale(11),
  },

  subscriptionPriceValue: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.9,
    marginTop: verticalScale(7),
    marginLeft: scale(100),
  },

  excludingGST: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProBold,
    color: themeJson.attributes.primary_color,
    opacity: 0.9,
    marginLeft: scale(10),
  },

  rightInfo: {
    alignItems: "flex-end",
    marginTop: verticalScale(14.8),
  },

  quantity: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.4,
  },

  placedRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  greenDot: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(3.5),
    backgroundColor: COLOR_CONST.greenyBlue,
  },

  placedText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.9,
    marginLeft: scale(11),
  },

  horizontalLinse: {
    width: scale(338),
    height: scale(1),
    backgroundColor: COLOR_CONST.charcoalGrey,
    marginTop: verticalScale(18),
    opacity: 0.5,
    alignSelf: "center",
  },

  line: {
    width: scale(333),
    height: scale(1),
    alignSelf: "center",
    backgroundColor: COLOR_CONST.lightGreyText,
    marginTop: verticalScale(16.2),
    opacity: 0.5,
  },

  cancelContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: verticalScale(11.5),
    paddingBottom: verticalScale(17),
    backgroundColor: COLOR_CONST.white,
  },

  cancelOrder: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
  },

  modalContainerContent: {
    flex: 1,
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

  reviewPopup: {
    width: scale(286),
    borderRadius: scale(8),
    backgroundColor: COLOR_CONST.white,
  },

  emptyText: {
    fontSize: scale(12),
    lineHeight: scale(14),
    marginBottom: verticalScale(15.8),
    fontFamily: FONTS.GTWalsheimProMedium,
    textAlign: "center",
    color: COLOR_CONST.pastelRed,
  },

  deleteAddress: {
    fontSize: scale(18),
    lineHeight: scale(20),
    marginTop: verticalScale(31),
    fontFamily: FONTS.GTWalsheimProMedium,
    textAlign: "center",
    color: COLOR_CONST.charcoalGrey,
  },

  areYouSure: {
    fontSize: scale(15),
    lineHeight: scale(18),
    opacity: 0.8,
    marginTop: verticalScale(23),
    color: COLOR_CONST.charcoalGrey,
    width: scale(221),
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: "center",
    alignSelf: "center",
  },

  bottomPopupView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: verticalScale(30),
    paddingTop: verticalScale(7.5),
    marginBottom: verticalScale(12.4),
    borderTopWidth: scale(0.5),
    borderTopColor: COLOR_CONST.lightGreyText,
  },

  bottomPopupViewReview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: verticalScale(7.5),
    marginBottom: verticalScale(12.4),
    borderTopWidth: scale(0.5),
    borderTopColor: COLOR_CONST.lightGreyText,
  },

  btnBottomPopup: {
    flex: 1,
    alignItems: "center",
  },

  verticalLine: {
    width: scale(0.5),
    height: scale(25),
    backgroundColor: COLOR_CONST.lightGreyText,
  },

  cancelText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: "center",
  },

  yesDelete: {
    fontSize: scale(15),
    lineHeight: scale(18),
    opacity: 0.8,
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: "center",
    color: COLOR_CONST.charcoalGrey,
  },

  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(12.2),
    marginBottom: verticalScale(15.2),
    marginHorizontal: scale(63.4),
  },

  star: {
    width: scale(23.9),
    height: scale(22.8),
  },

  ratingInput: {
    fontSize: scale(12),
    lineHeight: scale(14),
    color: COLOR_CONST.charcoalGrey,
    width: scale(256),
    height: scale(90),
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: COLOR_CONST.lightGreyText,
    marginBottom: verticalScale(15.8),
    alignSelf: "center",
    paddingTop: verticalScale(12.8),
    paddingHorizontal: scale(12),
  },

  labelSticker: {
    height: scale(22.2),
    borderTopLeftRadius: scale(50),
    borderBottomLeftRadius: scale(50),
    backgroundColor: COLOR_CONST.pastelRed,
    top: scale(5),
    right: 0,
    justifyContent: "center",
    alignSelf: "flex-end",
  },

  stickerText: {
    fontSize: scale(8),
    lineHeight: scale(9),
    letterSpacing: 0.3,
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.white,
    marginLeft: scale(12.1),
    marginRight: scale(5),
  },

  package: {
    fontSize: scale(10),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: themeJson.attributes.primary_color,
    marginStart: scale(13),
    marginTop: scale(5),
  },

  period: {
    fontSize: scale(10),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: themeJson.attributes.primary_color,
    marginTop: scale(5),
  },
  // Customizable Area Start
  // Customizable Area End
});
