class AvailabilityImports::Index
  extend Resque::Plugins::JobStats
  @queue = :import

  attr_reader :facility, :run_id, :hash

  def initialize(facility_id, run_id, hash)
    @facility = Facility.find(facility_id)
    @run_id = run_id
    @hash = hash
  end

  def perform
    parse_and_match if import_needed?
    update_facility
  end

  def import_needed?
    facility.last_import_hash != hash
  end

  def parse_and_match
    AvailabilityImports::FromJson.perform(import)
    AvailabilityMatcher::Index.perform(import.id, facility.premium_scrape)
  end

  def update_facility
    facility.last_import_hash = hash
    facility.last_import = Time.now
    facility.save
  end

  def import
    @_import ||= AvailabilityImport.create(facility: facility, run_id: run_id)
  end

  def self.perform(facility_id, import, hash)
    new(facility_id, import, hash).perform
  end
end
