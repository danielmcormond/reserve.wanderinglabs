class AvailabilityRequestImport < ActiveRecord::Migration[5.1]
  def change
    add_column :availability_requests, :import_details, :jsonb, default: {}
    add_column :availability_requests, :imported, :boolean, default: false, null: false
  end
end
