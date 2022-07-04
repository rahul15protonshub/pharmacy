import React from "react";
import { withRouter } from "react-router-dom";
import StripePayment from "./StripePayment";

export const configJSON = require("./config");
import StripeWebController from "./StripeWebController";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";
// Customizable Area Start
// Customizable Area End

class StripePayments extends StripeWebController {
  // Customizable Area Start
  render() {
    return (
      <>
        <StripePayment handleSubmit={this.handleSubmit} {...this.props} />
        <Loader loading={this.state.loading} />
      </>
    );
  }
  // Customizable Area End
}

// @ts-ignore
export default withRouter(StripePayments);
export { StripePayments };
// Customizable Area Start
// Customizable Area End
