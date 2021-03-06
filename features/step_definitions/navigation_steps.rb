
Given /^I am on homepage/ do |home|
  visit('/#/' + home)
end

Given /^I am on (.+)$/ do |page_name|
  visit('/#/' + page_name)
end

When /^I go to (.+)$/ do |page_name|
  visit('/#/' + page_name)
end


When /^I fill in "([^\"]*)" with "([^\"]*)"$/ do |field, value|
  fill_in(field.gsub(' ', '_'), :with => value)
end

When /^I press "([^\"]*)"$/ do |button|
  click_button(button)
end

When /^I click link to "([^\"]*)"$/ do |link|
  click_link(link)
end

Then /^page should have text "([^\"]*)"$/ do |text|
  page.should have_content(text)
end

Then /^page should have no text "([^\"]*)"$/ do |text|
  page.should have_no_content(text)
end


When /^I click "([^\"]*)"$/ do |link|
  click_link(link)
end

Given /^I'm logged in as Ambet/ do
  visit('/#/login')
  fill_in 'email', :with => 'ambetaf@gmail.com'
  fill_in 'password', :with => 'password'
  click_button('submit')
end

Given /^I'm logged in as Follower/ do
  visit('/#/login')
  fill_in 'email', :with => 'follower@gmail.com'
  fill_in 'password', :with => 'password'
  click_button('submit')
end


When /^I fill in "([^\"]*)" for "([^\"]*)"$/ do |value, field|
  fill_in(field.gsub(' ', '_'), :with => value)
end

When /^I fill in the following:$/ do |fields|
  fields.rows_hash.each do |name, value|
    When %{I fill in "#{name}" with "#{value}"}
  end
end

Then /^the "([^\"]*)" field should contain "([^\"]*)"$/ do |field, value|
  find_field(field).value.should =~ /#{value}/
end

Then /^the "([^\"]*)" field should not contain "([^\"]*)"$/ do |field, value|
  find_field(field).value.should_not =~ /#{value}/
end

Then /^I should be on (.+)$/ do |page_name|
  current_path.should == path_to(page_name)
end

Then /^page should have (.+) message "([^\"]*)"$/ do |type, text|
  page.has_css?("p.#{type}", :text => text, :visible => true)
end