import { Share, BackHandler, AppState } from "react-native";

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

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: any;
  onCloseSubscriptionModal: any;
  productData: any;
  selectedProduct: any;
  selectedImage: any;
  subscriptionQuantity: any;
  subscriptionPackageData: any;
  invalidSubscriptionPackage: any;
  subscriptionPeriodData: any;
  invalidSubscriptionPeriod: any;
  subscriptionTimeSlotData: any;
  invalidateSubscriptionTimeSlot: any;
  period: any;
  onChangeSubscriptionQuantity: any;
  onSelectSubscriptionPackage: any;
  onPressSubscribeAddToCart: any;
  onPressBuyNowSubscription: any;
  onSelectSubscriptionTimeSlot: any;
  selectedSlotId: any;
  onSelectSubscriptionPeriod: any;
  slots: any;
  setSubSlots: any;
  selectedTimeSlot: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}
export default class SchedulingController extends BlockComponent<Props, S, SS> {
  _unsubscribe: any;
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
      // Customizable Area Start
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    // Customizable Area End
  }

  async componentWillUnmount() {
    super.componentWillUnmount();
    // Customizable Area Start
    // Customizable Area End
  }

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

      if (responseJson && responseJson?.data) {
        // Customizable Area Start
        // Customizable Area End
      }
      if (responseJson && responseJson.errors) {
        // Customizable Area Start
        // Customizable Area End
      }
      if (responseJson?.message) {
        // Customizable Area Start
        // Customizable Area End
      }
      if (errorReponse) {
        // Customizable Area Start
        // Customizable Area End
      }
    }
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
}
