class AvailabilityImportsController < ApplicationController
  def index
    availability_imports = scope.order('id desc').limit(100)
    render json: availability_imports, expanded: params[:expanded] == "true"
  end

  def scope
    ai = AvailabilityImport.includes(:facility)
    ai = ai.where(facility_id: params[:facility_id]) if params[:facility_id]
    ai
  end
end
