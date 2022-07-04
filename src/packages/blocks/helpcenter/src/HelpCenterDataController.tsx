import { BackHandler } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import {
  ChangeStackNow,
  OnManageNavigation,
} from "../../studio-store-ecommerce-components/src/UtilNavigation/UtilNavigation";

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
  faqData: any;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class HelpCenterDataController extends BlockComponent<
  Props,
  S,
  SS
> {
  getFaqApiCallId: any;
  getUserProfileApiCallId: any;
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
      faqData: null,
      // Customizable Area Start
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }
  async componentDidMount() {
    this.getFaqData();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  async componentWillUnmount() {
    super.componentWillUnmount();
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // Customizable Area Start
    // Customizable Area End
  }

  handleBackButtonClick = () => {
    if (
      this.props.navigation &&
      this.props.navigation.state.params.isFromHelpCenter
    ) {
      this.props.navigation.goBack();
      return true;
    } else {
      this.props.navigation.navigate("Auth");
      return true;
    }
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
        // this.setState({isFetching:false});
        ChangeStackNow(this.props.navigation);
      }

      if (responseJson && responseJson.data) {
        if (apiRequestCallId === this.getFaqApiCallId) {
          this.setState({ faqData: responseJson.data.faqs });
          // Customizable Area Start
          // Customizable Area End
        }
      } else if (responseJson && responseJson.errors) {
        this.parseApiErrorResponse(responseJson);
        this.parseApiCatchErrorResponse(responseJson.errors);
        // Customizable Area Start
        // Customizable Area End
      } else if (errorReponse) {
        this.parseApiErrorResponse(responseJson);
        this.parseApiCatchErrorResponse(errorReponse);
        // Customizable Area Start
        // Customizable Area End
      }
    }

    // Customizable Area Start
    // Customizable Area End
  }

  getFaqData = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getFaqApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.faqAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Customizable Area Start
  // Customizable Area End
}
