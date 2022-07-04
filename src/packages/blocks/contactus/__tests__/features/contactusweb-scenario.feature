Feature: contactusweb

    Scenario: User navigates to contactus
        Given I am a User loading contactus
        When I navigate to the contactus
        Then contactus will load with out errors
        And I can leave the screen with out errors

    Scenario: Formik test with change, submit
        Given I am a user attempting to add a contact
        When load contactus with blank data
        Then submit form without errors

    Scenario: User navigates to aboutusblock
        Given I am a User loading aboutusblock
        When I navigate to the aboutusblock
        Then aboutusblock will load with out errors
        Then I can leave the screen with out errors
