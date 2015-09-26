require File.expand_path(File.join(File.dirname(__FILE__), "..", "support", "paths"))
Given /^I am on homepage/ do |home|
  visit path_to(home)
end

Given /^I am on (.+)$/ do |page_name|
  visit path_to(page_name)
end

When /^I go to (.+)$/ do |register|
  visit path_to(register)
end

When /^I press "(register)"$/ do |register|
  click_button(register)
end

When /^I fill in "([^\"]*)" with "([^\"]*)"$/ do |field, value|
  fill_in(field.gsub(' ', '_'), :with => value)
end

When /^I press "([^\"]*)"$/ do |button|
  click_button(button)
end

Then /^page should have text "([^\"]*)"$/ do |type, text|
  page.has_css?("p.#{type}", :text => text, :visible => true)
end