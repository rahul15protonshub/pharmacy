Feature: OTPConfirmAccount

    Scenario: User navigates to OTPConfirmAccount
        Given I am a User loading OTPConfirmAccount
        When I navigate to the OTPConfirmAccount
        Then OTPConfirmAccount will load with out errors
        Then OTPConfirmAccount will init values without errors
        Then submit form without errors
        Then I can select the button with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to SignUpConfirmComponent
        Given I am a User loading SignUpConfirmComponent
        When I navigate to the SignUpConfirmComponent
        Then SignUpConfirmComponent will load with out errors
        And Register email without errors
        And Failed to register email
        And Send OTP email without errors
        And Failed to send OTP email
        And Resend OTP email without errors
        And Failed to resend OTP email
        And I can leave the screen with out errors