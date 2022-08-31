Feature: shoppingcart

    Scenario: User navigates to shoppingcart
        Given I am a User loading shoppingcart
        When I navigate to the shoppingcart
        Then shoppingcart will load with out errors
        Then shoppingcart failed to load carts
        Then shoppingcart will refresh shipping address without errors
        Then shoppingcart failed to refresh shipping address
        Then shoppingcart will update cart quantity without errors
        Then shoppingcart failed to update cart quantity
        Then shoppingcart will delete cart item without errors
        Then shoppingcart failed to delete cart cart item
        Then shoppingcart will post wishlist without errors 
        Then shoppingcart failed to post wishlist
        Then shoppingcart will post apply coupon without errors
        Then shoppingcart failed to post apply coupon
        Then shoppingcart will delete coupon without errors
        Then shoppingcart failed to delete coupon
        Then shoppingcart will post buy now without errors
        Then shoppingcart failed to buy now
        Then I can select the button with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to checkout
        Given I am a User loading checkout
        When I navigate to the checkout
        Then checkout will add new address without errors
        Then checkout failed to add new address
        Then checkout will get user delivery address without errors
        Then checkout failed to get user delivery address
        Then checkout will update delivery address without errors
        Then checkout failed to update delivery address
        Then checkout will delete delivery address without errors
        Then checkout failed to delete delivery address
        Then checkout will calculate shipping address charge without errors
        Then checkout failed to calculate shipping address charge
        Then checkout will release shipping address charge without errors
        Then checkout failed to release shipping address charge
        Then checkout will get cart without errors
        Then checkout failed to get cart
        Then checkout will put update cart quantity
        Then checkout failed to put update cart quantity
        Then checkout will delete cart item
        Then checkout failed to delete cart item
        Then checkout will post wishlist
        Then checkout failed to post wishlist
        Then checkout will post apply coupon
        Then checkout failed to post apply coupon
        Then checkout will delete coupon
        Then checkout failed to delete coupon
        Then checkout will buy now without errors
        Then checkout failed to buy now
        Then checkout will update delivery address without errors
        Then checkout failed to update delivery address
        Then Show select address modal without errors
        Then I can select the button with out errors
        And I can leave the screen with out errors