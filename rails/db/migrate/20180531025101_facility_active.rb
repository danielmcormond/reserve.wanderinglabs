class FacilityActive < ActiveRecord::Migration[5.1]
  def change
    add_column :facilities, :active, :boolean, default: false, null: false
  end
end
