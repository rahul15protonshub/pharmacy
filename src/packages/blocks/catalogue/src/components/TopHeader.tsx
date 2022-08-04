import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import {
	GR_SEARCH_LENS,
	GR_SHOPPING_CART,
	GR_BURGER_MENU
} from "../../../studio-store-ecommerce-theme/src/AppAssets/appassets";
const themeJson = require("../../../studio-store-ecommerce-theme/src/theme.json");
import { FONTS } from "../../../studio-store-ecommerce-theme/src/AppFonts";
import scale from "../../../../framework/src/utils/Scale";
import FastImage from "react-native-fast-image";

interface TopHeaderProps {
	onSearchPress: () => void;
	onCartPress: () => void;
	onMenuPress: () => void;
	onLogoPress: () => void;
	logoSrc: string;
	cartCount: number;
}

const TopHeader: React.FC<TopHeaderProps> = ({ logoSrc, onSearchPress, onCartPress, onMenuPress, onLogoPress, cartCount }) => (
	<View>
		<View style={componentStyles.headerContainer}>
			<TouchableOpacity style={componentStyles.headerLeft} onPress={onLogoPress}>
				<FastImage source={{ uri: logoSrc }} style={componentStyles.brandLogo} />
				<Text style={componentStyles.rubikFont}>{themeJson.attributes.heading}</Text>
			</TouchableOpacity>
			<View style={componentStyles.headerRight}>
				<TouchableOpacity onPress={onSearchPress}>
					<Image source={GR_SEARCH_LENS} style={componentStyles.headerIcon} />
				</TouchableOpacity>
				<TouchableOpacity onPress={onCartPress}>
					<Image source={GR_SHOPPING_CART} style={componentStyles.headerIcon} />
					{
						cartCount > 0 && (
							<View style={componentStyles.cartCountContainer}>
								<Text style={componentStyles.cartCount}>{cartCount}</Text>
							</View>
						)
					}
				</TouchableOpacity>
				<TouchableOpacity onPress={onMenuPress}>
					<Image source={GR_BURGER_MENU} style={componentStyles.headerIcon} />
				</TouchableOpacity>
			</View>
		</View>
	</View>
);

const componentStyles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: scale(16),
		backgroundColor: themeJson.attributes.blue_grey_3,
		elevation: 8
	},
	headerLeft: {
		flexDirection: "row",
		alignItems: "center"
	},
	headerRight: {
		flexDirection: "row",
		alignItems: "center"
	},
	headerIcon: {
		height: scale(24),
		width: scale(24),
		resizeMode: "stretch",
		marginLeft: scale(16)
	},
	rubikFont: {
		fontFamily: FONTS.GTWalsheimProBold
	},
	brandLogo: {
		height: 26,
		width: 26,
		resizeMode: "contain",
		marginRight: 8
	},
	cartCountContainer: {
		position: "absolute",
		right: scale(-8),
		width: scale(17),
		height: scale(17),
		top: scale(-8),
		backgroundColor: themeJson.attributes.secondary_color,
		borderRadius: scale(8),
		padding: scale(3),
		justifyContent: "center",
		alignItems: "center"
	},
	cartCount: {
		fontFamily: FONTS.GTWalsheimProBold,
		color: themeJson.attributes.white,
		fontSize: scale(12)
	}
});

export default TopHeader;
