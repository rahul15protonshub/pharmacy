import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import COLOR_CONST from '../../../studio-store-ecommerce-theme/src/AppFonts';
const themeJson = require('../../../studio-store-ecommerce-theme/src/theme.json');
const GreenButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onPress} {...props}>
      <View style={[styles.buttonStyle, props.customStyle, { backgroundColor: COLOR_CONST.newtheme_another }]}>
        <Text style={[{ color: COLOR_CONST.white }, props.customTxtStyle]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GreenButton;

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: COLOR_CONST.greenButton,
  },
});
