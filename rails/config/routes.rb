Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post   '/sign-in'       => 'sessions#create'
  delete '/sign-out'      => 'sessions#destroy'

  resource :sessions
  resource :login_tokens, only: %i[create]
  resource :users
  resources :payments, only: %i[create]
  resources :notification_methods, only: %i[create destroy] do
    member do
      post :test_notification
    end
  end

  resources :availability_imports
  resources :availability_requests do
    resources :availability_matches, only: %i[index] do
      collection do
        get :calendar
      end
    end
    resources :availability_notifications, only: %i[index]
    resources :sites, only: %i[index]
    collection do
      get :inactive
      post :sites_count
    end
  end

  resources :availability_matches, only: [] do
    member do
      post :click
    end
  end

  resources :agencies, only: %i[index]

  resources :facilities, only: %i[index show] do
    collection do
      get :active
      get :overdue
    end
    resources :availabilities do
      collection do
        post :import
        post :calendar
      end
    end
    resources :sites, only: %i[index]
  end

  resources :sites, only: %i[show]

  namespace :admin do
    get '/availability_requests', to: 'availability_requests#index'
  end
end
