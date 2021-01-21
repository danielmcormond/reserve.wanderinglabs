class AgencyActive < ActiveRecord::Migration[5.2]
  def change
    add_column :agencies, :active, :boolean, default: false, null: false
    add_column :agencies, :active_request_count, :integer, default: 0, null: false
  end
end
