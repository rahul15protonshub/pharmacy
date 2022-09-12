//@ts-nocheck;
import React from "react";
import { Formik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import ProfilebioController, {
  Props,
  configJSON,
  getValidationsSchema,
} from "./ProfilebioController.web";
import {
  cameraImg,
  profileCloseImg,
  closeImg,
  profileImg,
  imageLock,
  imgaeCamera,
  emptyProfile,
} from "./assets";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert,
  ModalFooter,
} from "reactstrap";
import "../assets/styles/styles.css";
import "../assets/styles/addressStyles.css";
import "../assets/styles/profile.css";
// @ts-ignore
import content from "../../studio-store-ecommerce-components/src/content";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";
import "../assets/styles/index.scoped.css";
// Customizable Area Start
// Customizable Area End
export default class Profilebio extends ProfilebioController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    return (
      <>
        {this.state.loading && <Loader loading={this.state.loading} />}
        <div className="profile-pg-inner-wrap p-4 bg-white radius-10 profile-pg-mb-30">
          <div className="profile-pg-inner-wrapper">
            <div className="profile-tab-content">
              <Row className="yt-cm-ptc-row">
                <Col md={12} className="yt-cm-ptc-col">
                  <div className="d-flex align-items-center mb-5 yt-profile-img-nm-wrap">
                    <div className="img-upload d-flex align-items-center justify-content-center">
                      <img
                        src={
                          this.state.getUserDeatils &&
                          this.state.getUserDeatils.attributes &&
                          this.state.getUserDeatils.attributes.image_url
                            ? this.state.getUserDeatils.attributes.image_url
                            : emptyProfile
                        }
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </Col>
                <Col md={6} className="yt-cm-ptc-col">
                  <div className="profile-data-wrap">
                    <span className="profile-data-tag">{content.name}</span>
                    <p className="profile-user-name py-2">
                      {this.state.getUserDeatils &&
                        this.state.getUserDeatils?.attributes?.full_name}
                    </p>
                  </div>
                </Col>
                {this.state.getUserDeatils?.attributes?.type == "SmsAccount" ? (
                  <Col md={6} className="yt-cm-ptc-col">
                    <div className="profile-data-wrap">
                      <span className="profile-data-tag">
                        {content.phoneNo}
                      </span>
                      <p className="profile-user-name py-2">
                        {this.state.getUserDeatils &&
                          this.state.getUserDeatils?.attributes?.full_phone_number?.slice(
                            2
                          )}
                      </p>
                    </div>
                  </Col>
                ) : (
                  <Col md={6} className="yt-cm-ptc-col">
                    <div className="profile-data-wrap">
                      <span className="profile-data-tag">{content.email}</span>
                      <p
                        className="profile-user-name py-2"
                        style={{ overflow: "auto" }}
                      >
                        {this.state.getUserDeatils &&
                          this.state.getUserDeatils?.attributes?.email}
                      </p>
                    </div>
                  </Col>
                )}
              </Row>
              <Row className="yt-cm-ptc-row yt-btm-inf">
                <Col md={12}>
                  <div
                    className={
                      "d-flex align-items-center justify-content-end" /*"justify-content-xl-between"*/
                    }
                  >
                    {this.state.getUserDeatils &&
                    this.state.getUserDeatils &&
                    ((this.state.getUserDeatils.attributes &&
                      this.state.getUserDeatils.attributes.is_social_login) ||
                      this.state.getUserDeatils.type == "social_account") ? (
                      ""
                    ) : (
                      <Button
                        color="link profile-edit-pass mr-2 p-xl-0"
                        onClick={() => this.handleChangePassword()}
                      >
                        {content.changePassword}
                      </Button>
                    )}{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      color="secondary profile-edit-btn"
                      onClick={() => this.handleProfileEdit()}
                    >
                      {content.editProfile}
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          {/* Modal Edit profile start */}
          <Modal
            isOpen={this.state.editProfile}
            toggle={() => this.modalClose()}
            centered={true}
            className="cm-small-modal-6"
          >
            <ModalHeader
              className="edit-profile-title-bar p-4"
              close={
                <img
                  src={closeImg}
                  alt=""
                  onClick={() => {
                    // this.getUserProfileHandler();
                    this.modalClose();
                  }}
                />
              }
            >
              {content.editProfile}
            </ModalHeader>
            <ModalBody className="yt-edit-prfl-body">
              <input
                type="file"
                accept=".jpeg .jpg, .png"
                style={{ visibility: "hidden" }}
                id={"addImage"}
                onChange={(e) => this.profileImageHandler(e)}
              />
              <div
                className="edit-profile-body-wrap"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div
                  className="d-flex align-items-end mb-4 yt-edit-profl-img-wrap"
                  style={{ position: "relative", top: 0, left: 0 }}
                >
                  {this.state.newProfileImgBase64 ? (
                    <>
                      <div className="img-upload d-flex align-items-center justify-content-center">
                        <img
                          src={this.state.newProfileImgBase64}
                          alt="profile pic in edit"
                          className="img-fluid w3-"
                        />
                        <div
                          className="image-overlay"
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={imgaeCamera}
                            alt=""
                            onClick={(e) => this.addNewProfile(e)}
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              left: "100%",
                            }}
                          />
                        </div>
                      </div>
                      {!this.state.removeClicked ? (
                        <div
                          className="yt-remove-pic-wrap ml-4"
                          onClick={() =>
                            this.setState({
                              ...this.state,
                              removeClicked: true,
                              newProfileImgBase64: "",
                            })
                          }
                        >
                          <img src={profileCloseImg} alt="" />
                          <span className="btn btn-light removeBtn">
                            {content.removePicture}
                          </span>
                        </div>
                      ) : (
                        <div
                          className="yt-remove-pic-wrap ml-4"
                          onClick={() =>
                            this.setState({
                              ...this.state,
                              removeClicked: true,
                              newProfileImgBase64: "",
                            })
                          }
                        >
                          <img src={profileCloseImg} alt="" />
                          <span className="btn btn-light removeBtn">
                            {content.removePicture}
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="img-upload d-flex align-items-center justify-content-center">
                        <img
                          src={imgaeCamera}
                          alt=""
                          onClick={(e) => this.addNewProfile(e)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <Formik
                initialValues={{
                  name:
                    (this.state.getUserDeatils &&
                      this.state.getUserDeatils.attributes.full_name) ||
                    "",
                  email:
                    (this.state.getUserDeatils &&
                    this.state.getUserDeatils?.attributes?.type == "SmsAccount"
                      ? this.state.getUserDeatils?.attributes?.full_phone_number?.slice(
                          2
                        )
                      : this.state.getUserDeatils?.attributes?.email) || "",
                  // phone: this.state.getUserDeatils && this.state.getUserDeatils.attributes.full_phone_number || ''
                }}
                validationSchema={this.editProfileSchema}
                onSubmit={(values) => {
                  this.updateProfileHandler(values);
                }}
              >
                {(props) => {
                  const {
                    handleBlur,
                    handleChange,
                    values,
                    errors,
                    touched,
                    handleSubmit,
                  } = props;
                  return (
                    <form
                      style={{ textAlign: "left" }}
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      <FormGroup>
                        <Label
                          htmlFor="userName"
                          className="modalTitleInputLable"
                        >
                          {content.name}
                        </Label>
                        <Input
                          type="text"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="name"
                          id="userName"
                        />
                        <FormText color="danger">
                          {errors.name && touched.name ? errors.name : ""}
                        </FormText>
                      </FormGroup>
                      {this.state.getUserDeatils?.attributes?.type ==
                      "SmsAccount" ? (
                        <FormGroup>
                          <Label
                            htmlFor="userPhone"
                            className="modalTitleInputLable"
                          >
                            {content.phoneNo}
                          </Label>
                          <Input
                            type="text"
                            value={values.email}
                            name="email"
                            id="userEmail"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            disabled
                          />
                          <FormText color="danger">
                            {errors.email && touched.email ? errors.email : ""}
                          </FormText>
                        </FormGroup>
                      ) : (
                        <FormGroup>
                          <Label
                            htmlFor="userEmail"
                            className="modalTitleInputLable"
                          >
                            {content.email}
                          </Label>
                          <Input
                            type="text"
                            value={values.email}
                            name="email"
                            id="userEmail"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            disabled
                          />
                          <FormText color="danger">
                            {errors.email && touched.email ? errors.email : ""}
                          </FormText>
                        </FormGroup>
                      )}
                      <FormGroup>
                        <div className="mt-4 pt-1 yt-otp-sd-wrap">
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
                              className="saveProfileBtn"
                              style={{ width: "100%" }}
                            >
                              {content.saveProfile}
                            </Button>
                          )}
                        </div>
                      </FormGroup>
                    </form>
                  );
                }}
              </Formik>
              {this.state.showAlertPassword ? (
                <Alert
                  color={this.state.messageType && this.state.messageType}
                  style={{ position: "absolute", left: 200, top: 0 }}
                >
                  {this.state.message && this.state.message}
                </Alert>
              ) : (
                ""
              )}
            </ModalBody>
          </Modal>
          {/* Modal for Edit Profile end */}

          {/* Modal for ChnagePassword start */}
          <Modal
            isOpen={this.state.isChangePassword}
            toggle={() => this.chnagePwdModalClose()}
            centered={true}
            className="cm-small-modal-6"
          >
            <ModalHeader
              className="edit-profile-title-bar p-4"
              close={
                <img
                  src={closeImg}
                  alt=""
                  onClick={() => this.chnagePwdModalClose()}
                />
              }
            >
              {content.changePassword}
            </ModalHeader>

            <ModalBody style={{ textAlign: "left" }}>
              <span
                className="content-updatePwd"
                style={{ textAlign: "center" }}
              >
                {content.enterPasswordWithAlpha}
              </span>
              <Formik
                initialValues={{
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                onSubmit={(values) => {
                  this.updatePasswordHandler(values);
                }}
                validationSchema={this.changePasswordSchema}
              >
                {(props) => {
                  const {
                    handleBlur,
                    handleSubmit,
                    touched,
                    errors,
                    values,
                    handleChange,
                  } = props;
                  return (
                    <form onSubmit={handleSubmit} noValidate className="my-3">
                      <FormGroup>
                        <Label
                          htmlFor="currentPassword"
                          className="modalTitleInputLable"
                        >
                          {content.enterCurrentPassword}
                        </Label>
                        <div className="input-password-box my-2">
                        <Input
                          type={
                            this.state.showCurrentPassword ? "text" : "password"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.currentPassword}
                          name="currentPassword"
                          id="currentPassword"
                        />
                        {touched.currentPassword && errors.currentPassword ? (
                          this.state.showCurrentPassword ? (
                            <FaEyeSlash
                              onClick={(e) =>
                                this.showCurrentPasswordHandler(e)
                              }
                              className={
                                errors.currentPassword.length > 0
                                  ? "yt-current-pass-vie-icn2"
                                  : "yt-current-pass-vie-icn "
                              }
                            />
                          ) : (
                            <FaEye
                              onClick={(e) =>
                                this.showCurrentPasswordHandler(e)
                              }
                              className={
                                errors.currentPassword.length > 0
                                  ? "yt-current-pass-vie-icn2"
                                  : "yt-current-pass-vie-icn"
                              }
                            />
                          )
                        ) : this.state.showCurrentPassword ? (
                          <>
                            <FaEyeSlash
                              onClick={(e) =>
                                this.showCurrentPasswordHandler(e)
                              }
                              className={
                                this.state.currentPasswordErr.length > 0
                                  ? "yt-current-pass-vie-icn2"
                                  : "yt-current-pass-vie-icn "
                              }
                            />
                          </>
                        ) : (
                          <FaEye
                            onClick={(e) => this.showCurrentPasswordHandler(e)}
                            className={
                              this.state.currentPasswordErr.length > 0
                                ? "yt-current-pass-vie-icn2"
                                : "yt-current-pass-vie-icn "
                            }
                          />
                        )}
                        </div>
                        <FormText color="danger">
                          {errors.currentPassword && touched.currentPassword
                            ? errors.currentPassword
                            : ""}
                        </FormText>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          htmlFor="newPassword"
                          className="modalTitleInputLable"
                        >
                          Enter new password
                        </Label>
                        <div className="input-password-box my-2">
                        <Input
                          type={this.state.showPassword ? "text" : "password"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.newPassword}
                          name="newPassword"
                          id="newPassword"
                        />
                        {touched.newPassword && errors.newPassword ? (
                          this.state.showPassword ? (
                            <FaEyeSlash
                              onClick={(e) => this.showPasswordHandler(e)}
                              className={
                                errors.newPassword.length > 0
                                  ? "yt-change-pass-vie-icn2"
                                  : "yt-change-pass-vie-icn "
                              }
                            />
                          ) : (
                            <FaEye
                              onClick={(e) => this.showPasswordHandler(e)}
                              className={
                                errors.newPassword.length > 0
                                  ? "yt-change-pass-vie-icn2"
                                  : "yt-change-pass-vie-icn"
                              }
                            />
                          )
                        ) : this.state.showPassword ? (
                          <>
                            <FaEyeSlash
                              onClick={(e) => this.showPasswordHandler(e)}
                              className={
                                this.state.passwordError.length > 0
                                  ? "yt-change-pass-vie-icn2"
                                  : "yt-change-pass-vie-icn "
                              }
                            />
                          </>
                        ) : (
                          <FaEye
                            onClick={(e) => this.showPasswordHandler(e)}
                            className={
                              this.state.passwordError.length > 0
                                ? "yt-change-pass-vie-icn2"
                                : "yt-change-pass-vie-icn "
                            }
                          />
                        )}
                        </div>
                        <FormText color="danger">
                          {errors.newPassword && touched.newPassword
                            ? errors.newPassword
                            : ""}
                        </FormText>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          htmlFor="confirmPassword"
                          className="modalTitleInputLable"
                        >
                          {content.reEnterNewPassword}
                        </Label>
                        <div className="input-password-box my-2">
                        <Input
                          type={
                            this.state.showConfirmPassword ? "text" : "password"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirmPassword}
                          name="confirmPassword"
                          id="confirmPassword"
                        />
                        {touched.confirmPassword && errors.confirmPassword ? (
                          this.state.showConfirmPassword ? (
                            <FaEyeSlash
                              onClick={(e) =>
                                this.showConfirmPasswordHandler(e)
                              }
                              className={
                                errors.confirmPassword.length > 0
                                  ? "yt-confirm-pass-vie-icn2"
                                  : "yt-confirm-pass-vie-icn "
                              }
                            />
                          ) : (
                            <FaEye
                              onClick={(e) =>
                                this.showConfirmPasswordHandler(e)
                              }
                              className={
                                errors.confirmPassword.length > 0
                                  ? "yt-confirm-pass-vie-icn2"
                                  : "yt-confirm-pass-vie-icn"
                              }
                            />
                          )
                        ) : this.state.showConfirmPassword ? (
                          <>
                            <FaEyeSlash
                              onClick={(e) =>
                                this.showConfirmPasswordHandler(e)
                              }
                              className={
                                this.state.confirmPasswordError.length > 0
                                  ? "yt-confirm-pass-vie-icn2"
                                  : "yt-confirm-pass-vie-icn "
                              }
                            />
                          </>
                        ) : (
                          <FaEye
                            onClick={(e) => this.showConfirmPasswordHandler(e)}
                            className={
                              this.state.confirmPasswordError.length > 0
                                ? "yt-confirm-pass-vie-icn2"
                                : "yt-confirm-pass-vie-icn "
                            }
                          />
                        )}
                        </div>
                        <FormText color="danger">
                          {errors.confirmPassword && touched.confirmPassword
                            ? errors.confirmPassword
                            : ""}
                        </FormText>
                      </FormGroup>
                      <FormGroup>
                        <div className="mt-4 pt-1 yt-otp-sd-wrap">
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
                              className="saveProfileBtn"
                              style={{ width: "100%" }}
                            >
                              {content.changePassword}
                            </Button>
                          )}
                        </div>
                      </FormGroup>
                    </form>
                  );
                }}
              </Formik>
            </ModalBody>
          </Modal>
          {/* Modal for ChnagePassword end */}

          {/* Modal for UpdatePassword start */}
          <Modal
            isOpen={this.state.isPasswordUpdated}
            toggle={() => this.successPasswordModalClose()}
            centered={true}
            className="cm-small-modal-6"
          >
            <ModalBody
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={imageLock}
                alt=""
                style={{ width: "100%", height: "30vh", objectFit: "contain" }}
              />
              <br />
              <span className="sidemenu-text">
                {content.passwordChangedSuccessfully}
              </span>
              <br />
              <span className="content-updatePwd">{content.goBackNBrowse}</span>
              <br />
              <br />
              <Button
                style={{ width: "50%" }}
                className="saveProfileBtn"
                onClick={() =>
                  this.setState({ ...this.state, isPasswordUpdated: false })
                }
              >
                {content.goToProfile}
              </Button>
            </ModalBody>
          </Modal>
          {/* Modal for UpdatePassword end */}
        </div>
      </>
    );
    // Customizable Area End
  }
}
