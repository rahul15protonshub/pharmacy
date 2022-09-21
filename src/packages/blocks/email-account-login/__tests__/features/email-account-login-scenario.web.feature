Feature: Email Address Account Log In

    Scenario: User navigates to Email Log In
        Given I am a User attempting to Log In with a Email
        When I navigate to the Log In Screen
        Then Log In Screen will load data with out errors
        Then Log In Screen will load with out errors
        Then Log In Screen verify email with out errors
        Then Log In Screen guest login with out errors
        Then Log In Screen login with out errors
        Then Log In Screen user skip login with out errors
        And I can leave the screen with out errors

      Scenario: user navigates to login screen
        Given I am a User attempting to Logscreen
        When I navigate to the Log In Screen
        Then Log In Screen will load data with out errors
        And I can leave the screen with out errors