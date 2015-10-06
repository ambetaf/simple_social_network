class ProfileController < ApplicationController
  def index
    respond_with Post.find(params[:user_id])
  end
end
