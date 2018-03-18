class AvailabilitiesController < ApplicationController
  before_action :login_required, only: [:show]

  def index
    last_import = facility.availability_imports.last
    availabilities = Availability.where(
      site_id: facility.sites.pluck(:id),
      availability_import_id: last_import.id,
      avail_date: Date.parse(params[:date])
    )
    render json: availabilities
  end

  def show
  end

  def calendar
    availability_request = AvailabilityRequest.new(
      availability_request_params.merge(
        facility_id: facility.id,
        date_start: Time.now,
        date_end: 1.year.from_now
      )
    )

    availability_request.site_ids = SiteMatcher.new(availability_request).matching_site_ids
    search = AvailabilityMatcher::Search.new(availability_request).search

    dates = {}
    search.each do |sr|
      days_to_add = sr[:length] - availability_request.stay_length + 1
      days_to_add.times do |x|
        avail_date = (Date.parse(sr[:avail_min]) + x.days).to_s
        dates[avail_date] ||= 0
        dates[avail_date] = dates[avail_date] + 1
      end
    end

    render json: dates.sort.to_h
  end

  def import
    Resque.enqueue(AvailabilityImports::Index, params[:facility_id], params[:import], params[:hash])
    render status_code: 200
  end

  def availability_request_params
    params.require(:availability_request).permit(
      :facility_id, :email, :date_start, :date_end, :stay_length, :sewer, :pullthru, :water, :min_length,
      :min_electric, :site_type, :arrival_days, :specific_site_ids, :site_premium, :ignore_ada
    )
  end

  def facility
    @facility ||= Facility.find(params[:facility_id])
  end
end
