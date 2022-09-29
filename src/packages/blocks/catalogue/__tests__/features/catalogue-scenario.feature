Feature: Catalogue

    Scenario: User navigates to Catalogue
        Given I am a User loading Catalogue
        When I navigate to the Catalogue
        Then Catalogue will load with out errors
        Then Catalogue load TopHeader without errors
        Then Catalogue will pre-load data without errors
        Then Catalogue load products data without errors
        Then Catalogue load SortSelector without errors
        Then Catalogue load recommended data without errors
        Then Catalogue banner load without errors
        Then Catalogue load categories data without errors
        Then Catalogue load cart product data without errors
        Then Catalogue load cart list data without errors
        Then Catalogue add to wishlist without errors
        Then Catalogue remove from wishlist without errors
        Then Catalogue add to cart without errors
        Then Catalogue send device token without errors
        Then Catalogue notification without errors
        Then Catalogue remove from whishlist without errors
        Then Catalogue add to whishlist without errors
        Then Catalogue update to whishlist without errors
        Then Catalogue get filter product without errors
        Then Catalogue add cart without errors
        Then Catalogue add more item to cart without errors
        Then Catalogue get brandsetting without errors
        Then Catalogue get brandsetting with message
        Then Catalogue update item to cart without errors
        Then I can add item to wishlist
        Then I can navigate to subcategories
        Then I can select the detail button
        Then Catalogue load ProductBox without errors
        And I can leave the screen with out errors


 
