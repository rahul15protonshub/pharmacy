Feature: filteritems

    Scenario: User navigates to filteritems
        Given I am a User loading filteritems
        When I navigate to the filteritems
        Then filteritems will load with out errors
        Then filteritems will load filterData with out errors
        And filteritems will load products without errors
        And filteritems failed load products
        And filteritems will filter data without errors
        And filteritems will add to wishlist without errors
        And filteritems will remove from wishlist without errors
        And filteritems will get products with id without errors
        And filteritems will add to cart without errors
        And filterItem will update product quantity without errors
        And filteritems will check has product without errors
        And filteritems put item into cart without errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to filteroptions
        Given I am a User loading filteroptions
        When I navigate to the filteroptions
        Then filteroptions will load with out errors
        And filteroptions will get category without errors
        And filteroptions will get brand without errors
        And filteroptions will apply all without errors
        And filteroptions will get tags without errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to filteroptionslist
        Given I am a User loading filteroptionslist
        When I navigate to the filteroptionslist
        Then filteroptionslist will load with out errors
        And filteroptionslist will get product details without errors
        And filteroptionslist will get category without errors
        And filteroptionslist will get brand without errors
        And filteroptionslist will get tags without errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

      Scenario: User navigates to filterProduct
        Given I am a User loading filterProduct
        When I navigate to the filterProduct
        Then filterProduct will load with out errors
        Then filterProduct will get product without errors
        And filterProduct will get filter product
        And filterProduct will add to wishlist without errors
        And filterProduct will remove from wishlist without errors
        And filterProduct will get products id without errors
        And I can select the button with with out errors
        And I can leave the screen with out errors