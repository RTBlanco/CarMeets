class AddSecretCodeToMeet < ActiveRecord::Migration[6.1]
  def change
    add_column :meets, :secret_code, :string
  end
end
