//@ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";

export const configJSON = require("./config");

export interface Props {
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  otpError?: any;
  showSpinner?: boolean;
  otpToken?: boolean;
  timer: number;
  isResendClicked?: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class OTPConfirmationController extends BlockComponent<
  Props,
  S,
  SS
> {
  resendOTPEmailAPICallId: string;
  sendEmailOTPApiCallId: string;
  registerEmailAPICallId: string;
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.AlertMessage),
      // Customizable Area Start
      // Customizable Area End
    ];
    this.state = {
      timer: 60,
    };
    this.timer = 60;
    this.receive = this.receive.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  startTimer() {
    // @ts-ignore
    if (this.timer == 60 && this.state.timer > 0) {
      // @ts-ignore
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // @ts-ignore
    let timer = this.state.timer - 1;
    this.setState({
      timer: timer,
      showSpinner: false,
    });

    // Check if we're at zero.
    if (timer == 0) {
      // @ts-ignore
      clearInterval(this.timer);
    }
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
        if (apiRequestCallId === this.sendEmailOTPApiCallId) {
          if (responseJson && responseJson.data && responseJson.meta) {
            this.setState({
              showSpinner: false,
            });
            // @ts-ignore
            // window.notify([
            //   {
            //     message: responseJson.meta && responseJson.meta.message,
            //     type: "success",
            //   },
            // ]);
            const { data, meta } = responseJson;
            localStorage.setItem("token", meta.token);
            await this.SignUp();
          }
          if (
            responseJson &&
            responseJson.errors &&
            responseJson.errors.length > 0
          ) {
            this.setState({
              showSpinner: false,
            });
            // @ts-ignore
            window.notify([
              {
                message:
                  responseJson.errors[0].pin && responseJson.errors[0].pin,
                type: "danger",
              },
            ]);
          }
        } else if (apiRequestCallId === this.resendOTPEmailAPICallId) {
          if (responseJson && responseJson.data && responseJson.meta) {
            this.timer = 60;
            this.setState(
              {
                showSpinner: false,
                timer: 60,
              },
              this.startTimer
            );
            localStorage.setItem(
              "token",
              responseJson.meta.token && responseJson.meta.token
            );
            //@ts-ignore
            // window.notify([
            //   { message: "OTP Hasbeen sent to you", type: "success" },
            // ]);
          }
          if (
            responseJson &&
            responseJson.errors &&
            responseJson.errors.length > 0
          ) {
            this.setState({
              showSpinner: false,
            });
            // @ts-ignore
            window.notify([
              {
                message:
                  (responseJson.errors[0].account &&
                    responseJson.errors[0].account) ||
                  "Something went wrong",
                type: "danger",
              },
            ]);
          }
        } else if (apiRequestCallId === this.registerEmailAPICallId) {
          if (responseJson && responseJson.data && responseJson.meta) {
            localStorage.removeItem("signUpUser");
            localStorage.removeItem("userFullName");
            const { data, meta } = responseJson;
            localStorage.setItem("user", JSON.stringify(data));
            let dat = {
              email:
                data.attributes?.type == "SmsAccount"
                  ? data.attributes?.full_phone_number
                  : data.attributes.email,
              name: data.attributes.full_name,
            };
            localStorage.setItem("userData", JSON.stringify(dat));
            localStorage.setItem(
              "profileImage",
              data.attributes?.image_url && data.attributes?.image_url
            );
            localStorage.setItem("token", meta?.token);
            //@ts-ignore
            // window.notify([
            //   { message: "Registered Successfully !", type: "success" },
            // ]);
            //@ts-ignore
            this.props?.history?.push("/home-page");
          }
          if (
            responseJson &&
            responseJson.errors &&
            responseJson.errors.length > 0
          ) {
            this.setState({
              showSpinner: false,
            });
            // @ts-ignore
            window.notify([
              {
                message:
                  responseJson.errors[0].account ||
                  responseJson.errors[0].full_phone_number ||
                  "Something went wrong",
                type: "danger",
              },
            ]);
          }
        }
      }
    }
  }

  //Email verfiyOTP
  sendEmailOTP = (values: any) => {
    const token = localStorage.getItem("token");
    this.setState({
      showSpinner: true,
    });
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.sendEmailOTPApiCallId = requestMessage.messageId;
    /* @ts-ignore */
    if (
      JSON.parse(localStorage.getItem("signUpUser"))?.accountType ==
      "PhoneAccount"
    ) {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.verfiyMobileOTPAPIEndPoint
      );
    } else {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.verfiyEmailOTPAPIEndPoint
      );
    }

    const requestBody = {
      token: token,
      pin: values.otp,
    };
    const headers = {
      "content-type": "application/json",
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
      configJSON.apiPostMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  //resend OTP method
  resendOTP = () => {
    const user = JSON.parse(localStorage.getItem("signUpUser"));
    this.setState({
      otpToken: "",
    });
    let countryInfo = JSON?.parse(localStorage.getItem("countryCode") ?? "{}");
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.resendOTPEmailAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.resendEmailOTPAPIEndPoint
    );

    let requestBody: any;
    if (user.Email?.includes("@") || user.accountType == "EmailAccount") {
      requestBody = {
        data: {
          type: "email_account",
          process: "register",
          attributes: {
            email: user.Email,
          },
        },
      };
    } else {
      requestBody = {
        data: {
          type: "sms_account",
          process: "register",
          attributes: {
            full_phone_number: countryInfo?.countryPinCode + user.Email,
          },
        },
      };
    }
    let headers = {
      "content-type": "application/json",
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
      configJSON.apiPostMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  SignUp = () => {
    const user = JSON.parse(localStorage.getItem("signUpUser"));
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userFullName");

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.registerEmailAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.emailRegistrationAPIEndPoint
    );
    let requestBody: any;
    if (user.accountType == "PhoneAccount") {
      requestBody = {
        token: token,
        data: {
          type: "sms_account",
          attributes: {
            full_name: userName,
            full_phone_number:
              JSON.parse(localStorage.getItem("countryCode") ?? "{}")
                ?.countryPinCode + user.Email,
            password: user.password,
          },
        },
      };
    } else {
      requestBody = {
        token: token,
        data: {
          attributes: {
            first_name: userName,
            full_name: userName,
            email: user.Email,
            password: user.password,
          },
          type: "email_account",
          // process: "register",
        },
      };
    }
    let headers = {
      "content-type": "application/json",
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
      configJSON.apiPostMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area Start
  // Customizable Area End
}
