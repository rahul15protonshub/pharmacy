Feature: ordermanagement

    Scenario: User navigates to ordermanagement
        Given I am a User loading ordermanagement
        When I navigate to the ordermanagement
        Then ordermangement will mount and preload data
        Then ordermangement will order data with out errors
        
        And I can leave the screen with out errors

    Scenario: User navigates to product rating
            Given I am a User loading product rating
            When I navigate to the product rating
            Then product rating will mount and preload data
            And I can leave the screen with out errors

    Scenario: User navigates to no order found
        Given I am a User loading no order found
        When I navigate to the no order found
        Then no order found will mount and preload data
        And I can leave the screen with out errors