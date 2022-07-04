// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));


jest.mock('react-native-razorpay', () => ({
    show: () => {},
  }))

window.scrollTo = jest.fn();
window.confirm = jest.fn();