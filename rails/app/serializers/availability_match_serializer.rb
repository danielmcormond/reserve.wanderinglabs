class AvailabilityMatchSerializer < ActiveModel::Serializer
  attributes :id, :avail_date, :length, :available, :unavailable_at, :notified_at, :short, :reserve, :facility,
             :facility_type, :premium
  belongs_to :site

  def short
    Base62.encode(object.id) if object.id
  end

  def reserve
    return unless @instance_options[:show_reserve].present?
    ReserveUrl.new(object).params
  end

  def facility
    return unless @instance_options[:show_reserve].present?
    object.facility.name
  end

  def facility_type
    return unless @instance_options[:show_reserve].present?
    object.facility.class.to_s
  end

  def premium
    return unless @instance_options[:show_reserve].present?
    object.availability_request.user.premium
  end
end
