import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Notifications } from "../../src/Notifications.web";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn(),
  },
  total: 0,
  id: "Notifications",
};

const feature = loadFeature(
  "./__tests__/features/notifications-web-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to notifications", ({ given, when, then }) => {
    let notificationsBlock: ShallowWrapper;
    let instance: Notifications;

    given("I am a User loading notifications", () => {
      notificationsBlock = shallow(<Notifications {...screenProps} />);
    });

    when("I navigate to the notifications", () => {
      instance = notificationsBlock.instance() as Notifications;
      // instance.componentDidMount();
      // instance.getNotificationList();
    });

    then("notifications will load with out errors", () => {
      expect(notificationsBlock).toBeTruthy();

    });

    then("notifications will load notification list without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              id: "1",
              attributes: {
                is_read: false,
                name: "test",
                title: "notification test",
                message: "this is the notification test message",
                created_at: "2021-05-09 11:11:09",
              },
            },
          ],
        }
      );
      instance.getAllNotificationsAPICallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("notifications will read notification without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.readAllNotificationsAPICallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("notifications will delete notification without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.deleteAllNotificationAPICallID = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("notifications will read single notification without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.readSingleNotificationOnIDAPICallID = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("notifications will delete single notification without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.deleteSingleNotificationOnIDAPICallID = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Set different states to render different views", () => {
      expect(notificationsBlock).toBeTruthy();

    });

    then("I can select the button with out errors", () => {
      instance = notificationsBlock.instance() as Notifications;
      instance.setState({
        notificationsList: [
          {
            id: "1",
            attributes: {
              is_read: false,
              name: "test",
              title: "notification test",
              message: "this is the notification test message",
              created_at: "2021-05-09 11:11:09",
            },
          },
        ],
      });
      expect(notificationsBlock).toBeTruthy();


      let buttonComponent = notificationsBlock.findWhere(
        (node) => node.prop("data-testid") === "button-readall"
      );
      buttonComponent.simulate("click");

      buttonComponent = notificationsBlock.findWhere(
        (node) => node.prop("data-testid") === "button-deleteall"
      );
      buttonComponent.simulate("click");

      buttonComponent = notificationsBlock.findWhere(
        (node) => node.prop("data-testid") === "content-notification-item"
      );
      buttonComponent.simulate("click");

      buttonComponent = notificationsBlock.findWhere(
        (node) => node.prop("data-testid") === "button-read-notification-item"
      );
      buttonComponent.simulate("click");

      // buttonComponent = notificationsBlock.findWhere(
      //   (node) => node.prop("data-testid") === "button-delete-notification-item"
      // );
      // buttonComponent.simulate("click");

      buttonComponent = notificationsBlock.findWhere(
        (node) => node.prop("data-testid") === "button-load-more"
      );
      buttonComponent.simulate("click");

      instance.setState({ notificationsList: [] });

      buttonComponent = notificationsBlock.findWhere(
        (node) => node.prop("data-testid") === "button-continue-shopping"
      );
      buttonComponent.simulate("click");
      expect(notificationsBlock).toBeTruthy();

    });

    then("Show delete notification confirm modal without errors", () => {
      instance.setState({ isDeleteNotificationCheck: true });
      let buttonComponent = notificationsBlock.findWhere(
        (node) =>
          node.prop("data-testid") === "button-delete-single-notification"
      );
      buttonComponent.simulate("click");
      buttonComponent = notificationsBlock.findWhere(
        (node) =>
          node.prop("data-testid") === "button-delete-notification-close"
      );
      buttonComponent.simulate("click");
    });

    then("I can leave the screen with out errors", () => {
      // instance.componentWillUnmount();
      expect(notificationsBlock).toBeTruthy();

    });
  });
});
