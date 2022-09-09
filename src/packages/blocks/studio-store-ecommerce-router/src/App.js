// App.js - WEB
import React, { Component } from 'react';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTopButton from 'react-scroll-to-top';
import HomeScreen from '../../../components/src/HomeScreen';
import InfoPage from '../../info-page/src/InfoPageBlock';
import AlertBlock from '../../alert/src/AlertBlock.web';
import WebRoutes from './WebRoutes';
import { ToastContainer } from 'react-toastify';
// import Sms2 from "../../Sms2/src/Sms2";
// import PhoneLogin from "../../PhoneLogin/src/PhoneLogin";
// import GoogleLogin14 from "../../GoogleLogin14/src/GoogleLogin14";
// import FacebookLogin from "../../FacebookLogin/src/FacebookLogin";
// import DiscountsOffers from "../../DiscountsOffers/src/DiscountsOffers";
// import RolesPermissions2 from "../../RolesPermissions2/src/RolesPermissions2";
// import ShippingChargeCalculator from "../../ShippingChargeCalculator/src/ShippingChargeCalculator";
// import CouponCodeGenerator from "../../CouponCodeGenerator/src/CouponCodeGenerator";
// import UploadMedia2 from "../../UploadMedia2/src/UploadMedia2";
// import BulkUploading from "../../BulkUploading/src/BulkUploading";
// import SplashScreen2 from "../../SplashScreen2/src/SplashScreen2";
// import AddressManagement from "../../AddressManagement/src/AddressManagement";
// import CustomisedOrderStatus from "../../CustomisedOrderStatus/src/CustomisedOrderStatus";
// import EmailLists from "../../EmailLists/src/EmailLists";
// import TargetedFeed from "../../TargetedFeed/src/TargetedFeed";
// import AdminConsole3 from "../../AdminConsole3/src/AdminConsole3";
// import Share from "../../Share/src/Share";
// import Dashboard from "../../dashboard/src/Dashboard";
// import AdHocReporting from "../../AdHocReporting/src/AdHocReporting";
// import Reviews from "../../Reviews/src/Reviews";
// import InvoiceBilling from "../../InvoiceBilling/src/InvoiceBilling";
// import LiveChat2 from "../../LiveChat2/src/LiveChat2";
// import ApiIntegration12 from "../../ApiIntegration12/src/ApiIntegration12";


const routeMap = {
  // Sms2:{
  //  component:Sms2,
  // path:"/Sms2"},
  // PhoneLogin:{
  //  component:PhoneLogin,
  // path:"/PhoneLogin"},
  // GoogleLogin14:{
  //  component:GoogleLogin14,
  // path:"/GoogleLogin14"},
  // FacebookLogin:{
  //  component:FacebookLogin,
  // path:"/FacebookLogin"},
  // DiscountsOffers:{
  //  component:DiscountsOffers,
  // path:"/DiscountsOffers"},
  // RolesPermissions2:{
  //  component:RolesPermissions2,
  // path:"/RolesPermissions2"},
  // ShippingChargeCalculator:{
  //  component:ShippingChargeCalculator,
  // path:"/ShippingChargeCalculator"},
  // CouponCodeGenerator:{
  //  component:CouponCodeGenerator,
  // path:"/CouponCodeGenerator"},
  // UploadMedia2:{
  //  component:UploadMedia2,
  // path:"/UploadMedia2"},
  // BulkUploading:{
  //  component:BulkUploading,
  // path:"/BulkUploading"},
  // SplashScreen2:{
  //  component:SplashScreen2,
  // path:"/SplashScreen2"},
  // AddressManagement:{
  //  component:AddressManagement,
  // path:"/AddressManagement"},
  // CustomisedOrderStatus:{
  //  component:CustomisedOrderStatus,
  // path:"/CustomisedOrderStatus"},
  // EmailLists:{
  //  component:EmailLists,
  // path:"/EmailLists"},
  // TargetedFeed:{
  //  component:TargetedFeed,
  // path:"/TargetedFeed"},
  // AdminConsole3:{
  //  component:AdminConsole3,
  // path:"/AdminConsole3"},
  // Share:{
  //  component:Share,
  // path:"/Share"},
  // Dashboard:{
  //  component:Dashboard,
  // path:"/Dashboard"},
  // AdHocReporting:{
  //  component:AdHocReporting,
  // path:"/AdHocReporting"},
  // Reviews:{
  //  component:Reviews,
  // path:"/Reviews"},
  // InvoiceBilling:{
  //  component:InvoiceBilling,
  // path:"/InvoiceBilling"},
  // LiveChat2:{
  //  component:LiveChat2,
  // path:"/LiveChat2"},
  // ApiIntegration12:{
  //  component:ApiIntegration12,
  // path:"/ApiIntegration12"},

  Home: {
    component: HomeScreen,
    path: '/',
    exact: true
  },
  InfoPage: {
    component: InfoPage,
    path: '/InfoPage'
  },

  AlertWeb: {
    component: AlertBlock,
    path: '*/AlertWeb',
    modal: true
  }
};

const firebaseAPI = firebase.initializeApp({
  apiKey: 'AIzaSyDgl9aTbKMdRZ9-ijSZRionh3V591gMJl4',
  authDomain: 'rnmasterapp-c11e9.firebaseapp.com',
  databaseURL: 'https://rnmasterapp-c11e9.firebaseio.com',
  projectId: 'rnmasterapp-c11e9',
  storageBucket: 'rnmasterapp-c11e9.appspot.com',
  messagingSenderId: '649592030497',
  appId: '1:649592030497:web:7728bee3f2baef208daa60',
  measurementId: 'G-FYBCF3Z2W3'
});

class App extends Component {
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ loader: true });
  }

  render() {
    return (
      <div className='d-flex flex-column h-100'>
        <WebRoutes />
        <ScrollToTopButton smooth top={200} />
        <ToastContainer />
      </div>
    );
  }
}

export default App;