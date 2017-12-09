class AvailabilityRequestSerializer < ActiveModel::Serializer
  attributes :uuid, :user_id, :facility_id,
             :date_start, :date_end, :stay_length, :matches_availabile_count,
             :status, :checked_count, :checked_at, :premium, :summary, :site_count

  belongs_to :facility

  def matches_availabile_count
    object.availability_matches.available.count
  end

  def premium
    object.user.premium
  end

  def site_count
    object.site_ids.size
  end

  def summary
    params = []
    params.push(object.site_type.text) if object.site_type
    params.push('Water') if object.water?
    params.push('Sewer') if object.sewer?
    params.push("#{object.min_electric} amps or more") if object.min_electric?
    params.push("Minumum #{object.min_length}'") if object.min_length?
    params.push('Pull Thru') if object.pullthru?
    params.push('Premium sites') if object.site_premium?
    params.push('Skip ADA') if object.ignore_ada?
    params.join(', ')
  end
end
