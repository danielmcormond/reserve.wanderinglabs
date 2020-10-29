class FacilityOutOfOrder < ActiveRecord::Migration[5.2]
  def change
    add_column :facilities, :out_of_order, :boolean, default: false, null: false
    add_column :facilities, :out_of_order_reason, :text
    add_column :facilities, :out_of_order_date, :date
  end
end
