class UserTxtLimit < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :sms_limit, :integer, default: 25
  end
end
