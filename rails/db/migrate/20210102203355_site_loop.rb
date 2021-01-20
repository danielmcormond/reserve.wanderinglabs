class SiteLoop < ActiveRecord::Migration[5.2]
  def change
    add_column :sites, :loop, :string
  end
end
