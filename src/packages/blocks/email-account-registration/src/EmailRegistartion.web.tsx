//@ts-nocheck;
import React, { Fragment } from "react";
import { Button, FormGroup, Alert } from "reactstrap";
import { Formik, Field, Form } from "formik";
import { Link, withRouter } from "react-router-dom";
import { FaFacebookF, FaRegEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import firebase from "firebase";
// @ts-ignore
import content from "../../studio-store-ecommerce-components/src/content";
import "../assets/styles/index.css";
import EmailAccountRegistrationController from "./EmailRegistartionController.web";
import {
  EmailIcon,
  pwdIcon,
  phoneIcon,
  userIcon,
  numberImg,
  logoImg,
} from "./assets";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";
// @ts-ignore
import includes from "lodash/includes";
// Customizable Area Start
// Customizable Area End
class EmailRegistartion extends EmailAccountRegistrationController {
  // Customizable Area Start
  // Customizable Area Start
  public shouldComponentUpdate(a: any, b: any) {
    if (b.showAlert) {
      setTimeout(() => {
        this.setState({
          showAlert: false,
          message: "",
          messageType: "",
        });
      }, 2000);
      return true;
    } else {
      return true;
    }
  }

  routeHelpCenter = (value: any) => {
    if (value !== undefined && includes(value.toLowerCase(), "about")) {
      //@ts-ignore
      this.props.history?.push("/aboutus");
    } else if (value !== undefined) {
      let path = "/help-center/" + value;
      //@ts-ignore
      this.props.history?.push(path);
    } else {
      let path = "/help-center";
      //@ts-ignore
      this.props.history?.push(path);
    }
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <>
        {this.state.loading && <Loader loading={this.state.loading} />}
        <div className="yt-signup-wrap">
          <h2 className="yt-signup-tag-line">{content.getStarted}</h2>
          {/* @ts-ignore */}
          <div className="yt-signup-form mb-4">
            <Formik
              initialValues={{
                FullName: "",
                Email: "",
                password: "",
                // , fullPhoneNumber: ""
              }}
              onSubmit={this.signupUser}
              validationSchema={this.signUpValidation2}
            >
              {({ errors, touched, setValues, values, handleSubmit }) => {
                return (
                  <Form translate="yes">
                    <FormGroup>
                      <img
                        alt="User Profile Image"
                        src={userIcon}
                        className={
                          errors.FullName && touched.FullName
                            ? " yt-login-icn2"
                            : "yt-login-icn"
                        }
                      />
                      <Field
                        name="FullName"
                        type="text"
                        id="FullName"
                        placeholder="Full Name"
                        className={
                          "form-control" +
                          (errors.FullName && touched.FullName
                            ? " is-invalid invalid"
                            : "")
                        }
                      />
                      <span
                        id="yt-signup-name-error"
                        className="yt-sign-up-message-show"
                      />
                      {touched.FullName && errors.FullName && (
                        <span
                          className="invalid-feedback"
                          style={{ position: "absolute" }}
                        >
                          {errors.FullName}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <img
                        alt="Email Icon"
                        src={EmailIcon}
                        className={
                          errors.Email && touched.Email
                            ? " yt-login-icn2"
                            : "yt-login-icn"
                        }
                      />
                      <Field
                        name="Email"
                        type="text"
                        placeholder="Email / Phone Number"
                        className={
                          "form-control" +
                          (errors.Email && touched.Email
                            ? " is-invalid invalid"
                            : "")
                        }
                      />
                      {touched.Email && errors.Email && (
                        <span
                          className="invalid-feedback"
                          style={{ position: "absolute" }}
                        >
                          {errors.Email}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup className="mb-4">
                      <img
                        alt="Password Icon"
                        src={pwdIcon}
                        //@ts-ignore
                        id={this.props?.isOpenPopUp ? "passwordkey" : ""}
                        className={
                          errors.password && touched.password
                            ? "yt-login-icn2"
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
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <br />
                      {touched.password && errors.password ? (
                        this.state.showPass ? (
                          <FaEyeSlash
                            onClick={this.showPassword}
                            style={{ marginRight: 20 }}
                            className="yt-login-pass-vie-icn"
                            //@ts-ignore
                            id={this.props?.isOpenPopUp ? "eyeicon" : ""}
                          />
                        ) : (
                          <FaEye
                            onClick={this.showPassword}
                            className="yt-login-pass-vie-icn"
                            //@ts-ignore
                            id={this.props?.isOpenPopUp ? "eyeicon" : ""}
                            style={{ marginRight: 20 }}
                          />
                        )
                      ) : this.state.showPass ? (
                        <FaEyeSlash
                          onClick={this.showPassword}
                          className="yt-login-pass-vie-icn"
                          //@ts-ignore
                          id={this.props?.isOpenPopUp ? "eyeicon" : ""}
                        />
                      ) : (
                        <FaEye
                          onClick={this.showPassword}
                          className="yt-login-pass-vie-icn"
                          //@ts-ignore
                          id={this.props?.isOpenPopUp ? "eyeicon" : ""}
                        />
                      )}
                      <span
                        className="yt-signup-pass-info pb-1"
                        //@ts-ignore
                        style={
                          this.props?.isOpenPopUp
                            ? {
                                opacity:
                                  touched.password && errors.password ? 0 : 1,
                                display: "block",
                              }
                            : {
                                opacity:
                                  touched.password && errors.password ? 0 : 1,
                              }
                        }
                      >
                        {content.passwordSuggestionMsg}
                      </span>
                      {touched.password && errors.password && (
                        <span
                          className="invalid-feedback pb-1"
                          style={{ position: "absolute" }}
                        >
                          {errors.password}
                        </span>
                      )}
                    </FormGroup>
                    {this.state.emailErr.length > 0 ? (
                      <span className="err_invalid">
                        {this.state.emailErr}
                        <br />
                      </span>
                    ) : (
                      <></>
                    )}
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
                          type="submit"
                          className="signup-btn w3-ripple"
                          block
                          color="secondary yt-signup-btn mt-5"
                        >
                          {content.signup}
                        </Button>
                      )}
                    </Fragment>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="yt-signup-bottom-info text-center">
            {true && (
              <div className="my-4text-center">
                <span
                  style={{ cursor: "pointer" }}
                  className="w3-ripple yt-signup-skip-btn"
                  onClick={() => this.guestRegister()}
                >
                  {content.skipAsGuest}
                </span>
              </div>
            )}
            {/* {JSON.parse(localStorage.getItem('appThemData') ?? "{}")?.ExtraFields?.is_facebook_login || JSON.parse(localStorage.getItem('appThemData') ?? "{}")?.ExtraFields?.is_google_login */}
            {this.state.isSocialLoginsEnabled ? (
              <>
                <p className="yt-signup-via-tag">{content.signupVia}</p>
                <div className="d-flex align-items-center justify-content-center">
                  {/* {JSON.parse(localStorage.getItem('appThemData') ?? "{}")?.ExtraFields?.is_facebook_login && */}
                  {this.state.isShowFb && (
                    <Button
                      // onClick={this.signUPnWithFacebook}
                      onClick={() => this.connectFacebook()}
                      color="secondary d-flex align-items-center mr-3 yt-signup-via-fb"
                    >
                      <FaFacebookF className="mr-2" /> {content.facebook}
                    </Button>
                  )}
                  {/* {JSON.parse(localStorage.getItem('appThemData') ?? "{}")?.ExtraFields?.is_google_login && */}
                  {this.state.isShowGoogle && (
                    <Button
                      // onClick={this.signUPnWithGoogle}
                      onClick={() => this.connectGoogle()}
                      color="secondary d-flex align-items-center yt-signup-via-email"
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
            <p className="yt-signup-aggre-tag mb-3 text-center">
              {content.bySigningIn}
            </p>
            <div className="d-flex yt-signup-term-privacy-link justify-content-center">
              <Link to="/help-center/Terms%20Of%20Service">
                {content.termNcondition}
              </Link>
              <span className="mx-2">&</span>
              <Link to="/help-center/Privacy%20Policy">
                {content.privacyPolicy}
              </Link>
            </div>
          </div>

          {/* showing alert's */}
          {this.state.showAlert ? (
            <>
              <Alert
                color={this.state.messageType ? this.state.messageType : ""}
              >
                {this.state.message && this.state.message}
              </Alert>
            </>
          ) : (
            ""
          )}
        </div>
      </>
    );
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
}

// @ts-ignore
export default withRouter(EmailRegistartion);
export { EmailRegistartion };
// Customizable Area Start
// Customizable Area End
