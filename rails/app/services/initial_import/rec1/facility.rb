module InitialImport::Rec1
  class Facility
    def self.import(agency)
      ::Facility::Rec1.create(
        agency_id: agency.id,
        name: 'Fort Desoto',
      )
    end
  end
end
