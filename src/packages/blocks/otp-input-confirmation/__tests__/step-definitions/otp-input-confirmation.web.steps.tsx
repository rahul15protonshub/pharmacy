import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import OTPInputAuth from "../../src/OTPInputAuth";
import { OTPConfirmAccount } from "../../src/OTPConfirmAccount.web";
import SignUpConfirmComponent from "../../src/OTPConfirmation.web";
import { getJestCucumberConfiguration } from "jest-cucumber/dist/src/configuration";

const navigation = require("react-navigation");

jest.useFakeTimers();

const screenProps = {
  navigation: navigation,
  id: "OTPInputAuth",
};

const feature = loadFeature(
  "./__tests__/features/otp-input-confirmation-web-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to OTPConfirmAccount", ({ given, when, then }) => {
    let otpConfirmAccount: ShallowWrapper;
    let instance: OTPConfirmAccount;

    given("I am a User loading OTPConfirmAccount", () => {
      otpConfirmAccount = shallow(<OTPConfirmAccount {...screenProps} />);
    });

    when("I navigate to the OTPConfirmAccount", () => {
      instance = otpConfirmAccount.instance() as OTPConfirmAccount;
    });

    then("OTPConfirmAccount will load with out errors", () => {
      expect(otpConfirmAccount).toBeTruthy();

    });

    then("OTPConfirmAccount will init values without errors", () => {
      instance = otpConfirmAccount.instance() as OTPConfirmAccount;
      instance.componentDidMount();
      instance.countDown();
      expect(otpConfirmAccount).toBeTruthy();

    });

    then("submit form without errors", () => {
      let formComponent = otpConfirmAccount.findWhere(
        (node) => node.prop("data-testid") === "email-otp-form"
      );
      formComponent.simulate(
        "submit",
        {
          otp: "test",
        },
        { resetForm: jest.fn() }
      );
    });

    then("I can select the button with out errors", () => {
      let buttonComponent = otpConfirmAccount.findWhere(
        (node) => node.prop("data-testid") === "button-navigate"
      );
      buttonComponent.simulate("click");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(otpConfirmAccount).toBeTruthy();

    });
  });

  test("User navigates to SignUpConfirmComponent", ({ given, when, then }) => {
    let signUpConfirm: ShallowWrapper;
    let instance: SignUpConfirmComponent;

    given("I am a User loading SignUpConfirmComponent", () => {
      signUpConfirm = shallow(<SignUpConfirmComponent {...screenProps} />);
    });

    when("I navigate to the SignUpConfirmComponent", () => {
      instance = signUpConfirm.instance() as SignUpConfirmComponent;
    });

    then("SignUpConfirmComponent will load with out errors", () => {
      expect(signUpConfirm).toBeTruthy();

    });

    then("Register email without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            attributes: {
              email: "test@test.com",
              full_name: "test",
              image_url: "",
            },
          },
          meta: { token: "" },
        }
      );
      instance.registerEmailAPICallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("Failed to register email", () => {
      const msgErrorMessageRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgErrorMessageRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              Error: "Error",
            },
          ],
        }
      );
      instance.registerEmailAPICallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("Send OTP email without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
          meta: { token: "" },
        }
      );
      instance.sendEmailOTPApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("Failed to send OTP email", () => {
      const msgErrorMessageRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgErrorMessageRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              Error: "Error",
            },
          ],
        }
      );
      instance.sendEmailOTPApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("Resend OTP email without errors", () => {
      const msgSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSuccessRestAPI.messageId
      );
      msgSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
          meta: { token: "" },
        }
      );
      instance.resendOTPEmailAPICallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("Failed to resend OTP email", () => {
      const msgErrorMessageRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgErrorMessageRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              Error: "Error",
            },
          ],
        }
      );
      instance.resendOTPEmailAPICallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(signUpConfirm).toBeTruthy();

    });
  });
});
