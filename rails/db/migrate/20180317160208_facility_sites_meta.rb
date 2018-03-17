class FacilitySitesMeta < ActiveRecord::Migration[5.1]
  def change
    add_column :facilities, :sites_details, :jsonb, {}
  end
end
