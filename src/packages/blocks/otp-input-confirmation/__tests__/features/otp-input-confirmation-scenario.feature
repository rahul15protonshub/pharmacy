Feature: OTPInputAuth

    Scenario: User navigates to OTPInputAuth
        Given I am a User loading OTPInputAuth
        When I navigate to the OTPInputAuth
        Then OTPInputAuth will load buttons without errors
        Then OTPInputAuth will load with out errors
        Then OTPInputAuth verifyOtpApiCallId without errors
        Then OTPInputAuth verifyOtpApiCallId with errors
        Then OTPInputAuth sendOtpApiCallId without errors
        Then OTPInputAuth sendOtpApiCallId with errors
        Then OTPInputAuth  signupApiCallId without errors
        Then OTPInputAuth  signupApiCallId with errors
        And I can leave the screen with out errors