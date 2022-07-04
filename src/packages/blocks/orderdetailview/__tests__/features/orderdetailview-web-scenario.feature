Feature: orderdetailview

    Scenario: User navigates to orderdetailview
        Given I am a User loading orderdetailview
        When I navigate to the orderdetailview
        Then orderdetailview will load with out errors
        And orderdetailview render with correct variables
        And Load tracking details without errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors