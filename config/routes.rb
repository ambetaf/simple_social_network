Rails.application.routes.draw do



  devise_for :users


  root to: 'application#angular'

  resources :profile, only: [:index]



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

  # get '*a' => 'application#angular'
end
