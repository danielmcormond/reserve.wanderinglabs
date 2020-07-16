class SitesController < ApplicationController
  def index
    facility = Facility.find(params[:facility_id])
    sites = facility.sites.lookup(params[:q])
    render json: sites
  end

  def show
    site = Site.find(params[:id])
    render json: site, render_availabilities: true, render_facility: true
  end
end
