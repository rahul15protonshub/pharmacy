Feature: orderdetailview

    Scenario: User navigates to orderdetailview
        Given I am a User loading orderdetailview
        When I navigate to the orderdetailview
        Then orderdetailview will load with out errors
        And Load logistics and tracking data without errors
        And Load track id details without errors
        And Create cart without errors
        And Submit order review without errors
        And Load cart that has products without errors
        And Cancel order without errors
        And Get subscription orders without errors
        And Extend delivery without errors
        And Failed to Load logistics and tracking data
        And Failed to Load track id details
        And Failed to Create cart
        And Failed to Submit order review
        And Failed to Load cart that has products
        And Failed to Cancel order
        And Failed to Get subscription orders
        And Failed to Extend delivery
        And I can enter text with out errors
        And I can select the button with with out errors
        And Render view with different states with out errors
        And I can leave the screen with out errors

      Scenario: User navigates to subscriptionorderlist
        Given I am a User loading subscriptionorderlist
        When I navigate to the subscriptionorderlist
        Then subscriptionorderlist will load with out errors
        Then Load subscription data without errors
        Then Extend deleviry without errors
        And I can leave the screen with out errors   