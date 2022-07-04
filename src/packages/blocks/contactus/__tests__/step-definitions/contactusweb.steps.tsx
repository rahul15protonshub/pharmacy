import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper, mount } from "enzyme";
export const configJSON = require("../../config.json");
import React from "react";
import { Contactus } from "../../src/ContactUs.web";
import { AboutUsBlockBlock } from "../../src/AboutUsBlock.web";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import {ContactusSuccess} from "../../src/SuccessBlock.web"

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Contactus",
  title: "Message Sent Successfully",
  message: "We will connect with you soon regarding your query."
};

const aboutScreenProps = {
  navigation: navigation,
  id: "AboutUs",
  history: jest.fn(),
  match: jest.fn(),
};

const feature = loadFeature(
  "./__tests__/features/contactusweb-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to contactus", ({ given, when, then }) => {
    let ContactUsWrapper: ShallowWrapper;
    let instance: Contactus;

    given("I am a User loading contactus", () => {
      ContactUsWrapper = shallow(<Contactus {...screenProps} />);
      expect(ContactUsWrapper).toBeTruthy();
    });

    when("I navigate to the contactus", () => {
      instance = ContactUsWrapper.instance() as Contactus;
    });

    then("contactus will load with out errors", () => {
      expect(ContactUsWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(ContactUsWrapper).toBeTruthy();
    });
  });

  test("Formik test with change, submit", ({ given, when, then }) => {
    let ContactUsWrapper: ShallowWrapper;
    let instance: Contactus;

    given("I am a user attempting to add a contact", () => {
      ContactUsWrapper = shallow(<Contactus {...screenProps} />);
    });

    when("load contactus with blank data", () => {
      instance = ContactUsWrapper.instance() as Contactus;
    });

    then("submit form without errors", () => {
      let formComponent = ContactUsWrapper.findWhere(
        (node) => node.prop("data-testid") === "contactus-form"
      );
      formComponent.simulate(
        "submit",
        {
          name: "test",
          email: "test@test.com",
          phone: "+1234567890",
          title: "test",
        },
        { resetForm: jest.fn() }
      );

      const apiMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data:[{id:1,type:"contactus"}]})
      instance.addContactApiCallId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      
      let ContactusSuccessWrapper: ShallowWrapper;
      ContactusSuccessWrapper = shallow(<ContactusSuccess {...screenProps} />);

    });
  });

  test("User navigates to aboutusblock", ({ given, when, then }) => {
    let AboutUsWrapper: ShallowWrapper;
    let instance: AboutUsBlockBlock;

    given("I am a User loading aboutusblock", () => {
      AboutUsWrapper = shallow(<AboutUsBlockBlock {...aboutScreenProps} />);
      expect(AboutUsWrapper).toBeTruthy();
    });

    when("I navigate to the aboutusblock", () => {
      instance = AboutUsWrapper.instance() as AboutUsBlockBlock;
    });

    then("aboutusblock will load with out errors", () => {
      expect(AboutUsWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(AboutUsWrapper).toBeTruthy();
    });
  });
});
