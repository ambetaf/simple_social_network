class PostsController < ApplicationController

  before_filter :authenticate_user!, only: [:create, :like]

  def index
    following_ids = "SELECT followed_id FROM relationships
                     WHERE  follower_id = :user_id"
    respond_with Post.where("user_id IN (#{following_ids})
                     OR user_id = :user_id", user_id: current_user.id)
  end



  def create
    respond_with Post.create(post_params.merge(user_id: current_user.id))
  end


  def show
    respond_with Post.find(params[:id])
  end



  def like
    post = Post.find(params[:id])
    post.increment!(:likes)

    respond_with post
  end

  private
  def post_params
    params.require(:post).permit(:link, :title)
  end

end
