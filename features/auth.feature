Feature: Authentication
    In order to login
    A user
    Should input email and password

    Scenario: User uses login
      Given I am on the homepage
      And I fill in "email" with "aafuensalida@yahoo.com"
      And I fill in "password" with "password"
      When I press "login"
      Then page should have text "aafuensalida@yahoo.com"