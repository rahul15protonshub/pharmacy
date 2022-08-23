//@ts-nocheck;
import React from "react";
import {} from "react-router-dom";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import * as Yup from "yup";
export const configJSON = require("./config");
export const getValidationsSchema = require("../../studio-store-ecommerce-components/src/Validations/ValidationSchema");
// Customizable Area Start
// Customizable Area End
export interface Props {
  updateProfile?: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  activeTab: string;
  editProfile?: boolean;
  profileimage?: string;
  isChangePassword?: boolean;
  newProfileImgBase64?: any;
  removeClicked?: boolean;
  isPasswordUpdated?: boolean;
  isNewImageAdded?: boolean;
  passwordError: string;
  showPassword?: boolean;
  showCurrentPassword?: boolean;
  currentPasswordErr: string;
  showConfirmPassword?: boolean;
  confirmPasswordError: string;

  //get details
  getUserDeatils?: any;
  userDetails?: any;

  //alert Messages
  messageType?: string;
  message?: string;
  showAlertPassword: boolean;
  //logoutmodal
  disableLogout?: boolean;

  loading?: boolean;
  showSpinner?: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ProfilebioController extends BlockComponent<Props, S, SS> {
  updateProfileAPICallId: string = "";
  updateProfilePasswrdAPICallId: string = "";
  getUserProfileAPICallId: string = "";
  // Customizable Area Start
  /*** Vaildation start */
  changePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current Password is Required"),
    newPassword: Yup.string()
      .min(8, "Minimum Password length is 8.")
      .max(16, "Maximum Password length is 16")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#^!%*?&])[A-Za-z\d@#^$!%*?&]{8,}$/,
        "Password must contain atleast a capital letter, a lowercase letter, a number and a special character."
      )
      .required("New Password is Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords are not matching")
      .required("Confirm Password is Required"),
  });

  editProfileSchema = () => {
    //@ts-ignore
    const nameCountry = JSON.parse(
      localStorage.getItem("countryCode") ?? "{}"
    )?.countryName;
    //@ts-ignore
    switch (nameCountry?.toLowerCase()) {
      case "india":
        return Yup.object().shape({
          name: Yup.string()
            .matches(/^[a-zA-Z ]+$/, 'Only letters are allowed.')
            .min(2, "Name is Too Short")
            .required("Name is Required"),
          // email: Yup.string().email().required('Email is Required'),
          // phone: Yup.number().min(1000000000, 'Phone Number Minimum 10 digits').max(9999999999, 'Phone Number Maximum 10 digits').required('Phone Number is Required')
        });
      default:
        return Yup.object().shape({
          name: Yup.string()
            .matches(/^[a-zA-Z ]+$/, 'Only letters are allowed.')
            .min(2, "Name is Too Short")
            .required("Name is Required"),
          // email: Yup.string().email().required('Email is Required'),
          // phone: Yup.string().matches(/^\d+$/, "Only Numbers allow").required('Phone Number is Required')
        });
    }
  };
  /*** validation end */
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: "1",
      showAlertPassword: false,
      passwordError: "",
      currentPasswordErr: "",
      confirmPasswordError: "",
      // Customizable Area Start
      // Customizable Area End
    };
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.AlertMessage),
      // Customizable Area Start
      // Customizable Area End
    ];
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: String, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (this.parseExpireTokenResponse(responseJson, this.state, this.props)) {
        if (apiRequestCallId === this.getUserProfileAPICallId) {
          if (responseJson && responseJson.data) {
            this.setState({
              ...this.state,
              loading: false,
              getUserDeatils: responseJson.data,
              newProfileImgBase64:
                responseJson.data &&
                responseJson.data.attributes &&
                responseJson.data.attributes.image_url,
              profileimage:
                responseJson.data &&
                responseJson.data.attributes &&
                responseJson.data.attributes.image_url,
            });
            let dat = {
              name:
                responseJson.data &&
                responseJson.data.attributes &&
                responseJson.data.attributes.full_name,
              email:
                responseJson.data &&
                responseJson.data.attributes?.type == "SmsAccount"
                  ? responseJson.data?.attributes?.phone_number
                  : responseJson.data.attributes.email,
            };
            //@ts-ignore
            localStorage.setItem("userData", JSON.stringify(dat));
            localStorage.setItem("user", JSON.stringify(responseJson.data));
            localStorage.setItem(
              "profileImage",
              responseJson.data.attributes.image_url
            );
            this.props.updateProfile();
          } else {
            this.parseApiErrorResponse(responseJson);
          }
        } else if (apiRequestCallId === this.updateProfilePasswrdAPICallId) {
          if (responseJson && responseJson.message) {
            this.setState({
              ...this.state,
              loading: false,
              isPasswordUpdated: true,
              isChangePassword: false,
              showSpinner: false,
            });
            // @ts-ignore
            // window.notify([
            //   {
            //     message: responseJson.message || "something went wrong!!!",
            //     type: "success",
            //   },
            // ]);
          }
          if (
            responseJson &&
            responseJson.errors &&
            responseJson.errors.length > 0
          ) {
            this.setState({
              ...this.state,
              showSpinner: false,
              showAlertPassword: true,
              loading: false,
              messageType: responseJson.errors[0].message ? "danger" : "",
              message: responseJson.errors[0].message,
            });
            // @ts-ignore
            window.notify([
              {
                message:
                  responseJson.errors[0].message || "something went wrong!!!",
                type: "danger",
              },
            ]);
          } else {
            this.parseApiErrorResponse(responseJson);
          }
        } else if (apiRequestCallId === this.updateProfileAPICallId) {
          if (responseJson && responseJson.message) {
            this.setState({
              loading: false,
              showSpinner: false,
            });
            // @ts-ignore
            window.notify([
              {
                message: responseJson.message || "something went wrong!!!",
                type: "danger",
              },
            ]);
          }
          if (responseJson && responseJson.data) {
            if (responseJson && responseJson.data && responseJson.meta) {
              this.setState({
                ...this.state,
                loading: false,
                userDetails: responseJson.data,
                editProfile: false,
                showSpinner: false,
              });
              // @ts-ignore
              // window.notify([
              //   {
              //     message:
              //       responseJson.meta.message || "something went wrong!!!",
              //     type: "success",
              //   },
              // ]);
              this.getUserProfileHandler();
            }
          } else {
            this.parseApiErrorResponse(responseJson);
          }
        }
      }
    } else if (getName(MessageEnum.AlertMessage) === message.id) {
      const title = message.getData(getName(MessageEnum.AlertTitleMessage));
      let AlertBodyMessage = message.getData(
        getName(MessageEnum.AlertBodyMessage)
      );
    }
  }
  //update userProfile Password
  updatePasswordHandler = (values: any) => {
    this.setState({
      ...this.state,
      loading: true,
      showSpinner: true,
    });
    const token = localStorage.getItem("token");
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateProfilePasswrdAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.updateProfilePasswordAPIEndPoint
    );

    const headers = {
      "content-type": "application/json",
    };
    const requestBody = {
      token,
      data: {
        current_password: values.currentPassword,
        password: values.newPassword,
        password_confirmation: values.confirmPassword,
      },
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(requestBody)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiPutMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
  };

  //update userProfile Details
  updateProfileHandler = (values: any) => {
    this.setState({
      ...this.state,
      loading: true,
      showSpinner: true,
    });
    const token: any = localStorage.getItem("token");
    let countryCode: any;
    //@ts-ignore
    let countryName: any = JSON.parse(
      localStorage.getItem("countryCode") ?? "{}"
    )?.countryName;
    //@ts-ignore
    if (countryName?.toLowerCase() == "india") {
      countryCode = 91;
    } else {
      countryCode = 44;
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.updateProfileAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.updateProfileAPIEndPoint
    );

    const headers = {};
    let formData = new FormData();
    formData.append("token", token);
    formData.append(`data[full_name]`, values.name);
    // formData.append(`data[email]`, values.email);
    // formData.append(`data[full_phone_number]`, values.phone);
    this.state.removeClicked && this.state.newProfileImgBase64 == ""
      ? //@ts-ignore
        formData.append(`data[remove_profile]`, true)
      : "";
    // formData.append(`data[image]`, this.state.newProfileImgBase64 && this.state.newProfileImgBase64);
    this.state.isNewImageAdded && this.state.newProfileImgBase64
      ? formData.append(`data[image]`, this.state.newProfileImgBase64)
      : "";

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formData
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiPutMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  //get userProfile Details
  getUserProfileHandler = () => {
    this.setState({
      ...this.state,
      loading: true,
    });
    const token = localStorage.getItem("token");
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getUserProfileAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getProfileDetails
    );

    const headers = {
      "Content-Type": "application/json",
      token,
    };
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiGetMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  uploadImage = () => {
    const uploadImageFun = document.getElementById("uploadImage");
    uploadImageFun?.click();
  };

  profileImageHandler = (e: any = []) => {
    const files = e?.target ? e?.target?.files : [];
    if (files.length > 0) {
      const file = files[0];
      if (file.type == "image/svg+xml") {
        this.setState({
          ...this.state,
          showAlertPassword: true,
          message: ".svg file are not allowed",
          messageType: "warning",
        });
      } 
      else if (file.size<60453) {
        this.setState({
          ...this.state,
          showAlertPassword: true,
          message: "Image should be less then 59 kb",
          messageType: "warning",
        });
      }
      else {
        this.imgBase64(file, (result: any) => {
          this.setState({
            ...this.state,
            // profileImgBase64: result,
            isNewImageAdded: true,
            newProfileImgBase64: result,
          });
        });
      }
    }
  };

  imgBase64 = (file: any, cb: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      cb(reader.result);
    };
  };

  handleProfileEdit = () => {
    this.setState({
      ...this.state,
      editProfile: true,
    });
  };

  modalClose = () => {
    this.setState({
      ...this.state,
      editProfile: !this.state.editProfile,
      newProfileImgBase64: this.state.profileimage,
    });
  };

  handleChangePassword = () => {
    this.setState({
      ...this.state,
      isChangePassword: true,
    });
  };

  chnagePwdModalClose = () => {
    this.setState({
      ...this.state,
      isChangePassword: !this.state.isChangePassword,
    });
  };

  successPasswordModalClose = () => {
    this.setState({
      ...this.state,
      isPasswordUpdated: !this.state.isPasswordUpdated,
    });
  };

  addNewProfile = (e: any) => {
    const uploadNewImage = document.getElementById("addImage");
    uploadNewImage?.click();
  };

  logoutModalClose = () => {
    this.setState({
      ...this.state,
      disableLogout: false,
    });
  };

  async componentDidMount() {
    const localData = await localStorage.getItem("user");
    const tpoken = await localStorage.getItem("token");
    if (localData && tpoken) {
      const userDetails = JSON.parse(localData);
      this.setState({
        ...this.state,
        getUserDeatils: userDetails,
      });
      await this.getUserProfileHandler();
      // Customizable Area Start
      // Customizable Area End
    }
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  public shouldComponentUpdate(a: any, b: any) {
    if (b.showAlertPassword) {
      setTimeout(() => {
        this.setState({
          showAlertPassword: false,
        });
      }, 2000);
      return true;
    } else {
      return true;
    }
  }
  // Customizable Area End

  showPasswordHandler = (e: any) => {
    e.preventDefault();
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  showCurrentPasswordHandler = (e: any) => {
    e.preventDefault();
    this.setState((prevState) => ({
      showCurrentPassword: !prevState.showCurrentPassword,
    }));
  };

  showConfirmPasswordHandler = (e: any) => {
    e.preventDefault();
    this.setState((prevState) => ({
      showConfirmPassword: !prevState.showConfirmPassword,
    }));
  };

  // Customizable Area Start
  // Customizable Area End
}
