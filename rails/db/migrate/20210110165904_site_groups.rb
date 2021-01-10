class SiteGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :site_groups do |t|
      t.references :facility, foreign_key: true
      t.string "name"
      t.string "ext_id"
      t.jsonb "details"
      t.timestamps
    end

    add_column :sites, :site_group_id, :integer, null: true
  end
end
