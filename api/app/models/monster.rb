class Monster < ApplicationRecord
    validates :name, presence: true
    validates :number, presence: true
    validates :sprite, presence: true
    validates :type_1, presence: true
    # validates :type_2, presence: true
    # validates :evolution_chain, presence: true
    # serialize :evolution_chain, Array
end
