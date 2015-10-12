class RelationshipsController < ApplicationController

  def index
    respond_with Relationship.all
  end

  def create
    user = User.find(params[:followed_id])
    current_user.follow(user)
    respond_with user
  end

  def destroy
    user = Relationship.find(params[:id]).followed
    current_user.unfollow(user)
    respond_with user
  end

end
