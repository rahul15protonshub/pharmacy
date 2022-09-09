import { Platform } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import * as Validators from "../../../framework/src/Validators";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-community/google-signin";

import DeviceInfo from "react-native-device-info";
import StorageProvider from "../../../framework/src/StorageProvider";
export const configJSON = require("./config");
import appleAuth from "@invertase/react-native-apple-authentication";
import R from "../../studio-store-ecommerce-components/src/R";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

// Customizable Area Start
// Customizable Area End

export interface Props {
  navigation: any;
  fromCart: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  emailInput: string;
  passwordInput: string;
  fullNameInput: string;
  emailError: boolean;
  nameError: boolean;
  passwordError: boolean;
  email: boolean;
  password: boolean;
  fullName: boolean;
  message: any;
  showAlertModal: boolean;
  showSignupSuccess: boolean;
  enablePasswordField: boolean;
  fromCart: boolean;
  token: string;
  pin: string;
  helpCenterList: any;
  isShowError: boolean;
  isFetching: boolean;
  privacyPolicy: any;
  termsPolicy: any;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {}

export default class SignupController extends BlockComponent<Props, S, SS> {
  emailReg: RegExp;
  sendOtpApiCallId: string = "";
  apiSocialLoginCallId: string = "";
  apiGuestLoginCallId: string = "";
  getHelpCenterApiCallId: string = "";
  secondTextInput: any;
  thirdTextInput: any;
  constructor(props: Props) {
    super(props);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      // Customizable Area Start
      // Customizable Area Start
    ];

    this.state = {
      emailInput: "",
      passwordInput: "",
      fullNameInput: "",
      nameError: false,
      emailError: false,
      passwordError: false,
      email: true,
      password: true,
      fullName: true,
      message: "",
      showAlertModal: false,
      showSignupSuccess: false,
      enablePasswordField: true,
      fromCart: props.fromCart,
      token: "",
      pin: "",
      isShowError: false,
      helpCenterList: [],
      isFetching: false,
      privacyPolicy: null,
      termsPolicy: null,
      // Customizable Area Start
      // Customizable Area Start
    };

    this.emailReg = new RegExp("");
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area Start
  }

  async componentDidMount() {
    super.componentDidMount();
    this.setupGoogleConfiguration();
    this.getHelpCenterData();
    // Customizable Area Start
    // Customizable Area Start
  }

  async componentWillUnmount() {
    super.componentWillUnmount();
    // Customizable Area Start
    // Customizable Area Start
  }

  setupGoogleConfiguration = () => {
    // Customizable Area Start
    GoogleSignin.configure({
      scopes: ["profile", "email"],
      webClientId:
        "60789253831-jm71v8bdhhptl8qn7dg7je6o8e6lno6v.apps.googleusercontent.com",
    });
    // Customizable Area Start
  };

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      console.log('responseJson===',responseJson)

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson && responseJson.data) {
        if (apiRequestCallId === this.sendOtpApiCallId) {
          this.onSignUpUserSuccessCallBack(responseJson);
        }
        if (apiRequestCallId === this.apiSocialLoginCallId) {
          this.onSocialLoginSuccessCallBack(responseJson);
        }
        if (apiRequestCallId === this.apiGuestLoginCallId) {
          this.onGuestLoginSuccessCallBack(responseJson);
        }
        if (apiRequestCallId === this.getHelpCenterApiCallId) {
          this.getHelpCenterDataSuccessCallBack(responseJson);
        }

        // Customizable Area Start
        // Customizable Area End
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.sendOtpApiCallId) {
          this.onSignUpUserFailureCallBack(responseJson);
        }
        if (apiRequestCallId === this.apiSocialLoginCallId) {
          this.onSocialLoginFailureCallBack(responseJson);
        }
        if (apiRequestCallId === this.apiGuestLoginCallId) {
          this.onGuestLoginSuccessCallBack(responseJson);
        }
        if (apiRequestCallId === this.getHelpCenterApiCallId) {
          this.getHelpCenterDataFailureCallBack(responseJson);
        }

        // Customizable Area Start
        // Customizable Area End
      } else if (errorReponse) {
        this.setState({
          isShowError: true,
          message: errorReponse,
          showAlertModal: true,
          isFetching: false,
          // Customizable Area Start
          // Customizable Area End
        });
        // Customizable Area Start
        // Customizable Area End
      }
    }

    // Customizable Area Start
    // Customizable Area End
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    const token = (await StorageProvider.get("Userdata")) || "";
    const header = {
      "Content-Type": contentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  onFocus(item: any) {
    // Customizable Area Start
    if (item === "email") {
      this.setState({ email: false, password: true, fullName: true }, () =>
        this.resetErrors()
      );
    } else if (item === "fullName") {
      this.setState({ email: true, password: true, fullName: false }, () =>
        this.resetErrors()
      );
    } else {
      this.setState({ email: true, password: false, fullName: true }, () =>
        this.resetErrors()
      );
    }
    // Customizable Area End
  }

  resetErrors = () => {
    this.setState({
      passwordError: false,
      emailError: false,
      nameError: false,
      message: "",
      isShowError: false,
      // Customizable Area Start
      // Customizable Area End
    });
  };

  txtInputFullNamePrpos = {
    onChangeText: (text: string) => {
      this.setState({ fullNameInput: text }, () => {
        this.resetErrors();
      });
      //@ts-ignore
      this.txtInputFullNamePrpos.value = text;
    },
    // Customizable Area Start
    placeholder: "Full Name",
    underlineColorAndroid: "transparent",
    // Customizable Area End
  };

  imgFullName = {
    source: R.signUpImages.imgFullName,
  };

  imgEmailIcon = {
    source: R.signUpImages.imgEmailIcon,
  };

  crossIcon = {
    source: R.signUpImages.crossIcon,
  };

  txtInputEmailWebPrpos = {
    onChangeText: (text: string) => {
      this.setState({ emailInput: text }, () => {
        this.resetErrors();
      });
      //@ts-ignore
      this.txtInputEmailPrpos.value = text;
    },
    // Customizable Area Start
    placeholder: "Email / Phone Number",
    underlineColorAndroid: "transparent",
    blurOnSubmit: false,
    // Customizable Area End
  };

  txtInputEmailMobilePrpos = {
    ...this.txtInputEmailWebPrpos,
    keyboardType: "email-address",
  };

  txtInputEmailPrpos = this.isPlatformWeb()
    ? this.txtInputEmailWebPrpos
    : this.txtInputEmailMobilePrpos;

  imgPasswordIcon = {
    source: R.signUpImages.imgPasswordIcon,
  };
  imgEnablePasswordFieldProps = {
    source: R.signUpImages.imgPasswordShowIcon,
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ passwordInput: text }, () => {
        this.resetErrors();
      });
    },
    secureTextEntry: true,
  };

  btnPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputPasswordProps.secureTextEntry =
        !this.state.enablePasswordField;
      this.imgEnablePasswordFieldProps.source = this.txtInputPasswordProps
        .secureTextEntry
        ? R.signUpImages.imgPasswordShowIcon
        : R.signUpImages.imgPasswordHideIcon;
    },
  };

  onCloseAlertModal = () => {
    this.setState({ showAlertModal: false }, () => {
      this.resetErrors();
    });
  };

  onPressSignUp = async () => {
    let phoneNo = "";
    if (
      this.state.fullNameInput.trim().length < 3 ||
      !Validators.isNameValid(this.state.fullNameInput)
    ) {
      // Customizable Area Start
      this.setState({
        nameError: true,
        message: `Name should contain minimum 3 characters`,
        showAlertModal: true,
        isShowError: true,
      });
      // Customizable Area End
      return;
    }
    if (
      this.state.emailInput.trim().length === 0 ||
      !Validators.isEmailValid(this.state.emailInput)
    ) {
      if (!Validators.isPhoneNoValid(this.state.emailInput)) {
        this.setState({
          emailError: true,
          message: "Invalid Email / Phone Number.",
          showAlertModal: true,
          isShowError: true,
        });
        return;
      }
    }
    if (Validators.isPhoneNoValid(this.state.emailInput)) {
      phoneNo = themeJson.attributes.country_code + this.state.emailInput;
    }

    if (
      this.state.passwordInput.trim().length === 0 ||
      !Validators.isPasswordValid(this.state.passwordInput)
    ) {
      // Customizable Area Start
      this.setState({
        passwordError: true,
        message:
          "Enter a password with alphabets A-z, number and a symbol(minimum 6 characters long)",
        showAlertModal: true,
        isShowError: true,
      });
      // Customizable Area End
      return;
    }

    this.setState({ isFetching: true });

    let signUpData = null;

    if (Validators.isPhoneNoValid(this.state.emailInput)) {
      signUpData = {
        data: {
          type: "sms_account",
          process: "register",
          attributes: {
            full_phone_number: phoneNo,
            full_name: this.state.fullNameInput,
          },
        },
      };
    } else {
      signUpData = {
        data: {
          type: "email_account",
          process: "register",
          attributes: {
            email: this.state.emailInput,
            full_name: this.state.fullNameInput,
          },
        },
      };
    }

    this.sendOtpApiCallId = await this.apiCall({
      contentType: configJSON.signupApiContentType,
      method: configJSON.apiMethodTypeAddDetail,
      endPoint: configJSON.sendOtpApiEndPoint,
      body: signUpData,
    });
  };

  onSignUpUserSuccessCallBack = async (res: any) => {
    this.setState({ token: res.meta.token, isFetching: false }, () => {
      this.props.navigation.navigate("OTPInputAuth", {
        token: res.meta.token,
        email: this.state.emailInput,
        password: this.state.passwordInput,
        fullname: this.state.fullNameInput,
      });
    });
  };

  onSignUpUserFailureCallBack = (error: any) => {
    if (error) {
      setTimeout(() => {
        this.setState({
          message: this.parseApiErrorResponse(error),
          isShowError: true,
          showAlertModal: true,
          isFetching: false,
        });
      }, 0);
    } else {
      setTimeout(() => {
        // Customizable Area Start
        this.setState({
          message: "Network Error!",
          isShowError: true,
          showAlertModal: true,
          isFetching: false,
        });
        // Customizable Area End
      }, 0);
    }
  };

  onSocialLogin = async (item: any) => {
    this.setState({ isFetching: true });
    const socialData = {
      data: {
        type: "social_account",
        attributes: item,
      },
    };
    this.apiSocialLoginCallId = await this.apiCall({
      contentType: configJSON.signupApiContentType,
      method: configJSON.signupAPiMethod,
      endPoint: configJSON.socialLoginAPiEndPoint,
      body: socialData,
    });
  };

  onSocialLoginSuccessCallBack = async (res: any) => {
    console.log("@@@ Social Login Success CallBack ===================", res);
    await StorageProvider.remove("GUEST_USER");
    await StorageProvider.set("SOCIAL_LOGIN_USER", "true");
    // Customizable Area Start
    setTimeout(() => {
      this.setState(
        {
          message: "You have been Logged In Successfully",
          isShowError: false,
          showAlertModal: true,
          isFetching: false,
        },
        async () => {}
      );
      setTimeout(() => {
        this.saveLoggedInUserData(res);
      }, 2000);
    }, 0);
    // Customizable Area Start
  };

  onSocialLoginFailureCallBack = (error: any) => {
    console.log("@@@ Social Login Failure CallBack ===================", error);
    if (error) {
      setTimeout(() => {
        this.setState({
          message: this.parseApiErrorResponse(error),
          isShowError: true,
          showAlertModal: true,
          isFetching: false,
        });
      }, 0);
    } else {
      // Customizable Area Start
      setTimeout(() => {
        this.setState({
          message: "Network Error!",
          isShowError: true,
          showAlertModal: true,
          isFetching: false,
        });
      }, 0);
      // Customizable Area End
    }
  };

  onGuestLogin = async () => {
    this.setState({ isFetching: true });
    const guestData = {
      data: {
        type: "guest_account",
        attributes: {
          uuid: DeviceInfo.getUniqueId(),
        },
      },
    };
    this.apiGuestLoginCallId = await this.apiCall({
      contentType: configJSON.signupApiContentType,
      method: configJSON.signupAPiMethod,
      endPoint: configJSON.guestLoginAPiEndPoint,
      body: guestData,
    });
  };

  onGuestLoginSuccessCallBack = async (res: any) => {
    console.log("@@@ Guest Login Success CallBack ===================", res);
    // Customizable Area Start
    setTimeout(() => {
      this.setState(
        {
          message: "You have been Logged In Successfully as Guest user",
          isShowError: false,
          showAlertModal: true,
          isFetching: false,
        },
        async () => {}
      );
      setTimeout(() => {
        this.saveLoggedInUserData(res, true);
      }, 2000);
    }, 0);
    // Customizable Area End
  };

  onGuestLoginFailureCallBack = (error: any) => {
    // Customizable Area Start
    console.log("@@@ Guest Login Failure CallBack ===================", error);
    if (error) {
      setTimeout(() => {
        this.setState({
          message: this.parseApiErrorResponse(error),
          isShowError: true,
          showAlertModal: true,
          isFetching: false,
        });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({
          message: "Network Error!",
          isShowError: true,
          showAlertModal: true,
          isFetching: false,
        });
      }, 0);
    }
    // Customizable Area End
  };

  initUser = async (token: string) => {
    fetch(
      "https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=" +
        token
    )
      .then((response) => {
        response.json().then((json) => {
          console.log("@@@ Facebook Login Response ============", json);
          let data = {
            access_token: token,
            provider: "facebook",
            // uuid: DeviceInfo.getUniqueId()
          };
          this.onSocialLogin(data);
        });
      })
      .catch(() => {
        console.log("ERROR GETTING DATA FROM FACEBOOK");
      });
  };

  onPressLoginWithFacebook = () => {
    if (Platform.OS === "android") {
      LoginManager.setLoginBehavior("web_only");
    }
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      (result) => {
        console.log("@@@ Result============", result);
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            if (data) {
              const { accessToken } = data;
              console.log("@@@ Access Token ===========", accessToken);
              this.initUser(accessToken);
            }
          });

          if (result && result.grantedPermissions) {
            console.log(
              "Login success with permissions: " +
                result.grantedPermissions.toString()
            );
          }
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  };

  onPressGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      const userToken = await GoogleSignin.getTokens();
      let data = {
        access_token: userToken.accessToken,
        provider: "google",
        // uuid: DeviceInfo.getUniqueId()
      };
      this.onSocialLogin(data);
      console.log("@@@ Google SignIn Response =========== ", userInfo);
    } catch (error) {
      // console.log("@@@ Message ==============================", error);
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   console.log("User Cancelled the Login Flow");
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   console.log("Signing In");
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   console.log("Play Services Not Available or Outdated");
      // } else {
      //   console.log("Some Other Error Happened");
      // }
    }
  };

  onPressLoginWithApple = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    console.log(
      "@@@ Apple Login Response ================",
      appleAuthRequestResponse
    );
    console.log("identityToken", appleAuthRequestResponse.identityToken);
    let data = {
      access_token: appleAuthRequestResponse.identityToken,
      provider: "apple",
      // uuid: DeviceInfo.getUniqueId()
    };
    this.onSocialLogin(data);
  };

  sendLoginFailMessage(message: any) {
    this.setState({
      showAlertModal: true,
      message: message,
      isShowError: true,
      isFetching: false,
    });
  }

  async saveLoggedInUserData(responseJson: any, isGuestUser: any = false) {
    console.log("@@@ SAVE LOGGED IN USER DATA ============", responseJson);
    await StorageProvider.set("Userdata", responseJson.meta.token);
    await StorageProvider.set("USER_ID", responseJson.data.id);
    if (isGuestUser) {
      await StorageProvider.set("GUEST_USER", "true");
    }
    this.props.navigation.replace("MainNavigator");
  }

  getHelpCenterData = async () => {
    this.getHelpCenterApiCallId = await this.apiCall({
      contentType: configJSON.signupApiContentType,
      method: configJSON.getAPiMethod,
      endPoint: configJSON.helpCenterApiEndPoint,
    });
  };

  getHelpCenterDataSuccessCallBack = async (res: any) => {
    console.log(
      "@@@ Get Help Center Data Success CallBack ===================",
      res.data
    );
    // Customizable Area Start
    this.setState({ helpCenterList: res.data }, () => {
      let privacyIndex = this.state.helpCenterList.findIndex(
        (item: any) =>
          item.attributes.help_center_type.toLowerCase() === "privacy policy"
      );
      let termsIndex = this.state.helpCenterList.findIndex(
        (item: any) =>
          item.attributes.help_center_type.toLowerCase() ===
            "terms & conditions" ||
          item.attributes.help_center_type.toLowerCase() === "terms of service"
      );
      if (privacyIndex !== -1) {
        this.setState({
          privacyPolicy: this.state.helpCenterList[privacyIndex],
        });
      }
      if (termsIndex !== -1) {
        this.setState({ termsPolicy: this.state.helpCenterList[termsIndex] });
      }
    });
    // Customizable Area End
  };

  getHelpCenterDataFailureCallBack = (error: any) => {
    // Customizable Area Start
    console.log(
      "@@@ Get Help Center Data Failure CallBack ===================",
      error
    );
    if (error) {
      setTimeout(() => {
        this.setState({
          message: this.parseApiErrorResponse(error),
          isShowError: true,
          showAlertModal: true,
          isFetching: false,
        });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({
          message: "Network Error!",
          isShowError: true,
          showAlertModal: true,
          isFetching: false,
        });
      }, 0);
    }
    // Customizable Area End
  };
}
