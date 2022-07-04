Feature: Wishlist web

    Scenario: User navigates to Wishlist
        Given I am a User loading Wishlist
        When I navigate to the Wishlist
        Then Wishlist will load with out errors
        And Add to wishlist without errors
        And Failed to add wishlist
        And Delete item without errors
        And Failed to delete item
        And Get is cart created without errors
        And Failed to get is cart created
        And Post create cart without errors
        And Failed to post create cart
        And Put item to the cart without errors
        And Failed to put item to the cart
        And I can select the button with out errors
        And Set proper states and render successfully
        And I can leave the screen with out errors
      
    Scenario: User navigates to NoWishList
        Given I am a User loading NoWishList
        When I navigate to the NoWishList  
        Then NoWishList will load with out errors
        And I can select the button with out errors
        And I can leave the screen with out errors
    