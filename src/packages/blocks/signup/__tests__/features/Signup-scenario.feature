Feature: Signup

    Scenario: User navigates to Signup
        Given I am a User loading Signup
        When I navigate to the Signup
        Then Signup will load sendOtpApiCallId without errors
        Then Signup will load sendOtpApiCallId with errors
        Then Signup will load apiSocialLoginCallId without errors
        Then Signup will load apiSocialLoginCallId with errors
        Then Signup will load apiGuestLoginCallId without errors
        Then Signup will load apiGuestLoginCallId with errors 
        Then Signup will load getHelpCenterApiCallId without errors
        Then Signup will load getHelpCenterApiCallId with errors 
        Then Signup will load  inputs without errors
        Then Signup will load with out errors
        And I can leave the screen with out errors