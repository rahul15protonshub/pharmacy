import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import axios from "axios";
// @ts-ignore
import map from "lodash/map";
//@ts-ignore
import StroageProvider from "../../../framework/src/StorageProvider.web";
// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  history: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  showPass: boolean;
  showConfirmPass: boolean;
  message: string;
  invalidPass: string;
  showSpinner: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
// Customizable Area End

export default class ForgotPasswordController extends BlockComponent<
  Props,
  S,
  SS
> {
  validationAPICallId: any;
  resetPasswordAPICallId: string = "";
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    this.state = {
      showPass: false,
      showConfirmPass: false,
      message: "",
      invalidPass: "",
      showSpinner: false,
    };
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {}

  async receive(from: string, message: Message) {
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
      if (this.parseExpireTokenResponse(responseJson, this.state, this.props)) {
        if (apiRequestCallId === this.resetPasswordAPICallId) {
          if (responseJson && responseJson.data && responseJson.meta) {
            this.setState({ showSpinner: false });
            this.setState({ invalidPass: "" });
            localStorage.setItem("token", "");
            localStorage.removeItem("accountType");
            this.props.history.push({
              pathname: "/login",
              state: { activeTab: "2" },
            });
            if (responseJson?.meta) {
              // @ts-ignore
              window.notify([
                { message: responseJson?.meta?.message, type: "success" },
              ]);
            }
          }
          if (responseJson && responseJson.errors) {
            this.setState({ showSpinner: false });
            if (
              responseJson.errors.full_phone_number &&
              responseJson.errors.full_phone_number.length > 0
            ) {
              const data1 = responseJson.errors?.full_phone_number[0];
              const data2 =
                data1 + " " + responseJson.errors?.full_phone_number[1];
              //@ts-ignore
              window.notify([
                { type: "danger", message: data2 || "Something Went Wrong!" },
              ]);
            }
            if (responseJson.errors.length > 0) {
              this.setState({ showSpinner: false });
              //@ts-ignore
              window.notify([
                {
                  type: "danger",
                  message:
                    responseJson.errors[0].message ||
                    responseJson.errors[0].email ||
                    "Something Went Wrong!",
                },
              ]);
            }
          }
        }
      }
    } else {
    }
    // Customizable Area End
  }

  setNewPass = async (values: any) => {
    console.log(values);
    const token = await localStorage.getItem("token");
    // const token = localStorage.getItem("token");
    // setShowSpinner(true);
    this.setState({ showSpinner: true });
    let data = {
      token,
      data: {
        password: values.password,
        password_confirmation: values.confirmpassword,
      },
    };
    return this.handleResetPassword(data);
  };

  showPassword = (e: any) => {
    e.preventDefault();
    // setShowPass(!showPass);
    this.setState({ showPass: !this.state.showPass });
  };
  showConfirmPassword = (e: any) => {
    e.preventDefault();
    this.setState({ showConfirmPass: !this.state.showConfirmPass });
    // setConfirmPass(!showConfirmPass);
  };

  //Reset Password
  handleResetPassword = async (data: any) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.resetPasswordAPICallId = requestMessage.messageId;
    if (localStorage.getItem("accountType") == "sms") {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.resetMobilePasswordAPIEndPoint
      );
    } else {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.resetPasswordAPIEndPoint
      );
    }

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
      configJSON.httpPutMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Customizable Area Start
  // Customizable Area End
}
