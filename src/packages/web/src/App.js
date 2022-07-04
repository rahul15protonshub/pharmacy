// App.js - WEB
import React, { Component } from 'react';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTopButton from 'react-scroll-to-top';
import HomeScreen from '../../components/src/HomeScreen';
import InfoPage from '../../blocks/info-page/src/InfoPageBlock';
import AlertBlock from '../../blocks/alert/src/AlertBlock.web';
import WebRoutes from './WebRoutes';
import { ToastContainer } from 'react-toastify';
import AdHocReporting2 from "../../blocks/AdHocReporting2/src/AdHocReporting2";
import EmailLists from "../../blocks/EmailLists/src/EmailLists";
import ApiIntegration19 from "../../blocks/ApiIntegration19/src/ApiIntegration19";
import AdminConsole3 from "../../blocks/AdminConsole3/src/AdminConsole3";
import Reviews2 from "../../blocks/Reviews2/src/Reviews2";
import BulkUploading from "../../blocks/BulkUploading/src/BulkUploading";
import Share2 from "../../blocks/Share2/src/Share2";
import UploadMedia2 from "../../blocks/UploadMedia2/src/UploadMedia2";
import Dashboard from "../../blocks/dashboard/src/Dashboard";
import TargetedFeed from "../../blocks/TargetedFeed/src/TargetedFeed";
import LiveChat2 from "../../blocks/LiveChat2/src/LiveChat2";
import CustomisedOrderStatus from "../../blocks/CustomisedOrderStatus/src/CustomisedOrderStatus";
import Sms2 from "../../blocks/Sms2/src/Sms2";


const routeMap = {
AdHocReporting2:{
 component:AdHocReporting2,
path:"/AdHocReporting2"},
EmailLists:{
 component:EmailLists,
path:"/EmailLists"},
ApiIntegration19:{
 component:ApiIntegration19,
path:"/ApiIntegration19"},
AdminConsole3:{
 component:AdminConsole3,
path:"/AdminConsole3"},
Reviews2:{
 component:Reviews2,
path:"/Reviews2"},
BulkUploading:{
 component:BulkUploading,
path:"/BulkUploading"},
Share2:{
 component:Share2,
path:"/Share2"},
UploadMedia2:{
 component:UploadMedia2,
path:"/UploadMedia2"},
Dashboard:{
 component:Dashboard,
path:"/Dashboard"},
TargetedFeed:{
 component:TargetedFeed,
path:"/TargetedFeed"},
LiveChat2:{
 component:LiveChat2,
path:"/LiveChat2"},
CustomisedOrderStatus:{
 component:CustomisedOrderStatus,
path:"/CustomisedOrderStatus"},
Sms2:{
 component:Sms2,
path:"/Sms2"},

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
      <div style={{ overflow: 'hidden' }}>
        <div>
          <WebRoutes />
          <ScrollToTopButton smooth top={200} />
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;