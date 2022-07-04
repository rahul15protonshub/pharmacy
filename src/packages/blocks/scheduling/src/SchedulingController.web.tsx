//@ts-ignore
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

export const configJSON = require("./config.js");
import { RouteComponentProps } from "react-router-dom";

export interface Props extends RouteComponentProps {
  navigation: any;
  id: string;
  // Customizable Area Start
  productDetails?: any;
  isSubscribeClicked?: boolean;
  productSlaeprice?: any;
  productOnSale?: any;
  ProductPrice?: any;
  isSubscribed: boolean;
  //functions list
  toggleSubscribe?: any;
  addToCartWithSubscription?: any;
  // Customizable Area End
}

interface S {}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SchedulingController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      // Customizable Area Start
      // Customizable Area End
    ];
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
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

  getCatalogueVarient = (suscribeProductData: any, values: any) => {
    return suscribeProductData.attributes.catalogue_subscriptions.find(
      (catalogue: any) =>
        catalogue?.attributes?.subscription_package ===
          values.subscription_package &&
        catalogue?.attributes?.subscription_period ===
          `${values.subscription_period} month`
    );
  };

  getSubscriptionOptions = (suscribeProductData: any, values: any) => {
    let subscribePeriodOptions: number[] = [],
      availableDeliveryPeriod: string[] = [],
      availableDeliveryTimeSlotOptions: string[] = [];
    if (
      suscribeProductData?.attributes?.available_subscription &&
      values.subscription_package
    ) {
      subscribePeriodOptions =
        suscribeProductData?.attributes?.available_subscription[
          values.subscription_package
        ];
    }
    if (
      suscribeProductData?.attributes?.catalogue_subscriptions?.length &&
      values.subscription_package &&
      values.subscription_period
    ) {
      let subscribeVarient: any = this.getCatalogueVarient(
        suscribeProductData,
        values
      );
      if (subscribeVarient) {
        if (subscribeVarient?.attributes?.morning_slot?.length) {
          availableDeliveryPeriod.push("morning");
        }
        if (subscribeVarient?.attributes?.evening_slot?.length) {
          availableDeliveryPeriod.push("evening");
        }
        if (values.preferred_delivery_period) {
          let slotList: string[] = JSON.parse(
            subscribeVarient?.attributes[
              `${values.preferred_delivery_period}_slot`
            ]
          );
          availableDeliveryTimeSlotOptions = slotList?.filter(
            (timeSlot: any) => timeSlot?.length > 1
          );
        }
      }
    }
    return {
      subscribePeriodOptions,
      availableDeliveryPeriod,
      availableDeliveryTimeSlotOptions,
    };
  };

  async receive(from: string, message: Message) {}
}
