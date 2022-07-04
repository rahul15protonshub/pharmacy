import { BackHandler } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { isPasswordValid } from "../../../framework/src/utils/Validators";
import StorageProvider from "../../../framework/src/StorageProvider";
// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  textInputData: any;
  textInputFocusData: any;
  textInputErrorData: any;
  showMissmatchError: boolean;
  showPasswordChangedSuccessfully: boolean;
  showAlertModal: boolean;
  isShowError: boolean;
  message: any;
  isFetching: boolean;
  token: any;
  currentPasswordHide: boolean;
  newPasswordHide: boolean;
  confirmPasswordHide: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ChangePasswordController extends BlockComponent<
  Props,
  S,
  SS
> {
  changePasswordApiCallId: any;
  _unsubscribe: any;
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      textInputData: {
        currentPass: "",
        newPass: "",
        newPass1: "",
        // Customizable Area Start
        // Customizable Area End
      },
      textInputFocusData: {
        currentPassFocus: false,
        newPassFocus: false,
        newPass1Focus: false,
        // Customizable Area Start
        // Customizable Area End
      },
      textInputErrorData: {
        currentPassError: false,
        newPassError: false,
        newPass1Error: false,
        // Customizable Area Start
        // Customizable Area End
      },
      showMissmatchError: false,
      showPasswordChangedSuccessfully: false,
      isFetching: false,
      isShowError: false,
      message: "",
      showAlertModal: false,
      token: "",
      currentPasswordHide: true,
      newPasswordHide: true,
      confirmPasswordHide: true,
      // Customizable Area Start
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
      this.getToken();
    });
    // Customizable Area Start
    // Customizable Area End
  }

  async componentWillUnmount() {
    super.componentWillUnmount();
    this._unsubscribe;
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // Customizable Area Start
    // Customizable Area End
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  getToken = async () => {
    const token = await StorageProvider.get("Userdata");
    this.setState({ token: token });
  };

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

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId === this.changePasswordApiCallId) {
        if (responseJson?.message) {
          this.setState({
            isFetching: false,
            showPasswordChangedSuccessfully: true,
          });
        }
      }

      if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.changePasswordApiCallId) {
          this.profileDataFailureCallBack(responseJson);
        }
      } else if (errorReponse) {
        this.setState({
          isFetching: false,
        });
      }

      // Customizable Area Start
      // Customizable Area End
    }
    // Customizable Area Start
    // Customizable Area End
  }

  profileDataFailureCallBack = (error: any) => {
    if (error) {
      setTimeout(() => {
        this.setState({
          isFetching: false,
          isShowError: true,
          message: this.parseApiErrorResponse(error),
          showAlertModal: true,
        });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({
          message: "Network Error!",
          isShowError: true,
          showAlertModal: true,
        });
      }, 0);
    }
  };

  validateInput = () => {
    if (
      this.state.textInputData.currentPass.trim().length < 5 ||
      !isPasswordValid(this.state.textInputData.currentPass)
    ) {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          currentPassError: true,
        },
      }));
      return;
    } else if (
      this.state.textInputData.newPass.trim().length < 5 ||
      !isPasswordValid(this.state.textInputData.newPass)
    ) {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          newPassError: true,
        },
      }));
      return;
    } else if (
      this.state.textInputData.newPass1.trim().length < 5 ||
      !isPasswordValid(this.state.textInputData.newPass1)
    ) {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          newPass1Error: true,
        },
      }));
      return;
    }
    if (
      this.state.textInputData.newPass !== this.state.textInputData.newPass1
    ) {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          newPass1Error: true,
        },
        showAlertModal: true,
        message: "The Password you entered did not matched. Please try again",
        isShowError: true,
      }));
      return;
    } else {
      this.changePassword();
    }
  };

  onChangeTextInput = (input: string, text: string) => {
    this.setState((prevState) => ({
      textInputErrorData: {
        ...prevState.textInputErrorData,
        currentPassError: false,
        newPassError: false,
        newPass1Error: false,
      },
    }));
    this.setState({ ...this.state.textInputData, [input]: text });
    this.setState((prevState) => ({
      textInputData: {
        ...prevState.textInputData,
        [input]: text,
      },
    }));
  };

  changePassword = async () => {
    this.setState({ isFetching: true });

    const data = {
      current_password: this.state.textInputData.currentPass,
      password: this.state.textInputData.newPass,
      password_confirmation: this.state.textInputData.newPass1,
    };
    const httpBody = {
      token: this.state.token,
      data: data,
    };
    this.changePasswordApiCallId = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.apiMethodTypePut,
      endPoint: configJSON.changePasswordApiEndPoint,
      body: httpBody,
    });
  };
  // Customizable Area Start
  // Customizable Area End
}
