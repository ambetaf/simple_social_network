class NotificationsController < ApplicationController

  def index
    respond_with Notification.all
  end

  def create
    respond_with Notification.create(post_params.merge(user_id: current_user.id))
  end

end
