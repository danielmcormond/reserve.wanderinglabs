class AvailabilityIndex < ActiveRecord::Migration[5.1]
  def change
    add_index :availabilities, [:site_id, :avail_date], name: 'availabilities_site_id_avail_date'
  end
end
