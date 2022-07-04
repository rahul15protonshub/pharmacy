import { BackHandler } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
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
  orders: any;
  isCancelVisible: boolean;
  isRateVisible: boolean;
  cancelDialog: boolean;
  starCount: number;
  comment: string;
  token: string;
  itemDetail: any;
  activeOrderId: number;
  activeItemId: number;
  orderConfirmStatus: any;
  amount: number;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class OrderConfirmController extends BlockComponent<
  Props,
  S,
  SS
> {
  getOrdersAPICallId: any;
  getItemDetailAPICallId: any;
  cancelOrderAPICallId: any;
  rateOrderAPICallId: any;
  _unsubscribe: any;
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      orders: [],
      isCancelVisible: false,
      isRateVisible: false,
      cancelDialog: false,
      starCount: 0,
      token: "",
      itemDetail: "",
      activeOrderId: 0,
      activeItemId: 0,
      comment: "",
      orderConfirmStatus: "",
      amount: 0,
      // Customizable Area Start
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
    });
    if (this.props.navigation.state.params) {
      this.setState({
        amount: this.props.navigation.state.params.amount,
        orderConfirmStatus: "true",
      });
    }
    // Customizable Area Start
    // Customizable Area End
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
    this.props.navigation.navigate("Catalogue");
    return true;
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
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
      // if (responseJson && responseJson.data) {
      if (errorReponse || responseJson.errors) {
        this.parseApiErrorResponse(responseJson);
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
  }

  handleGotoOrders = () => {
    this.props.navigation.navigate("Ordermanagement", { isFromPlaced: true });
  };
  // Customizable Area Start
  // Customizable Area End
}
