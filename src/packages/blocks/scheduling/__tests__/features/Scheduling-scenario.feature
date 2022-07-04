Feature: Scheduling

    Scenario: User navigates to Scheduling
        Given I am a User loading Scheduling
        When I navigate to the Scheduling
        Then Scheduling will load with out errors
        Then I can select the add to cart button with out errors
        Then I can select the buy now button with out errors
        And I can leave the screen with out errors