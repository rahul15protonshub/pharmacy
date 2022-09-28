Feature: ProductDescription

    Scenario: User navigates to ProductDescription
        Given I am a User loading ProductDescription
        When I navigate to the ProductDescription
        Then ProductDescription will load  ProductBox  with out errors
        Then ProductDescription will load with out errors
        Then ProductDescription will load Prescriptionuploads with out errors
        And Load product description data without errors
        And Failed to Load product description data
        And Call notify product api without errors
        And Failed to call notify product api
        And Get buy product without errors
        And Failed to get buy product
        And Update Qty without errors
        And Update Qty with success
        And Failed to update qty
        And Add to cart without errors
        And Failed to add to cart
        And Add to wishlist without errors
        And Failed to add to wishlist
        And Remove from wishlist without errors
        And Failed to remove from wishlist
        And Get product id without errors
        And Failed to get product id
        And Get product description id without errors
        And Failed to get product description id
        Then Get product getCartId without errors
        Then Get product getCartId with errors
        Then productdescription will load putItemToCartApiCallId without errors
        Then productdescription will load putItemToCartApiCallId with errors
        Then productdesc will load increaseOrDecreaseCartQuantityApiCallId without errors
        Then productdesc will load increaseOrDecreaseCartQuantityApiCallId with errors
        And Render guest modal
        And Render view all components
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can upload prescription without errors
        And Failed to upload prescription
        And I can leave the screen with out errors

    Scenario: User navigates to ReviewList
        Given I am a User loading ReviewList
        When I navigate to the ReviewList
        Then ReviewList will load with out errors
        Then Preload and render ReviewList without errors
        Then Get review list without errors
        Then Failed to get review list
        Then Render review cell without errors
        Then I can leave the screen with out errors