// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));

const localStorageMock = {
  getItem: () => "{}",
  setItem: () => "{}",
  removeItem: () => "{}",
  clear: () => "{}",
};

global.localStorage = localStorageMock;
window.scrollTo = jest.fn();
window.notify = jest.fn();

jest.mock('react-router-dom', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    // add your noops here
    useParams: jest.fn(),
    useHistory: jest.fn(),
  };
});

