Feature: Email Address Account Log In

    Scenario: User navigates to Email Log In
        Given I am a User attempting to Log In with a Email
        When I navigate to the Log In Screen
        Then Log In Screen will load with out errors
        And I can leave the screen with out errors