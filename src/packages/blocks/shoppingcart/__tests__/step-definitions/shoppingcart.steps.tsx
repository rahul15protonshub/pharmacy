/// <reference types="@types/jest" />

import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"
import { FlatList, ScrollView,Linking, } from "react-native";
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Shoppingcart from "../../src/Shoppingcart"
import Checkout from "../../src/Checkout"
import EditAddress from "../../src/EditAddress"
import SavedAddress from "../../src/SavedAddress"
import TopHeader from '../../../studio-store-ecommerce-components/src/TopHeader/TopHeader'
import CustomErrorModal from '../../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal'
import GreenButton from '../../../studio-store-ecommerce-components/src/GreenButton/GreenButton'
import Prescriptionuploads from '../../../../components/src/precriptionuploads'
import StorageProvider from "../../../../framework/src/StorageProvider";
const cart = require('../../__mocks__/mockCart.json');
const wishlistResponse = require('../../__mocks__/wishlistResponse.json');
const applyCouponResponse = require('../../__mocks__/applyCouponResponse.json');
const deleteCouponResponse = require('../../__mocks__/deleteCouponResponse.json');
const statesList = require('../../__mocks__/statesList.json');
const addresses = require('../../__mocks__/addresses.json');

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
  push: jest.fn(),
  replace: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  isFocused: jest.fn(),
  addListener:(param:string,callback:any)=>{
    callback()
  }
}
// mock everything in react-native-fs
jest.mock('react-native-fs', () => {
  return {
    mkdir: jest.fn(),
    moveFile: jest.fn(),
    copyFile: jest.fn(),
    pathForBundle: jest.fn(),
    pathForGroup: jest.fn(),
    getFSInfo: jest.fn(),
    getAllExternalFilesDirs: jest.fn(),
    unlink: jest.fn(),
    exists: jest.fn(),
    stopDownload: jest.fn(),
    resumeDownload: jest.fn(),
    isResumable: jest.fn(),
    stopUpload: jest.fn(),
    completeHandlerIOS: jest.fn(),
    readDir: jest.fn(),
    readDirAssets: jest.fn(),
    existsAssets: jest.fn(),
    readdir: jest.fn(),
    setReadable: jest.fn(),
    stat: jest.fn(),
    readFile: jest.fn(),
    read: jest.fn(),
    readFileAssets: jest.fn(),
    hash: jest.fn(),
    copyFileAssets: jest.fn(),
    copyFileAssetsIOS: jest.fn(),
    copyAssetsVideoIOS: jest.fn(),
    writeFile: jest.fn(),
    appendFile: jest.fn(),
    write: jest.fn(),
    downloadFile: jest.fn(),
    uploadFiles: jest.fn(),
    touch: jest.fn(),
    MainBundlePath: jest.fn(),
    CachesDirectoryPath: jest.fn(),
    DocumentDirectoryPath: jest.fn(),
    ExternalDirectoryPath: jest.fn(),
    ExternalStorageDirectoryPath: jest.fn(),
    TemporaryDirectoryPath: jest.fn(),
    LibraryDirectoryPath: jest.fn(),
    PicturesDirectoryPath: jest.fn(),
  };
});

const screenProps = {
    navigation: navigation,
    id: "Shoppingcart"
  }

  const uploadproduct=[{selectedItems:'item',browsefile:'uri'}]
const textInputData={phone_number:'1223456787',name:'Test',flat_no:"43",address:'23333',city:'city',address_state_id:2,country:"country",zip_code:"zip_code"}
const feature = loadFeature('./__tests__/features/shoppingcart-scenario.feature');

const mockApiCallWithSuccessResponse = (instance: any, apiCallId: string, data?: any, message?: string) => {
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
      data: data ?? [{}],
      meta: {
        token: "token",
        message: "success"
      },
      
    }
  );
  instance[apiCallId] = msgLoadDataAPI.messageId;
  runEngine.sendMessage("Unit Test", msgLoadDataAPI);
  const msgLoadDataAPI1 = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );
  msgLoadDataAPI1.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    msgLoadDataAPI1.messageId
  );
  msgLoadDataAPI1.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    {
     
      message:'success'
    }
  );
  instance[apiCallId] = msgLoadDataAPI1.messageId;
  runEngine.sendMessage("Unit Test", msgLoadDataAPI1);
}

const mockApiCallWithErroneousSuccessResponse = (instance: any, apiCallId: string) => {
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
      errors: ["an error occured"],
    }
  );
  instance[apiCallId] = msgLoadDataAPI.messageId;
  runEngine.sendMessage("Unit Test", msgLoadDataAPI);
  const msgLoadDataAPI1 = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );
  msgLoadDataAPI1.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    msgLoadDataAPI1.messageId
  );
  msgLoadDataAPI1.addData(
    getName(MessageEnum.RestAPIResponceErrorMessage),
    {
      errors: ["an error occured"],
    }
  );
  instance[apiCallId] = msgLoadDataAPI1.messageId;
  runEngine.sendMessage("Unit Test", msgLoadDataAPI1);
}

const mockApiCallWithErrorResponse = (instance?: any, apiCallId?: string) => {
  const msgLoadDataAPI = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );
  msgLoadDataAPI.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    msgLoadDataAPI.messageId
  );
  msgLoadDataAPI.addData(
    getName(MessageEnum.RestAPIResponceErrorMessage),
    {
      errors: { message: "error occured" },
    }
  );
  if (instance && apiCallId) {
    instance[apiCallId] = msgLoadDataAPI.messageId;
  }
  runEngine.sendMessage("Unit Test", msgLoadDataAPI);
}

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
         //@ts-ignore
    StorageProvider = {
      get: jest.fn(),
      set: jest.fn(),
    }
    });

    test('User navigates to shoppingcart', ({ given, when, then }) => {
        let shoppingcartWrapper:ShallowWrapper;
        let instance:Shoppingcart; 

        given('I am a User loading shoppingcart', () => {
            shoppingcartWrapper = shallow(<Shoppingcart {...screenProps}/>)
        });

        when('I navigate to the shoppingcart', () => {
             instance = shoppingcartWrapper.instance() as Shoppingcart
             shoppingcartWrapper.find(CustomErrorModal).first().prop('hideErrorModal')()
             instance.setState({prescriptionModal:true})
             shoppingcartWrapper.find(Prescriptionuploads).first().prop('hideErrorModal')()
            
             instance.setState({showCouponCodeModal:true})
             instance.renderEmptyDataView()
        });

        then('shoppingcart will press buttons without errors',()=>{         
            let pressbilladdress=shoppingcartWrapper.findWhere((node)=>node.prop('testID')==="preslogin");
            pressbilladdress.simulate('press')
            let handleguest=shoppingcartWrapper.findWhere((node)=>node.prop('testID')==="handleguest");
            handleguest.simulate('press')
            let presscoupon=shoppingcartWrapper.findWhere((node)=>node.prop('testID')==="presscoupon");
            presscoupon.simulate('press')
            instance.setState({emptyCart:true,})
            presscoupon=shoppingcartWrapper.findWhere((node)=>node.prop('testID')==="opencatalogue");
            presscoupon.simulate('press')
            
            
        });
        

        then('shoppingcart will load with out errors', async() => {
            instance = shoppingcartWrapper.instance() as Shoppingcart
            instance.componentDidMount()
            instance.getToken()
            instance.getProfileData()
            instance.getCartHasProduct()
            instance.uploadproduct(uploadproduct)

            mockApiCallWithErrorResponse()
            mockApiCallWithSuccessResponse(instance, "getCartListApiCallId", cart.data)
            mockApiCallWithSuccessResponse(instance, "getCartProductId", cart.data)
            mockApiCallWithErroneousSuccessResponse(instance, "getWishlistApiCallId")
            mockApiCallWithErroneousSuccessResponse(instance, "getCartProductId")
            mockApiCallWithSuccessResponse(instance, "addPrescriptionApiCallId", cart.data)
            mockApiCallWithErroneousSuccessResponse(instance, "addPrescriptionApiCallId")
            mockApiCallWithSuccessResponse(instance, "getWishlistApiCallId", cart.data)
            mockApiCallWithErroneousSuccessResponse(instance, "getCartListApiCallId")
            
            expect(shoppingcartWrapper).toBeTruthy()
            const tempdata={attributes:{subscription_package:2,subscription_period:2,preferred_delivery_slot:'9',subscription_discount:'10%',
            catalogue_variant:{attributes:{images:{data:[{attributes:{url:'testt'}}]}}},
            is_default:false,
            quantity:5,
          }}
            await instance.onUpdateCartValue(tempdata,1,2,1)
             await instance.removeCartItem(tempdata,1,2,1)
             await instance.addToWishlist(tempdata,1,2)
             instance.renderMyOrderCell(tempdata,1)
             

        });

        then("shoppingcart will post wishlist without errors", () => {
          
          mockApiCallWithSuccessResponse(instance, "addToWishlistApiCallId", wishlistResponse.data)
        });
  
        then("shoppingcart failed to post wishlist", () => {
          mockApiCallWithErroneousSuccessResponse(instance, "addToWishlistApiCallId")
        });

        then("shoppingcart will post apply coupon without errors", () => {
        
          mockApiCallWithSuccessResponse(instance, "apiApplyCouponCallId", applyCouponResponse.data)
        });
  
        then("shoppingcart failed to post apply coupon", () => {
          mockApiCallWithErroneousSuccessResponse(instance, "apiApplyCouponCallId")
        });

        then("shoppingcart will post delete coupon without errors", () => {
          
            mockApiCallWithSuccessResponse(instance, "removeCouponApiCallId", deleteCouponResponse.data)
        });
  
        then("shoppingcart failed to post delete coupon", () => {
          mockApiCallWithErroneousSuccessResponse(instance, "removeCouponApiCallId")
        });

        then('I can leave the screen with out errors', () => {
          instance.handleBackButtonClick();
          instance.componentWillUnmount()
          expect(shoppingcartWrapper).toBeTruthy()
        });
    });

    test('User navigates to checkout', ({ given, when, then, and }) => {
        let checkouttWrapper:ShallowWrapper;
        let instance:Checkout; 

        given('I am a User loading checkout', () => {
            checkouttWrapper = shallow(<Checkout {...screenProps}/>)
        });

        when('I navigate to the checkout', () => {
             instance = checkouttWrapper.instance() as Checkout
             instance.setState({textInputData:textInputData,shippingtextInputData:textInputData})
        });
        then('checkout will load headers with out errors', () => {
          checkouttWrapper.find(TopHeader).first().prop('onPressLeft')()
          checkouttWrapper.find(CustomErrorModal).first().prop('hideErrorModal')()
          checkouttWrapper.find(GreenButton).first().prop('onPress')()
          
        });

        then('checkout will load buttons with out errors', () => {
          instance.setState({billingAndAddressSame:true,textInputData:'test'})
      
          let pressbilladdress=checkouttWrapper.findWhere((node)=>node.prop('testID')==="pressBillingAdd");
          pressbilladdress.simulate('press')
          instance.onSetAddress(addresses.data[0],"billing")

          let pressEnablesameBilling=checkouttWrapper.findWhere((node)=>node.prop('testID')==="pressEnablesameBilling");
          pressEnablesameBilling.simulate('press')
          
          let pressSaveaddress=checkouttWrapper.findWhere((node)=>node.prop('testID')==="pressSaveaddress");
          pressSaveaddress.simulate('press')
          
          let inputname=checkouttWrapper.findWhere((node)=>node.prop('testID')==="txtname");
          inputname.simulate('ref');
          inputname.simulate('changeText', 'hello');
          inputname.simulate('blur')
          inputname.simulate('onSubmitEditing',{ target: { value: 'test' } });
          
          let txtflat=checkouttWrapper.findWhere((node)=>node.prop('testID')==="txtflat");
          txtflat.simulate('ref',{ target: { value: 'test' } });
          txtflat.simulate('changeText', 'hello');
          txtflat.simulate('blur')
          txtflat.simulate('onSubmitEditing',{ target: { value: 'test' } });

          let inputcity=checkouttWrapper.findWhere((node)=>node.prop('testID')==="txtcity");
          inputcity.simulate('changeText', 'hello');
          inputcity.simulate('blur')
          inputcity.simulate('onSubmitEditing')
          
          let txtphonenumber=checkouttWrapper.findWhere((node)=>node.prop('testID')==="txtphonenumber");
          txtphonenumber.simulate('changeText', 'hello');
          txtphonenumber.simulate('blur')
          txtphonenumber.simulate('onSubmitEditing')

          let txtaddress1=checkouttWrapper.findWhere((node)=>node.prop('testID')==="txtaddress1");
          txtaddress1.simulate('changeText', 'hello');
          txtaddress1.simulate('blur')
          txtaddress1.simulate('onSubmitEditing')

          let txtaddress2=checkouttWrapper.findWhere((node)=>node.prop('testID')==="txtaddress2");
          txtaddress2.simulate('changeText', 'hello');
          txtaddress2.simulate('blur')
          txtaddress2.simulate('onSubmitEditing')

          let inputcountry=checkouttWrapper.findWhere((node)=>node.prop('testID')==="txtcountry");
          inputcountry.simulate('changeText', 'hello');
          inputcountry.simulate('blur')
          inputcountry.simulate('onSubmitEditing')

          let txtshpname=checkouttWrapper.findWhere((node)=>node.prop('testID')==="txtshpname");
          txtshpname.simulate('changeText', 'hello');
          txtshpname.simulate('blur')
          txtshpname.simulate('onSubmitEditing')
          
        

          let changestate=checkouttWrapper.findWhere((node)=>node.prop('testID')==="changestate");
          changestate.simulate('onValueChange');

          instance.setState({billingAndAddressSame:false})
          
          let pressShipingadd=checkouttWrapper.findWhere((node)=>node.prop('testID')==="pressShipingadd");
          pressShipingadd.simulate('press')
          
          let txtshpflat=checkouttWrapper.findWhere((node)=>node.prop('testID')==="txtshpflat");
          txtshpflat.simulate('changeText', 'hello');
          txtshpflat.simulate('blur')
          txtshpflat.simulate('onSubmitEditing')

        });
        
        then('checkout will load with out errors', () => {
            instance = checkouttWrapper.instance() as Checkout;
            instance.apiCall({ contentType: "", method: "", endPoint: "", body: "" })
            instance.getStateList()
            mockApiCallWithErroneousSuccessResponse(instance, "getStateListId")
            mockApiCallWithSuccessResponse(instance, "getStateListId", statesList.data)
            instance.getAddressData()
            mockApiCallWithErrorResponse(instance, "getAddressDataId")
            mockApiCallWithErroneousSuccessResponse(instance, "getAddressDataId")
            mockApiCallWithSuccessResponse(instance, "getAddressDataId", addresses.data)
            expect(checkouttWrapper).toBeTruthy()
        });

        and('I can add billing address without errors', () => {
          instance.setState({shippingsaveAddress: false})
          mockApiCallWithErrorResponse(instance, "saveBillingAddressId")
          mockApiCallWithErroneousSuccessResponse(instance, "saveBillingAddressId")
          mockApiCallWithSuccessResponse(instance, "saveBillingAddressId")
        });

        and('I can add shipping address without errors', () => {
          instance.setState({shippingsaveAddress: false})
          mockApiCallWithErrorResponse(instance, "saveShippingAddressId")
          mockApiCallWithErroneousSuccessResponse(instance, "saveShippingAddressId")
          mockApiCallWithSuccessResponse(instance, "saveShippingAddressId")
        });

        and('I can leave the screen with out errors', () => {
          instance.handleBackButtonClick()  
          instance.componentWillUnmount()
            expect(checkouttWrapper).toBeTruthy()
        });
    });

    test('User navigates to editaddress', ({ given, when, then }) => {
        let editAddressWrapper:ShallowWrapper;
        let instance:EditAddress; 

        given('I am a User loading editaddress', () => {
            editAddressWrapper = shallow(<EditAddress {...screenProps}/>)
        });

        when('I navigate to the editaddress', () => {
             instance = editAddressWrapper.instance() as EditAddress
             instance.getStateList()
             instance.setState({textInputData:textInputData})
             instance.saveAddress()
             instance.editAddress(1)
        });

        then('editAddress will load headers with out errors', () => {
          editAddressWrapper.find(TopHeader).first().prop('onPressLeft')()
          editAddressWrapper.find(CustomErrorModal).first().prop('hideErrorModal')()
          editAddressWrapper.find(GreenButton).first().prop('onPress')()
          
        });
        then('editaddress will load buttons with out errors', () => {
          let inputname=editAddressWrapper.findWhere((node)=>node.prop('testID')==="txtname");
          inputname.simulate('focus');
          inputname.simulate('changeText', 'hello');
          inputname.simulate('blur')
          inputname.simulate('Submit');

          let inputflat=editAddressWrapper.findWhere((node)=>node.prop('testID')==="txtflat");
          inputflat.simulate('focus');
          inputflat.simulate('changeText', 'hello');
          inputflat.simulate('blur')
          inputflat.simulate('Submit');

          let inputaddresline1=editAddressWrapper.findWhere((node)=>node.prop('testID')==="inputaddresline1");
          inputaddresline1.simulate('focus');
          inputaddresline1.simulate('changeText', 'hello');
          inputaddresline1.simulate('blur')
          inputaddresline1.simulate('Submit');

          let inputaddresline2=editAddressWrapper.findWhere((node)=>node.prop('testID')==="inputaddresline2");
          inputaddresline2.simulate('focus');
          inputaddresline2.simulate('changeText', 'hello');
          inputaddresline2.simulate('blur')
          inputaddresline2.simulate('Submit');
          
          let inputcity=editAddressWrapper.findWhere((node)=>node.prop('testID')==="txtcity");
          inputcity.simulate('focus');
          inputcity.simulate('changeText', 'hello');
          inputcity.simulate('blur')
          inputcity.simulate('Submit');
        })

        then('editaddress will load with out errors', () => {
            expect(editAddressWrapper).toBeTruthy()
            instance = editAddressWrapper.instance() as EditAddress;
        });
        
        then("editaddress will load stateslist without errors", () => {
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
          instance.getStateListApiCallId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
        then("editaddress will load stateslist with errors", () => {
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
              errors: [{}],
            }
          );
          msgLoadDataAPI.addData(
            getName(MessageEnum.RestAPIResponceErrorMessage),
            {
              errors: [{}],
            }
          );
          instance.getStateListApiCallId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
        
        then("editaddress will load addAddressApiCallId without errors", () => {
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
          instance.addAddressApiCallId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
        then("editaddress will load addAddressApiCallId with errors", () => {
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
              errors: [{}],
            }
          );
        
          instance.addAddressApiCallId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
        then("editaddress will load addAddressApiCallId with errorss", () => {
          const msgLoadDataAPI = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          msgLoadDataAPI.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            msgLoadDataAPI.messageId
          );
         
          msgLoadDataAPI.addData(
            getName(MessageEnum.RestAPIResponceErrorMessage),
            {
              errors: [{}],
            }
          );
          instance.addAddressApiCallId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
        then("editaddress will load editAddressApiCallId without errors", () => {
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
          
          instance.editAddressApiCallId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });
        then("editaddress will load editAddressApiCallId with errors", () => {
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
              errors: [{}],
            }
          );
          msgLoadDataAPI.addData(
            getName(MessageEnum.RestAPIResponceErrorMessage),
            {
              errors: [{}],
            }
          );
          instance.editAddressApiCallId = msgLoadDataAPI.messageId;
          runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        });

        

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(editAddressWrapper).toBeTruthy()
        });
    });

    test('User navigates to saved address', ({ given, when, then }) => {
      let savedAddressWrapper:ShallowWrapper;
      let instance:SavedAddress; 
  
      given('I am a User loading saved address', () => {
        savedAddressWrapper = shallow(<SavedAddress {...screenProps}/>)
      });
  
      when('I navigate to the saved address', () => {
           instance = savedAddressWrapper.instance() as SavedAddress
           instance.componentDidMount()
           instance.getToken()
           instance.getListRequest('345667')
           const  textInputData= [{
            name: "item.name",
            flat_no: "item.flat_no",
            address: "item.address",
            zip_code: "item.zip_code",
            phone_number: "item.phone_number",
            city: "item.city",
            state: "item.state",
            country: "item.country",
            
          }]
           instance.setState({isFetching:false,addressList:textInputData})
           const flatList = savedAddressWrapper.find(FlatList).first();
           flatList.prop("renderItem")({item: textInputData, index: 0, separators: {highlight: jest.fn(), unhighlight: jest.fn(), updateProps: jest.fn()}});
          //  let  formComponent = savedAddressWrapper.findWhere((node) => node.prop("testID") === "productdetail");
          //      formComponent.simulate("press");
          //      formComponent = savedAddressWrapper.findWhere((node) => node.prop("testID") === "editaddress");
          //      formComponent.simulate("press");
          //      formComponent = savedAddressWrapper.findWhere((node) => node.prop("testID") === "deleteaddress");
          //      formComponent.simulate("press");
          //      formComponent = savedAddressWrapper.findWhere((node) => node.prop("testID") === "updateaddress");
          //      formComponent.simulate("press");
      });

      then("saveaddress will deletemodal without errors", () => {
           instance.setState({showDeleteModal:true})
           let  formComponent = savedAddressWrapper.findWhere((node) => node.prop("testID") === "modalpresss");
                formComponent.simulate("press");
                formComponent = savedAddressWrapper.findWhere((node) => node.prop("testID") === "modalclosepresss");
                formComponent.simulate("press");
                formComponent = savedAddressWrapper.findWhere((node) => node.prop("testID") === "modalseleteadd");
                formComponent.simulate("press");
                
      });
      
      then("saveaddress will load deleteAddressApiCallId without errors", () => {
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
        instance.deleteAddressApiCallId = msgLoadDataAPI.messageId;
        runEngine.sendMessage("Unit Test", msgLoadDataAPI);
      });
      then("saveaddress will load deleteAddressApiCallId with errors", () => {
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
            errors: [{}],
          }
        );
        msgLoadDataAPI.addData(
          getName(MessageEnum.RestAPIResponceErrorMessage),
          {
            errors: [{}],
          }
        );
        instance.deleteAddressApiCallId = msgLoadDataAPI.messageId;
        runEngine.sendMessage("Unit Test", msgLoadDataAPI);
      });
      then("saveaddress will load getAddressListApiCallId without errors", () => {
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
        instance.getAddressListApiCallId = msgLoadDataAPI.messageId;
        instance.defaultAddressApiCallId = msgLoadDataAPI.messageId;
        runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        instance.getListRequest('123334')
      });
      then("saveaddress will load getAddressListApiCallId with errors", () => {
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
            errors: [{}],
          }
        );
        instance.getAddressListApiCallId = msgLoadDataAPI.messageId;
        instance.defaultAddressApiCallId = msgLoadDataAPI.messageId;
        runEngine.sendMessage("Unit Test", msgLoadDataAPI);
        const  textInputData= {
          name: "item.name",
          flat_no: "item.flat_no",
          address: "item.address",
          zip_code: "item.zip_code",
          phone_number: "item.phone_number",
          city: "item.city",
          state: "item.state",
          country: "item.country",
          is_default: true,
        }
        instance.updateAddressData(textInputData,true)
      });
      then("saveaddress will load getAddressListApiCallId with errorss", () => {
        const msgLoadDataAPI = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        msgLoadDataAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgLoadDataAPI.messageId
        );
    
        msgLoadDataAPI.addData(
          getName(MessageEnum.RestAPIResponceErrorMessage),
          {
            errors: [{}],
          }
        );
        instance.getAddressListApiCallId = msgLoadDataAPI.messageId;
        instance.defaultAddressApiCallId = msgLoadDataAPI.messageId;
        runEngine.sendMessage("Unit Test", msgLoadDataAPI);
      });
      
      then('saved address will without errors', () => {
          expect(savedAddressWrapper).toBeTruthy()
      });
  
      then('I can leave the screen with out errors', () => {
        instance.handleBackButtonClick()
          instance.componentWillUnmount()
          expect(savedAddressWrapper).toBeTruthy()
      });
    });

});
