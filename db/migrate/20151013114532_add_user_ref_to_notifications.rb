class AddUserRefToNotifications < ActiveRecord::Migration
  def change
    add_reference :notifications, :user, index: true, foreign_key: true
  end
end
