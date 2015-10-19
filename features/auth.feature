Feature: Authentication
  In order for a User to login
  A User
  Should fill up forms

  Scenario: Registering a new user
    Given I am on register
    And I fill in the following:
      |email|ambetaf@gmail.com|
      |username|Ambet Fuensalida|
      |password|password|
    When I press "submit"
    Then page should have text "Ambet"

  Scenario: Registering with existing username
    Given I am on register
    And I fill in the following:
      |email|ambetaf@gmail.com|
      |username|Ambet Fuensalida|
      |password|password12|
    When I press "submit"
    Then page should have text "Error registering user!!"

  Scenario: Registering with password less than 6 characters
    Given I am on register
    And I fill in the following:
      |email|ambetaf@gmail1.com|
      |username|Ambet Fuensalida Jr|
      |password|pas|
    When I press "submit"
    Then page should have text "Error registering user!!"

  Scenario: Logging in
    Given I'm logged in as Ambet
    Then page should have text "Ambet"

  Scenario: Logging out
    Given I'm logged in as Ambet
    And I press "logout"
    Then page should have text "Log In"


  Scenario: Logging in with wrong credentials
    Given I am on login
    And I fill in the following:
      |email|ambetaf@gmail.com|
      |password|wrongpassword|
    When I press "submit"
    Then page should have text "Error logging in user!!"

  