import React from "react";
import { ModalBody, TabContent, TabPane, Modal, ModalHeader } from "reactstrap";
import classnames from "classnames";
import EmailAccountLoginController, {
  Props,
} from "./EmailLoginAccountController.web";
import EmailAccountLoginBlock from "./EmailAccountLogin.web";
import EmailAccountRegistrationController from "../../email-account-registration/src/EmailRegistartion.web";
//@ts-ignore
import content from "../../studio-store-ecommerce-components/src/content.js";
import "../assets/styles/emailLogin.css";
// Customizable Area Start
// Customizable Area End
class LoginScreen extends EmailAccountLoginController {
  // Customizable Area Start
  // Customizable Area End
  async componentDidMount() {
    if (this.props?.location?.state?.activeTab) {
      this.setState({
        activeTab: this.props?.location?.state?.activeTab,
        isOpenPopUp: true,
      });
      this.toggle(this.props?.location?.state?.activeTab);
    }
    const tokenn = localStorage.getItem("token");
    if (tokenn) {
      this.setState({
        isOpenPopUp: false,
      });
    } else {
      this.setState({
        isOpenPopUp: true,
      });
    }
    // Customizable Area Start
    if (localStorage.getItem("appThemData") == null) {
      setInterval(() => {
        this.setState({
          loading: true,
        });
      }, 800);
    }
    // Customizable Area End
  }
  toggle = (tab: any) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };
  render() {
    // Customizable Area Start
    return (
      <>
        <div style={{ marginTop: 15 }}>
          {this.state.isOpenPopUp ? (
            <Modal isOpen={this.state.isOpenPopUp}>
              <ModalBody>
                <div className="yt-login-wrap yt-lp-mb-5 yt-lp-mt-4">
                  <div className="d-flex flex-wrap yt-login-row">
                    <div className="yt-login-inner-content yt-login-col yt-login-form-wrapper">
                      <ul className="p-0 m-0 yt-login-list-style-none lp-tabs-name d-flex">
                        <li
                          className={classnames({
                            active: this.state.activeTab === "1",
                          })}
                          onClick={() => {
                            this.toggle("1");
                          }}
                        >
                          {content.signup}
                        </li>
                        <li
                          className={classnames({
                            active: this.state.activeTab === "2",
                          })}
                          onClick={() => {
                            this.toggle("2");
                          }}
                        >
                          {content.login}
                        </li>
                      </ul>
                      <div className="yt-lptab-content">
                        <TabContent activeTab={this.state.activeTab}>
                          <TabPane tabId="1">
                            <EmailAccountRegistrationController
                              //@ts-ignore
                              isOpenPopUp={this.state.isOpenPopUp}
                            />
                          </TabPane>
                        </TabContent>
                        <TabContent activeTab={this.state.activeTab}>
                          <TabPane tabId="2">
                            <EmailAccountLoginBlock />
                          </TabPane>
                        </TabContent>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </Modal>
          ) : (
            <div className="yt-login-wrap yt-lp-mb-5 yt-lp-mt-4">
              <div className="d-flex flex-wrap yt-login-row">
                <div className="yt-login-inner-content yt-login-col yt-login-form-wrapper">
                  <ul className="p-0 m-0 yt-login-list-style-none lp-tabs-name d-flex">
                    <li
                      className={classnames({
                        active: this.state.activeTab === "1",
                      })}
                      onClick={() => {
                        this.toggle("1");
                      }}
                    >
                      {content.signup}
                    </li>
                    <li
                      className={classnames({
                        active: this.state.activeTab === "2",
                      })}
                      onClick={() => {
                        this.toggle("2");
                      }}
                    >
                      {content.login}
                    </li>
                  </ul>
                  <div className="yt-lptab-content">
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <EmailAccountRegistrationController />
                      </TabPane>
                    </TabContent>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="2">
                        <EmailAccountLoginBlock />
                      </TabPane>
                    </TabContent>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
}

export default LoginScreen;
// Customizable Area Start
// Customizable Area End
