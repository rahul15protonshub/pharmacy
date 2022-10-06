Feature: Wishlist

    Scenario: User navigates to Wishlist
        Given I am a User loading Wishlist
        When I navigate to the Wishlist
        Then wishlist render nodata without error
        Then wishlist getWishlistApiCallId without error
        Then wishlist removeFromWishlistApiCallId without error
        Then wishlist addToCartApiCallId without error
        Then wishlist getCartListId without error
        Then wishlist getCartProductId without error
        Then Wishlist will load with out errors    
        And I can leave the screen with out errors