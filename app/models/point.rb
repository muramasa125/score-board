class Point < ApplicationRecord
  belongs_to :game
  belongs_to :server, class_name: 'User'
  belongs_to :point_user, class_name: 'User'
  belongs_to :kind
  belongs_to :service
  
  validates :game_id, presence: true
  validates :server_id, presence: true
  validates :point_user_id, presence: true
  validates :kind_id, presence: true
end
