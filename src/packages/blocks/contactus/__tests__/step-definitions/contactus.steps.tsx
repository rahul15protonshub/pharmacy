import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
export const configJSON = require("../../config.json");
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Contactus from "../../src/Contactus";
import TopHeader from "../../../studio-store-ecommerce-components/src/TopHeader/TopHeader";

const screenProps = {
  navigation:{
    navigate: jest.fn(),
    addListener:(param:string,callback:any)=>{
      callback()
    },
  },
  id: "Contactus",
};

const feature = loadFeature("./__tests__/features/contactus-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
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
    then("contactus save without errors", () => {
      const addCategoryAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addCategoryAPI
      );
      addCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      addCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addCategoryAPI.messageId
      );
      instance.saveContactUsApiCallId = addCategoryAPI.messageId;
      runEngine.sendMessage("Unit Test", addCategoryAPI);
    });
    then("contactus get profile without errors", () => {
      const addCategoryAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addCategoryAPI
      );
      addCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      addCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addCategoryAPI.messageId
      );
      instance.getUserProfileApiCallId = addCategoryAPI.messageId;
      runEngine.sendMessage("Unit Test", addCategoryAPI);
    });

    then(`Contactus load TopHeader without errors`, () => {
      ContactUsWrapper.find(TopHeader).first().prop('onPressLeft')
  });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(ContactUsWrapper).toBeTruthy();
    });
   


  });

  test("Empty fields", ({ given, when, then }) => {
    let ContactUsWrapper: ShallowWrapper;
    let instance: Contactus;

    given("I am a user attempting to add a contact", () => {
      ContactUsWrapper = shallow(<Contactus {...screenProps} />);
      instance = ContactUsWrapper.instance() as Contactus;
      expect(ContactUsWrapper).toBeTruthy();
    });

    when("I am adding a contact with empty fields", () => {
      instance = ContactUsWrapper.instance() as Contactus;
      instance.setState({
        textInputData: {
          name: "",
          email: "",
          phoneNo: "",
        },
        descriptionText: "",
      });
    });

    then("add contact should fail", () => {
      expect(instance.validateInput()).toBe(false);
      instance.clearInputErrors();
    });
  });

  test("Wrong email", ({ given, when, then }) => {
    let ContactUsWrapper: ShallowWrapper;
    let instance: Contactus;

    given("I am a user attempting to add a contact", () => {
      ContactUsWrapper = shallow(<Contactus {...screenProps} />);
      instance = ContactUsWrapper.instance() as Contactus;
      expect(ContactUsWrapper).toBeTruthy();
    });

    when("I am adding a contact with wrong email", () => {
      instance = ContactUsWrapper.instance() as Contactus;
      instance.setState({
        textInputData: {
          name: "Abhinav",
          email: "Abhinav",
          phoneNo: "+911221133322",
        },
        descriptionText: "Test",
      });
    });

    then("add contact should fail", () => {
      expect(instance.validateInput()).toBe(false);
    });
  });

  test("Wrong phone number", ({ given, when, then }) => {
    let ContactUsWrapper: ShallowWrapper;
    let instance: Contactus;

    given("I am a user attempting to add a contact", () => {
      ContactUsWrapper = shallow(<Contactus {...screenProps} />);
      instance = ContactUsWrapper.instance() as Contactus;
      expect(ContactUsWrapper).toBeTruthy();
    });

    when("I am adding a contact with wrong phone number", () => {
      instance = ContactUsWrapper.instance() as Contactus;
      instance.setState({
        textInputData: {
          name: "Abhinav",
          email: "Abhi@gmail.com",
          phoneNo: "123212",
        },
        descriptionText: "Test",
      });
    });

    then("add text without error", () => {
    let textInputContactname = ContactUsWrapper.findWhere((node) => node.prop('testID') === 'txtcontactname');
    textInputContactname.simulate('focus')
    textInputContactname.simulate('changeText', 'test');
    textInputContactname.simulate('blur')
 

    let textInputContactemail = ContactUsWrapper.findWhere((node) => node.prop('testID') === 'txtcontactemail');
    textInputContactemail.simulate('focus')
    textInputContactemail.simulate('changeText', 'hello@aol.com');
    textInputContactemail.simulate('blur')

    let textInputContactphone = ContactUsWrapper.findWhere((node) => node.prop('testID') === 'txtcontactphone');
    textInputContactphone.simulate('focus')
    textInputContactphone.simulate('changeText', '123456789');
    textInputContactphone.simulate('blur')

   let  textInputContactdesc = ContactUsWrapper.findWhere((node) => node.prop('testID') === 'txtcontactdecs');
    textInputContactdesc.simulate('focus')
    textInputContactdesc.simulate('changeText', 'this is testing');
    textInputContactdesc.simulate('blur')

    });
    then("header press without error", () => {
      let textInputComponent = ContactUsWrapper.findWhere((node) => node.prop('testID') === 'onheaderpress');
      textInputComponent.simulate('click');
  
      textInputComponent = ContactUsWrapper.findWhere((node) => node.prop('testID') === 'ongreenbuttonpress');
      textInputComponent.simulate('press');
  
      // textInputComponent = ContactUsWrapper.findWhere((node) => node.prop('testID') === 'txtcontactphone');
      // textInputComponent.simulate('changeText', '123456789');
  
      // textInputComponent = ContactUsWrapper.findWhere((node) => node.prop('testID') === 'txtcontactdecs');
      // textInputComponent.simulate('changeText', 'this is testing');
  
      });

    then("add contact should fail", () => {

      expect(instance.validateInput()).toBe(false);
      
      const addContactSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addContactSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addContactSucessRestAPI.messageId
      );
      addContactSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              contact: ["Phone number is not valid"],
            },
          ],
        }
      );

      runEngine.sendMessage("Unit Test", addContactSucessRestAPI);
    });
  });

  test("Add contact with correct data", ({ given, when, then }) => {
    let ContactUsWrapper: ShallowWrapper;
    let instance: Contactus;

    given("I am a user attempting to add a contact", () => {
      ContactUsWrapper = shallow(<Contactus {...screenProps} />);
      instance = ContactUsWrapper.instance() as Contactus;
      expect(ContactUsWrapper).toBeTruthy();
    });

    when("I am adding a contact with correct data", () => {
      instance = ContactUsWrapper.instance() as Contactus;
      instance.setState({
        textInputData: {
          name: "Abhinav",
          email: "Abhi@gmail.com",
          phoneNo: "+911234321232",
        },
        descriptionText: "Test",
      });
    });

    then("add contact should succeed", () => {
      expect(instance.validateInput()).toBe(true);
    });
    then("Rest Api will return success response", () => {
      const addContactSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addContactSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addContactSucessRestAPI.messageId
      );
      addContactSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "40",
            type: "contact",
            attributes: {
              name: "Demo User",
              email: "demo.user@gmail.com",
              phone_number: "+919987654322",
              description: "Test",
              created_at: "2020-10-20T10:24:14.911Z",
              user: " ",
            },
          },
        }
      );

      runEngine.sendMessage("Unit Test", addContactSucessRestAPI);
    });
  });
});
