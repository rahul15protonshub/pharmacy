Feature: search

    Scenario: User navigates to search
        Given I am a User loading search
        When I navigate to the search
        Then search will load with out errors
        Then Search searchProductId without error
        Then Search getCategoryListId without error
        Then Search saveSearchId without error
        Then Search apiRequestCallId without error
        Then Search apiRequestCallId with error
        And I can leave the screen with out errors