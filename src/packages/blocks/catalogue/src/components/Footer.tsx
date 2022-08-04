import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, Linking } from "react-native";
import scale from "../../../../framework/src/utils/Scale";
const themeJson = require("../../../studio-store-ecommerce-theme/src/theme.json");
import { FONTS } from "../../../studio-store-ecommerce-theme/src/AppFonts";
import {
	GR_FACEBOOK_GRAY,
	GR_INSTAGRAM_GRAY,
	GR_WHATSAPP_GRAY,
	GR_TWITTER_GRAY,
	GR_GOOGLE_PLAY_STORE,
	GR_APP_STORE
} from "../../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import StyleSheetWithMediaQuery from "react-native-media-query";

interface FooterProps {
	brandSettings?: any;
	navigation: any;
}

const Footer: React.FC<FooterProps> = ({ brandSettings, navigation }) => {
	return (
		<View style={responsive.styles.componentWrapper}>
			<View style={responsive.styles.footerColumnsWrapper}>
				<View style={componentStyles.footerColumn}>
					<Text style={componentStyles.footerColumnHeader}>Contact us</Text>
					<TouchableOpacity onPress={() => navigation.push("Contactus")}>
						<Text style={componentStyles.footerText}>Send a message</Text>
					</TouchableOpacity>
					<TouchableOpacity style={componentStyles.socialIconsRow} onPress={() => { }}>
						<Text style={componentStyles.footerText}>Chat on Whatsapp</Text>
						<Image source={GR_WHATSAPP_GRAY} style={componentStyles.whatsappIcon} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => {
						Linking.openURL(`tel:+91${brandSettings?.commonTextsContent.callUs}`)
					}}>
						<Text style={componentStyles.footerText}>(+91) {brandSettings?.commonTextsContent.callUs}</Text>
					</TouchableOpacity>
				</View>
				<View style={componentStyles.footerColumn}>
					<Text style={componentStyles.footerColumnHeader}>About us</Text>
					<TouchableOpacity onPress={() => navigation.push("Reviews2")}>
						<Text style={componentStyles.footerText}>Customer Reviews</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.push("Interactivefaqs")}>
						<Text style={componentStyles.footerText}>FAQs</Text>
					</TouchableOpacity>
				</View>
				<View style={componentStyles.footerColumn}>
					<Text style={componentStyles.footerColumnHeader}>Social</Text>
					<View style={componentStyles.socialIconsRow}>
						<View style={componentStyles.socialIconsWrapper}>
							{
								brandSettings?.footerContent.facebookSrc && (
									<TouchableOpacity onPress={() => Linking.openURL(brandSettings?.footerContent.facebookSrc)}>
										<Image source={GR_FACEBOOK_GRAY} style={componentStyles.socialIconWithMargin} />
									</TouchableOpacity>
								)
							}
							{
								brandSettings?.footerContent.instagramSrc && (
									<TouchableOpacity onPress={() => Linking.openURL(brandSettings?.footerContent.instagramSrc)}>
										<Image source={GR_INSTAGRAM_GRAY} style={componentStyles.socialIconWithMargin} />
									</TouchableOpacity>
								)
							}
							{
								brandSettings?.footerContent.twitterSrc && (
									<TouchableOpacity onPress={() => Linking.openURL(brandSettings?.footerContent.twitterSrc)}>
										<Image source={GR_TWITTER_GRAY} style={componentStyles.socialIconWithMargin} />
									</TouchableOpacity>
								)
							}
							{/*
							brandSettings?.footerContent.youtubeSrc && (
							<TouchableOpacity onPress={() => Linking.openURL(brandSettings?.footerContent.youtubeSrc)}>
								<Image source={GR_TWITTER_GRAY} style={componentStyles.socialIconWithMargin} />
							</TouchableOpacity>
							)
						*/}
						</View>
					</View>
				</View>
				{/* <View style={componentStyles.footerColumn}>
					<Text style={componentStyles.footerColumnHeader}>Download App</Text>
					<View style={responsive.styles.socialIconsRow}>
						<TouchableOpacity>
							<Image source={GR_GOOGLE_PLAY_STORE} style={responsive.styles.storeBadge} />
						</TouchableOpacity>
						<TouchableOpacity>
							<Image source={GR_APP_STORE} style={responsive.styles.storeBadge} />
						</TouchableOpacity>
					</View>
				</View> */}
			</View>

			<View style={responsive.styles.copyRightSection}>
				<Text style={componentStyles.copyRightText}>{brandSettings?.footerContent.copyright}</Text>
				<Text style={componentStyles.copyRightText}>Powered by Builder.ai</Text>
			</View>
		</View>
	);
};

const componentStyles = StyleSheet.create({
	footerColumn: {
		alignItems: "center",
		margin: scale(24)
	},
	footerColumnHeader: {
		fontFamily: FONTS.GTWalsheimProMedium,
		marginBottom: scale(12),
		fontSize: scale(18),
		lineHeight: scale(24)
	},
	footerText: {
		fontFamily: FONTS.GTWalsheimProRegular,
		fontSize: scale(14),
		lineHeight: scale(24),
		marginVertical: scale(4),
		color: themeJson.attributes.blue_grey
	},
	socialIcon: {
		width: scale(24),
		height: scale(24)
	},
	socialIconWithMargin: {
		width: scale(24),
		height: scale(24),
	},
	socialIconsWrapper: {
		width: scale(120),
		flexDirection: "row",
		justifyContent: "space-between",
	},
	whatsappIcon: {
		width: scale(15),
		height: scale(15),
		marginLeft: scale(9)
	},
	socialIconsRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	copyRightText: {
		fontFamily: FONTS.GTWalsheimProRegular,
		fontSize: scale(10),
		lineHeight: scale(24)
	}
});

const responsive = StyleSheetWithMediaQuery.create({
	componentWrapper: {
		borderTopColor: themeJson.attributes.blue_grey_2,
		borderTopWidth: scale(1),
	},
	footerColumnsWrapper: {
		paddingHorizontal: scale(16),
		"@media (min-width: 800px)": {
			flexDirection: "row",
			justifyContent: "space-around"
		},
		"@media (max-width: 800px)": {
			flexDirection: "column",
			justifyContent: "center"
		}
	},
	socialIconsRow: {
		alignItems: "center",
		justifyContent: "center",
		"@media (min-width: 800px)": {
			flexDirection: "column"
		},
		"@media (max-width: 800px)": {
			flexDirection: "row"
		}
	},
	storeBadge: {
		width: scale(120),
		resizeMode: "contain",
		"@media (min-width: 800px)": {
			marginHorizontal: 0
		},
		"@media (max-width: 800px)": {
			marginHorizontal: scale(9)
		}
	},
	copyRightSection: {
		backgroundColor: themeJson.attributes.blue_grey_4,
		"@media (min-width: 800px)": {
			flexDirection: "row",
			justifyContent: "center",
			padding: scale(4),
			marginTop: scale(12)
		},
		"@media (max-width: 800px)": {
			flexDirection: "column",
			alignItems: "center",
			padding: scale(8),
			marginTop: scale(12)
		}
	}
});

export default Footer;
