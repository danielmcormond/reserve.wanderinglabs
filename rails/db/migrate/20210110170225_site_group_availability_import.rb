class SiteGroupAvailabilityImport < ActiveRecord::Migration[5.2]
  def change
    add_column :availability_imports, :site_group_id, :integer, null: true
  end
end
