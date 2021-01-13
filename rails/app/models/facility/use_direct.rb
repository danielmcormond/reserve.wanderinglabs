class Facility::UseDirect < Facility
  def sub_name
    [parent_name, agency.name].compact.join(', ')
  end

  def scraper_type
    :queue
  end

  def scraper_meta
    {
      key: 'ScraperUseDirect'
    }
  end

  def scraper_details(site_group = nil)
    raise Exception, 'Site Group Required for UseDirect' if site_groups_count.positive? && !site_group

    {
      name: "#{id}:#{name[0..25]}",
      facilityId: id,
      siteGroupId: site_group.id,
      rcFacilityId: site_group.ext_id,
      rdrUrl: agency.details['rdr'],
      startDate: scrape_start.strftime('%m/%d/%Y'),
      endDate: scrape_end.strftime('%m/%d/%Y'),
      hash: site_group.last_import_hash
    }
  end
end
