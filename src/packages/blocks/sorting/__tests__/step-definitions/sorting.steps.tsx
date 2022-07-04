import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Sorting from "../../src/Sorting";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Sorting"
};

const feature = loadFeature("./__tests__/features/sorting-scenario.feature");

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to sorting", ({ given, when, then }) => {
    let sortingWrapper: ShallowWrapper;
    let instance: Sorting;

    given("I am a User loading sorting", () => {
      sortingWrapper = shallow(<Sorting {...screenProps} />);
    });

    when("I navigate to the sorting", () => {
      instance = sortingWrapper.instance() as Sorting;
    });

    then("sorting will load with out errors", () => {
      expect(sortingWrapper).toBeTruthy();


      const sessionResponseMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );

      sessionResponseMessage.addData(
        getName(MessageEnum.SessionResponseToken),
        {"token": ""}
      );
      runEngine.sendMessage("Unit Test", sessionResponseMessage);
     
      const sortItemsErrorAPI = new Message(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      sortItemsErrorAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        sortItemsErrorAPI.messageId
      );
      instance.getSortAscApiCallId = sortItemsErrorAPI.messageId;
      runEngine.sendMessage("Unit Test", sortItemsErrorAPI);

      const sortItemsAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      sortItemsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        sortItemsAPI.messageId
      );
      instance.getSortAscApiCallId = sortItemsAPI.messageId;
      runEngine.sendMessage("Unit Test", sortItemsAPI);

    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = sortingWrapper.findWhere(
        node => node.prop("testID") === "sortModalOpen"
      );
      buttonComponent.simulate("press");

      buttonComponent = sortingWrapper.findWhere(
        node => node.prop("testID") === "sortPriceAsc"
      );
      buttonComponent.simulate("press");

      buttonComponent = sortingWrapper.findWhere(
        node => node.prop("testID") === "sortPriceDesc"
      );
      buttonComponent.simulate("press");

      buttonComponent = sortingWrapper.findWhere(
        node => node.prop("testID") === "sortNewest"
      );
      buttonComponent.simulate("press");

      buttonComponent = sortingWrapper.findWhere(
        node => node.prop("testID") === "sortPopularity"
      );
      buttonComponent.simulate("press");


    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(sortingWrapper).toBeTruthy();

    });
  });
});
