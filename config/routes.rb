Rails.application.routes.draw do



  devise_for :users


  root to: 'application#angular'


  resources :users, only: [:index, :show]

  resources :posts, only: [:create, :index, :show] do
    resources :comments, only: [:show, :create] do
      member do
        put "like", to: "comments#upvote"
        put "dislike", to: "comments#downvote"
      end
    end
    member do
      put "like", to: "posts#upvote"
      put "dislike", to: "posts#downvote"
    end
  end




  resources :relationships, only: [:create, :destroy, :index]

  get 'posts/liked' => 'posts#likedPosts'

  resources :notifications, only: [:create, :index, :show]
  # get '*a' => 'application#angular'
end
