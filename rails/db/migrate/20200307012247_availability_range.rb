class AvailabilityRange < ActiveRecord::Migration[5.1]
  def change
    add_column :availabilities, :avail_at, :tsrange, null: false

    execute %{
      ALTER TABLE availabilities
      ADD CONSTRAINT constraint_site_id_avail
      EXCLUDE USING gist
        (site_id WITH =, avail_at with &&);
    }.squish
  end
end
