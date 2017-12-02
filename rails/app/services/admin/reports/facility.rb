module Admin::Reports
  class Facility
    def self.active(avail = false)
      ActiveRecord::Base.logger.level = 1

      items = ::Facility.active_facilities.all.map do |f|
        {
          id: f.id,
          name: "#{f.type} :: #{f.name}",
          requests: f.availability_requests.count,
          date: "#{f.scrape_start} - #{f.scrape_end}",
          imports: f.availability_imports.count,
          matches: f.availability_requests.sum { |ar| ar.availability_matches.count },
          avails: avail ? f.sites.sum { |ar| ar.availabilities.count } : nil,
        }
      end
      ap(items, indent: 2, index: false, ruby19_syntax: true)
      ap({ count: items.size }, indent: 2, index: false, ruby19_syntax: true)
      nil
    end
  end
end
# Admin::Reports::Facility.active
