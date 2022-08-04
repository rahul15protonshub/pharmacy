import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text, ActionSheetIOS, Platform, Picker } from "react-native";
import scale from "../../../../framework/src/utils/Scale";
import { GR_CARET_DOWN_BLUE } from "../../../studio-store-ecommerce-theme/src/AppAssets/appassets";
const themeJson = require("../../../studio-store-ecommerce-theme/src/theme.json");
import { FONTS } from "../../../studio-store-ecommerce-theme/src/AppFonts";
//@ts-ignore
import content from "../../../studio-store-ecommerce-components/src/content";
import DropDownPicker from "react-native-dropdown-picker";

interface SortSelectorProps {
  onChange?: (sortBy: string, sortOrder: string) => void;
}

const sortMenu = [
  { label: content.LowtoHigh, order_by: "price_including_tax", direction: "asc", width: 145 },
  { label: content.HightoLow, order_by: "price_including_tax", direction: "desc", width: 145 },
  { label: content.ByPopularity, order_by: "sold", direction: "desc", width: 120 },
  { label: content.ByNewest, order_by: "created_at", direction: "desc", width: 100 },
  { label: content.Recommended, order_by: "recommended", direction: "desc", width: 130 }
];

const SortSelector: React.FC<SortSelectorProps> = ({ onChange }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(3);
  return (
    <View style={componentStyles.componentWrapper}>
      <Text style={componentStyles.label}>Sort By:</Text>
      <DropDownPicker
        items={sortMenu.map((item, index) => ({
          label: item.label,
          value: index
        }))}
        dropDownMaxHeight={scale(300)}
        activeItemStyle={componentStyles.activeItemStyle}
        activeLabelStyle={componentStyles.activeLabelStyle}
        defaultValue={selectedItemIndex}
        containerStyle={componentStyles.dropdownContainerStyle}
        style={componentStyles.dropdownStyle}
        labelStyle={componentStyles.dropdownLabelStyle}
        itemStyle={componentStyles.dropdownItemStyle}
        dropDownStyle={componentStyles.dropdownWrapper}
        onChangeItem={(item, index) => {
          setSelectedItemIndex(index)
          onChange?.(sortMenu[index].order_by, sortMenu[index].direction)
        }}
        customArrowDown={() => <Image source={GR_CARET_DOWN_BLUE} style={componentStyles.caretDown} />}
        customArrowUp={() => <Image source={GR_CARET_DOWN_BLUE} style={[componentStyles.caretDown, { transform: [{ rotate: '180deg' }] }]} />}
      />
    </View>
  );
};

const componentStyles = StyleSheet.create({
  rubikFont: {
    fontFamily: FONTS.GTWalsheimProRegular,
    fontSize: scale(14),
    lineHeight: scale(24)
  },
  label: {
    fontFamily: FONTS.GTWalsheimProLight,
    fontSize: scale(14),
    lineHeight: scale(24)
  },
  dropdownLabelStyle: {
    fontFamily: FONTS.GTWalsheimProBold,
    fontSize: scale(14),
    color: themeJson.attributes.secondary_color,
    textAlign: "right",
    lineHeight: scale(24),
    flex: 0
  },
  activeItemStyle: {
    backgroundColor: themeJson.attributes.secondary_color
  },
  activeLabelStyle: {
    color: "white"
  },
  caretDown: {
    width: scale(12),
    height: scale(6)
  },
  dropdownWrapper: {
    width: scale(170),
    right: scale(0),
    paddingHorizontal: scale(4),
    paddingVertical: scale(4)
  },
  dropdownStyle: {
    borderWidth: 0,
    padding: 0,
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    paddingVertical: 0,
    flex: 0,
  },
  componentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  dropdownContainerStyle: {
    padding: 0,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  dropdownItemStyle: {
    justifyContent: "flex-start",
    paddingHorizontal: scale(10)
  },
});

export default SortSelector;
