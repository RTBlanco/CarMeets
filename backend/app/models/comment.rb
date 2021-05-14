class Comment < ApplicationRecord
  belongs_to :meet

  validates :owner, :content, presence: true
end
