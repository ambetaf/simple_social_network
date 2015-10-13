class NotificationsController < ApplicationController

  def index
    respond_with Notification.where(owner: current_user.id)
  end

  def create
    respond_with Notification.create(post_params.merge(user_id: current_user.id))
  end

  private
  def post_params
    params.require(:notification).permit(:owner, :content, :link)
  end

end
