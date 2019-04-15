Rails.application.routes.draw do
    namespace 'api' do
        resources :monsters
    end

    root to: "application#resource_not_found"
    get '*path', to: "application#resource_not_found"
    post '*path', to: "application#resource_not_found"
    delete '*path', to: "application#resource_not_found"
    put '*path', to: "application#resource_not_found"
    patch '*path', to: "application#resource_not_found"
end
