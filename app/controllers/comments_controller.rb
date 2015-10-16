class CommentsController < ApplicationController

  before_filter :authenticate_user!, only: [:create, :like, :upvote, :downvote]

  def create
    post = Post.find(params[:post_id])
    comment = post.comments.create(comment_params.merge(user_id: current_user.id))
    respond_with post, comment
  end

  # def like
  #   post = Post.find(params[:post_id])
  #   comment = post.comments.find(params[:id])
  #   comment.increment!(:likes)
  #
  #   respond_with post, comment
  # end

  def upvote
    post = Post.find(params[:post_id])
    comment = post.comments.find(params[:id])
    comment.upvote_by current_user
    comment.increment!(:likes)
    respond_with post, comment
  end

  def downvote
    post = Post.find(params[:post_id])
    comment = post.comments.find(params[:id])
    comment.unvote_by current_user
    comment.decrement!(:likes)
    respond_with post, comment
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end

end
