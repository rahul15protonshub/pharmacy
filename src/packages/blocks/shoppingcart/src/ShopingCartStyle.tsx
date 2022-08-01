import { StyleSheet, Dimensions } from "react-native";
import Scale from "../../../framework/src/utils/Scale";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST, {
  FONTS,
} from "../../studio-store-ecommerce-theme/src/AppFonts";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");
const mobH = Dimensions.get('window').height;
const mobW = Dimensions.get('window').width;
// Customizable Area Start
// Customizable Area End

export default StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1,
    backgroundColor: COLOR_CONST.white,
    alignItems: "center",
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
    marginLeft: mobW * 0.05,
  },

  notifIcon: {
    width: scale(16.7),
    height: scale(19),
    marginRight: scale(20.3),
  },

  cartIcon: {
    width: scale(22),
    height: scale(17.9),
    marginRight: scale(25.6),
  },

  emtpyAddressContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },

  cartempty: {
    flex: 1,
    justifyContent: "center",
  },

  emptyAddressIcon: {
    width: scale(145.1),
    height: scale(165),
    alignSelf: "center",
  },

  noAnyOrder: {
    fontSize: scale(17),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    lineHeight: scale(19),
    marginTop: verticalScale(24.6),
    opacity: 0.9,
    textAlign: "center",
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

  listContainer: {
    // marginTop: verticalScale(9.8),
  },

  orderNumber: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    marginLeft: scale(11),
    opacity: 0.89,
  },

  rowContainer: {
    backgroundColor: COLOR_CONST.white,
    borderRadius: scale(4),
    width: mobW * 0.9,
    alignSelf: "center",
    marginBottom: verticalScale(11),
  },

  row: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: 'space-between',
    paddingBottom: verticalScale(18),
    marginTop: verticalScale(22),
  },

  productImage: {
    width: scale(158),
    height: scale(155),
  },

  middleInfo: {
    marginTop: verticalScale(15),
  },

  prodName: {
    fontSize: scale(17),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.black,
    marginLeft: scale(11),
    width: scale(250),
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  orderText: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    marginTop: verticalScale(2),
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

  priceValue: {
    width: scale(100),
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: themeJson.attributes.primary_color,
    opacity: 0.9,
  },
  productleftContainer: {
    width: Scale(177),
    // height: 70,
    paddingLeft: Scale(20),
    marginTop: scale(4),
  },
  productleftContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(20)
  },
  productleftText: {
    fontSize: scale(18),
    color: COLOR_CONST.black,
    fontFamily: FONTS.GTWalsheimProMedium,
  },
  productleftLabel: {
    fontSize: Scale(14),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.lightgraycolor
  },
  productleftValue: {
    fontSize: Scale(14),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.black,
    marginTop: 5
  },
  productleftamount: {
    fontSize: scale(18),
    color: COLOR_CONST.black,
    fontFamily: FONTS.GTWalsheimProMedium,
    marginTop: 5
  },
  rightInfo: {
    alignItems: "flex-end",
    marginTop: verticalScale(12),
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
    marginTop: verticalScale(32),
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
    backgroundColor: COLOR_CONST.lightGreyText,
    marginTop: verticalScale(18),
    opacity: 0.5,
    alignSelf: "center",
  },

  writeReview: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.7,
    textAlign: "center",
    marginTop: scale(15),
    marginBottom: scale(11),
  },

  toolRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(10),
    marginLeft: scale(11),
  },

  tools: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'flex-end',
    height: scale(34),
    width: scale(120),
    borderRadius: 5,
    marginTop: verticalScale(16),
    alignSelf: 'flex-end',
  },

  minusContainer: {
    width: Scale(28),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: COLOR_CONST.newlightcolor,
    height: Scale(28)
  },
  minus: {
    fontSize: scale(18),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 1,
  },

  count: {
    fontSize: scale(15),
    lineHeight: scale(18),
    width: scale(33),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    textAlign: 'center'
  },
  countContainer: {
    width: Scale(40), justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR_CONST.white, height: Scale(28), borderTopWidth: 1, borderBottomWidth: 1, borderColor: COLOR_CONST.newlightcolor
  },

  plusContainer: {
    width: Scale(28), justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 5, borderBottomRightRadius: 5, backgroundColor: COLOR_CONST.newtheme, height: Scale(28)
  },
  plus: {
    fontSize: scale(18),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.white,
    opacity: 1,
  },

  bottomDetails: {
    backgroundColor: COLOR_CONST.white,
    marginBottom: verticalScale(2),
  },

  headerCart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
    // marginBottom: verticalScale(18),
  },

  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(8),
  },

  yourCart: {
    fontSize: scale(16),
    lineHeight: scale(19),
    marginLeft: mobW * 0.05,
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.lightgraycolor,
  },
  OrderSummery: {
    fontSize: scale(18),
    color: COLOR_CONST.black,
    fontFamily: FONTS.GTWalsheimProMedium,
    marginTop: verticalScale(3),
    marginLeft: mobW * 0.05,
  },

  amountText: {
    fontSize: scale(16),
    lineHeight: scale(19),
    marginRight: mobW * 0.05,
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.lightgraycolor,
  },

  productName: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginLeft: mobW * 0.05,
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.black,
    width: scale(250),
  },
  product_name: {
    fontSize: scale(14),
    width: mobW * 0.50,
    marginLeft: mobW * 0.05,
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.black,
  },
  product_middle_name: {
    fontSize: scale(14),
    width: mobW * 0.18,
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.black,
    textAlign: 'center',
    // marginLeft: scale(20),
  },

  price: {
    width: mobW * 0.22,
    fontSize: scale(14),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.black,
    textAlign: 'right',
    marginRight: mobW * 0.05,
  },

  tax: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
  },

  delivery: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(8),
    marginBottom: verticalScale(8),
  },
  devider: {
    height: 0.6,
    backgroundColor: COLOR_CONST.newlightcolor,
    marginHorizontal: scale(18),
    marginTop: verticalScale(24)
  },
  list_devider: {
    marginBottom: verticalScale(1)
  },
  coupon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(25),
  },

  total: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(24),
    marginBottom: verticalScale(24),
  },
  totaltxt: {
    fontSize: scale(18),
    color: COLOR_CONST.black,
    fontFamily: FONTS.GTWalsheimProMedium,
    // width: mobW * 0.45
  },

  couponText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginLeft: mobW * 0.05,
    fontFamily: FONTS.GTWalsheimProBold,
    color: COLOR_CONST.black,
  },

  changeCouponText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginTop: verticalScale(5),
    marginBottom: verticalScale(5),
    marginLeft: mobW * 0.05,
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.pastelRed,
  },

  couponPrice: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginRight: mobW * 0.05,
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.black,
  },

  loginButton: {
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: scale(339),
    backgroundColor: COLOR_CONST.dollarValue,
    height: scale(42),
    borderRadius: scale(5),
    opacity: 0.99,
    marginBottom: verticalScale(18),
    marginTop: verticalScale(8),
  },

  loginText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    opacity: 0.9,
    letterSpacing: scale(0.4),
    fontFamily: FONTS.GTWalsheimProBold,
    color: COLOR_CONST.white,
  },

  cancelText: {
    fontSize: scale(15),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    marginVertical: verticalScale(20),
  },
  discountTxt: {
    fontSize: Scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.black
  },
  rmTxt: {
    fontSize: Scale(12),
    fontFamily: FONTS.GTWalsheimProBold,
    color: COLOR_CONST.newtheme
  },
  discountRightTxt: {
    flexDirection: 'row', alignItems: 'center'
  },

  modalContainer: {
    flex: 1,
    backgroundColor: COLOR_CONST.modalTransparentBg,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  popup: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    backgroundColor: COLOR_CONST.white,
  },

  oopsText: {
    fontSize: scale(13),
    lineHeight: scale(19),
    color: COLOR_CONST.pastelRed,
    marginTop: verticalScale(10),
    textAlign: "center",
    fontFamily: FONTS.GTWalsheimProRegular,
  },

  validText: {
    fontSize: scale(13),
    lineHeight: scale(19),
    color: themeJson.attributes.primary_color,
    marginTop: verticalScale(10),
    textAlign: "center",
    fontFamily: FONTS.GTWalsheimProRegular,
  },

  couponTick: {
    width: scale(42),
    height: scale(42),
    marginTop: verticalScale(25),
    marginBottom: verticalScale(57),
  },

  enterCouponText: {
    fontSize: scale(15),
    lineHeight: scale(19),
    color: COLOR_CONST.charcoalGrey,
    marginTop: verticalScale(23),
    letterSpacing: scale(0.4),
    textAlign: "center",
    fontFamily: FONTS.GTWalsheimProMedium,
  },

  inputContainerCupan: {
    width: mobW * 0.90,
    height: verticalScale(48),
    borderWidth: scale(1),
    borderColor: "#DFE0E6",
    borderRadius: scale(3),
    alignSelf: 'center',
    marginTop: verticalScale(24),
    justifyContent: 'space-between',
    paddingHorizontal: scale(5),
    alignItems: 'center',
    flexDirection: 'row'
  },
  removeCupanContainer: {
    width: mobW * 0.90,
    height: verticalScale(48),
    paddingHorizontal: scale(1),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -10
  },
  input_cupan: {
    width: mobW * 0.64,
  },
  input_cupan_btn: {
    width: mobW * 0.18,
    backgroundColor: COLOR_CONST.newtheme,
    height: verticalScale(38),
    borderRadius: scale(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cupon_btn_txt: {
    fontSize: scale(14),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.black,
    textAlign: 'right',
  },
  couponInput: {
    width: scale(261),
    fontSize: scale(15),
    lineHeight: scale(18),
    color: COLOR_CONST.charcoalGrey,
    marginTop: verticalScale(41),
    fontFamily: FONTS.GTWalsheimProRegular,
    borderBottomWidth: scale(0.5),
    borderBottomColor: COLOR_CONST.charcoalGrey,
    paddingBottom: verticalScale(9),
    textAlign: "center",
  },

  buttonContainer: {
    width: scale(375),
    height: scale(59),
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: scale(0.5),
    borderBottomWidth: scale(0.5),
    borderTopColor: COLOR_CONST.lightGreyText,
    borderBottomColor: COLOR_CONST.lightGreyText,
    marginTop: verticalScale(14),
    marginBottom: verticalScale(10),
  },

  loginButton1: {
    zIndex: 1000,
    width: scale(335),
    height: scale(42),
    marginTop: verticalScale(25),
    backgroundColor: themeJson.attributes.primary_color,
  },

  loginText1: {
    fontSize: scale(14),
    lineHeight: scale(16),
    letterSpacing: scale(0.4),
    color: COLOR_CONST.white,
    fontFamily: FONTS.GTWalsheimProBold,
  },

  applyCouponRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(5),
  },

  applyCouponText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginTop: verticalScale(15),
    marginBottom: verticalScale(10),
    marginLeft: mobW * 0.05,
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.pastelRed,
  },

  subText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginTop: verticalScale(5),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.black,
    marginRight: mobW * 0.05,
  },

  continueShoppingButton: {
    width: scale(339),
    height: scale(42),
    marginTop: verticalScale(25),
    borderRadius: scale(20),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    opacity: 0.99,
  },

  applyText: {
    fontSize: scale(15),
    color: COLOR_CONST.white,
    fontFamily: FONTS.GTWalsheimProBold,
    lineHeight: scale(18),
  },

  modalContainer1: {
    flex: 1,
    backgroundColor: COLOR_CONST.modalTransparentBg,
    justifyContent: "center",
    alignItems: "center",
  },

  popup1: {
    width: scale(286),
    borderRadius: scale(8),
    backgroundColor: COLOR_CONST.white,
  },

  deleteAddress1: {
    fontSize: scale(18),
    lineHeight: scale(20),
    marginTop: verticalScale(31),
    fontFamily: FONTS.GTWalsheimProMedium,
    textAlign: "center",
    color: COLOR_CONST.charcoalGrey,
  },

  areYouSure1: {
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

  packageText: {
    fontSize: scale(10),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: themeJson.attributes.primary_color,
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

  verticalLine1: {
    width: scale(0.5),
    height: scale(25),
    backgroundColor: COLOR_CONST.lightGreyText,
  },

  cancelText1: {
    fontSize: scale(15),
    lineHeight: scale(18),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: "center",
  },

  yesDelete1: {
    fontSize: scale(15),
    lineHeight: scale(18),
    opacity: 0.8,
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: "center",
    color: COLOR_CONST.charcoalGrey,
  },

  labelSticker: {
    height: scale(22.2),
    borderTopLeftRadius: scale(50),
    borderBottomLeftRadius: scale(50),
    backgroundColor: COLOR_CONST.pastelRed,
    alignSelf: "flex-end",
    justifyContent: "center",
  },

  stickerText: {
    fontSize: scale(8),
    lineHeight: scale(9),
    letterSpacing: scale(0.3),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.white,
    marginLeft: scale(12.1),
    paddingHorizontal: scale(5),
  },

  crossButton: {
    position: "absolute",
    top: verticalScale(10),
    right: scale(17.4),
    width: scale(20),
    height: scale(20),
    justifyContent: "center",
    alignItems: "center",
  },

  crossIcon: {
    width: scale(14.6),
    height: scale(14.6),
  },

  changeText: {
    fontSize: scale(10),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    marginLeft: scale(11),
    textDecorationLine: "underline",
    color: COLOR_CONST.charcoalGrey,
  },

  bottomContainer: {
    flexDirection: "row",
    alignSelf: 'center'
    // alignItems: "center",
  },

  removeButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    // paddingVertical: verticalScale(8),
  },
  rmIcons: {
    width: scale(14),
    height: scale(14),
    resizeMode: 'contain'
    // backgroundColor: "#ddd",
  },
  rmIconsHeart: {
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
    marginTop: scale(3)
    // backgroundColor: "#ddd",
  },

  removeText: {
    fontSize: scale(14),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.removered,
    marginLeft: scale(9)
  },

  vertical: {
    width: scale(1),
    height: scale(17),
    backgroundColor: COLOR_CONST.coolGreyTwo,
  },

  moveWishlistText: {
    fontSize: scale(14),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.lightgraycolor,
    marginLeft: scale(9),
  },
  outDesctription: {
    alignSelf: 'flex-start',
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(2),
    marginTop: verticalScale(18)
  },
  prescription: {
    fontSize: scale(14),
    lineHeight: scale(23),
    marginLeft: scale(6),
    textAlign: "left",
    color: themeJson.attributes.black,
    fontFamily: FONTS.GTWalsheimProRegular,
  },
  descrioptionTick: {
    width: scale(13),
    height: scale(13),
    marginRight: scale(6),
  },
  itemview: {
    borderBottomColor: COLOR_CONST.newlightcolor,
    borderBottomWidth: 1,
    width: mobW * 0.9,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: verticalScale(10)
  }
  // Customizable Area End
});
