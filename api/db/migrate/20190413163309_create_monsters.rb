class CreateMonsters < ActiveRecord::Migration[5.2]
  def change
    create_table :monsters do |t|
      t.string :name
      t.integer :number
      t.string :sprite
      t.string :type_1
      t.string :type_2
      t.string :evolution_chain

      t.timestamps
    end
  end
end
