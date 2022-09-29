Feature: shoppingcart

    Scenario: User navigates to shoppingcart
        Given I am a User loading shoppingcart
        When I navigate to the shoppingcart
        Then shoppingcart will press buttons without errors
        Then shoppingcart will load with out errors
        Then shoppingcart will post wishlist without errors 
        Then shoppingcart failed to post wishlist
        Then shoppingcart will post apply coupon without errors
        Then shoppingcart failed to post apply coupon
        Then shoppingcart will post delete coupon without errors
        Then shoppingcart failed to post delete coupon
        And I can leave the screen with out errors

    Scenario: User navigates to checkout
        Given I am a User loading checkout
        When I navigate to the checkout
        Then checkout will load headers with out errors
        Then checkout will load buttons with out errors
        Then checkout will load with out errors
        And I can add billing address without errors
        And I can add shipping address without errors
        And I can leave the screen with out errors
    
    Scenario: User navigates to editaddress
        Given I am a User loading editaddress
        When I navigate to the editaddress
        Then editAddress will load headers with out errors
        Then editaddress will load buttons with out errors
        Then editaddress will load with out errors
        Then editaddress will load stateslist without errors
        Then editaddress will load stateslist with errors
        Then editaddress will load addAddressApiCallId without errors
        Then editaddress will load addAddressApiCallId with errors 
        And I can leave the screen with out errors

    Scenario: User navigates to saved address
        Given I am a User loading saved address
        When I navigate to the saved address
        Then saveaddress will load deleteAddressApiCallId without errors
        Then saveaddress will load deleteAddressApiCallId with errors
        Then saved address will without errors
        Then I can leave the screen with out errors
