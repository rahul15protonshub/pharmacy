//@ts-nocheck;
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// @ts-ignore
import map from "lodash/map";
import axios from "axios";
import { uuid } from "uuidv4";
import firebase from "firebase";
// @ts-ignore
import includes from "lodash/includes";
import * as Yup from "yup";
export const configJSON = require("./config");
// Customizable Area Start
// Customizable Area End
export interface Props {
  navigation: any;
  id: string;
  history: any;
  isPopup: boolean;
  isOpenPopUp: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  showSpinner: boolean;
  loginError: string;
  showPass: boolean;
  emailErr: string;
  //success Email Response Data
  userToken?: string;
  userEmail?: string;
  userName?: string;
  userPassword?: string;
  //social media result
  socialMediaResult?: any;
  // showing alerts
  showAlert?: boolean;
  messageType?: any;
  message?: any;
  loading?: boolean;
  helpCenterData?: any;
  // Customizable Area Start
  isSocialLoginsEnabled?: boolean;
  isShowFb?: boolean;
  isShowGoogle?: boolean;
  countryCode?: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class EmailAccountRegistrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  verfiySocialLoginApiCallId: string = "";
  registartionEmailCallId: string = "";
  guestRegisterApiCallId: string = "";
  sendOTPAPICallId: string = "";
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.signupUser = this.signupUser.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.AlertMessage),
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.ReciveUserCredentials),
      // Customizable Area Start
      // Customizable Area End
    ];
    this.state = {
      showSpinner: false,
      loginError: "",
      showPass: false,
      emailErr: "",
      isSocialLoginsEnabled: false,
      isShowFb: false,
      isShowGoogle: false,
      // Customizable Area Start
      countryCode: JSON.parse(localStorage.getItem("countryCode") ?? "{}")
        ?.countryPinCode,
      // Customizable Area End
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    if (!firebase.apps.length) {
      // Customizable Area Start
      firebase.initializeApp({
        apiKey: "AIzaSyCp4CXWD1k7C83aDqbBjqupWcgXib1xTuo",
        authDomain: "studio-store-eb05b.firebaseapp.com",
      });
      // Customizable Area End
    }
    firebase.auth().onAuthStateChanged((result) => {
      this.setState({
        ...this.state,
      });
    });
    // Customizable Area Start
    this.getCountryCode();
    // Customizable Area End
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (
      JSON.parse(localStorage.getItem("appThemData") ?? "{}")?.ExtraFields
        ?.is_facebook_login ||
      JSON.parse(localStorage.getItem("appThemData") ?? "{}")?.ExtraFields
        ?.is_google_login
    ) {
      this.setState({
        isSocialLoginsEnabled: true,
        isShowGoogle: JSON.parse(localStorage?.getItem("appThemData") ?? "{}")
          ?.ExtraFields?.is_google_login,
        isShowFb: JSON.parse(localStorage?.getItem("appThemData") ?? "{}")
          ?.ExtraFields?.is_facebook_login,
      });
    }
    this.getCountryCode();
  }

  showPassword = (e: any) => {
    e.preventDefault();
    this.setState((prevState) => ({
      showPass: !prevState.showPass,
    }));
  };

  signupUser = (values: any) => {
    this.setState({ showSpinner: true });
    //@ts-ignore
    let requestData: any;
    if (values?.Email?.includes("@")) {
      requestData = {
        data: {
          type: "email_account",
          attributes: {
            email: values?.Email,
            full_name: values?.FullName,
            activated:true,
          },
          process: "register",
        },
      };
    } else {
      requestData = {
        data: {
          type: "sms_account",
          process: "register",
          attributes: {
            //@ts-ignore
            // full_phone_number: countryInfo?.countryPinCode + values?.Email,
            full_phone_number: this.state.countryCode + values?.Email,
            full_name: values?.FullName,
            activated:true,
          },
        },
      };
    }
    let finalValues: any = {
      ...values,
      accountType: values?.Email?.includes("@")
        ? "EmailAccount"
        : "PhoneAccount",
    };
    localStorage.setItem("signUpUser", JSON.stringify(finalValues));

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.sendOTPAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.sendEmailOTPAPIEndPoint
    );

    const headers = {
      "Content-Type": "application/json",
    };
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(requestData)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );
    return runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  async receive(from: String, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      let apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      var errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (apiRequestCallId === this.registartionEmailCallId) {
        if (responseJson && responseJson.data && responseJson.meta) {
          this.setState({
            ...this.state,
          });
        }
        if (
          responseJson &&
          responseJson.errors &&
          responseJson.errors.length > 0
        ) {
          this.setState({
            ...this.state,
            showAlert: true,
            messageType: "danger",
            message: responseJson.errors[0].account,
          });
        }
      } else if (apiRequestCallId === this.verfiySocialLoginApiCallId) {
        if (responseJson) {
          if (this.state.socialMediaResult) {
            const { user, credential, additionalUserInfo } =
              this.state.socialMediaResult;
            let dat = {
              email: user.email,
              name: user.displayName,
            };
            const GuestUserId = localStorage.getItem("guestUUID");
            if (GuestUserId) {
              setTimeout(() => {
                this.props?.history?.push("/cart");
              }, 1000);
            } else {
              setTimeout(() => {
                this.props?.history?.push("/home-page");
              }, 1000);
            }
            await localStorage.setItem(
              "user",
              JSON.stringify(responseJson.data)
            );
            await localStorage.setItem("token", responseJson.meta.token);
            await localStorage.setItem("profileImage", user.photoURL);
            await localStorage.setItem("userData", JSON.stringify(dat));
          }
        }
      } else if (apiRequestCallId === this.guestRegisterApiCallId) {
        if (responseJson && responseJson.data && responseJson.meta) {
          this.setState({
            ...this.state,
            loading: false,
          });
          localStorage.setItem(
            "guestUserData",
            JSON.stringify(responseJson.data)
          );
          localStorage.setItem("token", responseJson.meta.token);
          //@ts-ignore
          // window.notify([
          //   { type: "success", message: "Welcome to Our Store!" },
          // ]);
          this.props.history?.push("/home-page");
        }
      } else if (apiRequestCallId === this.sendOTPAPICallId) {
        if (responseJson && responseJson.data && responseJson.meta) {
          this.setState({ showSpinner: false });
          const { data } = responseJson;
          const name = data?.attributes?.full_name;
          localStorage.setItem("token", responseJson.meta.token);
          localStorage.setItem("userFullName", name);
          this.props?.history?.push({
            pathname: "/otpconfirm",
            state: {
              data: responseJson.data?.user,
            },
          });
          // @ts-ignore
          // window.notify([
          //   { message: "OTP has been sent to you", type: "success" },
          // ]);
        }
        if (
          responseJson &&
          responseJson.errors &&
          responseJson.errors.length > 0
        ) {
          this.setState({ showSpinner: false });
          //@ts-ignore
          window.notify([
            {
              message:
                responseJson.errors[0]?.phone_number ||
                responseJson.errors[0]?.account ||
                responseJson.errors[0]?.full_phone_number ||
                "something went wrong!",
              type: "danger",
            },
          ]);
        }
      }
    } else {
    }
    // Customizable Area End
  }

  //Registeration through Email
  registartionEmail = (values: any) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.registartionEmailCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.registrationThorughEmailAPIEndPoint
    );

    const headers = {
      "Content-Type": "application/json",
    };
    const requestBody = {
      data: {
        type: "email_account",
        process: "register",
        attributes: {
          email: values?.Email,
        },
      },
    };

    //setting userDeatils to state
    this.setState({
      ...this.state,
      userEmail: values?.Email,
      userPassword: values?.password,
      userName: values?.FullName,
    });
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
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  //registartion through social Login
  verifyEmailBeforeRegistartion = (
    resultData: any,
    socialMediaName: string
  ) => {
    //@ts-ignore
    const guestuserID = localStorage.getItem("guestUUID");
    let requestBody;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.verfiySocialLoginApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.socialRegistartionAPIEndPoint
    );
    const headers = {
      "Content-Type": "application/json",
    };
    if (guestuserID) {
      requestBody = {
        uuid: guestuserID,
        data: {
          type: "social_account",
          attributes: {
            provider: socialMediaName,
            access_token:
              resultData.credential && resultData.credential.accessToken,
          },
        },
      };
    } else {
      requestBody = {
        data: {
          type: "social_account",
          attributes: {
            provider: socialMediaName,
            access_token:
              resultData.credential && resultData.credential.accessToken,
          },
        },
      };
    }

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(requestBody)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  //guest user Registration
  guestRegister = () => {
    this.setState({
      ...this.state,
      loading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.guestRegisterApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.guestRegistrationAPIEndPoint
    );
    const headers = {
      "Content-Type": "application/json",
    };
    const generateUUId = uuid();
    localStorage.setItem("guestUUID", generateUUId);
    const requestBody = {
      data: {
        type: "guest_account",
        attributes: {
          uuid: generateUUId,
        },
      },
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(requestBody)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  //connect to google account
  connectGoogle = () => {
    const googleResult = new firebase.auth.GoogleAuthProvider();
    googleResult.addScope("profile");
    googleResult.addScope("email");
    firebase
      .auth()
      .signInWithPopup(googleResult)
      .then((result) => {
        if (result.credential && result.user && result.additionalUserInfo) {
          this.setState({
            ...this.state,
            socialMediaResult: result,
          });
          this.verifyEmailBeforeRegistartion(result, "google");
        }
      })
      .catch((err) => {
        // @ts-ignore
        window.notify([
          {
            message: err?.message || "Error Occured While connceting to Google",
            type: "danger",
          },
        ]);
      });
  };
  //connect to facebook account
  connectFacebook = () => {
    const facebookResult = new firebase.auth.FacebookAuthProvider();
    facebookResult.addScope("email");
    firebase
      .auth()
      .signInWithPopup(facebookResult)
      .then((result) => {
        if (result.credential && result.user && result.additionalUserInfo) {
          this.setState({
            ...this.state,
            socialMediaResult: result,
          });
          this.verifyEmailBeforeRegistartion(result, "facebook");
        }
      })
      .catch((err) => {
        // @ts-ignore
        window.notify([
          {
            message:
              err?.message || "Error Occured While connceting to Facebook",
            type: "danger",
          },
        ]);
      });
  };

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
      this.props?.history?.push("/aboutus");
    } else if (value !== undefined) {
      let path = "/help-center/" + value;
      //@ts-ignore
      this.props?.history?.push(path);
    } else {
      let path = "/help-center";
      //@ts-ignore
      this.props?.history?.push(path);
    }
  };

  // Validations start
  signUpValidation = Yup.object().shape({
    FullName: Yup.string()
      .min(3, "Name is Too Short")
      .required("Name is Required"),
    Email: Yup.string().email().required("Email is Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain atleast a capital letter, a lowercase letter, a number and a special character"
      )
      .required("Password is Required"),
    fullPhoneNumber: Yup.string()
      .matches(/^\d+$/, "Only Numbers allow")
      .required("Phone Number is required"),
  });
  signUpValidation2 = Yup.object().shape({
    FullName: Yup.string()
      .min(3, "Name is Too Short")
      .required("Name is Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain atleast a capital letter, a lowercase letter, a number and a special character"
      )
      .required("Password is Required"),
    Email: Yup.string()
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Invalid Email / Phone Number")
      .required("Email / Phone Number is Required"),
    // Yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required('Email / Phone Number is Required')
    // || Yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,'Phone Number InValid'),
  });
  //Validations End

  // Customizable Area Start
  getCountryCode = () => {
    if (
      JSON.parse(localStorage.getItem("countryCode") ?? "{}")?.countryPinCode
    ) {
      this.setState({
        countryCode: JSON.parse(localStorage.getItem("countryCode") ?? "{}")
          ?.countryPinCode,
      });
    }
  };
  // Customizable Area End
}
