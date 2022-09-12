import { Platform } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import * as Validators from "../../../framework/src/Validators";
import { runEngine } from "../../../framework/src/RunEngine";
import * as IMG_CONST from "../../studio-store-ecommerce-theme/src/ImageConstants";
import {
  imgPasswordHideIcon,
  imgPasswordShowIcon,
  imgEmailIcon,
  imgPasswordIcon,
} from "./../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-community/google-signin";
import StorageProvider from "../../../framework/src/StorageProvider";
import DeviceInfo from "react-native-device-info";
import appleAuth from "@invertase/react-native-apple-authentication";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  fromCart: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  emailInput: string;
  passwordInput: string;
  emailError: boolean;
  passwordError: boolean;
  email: boolean;
  password: boolean;
  message: any;
  showAlertModal: boolean;
  showLoginSuccess: boolean;
  enablePasswordField: boolean;
  fromCart: boolean;
  isShowError: boolean;
  isFetching: boolean;
  errorMessage: any;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class LoginController extends BlockComponent<Props, S, SS> {
  emailReg: RegExp;
  apiEmailLoginCallId: string = "";
  apiSocialLoginCallId: string = "";
  apiGuestLoginCallId: string = "";
  sendOtpApiCallId: string = "";
  secondTextInput: any;

  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      emailInput: "",
      passwordInput: "",
      emailError: false,
      passwordError: false,
      email: true,
      password: true,
      errorMessage: "",
      showAlertModal: false,
      showLoginSuccess: false,
      enablePasswordField: true,
      fromCart: props.fromCart,
      message: "",
      isShowError: false,
      isFetching: false,
      // Customizable Area Start
      // Customizable Area End
    };

    this.emailReg = new RegExp("");
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    this.setupGoogleConfiguration();
    // Customizable Area Start
    // Customizable Area End
  }

  async componentWillUnmount() {
    super.componentDidMount();
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  setupGoogleConfiguration = () => {
    // Customizable Area Start
    GoogleSignin.configure({
      scopes: ["profile", "email"],
      webClientId:
        "60789253831-jm71v8bdhhptl8qn7dg7je6o8e6lno6v.apps.googleusercontent.com",
    });
    // Customizable Area End
  };

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (
        responseJson &&
        responseJson.data &&
        responseJson.meta &&
        responseJson.meta.token
      ) {
        if (apiRequestCallId === this.apiEmailLoginCallId) {
          this.onLoginUserSuccessCallBack(responseJson);
        }
        if (apiRequestCallId === this.apiSocialLoginCallId) {
          this.onSocialLoginSuccessCallBack(responseJson);
        }
        if (apiRequestCallId === this.apiGuestLoginCallId) {
          this.onGuestLoginSuccessCallBack(responseJson);
        }
        if (apiRequestCallId === this.sendOtpApiCallId) {
          this.onSendVerificationOTPSuccessCallBack(responseJson);
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.apiEmailLoginCallId) {
          this.onLoginUserFailureCallBack(responseJson);
        }
        if (apiRequestCallId === this.apiSocialLoginCallId) {
          this.onSocialLoginFailureCallBack(responseJson);
        }
        if (apiRequestCallId === this.apiGuestLoginCallId) {
          this.onGuestLoginSuccessCallBack(responseJson);
        }
        if (apiRequestCallId === this.sendOtpApiCallId) {
          this.onSendVerificationOTPFailureCallBack(responseJson);
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (errorReponse) {
        this.setState({
          isShowError: true,
          message: errorReponse,
          showAlertModal: true,
          isFetching: false,
        });
        // Customizable Area Start
        // Customizable Area End
      }
      // Customizable Area Start
      // Customizable Area End
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

  onCloseAlertModal = () => {
    this.setState({ showAlertModal: false }, () => {
      this.resetErrors();
    });
  };

  onFocus(item: any) {
    if (item === "email") {
      this.setState({ email: false, password: true });
    } else {
      this.setState({ email: true, password: false });
    }
  }

  resetErrors = () => {
    this.setState({
      passwordError: false,
      emailError: false,
      message: "",
    });
  };

  imgEmailIcon = {
    source: imgEmailIcon,
  };

  crossIcon = {
    source: IMG_CONST.CROSS_ICON,
  };

  txtInputEmailWebPrpos = {
    onChangeText: (text: string) => {
      this.setState({ emailInput: text }, () => {
        this.resetErrors();
      });
      //@ts-ignore
      this.txtInputEmailPrpos.value = text;
    },
  };

  txtInputEmailMobilePrpos = {
    ...this.txtInputEmailWebPrpos,
    keyboardType: "email-address",
  };

  txtInputEmailPrpos = this.isPlatformWeb()
    ? this.txtInputEmailWebPrpos
    : this.txtInputEmailMobilePrpos;

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ passwordInput: text }, () => {
        this.resetErrors();
      });
    },
    secureTextEntry: true,
  };

  imgPasswordIcon = {
    source: imgPasswordIcon,
  };

  imgEnablePasswordFieldProps = {
    source: imgPasswordShowIcon,
  };

  btnPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputPasswordProps.secureTextEntry =
        !this.state.enablePasswordField;
      this.imgEnablePasswordFieldProps.source = this.txtInputPasswordProps
        .secureTextEntry
        ? imgPasswordShowIcon
        : imgPasswordHideIcon;
    },
  };

  onPressLogin = async () => {
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
    if (
      this.state.passwordInput.trim().length < 5 ||
      !Validators.isPasswordValid(this.state.passwordInput)
    ) {
      this.setState({
        passwordError: true,
        message:
          "Enter a password with alphabets A-z, number and a symbol(minimum 6 characters long)",
        showAlertModal: true,
        isShowError: true,
      });
      return;
    }
    let fcmToken = await StorageProvider.get("USER_FCM_TOKEN");
    let phoneNo = "";
    if (Validators.isPhoneNoValid(this.state.emailInput)) {
      phoneNo = themeJson.attributes.country_code + this.state.emailInput;
    }
    let data = null;
    if (Validators.isPhoneNoValid(this.state.emailInput)) {
      data = {
        email_or_mobile: phoneNo,
        password: this.state.passwordInput,
        device_token: fcmToken,
      };
    } else {
      data = {
        email_or_mobile: this.state.emailInput.toLowerCase(),
        password: this.state.passwordInput,
        device_token: fcmToken,
          };
    }
    this.setState({ isFetching: true });
    this.apiEmailLoginCallId = await this.apiCall({
      contentType: configJSON.loginApiContentType,
      method: configJSON.loginAPiMethod,
      endPoint: configJSON.loginAPiEndPoint,
      body: data,
    });
  };

  onLoginUserSuccessCallBack = async (res: any) => {
    await StorageProvider.remove("GUEST_USER");
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
  };

  onLoginUserFailureCallBack = (error: any) => {
    if (error) {
      setTimeout(() => {
        this.setState(
          {
            message: this.parseApiErrorResponse(error),
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
          },
          () => {
            setTimeout(() => {
              if (
                this.state.message ===
                "Sorry, You need to confirm your account first."
              ) {
                this.onSendVerificationOTP();
              }
            }, 2000);
          }
        );
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
  };

  onSocialLoginSuccessCallBack = async (res: any) => {
    await StorageProvider.remove("GUEST_USER");
    await StorageProvider.set("SOCIAL_LOGIN_USER", "true");
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
  };

  onSocialLoginFailureCallBack = (error: any) => {
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
  };

  onGuestLoginSuccessCallBack = async (res: any) => {
    await StorageProvider.remove("GUEST_USER");
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
  };

  onGuestLoginFailureCallBack = (error: any) => {
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
  };

  onSendVerificationOTP = async () => {
    let signUpData = null;
    let phoneNo = "";
    if (Validators.isPhoneNoValid(this.state.emailInput)) {
      phoneNo = themeJson.attributes.country_code + this.state.emailInput;
    }
    if (Validators.isPhoneNoValid(this.state.emailInput)) {
      signUpData = {
        data: {
          type: "sms_account",
          process: "register",
          attributes: {
            full_phone_number: phoneNo,
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
          },
        },
      };
    }
    this.sendOtpApiCallId = await this.apiCall({
      contentType: configJSON.loginApiContentType,
      method: configJSON.loginAPiMethod,
      endPoint: configJSON.sendOtpApiEndPoint,
      body: signUpData,
    });
  };

  onSendVerificationOTPSuccessCallBack = async (res: any) => {
    this.setState({ isFetching: false }, () => {
      this.props.navigation.navigate("OTPInputAuth", {
        token: res.meta.token,
        email: this.state.emailInput,
        password: this.state.passwordInput,
        fullname: res.data.attributes.full_name,
      });
    });
  };

  onSendVerificationOTPFailureCallBack = (error: any) => {
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
  };

  initUser = async (token: string) => {
    fetch(
      "https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=" +
        token
    )
      .then((response) => {
        response.json().then((json) => {
          let data = {
            access_token: token,
            provider: "facebook",
          };
          this.onSocialLogin(data);
        });
      })
      .catch(() => {
      });
  };

  onPressLoginWithFacebook = () => {
    if (Platform.OS === "android") {
      LoginManager.setLoginBehavior("web_only");
    }
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      (result) => {
        if (result.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken =
              data && data.accessToken ? data.accessToken : "";
            this.initUser(accessToken);
          });
        }
      },
      function (error) {
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
      };
      this.onSocialLogin(data);
    } catch (error:any) {
     
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        
      } else if (error.code === statusCodes.IN_PROGRESS) {
       
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        
      } else {
        
      }
    }
  };

  onPressLoginWithApple = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    let data = {
      access_token: appleAuthRequestResponse.identityToken,
      provider: "apple",
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
    await StorageProvider.set("Userdata", responseJson.meta.token);
    await StorageProvider.set("USER_ID", responseJson.data.id);
    if (isGuestUser) {
      await StorageProvider.set("GUEST_USER", "true");
    }
    this.props.navigation.replace("MainNavigator");
  }

  onSocialLogin = async (item: any) => {
    this.setState({ isFetching: true });
    const socialData = {
      data: {
        type: "social_account",
        attributes: item,
      },
    };
    this.apiSocialLoginCallId = await this.apiCall({
      contentType: configJSON.loginApiContentType,
      method: configJSON.loginAPiMethod,
      endPoint: configJSON.socialLoginAPiEndPoint,
      body: socialData,
    });
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
      contentType: configJSON.loginApiContentType,
      method: configJSON.loginAPiMethod,
      endPoint: configJSON.guestLoginAPiEndPoint,
      body: guestData,
    });
  };

  // Customizable Area Start

    goforgotpassword=async()=>{
    this.props.navigation.replace("ForgotPassword")
  }
  // Customizable Area End
}
