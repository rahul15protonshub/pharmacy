import React, { Component } from "react";
import {
  View,
  Animated,
  StyleSheet,
  TextInput,
  Dimensions,
  Platform,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
interface S {
  isFieldActive: boolean;
  // Customizable Area Start
  // Customizable Area End
}
export class FloatingTitleTextInputField extends Component<S> {
  static defaultProps = {
    // Customizable Area Start
    keyboardType: "default",
    //@ts-ignore
    titleActiveSize: Platform.isPad ? 28 : RFValue(11.5),
    //@ts-ignore
    titleInActiveSize: Platform.isPad ? 31.5 : RFValue(14),
    titleActiveColor: "rgb(84, 89, 95)",
    titleInactiveColor: "rgb(84, 89, 95)",
    otherTextInputAttributes: {},
    textInputStyles: {},
    // Customizable Area End
  };
  position: any;
  constructor(props: any) {
    super(props);
    //@ts-ignore
    const { value } = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
    };
    // Customizable Area Start
    // Customizable Area End
  }

  _handleFocus = () => {
    //@ts-ignore
    if (!this.state.isFieldActive) {
      this.setState({ isFieldActive: true });
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  _handleBlur = () => {
    //@ts-ignore
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({ isFieldActive: false });
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  _onChangeText = (updatedValue: any) => {
    //@ts-ignore
    const { attrName, updateMasterState, textInputRef } = this.props;
    updateMasterState(attrName, updatedValue, textInputRef);
  };

  _returnAnimatedTitleStyles = (attrName: any) => {
    //@ts-ignore
    const { isFieldActive } = this.state;
    //@ts-ignore
    const {
      //@ts-ignore
      titleActiveColor,
      //@ts-ignore
      titleInactiveColor,
      //@ts-ignore
      titleActiveSize,
      //@ts-ignore
      titleInActiveSize,
    } = this.props;
    switch (attrName) {
      case "cardNumber":
        //@ts-ignore
        if (this.props.value.length > 0) {
          this._handleFocus();
        }
        break;

      case "cardHolder":
        //@ts-ignore
        if (this.props.value.length > 0) {
          this._handleFocus();
        } else {
          this._handleBlur();
        }
        break;

      case "expiry":
        //@ts-ignore
        if (this.props.value.length > 0) {
          this._handleFocus();
        } else {
          this._handleBlur();
        }
        break;
      case "cvv":
        //@ts-ignore
        if (this.props.value.length > 0) {
          this._handleFocus();
        } else {
          this._handleBlur();
        }
        break;
    }

    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        //@ts-ignore
        outputRange: [this.props.interpolation, 0],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? "rgb(195, 195, 195)" : "rgb(84, 89, 95)",
    };
  };
  setPlaceHolderMove = () => {
    //@ts-ignore
    if (this.state.isFieldActive) {
      //@ts-ignore
      if (Platform.isPad) {
        return hp("2.8%");
      } else {
        return hp("2%");
      }
    } else {
      //@ts-ignore
      if (Platform.isPad) {
        return hp("3.8%");
      } else {
        return hp("2.9%");
      }
    }
  };
  render() {
    // Customizable Area Start
    //isFieldActive is true means Placeholder value wich is moving on border
    return (
      <View
        style={[
          Styles.container,
          {
            width:
              //@ts-ignore
              this.props.width,
          },
        ]}
      >
        {/** floating text view whic remove the border according to the length of title */}
        <Animated.View
          style={{
            position: "absolute",
            bottom: hp("5.5%"),
            //@ts-ignore
            height: this.state.isFieldActive
              ? this.setPlaceHolderMove()
              : this.setPlaceHolderMove(), //handling placeholder position 1.6  2.6
            //@ts-ignore
            width: this.state.isFieldActive
              ? //@ts-ignore
                wp(`${this.props.title.length * 1.7}%`)
              : wp("-1%"),
          }}
        >
          <Animated.Text
            style={[
              Styles.titleStyles,
              //@ts-ignore
              this._returnAnimatedTitleStyles(this.props.attrName),
            ]}
          >
            {
              //@ts-ignore
              this.props.title
            }
          </Animated.Text>
        </Animated.View>
        <TextInput
          testID="otherTextInput"
          //@ts-ignore
          refs={(input) => (this.props.textInputRef = input)}
          //@ts-ignore
          value={this.props.value}
          //@ts-ignore
          style={[Styles.textInput, this.props.textInputStyles]}
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          onChangeText={this._onChangeText}
          //@ts-ignore
          keyboardType={this.props.keyboardType}
          //@ts-ignore
          {...this.props.otherTextInputProps}
        />
      </View>
    );
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
// Customizable Area End

const Styles = StyleSheet.create({
  // Customizable Area Start
  container: {
    height: hp("6%"),
    marginVertical: height / (2 * 30),
    width: wp("80%"),
  },
  textInput: {
    height: hp("6%"), // 60,//height / 14,
    borderBottomWidth: 1,
    borderBottomColor: "#c3c3c3",
    padding: 0,
    //@ts-ignore
    fontSize: Platform.isPad ? 32 : RFValue(16),
    width: width / 1.1,
  },
  titleStyles: {
    position: "absolute",
    fontSize: RFValue(20),
  },
  // Customizable Area End
});
