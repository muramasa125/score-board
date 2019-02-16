class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.references :user, foreign_key: true
      t.references :opponent, foreign_key: { to_table: :users }

      t.timestamps
      
      t.index [:user_id, :opponent_id]
    end
  end
end
