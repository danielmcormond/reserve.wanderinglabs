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


Facility.where('details @> ?', {LegacyFacilityID: '158542.0'}.to_json)

----------------

a ={          :agency_id => 1,
               :name => "BICENTENNIAL CAMPGROUND",
               :type => "Facility::RecreationGov",
            :details => {
                       "City" => "Sausalito",
                      "OrgID" => 128,
                    "OrgName" => "Golden Gate National Recreation Area",
                    "OrgType" => "Department of the Interior",
                 "FacilityID" => nil,
                 "PostalCode" => 94965.0,
               "FacilityName" => "BICENTENNIAL CAMPGROUND",
              "OrgFacilityID" => "",
            "LastUpdatedDate" => "2018-03-01 04:05:15",
           "AddressStateCode" => "CA",
           "FacilityLatitude" => 37.83089,
           "LegacyFacilityID" => 158542.0,
          "FacilityAddressID" => 20385474,
          "FacilityLongitude" => -122.52466,
         "AddressCountryCode" => "USA",
        "FacilityAddressType" => "",
     "FacilityStreetAddress1" => "Building 948 Fort Barry",
     "FacilityStreetAddress2" => "",
     "FacilityStreetAddress3" => "",
    "FacilityTypeDescription" => "Camping"
}}


facility = Facility::RecreationGov.create(a)

InitialImport::RecreationGov::Sites.new(facility).import

facility.populate_sites_details
facility.save

InitialImport::RecreationGov::FacilityParent.new(facility).find

facility = InitialImport::RecreationGov::FacilityWeb.new('https://www.recreation.gov/camping/fruita-campground/r/campgroundDetails.do?contractCode=NRSO&parkId=157240').create

