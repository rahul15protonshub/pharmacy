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
    marginBottom: scale(16),
  },

  headerLeftIcon: {
    resizeMode: "contain",
    width: scale(12),
    height: verticalScale(20),
  },

  headerTitleView: {
    paddingLeft: "4%",
  },

  backButton: {
    paddingVertical: verticalScale(20),
    paddingRight: scale(25.6),
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

  myOrderDetailViewContainer: {},

  upperRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
  },

  leftItem: {
    marginLeft: scale(11),
  },

  rightItem: {
    alignItems: "flex-end",
    marginRight: scale(11),
  },

  orderNoText: {
    fontSize: scale(13),
    opacity: 0.89,
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    lineHeight: scale(19),
  },

  orderValue: {
    fontSize: scale(13),
    opacity: 0.89,
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    lineHeight: scale(19),
  },

  rowContainer: {
    backgroundColor: COLOR_CONST.white,
    borderRadius: scale(4),
    width: scale(353),
    alignSelf: "center",
    marginTop: verticalScale(8),
    paddingBottom: verticalScale(12),
  },

  row: {
    flexDirection: "row",
    paddingTop: verticalScale(16),
  },

  productImage: {
    width: scale(65),
    height: scale(65),
    marginLeft: scale(9),
  },

  middleInfo: {
    marginLeft: scale(11),
  },

  productRow: {
    flexDirection: "row",
   
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

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: scale(11),
  },

  productName: {
    fontSize: scale(17),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    width: scale(170),
  },

  orderText: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.4,
    marginTop: verticalScale(6),
  },

  date: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.89,
    marginTop: verticalScale(6),
    marginLeft: scale(4),
  },

  priceValue: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: themeJson.attributes.primary_colorTwo,
    opacity: 0.9,
    marginTop: verticalScale(7),
  },

  rightInfo: {
    marginLeft: scale(20),
  },

  quantity: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.4,
  },

  renderOrderStatusView: {
    marginTop: verticalScale(20),
  },
  orderStatusContent: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: scale(4),
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(10),
    marginHorizontal: scale(10),
    marginTop: verticalScale(10),
  },

  orderStatus: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    marginLeft: scale(11),
    opacity: 0.89,
  },

  statusView: {
    flexDirection: "row",
    alignSelf: "center",
    width: scale(353),
    borderRadius: scale(4),
    backgroundColor: COLOR_CONST.white,
  },

  addressView: {
    alignSelf: "center",
    marginTop: verticalScale(8),
    width: scale(353),
    borderRadius: scale(4),
    backgroundColor: COLOR_CONST.white,
  },

  placed: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.89,
  },

  dateText: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    marginLeft: scale(9),
    opacity: 0.89,
  },

  orderPlaced: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    marginTop: verticalScale(7),
    opacity: 0.89,
  },

  tickView: {
    marginLeft: scale(13),
    alignItems: "center",
  },

  tickIcon: {
    width: scale(16),
    height: scale(16),
  },
  tickContent: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: scale(8),
    borderColor: themeJson.attributes.primary_color,
  },
  ticketArea: {
    height: scale(8),
    width: scale(8),
    borderRadius: scale(4),
    backgroundColor: themeJson.attributes.primary_color,
  },
  ticketRightArea: {
    width: scale(1),
    flex: 1,
    backgroundColor: COLOR_CONST.lightGreyText,
  },
  ticketRightContent: {
    flexDirection: "row",
  },

  verticalLine: {
    height: scale(55),
    width: scale(1),
    opacity: 0.5,
    backgroundColor: themeJson.attributes.primary_color,
    marginBottom: verticalScale(12.7),
  },

  home: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    marginTop: verticalScale(16),
    marginLeft: scale(25),
    opacity: 0.9,
  },

  address: {
    width: scale(239),
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    marginTop: verticalScale(5),
    marginLeft: scale(25),
    opacity: 0.8,
  },

  phoneNo: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: themeJson.attributes.primary_color,
    marginTop: verticalScale(12),
    marginLeft: scale(25),
    marginBottom: verticalScale(14),
  },

  line: {
    width: scale(333),
    height: scale(1),
    alignSelf: "center",
    backgroundColor: COLOR_CONST.lightGreyText,
    marginTop: verticalScale(20.3),
    marginBottom: verticalScale(12.3),
    opacity: 0.5,
  },

  bottomPopupView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  verticalLine1: {
    width: scale(1),
    height: scale(25),
    backgroundColor: COLOR_CONST.lightGreyText,
  },

  btnBottomPopup: {
    flex: 1,
    alignItems: "center",
  },

  cancelText: {
    fontSize: scale(13),
    lineHeight: scale(19),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: "center",
  },

  yesDelete: {
    fontSize: scale(13),
    lineHeight: scale(19),
    opacity: 0.8,
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: "center",
    color: COLOR_CONST.charcoalGrey,
  },

  placedRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  greenDot: {
    marginTop:scale(2.5),
    width: scale(7),
    height: scale(7),
    borderRadius: scale(3.5),
    backgroundColor: COLOR_CONST.greenyBlue,
  },

  placedText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: themeJson.attributes.primary_color,
    opacity: 0.9,
    marginLeft: scale(11),
  },

  subscriptionPriceValue: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.9,
    marginTop: verticalScale(7),
    marginLeft: scale(11),
  },

  trackingID: {
    fontSize: scale(12),
    lineHeight: scale(14),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: themeJson.attributes.primary_color,
    textDecorationLine: "underline",
    marginTop: verticalScale(6.2),
    opacity: 0.9,
    marginLeft: scale(11),
  },
  modalContentContainer: {
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

  bottomPopupView1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: verticalScale(30),
    paddingTop: verticalScale(7.5),
    marginBottom: verticalScale(12.4),
    borderTopWidth: scale(0.5),
    borderTopColor: COLOR_CONST.lightGreyText,
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

  reviewPopup: {
    width: scale(286),
    borderRadius: scale(8),
    backgroundColor: COLOR_CONST.white,
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

  emptyText: {
    fontSize: scale(12),
    lineHeight: scale(14),
    marginBottom: verticalScale(15.8),
    fontFamily: FONTS.GTWalsheimProMedium,
    textAlign: "center",
    color: COLOR_CONST.pastelRed,
  },

  statusHeading: {
    fontSize: scale(14),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    marginEnd: scale(6),
  },

  statusText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
  },

  rowContent: {
    width: scale(305),
    flexDirection: "row",
    justifyContent: "space-between",
  },

  productImageRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  orderProduct: {
    flexDirection: "row",
    paddingTop: scale(10),
    justifyContent: "space-between",
  },

  orderImage: {
    width: scale(32),
    height: scale(32),
  },

  orderProductName: {
    fontSize: scale(17),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    width: scale(180),
    marginStart: scale(13),
  },

  orderQty: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.4,
  },

  package: {
    fontSize: scale(10),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: themeJson.attributes.primary_color,
    marginLeft: scale(45),
    marginTop: scale(5),
  },

  package1: {
    fontSize: scale(10),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: themeJson.attributes.primary_color,
    marginLeft: scale(13),
    marginTop: scale(5),
  },

  period: {
    fontSize: scale(10),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: themeJson.attributes.primary_color,
    marginTop: scale(5),
  },

  orderStatusVerticalLine: {
    width: 1,
    height: scale(70),
    backgroundColor: COLOR_CONST.lightGreyText,
  },

  statusBottom: {
    flexDirection: "row",
    marginTop: scale(8),
    justifyContent: "space-between",
    marginBottom: scale(16),
  },

  orderCancel: {
    fontSize: scale(12),
    lineHeight: scale(19),
    color: COLOR_CONST.pastelRed,
    fontFamily: FONTS.GTWalsheimProRegular,
    textDecorationLine: "underline",
  },

  statusRow: {
    flexDirection: "row",
  },

  deliveredIcon: {
    height: scale(14),
    width: scale(20),
  },

  pendingIcon: {
    height: scale(15),
    width: scale(16),
  },

  viewAll: {
    fontSize: scale(14),
    lineHeight: scale(19),
    color: COLOR_CONST.pastelRed,
    fontFamily: FONTS.GTWalsheimProMedium,
    textDecorationLine: "underline",
    alignSelf: "flex-end",
    marginTop: scale(5),
    marginEnd: scale(16),
  },

  orderRightInfo: {
    marginLeft: scale(9),
    marginTop: verticalScale(18),
  },

  OrderTickView: {
    marginTop: verticalScale(17.8),
    marginLeft: scale(13),
    alignItems: "center",
  },
  // Customizable Area End
});
