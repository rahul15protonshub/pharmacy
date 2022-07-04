import React from "react";

import {
  Text,
  Image,
  TouchableOpacity,
  View,
  SafeAreaView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import { WebView } from "react-native-webview";

import HelpCenterDataController, { Props } from "./HelpCenterDataController";
import {
  DOWN_ARROW,
  RIGHT_ARROW,
  BACK_ICON,
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import TopHeader from "../../../blocks/studio-store-ecommerce-components/src/TopHeader/TopHeader";
import styles from "./HelpCenterDataStyle";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import scale from "../../../framework/src/utils/Scale";
import FocusAwareStatusBar from "../../../blocks/studio-store-ecommerce-components/src/FocusAwareStatusBar/FocusAwareStatusBar";

// Customizable Area Start
// Customizable Area End

export default class HelpCenterData extends HelpCenterDataController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor={COLOR_CONST.white}
          isFocused={true}
        />
        <TopHeader
          headerTitle={
            this.props.navigation.state.params.Title
              ? this.props.navigation.state.params.Title
              : ""
          }
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconName={BACK_ICON}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        <View style={{ flex: 1, padding: scale(20) }}>
          <WebView
            originWhitelist={["*"]}
            source={{
              html: this.props.navigation.getParam
                ? this.props.navigation.getParam("description")
                : "",
            }}
            style={{ flex: 1 }}
          />
        </View>
      </SafeAreaView>
      // Customizable Area End
    );
  }
}
