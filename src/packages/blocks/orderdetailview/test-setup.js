// test-setup.js
import * as ReactNative from "react-native";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

configure({ adapter: new Adapter() });

// web localStorage
const localStorageMock = {
  getItem: () => "{}",
  setItem: () => "{}",
  clear: () => "{}",
};

global.localStorage = localStorageMock;
window.scrollTo = jest.fn();

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));

jest.mock("../../framework/src/StorageProvider", () => {
  return {
    get: jest.fn(),
    remove: jest.fn(),
  };
});

jest.mock("@react-native-community/async-storage", () => mockAsyncStorage);

ReactNative.NativeModules.RNCAsyncStorage = mockAsyncStorage;

// jest.mock("react-native/Libraries/LogBox/LogBox");
