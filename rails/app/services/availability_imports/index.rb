class AvailabilityImports::Index
  extend Resque::Plugins::JobStats
  @queue = :import

  attr_reader :facility, :run_id, :hash, :site_group_id

  def initialize(facility_id, run_id, hash)
    @facility = Facility.find(facility_id)
    @run_id = run_id
    @hash = hash

    # SITE_GROUP ID IS AT THE START OF A RUN_ID
    @site_group_id = run_id.split('_')[0] if @facility.site_groups_count.positive?
  end

  def perform
    parse_and_match if import_needed?
    update_facility
    update_site_group
  end

  def import_needed?
    return site_group.last_import_hash != hash if site_group

    facility.last_import_hash != hash
  end

  def parse_and_match
    AvailabilityImports::FromJson.perform(import)
    AvailabilityMatcher::Index.perform(import.id, facility.premium_scrape)
  end

  def update_facility
    facility.last_import_hash = hash unless site_group
    facility.last_import = Time.now
    facility.save
  end

  def update_site_group
    return unless site_group

    site_group.last_import_hash = hash
    site_group.last_import = Time.now
    site_group.save
  end

  def import
    @import ||= AvailabilityImport.create(facility: facility, run_id: run_id, site_group_id: site_group_id)
  end

  def site_group
    return unless site_group_id

    @site_group ||= facility.site_groups.where(id: site_group_id).first
  end

  def self.perform(facility_id, import, hash)
    new(facility_id, import, hash).perform
  end
end
