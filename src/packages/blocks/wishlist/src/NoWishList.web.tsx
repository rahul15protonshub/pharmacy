//@ts-ignore
import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import "../assets/styles/nowishlist.scoped.css";
// @ts-ignore
import content from "../../studio-store-ecommerce-components/src/content";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";
import { emptyOrdersAndWishlistImg } from "./assets";
// Customizable Area Start
// Customizable Area End
interface Props {
  history: any;
  loading: boolean;
  // Customizable Area Start
  // Customizable Area End
}

export class NoWishList extends React.Component<Props> {
  // Customizable Area Start
  // Customizable Area End
  routeToshop = () => {
    this.props?.history?.push(
      `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc&[newArrivals]=true`
    );
  };

  render() {
    // Customizable Area Start
    return (
      <div className="profile-pg-inner-wrap profile-pg-inner-no-order p-3 bg-white radius-10 mb-4">
        <div className="profile-pg-inner-wrapper">
          <div className="profile-pg-order-main-wrap text-center ">
            <Loader loading={this.props.loading} />
            <img src={emptyOrdersAndWishlistImg} className="img-fluid  mb-5" />
            <div className="pp-sa-order-wrap mb-5 mt-2">
              <h2 className="pp-od-no-ttl mt-0 mb-3">{content.noWishlist}</h2>
              <p className="pp-od-no-text mb-0">{content.youHaveNotWishlist}</p>
            </div>
            <Button
              data-testid={"button-browse-products"}
              color="pp-no-order-btn no-wishlist py-3 px-3"
              onClick={this.routeToshop}
            >
              {content.browseProducts}
            </Button>
          </div>
        </div>
      </div>
    );
    // Customizable Area End
  }
}
// @ts-ignore
export default withRouter(NoWishList);
// Customizable Area Start
// Customizable Area End
