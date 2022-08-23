//@ts-nocheck;
import React from "react";
import { withRouter } from "react-router-dom";
// @ts-ignore
import classnames from "classnames";
import {
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Modal,
  ModalBody,
  Button,
  FormGroup,
  Form,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
//@ts-ignore;
import isEmpty from "lodash/isEmpty";
//@ts-ignore;
import map from "lodash/map";
import "../assets/styles/index.scoped.css";
import "../assets/styles/logoutModal.css";
import "../assets/styles/addressStyles.css";
// @ts-ignore
import content from "../../studio-store-ecommerce-components/src/content";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";
import SavedAddress from "./Address.web";
import Profilebio from "./Profilebio.web";
import ProfileBreadcrumbs from "./ProfileBreadcrumbs";
import NoOrder from "../../ordermanagement/src/NoOrder.web";
import SingleOrder from "../../ordermanagement/src/SingleOrders.web";
import NoWishList from "../../wishlist/src/NoWishList.web";
import WishList from "../../wishlist/src/WishList.web";
import Notifications from "../../notifications/src/Notifications.web";
import ProfileWebController, { Props } from "./ProfileWebController.web";
import {
  emptyProfile,
  wishlistImg,
  addressImg,
  connectedImg,
  helpcenterImg,
  notificationImg,
  logoutImg,
  orderImg,
} from "./assets";
// Customizable Area Start
import CircularProgress from "@material-ui/core/CircularProgress";
import ConnectedAccounts from "../../connectedaccounts/src/ConnectedAccounts.web";
// Customizable Area End

class ProfileBlock extends ProfileWebController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  contentSidebarTitle(activeTab: any) {
    // Customizable Area Start
    if (activeTab) {
      switch (activeTab) {
        case "1":
          return "Profile";
        case "2":
          return "Wishlist";
        case "3":
          return "My Orders";
        case "4":
          return "Saved Addresses";
        case "5":
          return "Connected Accounts";
        case "6":
          return "Help Center";
        case "7":
          return "Notification";
        default:
          return "Profile";
      }
    }
    return <></>;
    // Customizable Area End
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    let tokenn = await localStorage.getItem("token");
    const guestUUID = localStorage.getItem("guestUUID");
    const userImg = localStorage.getItem("profileImage");
    if (tokenn && guestUUID && !userImg) {
      this.props.history?.push("/login");
    }

    if (this.props?.location?.state?.activeTab) {
      if (this.props?.location?.state?.activeTab === "logout") {
        this.openLogoutModal();
      } else {
        this.routeToProfile(this.props?.location?.state?.activeTab);
      }
    }
    if (
      JSON.parse(localStorage.getItem("appThemData") ?? "{}")?.ExtraFields
        ?.is_facebook_login ||
      JSON.parse(localStorage.getItem("appThemData") ?? "{}")?.ExtraFields
        ?.is_google_login
    ) {
      this.setState({
        isConnectedAccountsShow: true,
      });
    }
    this.updatingProfileData();
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    window.scrollTo(0, 0);
    if (
      JSON.parse(localStorage.getItem("appThemData") ?? "{}")?.ExtraFields
        ?.is_facebook_login ||
      JSON.parse(localStorage.getItem("appThemData") ?? "{}")?.ExtraFields
        ?.is_google_login
    ) {
      this.setState({
        isConnectedAccountsShow: true,
      });
    }
    console.log(nextProps, "nextProps");
    if (nextProps?.location?.state?.activeTab) {
      if (nextProps?.location?.state?.activeTab !== this.state.activeTab) {
        if (nextProps?.location?.state?.activeTab === "logout") {
          this.openLogoutModal();
        } else {
          this.routeToProfile(nextProps?.location?.state?.activeTab);
        }
      }
    }
  }
  // Customizable Area End

  intialBread = () => {
    this.setState({
      activeTab: "1",
    });
  };

  updatingProfileData = async () => {
    const ne = localStorage.getItem("userData");
    const imgP = await localStorage.getItem("profileImage");
    if (ne) {
      const userDetails = JSON.parse(ne);
      this.setState({
        ...this.state,
        //@ts-ignore
        data: JSON.parse(localStorage.getItem("userData") ?? "{}"),
        profileImage: localStorage.getItem("profileImage"),
      });
    }
    this.getOrders();
    console.log("getishlist---3");

    this.getWishList();
  };

  // Customizable Area Start
  public shouldComponentUpdate(a: any, b: any) {
    if (b.activeTab || this.props?.location?.state?.activeTab) {
      return true;
    } else {
      return true;
    }
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    const { loadingOrder, loadingWishlist, totalNotifications } = this.state;
    return (
      <>
        <Container>
          <Loader loading={loadingOrder || loadingWishlist} />
          <Row>
            <Col md={12}>
              <ProfileBreadcrumbs
                intialBread={this.intialBread}
                onProfile={this.props}
                activeIndex={this.state.activeTab}
              />
            </Col>
          </Row>
          <section className="mb-4 d-block profile-pg-mb-30">
            <Row className="yt-cm-row flex-wrap">
              <Col md={3} lg={4} className="bb-cm-lt-col">
                <h2 className="yt-profile-mb-ttl profile-pg-title mb-4 mt-0">
                  {this.contentSidebarTitle(this.state.activeTab)}
                </h2>
                <div className="profile-pg-inner-wrap profile-inner-tab-wrap p-40 bg-white radius-10 profile-pg-mb-10">
                  <div className="profile-pg-inner-contnet">
                    <ul className="p-0 m-0 list-style-none profile-pg-tabs-name pg-profile-box">
                      <li
                        className={classnames({
                          "pt-0 active": this.state.activeTab === "1",
                          "pt-0": this.state.activeTab !== "1",
                        })}
                        onClick={() => {
                          this.routeToProfile("needtocheck");
                        }}
                      >
                        {this.state.data &&
                        Object.keys(this.state.data).length == 0 ? (
                          <></>
                        ) : (
                          <div className="d-flex align-items-center">
                            <div className="img-upload d-flex align-items-center justify-content-center">
                              <img
                                alt="Profile Pics"
                                src={
                                  this.state.profileImage &&
                                  this.state.profileImage &&
                                  this.state.profileImage !== "null"
                                    ? this.state.profileImage
                                    : emptyProfile
                                }
                                className="img-fluid"
                              />
                            </div>

                            <div className="user-profileinfo ml-3">
                              <h3 className="profile-name mt-0">
                                {this.state.data && this.state.data.name
                                  ? this.state.data.name
                                  : this.state.userName}
                              </h3>
                              <h5 className="profile-email mb-0">
                                {this.state.data && this.state.data.email
                                  ? this.state.data.email
                                  : this.state.email}
                              </h5>
                            </div>
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="profile-pg-inner-wrap profile-inner-tab-content p-40 bg-white radius-10 profile-pg-mb-30">
                  <div className="profile-pg-inner-contnet">
                    <ul className="p-0 m-0 list-style-none profile-pg-tabs-name">
                      <li
                        className={classnames({
                          active: this.state.activeTab === "2",
                        })}
                        onClick={() => {
                          this.routeToProfile("wishlist");
                        }}
                      >
                        <div className="profile-item-wrap d-flex align-items-center">
                          <img
                            alt="Whish List"
                            src={wishlistImg}
                            width="65"
                            height="65"
                            className="profile-item-icn img-fluid mr-4"
                          />
                          <span className="profile-item-name">
                            {content.wishlist}
                          </span>
                          {this.state.wishlist?.length > 0 && (
                            <span className="profile-notiy">
                              {this.state.wishlist.length}
                            </span>
                          )}
                        </div>
                      </li>
                      <li
                        className={classnames({
                          active: this.state.activeTab === "3",
                        })}
                        onClick={() => {
                          this.routeToProfile("myorder");
                        }}
                      >
                        <div className="profile-item-wrap d-flex align-items-center">
                          <img
                            alt="My Order"
                            src={orderImg}
                            width="65"
                            height="65"
                            className="profile-item-icn img-fluid mr-4"
                          />
                          <span className="profile-item-name">
                            {content.myOrders}
                          </span>
                        </div>
                      </li>
                      <li
                        className={classnames({
                          active: this.state.activeTab === "4",
                        })}
                        onClick={() => {
                          this.routeToProfile("saveaddresses");
                        }}
                      >
                        <div className="profile-item-wrap d-flex align-items-center">
                          <img
                            alt="Address"
                            src={addressImg}
                            width="65"
                            height="65"
                            className="profile-item-icn img-fluid mr-4"
                          />
                          <span className="profile-item-name">
                            {content.savedAddresses}
                          </span>
                        </div>
                      </li>
                      {this.state.isConnectedAccountsShow && (
                        <li
                          className={classnames({
                            active: this.state.activeTab === "5",
                          })}
                          onClick={() => {
                            this.routeToProfile("connectaccount");
                          }}
                        >
                          <div className="profile-item-wrap d-flex align-items-center">
                            <img
                              alt="connected"
                              src={connectedImg}
                              width="65"
                              height="65"
                              className="profile-item-icn img-fluid mr-4"
                            />
                            <span className="profile-item-name">
                              {content.connectedAccounts}
                            </span>
                          </div>
                        </li>
                      )}
                      <li
                        className={classnames({
                          active: this.state.activeTab === "6",
                        })}
                        onClick={() => {
                          this.routeToProfile("helpCenter");
                        }}
                      >
                        <div className="profile-item-wrap d-flex align-items-center">
                          <img
                            alt="Help Center"
                            src={helpcenterImg}
                            width="65"
                            height="65"
                            className="profile-item-icn img-fluid mr-4"
                          />

                          <span className="profile-item-name">
                            {content.helpCenter}
                          </span>
                        </div>
                      </li>
                      <li
                        className={classnames({
                          active: this.state.activeTab === "7",
                        })}
                        onClick={() => {
                          this.routeToProfile("notifications");
                        }}
                      >
                        <div className="profile-item-wrap d-flex align-items-center">
                          <img
                            alt="Notifications"
                            src={notificationImg}
                            width="65"
                            height="65"
                            className="profile-item-icn img-fluid mr-4"
                          />

                          <span className="profile-item-name">
                            {content.notification}
                          </span>
                          {/* @ts-ignore */}
                          {localStorage.getItem("notifctaion_len") != 0 && (
                            <span className="notifications-notiy">
                              {localStorage.getItem("notifctaion_len")}
                            </span>
                          )}
                        </div>
                      </li>
                      <li
                        className={classnames({
                          active: this.state.activeTab === "8",
                        })}
                        onClick={() => this.openLogoutModal()}
                      >
                        <div className="profile-item-wrap d-flex align-items-center">
                          <img
                            alt="Logout"
                            src={logoutImg}
                            width="65"
                            height="65"
                            className="profile-item-icn img-fluid mr-4"
                          />
                          <span
                            className="profile-item-name"
                            onClick={() => {
                              localStorage.removeItem("cart_length");
                              localStorage.removeItem("wishlist_len");
                            }}
                          >
                            {content.logout}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col md={9} lg={8} className="bb-cm-rt-col">
                <h2 className="profile-pg-title mb-4 mt-0">
                  {this.contentSidebarTitle(this.state.activeTab)}
                </h2>

                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    {/* @ts-ignore */}
                    <Profilebio updateProfile={this.updatingProfileData} />
                    {/* Tab 1 */}
                  </TabPane>
                </TabContent>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="2">
                    {this.state.loadingData ? (
                      <CircularProgress />
                    ) : (
                      <>
                        {/* @ts-ignore */}

                        {isEmpty(this.state.wishlist) && <NoWishList />}
                        {!isEmpty(this.state.wishlist) && (
                          <WishList
                            // @ts-ignore
                            productList={this.state.wishlist}
                            getWishList={this.getWishList}
                          />
                        )}
                      </>
                    )}
                  </TabPane>
                </TabContent>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="3">
                    {/* @ts-ignore */}
                    {isEmpty(this.state.orders) && <NoOrder />}
                    {!isEmpty(this.state.orders) && (
                      <>
                        <div className="order-data-scroll">
                          {map(
                            this.state.orders,
                            (ordr: any, index: number) => {
                              return (
                                <SingleOrder
                                  // @ts-ignore
                                  order={ordr}
                                  key={index}
                                  cancelOrder={this.cancelOrder}
                                  getOrders={this.getOrders}
                                />
                              );
                            }
                          )}
                        </div>
                        {/* {this.state.isLoadMoreOrders && (
                          // load more button content come here
                          <div className="loadMoreBtn">
                            <div
                              // @ts-ignore
                              outline
                              className="yt-load-more"
                              type="button"
                              onClick={() => {
                                this.getOrders();
                                //@ts-ignore
                                window.scrollTo(0, 0);
                              }}
                            >
                              {this.state?.isLoadMoreOrders && content.loadMore}
                            </div>
                          </div>
                        )} */}
                      </>
                    )}
                  </TabPane>
                </TabContent>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="4">
                    <SavedAddress />
                  </TabPane>
                </TabContent>
                {this.state.isConnectedAccountsShow && (
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="5">
                      <ConnectedAccounts />
                    </TabPane>
                  </TabContent>
                )}
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="6">helpCenter</TabPane>
                </TabContent>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="7">
                    {/* @ts-ignore */}
                    <Notifications total={this.state?.totalNotifications} />
                  </TabPane>
                </TabContent>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="8">
                    <Modal
                      modalClassName="popopop"
                      className="cm-small-modal-4"
                      isOpen={this.state.openLogoutModal}
                      toggle={() => this.deleteLogout()}
                      centered={true}
                    >
                      <ModalHeader
                        toggle={() => this.deleteLogout()}
                        className="log-out-title-bar  border-0"
                      >
                        <span>{content.logout}</span>
                      </ModalHeader>
                      <ModalBody className="yt-log-body-wrap">
                        <div className="text-center log-out-body-text">
                          {`Are you sure you want to logout from ${
                            JSON.parse(
                              localStorage.getItem("appThemData") ?? "{}"
                            )?.ExtraFields?.heading
                          } ?`}
                        </div>
                      </ModalBody>
                      <ModalFooter className="log-out-bottom-bar p-1 d-flex justify-content-between">
                        <Button
                          color="secondary pp-log-out-btn-modal p-3 pp-log-out-btn-light-grey"
                          onClick={() => this.deleteLogout()}
                        >
                          {content.cancel}
                        </Button>
                        <span className="yt-form-spacer" />
                        <Button
                          color="secondary pp-log-out-btn-modal p-3 pp-log-out-btn-dark-grey"
                          onClick={this.onHandleLogout}
                        >
                          {content.logout}
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </section>
        </Container>
      </>
    );
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
}
// @ts-ignore
export default withRouter(ProfileBlock);
export { ProfileBlock };
// Customizable Area Start
// Customizable Area End
