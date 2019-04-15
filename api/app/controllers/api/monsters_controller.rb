module Api
    class MonstersController < ApplicationController
        def index
            monsters = Monster.select('id,name, sprite, number').order('number ASC')
            render json: { success: true, data: monsters }, status: :ok
        end

        def show
            monster = Monster.find(params[:id])
            render json: { success: true, data: monster }, status: :ok
        end

        def create
            puts monster_params

            monster = Monster.new(monster_params)

            if monster.save
                render json: { success: true, data: monster }, status: :created
            else
                render json: { success: false, error: monster.errors }, status: :unprocessable_entity
            end
        end

        def destroy
            monster = Monster.find(params[:id])
            if monster.destroy
                render json: { success: true }, status: :ok
            else
                render json: { success: false, error: monster.errors }, status: :unprocessable_entity
            end
        end

        def update
            monster = Monster.find(params[:id])
            if monster.update_attributes(monster_params)
                render json: { success: true, data: monster }, status: :ok
            else
                render json: { success: false, error: monster.errors }, status: :unprocessable_entity
            end
        end

        private

        def monster_params
            params.permit :name, :number, :sprite, :type_1, :type_2, :evolution_chain
        end
    end
end