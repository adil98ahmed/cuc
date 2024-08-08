Feature: User listing and search

  Scenario: verify that the user can search with valid username
    Given I login to website with "Admin" and "admin123"
    And I seacrh for username "Admin"
    Then I verify That table of users have "Admin"

  Scenario: verify that the user can search with valid username
    Given I login to website with "Admin" and "admin123"
    And I seacrh for username "ACVDER"
    Then I verify That "No Records Found" message is displayed

  Scenario Outline: verify that the user can search with user role
    Given I login to website with "Admin" and "admin123"
    And I seacrh for user with role "<role>"
    Then I verify That role section in users table have role "<role>"

    Examples:
      | role  |
      | Admin |
      | ESS   |

  Scenario: verify that the user can search by valid employee name
    Given I login to website with "Admin" and "admin123"
    And I search for user with employee name "a"
    Then I verify that employee name is displayed in table

  Scenario Outline: verify that the user can search by valid employee name
    Given I login to website with "Admin" and "admin123"
    And I search for user with status "<status>"
    Then I verify that "<status>" is displayed in table

    Examples:
      | status   |
      | Disabled |
      | Enabled  |
