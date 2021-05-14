class Meet < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_many :comments, dependent: :destroy

  validates :title, :location, :secret_code, :image, :owner, :date_time, presence: true
  has_one_attached :image

  def get_image_url
    url_for(self.image)
  end

  def serialize
    {id: self.id, owner: self.owner, location: self.location, title: self.title, secret_code: self.secret_code, date_time: self.date_time, comments: self.comments, image: self.get_image_url }
  end
end
