import React, { Component } from 'react';
import { View, Image, StyleSheet, Linking } from 'react-native';
//@ts-ignore
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import * as IMG_CONST from '../blocks/studio-store-ecommerce-theme/src/ImageConstants';
import scale, { verticalScale } from '../framework/src/utils/Scale';

import StorageProvider from '../framework/src/StorageProvider';

import HomeScreen from '../components/src/HomeScreen';
import InfoPage from '../blocks/info-page/src/InfoPageBlock';

import { fcmService } from '../services/notification/FCMService';
import { localNotificationService } from '../services/notification/LocalNotificationService';
import Ordermanagement from "../blocks/ordermanagement/src/Ordermanagement";
import Auth from "../blocks/auth/src/Auth";
import Profilebio from "../blocks/profilebio/src/Profilebio";
import EditProfile from "../blocks/profilebio/src/EditProfile";
import ChangePassword from "../blocks/profilebio/src/ChangePassword";
import Shoppingcart from "../blocks/shoppingcart/src/Shoppingcart";
import EditAddress from "../blocks/shoppingcart/src/EditAddress";
import SavedAddress from "../blocks/shoppingcart/src/SavedAddress";
import Checkout from "../blocks/shoppingcart/src/Checkout";
import Orderdetailview from "../blocks/orderdetailview/src/Orderdetailview";
import SubscriptionOrderList from "../blocks/orderdetailview/src/SubscriptionOrderList";
import OTPInputAuth from "../blocks/otp-input-confirmation/src/OTPInputAuth";
import Login from "../blocks/login/src/Login";
import AdHocReporting2 from "../blocks/AdHocReporting2/src/AdHocReporting2";
import Signup from "../blocks/signup/src/Signup";
import ForgotPassword from "../blocks/forgot-password/src/ForgotPassword";
import NewPassword from "../blocks/forgot-password/src/NewPassword";
import Notifications from "../blocks/notifications/src/Notifications";
import EmailLists from "../blocks/EmailLists/src/EmailLists";
import Filteritems from "../blocks/filteritems/src/Filteritems";
import Filteroptions from "../blocks/filteritems/src/Filteroptions";
import ApiIntegration19 from "../blocks/ApiIntegration19/src/ApiIntegration19";
import HelpCenter from "../blocks/helpcenter/src/HelpCenter";
import HelpCenterData from "../blocks/helpcenter/src/HelpCenterData";
import Interactivefaqs from "../blocks/interactivefaqs/src/Interactivefaqs";
import AdminConsole3 from "../blocks/AdminConsole3/src/AdminConsole3";
import WishList from "../blocks/wishlist/src/WishList";
import Reviews2 from "../blocks/Reviews2/src/Reviews2";
import BulkUploading from "../blocks/BulkUploading/src/BulkUploading";
import Categoriessubcategories from "../blocks/categoriessubcategories/src/Categoriessubcategories";
import Share2 from "../blocks/Share2/src/Share2";
import ConnectedAccounts from "../blocks/connectedaccounts/src/ConnectedAccounts";
import UploadMedia2 from "../blocks/UploadMedia2/src/UploadMedia2";
import Sorting from "../blocks/sorting/src/Sorting";
import Contactus from "../blocks/contactus/src/Contactus";
import Catalogue from "../blocks/catalogue/src/Catalogue";
import Payments from "../blocks/payments/src/Payments";
import Hyperpay from "../blocks/payments/src/Hyperpay";
import OrderConfirm from "../blocks/payments/src/OrderConfirm";
import Dashboard from "../blocks/dashboard/src/Dashboard";
import Ordersummary from "../blocks/ordersummary/src/Ordersummary";
import Splashscreen from "../blocks/splashscreen/src/Splashscreen";
import TargetedFeed from "../blocks/TargetedFeed/src/TargetedFeed";
import LiveChat2 from "../blocks/LiveChat2/src/LiveChat2";
import ProductDescription from "../blocks/productdescription/src/ProductDescription";
import ReviewList from "../blocks/productdescription/src/ReviewList";
import Search from "../blocks/search/src/Search";
import CustomisedOrderStatus from "../blocks/CustomisedOrderStatus/src/CustomisedOrderStatus";
import Sms2 from "../blocks/Sms2/src/Sms2";


const HomeStack = createStackNavigator({
  Home: { screen: Contactus, navigationOptions: { header: null, title: "Home" } },
  Ordermanagement: { screen: Ordermanagement, navigationOptions: { title: "Ordermanagement" } },
  Auth: { screen: Auth, navigationOptions: { title: "Auth" } },
  Profilebio: { screen: Profilebio, navigationOptions: { title: "Profilebio" } },
  EditProfile: { screen: EditProfile, navigationOptions: { title: "EditProfile" } },
  ChangePassword: { screen: ChangePassword, navigationOptions: { title: "ChangePassword" } },
  Shoppingcart: { screen: Shoppingcart, navigationOptions: { title: "Shoppingcart" } },
  EditAddress: { screen: EditAddress, navigationOptions: { title: "EditAddress" } },
  SavedAddress: { screen: SavedAddress, navigationOptions: { title: "SavedAddress" } },
  Checkout: { screen: Checkout, navigationOptions: { title: "Checkout" } },
  Orderdetailview: { screen: Orderdetailview, navigationOptions: { title: "Orderdetailview" } },
  SubscriptionOrderList: { screen: SubscriptionOrderList, navigationOptions: { title: "SubscriptionOrderList" } },
  OTPInputAuth: { screen: OTPInputAuth, navigationOptions: { title: "OTPInputAuth" } },
  Login: { screen: Login, navigationOptions: { title: "Login" } },
  AdHocReporting2: { screen: AdHocReporting2, navigationOptions: { title: "AdHocReporting2" } },
  Signup: { screen: Signup, navigationOptions: { title: "Signup" } },
  ForgotPassword: { screen: ForgotPassword, navigationOptions: { title: "ForgotPassword" } },
  NewPassword: { screen: NewPassword, navigationOptions: { title: "NewPassword" } },
  Notifications: { screen: Notifications, navigationOptions: { title: "Notifications" } },
  EmailLists: { screen: EmailLists, navigationOptions: { title: "EmailLists" } },
  Filteritems: { screen: Filteritems, navigationOptions: { title: "Filteritems" } },
  Filteroptions: { screen: Filteroptions, navigationOptions: { title: "Filteroptions" } },
  ApiIntegration19: { screen: ApiIntegration19, navigationOptions: { title: "ApiIntegration19" } },
  HelpCenter: { screen: HelpCenter, navigationOptions: { title: "HelpCenter" } },
  HelpCenterData: { screen: HelpCenterData, navigationOptions: { title: "HelpCenterData" } },
  Interactivefaqs: { screen: Interactivefaqs, navigationOptions: { title: "Interactivefaqs" } },
  AdminConsole3: { screen: AdminConsole3, navigationOptions: { title: "AdminConsole3" } },
  WishList: { screen: WishList, navigationOptions: { title: "WishList" } },
  Reviews2: { screen: Reviews2, navigationOptions: { title: "Reviews2" } },
  BulkUploading: { screen: BulkUploading, navigationOptions: { title: "BulkUploading" } },
  Categoriessubcategories: { screen: Categoriessubcategories, navigationOptions: { title: "Categoriessubcategories" } },
  Share2: { screen: Share2, navigationOptions: { title: "Share2" } },
  ConnectedAccounts: { screen: ConnectedAccounts, navigationOptions: { title: "ConnectedAccounts" } },
  UploadMedia2: { screen: UploadMedia2, navigationOptions: { title: "UploadMedia2" } },
  Sorting: { screen: Sorting, navigationOptions: { title: "Sorting" } },
  Contactus: { screen: Contactus, navigationOptions: { title: "Contactus" } },
  Catalogue: { screen: Catalogue, navigationOptions: { title: "Catalogue" } },
  Payments: { screen: Payments, navigationOptions: { title: "Payments" } },
  Hyperpay: { screen: Hyperpay, navigationOptions: { title: "Hyperpay" } },
  OrderConfirm: { screen: OrderConfirm, navigationOptions: { title: "OrderConfirm" } },
  Dashboard: { screen: Dashboard, navigationOptions: { title: "Dashboard" } },
  Ordersummary: { screen: Ordersummary, navigationOptions: { title: "Ordersummary" } },
  Splashscreen: { screen: Splashscreen, navigationOptions: { title: "Splashscreen" } },
  TargetedFeed: { screen: TargetedFeed, navigationOptions: { title: "TargetedFeed" } },
  LiveChat2: { screen: LiveChat2, navigationOptions: { title: "LiveChat2" } },
  ProductDescription: { screen: ProductDescription, navigationOptions: { title: "ProductDescription" } },
  ReviewList: { screen: ReviewList, navigationOptions: { title: "ReviewList" } },
  Search: { screen: Search, navigationOptions: { title: "Search" } },
  CustomisedOrderStatus: { screen: CustomisedOrderStatus, navigationOptions: { title: "CustomisedOrderStatus" } },
  Sms2: { screen: Sms2, navigationOptions: { title: "Sms2" } },

});

const themeJson = require('./../blocks/studio-store-ecommerce-theme/src/theme.json');

const Footer = createBottomTabNavigator(
  {
    Catalogue: { screen: Catalogue, navigationOptions: { header: null, gestureEnabled: false } },
    Home: { screen: Search, navigationOptions: { header: null, title: 'Search' } },
    Categoriessubcategories: {
      screen: Categoriessubcategories,
      navigationOptions: { header: null, },
    },
    Profilebio: {
      screen: Profilebio,
      navigationOptions: { header: null, },
    },
  },
  {
    navigationOptions: ({ navigation }: any) => ({
      tabBarIcon: ({ tintColor, focused, iconIndex }: any) => {
        const { routeName } = navigation.state;
        if (routeName === 'Catalogue') {
          return (
            <View style={styles.outerContainer}>
              <View style={[styles.tabContainer, { borderTopColor: focused ? themeJson.attributes.primary_color : 'transparent' }]}>
                <Image source={focused ? IMG_CONST.HOME_ACTIVE : IMG_CONST.HOME_INACTIVE} style={styles.homeIcons} />
              </View>
            </View>
          )
        } else if (routeName === 'Home') {
          return (
            <View style={styles.outerContainer}>
              <View style={[styles.tabContainer, { borderTopColor: focused ? themeJson.attributes.primary_color : 'transparent' }]}>
                <Image source={focused ? IMG_CONST.SEARCH_ACTIVE : IMG_CONST.SEARCH_INACTIVE} style={styles.searchIcons} />
              </View>
            </View>
          )
        } else if (routeName === 'Categoriessubcategories') {
          return (
            <View style={styles.outerContainer}>
              <View style={[styles.tabContainer, { borderTopColor: focused ? themeJson.attributes.primary_color : 'transparent' }]}>
                <Image source={focused ? IMG_CONST.EXPLORE_ACTIVE : IMG_CONST.EXPLORE_INACTIVE} style={styles.exploreIcons} />
              </View>
            </View>
          )
        } else if (routeName === 'Profilebio') {
          return (
            <View style={styles.outerContainer}>
              <View style={[styles.tabContainer, { borderTopColor: focused ? themeJson.attributes.primary_color : 'transparent' }]}>
                <Image source={focused ? IMG_CONST.ACCOUNT_ACTIVE : IMG_CONST.ACCOUNT_INACTIVE} style={styles.profileIcons} />
              </View>
            </View>
          )
        }
      },
    }),
    tabBarOptions: {
      style: {
        display: "none",
        backgroundColor: "#ffffff",
        borderColor: '#ffffff',
        height: verticalScale(50),
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.55,
        elevation: 2,
      },
      showLabel: false,
      activeTintColor: '#EFBBCF',
      inactiveTintColor: '#ccc',

    },
  }
);

const MainNavigator = createStackNavigator({
  Footer: { screen: Footer, navigationOptions: { header: null, title: 'Home' } },
  Filteritems: { screen: Filteritems, navigationOptions: { header: null, } },
  Filteroptions: {
    screen: Filteroptions,
    navigationOptions: { header: null },
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: { header: null, },
  },

  Orderdetailview: {
    screen: Orderdetailview,
    navigationOptions: { header: null }
  },
  SubscriptionOrderList: {
    screen: SubscriptionOrderList,
    navigationOptions: { header: null }
  },
  WishList: {
    screen: WishList,
    navigationOptions: { header: null }
  },

  Search: { screen: Search, navigationOptions: { header: null } },
  Sorting: { screen: Sorting, navigationOptions: { title: 'Sorting' } },

  EditProfile: {
    screen: EditProfile,
    navigationOptions: { header: null }
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: { header: null }
  },
  HelpCenter: {
    screen: HelpCenter,
    navigationOptions: { header: null }
  },
  HelpCenterData: {
    screen: HelpCenterData,
    navigationOptions: { header: null }
  },
  ConnectedAccounts: {
    screen: ConnectedAccounts,
    navigationOptions: { header: null }
  },
  EditAddress: {
    screen: EditAddress,
    navigationOptions: { header: null }
  },
  ProductDescription: {
    screen: ProductDescription,
    navigationOptions: { header: null },
  },
  ReviewList: {
    screen: ReviewList,
    navigationOptions: { header: null },
  },
  SavedAddress: {
    screen: SavedAddress,
    navigationOptions: { header: null },
  },
  Contactus: {
    screen: Contactus,
    navigationOptions: { header: null },
  },

  Splashscreen: {
    screen: Splashscreen,
    navigationOptions: { title: 'Splashscreen' },
  },
  Shoppingcart: {
    screen: Shoppingcart,
    navigationOptions: { header: null },
  },
  Interactivefaqs: {
    screen: Interactivefaqs,
    navigationOptions: { header: null },
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: { header: null },
  },

  Profilebio: { screen: Profilebio, navigationOptions: { header: null } },
  WishList: { screen: WishList, navigationOptions: { header: null } },

  Ordersummary: {
    screen: Ordersummary,
    navigationOptions: { header: null },
  },
  Payments: { screen: Payments, navigationOptions: { header: null } },
  Hyperpay: { screen: Hyperpay, navigationOptions: { title: 'Hyperpay' } },
  OrderConfirm: {
    screen: OrderConfirm,
    navigationOptions: { header: null },
  },
  Ordermanagement: {
    screen: Ordermanagement,
    navigationOptions: { header: null },
  },

  InfoPage: { screen: InfoPage, navigationOptions: { title: 'Info' } },
  Auth: {
    screen: Auth,
    navigationOptions: { header: null, gestureEnabled: false }
  },
  Checkout: {
    screen: Checkout,
    navigationOptions: { header: null }
  },
  MainNavigator: { screen: Footer, navigationOptions: { header: null, gestureEnabled: false } },

});

const AuthNavigator = createStackNavigator({
  Auth: {
    screen: Auth,
    navigationOptions: { header: null, gestureEnabled: false }
  },
  OTPInputAuth: {
    screen: OTPInputAuth,
    navigationOptions: { header: null },
  },
  NewPassword: { screen: NewPassword, navigationOptions: { header: null } },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: { header: null },
  },

  MainNavigator: {
    screen: MainNavigator,
    navigationOptions: { header: null }
  },
},
  {
    initialRouteName: 'Auth',
  }
)

if (!HomeScreen.instance) {
  const defaultProps = {
    navigation: null,
    id: 'HomeScreen',
  };
  const homeScreen = new HomeScreen(defaultProps);
}

export interface Props {
  navigation: any;
}

const MainStackNavigator = createStackNavigator({
  Splashscreen: { screen: Splashscreen, navigationOptions: { header: null, gestureEnabled: false } },
  AuthNavigator: { screen: AuthNavigator, navigationOptions: { header: null, gestureEnabled: false } },
  MainNavigator: { screen: MainNavigator, navigationOptions: { header: null, gestureEnabled: false } },
});

export let appObj: any = {};

export default class App extends Component {
  constructor(props: any) {
    super(props);
    appObj = this;
    this.state = {
      isDeepLinkUtilised: false,
    };
    console.disableYellowBox = true;
    if (!__DEV__) {
      console.log = () => { };
    }
  }

  componentDidMount() {
    this.setDeepLink();
    this.setupNotification();
  }

  setDeepLink = () => {
    Linking.getInitialURL().then(url => {
      if (url) {
        this.deepLinkNavigate(url);
      }
    });
    Linking.addEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event: any) => { // D
    this.setState({ isDeepLinkUtilised: false }, () => {
    })
  }

  deepLinkNavigate = async (url: any) => {
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[0];
    let userToken = await StorageProvider.get('USER_TOKEN');
  }

  setupNotification = async () => {
    let accessToken = await StorageProvider.get('USER_TOKEN');
    if (!accessToken) {
      try {
        fcmService.register(
          (token: any) => this.onRegister(token),
          (notify: any) => this.onNotification(notify),
          (notify: any) => this.onOpenNotification(notify));
        localNotificationService.configure((notify: any) => this.onOpenNotification(notify));
      } catch (error) {
      }
    }
  }

  onRegister = async (token: any) => {
  }

  onNotification = (notify: any) => {
  }

  onOpenNotification = (notify: any) => {

  }

  render() {
    return (
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({

  outerContainer: {
    flex: 1,
  },
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: scale(2),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(17),
    width: scale(70),
  },
  homeIcons: {
    width: scale(28.8),
    height: scale(25),
  },

  exploreIcons: {
    width: scale(22),
    height: scale(22),
  },

  searchIcons: {
    width: scale(22.4),
    height: scale(22.5),
  },

  wishListIcons: {
    width: scale(24),
    height: scale(22),
  },

  profileIcons: {
    width: scale(6.2),
    height: scale(22.2),
  },
})
