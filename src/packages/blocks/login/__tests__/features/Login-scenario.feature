Feature: Login

    Scenario: User navigates to Login
        Given I am a User loading Login
        When I navigate to the Login
        Then Login will load with out errors
        Then Login with email without errors
        Then Login send otp without errors
        Then Login with guest without errors
        Then Login with socail without errors
        Then I can press button without error
        And I can leave the screen with out errors