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
  history: any;
  reviewData: any;
  toggle: any;
  isOpen: boolean;
  onSuccess: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  rating: number;
  comment: string;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SingleOrdersController extends BlockComponent<
  Props,
  S,
  SS
> {
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  fetchTrackingDetailsCallId: string = "";
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      // Customizable Area Start
      //  Customizable Area End
    ];

    this.state = {
      rating: 0,
      comment: "",
      // Customizable Area Start
      // Customizable Area End
    };

    // Customizable Area Start
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const resposeJSON = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorMessage = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
    }
    // Customizable Area End
  }

  setRating(value: any) {
    this.setState({ rating: value });
  }

  onSubmit(data: any) {
    const {
      reviewData: { orderId, orderItemId, reviewId },
      toggle,
      onSuccess,
    } = this.props;
    onSuccess(data);
  }
  // Customizable Area Start
  // Customizable Area End
}
