//@ts-ignore
import React, { Fragment } from "react";
import { Formik, Form, Field } from "formik";
import { Button, FormGroup } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaFacebookF, FaRegEnvelope } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
// @ts-ignore
import content from "../../studio-store-ecommerce-components/src/content";
import "../assets/styles/index.css";
import { EmailIcon, pwdIcon } from "./assets";
import EmailAccountLoginController, {
  Props,
} from "./EmailLoginAccountController.web";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";
// Customizable Area Start
// Customizable Area End
class EmailAccountLoginBlock extends EmailAccountLoginController {
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      // Customizable Area Start
      <>
        {this.state.loading && <Loader loading={this.state.loading} />}
        <div className="yt-login-inner-wrap">
          <h2 className="yt-login-tag-line">{content.getStarted}</h2>
          <div className="yt-login-form mb-4">
            <Formik
              initialValues={{ userEmail: "", password: "" }}
              onSubmit={this.signinUser}
              validationSchema={this.SigninSchema2}
            >
              {({ errors, touched, setValues, values }) => {
                return (
                  <Form translate="yes">
                    <FormGroup className={"yt-form-err"}>
                      <img
                        alt="Email Icon"
                        src={EmailIcon}
                        className={
                          errors.userEmail && touched.userEmail
                            ? " yt-login-icn"
                            : "yt-login-icn"
                        }
                      />
                      <Field
                        name="userEmail"
                        type="text"
                        placeholder="Email / Phone Number"
                        className={
                          "form-control" +
                          (errors.userEmail && touched.userEmail
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <span
                        id="yt-signup-email-error"
                        className="yt-login-message-show"
                      />
                      {touched.userEmail && errors.userEmail && (
                        <span
                          className="invalid-feedback"
                          style={{ position: "absolute" }}
                        >
                          {errors.userEmail}
                        </span>
                      )}
                    </FormGroup>

                    <FormGroup translate="yes" className="mt-3 ">
                      <img
                        alt="Password Icon"
                        src={pwdIcon}
                        className={
                          (errors.password && touched.password) ||
                          this.state.loginError.length > 0
                            ? " yt-login-icn2"
                            : "yt-login-icn"
                        }
                      />
                      <Field
                        name="password"
                        type={this.state.showPass ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        className={
                          "form-control" +
                          (errors.password && touched.password
                            ? " is-invalid invalid"
                            : "")
                        }
                      />
                      {touched.password && errors.password ? (
                        this.state.showPass ? (
                          <FaEyeSlash
                            onClick={this.showPassword}
                            className={
                              this.state.loginError.length > 0
                                ? "yt-login-pass-vie-icn2"
                                : "yt-login-pass-vie-icn"
                            }
                            style={{ marginRight: 20 }}
                          />
                        ) : (
                          <FaEye
                            onClick={this.showPassword}
                            className={
                              this.state.loginError.length > 0
                                ? "yt-login-pass-vie-icn2"
                                : "yt-login-pass-vie-icn"
                            }
                            style={{ marginRight: 20 }}
                          />
                        )
                      ) : this.state.showPass ? (
                        <FaEyeSlash
                          onClick={this.showPassword}
                          className={
                            this.state.loginError.length > 0
                              ? "yt-login-pass-vie-icn2"
                              : "yt-login-pass-vie-icn"
                          }
                        />
                      ) : (
                        <FaEye
                          onClick={this.showPassword}
                          className={
                            this.state.loginError.length > 0
                              ? "yt-login-pass-vie-icn2"
                              : "yt-login-pass-vie-icn"
                          }
                        />
                      )}
                      {touched.password && errors.password && (
                        <span
                          className="invalid-feedback"
                          style={{ position: "absolute" }}
                        >
                          {errors.password}
                        </span>
                      )}
                      {this.state.loginError.length > 0 ? (
                        <span
                          className="err_invalid mt-2"
                          style={{ position: "absolute" }}
                        >
                          {this.state.loginError}
                        </span>
                      ) : (
                        <></>
                      )}
                    </FormGroup>
                    <Fragment>
                      {this.state.showSpinner ? (
                        <CgSpinner
                          style={{
                            color: "black",
                            fontSize: 32,
                            width: "100%",
                            margin: 10,
                          }}
                          className="w3-spin"
                        />
                      ) : (
                        <Button
                          className="sign-in"
                          type="submit"
                          color="secondary yt-login-btn w3-ripple mt-5"
                          block
                        >
                          {content.signIn}
                        </Button>
                      )}
                    </Fragment>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="yt-login-bottom-info text-center mt-4 d-flex flex-column justify-content-center">
            <Button
              color="link yt-login-forget-pass"
              onClick={() => {
                this.routeToAll("forgotpassword");
                
              }}
            >
              {content.forgotPassword}
            </Button>
            {/* {JSON.parse(localStorage.getItem("appThemData") ?? "{}")?.ExtraFields?.is_facebook_login || JSON.parse(localStorage.getItem("appThemData") ?? "{}")?.ExtraFields?.is_google_login ? */}
            {this.state.isSocialLoginsEnabled ? (
              <>
                <p className="yt-login-via-tag mb-4">{content.continueVia}</p>
                <div className="d-flex align-items-center justify-content-center">
                  {/* @ts-ignore */}
                  {/* {JSON.parse(localStorage.getItem("appThemData") ?? "{}")?.ExtraFields?.is_facebook_login && */}
                  {this.state.isShowFb && (
                    <Button
                      onClick={() => this.connectFacebook()}
                      color="secondary d-flex  align-items-center mr-3 yt-login-via-fb"
                    >
                      <FaFacebookF className="mr-2" /> {content.facebook}
                    </Button>
                  )}
                  {/* @ts-ignore */}
                  {/* {JSON.parse(localStorage.getItem("appThemData") ?? "{}")?.ExtraFields?.is_google_login &&  */}
                  {this.state.isShowGoogle && (
                    <Button
                      onClick={() => this.connectGoogle()}
                      color="secondary d-flex align-items-center yt-login-via-email"
                    >
                      <FaRegEnvelope className="mr-2" /> {content.google}
                    </Button>
                  )}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="lp-bottom-links">
            <div className="mt-4">
              <p className="yt-login-aggre-tag mb-3 text-center">
                {content.bySigningIn}
              </p>
              <div className="d-flex yt-login-term-privacy-link justify-content-center">
                <Link to="/help-center/Terms%20Of%20Service">
                  {content.termNcondition}
                </Link>
                <span className="mx-2">&</span>
                <Link to="/help-center/Privacy%20Policy">
                  {content.privacyPolicy}
                </Link>
              </div>
            </div>
            {true && (
              <div className="mt-4 mt-4 text-center yt-skip-wrap">
                <span
                  style={{ cursor: "pointer" }}
                  className="yt-login-skip-btn"
                  onClick={() => this.guestLogin()}
                >
                  {content.skipAsGuest}
                </span>
              </div>
            )}
          </div>
        </div>
      </>
      // Customizable Area End
    );
  }
}

// @ts-ignore
export default withRouter(EmailAccountLoginBlock);
export { EmailAccountLoginBlock };
// Customizable Area Start
// Customizable Area End
