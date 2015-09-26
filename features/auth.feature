Feature: Authentication
  In order to Register
  A user
  Should fill up a form

  Scenario: Registering a new user
    Given I am on register
    And I fill in "email" with "ambetaf@gmail.com"
    And I fill in "username" with "Ambet Fuensalida"
    And I fill in "password" with "password"
    When I press "register"
    Then page should have text "Successfully registered"
    
  Scenario: Logging in
    Given I am on homepage
    And I fill in "email" with "aafuensalida@yahoo.com"
    And I fill in "password" with "password"
    When I press "login"
    Then page should have text "Ambet Fuensalida"

  