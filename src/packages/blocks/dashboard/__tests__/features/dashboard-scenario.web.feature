Feature: dashboard

    Scenario: User navigates to dashboard
        Given I am a User loading dashboard
        When I navigate to the dashboard
        Then dashboard will load with out errors
        Then dashboard will load dashboard data with out errors
        And Dashboard will display messages
        And Dashboard will display notifcation if no messages
        And Dashboard will display notifcation if API failure
        And I can leave the screen with out errors

    Scenario: User navigates to productDetails
        Given I am a User loading productDetails
        When I navigate to the productDetails
        Then productDetails will load with out errors
        And productDetails will display messages
        And productDetails will display notifcation if no messages
        And productDetails will display notifcation if API failure
        And I can leave the screen with out errors