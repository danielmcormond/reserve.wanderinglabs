module InitialImport::RecreationGovBa
  class Agencies
    def self.perform()
      ActiveRecord::Base.logger.level = 1

      all['RECDATA'].each do |org|
        attrs = {
          name: org['OrgName'],
          details: org
        }
        update_or_create(attrs)
      end
      nil
    end

    def self.all
      url = "https://ridb.recreation.gov/api/v1/organizations/?limit=50&apikey=#{ENV['RIDB_API_KEY']}"
      body = HTTParty.get(url).body
      JSON.parse(body)
    end

    def self.update_or_create(attrs)
      puts "ATTRS #{attrs}"
      Agency.where(name: attrs[:name]).first_or_initialize(attrs).tap { |e| e.update!(attrs) }
    end
  end
end
