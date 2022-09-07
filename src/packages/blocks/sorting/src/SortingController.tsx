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
  isVisible: boolean;
  token: string;
  data: any;
  priceLowtoHigh: boolean;
  priceHightoLow: boolean;
  newestProduct: boolean;
  popular: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SortingController extends BlockComponent<Props, S, SS> {
  getProductApiCallId: any;
  getSortAscApiCallId: any;
  getSortDescApiCallId: any;
  getsortNewApiCallId: any;
  getPopularityApiCallId: any;
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      isVisible: false,
      token: "",
      data: "",
      priceLowtoHigh: false,
      priceHightoLow: false,
      newestProduct: false,
      popular: false,
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
  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };
  async receive(from: string, message: Message) {
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      runEngine.debugLog("Message Recived", message);
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
      this.getListRequest(token);
    }

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
      ChangeStackNow(this.props.navigation);
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getProductApiCallId != null &&
      this.getProductApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      if (responseJson && !responseJson.errors && responseJson.data) {
        this.setState({
          data: responseJson.data,
        });
      } else {
        this.parseApiErrorResponse(responseJson);
        this.parseApiCatchErrorResponse(errorReponse);
      }
      // Customizable Area Start
      // Customizable Area End
    }
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getSortAscApiCallId != null &&
      this.getSortAscApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && !responseJson.errors && responseJson.data) {
        this.setState({
          data: responseJson.data,
          priceLowtoHigh: true,
          priceHightoLow: false,
          newestProduct: false,
          popular: false,
        });
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
      }
      // Customizable Area Start
      // Customizable Area End
    }
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getSortDescApiCallId != null &&
      this.getSortDescApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && !responseJson.errors && responseJson.data) {
        this.setState({
          data: responseJson.data,
          priceLowtoHigh: false,
          priceHightoLow: true,
          newestProduct: false,
          popular: false,
          // Customizable Area Start
          // Customizable Area End
        });
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
      }
      // Customizable Area Start
      // Customizable Area End
    }
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getsortNewApiCallId != null &&
      this.getsortNewApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && !responseJson.errors && responseJson.data) {
        this.setState({
          data: responseJson.data,
          priceLowtoHigh: false,
          priceHightoLow: false,
          newestProduct: true,
          popular: false,
          // Customizable Area Start
          // Customizable Area End
        });
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getPopularityApiCallId != null &&
      this.getPopularityApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && !responseJson.errors && responseJson.data) {
        this.setState({
          data: responseJson.data,
          priceLowtoHigh: false,
          priceHightoLow: false,
          newestProduct: false,
          popular: true,
          // Customizable Area Start
          // Customizable Area End
        });
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    // Customizable Area Start
    // Customizable Area End
  }

  modalVisible() {
    this.setState({ isVisible: !this.state.isVisible });
  }
  getListRequest = (token: any) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProductApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.productAPiEndPoint
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
  };
  sortPriceAsc = () => {
    const header = {
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getSortAscApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.SortAscAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    this.setState({ isVisible: false });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  sortPriceDesc = () => {
    const header = {
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getSortDescApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.SortDescAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    this.setState({ isVisible: false });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  sortNewest = () => {
    const header = {
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getsortNewApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.SortNewestAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    this.setState({ isVisible: false });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  sortPopularity = () => {
    const header = {
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getPopularityApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.SortPopularityAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    this.setState({ isVisible: false });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area Start
  // Customizable Area End
}
