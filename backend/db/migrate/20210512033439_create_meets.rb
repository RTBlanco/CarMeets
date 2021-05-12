class CreateMeets < ActiveRecord::Migration[6.1]
  def change
    create_table :meets do |t|
      t.string :time
      t.string :date
      t.string :location
      t.string :title
      t.string :image
      t.string :owner

      t.timestamps
    end
  end
end
