class RelationshipsController < ApplicationController

  def index
    respond_with Relationship.where(follower_id: current_user.id)
  end

  def create
    respond_with Relationship.create(relationship_params.merge(follower_id: current_user.id))
    # user = User.find(params[:followed_id])
    # current_user.follow(user)
    # respond_with user
  end

  def destroy
    respond_with Relationship.find_by_followed_id_and_follower_id(params[:id], current_user.id).destroy
  end

  # def unfollow
  #   sql = "SELECT * from relationships"
  #   result = ActiveRecord::Base.connection.execute(sql)
  #   # result.to_a
  #   respond_with result
  # end

  private
  def relationship_params
    params.require(:relationship).permit(:follower_id, :followed_id)
  end
end
