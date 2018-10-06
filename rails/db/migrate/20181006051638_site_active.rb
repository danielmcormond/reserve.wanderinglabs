class SiteActive < ActiveRecord::Migration[5.1]
  def change
    add_column :sites, :active, :boolean, default: true, null: false
    add_index :sites, :active
  end
end
