import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import moment from "moment";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
// Customizable Area End
export const configJSON = require("./config");

export interface Props {
  navigation?: any;
  id?: string;
  history?: any;
  order?: any;
  orderItem?: any;
  refetchData?: any;
  location?: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  ShowCOModal?: boolean;
  ShowPRModal?: boolean;
  shippingAddress?: any;
  trackingDetails?: any;
  loader?: boolean;
  // Customizable Area Start
  orderItemSubscriptionInfo?: any;
  isOpenCancelSubscription?: boolean;
  subscriptionDayId?: any;
  currentSubscriptionPageNo?: any;
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
  fetchSubscriptionItemCallId: string = "";
  cancelSubscriptiondayCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  // Customizable Area Start
  // Customizable Area End
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

    this.state = {
      ShowCOModal: false,
      ShowPRModal: false,
      shippingAddress: undefined,
      trackingDetails: [],
      loader: true,
      // Customizable Area Start
      // Customizable Area End
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    // Customizable Area Start
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    if (this.props?.location?.state) {
      const { order, orderItem } = this.props?.location?.state;
      if (order) {
        this.setState({ shippingAddress: order.delivery_addresses[0] });
      }
      if (orderItem?.attributes?.subscription_package != null) {
        this.fetchSubscriptionList("");
      }
      this.fetchTrackingDetails();
    } else {
      this.props.history.push("/profile-sec");
    }
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
      if (this.parseExpireTokenResponse(resposeJSON, this.state, this.props)) {
        if (this.fetchTrackingDetailsCallId === apiRequestCallId) {
          this.setState({ trackingDetails: resposeJSON?.data, loader: false });
        }
        if (this.fetchSubscriptionItemCallId === apiRequestCallId) {
          if (resposeJSON && resposeJSON.data && resposeJSON.meta) {
            this.setState({
              orderItemSubscriptionInfo: resposeJSON,
              currentSubscriptionPageNo:
                resposeJSON.meta?.pagination?.current_page,
            });
          }
        }
        if (apiRequestCallId === this.cancelSubscriptiondayCallId) {
          if (resposeJSON && resposeJSON.data) {
            this.setState({
              isOpenCancelSubscription: false,
              subscriptionDayId: "",
            });
            //@ts-ignore
            // window.notify([
            //   {
            //     type: "success",
            //     message: `Your Subscription got Cancelled on ${resposeJSON.data?.attributes?.delivery_date}`,
            //   },
            // ]);
          }
          this.fetchSubscriptionList("");
        }
      }
    }
    // Customizable Area End
  }

  fetchTrackingDetails() {
    if (this.props?.location?.state) {
      const token = localStorage.getItem("token");
      const headers = {
        token,
        "Content-Type": "application/json",
      };
      const ProductID = this.props?.location?.state?.orderItem?.id;
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.fetchTrackingDetailsCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.trackingOrderDetailsAPIEndPoint +
          "?" +
          `track=order_item&id=${ProductID}`
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        headers
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.GetMethodType
      );

      // Sending Request to call API.
      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  }

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }

  routeToProfile() {
    let path = "/profilebio";
    this.props.history.push({
      pathname: path,
      state: { activeTab: "myorder" },
    });
  }

  getImageUrl() {
    const { orderItem } = this.props.location.state;
    let imaga: any;
    if (
      orderItem?.attributes?.catalogue_variant?.attributes?.images.data &&
      orderItem?.attributes?.catalogue_variant?.attributes?.images.data.length >
        0
    ) {
      if (
        orderItem?.attributes?.catalogue_variant?.attributes?.images?.data
          ?.length > 0
      ) {
        orderItem?.attributes?.catalogue_variant?.attributes?.images?.data?.map(
          (ele: any, index: number) => {
            if (ele?.attributes?.is_default) {
              imaga = ele?.attributes?.url;
            }
          }
        );
      } else {
        imaga =
          orderItem?.attributes?.catalogue_variant?.attributes?.images?.data[0]
            ?.attributes?.url;
      }
    } else {
      if (orderItem?.attributes?.product_images?.data.length > 1) {
        orderItem?.attributes?.product_images?.data?.map(
          (ele: any, index: number) => {
            if (ele?.attributes?.is_default) {
              imaga = ele?.attributes?.url;
            }
          }
        );
      } else {
        imaga = orderItem?.attributes?.product_images?.data[0]?.attributes?.url;
      }
    }
    return imaga;
  }

  getAddressString() {
    const { shippingAddress } = this.state;
    if (shippingAddress) {
      return `${shippingAddress.address}, ${shippingAddress.address_line_2}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zip_code}`;
    }
    return "No Address Found";
  }

  getLocalDate = (data: any) => {
    const { date, toFormat } = data;
    let m = moment
      .utc(date)
      .local()
      .subtract("minutes", 5)
      .utcOffset(+4)
      .format(toFormat);
    return m;
  };
  // Customizable Area Start

  fetchSubscriptionList = (data: any) => {
    if (this.props?.location?.state) {
      const token = localStorage.getItem("token");
      const headers = {
        token,
        "Content-Type": "application/json",
      };
      const ProductID = this.props?.location?.state?.orderItem?.id;
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.fetchSubscriptionItemCallId = requestMessage.messageId;
      if (data) {
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.getWEBSubscrptionOrdersAPIEndPoint +
            `/${ProductID}?page=${data}&per_page=5`
        );
      } else {
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.getWEBSubscrptionOrdersAPIEndPoint +
            `/${ProductID}?page=1&per_page=5`
        );
      }
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        headers
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.GetMethodType
      );

      // Sending Request to call API.
      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  };
  cancelSubscriptionDay = () => {
    const token = localStorage.getItem("token");
    const headers = {
      token,
      "Content-Type": "application/json",
    };
    let requestBody = {};

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.cancelSubscriptiondayCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.webExtendDeliveryOrdersAPIEndPoint +
        `/${this.state.subscriptionDayId}/extend_delivery`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostMethodType
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(requestBody)
    );

    // Sending Request to call API.
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area End
}
