class Game < ApplicationRecord
  belongs_to :user
  belongs_to :opponent, class_name: 'User'

  validates :user_id, presence: true
  validates :opponent_id, presence: true

  has_many :points
  
end
