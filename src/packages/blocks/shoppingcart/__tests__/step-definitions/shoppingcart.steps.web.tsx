import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { any } from "prop-types";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import ShoppingCartWeb from "../../src/ShoppingCart.web";
import CheckoutWeb, { Checkout } from "../../src/Checkout.web";


const navigation = {
  state: { params: {} },
  dispatch: jest.fn(),
  goBack: jest.fn(),
  dismiss: jest.fn(),
  navigate: jest.fn(),
  openDrawer: jest.fn(),
  closeDrawer: jest.fn(),
  toggleDrawer: jest.fn(),
  getParam: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  isFocused: jest.fn()
}

const screenProps = {
    navigation: navigation,
    id: "ShoppingCartWeb"
  }

  const feature = loadFeature('./__tests__/features/shoppingcart-web-scenario.feature');
  
  defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to shoppingcart', ({ given, when, then }) => {
      let shoppingcartWrapper:ShallowWrapper;
      let instance:ShoppingCartWeb; 

      given('I am a User loading shoppingcart', () => {
          shoppingcartWrapper = shallow(<ShoppingCartWeb {...screenProps}/>)
      });

      when('I navigate to the shoppingcart', () => {
           instance = shoppingcartWrapper.instance() as ShoppingCartWeb
      });

      then('shoppingcart will load with out errors', () => {
          expect(shoppingcartWrapper).toBeTruthy()
          instance = shoppingcartWrapper.instance() as ShoppingCartWeb

          const msgToken = new Message(
             getName(MessageEnum.SessionResponseMessage)
           );
           msgToken.addData(
             getName(MessageEnum.SessionResponseToken),
             "TOKEN"
           );
           runEngine.sendMessage("Unit Test", msgToken);
     
           const msgValidationAPI = new Message(
             getName(MessageEnum.RestAPIResponceMessage)
           );
           msgValidationAPI.addData(
             getName(MessageEnum.RestAPIResponceDataMessage),
             msgValidationAPI.messageId
           );
         
           msgValidationAPI.addData(
             getName(MessageEnum.RestAPIResponceSuccessMessage),
             {
               data: {}
             }
           );
     
           instance.GetCartApiCallId = msgValidationAPI.messageId;
           runEngine.sendMessage("Unit Test", msgValidationAPI);
     
           
           const msgError = new Message(
             getName(MessageEnum.RestAPIResponceErrorMessage)
           );
           msgError.addData(
             getName(MessageEnum.RestAPIResponceDataMessage),
             msgValidationAPI.messageId
           );
           msgError.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
             data: []
           });
           instance.GetCartApiCallId = msgValidationAPI.messageId;
           runEngine.sendMessage("Unit Test", msgValidationAPI);
      });
      then("shoppingcart failed to load carts", () => {
        const msgLoadDataErrorRestAPI = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        msgLoadDataErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgLoadDataErrorRestAPI
        );
        msgLoadDataErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          {
            errors: [{}],
          }
        );
        msgLoadDataErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgLoadDataErrorRestAPI.messageId
        );
        instance.GetCartApiCallId = msgLoadDataErrorRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
      });
      then('shoppingcart will refresh shipping address without errors', () => {
        expect(shoppingcartWrapper).toBeTruthy()
      });

      then('shoppingcart failed to refresh shipping address', () => {
        expect(shoppingcartWrapper).toBeTruthy()
      });
      
      then("shoppingcart will update cart quantity without errors", () => {
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
          }
        );
        instance.putUpdateCartQuantityApiCallId = msgSuccessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
      });
  
      then("shoppingcart failed to update cart quantity", () => {
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
        instance.putUpdateCartQuantityApiCallId = msgErrorMessageRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
      });
     
      then("shoppingcart will delete cart item without errors", () => {
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
          }
        );
        instance.delCartItemApiCallId = msgSuccessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
      });
  
      then("shoppingcart failed to delete cart cart item", () => {
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
        instance.delCartItemApiCallId = msgErrorMessageRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
      });

      then("shoppingcart will post wishlist without errors", () => {
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
          }
        );
        instance.postWishlistApiCallId = msgSuccessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
      });

      then("shoppingcart failed to post wishlist", () => {
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
        instance.postWishlistApiCallId = msgErrorMessageRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
      });

      then("shoppingcart will post apply coupon without errors", () => {
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
          }
        );
        instance.postApplyCouponApiCallId = msgSuccessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
      });

      then("shoppingcart failed to post apply coupon", () => {
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
        instance.postApplyCouponApiCallId = msgErrorMessageRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
      });

      then("shoppingcart will delete coupon without errors", () => {
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
          }
        );
        instance.delCouponApiCallId = msgSuccessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
      });

      then("shoppingcart failed to delete coupon", () => {
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
        instance.delCouponApiCallId = msgErrorMessageRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
      });

      then("shoppingcart will post buy now without errors", () => {
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
          }
        );
        instance.postBuyNowApiCallId = msgSuccessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
      });

      then("shoppingcart failed to buy now", () => {
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
        instance.postBuyNowApiCallId = msgErrorMessageRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
      });

      then("I can select the button with out errors", () => {
        // let buttonComponent = shoppingcartWrapper.findWhere(
        //   (node) => node.prop("data-testid") === "input-cart-coupon"
        // );
        // jest.spyOn(instance, 'changeCouponCode')
        // expect(instance.changeCouponCode).toHaveBeenCalledTimes(1)
        // const event = {
        //   preventDefault() {},
        //   target: { value: "hello@aol.com" },
        // };
        // buttonComponent.simulate("change", event);
      });

      then('I can leave the screen with out errors', () => {
          instance.componentWillUnmount()
          expect(shoppingcartWrapper).toBeTruthy()
      });
  });

  test('User navigates to checkout', ({ given, when, then }) => {
    let checkouttWrapper:ShallowWrapper;
    let instance:Checkout; 

    given('I am a User loading checkout', () => {
        checkouttWrapper = shallow(<Checkout history={undefined} {...screenProps}/>)
    });

    when('I navigate to the checkout', () => {
         instance = checkouttWrapper.instance() as Checkout
    });

    then('checkout will add new address without errors', () => {
      expect(checkouttWrapper).toBeTruthy()
      instance = checkouttWrapper.instance() as Checkout;

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
        }
      );
      instance.addNewAddressAPICallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then('checkout failed to add new address', () => {
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
      instance.addNewAddressAPICallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
      });

    then('checkout will get user delivery address without errors', () => {
        const msgToken = new Message(
           getName(MessageEnum.SessionResponseMessage)
         );
         msgToken.addData(
           getName(MessageEnum.SessionResponseToken),
           "TOKEN"
         );
         runEngine.sendMessage("Unit Test", msgToken);
   
         const msgValidationAPI = new Message(
           getName(MessageEnum.RestAPIResponceMessage)
         );
         msgValidationAPI.addData(
           getName(MessageEnum.RestAPIResponceDataMessage),
           msgValidationAPI.messageId
         );
       
         msgValidationAPI.addData(
           getName(MessageEnum.RestAPIResponceSuccessMessage),
           {
             data: {}
           }
         );
   
         instance.getUserDeliveryAddressAPICallId = msgValidationAPI.messageId;
         runEngine.sendMessage("Unit Test", msgValidationAPI);
   
         
         const msgError = new Message(
           getName(MessageEnum.RestAPIResponceErrorMessage)
         );
         msgError.addData(
           getName(MessageEnum.RestAPIResponceDataMessage),
           msgValidationAPI.messageId
         );
         msgError.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
           data: []
         });
         instance.getUserDeliveryAddressAPICallId = msgValidationAPI.messageId;
         runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("checkout failed to get user delivery address", () => {
      const msgLoadDataErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataErrorRestAPI
      );
      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );
      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataErrorRestAPI.messageId
      );
      instance.getUserDeliveryAddressAPICallId = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("checkout will update delivery address without errors", () => {
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
        }
      );
      instance.updateDeliveryAddressAPiCallID = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to update delivery address", () => {
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
      instance.updateDeliveryAddressAPiCallID = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will delete delivery address without errors", () => {
      // const msgSuccessRestAPI = new Message(
      //   getName(MessageEnum.RestAPIResponceMessage)
      // );
      // msgSuccessRestAPI.addData(
      //   getName(MessageEnum.RestAPIResponceDataMessage),
      //   msgSuccessRestAPI.messageId
      // );
      // msgSuccessRestAPI.addData(
      //   getName(MessageEnum.RestAPIResponceSuccessMessage),
      //   {
      //     data: {},
      //   }
      // );
      // instance.delCartItemApiCallId = msgSuccessRestAPI.messageId;
      // runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to delete delivery address", () => {
      // const msgErrorMessageRestAPI = new Message(
      //   getName(MessageEnum.RestAPIResponceMessage)
      // );
      // msgErrorMessageRestAPI.addData(
      //   getName(MessageEnum.RestAPIResponceSuccessMessage),
      //   {
      //     errors: [
      //       {
      //         Error: "Error",
      //       },
      //     ],
      //   }
      // );
      // instance.delCartItemApiCallId = msgErrorMessageRestAPI.messageId;
      // runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will calculate shipping address charge without errors", () => {
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
        }
      );
      instance.calculateShippingAddressChargeCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to calculate shipping address charge", () => {
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
      instance.calculateShippingAddressChargeCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will release shipping address charge without errors", () => {
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
        }
      );
      instance.releaseShippingAddressChargeCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to release shipping address charge", () => {
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
      instance.releaseShippingAddressChargeCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    
    then("checkout will get cart without errors", () => {
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
        }
      );
      instance.GetCartApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to get cart", () => {
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
      instance.GetCartApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will put update cart quantity", () => {
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
        }
      );
      instance.putUpdateCartQuantityApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to put update cart quantity", () => {
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
      instance.putUpdateCartQuantityApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });    

    then("checkout will delete cart item", () => {
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
        }
      );
      instance.delCartItemApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to delete cart item", () => {
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
      instance.delCartItemApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will post wishlist", () => {
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
        }
      );
      instance.postWishlistApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to post wishlist", () => {
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
      instance.postWishlistApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will post apply coupon", () => {
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
        }
      );
      instance.postApplyCouponApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to post apply coupon", () => {
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
      instance.postApplyCouponApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will delete coupon", () => {
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
        }
      );
      instance.delCouponApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to delete coupon", () => {
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
      instance.delCouponApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will buy now without errors", () => {
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
        }
      );
      instance.postBuyNowApiCallId = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to buy now", () => {
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
      instance.postBuyNowApiCallId = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });

    then("checkout will update delivery address without errors", () => {
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
        }
      );
      instance.updateDeliveryAddressAPiCallID = msgSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSuccessRestAPI);
    });

    then("checkout failed to update delivery address", () => {
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
      instance.updateDeliveryAddressAPiCallID = msgErrorMessageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);
    });
    
    then("Show select address modal without errors", () => {
     
    });
    then("I can select the button with out errors", () => {
      // let buttonComponent = shoppingcartWrapper.findWhere(
      //   (node) => node.prop("data-testid") === "input-cart-coupon"
      // );
      // jest.spyOn(instance, 'changeCouponCode')
      // expect(instance.changeCouponCode).toHaveBeenCalledTimes(1)
      // const event = {
      //   preventDefault() {},
      //   target: { value: "hello@aol.com" },
      // };
      // buttonComponent.simulate("change", event);
    });

    then('I can leave the screen with out errors', () => {
        instance.componentWillUnmount()
        expect(checkouttWrapper).toBeTruthy()
    });
});

  })



