module InitialImport::PinellasCounty
  class Facility
    def self.import(agency)
      ::Facility::PinellasCounty.create(
        agency_id: agency.id,
        name: 'Fort Desoto',
      )
    end
  end
end
