agency = InitialImport::UseDirect::Agency.alabama

InitialImport::UseDirect::Facilities.new(agency).import_facility_groups

InitialImport::UseDirect::Facilities.new(agency).import_facility_groups_from_ids(agency[:details]["facility_ids"])
