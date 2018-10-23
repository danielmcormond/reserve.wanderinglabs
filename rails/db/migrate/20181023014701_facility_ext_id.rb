class FacilityExtId < ActiveRecord::Migration[5.1]
  def change
    add_column :facilities, :ext_facility_id, :string
  end
end
