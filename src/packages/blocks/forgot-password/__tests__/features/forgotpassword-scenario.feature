Feature: forgotpassword

    Scenario: User navigates to forgotpassword
        Given I am a User loading forgotpassword
        When I navigate to the forgotpassword
        Then forgotpassword will load with out errors
        Then forgotpassword will get validation without errors
        Then forgotpassword will requestEmailOtpCallId without errors
        Then forgotpassword will apiGuestLoginCallId without errors
        Then forgotpassword will verifyOtpApiCallId without errors
         Then I can change text without error
        And I can leave the screen with out errors
       

    Scenario: User navigates to newpassword
        Given I am a User loading newpassword
        When I navigate to the newpassword
        Then newpassword will load with out errors
        Then newpassword will get validation without errors
        Then newpassword will resetPasswordApiCallIdwithout errors
        And I can leave the screen with out errors