Rails.application.routes.draw do
  resources :subscribers, only: %i[index create update]
end
