class FacilityParent < ActiveRecord::Migration[5.1]
  def change
    add_column :facilities, :parent_name, :string
  end
end
