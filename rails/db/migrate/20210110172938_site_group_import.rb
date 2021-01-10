class SiteGroupImport < ActiveRecord::Migration[5.2]
  def change
    add_column :site_groups, :active, :boolean, default: false, null: false
    add_column :site_groups, :last_scrape_attempt, :datetime
    add_column :site_groups, :last_import, :datetime
    add_column :site_groups, :last_import_hash, :string
  end
end
