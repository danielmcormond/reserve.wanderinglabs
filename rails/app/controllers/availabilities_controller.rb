class AvailabilitiesController < ApplicationController
  before_action :login_required, only: [:show]

  def index
    last_import = facility.availability_imports.last

    availabilities = last_import.availabilities.includes(:site).order(:avail_at).limit(500)
    availabilities = availabilities.where(avail_date: Date.parse(params[:date])) if params[:date].present?

    render json: availabilities
  end

  def show
  end

  def calendar
    availability_request = AvailabilityRequest.new(
      availability_request_params
        .except(:email)
        .merge(
          facility_id: facility.id,
          date_start: Time.now,
          date_end: 1.year.from_now
        )
    )
    availability_request.cache_site_ids

    resp = {
      type: 'Facility',
      id: facility.id,
      typeName: facility.name,
      availabilities: AvailabilityMatcher::Calendar.new(availability_request).results
    }

    render json: resp
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
    @facility ||= Facility.find_by_id_or_slug(params[:facility_id])
  end
end
