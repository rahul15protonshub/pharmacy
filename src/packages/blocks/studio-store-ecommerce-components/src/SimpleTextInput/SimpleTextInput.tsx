import React from 'react';
import { TextInput, Text, View, Platform } from 'react-native';
import scale, { verticalScale } from '../../../../framework/src/utils/Scale';
import COLOR_CONST, { FONTS } from '../../../../blocks/studio-store-ecommerce-theme/src/AppFonts'
const themeJson = require('../../../../blocks/studio-store-ecommerce-theme/src/theme.json');

export const SimpleTextInput = (props: any) => {
  return (
    <View>
      <Text
        style={{
          color: props.focusData
            ? COLOR_CONST.black
            : props.errorData === false
              ? COLOR_CONST.charcoalGrey
              : COLOR_CONST.pastelRed,
          fontSize: scale(13),
          lineHeight: scale(15),
          fontFamily: FONTS.GTWalsheimProRegular,
          opacity: props.errorData ? 1 : 0.7
        }}>
        {props.title}
      </Text>
      <TextInput
        {...props}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChangeText}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: props.focusData
            ? COLOR_CONST.black
            : props.errorData === false
              ? COLOR_CONST.whiteTwo
              : COLOR_CONST.pastelRed,
          marginTop: Platform.OS === 'ios' ? verticalScale(7) : 0,
          marginBottom: verticalScale(24),
          fontSize: scale(17),
          lineHeight: scale(19),
          opacity: 0.9,
          fontFamily: FONTS.GTWalsheimProRegular,
          color: COLOR_CONST.charcoalGrey,
          paddingBottom: 0,
        }}
      />
    </View>
  );
};
