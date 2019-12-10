class AvailabilityImportsController < ApplicationController
  def index
    availability_imports = scope.order('id desc').limit(100)
    render json: availability_imports, expanded: params[:expanded] == "true"
  end

  def scope
    ai = AvailabilityImport.joins(:facility).includes(facility: [:sites])
    ai = ai.where(facility_id: params[:facility_id]) if params[:facility_id]
    ai = ai.where(facilities: { type: filters }) unless filters.empty?
    ai
  end

  def filters
    f = []
    f.push('Facility::ReserveAmerica') if params[:filters].present? && params[:filters].include?('reserve_america')
    f.push('Facility::ReserveCalifornia') if params[:filters].present? && params[:filters].include?('reserve_california')
    f.push('Facility::RecreationGov') if params[:filters].present? && params[:filters].include?('recreation_gov')
    f.push('Facility::Camis') if params[:filters].present? && params[:filters].include?('camis')
    f
  end
end
