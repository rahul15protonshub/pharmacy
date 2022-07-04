import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";

import { runEngine } from "../../../framework/src/RunEngine";
// @ts-ignore
import isEmpty from "lodash/isEmpty";
// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  history: any;
  match: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  activeTab: string;
  activeMobileTab: boolean;
  errorData: any;
  loading: boolean;
  helpCenterData: any;
  tabName: any;
  isLoggedIn: boolean;
  FaqData?: any;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class HelpCenterController extends BlockComponent<Props, S, SS> {
  helpCenterallId: string = "";
  validationApiCallId: string = "";
  emailReg: RegExp = new RegExp("");
  labelTitle: string = "";
  FAQAPICallId: string = "";
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
      activeTab: "1",
      activeMobileTab: false,
      errorData: null,
      loading: true,
      helpCenterData: [],
      tabName: undefined,
      isLoggedIn: false,
      // Customizable Area Start
      // Customizable Area End
    };

    // Customizable Area Start
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  // Customizable Area Start
  componentWillReceiveProps(nextProps: any) {
    if (nextProps?.match?.params?.slug) {
      this.setState({ tabName: nextProps?.match?.params?.slug });
    }
  }
  // Customizable Area End

  async componentDidMount() {
    window.scrollTo(0, 0);
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem("user"));
    if (!isEmpty(user)) {
      this.setState({ isLoggedIn: true });
    }
    if (this.props?.match?.params?.slug) {
      this.setState({ tabName: this.props?.match?.params?.slug });
    }
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    this.getHelpceterData();
    this.getFAQsData();
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  UNSAFE_componentWillReceiveProps() {
    window.scrollTo(0, 0);
  }
  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallID = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJSON = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorMessage = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (this.parseExpireTokenResponse(responseJSON, this.state, this.props)) {
        if (this.helpCenterallId === apiRequestCallID) {
          this.setState({ helpCenterData: responseJSON?.data, loading: false });
        }
        if (this.FAQAPICallId === apiRequestCallID) {
          if (
            responseJSON &&
            responseJSON.data &&
            responseJSON.data.faqs &&
            responseJSON.data.faqs.length > 0
          ) {
            this.setState({
              FaqData: responseJSON,
              loading: false,
            });
            const copyHelpcenter = [...this.state.helpCenterData];
            const idFaq = copyHelpcenter.length + 1;
            const smapleFqa = {
              id: idFaq.toString(),
              type: "help_center",
              attributes: {
                help_center_type: "FAQs",
                title: "FAQs",
                description: responseJSON.data.faqs,
              },
            };
            copyHelpcenter.push(smapleFqa);
            this.setState({
              helpCenterData: copyHelpcenter,
              loading: false,
            });
          }
          this.setState({
            loading: false,
          });
        }
      }
    }
    // Customizable Area End
  }

  getHelpceterData() {
    const token = localStorage.getItem("token");
    const headers = {
      token,
      "Content-Type": "application/json",
    };
    this.setState({
      loading: true,
    });
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.helpCenterallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.helpCenterApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    // Sending Request to call API.
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  toggle(tab: any) {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  routeToProfile = () => {
    const { isLoggedIn } = this.state;
    this.props?.history?.push(isLoggedIn ? "/profilebio" : "/");
  };

  routeHelpCenter = (value: any) => {
    if (value !== undefined) {
      let path = "/help-center/" + value;
      this.props?.history?.push(path);
    } else {
      let path = "/help-center";
      this.props?.history?.push(path);
    }
  };

  routeHelpCenterMb(value: any) {
    if (value !== undefined) {
      let path = "/help-center/" + value;
      this.props?.history?.push(path);
      this.setState((preState) => ({
        activeMobileTab: !preState.activeMobileTab,
      }));
    } else {
      let path = "/help-center";
      this.props?.history?.push(path);
      this.setState((preState) => ({
        activeMobileTab: !preState.activeMobileTab,
      }));
    }
  }

  //get FAQ's
  getFAQsData = () => {
    this.setState({
      loading: true,
    });
    const headers = {
      "Content-Type": "application/json",
    };
    setTimeout(() => {
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.FAQAPICallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.faqAPiEndPoint
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        headers
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.validationApiMethodType
      );

      // Sending Request to call API.
      runEngine.sendMessage(requestMessage.id, requestMessage);
    }, 2000);
  };

  // Customizable Area Start
  // Customizable Area End
}
