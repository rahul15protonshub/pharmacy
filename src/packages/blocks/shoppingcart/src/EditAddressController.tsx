import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import * as Validators from "../../../framework/src/utils/Validators";
import StorageProvider from "../../../framework/src/StorageProvider";
import {
  ChangeStackNow,
  OnManageNavigation,
} from "../../studio-store-ecommerce-components/src/UtilNavigation/UtilNavigation";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  showCouponCodeModal: boolean;
  showGuestModal: boolean;
  textInputFocusData: any;
  textInputData: any;
  textInputErrorData: any;
  shippingtextInputData: any;
  shippingtextInputFocusData: any;
  shippingtextInputErrorData: any;
  token: any;
  isShowError: boolean;
  showAlertModal: boolean;
  message: any;
  isFetching: boolean;
  stateList: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class EditAddressController extends BlockComponent<
  Props,
  S,
  SS
> {
  addAddressApiCallId: any;
  editAddressApiCallId: any;
  getStateListApiCallId: string = "";
  refTextInput1: any;
  refTextInput2: any;
  refTextInput3: any;
  refTextInput4: any;
  refTextInput5: any;
  refTextInput6: any;
  refTextInput7: any;
  refTextInput8: any;
  refTextInput9: any;
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      showCouponCodeModal: false,
      showGuestModal: false,
      token: "",
      isShowError: false,
      isFetching: false,
      message: null,
      showAlertModal: false,
      textInputData: {
        name: "",
        flat_no: "",
        address: "",
        address_line_2: "",
        zip_code: "",
        phone_number: "",
        city: "",
        address_state_id: "",
        country: "",
        is_default: true,
      },
      textInputFocusData: {
        nameFocus: false,
        flatNoFocus: false,
        addressLine1Focus: false,
        addressLine2Focus: false,
        pinCodeFocus: false,
        phoneNoFocus: false,
        cityFocus: false,
        stateFocus: false,
        countryFocus: false,
      },
      textInputErrorData: {
        nameError: false,
        flatNoError: false,
        addressLine1Error: false,
        addressLine2Error: false,
        pinCodeError: false,
        phoneNoError: false,
        cityError: false,
        stateError: false,
        countryError: false,
      },
      shippingtextInputData: {
        name: "",
        flatNo: "",
        address: "",
        address_line_2: "",
        pinCode: "",
        phoneNo: "",
        city: "",
        address_state_id: "",
        country: "",
      },
      shippingtextInputFocusData: {
        nameFocus: false,
        flatNoFocus: false,
        addressLine1Focus: false,
        addressLine2Focus: false,
        pinCodeFocus: false,
        phoneNoFocus: false,
        cityFocus: false,
        stateFocus: false,
        countryFocus: false,
      },
      shippingtextInputErrorData: {
        nameError: false,
        flatNoError: false,
        addressLine1Error: false,
        addressLine2Error: false,
        pinCodeError: false,
        phoneNoError: false,
        cityError: false,
        stateError: false,
        countryError: false,
      },
      stateList: [],
      // Customizable Area Start
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    // Customizable Area Start
    // Customizable Area End
  }

  async componentWillUnmount() {
    super.componentWillUnmount();
    // Customizable Area Start
    // Customizable Area End
  }

  getToken = async () => {
    const token = await StorageProvider.get("Userdata");
    const item = this.props.navigation.getParam("isFromEdit")
      ? this.props.navigation.getParam("addressData")
      : null;
    this.setState(
      {
        token: token,
        textInputData:
          this.props.navigation.getParam("isFromEdit") &&
          this.props.navigation.getParam("addressData")
            ? {
                name: item.name,
                flat_no: item.flat_no,
                address: item.address,
                address_line_2: item.address_line_2,
                zip_code: item.zip_code,
                phone_number: item.phone_number,
                city: item.city,
                address_state_id: item.address_state_id,
                country:
                  item.country.charAt(0).toUpperCase() + item.country.slice(1),
                is_default: item.is_default,
              }
            : {
                name: "",
                flat_no: "",
                address: "",
                address_line_2: "",
                zip_code: "",
                phone_number: "",
                city: "",
                address_state_id: "",
                country: "",
                is_default: this.props.navigation.getParam("isFirst")
                  ? true
                  : false,
              },
      },
      () => {
        this.getStateList();
      }
    );
  };

  async receive(from: string, message: Message) {
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    var responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    var errorReponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );

    let resultSesseion = OnManageNavigation(
      responseJson,
      errorReponse,
      this.props.navigation
    );
    if (resultSesseion) {
      this.setState({ isFetching: false });
      ChangeStackNow(this.props.navigation);
    }

    if (responseJson && responseJson.data) {
      if (apiRequestCallId === this.getStateListApiCallId) {
        this.setState({ stateList: responseJson.data });
      } else if (apiRequestCallId === this.addAddressApiCallId) {
        this.setState({ isFetching: false }, () => {
          this.props.navigation.navigate("SavedAddress");
        });
      } else if (apiRequestCallId === this.editAddressApiCallId) {
        this.setState({ isFetching: false }, () => {
          this.props.navigation.navigate("SavedAddress");
        });
      }
      // Customizable Area Start
      // Customizable Area End
    } else if (responseJson && responseJson.errors) {
      this.setState({
        isShowError: true,
        message: this.parseApiErrorResponse(responseJson),
        showAlertModal: true,
        isFetching: false,
      });
      // Customizable Area Start
      // Customizable Area End
    } else if (errorReponse) {
      this.setState({
        isFetching: false,
      });
      // Customizable Area Start
      // Customizable Area End
    }
    // Customizable Area Start

    // Customizable Area End
  }

  clearFocus = () => {
    this.setState({
      textInputFocusData: {
        nameFocus: false,
        flatNoFocus: false,
        addressLine1Focus: false,
        addressLine2Focus: false,
        pinCodeFocus: false,
        phoneNoFocus: false,
        cityFocus: false,
        stateFocus: false,
        countryFocus: false,
        otpFocus: false,
        // Customizable Area Start
        // Customizable Area End
      },
    });
  };

  validateInput = () => {
    this.clearFocus();
    if (this.state.textInputData.name === "") {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          nameError: true,
        },
      }));
    } else if (this.state.textInputData.flat_no === "") {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          flatNoError: true,
        },
      }));
    } else if (this.state.textInputData.address === "") {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          addressLine1Error: true,
        },
      }));
    } else if (this.state.textInputData.city === "") {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          cityError: true,
        },
      }));
    } else if (this.state.textInputData.address_state_id === "") {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          stateError: true,
        },
      }));
    } else if (this.state.textInputData.country === "") {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          countryError: true,
        },
      }));
    } else if (this.state.textInputData.zip_code === "") {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          pinCodeError: true,
        },
      }));
    } else if (
      this.state.textInputData.phone_number === "" ||
      !Validators.isPhoneNoValid(this.state.textInputData.phone_number)
    ) {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          phoneNoError: true,
        },
      }));
    } else {
      if (!this.props.navigation.getParam("isFromEdit")) {
        this.saveAddress();
      } else {
        this.editAddress(this.props.navigation.getParam("addressData").id);
      }
    }
  };

  getStateList = async () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getStateListApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getStateListAPIEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  saveAddress = () => {
    this.setState({ isFetching: true });
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: this.state.token,
    };
    const httpBody = {
      address: this.state.textInputData,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.addAddressApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createNewAddressAPIEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePost
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  editAddress = (id: any) => {
    this.setState({ isFetching: true });
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: this.state.token,
    };
    const httpBody = {
      address: this.state.textInputData,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.editAddressApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createNewAddressAPIEndPoint + "/" + id
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePut
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  clearInputErrors = () => {
    this.setState((prevState) => ({
      textInputErrorData: {
        ...prevState.textInputErrorData,
        nameError: false,
        flatNoError: false,
        addressLine1Error: false,
        addressLine2Error: false,
        pinCodeError: false,
        phoneNoError: false,
        cityError: false,
        stateError: false,
        countryError: false,
        otpError: false,
        // Customizable Area Start
        // Customizable Area End
      },
    }));
  };

  textInputNameProps = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        textInputData: {
          ...prevState.textInputData,
          name: text,
        },
      }));
      this.clearInputErrors();
    },
  };

  textInputFlatProps = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        textInputData: {
          ...prevState.textInputData,
          flat_no: text,
        },
      }));
      this.clearInputErrors();
    },
  };
  textInputAddressLine1Props = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        textInputData: {
          ...prevState.textInputData,
          address: text,
        },
      }));
      this.clearInputErrors();
    },
  };
  textInputAddressLine2Props = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        textInputData: {
          ...prevState.textInputData,
          address_line_2: text,
        },
      }));
      this.clearInputErrors();
    },
  };
  textInputCityProps = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        textInputData: {
          ...prevState.textInputData,
          city: text,
        },
      }));
      this.clearInputErrors();
    },
  };
  selectStateProps = {
    onValueChange: (itemValue: string, itemIndex: number) => {
      this.setState((prevState) => ({
        textInputData: {
          ...prevState.textInputData,
          address_state_id: itemValue,
          state:
            itemIndex > 0
              ? this.state.stateList[itemIndex - 1].attributes.name
              : "",
        },
      }));
      this.clearInputErrors();
    },
  };
  textInputCountryProps = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        textInputData: {
          ...prevState.textInputData,
          country: text,
        },
      }));
      this.clearInputErrors();
    },
  };
  textInputPinCodeProps = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        textInputData: {
          ...prevState.textInputData,
          zip_code: text,
        },
      }));
      this.clearInputErrors();
    },
  };
  textInputPhoneNoProps = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        textInputData: {
          ...prevState.textInputData,
          phone_number: text,
        },
      }));
      this.clearInputErrors();
    },
  };
  // Customizable Area Start
  // Customizable Area End
}
