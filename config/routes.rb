Rails.application.routes.draw do



  devise_for :users


  root to: 'application#angular'


  resources :users, only: [:index, :show]

  resources :posts, only: [:create, :index, :show] do
    resources :comments, only: [:show, :create] do
      member do
        put '/like' => 'comments#like'
      end
    end
    member do
      put '/like' => 'posts#like'
    end
  end

  post '/users/follow' => 'relationships#create'

  resources :relationships, only: [:index, :create, :destroy]

  resources :notifications, only: [:create, :index, :show]
  # get '*a' => 'application#angular'
end
