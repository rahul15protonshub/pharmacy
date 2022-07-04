//@ts-nocheck
import React from "react";
import { Button, FormGroup } from "reactstrap";
import { RiArrowLeftSLine } from "react-icons/ri";
import { Formik, Form, Field } from "formik";
import { withRouter } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import * as Yup from "yup";
// @ts-ignore
import content from "../../studio-store-ecommerce-components/src/content.js";
import "./css/index.css";
import "./css/indexConfrimAccount.css";
import OTPConfirmationController, {
  Props,
} from "./OTPConfirmationController.web";
//@ts-ignore
import isEmpty from "lodash/isEmpty";
import { emailIcon, logo, pwdIcon } from "./assets";

// validations start
const otpValidation = Yup.object().shape({
  otp: Yup.number()
    .typeError("Only numbers are allowed")
    .positive("Negative numbers are not allowed.")
    .integer("Number can't contain a decimal.")
    .min(10000, "Minimum 5 digits are required.")
    .max(99999, "Maximum 5 digits are allowed.")
    .required("OTP is required."),
});
//validations end
// Customizable Area Start
// Customizable Area End
export class OTPConfirmAccount extends OTPConfirmationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  componentDidMount() {
    this.startTimer();
    // Customizable Area Start
    // Customizable Area End
  }
  render() {
    // Customizable Area Start
    return (
      <div className="yt-fp-wrap">
        <span
          data-testid={"button-navigate"}
          className="d-flex navigate"
          onClick={() => {
            //@ts-ignore
            this.props?.history?.push({
              pathname: localStorage.getItem("token") ? "/" : "/",
            });
          }}
        >
          <RiArrowLeftSLine className="mr-2 yt-fp-back-icn" />
          <h3
            className="yt-fp-top-back-tag-name"
            style={{
              lineHeight: 1.11,
              fontFamily: "GTWalsheimPro-Bold",
              color: "#324688",
              fontSize: "18px",
              fontWeight: "bold",
              position: "relative",
              top: 10,
            }}
          >
            {content.otpVerification}
          </h3>
        </span>
        <h2
          className="yt-fp-tag-line"
          style={{
            fontFamily: "GTWalsheimPro-Regular-",
            color: "#3e454f",
            fontSize: "16px",
            lineHeight: 1.13,
          }}
        >
          {content.getStarted}
        </h2>
        <h2
          className="yt-fp-tag-line-2"
          style={{
            fontFamily: "GTWalsheimPro-Regular-",
            fontSize: "16px",
            color: "#8b8f95",
            lineHeight: 1.13,
          }}
        >
          {/* @ts-ignore */}
          {JSON.parse(localStorage.getItem("signUpUser"))?.accountType ==
          "PhoneAccount"
            ? content.otpHasBeenSenPhone
            : content.otpHasBeenSent}
        </h2>
        <div className="yt-fp-form">
          <Formik
            data-testid={"email-otp-form"}
            initialValues={{
              otp: "",
            }}
            onSubmit={(values) => this.sendEmailOTP(values)}
            validationSchema={otpValidation}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                handleSubmit,
                handleBlur,
                handleChange,
              } = props;
              return (
                <Form>
                  <FormGroup className="">
                    <img
                      src={emailIcon}
                      // src={require('./images/emal-icn.png')}
                      alt="email icon"
                      className={" yt-login-icn2"}
                    />
                    <Field
                      value={
                        JSON.parse(localStorage.getItem("signUpUser")).Email
                      }
                      className={"form-control"}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup className="">
                    <img
                      alt="Email Icon"
                      src={pwdIcon}
                      // src={require('./images/key-icn.png')}
                      className={
                        errors.otp && touched.otp
                          ? " yt-login-icn2"
                          : "yt-login-icn"
                      }
                    />
                    <Field
                      name="otp"
                      type="text"
                      placeholder="Enter OTP"
                      value={values.otp}
                      className={
                        "form-control" +
                        (errors.otp && touched.otp ? " is-invalid" : "")
                      }
                    />
                    {touched.otp && errors.otp && (
                      <span
                        className="invalid-feedback"
                        style={{ position: "absolute" }}
                      >
                        {errors.otp}
                      </span>
                    )}
                  </FormGroup>
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
                      color="secondary yt-login-btn mt-1"
                      block
                    >
                      {content.verifyOTP}
                    </Button>
                  )}
                  <>
                    {!this.state.otpToken && (
                      <div className="yt-forpass-bottom-info text-center mt-20">
                        <div>
                          {this.state.timer > 0 ? (
                            <div className="otp-timer">
                              00:{this.state.timer}
                            </div>
                          ) : (
                            <Button
                              color="link yt-resent-otp-btn"
                              onClick={this.resendOTP}
                            >
                              {content.resendOTP}
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    );
    // Customizable Area End
  }
}

export default withRouter(OTPConfirmAccount);
// Customizable Area Start
// Customizable Area End
