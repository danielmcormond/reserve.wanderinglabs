class SiteLayout < ActiveRecord::Migration[5.1]
  def change
    add_column :sites, :site_layout, :string
  end
end
