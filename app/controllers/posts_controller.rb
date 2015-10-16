class PostsController < ApplicationController

  before_filter :authenticate_user!, only: [:create, :upvote, :downvote]

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


  def upvote
    post = Post.find(params[:id])
    post.upvote_by current_user
    post.increment!(:likes)
    respond_with post
  end

  def downvote
    post = Post.find(params[:id])
    post.unvote_by current_user
    post.decrement!(:likes)
    respond_with post
  end

  # def userLikedPosts
  #   sql = "SELECT * from votes where voter_id = :user_id && votable_type = Posts"
  #   result = ActiveRecord::Base.connection.execute(sql)
  #   # result.to_a
  #   respond_with result
  # end

  def likedPost
    respond_with current_user.get_up_voted Post
  end

  private
  def post_params
    params.require(:post).permit(:link, :title)
  end

end
