import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

import { Platform } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import StorageProvider from "../../../framework/src/StorageProvider";
import * as Validators from "../../../framework/src/Validators";
import {
  ChangeStackNow,
  OnManageNavigation,
} from "../../studio-store-ecommerce-components/src/UtilNavigation/UtilNavigation";

export const configJSON = require("./config");

// Customizable Area Start
// Customizable Area End

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  showPickerModal: boolean;
  profileImage: any;
  profileImageData: any;
  showProfileImage: boolean;
  name: string;
  email: string;
  phone: string;
  isShowError: boolean;
  showAlertModal: boolean;
  message: any;
  userData: any;
  isFetching: boolean;
  token: string;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class EditProfileController extends BlockComponent<
  Props,
  S,
  SS
> {
  apiEditProfileCallId: any;
  getUserProfileApiCallId: any;
  updateProfileApiCallId: any;
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
      showPickerModal: false,
      profileImage: null,
      profileImageData: null,
      showProfileImage: false,
      name: "",
      email: "",
      phone: "",
      isShowError: false,
      isFetching: true,
      message: null,
      showAlertModal: false,
      userData: null,
      token: "",
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
      this.getUserProfile();
    });
    // Customizable Area Start
    // Customizable Area End
  }

  async componentWillUnmount() {
    super.componentWillUnmount();
    this._unsubscribe.remove();
    // Customizable Area Start
    // Customizable Area End
  }

  getToken = async () => {
    const token = await StorageProvider.get("Userdata");
    this.setState({ token: token });
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
        if (apiRequestCallId === this.getUserProfileApiCallId) {
          this.getUserProfileSuccessCallBack(responseJson.data);
        }

        if (apiRequestCallId === this.updateProfileApiCallId) {
          this.updateProfileDataSuccessCallBack(responseJson.data);
        }

        // Customizable Area Start
        // Customizable Area End
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.updateProfileApiCallId) {
          this.updateProfileDataFailureCallBack(responseJson);
        }

        if (apiRequestCallId === this.getUserProfileApiCallId) {
          this.getUserProfileFailureCallBack(responseJson);
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

  getUserProfile = async () => {
    this.getUserProfileApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: configJSON.userProfileApiEndPoint,
    });
  };

  getUserProfileSuccessCallBack = async (res: any) => {
    let userProfileData = res.attributes;
    this.setState({
      userData: res,
      profileImage: userProfileData.image_url,
      name: userProfileData.full_name,
      email: userProfileData.email ? userProfileData.email : "",
      phone: userProfileData.phone_number ? userProfileData.phone_number : "",
      profileImageData: { data: userProfileData.image_url },
      isFetching: false,
    });
  };

  getUserProfileFailureCallBack = (error: any) => {
    if (error) {
      setTimeout(() => {
        this.setState({
          message: this.parseApiErrorResponse(error),
          isShowError: true,
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
    if (this.state.name === "" || !Validators.isNameValid(this.state.name)) {
      this.setState({
        showAlertModal: true,
        isShowError: true,
        message: "Please enter valid name.",
      });
      return;
    } else {
      this.updateProfileData();
    }
  };

  updateProfileData = async () => {
    this.setState({ isFetching: true });
    let formData: any = {};
    let data: any = {};
    if (
      this.state.profileImageData.data &&
      !this.state.profileImageData.data.includes("https")
    ) {
      data.image = "data:image/jpeg;base64," + this.state.profileImageData.data;
    }
    data.full_name = this.state.name;
    formData.data = data;
    this.updateProfileApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.PutMethodType,
      endPoint: configJSON.userProfileApiEndPoint,
      body: formData,
    });
  };

  updateProfileDataSuccessCallBack = async (res: any) => {
    setTimeout(() => {
      this.setState(
        {
          message: "Your profile has been updated Successfully !",
          isShowError: false,
          showAlertModal: true,
          isFetching: false,
        },
        async () => {
          this.getUserProfile();
          setTimeout(() => {
            this.props.navigation.goBack();
          }, 2000);
        }
      );
    }, 0);
  };

  updateProfileDataFailureCallBack = (error: any) => {
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
        });
      }, 0);
    }
  };

  // Customizable Area Start
  txtInputNameProps = {
    onChangeText: (text: string) => {
      this.setState({ name: text });
    },
    secureTextEntry: false,
  };
  txtInputEmailProps = {
    onChangeText: (text: string) => {
      this.setState({ email: text });
    },
    secureTextEntry: false,
  };
  txtInputPhoneProps = {
    onChangeText: (text: string) => {
      this.setState({ phone: text });
    },
    secureTextEntry: false,
  };

  onPressCameraUploadImage = () => {
    this.setState({ showPickerModal: true });
  };

  onPressCamera = () => {
    try {
      ImagePicker.openCamera({
        mediaType: "photo",
        compressImageQuality: 0.3,
        includeBase64: true,
        cropping: true,
      }).then(async (image) => {
        const source = {
          uri: Platform.OS === "android" ? image.path : image.path,
        };
        this.setState({
          profileImage: image.path,
          showPickerModal: false,
          profileImageData: image,
        });
      });
    } catch (e) {}
  };

  onPressPickImage = () => {
    try {
      ImagePicker.openPicker({
        mediaType: "photo",
        compressImageQuality: 0.3,
        includeBase64: true,
        cropping: true,
      }).then(async (image) => {
        const source = {
          uri: Platform.OS === "android" ? image.path : image.path,
        };
        this.setState({
          profileImage: image.path,
          showPickerModal: false,
          profileImageData: image,
        });
      });
    } catch (e) {}
  };

  // Customizable Area Start
  // Customizable Area End
}
