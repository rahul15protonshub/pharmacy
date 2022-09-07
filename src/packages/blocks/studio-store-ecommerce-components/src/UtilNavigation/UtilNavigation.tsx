import { CommonActions } from '@react-navigation/native';
import StorageProvider from '../../../../framework/src/StorageProvider';

export const OnManageNavigation = (response: any, error: any, navigation: any) => {
    try {
        console.log(" response ", response)
        console.log(" error ", error)

        if (response?.errors[0]?.token == "Invalid token") {
            return true;
        } else {
            return false;

        }
        //        OG   response  {"errors": [{"token": "Invalid token"}]}
        //  LOG   error  undefined
        //  LOG   here all reponse  {"errors": [{"token": "Invalid token"}]}
        //  LOG   response  {"errors": [{"token": "Invalid token"}]}
        //  LOG   error  undefined
        //  LOG   response  {"errors": [{"token": "Invalid token"}]}
        //  LOG   error  undefined 

    } catch (exc) {
        // console.log(" error is ", exc);
    }
}

export const ChangeStackNow = async (navigation: any) => {
    try {

        //        OG   response  {"errors": [{"token": "Invalid token"}]}
        //  LOG   error  undefined
        //  LOG   here all reponse  {"errors": [{"token": "Invalid token"}]}
        //  LOG   response  {"errors": [{"token": "Invalid token"}]}
        //  LOG   error  undefined
        //  LOG   response  {"errors": [{"token": "Invalid token"}]}
        //  LOG   error  undefined 

        await StorageProvider.remove('GUEST_USER');
        await StorageProvider.remove('USER_ID');
        await StorageProvider.remove("Userdata")
        await StorageProvider.remove("SOCIAL_LOGIN_USER")
        navigation.replace('Auth');


 
    //     navigation.reset({
    //         index: 0,
    //         routes: [{ name: 'AuthNavigator' }]
    //    })

    } catch (exc) {
        // console.log(" error is ", exc);
    }
}