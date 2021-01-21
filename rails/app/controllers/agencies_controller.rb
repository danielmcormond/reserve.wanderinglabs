class AgenciesController < ApplicationController
  def index
    @agencies = agency_scope.order(:name).limit(150)
    @agencies = @agencies.lookup(params[:q]) if params[:q]&.length&.positive?

    render json: @agencies
  end

  def show
    @agency = Agency.active.find_by_id_or_slug(params[:id])
    render json: @agency
  end

  def agency_scope
    if params[:q].present?
      Agency.active
    else
      Agency.active #.top_agencies
    end
  end
end
