Feature: profilebio

    Scenario: User navigates to profilebio
        Given I am a User loading profilebio
        When I navigate to the profilebio
        Then Changepassword changePasswordApiCallId api without errors
        Then Changepassword changePasswordApiCallId api with errors
        Then Profile bio get userprofile api without errors
        Then Profile bio get userprofile api with errors
        Then Profile bio get cartHasProductAPICallID api without errors 
         Then Profile bio get updateProfileApiCallId api without errors 
         Then Profile bio get updateProfileNotificationDataSuccessCallBack api without errors 
          Then Profile bio get cartHasProductAPICallID api with errors 
         Then Profile bio get updateProfileApiCallId api with errors 
         Then Profile bio get updateProfileNotificationDataSuccessCallBack api with errors 
        Then profilebio will load with out errors
        Then  profilebio will load guest without errors
        And I can leave the screen with out errors

     Scenario: User navigates to editprofiles
        Given I am a User loading editprofile
        When I navigate to the editprofile
        Then Edit profile get userprofile api without errors
        Then Edit profile get userprofile api with errors
        Then Edit profile get updateProfileApiCallId api without errors
        Then Edit profile get updateProfileApiCallId api with errors
        Then editprofile will load with out errors
        And I can leave the screen with out errors

        