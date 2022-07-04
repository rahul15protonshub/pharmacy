//@ts-ignore
import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
// @ts-ignore
import capitalize from "lodash/capitalize";
import classnames from "classnames";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";
// @ts-ignore
import content from "../../studio-store-ecommerce-components/src/content.js";
import NotificationController, { Props } from "./NotificationsController.web";
import "../assets/styles/deleteAddressModal.css";
import "../assets/styles/notifiaction.css";
import {
  listNotificationImg,
  deleteNotificationImg,
  emptyNotificationImg,
} from "./assets";
// Customizable Area Start
// Customizable Area End
export class Notifications extends NotificationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  async componentDidMount() {
    this.getAllNotificationsList();
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    return (
      <>
        {this.state?.loader && <Loader loading={this.state.loader} />}
        {/* @ts-ignore */}
        {this.state.notificationsList &&
        this.state.notificationsList?.length > 0 ? (
          <>
            <div className="profile-pg-inner-wrapper">
              <div className="profile-pg-sa-address-main-wrap">
                <div
                  className="read-delete-buttons"
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                >
                  <Button
                    data-testid={"button-deleteall"}
                    className="read-delete-btn button-deleteall"
                    style={{
                      background: "none",
                      border: "none",
                      color: "black",
                    }}
                    onClick={() => this.deleteAllNotifications()}
                  >
                    {content.deleteAll}
                  </Button>
                  <Button
                    data-testid={"button-readall"}
                    className="read-delete-btn button-readall"
                    style={{
                      background: "none",
                      border: "none",
                      color: "black",
                    }}
                    onClick={() => this.readAllNotifications()}
                  >
                    {content.readAll}
                  </Button>
                </div>
                <ul className="pp-sa-list-notify p-0 m-0 pp-sa-all-addres-list">
                  {/* @ts-ignore */}
                  {this.state?.notificationsList?.map(
                    (ele: any, index: number) => {
                      return (
                        <Fragment key={index}>
                          <li
                            data-testid={`content-notification-item`}
                            className={classnames({
                              active: this.state?.activeTab === "1",
                            })}
                            onClick={() => {
                              this.toggle("1");
                            }}
                            key={ele?.id}
                            title={
                              !ele?.attributes?.is_read &&
                              !ele?.attributes?.is_read
                                ? "Read Notification is Pending !!!"
                                : "Notification Read Successfully !!!"
                            }
                          >
                            <div
                              data-testid={`button-read-notification-item`}
                              onClick={() =>
                                this.readSingleNotificationBasedOnId(ele?.id)
                              }
                              className="profile-pg-address-list radius-10 profile-pg-mb-30"
                              style={
                                !ele?.attributes?.is_read &&
                                !ele?.attributes?.is_read
                                  ? {
                                      backgroundColor: "#3b5998",
                                      cursor: "pointer",
                                      color: "#ffffff",
                                    }
                                  : {
                                      cursor: "default",
                                      backgroundColor: "white",
                                    }
                              }
                            >
                              <div className="d-flex flex-wrap align-items-center">
                                <div className="pp-sa-img-wrap d-flex">
                                  <img
                                    src={listNotificationImg}
                                    width="65"
                                    height="65"
                                  />
                                  <div className="pp-sa-info-wrap pr-5">
                                    <h2 className="pp-sa-type mt-0">
                                      {
                                        /*x.address_type*/ capitalize(
                                          ele?.attributes?.name
                                        )
                                      }
                                    </h2>
                                    <p
                                      className="pp-sa-address mb-3"
                                      style={{ overflow: "hidden" }}
                                    >
                                      <span
                                        className="notification-title"
                                        style={
                                          !ele?.attributes?.is_read &&
                                          !ele?.attributes?.is_read
                                            ? { color: "#ffffff" }
                                            : {}
                                        }
                                      >
                                        {ele?.attributes?.title}
                                      </span>
                                    </p>
                                    <br />
                                    <span
                                      className="notification-sub-title"
                                      style={
                                        !ele?.attributes?.is_read &&
                                        !ele?.attributes?.is_read
                                          ? { color: "#ffffff" }
                                          : {}
                                      }
                                    >
                                      {ele?.attributes?.message}
                                    </span>
                                  </div>
                                </div>

                                <div className="pp-sa-action-wrap d-flex align-items-end justify-content-end">
                                  <div className="pp-sa-delet text-right pl-3">
                                    {/* @ts-ignore */}
                                    <p>
                                      {this.getDays(
                                        ele?.attributes?.created_at
                                      )}
                                    </p>
                                    {ele?.attributes?.is_read &&
                                    ele?.attributes?.is_read ? (
                                      <img
                                        data-testid={`button-delete-notification-item`}
                                        className="delete-btn"
                                        src={deleteNotificationImg}
                                        width="20"
                                        height="25"
                                        title={"Delete Notification!"}
                                        onClick={() => {
                                          this.setState({
                                            deleteNotificationID: ele?.id,
                                            isDeleteNotificationCheck: true,
                                          });
                                        }}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </Fragment>
                      );
                    }
                  )}
                </ul>
                <div className="loadMoreBtn">
                  {/* @ts-ignore */}
                  <div
                    data-testid={"button-load-more"}
                    className="yt-load-more"
                    onClick={() => {
                      this.getAllNotificationsList();
                      //@ts-ignore
                      window.scrollTo(0, 0);
                    }}
                  >
                    {this.state?.isShowLoadMore && content.loadMore}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="profile-pg-inner-wrap profile-pg-inner-no-add p-3 bg-white radius-10 profile-pg-mb-30">
              <div className="profile-pg-sa-no-address-main-wrap text-center">
                <img src={emptyNotificationImg} className="img-fluid mb-5" />
                <div className="pp-sa-no-add-wrap mt-2 mb-5">
                  <h2 className="pp-na-ttl mt-0 mb-3">
                    {content.noNotificationsTitle}
                  </h2>
                  <p className="pp-na-text mb-0">
                    {content.noNotificationsMessage}
                  </p>
                </div>
                <Button
                  data-testid={"button-continue-shopping"}
                  color=" pp-no-addr-btn py-3"
                  onClick={() =>
                    //@ts-ignore
                    this.props?.history?.push(
                      "/Filteroptions?&page=1&per_page=15&sort[order_by]=&sort[direction]="
                    )
                  }
                >
                  {content.continueShoppingButton}
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Delete Notification Modal */}
        <Modal
          modalClassName="popopop"
          className="cm-small-modal-4"
          centered={true}
          isOpen={this.state?.isDeleteNotificationCheck}
          toggle={() => this.deleteNotificationModalClose()}
        >
          <ModalHeader
            toggle={() => this.deleteNotificationModalClose()}
            className="delete-addr-title-bar border-0"
          >
            <span>{content.deleteNotificationTitleMessage}</span>
          </ModalHeader>
          <ModalBody>
            <div className="text-center delete-addr-body-text px-0 pt-4">
              {content.deleteNotificationContentMessage}
            </div>
          </ModalBody>
          <ModalFooter className="delete-addr-bottom-bar p-1 border-1 d-flex justify-content-between">
            <Button
              data-testid={"button-delete-notification-close"}
              color="secondary pp-delete-addr-btn-modal p-3 pp-delete-addr-btn-light-grey mr-1"
              onClick={() => this.deleteNotificationModalClose()}
            >
              {content.cancel}
            </Button>
            <span className="yt-form-spacer" />
            <Button
              data-testid={"button-delete-single-notification"}
              color="secondary pp-delete-addr-btn-modal p-3 pp-delete-addr-btn-dark-grey ml-1"
              onClick={() => this.deleteSingleNotificationOnId()}
            >
              {content.yesDelete}
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
    // Customizable Area End
  }
}

// @ts-ignore
export default withRouter(Notifications);
// Customizable Area Start
// Customizable Area End
