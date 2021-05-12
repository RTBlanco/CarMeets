class AddTimeAndDateToMeets < ActiveRecord::Migration[6.1]
  def change
    add_column :meets, :date_time, :string
  end
end
