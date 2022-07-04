Feature: notifications

    Scenario: User navigates to notifications
        Given I am a User loading notifications
        When I navigate to the notifications
        Then notifications will load with out errors
        And notifications will load notification list without errors
        And notifications will read notification without errors
        And notifications will delete notification without errors
        And notifications will read single notification without errors
        And notifications will delete single notification without errors
        And Set different states to render different views
        And I can select the button with out errors
        And Show delete notification confirm modal without errors
        And I can leave the screen with out errors