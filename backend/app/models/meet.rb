class Meet < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_many :comments, dependent: :destroy

  has_one_attached :image

  def get_image_url
    url_for(self.image)
  end

  def serialize
    {id: self.id, owner: self.owner, location: self.location, title: self.title, secret_code: self.secret_code, comments: self.comments, image: self.get_image_url }
  end
end
