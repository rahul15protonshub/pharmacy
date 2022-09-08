
//@ts-nocheck
import React, { Component } from "react";
import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const LoginScreen = lazy(() =>
  import("../../email-account-login/src/LoginScreen.web")
);
const ForgotPassword = lazy(() =>
  import("../../forgot-password/src/ForgotPassword.web")
);
const HelpCenterBlock = lazy(() =>
  import("../../helpcenter/src/HelpCenterBlock.web")
);
const AboutUs = lazy(() => import("../../contactus/src/AboutUsBlock.web"));
const Profilebio = lazy(() =>
  import("../../profilebio/src/index.web")
);
const OTPConfirm = lazy(() =>
  import("../../otp-input-confirmation/src/OTPConfirmation.web")
);
const Cart = lazy(() => import("../../shoppingcart/src/ShoppingCart.web"));
const ContactusScreen = lazy(() => import("../../contactus/src/ContactUs.web"));
const HomeDashboard = lazy(() => import("../../dashboard/src/Dashboard.web"));
const ProductDetails = lazy(() =>
  import("../../dashboard/src/ProductDetails.web")
);
const OrderDetailsBlog = lazy(() =>
  import("../../orderdetailview/src/OrderDetails.web")
);
import ProtectedRoute from "./protectedRoute.web";
const Filteroptions = lazy(() =>
  import("../../filteritems/src/Filteroptions.web")
);
const Checkout = lazy(() => import("../../shoppingcart/src/Checkout.web"));
const Header = lazy(() =>
  import("../../studio-store-ecommerce-components/src/AppHeader/")
);
const Footer = lazy(() =>
  import("../../studio-store-ecommerce-components/src/AppFooter")
);
const OrderSummary = lazy(() =>
  import("../../ordersummary/src/OrderSummary.web")
);
const OrderPlaced = lazy(() =>
  import("../../ordersummary/src/orderPlaced.web")
);
const transactionfailed = lazy(() =>
  import("../../ordersummary/src/transactionfailed.web")
);
import PrivateRoute from "./privateRoute.web";
import ProtectRouting from "./ProtectRouting.web";
//@ts-ignore
const themes = require("../../studio-store-ecommerce-theme/src/theme.json");
import "./App.css";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";

class DebugRouter extends Router {
  constructor(props) {
    super(props);
    console.log("initial history is: ", JSON.stringify(this.history, null, 2));
    this.history.listen((location, action) => {
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash
        }`
      );
      console.log(
        `The last navigation action was ${action}`,
        JSON.stringify(this.history, null, 2)
      );
    });

    let STORE_BASE_PATH_NAME = "/";

    try {
      STORE_BASE_PATH_NAME =
        new URL(`${process.env.REACT_APP_BASE_URL}`).pathname ?? "";
    } catch { }

    console.log(`STORE_BASE_PATH_NAME::${STORE_BASE_PATH_NAME}`);
  }
}

class WebRoutes extends Component {
  render() {
    const { history } = this.props;
    const Appthem = JSON.parse(localStorage.getItem("appThemData") ?? "{}");
    const StripePubKey = Appthem?.PaymentKeys?.stripe?.stripe_pub_key
      ? Appthem?.PaymentKeys?.stripe?.stripe_pub_key
      : themes?.attributes?.stripe?.stripe_pub_key;
    const stripePromise = loadStripe(StripePubKey);

    let STORE_BASE_PATH_NAME = "/";

    try {
      STORE_BASE_PATH_NAME =
        new URL(`${process.env.REACT_APP_BASE_URL}`).pathname ?? "";
    } catch { }

    return (
      <Elements stripe={stripePromise}>
        <Router history={history} basename={STORE_BASE_PATH_NAME}>
          <div>
            <Suspense fallback={<Loader loading={true} />}>
              <Header />
              <div>
                <Switch>
                  <PrivateRoute path="/" exact component={LoginScreen} />
                  <Route
                    path="/login"
                    exact
                    render={(props) => <LoginScreen {...props} />}
                  />
                  <Route
                    path="/forgotpassword"
                    exact
                    component={ForgotPassword}
                  />
                  {/* Protect Roues Start */}
                  <ProtectedRoute
                    path="/home-page"
                    exact
                    component={HomeDashboard}
                  />
                  <ProtectRouting
                    path="/otpconfirm"
                    exact
                    component={OTPConfirm}
                  />
                  <Route
                    path="/help-center"
                    exact
                    component={HelpCenterBlock}
                  />
                  <Route
                    path="/help-center/:slug"
                    exact
                    component={HelpCenterBlock}
                  />
                  <Route path="/aboutus" exact component={AboutUs} />
                  <ProtectRouting
                    path="/contact-us"
                    exact
                    component={ContactusScreen}
                  />
                  <ProtectRouting
                    path="/filterOptions"
                    component={Filteroptions}
                  />
                  <ProtectRouting
                    path="/profile/myorder/:orderId/:itemId"
                    exact
                    component={OrderDetailsBlog}
                  />
                  <ProtectRouting path="/cart" exact component={Cart} />
                  <ProtectRouting
                    path="/shop/:id"
                    exact
                    component={ProductDetails}
                  />
                  <ProtectRouting path="/checkout" exact component={Checkout} />
                  <ProtectRouting
                    path="/order-summary"
                    exact
                    component={OrderSummary}
                  />
                  <ProtectRouting
                    path="/order-placed"
                    exact
                    component={OrderPlaced}
                  />
                  <ProtectRouting
                    path="/transactionfailed"
                    exact
                    component={transactionfailed}
                  />
                  {/* Protect Route End */}

                  {/* Profile Protect Route start */}
                  <ProtectedRoute path="/profilebio" component={Profilebio} />
                  {/* Profile Protect Route End */}

                  {/* Global catch start */}
                  <Route component={LoginScreen} />
                  {/* Global catch end */}
                </Switch>
                <Footer history={history} basename={STORE_BASE_PATH_NAME} />
              </div>
            </Suspense>
          </div>
        </Router>
      </Elements>
    );
  }
}

export default withRouter(WebRoutes);



