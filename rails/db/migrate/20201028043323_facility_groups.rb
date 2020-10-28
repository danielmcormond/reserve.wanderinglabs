class FacilityGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :facility_groups do |t|
      t.references :agency, foreign_key: true
      t.string "name"
      t.jsonb "details"
      t.timestamps
    end

    add_column :facilities, :facility_group_id, :integer, null: true
  end
end
