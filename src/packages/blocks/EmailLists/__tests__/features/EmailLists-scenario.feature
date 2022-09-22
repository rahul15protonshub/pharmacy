Feature: EmailLists

    Scenario: User navigates to EmailLists
        Given I am a User loading EmailLists
        When I navigate to the EmailLists
        Then EmailLists will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can select the touchablefeedback with out errors
        And I can leave the screen with out errors