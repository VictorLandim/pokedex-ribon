Rails.application.routes.draw do
    namespace 'api' do
        resources :monsters
    end
end
