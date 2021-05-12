class DeleteTimeAndDateFromMeets < ActiveRecord::Migration[6.1]
  def change
    remove_column :meets, :date
    remove_column :meets, :time
  end
end
