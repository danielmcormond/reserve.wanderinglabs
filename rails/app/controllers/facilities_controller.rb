class FacilitiesController < ApplicationController
  def index
    @facilities = facility_scope.limit(15)
    @facilities = @facilities.lookup(params[:q]) if params[:q] && params[:q].length.positive?
    @facilities = filters_scope(@facilities)

    render json: @facilities
  end

  def show
    @facility = Facility.active.find_by_id_or_slug(params[:id])
    render json: @facility
  end

  def active
    @facilities = Facility.active_facilities
    render json: @facilities
  end

  def facility_scope
    if params[:q].present?
      Facility.active
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
    type_filters.push('Facility::RecreationGovBa') if filter_include?('recreation_gov')

    agency_ids = []
    agency_ids.push(52) if filter_include?('washington_state_parks')

    if type_filters.any? || agency_ids.any?
      scope.where('(type IN (?) OR agency_id IN (?))', type_filters, agency_ids)
    else
      scope
    end
  end
end
