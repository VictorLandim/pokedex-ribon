class ApplicationController < ActionController::API
    rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

    def resource_not_found
        render plain: "Not Found", status: :not_found
    end

    def record_not_found e
        render json: { success: false, error: e }, status: :not_found
    end
end
