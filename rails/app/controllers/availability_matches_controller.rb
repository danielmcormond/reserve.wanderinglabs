class AvailabilityMatchesController < ApplicationController
  def index
    availability_request = AvailabilityRequest.find_by_uuid(params[:availability_request_id])
    @availability_matches = availability_request
      .availability_matches
      .available
      .includes(site: [:facility])
      .order('available DESC, avail_date ASC')
    render json: @availability_matches
  end

  def calendar
    availability_request = AvailabilityRequest.find_by_uuid(params[:availability_request_id])
    cal_results = AvailabilityMatcher::Calendar.new(availability_request).results
    render json: cal_results
  end

  def click
    match = AvailabilityMatch.find_by_base62(params[:id])
    RecordClick.new(match, params[:from] || :w).perform
    render json: match, show_reserve: true
  end
end
