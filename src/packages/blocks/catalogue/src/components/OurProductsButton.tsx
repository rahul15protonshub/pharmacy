import React from "react";
import { StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import scale from "../../../../framework/src/utils/Scale";
import { GR_FILTER_FUNNEL } from "../../../studio-store-ecommerce-theme/src/AppAssets/appassets";

interface OurProductsButtonProps {
  onButtonPress: () => void;
}

const OurProductsButton: React.FC<OurProductsButtonProps> = ({onButtonPress}) => (
  <TouchableOpacity style={componentStyles.buttonWrapper} onPress={onButtonPress}>
    <Image source={GR_FILTER_FUNNEL} style={componentStyles.icon} />
    <Text style={componentStyles.rubikFont}>Our products</Text>
  </TouchableOpacity>
);

const componentStyles = StyleSheet.create({
  rubikFont: {
    fontFamily: "Rubik",
    fontSize: scale(14),
    lineHeight: scale(24),
  },
  icon: {
    width: scale(15),
    height: scale(15),
    marginRight: scale(9),
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(16),
    paddingVertical: scale(4),
    borderRadius: 5,
    backgroundColor: "white",
    borderWidth: scale(1),
    borderColor: "black",
  },
});

export default OurProductsButton;
