class FacilitiesController < ApplicationController
  def index
    @facilities = facility_scope.limit(15)
    @facilities = @facilities.where('name ILIKE ?', "#{params[:q]}%") if params[:q]
    @facilities = filters_scope(@facilities)

    if params[:q].present? && @facilities.count < 15
      @more_facilities = Facility.order('LOWER(parent_name) ASC, LOWER(name) ASC').limit(15 - @facilities.count)
      @more_facilities = @more_facilities.where('parent_name ILIKE ?', "#{params[:q]}%") if params[:q]
      @more_facilities = filters_scope(@more_facilities)
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
      h.merge(site: SiteSerializer.new(site))
    end
    render json: avails_mapped
  end

  def facility_scope
    if params[:q].present?
      Facility.active.order('LOWER(name) ASC')
    else
      Facility.active.top_facilities
    end
  end

  def filter_include?(value)
    params[:f].present? && params[:f].include?(value)
  end

  def filters_scope(scope)
    type_filters = []
    type_filters.push('Facility::ReserveAmerica') if filter_include?('reserve_america')
    type_filters.push('Facility::ReserveCalifornia') if filter_include?('reserve_california')
    type_filters.push('Facility::RecreationGov') if filter_include?('recreation_gov')

    agency_ids = []
    agency_ids.push(52) if filter_include?('washington_state_parks')

    if type_filters.any? || agency_ids.any?
      scope.where('(type IN (?) OR agency_id IN (?))', type_filters, agency_ids)
    else
      scope
    end
  end
end
