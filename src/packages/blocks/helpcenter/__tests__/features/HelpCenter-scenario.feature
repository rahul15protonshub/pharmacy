Feature: HelpCenter

    Scenario: User navigates to HelpCenter
        Given I am a User loading HelpCenter
        When I navigate to the HelpCenter
        Then HelpCenter will load with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to HelpCenterData
        Given I am a User loading HelpCenterData
        When I navigate to the HelpCenterData
        Then HelpCenterData will load with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to HelpCenter and press backbutton
        Given I am a User loading HelpCenter
        When I navigate to the HelpCenter and press backbutton
        Then The App will go back a screen