class FacilitySerializer < ActiveModel::Serializer
  attributes :id, :name, :agency_id, :type, :sub_name, :sites_details, :last_import, :last_scrape_attempt,
             :sites_count, :out_of_order, :out_of_order_reason
end
