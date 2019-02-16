# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180920130803) do

  create_table "games", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.integer  "opponent_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["opponent_id"], name: "index_games_on_opponent_id", using: :btree
    t.index ["user_id", "opponent_id"], name: "index_games_on_user_id_and_opponent_id", using: :btree
    t.index ["user_id"], name: "index_games_on_user_id", using: :btree
  end

  create_table "kinds", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "points", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "game_id"
    t.integer  "server_id"
    t.integer  "point_user_id"
    t.integer  "kind_id"
    t.integer  "service_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["game_id"], name: "index_points_on_game_id", using: :btree
    t.index ["kind_id"], name: "index_points_on_kind_id", using: :btree
    t.index ["point_user_id"], name: "index_points_on_point_user_id", using: :btree
    t.index ["server_id"], name: "index_points_on_server_id", using: :btree
    t.index ["service_id"], name: "index_points_on_service_id", using: :btree
  end

  create_table "services", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "games", "users"
  add_foreign_key "games", "users", column: "opponent_id"
  add_foreign_key "points", "games"
  add_foreign_key "points", "kinds"
  add_foreign_key "points", "services"
  add_foreign_key "points", "users", column: "point_user_id"
  add_foreign_key "points", "users", column: "server_id"
end
