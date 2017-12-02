class AdaSites < ActiveRecord::Migration[5.1]
  def change
    add_column :sites, :ada, :boolean, default: false, null: false
    add_column :availability_requests, :ignore_ada, :boolean, default: false, null: false
  end
end
