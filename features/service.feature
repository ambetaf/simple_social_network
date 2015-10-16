Feature: Services
  In order for a User to use the site
  A User must fill up forms to register

  Scenario: Posting
    Given I'm logged in as Ambet
    And I fill in "post" with "test1 post1"
    And I press "submit"
    Then page should have text "test1 post1"

  Scenario: Following
    Given I am on register
    And I fill in the following:
      |email|follower@gmail.com|
      |username|Follower Follows|
      |password|password|
    And I press "submit"
    And I go to users
    And I press "follow"
    When I go to home
    Then page should have text "Ambet"

  Scenario: Notifications
    Given I'm logged in as Ambet
    And I go to notifications
    Then page should have text "followed"

  Scenario: Liking a post
    Given I'm logged in as Follower
    And I press "like"
    Then page should have text "1"

  Scenario: Checking notification for likes
    Given I'm logged in as Ambet
    And I go to notifications
    Then page should have text "liked your post"

  Scenario: Unliking a post
    Given I'm logged in as Follower
    And I press "unlike"
    Then page should have text "0"

  Scenario: Commenting on a post
    Given I'm logged in as Follower
    And I click link to "comments"
    And I fill in "comment" with "test1 comment1"
    And I press "submit"
    Then page should have text "test1 comment1"

  Scenario: Checking notification for comments
    Given I'm logged in as Ambet
    And I go to notifications
    Then page should have text "commented"

  Scenario: Liking a comment
    Given I'm logged in as Follower
    And I click link to "comments"
    And I press "like"
    Then page should have text "1"

  Scenario: Checking notification for liked comments
    Given I'm logged in as Ambet
    And I go to notifications
    Then page should have text "liked"

  Scenario: Unliking a comment
    Given I'm logged in as Follower
    And I click link to "comments"
    And I press "unlike"
    Then page should have text "0"

  Scenario: Unfollowing
   Given I'm logged in as Follower
    And I go to users
    And I press "unfollow"
    When I go to home
    Then page should have no text "Ambet"


