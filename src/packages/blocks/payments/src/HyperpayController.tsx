import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider";
import { NativeModules } from "react-native";
// Customizable Area Start
// Customizable Area End
export var navigationParamsToken = "";
export var navigationParamsURL = "";
export var orderConfirmStatus = "";
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
  cardNumber2: String;
  token: string;
  errorMsg: string;
  loadingChekout: boolean;
  checkout_detail: any;
  isSubmit: boolean;
  isInvalidCardNo: boolean;
  isInvalidCardHolder: boolean;
  isInvalidCVV: boolean;
  isInvalidExpiry: boolean;
  count: any;
  dataid: string;
  redirectURL: any;
  showConfirmOrder: boolean;
  statuscallcnt: boolean;
  PaymentGateWay: string;
  orderNumber: string;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class HyperpayController extends BlockComponent<Props, S, SS> {
  chekoutApiCallId: any;
  apiHyperpayStatusCallId: any;
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
      cardNumber: "",
      cardHolder: "",
      expiry: "",
      cvv: "",
      cardNumber2: "",
      token: "",
      errorMsg: "",
      loadingChekout: false,
      isSubmit: false,
      checkout_detail: "",
      isInvalidCardNo: false,
      isInvalidCardHolder: false,
      isInvalidCVV: false,
      isInvalidExpiry: false,
      count: 0,
      dataid: "",
      redirectURL: null,
      showConfirmOrder: false,
      statuscallcnt: false,
      PaymentGateWay: "",
      orderNumber: "",
      // Customizable Area Start
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }
  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token = await StorageProvider.get("Userdata");
      this.setState({ token: token });
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.chekoutApiCallId != null &&
      this.chekoutApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var chekoutResp = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (chekoutResp && !chekoutResp.errors) {
        if (chekoutResp.length === 0 || chekoutResp.status === 404) {
          this.showAlert("Something went wrong!", "");
        } else if (chekoutResp.status === 500) {
          this.setState({
            loadingChekout: false,
          });
          this.showAlert("Internal Server Error", "");
        } else {
          navigationParamsToken = chekoutResp.body.id;

          this.setState(
            {
              isSubmit: true,
              checkout_detail: chekoutResp,
            },
            () => {
              this.hyperPayNativeCall();
            }
          );
        }
      }
    } else {
      this.setState({ loadingChekout: false });
      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (errorReponse === undefined) {
        this.setState({
          errorMsg: "Something went wrong",
        });
      } else {
        this.setState({
          errorMsg: errorReponse,
        });
      }
    }

    //Checkout Status
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.apiHyperpayStatusCallId != null &&
      this.apiHyperpayStatusCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var chekoutResp = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (chekoutResp && !chekoutResp.errors) {
        if (chekoutResp.length === 0 || chekoutResp.status === 404) {
          this.showAlert("Something went wrong!", "");
        } else if (chekoutResp.status === 500) {
          this.setState({
            loadingChekout: false,
          });
          this.showAlert("Internal Server Error", "");
        } else if (chekoutResp.status) {
          orderConfirmStatus = chekoutResp;
          this.props.navigation.navigate("OrderConfirm");
        }
      }
    } else {
      this.setState({ loadingChekout: false });
      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (errorReponse === undefined) {
        this.setState({
          errorMsg: "Something went wrong",
        });
      } else {
        this.setState({
          errorMsg: errorReponse,
        });
      }
      // Customizable Area Start
      // Customizable Area End
    }
    // Customizable Area Start
    // Customizable Area End
  }
  getCheckoutId(orderid: string): boolean {
    this.setState({ loadingChekout: true });
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    const attrs = {
      // Customizable Area Start
      merchantTransactionId: orderid,
      currency_code: "SAR",
      paymentType: "DB",
      entityId: "8ac7a4c874672c64017468b0fdcf0756",
      // Customizable Area End
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.chekoutApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.checkoutAPiEndPoint
    );
    //hyperpayAPIMethodType checkoutAPiEndPoint
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(attrs)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.hyperpayAPIMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  getCardType = (number: any) => {
    // Customizable Area Start\
    const numberFormated = number.replace(/\D/g, "");
    var patterns = {
      VISA: /^4[0-9]{12}(?:[0-9]{3})?$/,
      MASTER: /^5[1-5][0-9]{14}$/,
      AMEX: /^3[47][0-9]{13}$/,
      ELO: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
      AURA: /^(5078\d{2})(\d{2})(\d{11})$/,
      JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
      DINERS: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      DISCOVERY: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      HIPERCARD: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
      ELECTRON: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
      MAESTRO:
        /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
      DANKORT: /^(5019)\d+$/,
      INTERPAYMENT: /^(636)\d+$/,
      UNIONPAY: /^(62|88)\d+$/,
    };

    for (var key in patterns) {
      //@ts-ignore
      if (patterns[key].test(numberFormated)) {
        return key;
      }
    }
    // Customizable Area End
  };
  hyperPayNativeCall() {
    let cardType = this.getCardType(this.state.cardNumber);
    let expdate = this.state.expiry.split("/");
    let paymentParams = {
      checkoutID: this.state.checkout_detail.body.id,
      paymentBrand: cardType,
      cardNumber: this.state.cardNumber,
      holderName: this.state.cardHolder,
      expiryMonth: expdate[0],
      expiryYear: "20" + expdate[1],
      cvv: this.state.cvv,
    };
    try {
      this.hyperPayTranscation(paymentParams);
    } catch (error) {
      alert(error);
    }
  }
  getPaymentStatus = (): boolean => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiHyperpayStatusCallId = requestMessage.messageId;

    // Customizable Area Start
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.checkoutStatus +
        `${navigationParamsToken}&entityId=8ac7a4c874672c64017468b0fdcf0756`
    );
    // Customizable Area End

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.checkoutStatusMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  async hyperPayTranscation(paymentParams: any) {
    try {
      let resp = await NativeModules.Hyperpay.transactionPayment(paymentParams);
      this.setState({ loadingChekout: false });
      if (resp.status === "pending") {
        this.setState(
          {
            redirectURL: resp.redirectURL,
            PaymentGateWay: "HyperPay",
          },
          () => {
            navigationParamsURL = resp.redirectURL;
          }
        );
      } else if (resp.status === "complete") {
        this.handleTrasaction();
      } else if (resp.staatus === "failure" || resp.error) {
      }
    } catch (error) {
      alert(error);
    }
  }
  handleTrasaction = async () => {
    this.setState(
      { redirectURL: null, showConfirmOrder: true, statuscallcnt: true },
      () => {
        this.getPaymentStatus();
      }
    );
  };
  _updateMasterState = (attrName: string, value: string) => {
    if (attrName === "expiry") {
      if (value.indexOf(".") >= 0 || value.length > 5) {
        return;
      }

      if (value.length === 2 && this.state.expiry.length === 1) {
        value += "/";
      }
      this.setState({ expiry: value });
    } else if (attrName === "cardNumber") {
      this.setState({
        cardNumber: value
          .replace(/\s?/g, "")
          .replace(/(\d{4})/g, "$1 ")
          .trim(),
      });
    } else {
      //@ts-ignore
      this.setState({ [attrName]: value });
    }
  };

  // Customizable Area Start
  // Customizable Area End
}
