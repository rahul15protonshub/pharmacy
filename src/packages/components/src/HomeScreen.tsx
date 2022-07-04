import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";
import AlertBlock from "../../blocks/alert/src/AlertBlock";
import CustomTextItem from "./CustomTextItem";
import NavigationBlock from "../../framework/src/Blocks/NavigationBlock";
import SingletonFactory from "../../framework/src/SingletonFactory";

import HomeScreenAdapter from "../../blocks/adapters/src/HomeScreenAdapter";
import InfoPageAdapter from "../../blocks/adapters/src/InfoPageAdapter";
import AlertPageWebAdapter from "../../blocks/adapters/src/AlertPageWebAdapter";

// Customizable Area Start
import PrivacyPolicyAdapter from "../../blocks/adapters/src/PrivacyPolicyAdapter";
import TermsAndConditionAdapter from "../../blocks/adapters/src/TermsAndConditionAdapter";

//Assembler generated adapters start

//Assembler generated adapters end



const privacyAdapter = new PrivacyPolicyAdapter();
const termAndConditionAdapter = new TermsAndConditionAdapter();
// Customizable Area End

const restAPIBlock = SingletonFactory.getRestBlockInstance();
const alertBlock = new AlertBlock();
const navigationBlock = new NavigationBlock();
const sessionBlock = SingletonFactory.getSessionBlockInstance();
const userAccountManagerBlock = SingletonFactory.getUserManagerInstance();
const homeScreenAdapter = new HomeScreenAdapter();
const infoPageAdapter = new InfoPageAdapter();
const alertPageWebAdapter = new AlertPageWebAdapter();

const instructions = Platform.select({
  // Customizable Area Start
  ios: "The iOS APP to rule them all!",
  android: "Now with Android AI",
  web: "Selector your adventure.",
  // Customizable Area End
});

interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
interface S {}

interface SS {}

class HomeScreen extends BlockComponent<Props, S, SS> {
  static instance: HomeScreen;

  constructor(props: Props) {
    super(props);
    HomeScreen.instance = this;
  }

  render() {
    const { navigation } = this.props;
    const _this = this;

    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.welcome}>
                Welcome to InternalSSPharmacyDemo!
              </Text>
            </View>
            <Text style={styles.instructions}>{instructions}</Text>
            <Text style={styles.header}>DEFAULT BLOCKS</Text>
            <CustomTextItem
              content={"InfoPage"}
              onPress={() => navigation.navigate("InfoPage")}
            />
            <CustomTextItem
              content={"Alert"}
              onPress={() => this.showAlert("Example", "This happened")}
            />
<CustomTextItem content={'payments'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'studio-store-ecommerce-core'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'studio-store-ecommerce-components'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'studio-store-ecommerce-router'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'studio-store-ecommerce-services'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'studio-store-ecommerce-theme'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'studio-store-ecommerce-translations'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'scheduling'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'shoppingcart'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'email-account-registration'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'auth'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'login'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'signup'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'forgot-password'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'splashscreen'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'otp-input-confirmation'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'email-account-login'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'notifications'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'ordermanagement'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Dashboard'}  onPress={() => navigation.navigate("Dashboard")} />
<CustomTextItem content={'catalogue'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'helpcenter'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'interactivefaqs'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'profilebio'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'connectedaccounts'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'sorting'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'wishlist'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'filteritems'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'search'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'categoriessubcategories'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'productdescription'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'ordersummary'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'orderdetailview'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'contactus'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'BulkUploading'}  onPress={() => navigation.navigate("BulkUploading")} />
<CustomTextItem content={'core'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'utilities'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Share2'}  onPress={() => navigation.navigate("Share2")} />
<CustomTextItem content={'Sms2'}  onPress={() => navigation.navigate("Sms2")} />
<CustomTextItem content={'AdminConsole3'}  onPress={() => navigation.navigate("AdminConsole3")} />
<CustomTextItem content={'UploadMedia2'}  onPress={() => navigation.navigate("UploadMedia2")} />
<CustomTextItem content={'EmailLists'}  onPress={() => navigation.navigate("EmailLists")} />
<CustomTextItem content={'TargetedFeed'}  onPress={() => navigation.navigate("TargetedFeed")} />
<CustomTextItem content={'CustomisedOrderStatus'}  onPress={() => navigation.navigate("CustomisedOrderStatus")} />
<CustomTextItem content={'LiveChat2'}  onPress={() => navigation.navigate("LiveChat2")} />
<CustomTextItem content={'Reviews2'}  onPress={() => navigation.navigate("Reviews2")} />
<CustomTextItem content={'ApiIntegration19'}  onPress={() => navigation.navigate("ApiIntegration19")} />
<CustomTextItem content={'AdHocReporting2'}  onPress={() => navigation.navigate("AdHocReporting2")} />

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
// Customizable Area End

// Customizable Area Start
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    height: Platform.OS === "web" ? "100vh" : "auto",
    backgroundColor: "#F5FCFF",
  },
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  instructions: {
    textAlign: "center",
    color: "#6200EE",
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 16,

    padding: 10,
  },
  button: {
    backgroundColor: "#6200EE",
    padding: 15,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    backgroundColor: "#6200EE",
    padding: 15,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#00000000",
    padding: 18,
    color: "#6200EE",
    fontSize: 16,
    fontWeight: "normal",
  },
});
// Customizable Area End
export default HomeScreen;