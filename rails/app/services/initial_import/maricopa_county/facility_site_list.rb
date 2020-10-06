module InitialImport::MaricopaCounty
  class FacilitySiteList
    attr_reader :facility

    def initialize(facility)
      @facility = facility
    end

    def self.import_all
      ::Facility::MaricopaCounty.find_each do |facility|
        import(facility)
      end
      nil
    end

    def self.import(facility)
      new(facility).import
    end

    def import(ext_site_ids = [])
      parsed.css('.plotpoint').each do |plotpoint|
        attributes = plotpoint.attributes.each_with_object({}) { |(k, v), acc| acc[k] = v.value }
        next if !ext_site_ids.empty? && ext_site_ids.include?(attributes['data-siteid'])

        InitialImport::MaricopaCounty::Site.new(facility, attributes).import
      end

      facility.cache_sites_count
      facility.populate_sites_details
      nil
    end

    def url
      facility.details['reserve']
    end

    def body
      @body ||= HTTParty.post(
        url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "stage=1&park_id=#{facility.details['park_id']}&paKeys=3799013&readPolicy=false&firstname=&lastname=&priAdd1=&priCity=&priState=&priZip=&phone1=&priEmail=&cardAddress=&cardCity=&cardState=&cardName=&cardZip=&date_range=2020-10-20+to+2020-10-21&next="
      ).body
    end

    def parsed
      # puts body
      @parsed ||= Nokogiri::HTML(body)
    end
  end
end

__END__

curl 'https://maricopacountyparks.org/lake-pleasant' \
  -H 'Connection: keep-alive' \
  -H 'Cache-Control: max-age=0' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'Origin: https://maricopacountyparks.org' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
  --data-raw 'stage=1&park_id=9&paKeys=3799013&readPolicy=false&firstname=&lastname=&priAdd1=&priCity=&priState=&priZip=&phone1=&priEmail=&cardAddress=&cardCity=&cardState=&cardName=&cardZip=&date_range=2020-10-20+to+2020-10-21&next=' \
  --compressed
