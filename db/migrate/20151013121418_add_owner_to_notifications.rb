class AddOwnerToNotifications < ActiveRecord::Migration
  def change
    add_column :notifications, :owner, :integer
  end
end
