class SitesController < ApplicationController
  def index
    if params[:availability_request_id]
      availability_request = AvailabilityRequest.find_by_uuid(params[:availability_request_id])
      sites = Site.where(id: availability_request.site_ids)
    else
      facility = Facility.find(params[:facility_id])
      sites = facility.sites.lookup(params[:q])
    end
    render json: sites
  end

  def show
    site = Site.find(params[:id])
    render json: site, render_availabilities: true, render_facility: true
  end
end
