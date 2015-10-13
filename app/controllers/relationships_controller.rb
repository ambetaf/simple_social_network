class RelationshipsController < ApplicationController

  def index
    respond_with Relationship.all
  end

  def create
    respond_with Relationship.create(relationship_params.merge(follower_id: current_user.id))
    # user = User.find(params[:followed_id])
    # current_user.follow(user)
    # respond_with user
  end

  def destroy
    respond_with user
  end

  private
  def relationship_params
    params.require(:relationship).permit(:follower_id, :followed_id)
  end
end
