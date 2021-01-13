class SiteGroupCounterCache < ActiveRecord::Migration[5.2]
  def change
    add_column :facilities, :site_groups_count, :integer, default: 0, null: false
  end
end
