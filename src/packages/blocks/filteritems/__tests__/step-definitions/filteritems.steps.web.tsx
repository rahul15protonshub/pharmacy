import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import {FilterProduct} from "../../src/FilterProduct.web";
import Filteroptions from "../../src/Filteroptions.web";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn(),
    state: {
      params: {
        filterData: [],
        onPressFilter: jest.fn(),
      },
    },
  },
  id: "Filteritems",
};

const feature = loadFeature(
  "./__tests__/features/filteritems-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to filteritems", ({ given, when, then }) => {
    let filterItemsBlock: ShallowWrapper;
    let instance: FilterProduct;

    given("I am a User loading filteritems", () => {
      filterItemsBlock = shallow(<FilterProduct {...screenProps} />);
      expect(filterItemsBlock).toBeTruthy();
      instance = filterItemsBlock.instance() as FilterProduct;
    });

    when("I navigate to the filteritems", () => {
      // instance = filterItemsBlock.instance() as Filteritems;
    });

    then("filteritems will load with out errors", async () => {
      await instance.componentDidMount();
      expect(filterItemsBlock).toBeTruthy();

    });

    then("filteritems will load products without errors", () => {
    });

    then("filteritems will filter data without errors", () => {
    });

    then("filteritems will add to wishlist without errors", () => {
    });

    then("filteritems will remove from wishlist without errors", () => {
    });

    then("filteritems will get products with id without errors", () => {
    });

    then("filteritems will add to cart without errors", () => {
    });

    then("filteritems will get cart list without errors", () => {
    });

    then("I can select the button with with out errors", () => {
    });

    then("I can leave the screen with out errors", () => {
      expect(filterItemsBlock).toBeTruthy();
    });
  });

  test("User navigates to filteroptions", ({ given, when, then }) => {
    let filterItemsBlock: ShallowWrapper;
    let instance: Filteroptions;

    given("I am a User loading filteroptions", () => {
      filterItemsBlock = shallow(<Filteroptions {...screenProps} />);
      expect(filterItemsBlock).toBeTruthy();
      instance = filterItemsBlock.instance() as Filteroptions;
    });

    when("I navigate to the filteroptions", () => {
    });

    then("filteroptions will load with out errors", async () => {
    });

    then("filteroptions will get category without errors", () => {

    });

    then("filteroptions will get brand without errors", () => {
    });

    then("filteroptions will apply all without errors", () => {
    });

    then("filteroptions will get tags without errors", () => {
    });

    then("I can select the button with with out errors", () => {
     
    });

    then("I can leave the screen with out errors", () => {
      // instance.componentWillUnmount();
      expect(filterItemsBlock).toBeTruthy();
    });
  });
});
