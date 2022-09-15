import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider";
import { BackHandler } from "react-native";
import {
  ChangeStackNow,
  OnManageNavigation,
} from "../../studio-store-ecommerce-components/src/UtilNavigation/UtilNavigation";

// Customizable Area Start
import * as Validators from "../../../framework/src/Validators";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  showCouponCodeModal: boolean;
  showGuestModal: boolean;
  textInputFocusData: any;
  textInputData: any;
  textInputErrorData: any;
  shippingtextInputData: any;
  shippingtextInputFocusData: any;
  shippingtextInputErrorData: any;
  billingAndAddressSame: boolean;
  saveAddress: boolean;
  shippingsaveAddress: boolean;
  token: any;
  isFetching: boolean;
  addressList: any;
  customErrorModal: boolean;
  isShowError: boolean;
  customErrorMessage: string;
  stateList: Array<any>;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CheckoutController extends BlockComponent<Props, S, SS> {
  scrollViewRef: any;
  getAddressDataId: any;
  saveBillingAddressId: any;
  saveShippingAddressId: any;
  getStateListId: string = "";
  refTextInput1: any;
  refTextInput2: any;
  refTextInput3: any;
  refTextInput4: any;
  refTextInput5: any;
  refTextInput6: any;
  refTextInput7: any;
  refTextInput8: any;
  refTextInput9: any;
  refTextInput10: any;
  refTextInput11: any;
  refTextInput12: any;
  refTextInput13: any;
  refTextInput14: any;
  refTextInput15: any;
  refTextInput16: any;
  refTextInput17: any;
  refTextInput18: any;
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
      customErrorModal: false,
      isShowError: false,
      customErrorMessage: "",
      token: null,
      isFetching: false,
      addressList: null,
      saveAddress: false,
      shippingsaveAddress: false,
      showCouponCodeModal: false,
      showGuestModal: false,
      billingAndAddressSame: false,
      textInputData: {
        name: "",
        flat_no: "",
        address: "",
        address_line_2: "",
        zip_code: "",
        phone_number: "",
        city: "",
        state: "",
        address_state_id: "",
        country: "",
        is_default: false,
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
        flat_no: "",
        address: "",
        address_line_2: "",
        zip_code: "",
        phone_number: "",
        city: "",
        state: "",
        address_state_id: "",
        country: "",
        is_default: false,
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
    this.getAddressData();
    this.getStateList();
    BackHandler.addEventListener(
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

  async componentWillUnmount() {
    super.componentWillUnmount();
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
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
        if (apiRequestCallId === this.getStateListId) {
          this.setState({ stateList: responseJson.data });
        } else if (apiRequestCallId === this.getAddressDataId) {
          this.setState({ addressList: responseJson.data });
        } else if (
          apiRequestCallId === this.saveBillingAddressId &&
          !this.state.shippingsaveAddress
        ) {
          const addressData = this.createAddress();
          this.props.navigation.navigate("Ordersummary", {
            checkoutData: addressData,
            isFrom: "checkout",
            onSetAddress: (addressData: any) =>
              this.onSetAddress(true, addressData),
          });
        } else if (apiRequestCallId === this.saveShippingAddressId) {
          const addressData = this.createAddress();
          this.props.navigation.navigate("Ordersummary", {
            checkoutData: addressData,
            isFrom: "checkout",
            onSetAddress: (addressData: any) =>
              this.onSetAddress(true, addressData),
          });
          // Customizable Area Start
          // Customizable Area End
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.getAddressDataId) {
          this.setState({ isFetching: false });
          this.parseApiErrorResponse(responseJson.errors);
        } else if (
          apiRequestCallId === this.saveBillingAddressId &&
          !this.state.shippingsaveAddress
        ) {
          this.setState({ isFetching: false });
          this.parseApiErrorResponse(responseJson.errors);
        } else if (apiRequestCallId === this.saveShippingAddressId) {
          this.setState({ isFetching: false });
          this.parseApiErrorResponse(responseJson.errors);
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (errorReponse) {
        if (apiRequestCallId === this.getAddressDataId) {
          this.setState({ isFetching: false });
          this.parseApiCatchErrorResponse(errorReponse);
        } else if (
          apiRequestCallId === this.saveBillingAddressId &&
          !this.state.shippingsaveAddress
        ) {
          this.setState({ isFetching: false });
          this.parseApiCatchErrorResponse(errorReponse);
        } else if (apiRequestCallId === this.saveShippingAddressId) {
          this.setState({ isFetching: false });
          this.parseApiCatchErrorResponse(errorReponse);
        }
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

  enableMyBillingAddressSame = () => {
    this.setState(
      { billingAndAddressSame: !this.state.billingAndAddressSame },
      () => {
        const {
          name,
          flat_no,
          address,
          zip_code,
          phone_number,
          city,
          address_state_id,
          state,
          country,
          id,
        } = this.state.textInputData;
        if (this.state.billingAndAddressSame) {
          this.setState((prevState) => ({
            shippingtextInputData: {
              ...prevState.shippingtextInputData,
              name: name,
              id: id,
              flat_no: flat_no,
              address: address,
              zip_code: zip_code,
              phone_number: phone_number,
              city: city ? city : "",
              state: state ? state : "",
              address_state_id: address_state_id ? address_state_id : "",
              country: country ? country : "",
            },
          }));
        } else {
          this.setState((prevState) => ({
            shippingtextInputData: {
              ...prevState.shippingtextInputData,
              name: "",
              flat_no: "",
              address: "",
              zip_code: "",
              phone_number: "",
              city: "",
              address_state_id: "",
              country: "",
            },
          }));
        }
      }
    );
  };

  textInputNameProps = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        textInputData: {
          ...prevState.textInputData,
          name: text,
        },
      }));
      if (this.state.billingAndAddressSame) {
        this.setState((prevState) => ({
          shippingtextInputData: {
            ...prevState.textInputData,
            name: text,
          },
        }));
      }
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
      if (this.state.billingAndAddressSame) {
        this.setState((prevState) => ({
          shippingtextInputData: {
            ...prevState.textInputData,
            flat_no: text,
          },
        }));
      }
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
      if (this.state.billingAndAddressSame) {
        this.setState((prevState) => ({
          shippingtextInputData: {
            ...prevState.textInputData,
            address: text,
          },
        }));
      }
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
      if (this.state.billingAndAddressSame) {
        this.setState((prevState) => ({
          shippingtextInputData: {
            ...prevState.textInputData,
            address_line_2: text,
          },
        }));
      }
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
      if (this.state.billingAndAddressSame) {
        this.setState((prevState) => ({
          shippingtextInputData: {
            ...prevState.textInputData,
            city: text,
          },
        }));
      }
    },
  };
  selectInputStateProps = {
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
      if (this.state.billingAndAddressSame) {
        this.setState((prevState) => ({
          shippingtextInputData: {
            ...prevState.textInputData,
            address_state_id: itemValue,
            state:
              itemIndex > 0
                ? this.state.stateList[itemIndex - 1].attributes.name
                : "",
          },
        }));
      }
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
      if (this.state.billingAndAddressSame) {
        this.setState((prevState) => ({
          shippingtextInputData: {
            ...prevState.textInputData,
            country: text,
          },
        }));
      }
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
      if (this.state.billingAndAddressSame) {
        this.setState((prevState) => ({
          shippingtextInputData: {
            ...prevState.textInputData,
            zip_code: text,
          },
        }));
      }
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
      if (this.state.billingAndAddressSame) {
        this.setState((prevState) => ({
          shippingtextInputData: {
            ...prevState.textInputData,
            phone_number: text,
          },
        }));
      }
    },
  };

  //Shipping TextInput Area
  shippingtextInputNameProps = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        shippingtextInputData: {
          ...prevState.shippingtextInputData,
          name: text,
        },
      }));
    },
  };
  shippingtextInputFlatProps = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        shippingtextInputData: {
          ...prevState.shippingtextInputData,
          flat_no: text,
        },
      }));
    },
  };
  shippingtextInputAddressLine1Props = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        shippingtextInputData: {
          ...prevState.shippingtextInputData,
          address: text,
        },
      }));
    },
  };
  shippingtextInputAddressLine2Props = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        shippingtextInputData: {
          ...prevState.shippingtextInputData,
          address_line_2: text,
        },
      }));
    },
  };
  shippingtextInputCityProps = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        shippingtextInputData: {
          ...prevState.shippingtextInputData,
          city: text,
        },
      }));
    },
  };
  shippingSelectStateProps = {
    onValueChange: (itemValue: string, itemIndex: number) => {
      this.setState((prevState) => ({
        shippingtextInputData: {
          ...prevState.shippingtextInputData,
          address_state_id: itemValue,
          state:
            itemIndex > 0
              ? this.state.stateList[itemIndex - 1].attributes.name
              : "",
        },
      }));
    },
  };
  shippingtextInputCountryProps = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        shippingtextInputData: {
          ...prevState.shippingtextInputData,
          country: text,
        },
      }));
    },
  };
  shippingtextInputPinCodeProps = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        shippingtextInputData: {
          ...prevState.shippingtextInputData,
          zip_code: text,
        },
      }));
    },
  };
  shippingtextInputPhoneNoProps = {
    onChangeText: (text: string) => {
      this.setState((prevState) => ({
        shippingtextInputData: {
          ...prevState.shippingtextInputData,
          phone_number: text,
        },
      }));
    },
  };

  onSetAddress = (address: any, type: string) => {
    let data = address?.attributes;
    const textInputData = {
      ...data,
      name: data.name,
      flat_no: data.flat_no,
      address: data.address,
      zip_code: data.zip_code,
      phone_number: data.phone_number,
      city: data.city,
      address_state_id: data.address_state_id,
      country: data.country.charAt(0).toUpperCase() + data.country.slice(1),
    };
    this.setState({ textInputData: textInputData });
    if (this.state.billingAndAddressSame) {
      const shippingTextInputData = {
        ...data,
        name: data.name,
        flat_no: data.flat_no,
        address: data.address,
        zip_code: data.zip_code,
        phone_number: data.phone_number,
        city: data.city,
        address_state_id: data.address_state_id,
        country: data.country.charAt(0).toUpperCase() + data.country.slice(1),
      };
      this.setState({ shippingtextInputData: shippingTextInputData });
    }
  };
  validateInput = () => {
    // Customizable Area Start
    if (this.state.textInputData.name === "") {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          nameError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Name is required",
      }));
    }
    else if (!Validators.isNameValidNew(this.state.textInputData.name)) {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          nameError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Enter a name with alphabets A-z",
      }));
    } else if (this.state.textInputData.flat_no === "") {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          flatNoError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Flat no. is required",
      }));
    } else if (this.state.textInputData.address === "") {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          addressLine1Error: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Address is required",
      }));
    } else if (this.state.textInputData.city === "") {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          cityError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "City is required",
      }));
    } else if (!Validators.isNameValidNew(this.state.textInputData.city)) {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          cityError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Enter a city with alphabets A-z",
      }));
    }
    else if (this.state.textInputData.address_state_id === "") {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          stateError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "State is required",
      }));
    } else if (this.state.textInputData.country === "") {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          countryError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Country is required",
      }));
    }
    else if (!Validators.isNameValidNew(this.state.textInputData.country)) {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          countryError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Enter a country with alphabets A-z",
      }));
    } else if (this.state.textInputData.zip_code === "") {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          pinCodeError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Pin code is required",
      }));
    } else if (this.state.textInputData.phone_number === "") {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          phoneNoError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Phone number is required",
      }));
    }
    else if (!Validators.isPhoneNoValid(this.state.textInputData.phone_number)) {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          phoneNoError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Invalid Phone Number",
      }));
    } else if (this.state.shippingtextInputData.name === "") {
      this.setState((prevState) => ({
        shippingtextInputErrorData: {
          ...prevState.shippingtextInputErrorData,
          nameError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Name is required",
      }));
    }
    else if (!Validators.isNameValidNew(this.state.shippingtextInputData.name)) {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          nameError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Enter a name with alphabets A-z",
      }));
    } else if (this.state.shippingtextInputData.flat_no === "") {
      this.setState((prevState) => ({
        shippingtextInputErrorData: {
          ...prevState.shippingtextInputErrorData,
          flatNoError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Flat no. is required",
      }));
    } else if (this.state.shippingtextInputData.address === "") {
      this.setState((prevState) => ({
        shippingtextInputErrorData: {
          ...prevState.shippingtextInputErrorData,
          addressLine1Error: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Address is required",
      }));
    } else if (this.state.shippingtextInputData.city === "") {
      this.setState((prevState) => ({
        shippingtextInputErrorData: {
          ...prevState.shippingtextInputErrorData,
          cityError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "City is required",
      }));
    }
    else if (!Validators.isNameValidNew(this.state.shippingtextInputData.city)) {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          cityError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Enter a city with alphabets A-z",
      }));
    } else if (this.state.shippingtextInputData.address_state_id === "") {
      this.setState((prevState) => ({
        shippingtextInputErrorData: {
          ...prevState.shippingtextInputErrorData,
          stateError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "State is required",
      }));
    } else if (this.state.shippingtextInputData.country === "") {
      this.setState((prevState) => ({
        shippingtextInputErrorData: {
          ...prevState.shippingtextInputErrorData,
          countryError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Country is required",
      }));
    }
    else if (!Validators.isNameValidNew(this.state.shippingtextInputData.country)) {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          countryError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Enter a country with alphabets A-z",
      }));
    } else if (this.state.shippingtextInputData.zip_code === "") {
      this.setState((prevState) => ({
        shippingtextInputErrorData: {
          ...prevState.shippingtextInputErrorData,
          pinCodeError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Pin code is required",
      }));
    } else if (this.state.shippingtextInputData.phone_number === "") {
      this.setState((prevState) => ({
        shippingtextInputErrorData: {
          ...prevState.shippingtextInputErrorData,
          phoneNoError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Phone number is required",
      }));
    }
    else if (!Validators.isPhoneNoValid(this.state.shippingtextInputData.phone_number)) {
      this.setState((prevState) => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          phoneNoError: true,
        },
        isShowError: true,
        customErrorModal: true,
        customErrorMessage: "Invalid Phone Number",
      }));
    } else {
      this.onAddressSave();
    }
    // Customizable Area End
  };

  getStateList = async () => {
    this.getStateListId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.getStateListAPIEndpoint,
    });
    return true;
  };

  getAddressData = async () => {
    this.getAddressDataId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.createNewAddressAPIEndPoint,
    });
  };

  onAddressSave = () => {
    this.saveAddress();
  };

  createAddress = () => {
    let {
      name,
      flat_no,
      address,
      zip_code,
      phone_number,
      city,
      address_state_id,
      country,
      state,
      address_line_2,
    } = this.state.textInputData;

    const shipping = this.state.shippingtextInputData;
    let finalData = {
      billing_same_as_shipping: this.state.billingAndAddressSame,
      address: {
        ...shipping,
        city: shipping.city,
        address_state_id: shipping.address_state_id,
        country: shipping.country.toLowerCase(),
        address_line_2: shipping.address_line_2,
        is_default: this.state.billingAndAddressSame
          ? this.state.saveAddress
          : this.state.shippingsaveAddress,
        billing_address: {
          name: name,
          flat_no: flat_no,
          address: address,
          zip_code: zip_code,
          city: city,
          address_state_id,
          state,
          address_line_2,
          country: country.toLowerCase(),
          phone_number: phone_number,
          is_default: this.state.saveAddress,
        },
      },
    };
    return finalData;
  };

  saveAddress = async () => {
    const addressData = await this.createAddress();
    this.props.navigation.push("Ordersummary", {
      checkoutData: addressData,
      isFromBuyNow: this.props.navigation.state.params.isFromBuyNow,
      buyNowCartID: this.props.navigation.state.params.buyNowCartID,
    });
  };

  // Customizable Area Start
  // Customizable Area End
}
