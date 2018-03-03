class FacilitiesController < ApplicationController
  def index
    @facilities = facility_scope.limit(15)
    @facilities = @facilities.where('name ILIKE ?', "#{params[:q]}%") if params[:q]
    @facilities = @facilities.where(type: filters) unless filters.empty?

    if params[:q].present? && @facilities.count < 15
      @more_facilities = Facility.order('LOWER(parent_name) ASC, LOWER(name) ASC').limit(15 - @facilities.count)
      @more_facilities = @more_facilities.where('parent_name ILIKE ?', "#{params[:q]}%") if params[:q]
      @more_facilities = @more_facilities.where(type: filters) unless filters.empty?
      @combined_facilities = @facilities + @more_facilities
      render json: @combined_facilities
    else
      render json: @facilities
    end
  end

  def active
    @facilities = Facility.active_facilities
    render json: @facilities
  end

  def grouped_availabilities
    @facility = Facility.find(params[:id])
    avails = Facilities::Stats.new(@facility, 1).search

    site_ids = avails.map { |h| h[:site_id] }.uniq
    sites = Site.where(id: site_ids).all
    avails_mapped = avails.map do |h|

      site = sites.select { |s| h[:site_id] == s.id }.first
      h.merge(site: SiteSerializer.new(site) )

    end

    render json: avails_mapped
  end

  def facility_scope
    if params[:q].present?
      Facility.order('LOWER(name) ASC')
    else
      Facility.top_facilities
    end
  end

  def filters
    f = []
    f.push('Facility::ReserveAmerica') if params[:f].present? && params[:f].include?('reserve_america')
    f.push('Facility::ReserveCalifornia') if params[:f].present? && params[:f].include?('reserve_california')
    f.push('Facility::RecreationGov') if params[:f].present? && params[:f].include?('recreation_gov')
    f
  end
end
