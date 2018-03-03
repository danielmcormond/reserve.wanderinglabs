module InitialImport::ReserveAmerica
  class Base
    def self.import
      Agencies.import

      Agency.where('name not in(?)', ["California State Parks", 'RecreationGov']).all.each do |agency|
        Facilities.new(agency).all_facilities
      end
    end
  end
end
