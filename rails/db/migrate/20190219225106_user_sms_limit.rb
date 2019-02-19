class UserSmsLimit < ActiveRecord::Migration[5.1]
  def change
    change_column :users, :sms_limit, :integer, default: 250
  end
end
