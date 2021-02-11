class Admin::AvailabilityRequestsController < Admin::ApplicationController
  def index
    render json: {
      active: AvailabilityRequest.active.count,
      activePremium: AvailabilityRequest.active.premium.count,


      activeUsers: AvailabilityRequest.active.distinct(:user_id).select(:user_id).count,
      # User.joins(:availability_requests).merge(AvailabilityRequest.active).distinct(:id).select(:id).count

      activePremiumUsers: AvailabilityRequest.active.premium.distinct(:user_id).select(:user_id).count,

      activeMatch: AvailabilityMatch.joins(:availability_request).where(availability_request_id: AvailabilityRequest.active.map(&:id)).distinct(:availability_request_id).select(:availability_request_id).count,
      activeMatchPremium: AvailabilityMatch.joins(:availability_request).where(availability_request_id: AvailabilityRequest.active.premium.map(&:id)).distinct(:availability_request_id).select(:availability_request_id).count
    }
  end
end
