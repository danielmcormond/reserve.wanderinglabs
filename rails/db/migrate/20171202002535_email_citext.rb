class EmailCitext < ActiveRecord::Migration[5.1]
  def change
    enable_extension :citext
    change_column :users, :email, :citext
    add_index :users, :email, unique: true
  end
end
