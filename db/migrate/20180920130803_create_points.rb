class CreatePoints < ActiveRecord::Migration[5.0]
  def change
    create_table :points do |t|
      t.references :game, foreign_key: true
      t.references :server, foreign_key: { to_table: :users }
      t.references :point_user, foreign_key: { to_table: :users }
      t.references :kind, foreign_key: true
      t.references :service, foreign_key: true

      t.timestamps
    end
  end
end
