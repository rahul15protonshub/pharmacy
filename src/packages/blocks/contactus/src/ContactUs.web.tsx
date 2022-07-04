//@ts-nocheck
import { Formik } from "formik";
import React, { Fragment } from "react";
import { CgSpinner } from "react-icons/cg";
import { withRouter } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "reactstrap";
import * as yup from "yup";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";
import "../assets/css/styles.css";
import ContactusController from "./ContactUsController.web";
import SuccessBlock from "./SuccessBlock.web";
// Customizable Area Start
// Customizable Area End
const ContactusSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Minimum 3 characters are required")
    .max(20, "Maximum 20 characters are allowed.")
    .required("Name is required.")
    .matches(/^[a-zA-Z ]+$/, "Only alphabets are allowed."),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  phone: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .typeError("Only numbers are allowed.")
    .positive("Negative numbers are not allowed.")
    .integer("Phone can't contain a decimal.")
    .min(1000000000, "Enter valid Phone number(maximum 10 digits are allowed)")
    .max(9999999999, "Enter valid Phone number(maximum 10 digits are allowed)")
    .required("Phone Number is missing."),
  // title: yup.string().required('Purpose is required.'),
  message: yup
    .string()
    .typeError("Message is required.")
    .required("Message is required."),
});

// @ts-ignore
function FieldError({ error, touched }) {
  return error && touched ? (
    <div style={{ color: "#e65e52" }}>{error}</div>
  ) : null;
}

export class Contactus extends ContactusController {
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      userDetails: JSON.parse(localStorage.getItem("user") ?? "{}"),
      // Customizable Area Start
      // Customizable Area End
    });
  }
  render() {
    return (
      // Customizable Area Start
      <>
        {this.state.loading && <Loader loading={this.state.loading} />}
        {!this.state.messageSent && (
          <section className="contactform yt-main-contact-us-pg">
            <Container>
              <div className="yt-cm-mobile-bread">
                <div className="pageroute profile-pg-breadcrumbs">
                  <span
                    className="profile-pg-home"
                    onClick={() => {
                      this.props?.history?.push("/home-page");
                    }}
                  >
                    Home {">"}
                  </span>{" "}
                  <span className="">Contact Us</span>
                </div>
              </div>
              <div className="yt-main-wrapper2">
                <div className=" title">Contact us</div>
                <Formik
                  data-testid={"contactus-form"}
                  initialValues={{
                    name: this.state?.userDetails?.attributes?.full_name || "",
                    email: this.state?.userDetails?.attributes?.email || "",
                    phone:
                      this.state?.userDetails?.attributes?.full_phone_number?.slice(
                        2
                      ) || "",
                    // title: '',
                    message: "",
                  }}
                  onSubmit={(values, { resetForm }) => {
                    this.submitContactusForm(values);
                    resetForm({ values: "" });
                    //@ts-ignore
                    window.scrollTo(0, 0);
                  }}
                  validationSchema={ContactusSchema}
                >
                  {({
                    values,
                    handleChange,
                    errors,
                    setFieldTouched,
                    touched,
                    handleSubmit,
                  }) => {
                    return (
                      <Fragment>
                        <Form onSubmit={handleSubmit}>
                          <div className="form group contact-border">
                            <Row>
                              <Col xs={12} md={12}>
                                <div className="group">
                                  <input
                                    data-testid={"form-input-name"}
                                    type="text"
                                    required
                                    name={"name"}
                                    onChange={handleChange}
                                    onBlur={() => setFieldTouched("name")}
                                    value={values.name}
                                  />
                                  <span className="highlight" />
                                  <span className="bar" />
                                  <label>Name</label>
                                  <FieldError
                                    error={errors.name}
                                    touched={touched.name}
                                  />
                                </div>
                              </Col>
                              <Col xs={12} md={6}>
                                <div className="group">
                                  <input
                                    type="text"
                                    required
                                    name={"email"}
                                    onChange={handleChange}
                                    onBlur={() => setFieldTouched("email")}
                                    value={values.email}
                                  />
                                  <span className="highlight" />
                                  <span className="bar" />
                                  <label>Email</label>
                                  <FieldError
                                    data-testid={"form-input-email"}
                                    error={errors.email}
                                    touched={touched.email}
                                  />
                                </div>
                              </Col>
                              <Col xs={12} md={6}>
                                <div className="group">
                                  <input
                                    type="number"
                                    required
                                    name={"phone"}
                                    onChange={handleChange}
                                    onBlur={() => setFieldTouched("phone")}
                                    value={values.phone}
                                  />
                                  <span className="highlight" />
                                  <span className="bar" />
                                  <label>Phone Number</label>
                                  <FieldError
                                    data-testid={"form-input-phone"}
                                    error={errors.phone}
                                    touched={touched.phone}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12} md={12}>
                                <div className="group">
                                  <input
                                    type="text"
                                    required
                                    name={"title"}
                                    onChange={handleChange}
                                    onBlur={() => setFieldTouched("title")}
                                    value={values.title}
                                  />
                                  <span className="highlight" />
                                  <span className="bar" />
                                  <label>Subject</label>
                                  <FieldError
                                    data-testid={"form-input-title"}
                                    error={errors.title}
                                    touched={touched.title}
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row className="textarea-container">
                              <Col
                                xs={12}
                                md={12}
                                style={{
                                  marginBottom: "8px",
                                  paddingLeft: "8px",
                                }}
                              >
                                <span
                                  style={{ fontSize: "14px", color: "black" }}
                                >
                                  Message
                                </span>
                              </Col>
                              <Col xs={12} md={12}>
                                <textarea
                                  placeholder="Write your message here..."
                                  name={"message"}
                                  onChange={handleChange}
                                  onBlur={() => setFieldTouched("message")}
                                  value={values.message}
                                />

                                <FieldError
                                  data-testid={"form-input-message"}
                                  error={errors.message}
                                  touched={touched.message}
                                />
                              </Col>
                            </Row>
                            {!this.state.sending ? (
                              <Button
                                color="secondary yt-contact-send-btn"
                                type="submit"
                                disabled={
                                  localStorage.getItem("token") == null
                                    ? true
                                    : false
                                }
                              >
                                Send
                              </Button>
                            ) : (
                              <div
                                className="yt-contact-send-btn"
                                style={{ backgroundColor: "transparent" }}
                              >
                                <CgSpinner
                                  style={{ color: "black", fontSize: 32 }}
                                  className="w3-spin"
                                />
                              </div>
                            )}
                          </div>
                        </Form>
                      </Fragment>
                    );
                  }}
                </Formik>
              </div>
            </Container>
          </section>
        )}
        {this.state.messageSent && (
          <SuccessBlock
            title="Message Sent Successfully"
            message="We will connect with you soon regarding your query."
          />
        )}
      </>
      // Customizable Area End
    );
  }
}

export default withRouter(Contactus);
// Customizable Area Start
// Customizable Area End
