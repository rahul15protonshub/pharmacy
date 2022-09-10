import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import { runEngine } from "../../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
// @ts-ignore
import { pSBC } from './helper'
// @ts-ignore
import chunk from "lodash/chunk";

export interface Props {

};

export interface S {
  theamData: any;
  usefulLinks: any;
  isBrandSettingsLoaded?: boolean;
  isShowFB?: boolean;
  isShowGoogle?: boolean;
  isShowInsta?: boolean;
  isShowYouTube?: boolean;
  isShowTwitter?: boolean;
  FaqData: any;
  helpCenterData: any;
  invalidTokenMessageRecieved: boolean
};

export interface SS {
  id: any;
};

const configJSON = require("./config");

export default class FooterController extends BlockComponent<Props, S, SS>{
  helpCenterallId: string = "";
  barndAPiCallId: string;
  FAQAPICallId: string = ""
  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];
    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);
    this.state = {
      theamData: JSON.parse(localStorage.getItem("appThemData") ?? "{}"),
      usefulLinks: [],
      FaqData: [],
      helpCenterData: [],
      invalidTokenMessageRecieved: false
    }
  };


  //API Call Receive Function --> Response
  async receive(from: string, message: Message) {
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallID = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJSON = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      const errorMessage = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (this.parseExpireTokenResponse(responseJSON, this.state, this.props)) {
        if (this.helpCenterallId === apiRequestCallID) {
          if (responseJSON && responseJSON?.data) {
            this.setState({ usefulLinks: chunk(responseJSON?.data, 4) });
          }
        }
        if (apiRequestCallID === this.barndAPiCallId) {
          if (responseJSON && responseJSON.brand_setting) {
            const { footerContent } = responseJSON.brand_setting;
            const templateName: string = responseJSON?.brand_setting?.TemplateSelections?.template_selection || "Minimal";
            this.setState({
              isBrandSettingsLoaded: false,
              isShowFB: footerContent?.facebookSrc,
              isShowInsta: footerContent?.instagramSrc,
              isShowTwitter: footerContent?.twitterSrc,
              isShowYouTube: footerContent?.youtubeSrc,
              isShowGoogle: footerContent?.googleSrc
            });
            let dat = {
              countryName: responseJSON.brand_setting?.ExtraFields?.country,
              countryCode: responseJSON.brand_setting?.ExtraFields?.currency_type,
              countryPinCode: responseJSON.brand_setting?.ExtraFields?.country_code,
            };
            localStorage.setItem('countryCode', JSON.stringify(dat));
            localStorage.setItem('selectedTemplateName', templateName?.toLowerCase());
            const templateMessage = new Message(
              'updateTemplate'
            );
            templateMessage.addData(
              'updateTemplateData',
              {
                templateName: templateName?.toLowerCase()
              }
            );
            runEngine.sendMessage(templateMessage.id, templateMessage);
            this.getMyThemes(responseJSON.brand_setting);
          }
        }

        if (this.FAQAPICallId === apiRequestCallID) {
          if (responseJSON && responseJSON.data && responseJSON.data.faqs && responseJSON.data.faqs.length > 0) {
            this.setState({
              FaqData: responseJSON,
            });
            const copyHelpcenter = [...this.state.usefulLinks];
            const idFAQ = copyHelpcenter.length + 1;
            const smapleFqa = {
              id: idFAQ.toString(), type: "help_center",
              attributes: {
                "help_center_type": "FAQs",
                "description": responseJSON.data.faqs
              }
            }
            copyHelpcenter.push([smapleFqa]);
            this.setState({
              usefulLinks: copyHelpcenter,
              isBrandSettingsLoaded: false,
            })
          }
        }
      } else {
        this.setState({
          invalidTokenMessageRecieved: true
        })
      }

    }
  }

  async componentDidMount() {
    if (localStorage.length == 0) {
      this.handleBrandSettings();
    }
    this.handleBrandSettings();
    this.getHelpceterData();
    this.getFAQsData();
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (localStorage.length == 0) {
      setTimeout(() => {
        this.handleBrandSettings();  
      }, 800);
    }
    setTimeout(() => {
      this.handleBrandSettings();  
    }, 800);
    this.getHelpceterData();
    this.getFAQsData();
  }


  getHelpceterData() {
    const token = localStorage.getItem("token");
    const headers = {
      token,
      "Content-Type": "application/json"
    }
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.helpCenterallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getHelpCenterAPIEndPoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiGetMethod);
    // Sending Request to call API.
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  //barndSettingAPIcall
  handleBrandSettings = () => {
    this.setState({
      isBrandSettingsLoaded: true
    });
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.barndAPiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.brandSettingAPIEndPoint);
    const headers = {
      'Content-Type': 'application/json',
    };
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiGetMethod);

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  //@ts-ignore
  getMyThemes = (themeAttributes): any => {
    if (themeAttributes) {
      let color_pallete = (themeAttributes?.TemplateSelections?.color_palet || "{themeName: 'Forest',primaryColor:'#BE7C4D',secondaryColor:'#0B3C49'}").split(",");
      const themeName = color_pallete[0].substring(color_pallete[0].indexOf(" ") + 1, color_pallete[0].length).replaceAll("'", "")
      const primaryColor = color_pallete[1].split(":")[1].replaceAll("'", "");
      const secondaryColor = color_pallete[2].split(":")[1].replaceAll("'", "").replaceAll("}", "");
      localStorage.setItem('appThemData', JSON.stringify(themeAttributes));
      // CacheState.set({ webThemes: themeAttributes });
      const root = document.documentElement;
      root.style.setProperty(
        '--color-ButtonBackRegular',
        primaryColor
      );
      root.style.setProperty(
        '--color-ButtonTextRegular',
        themeAttributes?.buttonsColor?.regularTextColor
      );
      root.style.setProperty(
        '--color-ButtonBackHover',
        themeAttributes?.buttonsColor?.hoverButtonColor
      );
      root.style.setProperty(
        '--color-ButtonTextHover',
        themeAttributes?.buttonsColor?.hoverTextColor
      );
      root.style.setProperty(
        '--color-primary-hover-1',
        pSBC(0.1, primaryColor)
      );
      root.style.setProperty(
        '--color-primary-hover-2',
        pSBC(0.2, primaryColor)
      );
      root.style.setProperty(
        '--color-primary-hover-3',
        pSBC(0.3, primaryColor)
      );
      root.style.setProperty(
        '--color-primary-hover-4',
        pSBC(0.8, primaryColor)
      );
      root.style.setProperty(
        '--color-RegularText',
        themeAttributes?.mainTextsColor?.regularColorCode
      );
      root.style.setProperty(
        '--color-RegularActiveText',
        themeAttributes?.mainTextsColor?.activeColorCode
      );
      root.style.setProperty(
        '--color-commonBorder',
        themeAttributes?.commonBordersColor
      );
      root.style.setProperty(
        '--color-filterBar',
        themeAttributes?.productFilterSliderColor
      );
      root.style.setProperty(
        '--color-wishlistIconColor',
        themeAttributes?.profile?.wishlistQtyIconColor
      );
      root.style.setProperty(
        '--color-wishlistIconText',
        themeAttributes?.profile?.wishlistQtyTextColor
      );
      root.style.setProperty(
        '--color-orderDetailsText',
        themeAttributes?.profile?.orderDetailColor
      );
      root.style.setProperty(
        '--color-cyan',
        secondaryColor || '#3fc1cb'
      );
      root.style.setProperty(
        '--color-secondary-hover-1',
        pSBC(0.1, secondaryColor)
      );
      root.style.setProperty(
        '--color-secondary-hover-2',
        pSBC(0.2, secondaryColor)
      );
      root.style.setProperty(
        '--color-secondary-hover-3',
        pSBC(0.3, secondaryColor)
      );
      root.style.setProperty(
        '--color-secondary-hover-4',
        pSBC(0.8, secondaryColor)
      );
      root.style.setProperty(
        '--color-pink',
        themeAttributes?.highlightSecondaryColor
      );

    }
  };

  //get FAQ's
  getFAQsData = () => {
    const headers = {
      "Content-Type": "application/json"
    };
    this.setState({
      isBrandSettingsLoaded: true
    });
    setTimeout(() => {
      const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
      this.FAQAPICallId = requestMessage.messageId;

      requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getFAQAPIEndPoint);
      requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
      requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiGetMethod);

      // Sending Request to call API.
      runEngine.sendMessage(requestMessage.id, requestMessage);
    }, 2000)
  }
};
