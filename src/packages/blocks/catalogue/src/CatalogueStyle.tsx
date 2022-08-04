import { StyleSheet, Platform } from "react-native";
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
    backgroundColor: COLOR_CONST.white,
    paddingBottom: verticalScale(20),
    width: scale(375),
  },
  flexy: {
    flex: 1,
  },
  catalogueTitleRow: {
    flexDirection: "row",
    marginVertical: verticalScale(16),
    paddingHorizontal: scale(16),
  },
  productsRow: {
    paddingHorizontal: scale(16),
  },
  catalogueTitle: {
    fontFamily: FONTS.GTWalsheimProRegular,
    fontSize: scale(18),
    lineHeight: scale(24),
  },
  gridTitleContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: scale(20),
    marginTop: verticalScale(18),
  },

  titleTextStyle: {
    color: COLOR_CONST.charcoalGrey,
    fontSize: scale(17),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
  },

  viewAllText: {
    color: COLOR_CONST.charcoalGrey,
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
  },

  gridListContainer: {
    marginHorizontal: scale(11),
  },

  productGridStyle: {
    borderWidth: 1,
    borderRadius: scale(4),
    width: scale(166),
    borderColor: COLOR_CONST.borderduckEggBlue,
    overflow: "hidden",
    marginTop: verticalScale(15),
    marginHorizontal: scale(5),
  },

  imageMainContainer: {},

  imageContainer: {
    flexDirection: "row",
  },

  heartIcon: {
    width: scale(50),
    height: scale(50),
  },

  BottalImage: {
    width: scale(166),
    height: scale(166),
  },

  titleContainer: {
    width: scale(130),
    height: scale(38),
    marginTop: verticalScale(11),
  },

  titleNameStyle: {
    fontSize: scale(17),
    height: scale(19),
    marginHorizontal: scale(12),
    lineHeight: scale(19),
    marginTop: verticalScale(11),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProRegular,
  },

  price: {
    fontSize: scale(15),
    lineHeight: scale(18),
    color: themeJson.attributes.primary_color,
    fontFamily: FONTS.GTWalsheimProMedium,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(9),
    height: scale(18),
  },

  discountRow: {
    flexDirection: "row",
    marginHorizontal: scale(12),
  },

  discountPrice: {
    fontSize: scale(15),
    lineHeight: scale(18),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProMedium,
    textDecorationLine: "line-through",
    marginTop: verticalScale(10),
    marginBottom: verticalScale(9),
    height: scale(18),
  },
  discountPercentage: {
    fontSize: scale(15),
    lineHeight: scale(18),
    color: themeJson.attributes.primary_color,
    fontFamily: FONTS.GTWalsheimProMedium,
    marginTop: verticalScale(25),
    marginBottom: verticalScale(9),
    height: scale(18),
  },
  outOfStockCont: {
    flex: 1,
    width: "100%",
  },
  outOfStock: {
    fontSize: scale(15),
    lineHeight: scale(18),
    color: COLOR_CONST.pastelRed,
    fontFamily: FONTS.GTWalsheimProMedium,
    marginLeft: scale(5),
    marginTop: verticalScale(25),
    marginBottom: verticalScale(9),
    height: scale(18),
    textAlign: "center",
  },

  addToCartContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(164),
    backgroundColor: COLOR_CONST.charcoalGrey,
    height: scale(40),
  },

  addToCartText: {
    color: COLOR_CONST.pastelRed,
    alignSelf: "center",
    fontFamily: FONTS.GTWalsheimProRegular,
    fontSize: scale(13),
    lineHeight: scale(15),
  },

  spinner: {
    alignSelf: "center",
    width: Platform.OS === "ios" ? scale(164) : scale(170),
    backgroundColor: COLOR_CONST.white,
    height: scale(40),
    alignItems: "center",
  },

  qtyStyle: {
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.7,
    fontSize: scale(13),
    lineHeight: scale(15),
    marginLeft: scale(5),
  },

  TouchableOpacityStyle: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: verticalScale(16),
    right: verticalScale(16),
    width: scale(18),
    height: scale(17),
    zIndex: 1000,
  },
  cartView: {
    width: "100%",
    height: verticalScale(40),
    backgroundColor: "#F7F8FB",
    justifyContent: "center",
    alignItems: "center",
  },
  cartText: {
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    fontSize: scale(15),
    textAlign: "center",
    lineHeight: scale(15),
    letterSpacing: scale(0.3),
  },
  ratingText: {
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.black,
    fontSize: scale(15),
    textAlign: "center",
    lineHeight: scale(15),
    letterSpacing: scale(0.3),
  },
  lineDivider: {
    width: 2,
    height: scale(12),
    backgroundColor: COLOR_CONST.charcoalGrey,
    marginLeft: scale(5),
    marginTop: scale(1),
  },

  starRating: {
    margin: scale(2),
    width: scale(8),
    height: scale(8),
  },

  reviewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: scale(12),
    marginBottom: verticalScale(10),
  },

  avgReview: {
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.black,
    fontSize: scale(14),
    textAlign: "center",
    lineHeight: scale(16),
  },

  reviewStar: {
    marginLeft: scale(4),
    width: scale(9),
    height: scale(9),
  },

  reviewCount: {
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.darkGreyText,
    fontSize: scale(14),
    textAlign: "center",
    lineHeight: scale(16),
    marginLeft: scale(4.5),
  },

  labelSticker: {
    position: "absolute",
    backgroundColor: COLOR_CONST.pastelRed,
    paddingHorizontal: scale(10),
    height: scale(17),
    justifyContent: "center",
    borderTopRightRadius: scale(5),
    borderBottomRightRadius: scale(5),
    left: 0,
    top: verticalScale(16),
    alignItems: "center",
  },
  stickerText: {
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.white,
    fontSize: scale(10),
    textAlign: "center",
    lineHeight: scale(11),
  },
  innerContainer: {
    flex: 1,
    backgroundColor: themeJson.attributes.blue_grey_3,
  },
  wrapper: {
    height: scale(93),
  },
  swiperWrapper: {
    marginTop: scale(24),
    paddingHorizontal: scale(16),
  },
  ourProductsAndFilterButtonRow: {
    marginTop: scale(24),
    paddingHorizontal: scale(16),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rubikFont: {
    fontFamily: FONTS.GTWalsheimProBold,
  },
  brandLogo: {
    height: 26,
    width: 26,
    resizeMode: "contain",
    marginRight: 8,
  },
  pagination: {
    position: "absolute",
    bottom: verticalScale(7),
    left: 0,
    right: 0,
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  inActiveDot: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR_CONST.inActiveDotLightGrey,
    width: scale(4),
    height: scale(4),
    borderRadius: scale(2),
    marginHorizontal: scale(2.5),
  },

  activeDot: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR_CONST.coolGreyTwo,
    width: scale(4),
    height: scale(4),
    borderRadius: scale(2),
    marginHorizontal: scale(2.5),
  },
  slide1: {},
  banner: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0,
  },
  topBox: {
    width: "50%",
    paddingVertical: 5,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  topText: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
  },
  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 15,
    minHeight: 260,
    position: "relative",
  },
  modalBox: {
    margin: 0,
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: -20,
  },
  closeIcon: {
    position: "absolute",
    right: 15,
    top: 15,
    fontWeight: "normal",
    zIndex: 999,
  },
  heading: {
    fontSize: 18,
    color: "#000",
    marginBottom: 15,
  },
  sortList: {
    paddingVertical: 8,
    alignItems: "center",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
  sortText: {
    fontSize: 16,
    color: "#696969",
  },
  sortIcon: {
    marginRight: 12,
  },
  flexBox: {
    display: "flex",
    flexDirection: "row",
  },
  productContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  productBox: {
    height: 250,
    borderBottomWidth: 1,
    flexDirection: "column",
    flex: 0.5,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  ImgContainer: {
    height: 150,
  },
  productName: {
    paddingVertical: 5,
    fontSize: 16,
  },
  productImg: {
    width: "100%",
    height: "100%",
  },
  detailContent: {
    padding: 10,
  },
  rating: {
    color: "#000",
    paddingRight: 6,
  },
  starBox: {
    alignItems: "center",
  },

  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
    marginLeft: scale(22),
    alignItems: "center",
  },
  titleText: {
    color: COLOR_CONST.white,
    fontSize: scale(20),
    lineHeight: scale(23),
    fontFamily: FONTS.GTWalsheimProMedium,
  },
  SectionStyle: {
    marginTop: verticalScale(12),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.8,
    borderColor: COLOR_CONST.borderduckEggBlue,
    height: verticalScale(44),
    borderRadius: 4,
    marginHorizontal: scale(23),
    marginBottom: verticalScale(22),
  },
  searchText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginTop: verticalScale(5),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProRegular,
  },
  locationTitleText: {
    color: COLOR_CONST.white,
    fontFamily: FONTS.GTWalsheimProMedium,
    fontSize: scale(11),
    lineHeight: scale(13),
  },

  locationNameText: {
    color: COLOR_CONST.white,
    fontFamily: FONTS.GTWalsheimProMedium,
    fontSize: scale(15),
    lineHeight: scale(18),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  noDataText: {
    fontSize: scale(17),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProMedium,
    lineHeight: scale(19),
    textAlign: "center",
    opacity: 0.9,
    marginTop: verticalScale(38),
  },

  emptyAddressIcon: {
    width: scale(171.5),
    height: scale(186.7),
    alignSelf: "center",
  },
  // Customizable Area End
});
