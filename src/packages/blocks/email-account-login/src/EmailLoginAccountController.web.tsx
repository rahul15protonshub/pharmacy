import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { uuid } from "uuidv4";
import firebase from "firebase";
import * as Yup from "yup";
// @ts-ignore
import includes from "lodash/includes";
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  history: any;
  location: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  showSpinner: boolean;
  loginError: string;
  showPass: boolean;
  loading?: boolean;
  socialMediaResult?: any;
  helpCenterData?: any;
  activeTab: any;
  isOpenPopUp: boolean;
  // Customizable Area Start
  loginUserDetails?: any;
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

export default class EmailAccountLoginController extends BlockComponent<
  Props,
  S,
  SS
> {
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  verfiySocialLoginApiCallId: string = "";
  guestLoginApiCallId: string = "";
  loginAPICallID: string = "";
  userSkipRegistartionOTPVerfiyAPICallId: string = "";
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      showSpinner: false,
      loginError: "",
      showPass: false,
      activeTab: "1",
      isOpenPopUp: false,
      // Customizable Area Start
      isSocialLoginsEnabled: false,
      isShowFb: false,
      isShowGoogle: false,
      // Customizable Area End
    };
    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    window.scrollTo(0, 0);
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    //@ts-ignore
    const isNewUserToken = localStorage.getItem("SignUPtoken");
    const isNewUserData = localStorage.getItem("signUpUser");
    if (isNewUserData && isNewUserToken) {
      localStorage.clear();
    } else {
      //@ts-ignore
      if (
        window.localStorage.getItem("guestUUID") &&
        await this.verifyGuestToken() &&
        this.props.location?.state?.calledFrom !== "guest-login"
      ) {
        this.props?.history?.push("/home-page");
      }
    }
    // Customizable Area Start
    if (
      JSON.parse(localStorage.getItem("appThemData") ?? "{}")?.ExtraFields
        ?.is_facebook_login ||
      JSON.parse(localStorage.getItem("appThemData") ?? "{}")?.ExtraFields
        ?.is_google_login
    ) {
      this.setState({
        isShowGoogle: JSON.parse(localStorage?.getItem("appThemData") ?? "{}")
          ?.ExtraFields?.is_google_login,
        isShowFb: JSON.parse(localStorage?.getItem("appThemData") ?? "{}")
          ?.ExtraFields?.is_facebook_login,
      });
    }
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

  async verifyGuestToken() {
    let token = window.localStorage.getItem("token");
    return token?.length;
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Received", message);
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
      if (apiRequestCallId === this.verfiySocialLoginApiCallId) {
        if (responseJson) {
          if (this.state.socialMediaResult) {
            const { user, credential, additionalUserInfo } =
              this.state.socialMediaResult;
            let dat = {
              email: user.email,
              name: user.displayName,
            };
            await localStorage.setItem(
              "user",
              JSON.stringify(responseJson.data)
            );
            localStorage.removeItem("guestuser")
            await localStorage.setItem("token", responseJson.meta.token);
            await localStorage.setItem("profileImage", user.photoURL);
            await localStorage.setItem("userData", JSON.stringify(dat));
            const guestId = localStorage.getItem("guestUUID");
            if (guestId) {
              //@ts-ignore
              this.props.location?.state?.redirect === "wishlist"
                ? setTimeout(() => {
                    this.props?.history?.push({
                      pathname: "/profilebio",
                      state: { activeTab: "wishlist" },
                    });
                  }, 1000)
                : setTimeout(() => {
                    this.props?.history?.push("/cart");
                  }, 1000);
            } else {
              setTimeout(() => {
                this.props?.history?.push("/home-page");
              }, 1000);
            }
          }
        }
      }
      if (apiRequestCallId === this.guestLoginApiCallId) {
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
          localStorage.setItem("guestuser","guest")
          //@ts-ignore
          // window.notify([
          //   { type: "success", message: "Welcome to Our Store !" },
          // ]);
          this.props.history?.push("/home-page");
        }
      }
      if (apiRequestCallId === this.loginAPICallID) {
        if (responseJson && responseJson.data && responseJson.meta) {
          this.setShowSpinner(false);
          const { data, meta } = responseJson;
          if (meta && meta.token) {
            localStorage.setItem("token", meta.token);
            localStorage.removeItem("guestuser")

          }
          if (data) {
            localStorage.setItem("user", JSON.stringify(data));
            let dat = {
              email:
                data.attributes.type == "SmsAccount"
                  ? data.attributes.full_phone_number
                  : data.attributes.email,
              name: data.attributes.full_name,
            };
            //@ts-ignore
            const guestuserID = localStorage.getItem("guestUUID");

            localStorage.setItem("userData", JSON.stringify(dat));
            localStorage.setItem(
              "profileImage",
              data.attributes.image_url && data.attributes.image_url
            );
            const GuesrUserId = localStorage.getItem("guestUUID");
            const GuestUserData = localStorage.getItem("guestUserData");
            if (GuestUserData && guestuserID) {
              //@ts-ignore
              this.props?.location?.state?.redirect === "wishlist"
                ? setTimeout(() => {
                    this.props.history?.push({
                      pathname: "/profilebio",
                      state: { activeTab: "wishlist" },
                    });
                  }, 1000)
                : // @ts-ignore
                  this.routeToAll("/cart");
            } else {
              //@ts-ignore
              // window.notify([{ type: "success", message: meta?.message }]);
              // @ts-ignore
              this.routeToAll("/home-page");
            }
          }
        }
        if (
          responseJson &&
          responseJson.errors &&
          responseJson.errors.length > 0
        ) {
          this.setShowSpinner(false);
          // @ts-ignore
          window.notify([
            {
              message:
                responseJson.errors[0].pin ||
                responseJson.errors[0].account ||
                "Something went wrong!!!",
              type: "danger",
            },
          ]);
          if (
            responseJson.errors[0]?.pin ==
            "Sorry, You need to confirm your account first."
          ) {
            localStorage.removeItem("signUpUser");
            localStorage.removeItem("token");
            localStorage.removeItem("userFullName");
            this.userSkipOTPVerificationRegistartion();
          }
        }
      }
      if (apiRequestCallId === this.userSkipRegistartionOTPVerfiyAPICallId) {
        if (responseJson && responseJson.data && responseJson.meta) {
          this.setState({ showSpinner: false });
          const { data } = responseJson;
          const name = data?.attributes?.full_name;
          localStorage.setItem("guestuser","guest")

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

  routeToAll(route: string) {
    this.setState({
      isOpenPopUp:false
    })
    this.props?.history?.push(route);
  }

  showPassword = (e: any) => {
    e.preventDefault();
    this.setState((prevState) => ({
      showPass: !prevState.showPass,
    }));
  };

  setShowSpinner = (value: boolean) => {
    this.setState({ showSpinner: value });
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

  //guest user login
  guestLogin = () => {
    this.setState({
      ...this.state,
      loading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.guestLoginApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.guestLoginAPIEndPoint
    );
    const headers = {
      "Content-Type": "application/json",
    };
    const generateID = uuid();
    localStorage.setItem("guestUUID", generateID);
    const requestBody = {
      data: {
        type: "guest_account",
        attributes: {
          uuid: generateID,
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

  //Login Form
  handleSubmitLogin = (data: any) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.loginAPICallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPiEndPoint
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
      JSON.stringify(data)
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
            message:
              "Error Occured While connceting to Google" ||
              "Something went wrong!!!",
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

  SigninSchema = Yup.object().shape({
    userEmail: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(8, "Minimum Password length is 8.")
      .max(16, "Maximum Password length is 16")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain atleast a capital letter, a lowercase letter, a number and a special character."
      )
      .required("Password is required."),
  });
  SigninSchema2 = Yup.object().shape({
    userEmail: Yup.string()
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Invalid Email / Phone Number")
      .required("Email / Phone Number is required."),
    password: Yup.string()
      .min(8, "Minimum Password length is 8.")
      .max(16, "Maximum Password length is 16")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain atleast a capital letter, a lowercase letter, a number and a special character."
      )
      .required("Password is required."),
  });

  signinUser = async (values: any) => {
    this.setShowSpinner(true);
    //@ts-ignore
    // let countryInfo = JSON.parse(localStorage.getItem('countryCode') ?? "{}");
    let requestInfo: any;
    if (values.userEmail?.includes("@")) {
      requestInfo = values.userEmail;
    } else {
      // requestInfo = countryInfo?.countryPinCode + values.userEmail;
      requestInfo = this.state.countryCode + values.userEmail;
    }
    let data;
    //@ts-ignore
    const guestuserID = localStorage.getItem("guestUUID");
    if (guestuserID) {
      data = {
        email_or_mobile: requestInfo,
        // email_or_mobile: values.userEmail,
        password: values.password,
        uuid: guestuserID,
      };
    } else {
      data = {
        email_or_mobile: requestInfo,
        // email_or_mobile: values.userEmail,
        password: values.password,
      };
    }
    this.setState({
      loginUserDetails: data,
    });
    return this.handleSubmitLogin(data);
  };

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
  // Customizable Area Start
  userSkipOTPVerificationRegistartion = () => {
    let requestBody: any;
    if (this.state.loginUserDetails?.email_or_mobile?.includes("@")) {
      requestBody = {
        data: {
          type: "email_account",
          process: "register",
          attributes: {
            email: this.state.loginUserDetails?.email_or_mobile,
          },
        },
      };
    } else {
      requestBody = {
        data: {
          type: "sms_account",
          process: "register",
          attributes: {
            full_phone_number: this.state.loginUserDetails?.email_or_mobile,
          },
        },
      };
    }
    let finalValues = {
      Email: this.state.loginUserDetails?.email_or_mobile,
      FullName: "",
      accountType: this.state.loginUserDetails?.email_or_mobile?.includes("@")
        ? "EmailAccount"
        : "PhoneAccount",
      password: this.state.loginUserDetails?.password,
    };
    localStorage.setItem("signUpUser", JSON.stringify(finalValues));
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.userSkipRegistartionOTPVerfiyAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.sendOtpApiEndPoint
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
      JSON.stringify(requestBody)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
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
