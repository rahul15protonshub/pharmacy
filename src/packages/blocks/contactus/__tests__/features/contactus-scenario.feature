Feature: contactus

    Scenario: User navigates to contactus
        Given I am a User loading contactus
        When I navigate to the contactus
        Then contactus will load with out errors
        Then contactus save without errors
        Then contactus get profile without errors
        And I can leave the screen with out errors

    Scenario: Empty fields
        Given I am a user attempting to add a contact
        When I am adding a contact with empty fields
        Then add contact should fail
    
    Scenario: Wrong email
        Given I am a user attempting to add a contact
        When I am adding a contact with wrong email
        Then add contact should fail

    Scenario: Wrong phone number
        Given I am a user attempting to add a contact
        When I am adding a contact with wrong phone number
        Then add text without error
        Then header press without error
        Then add contact should fail

    Scenario: Add contact with correct data
        Given I am a user attempting to add a contact
        When I am adding a contact with correct data
        Then add contact should succeed
        And Rest Api will return success response
    