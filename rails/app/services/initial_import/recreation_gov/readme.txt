InitialImport::RecreationGov::Facilities.perform

InitialImport::RecreationGov::Sites.new(facility).import

InitialImport::RecreationGov::BookingWindow.new(facility).find



ActiveRecord::Base.logger.level = 1

Facility.where(sites_count: 0).each_with_index do |facility, x|
  puts "#{x} Facility: #{facility.id} - #{facility.name}"
  begin
    InitialImport::RecreationGov::Sites.new(facility).import
  rescue
    puts "RESCUED.................."
    facility.update_attributes(status: :requires_attention)
  end
end


Facility.where('sites_count > 0').where(booking_window: nil).each_with_index do |facility, x|
  puts "#{x} Facility: #{facility.id} - #{facility.name}"
  begin
    InitialImport::RecreationGov::BookingWindow.new(facility).find
  rescue
    puts "RESCUED.................."
    facility.update_attributes(status: :requires_attention)
  end
end


Facility.where('details @> ?', {LegacyFacilityID: '75118.0'}.to_json)

----------------

a ={          :agency_id => 1,
               :name => "SOUTH CAMPGROUND (UT)",
               :type => "Facility::RecreationGov",
            :details => {
                       "City" => "Springdale",
                      "OrgID" => 128,
                    "OrgName" => "National Park Service",
                    "OrgType" => "Department of the Interior",
                 "FacilityID" => nil,
                 "PostalCode" => 84767.0,
               "FacilityName" => "SOUTH CAMPGROUND (UT)",
              "OrgFacilityID" => "",
            "LastUpdatedDate" => "2018-03-01 04:05:15",
           "AddressStateCode" => "UT",
           "FacilityLatitude" => 37.198611111111106,
           "LegacyFacilityID" => 157390.0,
          "FacilityAddressID" => 20385474,
          "FacilityLongitude" => -112.9863888888889,
         "AddressCountryCode" => "USA",
        "FacilityAddressType" => "",
     "FacilityStreetAddress1" => "S.R. 9",
     "FacilityStreetAddress2" => "",
     "FacilityStreetAddress3" => "",
    "FacilityTypeDescription" => "Camping"
}}


facility = Facility::RecreationGov.create(a)

InitialImport::RecreationGov::Sites.new(facility).import

InitialImport::RecreationGov::FacilityParent.new(facility).find
