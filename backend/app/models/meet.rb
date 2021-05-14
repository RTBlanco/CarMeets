class Meet < ApplicationRecord
  has_many :comments, dependent: :destroy
end
