Feature: Delete user

Scenario: verify that the user can delete user
    Given I create temp user with data from "JsonNeededForDeleteUser.json"
    And I login with invalid cred "Admin" and "admin123"
    And I seacrh for username with created username
    And I delete created user
    And I verify that the user is deleted
    

