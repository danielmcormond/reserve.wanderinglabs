class AvailabilityImports::FromJson
  attr_reader :import

  def initialize(import)
    @import = import
  end

  def perform
    history_open = []
    update_ids = []

    body['results'].each do |avail_date, ext_sites|
      avail_date_date = Date.strptime(avail_date, '%m/%d/%Y')
      sites_for(ext_sites).each do |site|
        availability = Availability.where(site_id: site.id, avail_date: avail_date_date).first
        if availability.present?
          update_ids << availability.id
        else
          history_open << { site_id: site.id, avail_date: avail_date_date }
        end
      end
    end

    create_availabilities(history_open)
    update_availabilities(update_ids)
    update_import(history_open)
    delete_availabilities
  end

  def update_import(history_open)
    import.update_attributes(
      history_open: history_open,
      history_filled: history_filled,
      date_start: body['startDate'],
      date_end: body['endDate']
    )
  end

  def create_availabilities(openings)
    Availability.bulk_insert do |avail|
      openings.each do |open_site|
        avail.add(availability_import_id: import.id, site_id: open_site[:site_id], avail_date: open_site[:avail_date])
      end
    end
  end

  def update_availabilities(ids)
    Availability.where(id: ids).update_all(availability_import_id: import.id)
  end

  def delete_availabilities
    Availability.where.not(availability_import_id: import.id).delete_all
  end

  def history_filled
    Availability.where.not(availability_import_id: import.id).map { |a| { site_id: a.site_id, avail_date: a.avail_date } }
  end

  def sites_for(ids)
    facility_sites.select { |site| ids.include?(site.ext_site_id) }
  end

  def facility_sites
    @_sites = Site.where(facility_id: import.facility_id).select(:id, :ext_site_id)
  end

  def url
    "http://#{bucket}.s3.amazonaws.com/#{import.facility_id}/#{import.run_id}.json"
  end

  def bucket
    Rails.env == 'production' ? 'availabilities-prd' : 'availabilities-dev'
  end

  def body
    @_body ||= JSON.parse(HTTParty.get(url).body)
  end
end
