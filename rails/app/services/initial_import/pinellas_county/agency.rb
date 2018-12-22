module InitialImport::PinellasCounty
  class Agency
    def self.import
      ::Agency.create(
        name: 'Pinellas County',
      )
    end
  end
end
