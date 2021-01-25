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
    cal_results = AvailabilityMatcher::Calendar.new(availability_request).execute
    results_hash = Hash.new { |h, k| h[k] = [] }
    cal_results.each { |a| results_hash[a[:date]] = a }
    render json: results_hash
  end

  def click
    match = AvailabilityMatch.find_by_base62(params[:id])
    RecordClick.new(match, params[:from] || :w).perform
    render json: match, show_reserve: true
  end
end
